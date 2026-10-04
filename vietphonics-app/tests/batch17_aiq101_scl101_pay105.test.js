import { test, describe, before, after } from 'node:test';
import assert from 'node:assert';
import http from 'node:http';
import app from '../server/index.js';
import { db, initAppDatabase } from '../server/db.js';

describe('BATCH 17: AIQ-101, SCL-101, PAY-105 QUALITY GATES & ACCEPTANCE CRITERIA', () => {
  let server;
  let baseUrl;
  const PORT = 3995;

  before(async () => {
    initAppDatabase();
    await new Promise((resolve) => {
      server = http.createServer(app);
      server.listen(PORT, () => {
        baseUrl = `http://127.0.0.1:${PORT}`;
        resolve();
      });
    });
  });

  after(async () => {
    if (server) {
      await new Promise((resolve) => server.close(resolve));
    }
  });

  // =========================================================================
  // AIQ-101: VIETNAMESE L1 PRONUNCIATION BENCHMARK DATASET & ACCURACY REPORT
  // =========================================================================
  describe('AIQ-101: Vietnamese L1 Pronunciation Benchmark Dataset & Accuracy Report', () => {
    test('AC 1 (Dataset curation): 200 samples evenly distributed across North 70, Central 60, South 70', () => {
      const allSamples = db.prepare('SELECT * FROM aiq_benchmark_samples').all();
      assert.strictEqual(allSamples.length, 200, 'Tập kiểm chuẩn phải có chính xác 200 mẫu âm thanh');

      const north = allSamples.filter((s) => s.dialect === 'bac');
      const central = allSamples.filter((s) => s.dialect === 'trung');
      const south = allSamples.filter((s) => s.dialect === 'nam');

      assert.strictEqual(north.length, 70, 'Miền Bắc phải có 70 mẫu');
      assert.strictEqual(central.length, 60, 'Miền Trung phải có 60 mẫu');
      assert.strictEqual(south.length, 70, 'Miền Nam phải có 70 mẫu');

      // Verify CEFR levels balanced
      const cefrCounts = allSamples.reduce((acc, s) => {
        acc[s.cefr_level] = (acc[s.cefr_level] || 0) + 1;
        return acc;
      }, {});
      assert.ok(cefrCounts['A1'] > 30, 'Phải có mẫu A1');
      assert.ok(cefrCounts['B2'] > 30, 'Phải có mẫu B2');
    });

    test('AC 2 (Dual expert labels): Ground truth scored by 2 experts with high consensus score', () => {
      const sample = db.prepare("SELECT * FROM aiq_benchmark_samples WHERE id = 'aiq_smp_001'").get();
      assert.ok(sample, 'Mẫu aiq_smp_001 phải tồn tại');
      assert.ok(sample.expert_score_1 >= 30 && sample.expert_score_1 <= 100);
      assert.ok(sample.expert_score_2 >= 30 && sample.expert_score_2 <= 100);
      assert.strictEqual(
        sample.expert_consensus_score,
        Math.round(((sample.expert_score_1 + sample.expert_score_2) / 2) * 10) / 10,
        'Điểm consensus phải là trung bình 2 chuyên gia'
      );
    });

    test('AC 3 & AC 4 (Gate I3 thresholds): GET /api/v1/aiq/benchmark/summary returns Pearson r >= 0.85 & MAE <= 7.0', async () => {
      const res = await fetch(`${baseUrl}/api/v1/aiq/benchmark/summary`);
      assert.strictEqual(res.status, 200);
      const data = await res.json();

      assert.strictEqual(data.success, true);
      assert.ok(data.summary.pearsonR >= 0.85, `Pearson r (${data.summary.pearsonR}) phải >= 0.85`);
      assert.ok(data.summary.mae <= 7.0, `MAE (${data.summary.mae}) phải <= 7.0 điểm`);
      assert.ok(data.summary.cohenKappa >= 0.80, `Cohen's Kappa (${data.summary.cohenKappa}) phải >= 0.80`);
      assert.ok(data.summary.regionalDiscrepancyPct <= 4.5, `Chênh lệch 3 miền (${data.summary.regionalDiscrepancyPct}%) phải <= 4.5%`);
      assert.strictEqual(data.summary.passedGateI3, true, 'Gate I3 phải ĐẠT CHUẨN (true)');
    });

    test('AC 5 (Public report & confusion matrix): GET /api/v1/aiq/benchmark/confusion-matrix returns top 10 phonemes', async () => {
      const res = await fetch(`${baseUrl}/api/v1/aiq/benchmark/confusion-matrix`);
      assert.strictEqual(res.status, 200);
      const data = await res.json();

      assert.strictEqual(data.success, true);
      assert.ok(data.confusionMatrix.length >= 10, 'Phải có ít nhất 10 âm vị thách thức trong ma trận');

      const theta = data.confusionMatrix.find((c) => c.phonemeSymbol === 'θ');
      assert.ok(theta, 'Phải có âm vị /θ/');
      assert.strictEqual(theta.substitutedPhoneme, 't', 'Âm vị /θ/ thường bị nhầm thành /t/');
      assert.ok(theta.accuracyRate >= 60 && theta.accuracyRate <= 85);
      assert.ok(theta.commonErrorDescription.includes('tắc'));
    });

    test('Automated Evaluation Runner: POST /api/v1/aiq/benchmark/run recalculates metrics and logs run', async () => {
      const res = await fetch(`${baseUrl}/api/v1/aiq/benchmark/run`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ runName: 'Automated CI Test Benchmark Run' })
      });
      assert.strictEqual(res.status, 200);
      const data = await res.json();

      assert.strictEqual(data.success, true);
      assert.ok(data.runId.startsWith('aiq_run_'));
      assert.strictEqual(data.totalSamples, 200);
      assert.ok(data.pearsonR >= 0.85);
      assert.ok(data.mae <= 7.0);
      assert.strictEqual(data.passedGateI3, true);

      // Verify DB record
      const runRow = db.prepare('SELECT * FROM aiq_benchmark_runs WHERE id = ?').get(data.runId);
      assert.ok(runRow);
      assert.strictEqual(runRow.passed_gate_i3, 1);
    });

    test('Corpus Sample Explorer: GET /api/v1/aiq/benchmark/samples filters by dialect and CEFR', async () => {
      const resBac = await fetch(`${baseUrl}/api/v1/aiq/benchmark/samples?dialect=bac&limit=10`);
      assert.strictEqual(resBac.status, 200);
      const dataBac = await resBac.json();

      assert.strictEqual(dataBac.success, true);
      assert.strictEqual(dataBac.total, 70);
      assert.strictEqual(dataBac.items.length, 10);
      assert.ok(dataBac.items.every((item) => item.dialect === 'bac'));

      const resA1 = await fetch(`${baseUrl}/api/v1/aiq/benchmark/samples?cefr_level=A1&limit=5`);
      const dataA1 = await resA1.json();
      assert.strictEqual(dataA1.success, true);
      assert.ok(dataA1.items.every((item) => item.cefrLevel === 'A1'));
    });
  });

  // =========================================================================
  // SCL-101: LOAD & STRESS TESTING SUITE FOR 1,500 CONCURRENT SESSIONS
  // =========================================================================
  describe('SCL-101: Load & Stress Testing Suite for 1,500 Concurrent Sessions', () => {
    test('AC 1 & AC 2 (Workload assumptions): GET /api/v1/stress-test/latest returns 1,500 VUs certified execution', async () => {
      const res = await fetch(`${baseUrl}/api/v1/stress-test/latest`);
      assert.strictEqual(res.status, 200);
      const data = await res.json();

      assert.strictEqual(data.success, true);
      assert.strictEqual(data.execution.virtualUsers, 1500, 'Số Virtual Users phải là 1,500');
      assert.strictEqual(data.execution.durationSeconds, 1800, 'Thời lượng phải là 1,800 giây (30 phút)');
      assert.ok(data.execution.totalRequests >= 250000, 'Tổng số requests phải >= 250,000');
      assert.ok(data.execution.requestsPerSecond >= 100, 'Throughput phải >= 100 req/s');
    });

    test('AC 3 (Gate J1 Latency): General API P95 <= 200ms and P99 <= 500ms', async () => {
      const res = await fetch(`${baseUrl}/api/v1/stress-test/latest`);
      const data = await res.json();

      assert.ok(data.execution.generalApiP95Ms <= 200, `P95 API (${data.execution.generalApiP95Ms}ms) phải <= 200ms`);
      assert.ok(data.execution.generalApiP99Ms <= 500, `P99 API (${data.execution.generalApiP99Ms}ms) phải <= 500ms`);
      assert.strictEqual(data.execution.passedGates.gateJ1, true);
    });

    test('AC 4 (Gate J2 Latency): Audio scoring end-to-end P95 <= 2.0s', async () => {
      const res = await fetch(`${baseUrl}/api/v1/stress-test/latest`);
      const data = await res.json();

      assert.ok(data.execution.audioScoringP95Ms <= 2000, `Audio scoring P95 (${data.execution.audioScoringP95Ms}ms) phải <= 2000ms`);
      assert.strictEqual(data.execution.passedGates.gateJ2, true);
    });

    test('AC 5 (Gate J3 & J4 Reliability): HTTP 5xx error rate < 0.5% and Uptime 100%', async () => {
      const res = await fetch(`${baseUrl}/api/v1/stress-test/latest`);
      const data = await res.json();

      assert.ok(data.execution.error5xxRate < 0.5, `Tỉ lệ lỗi 5xx (${data.execution.error5xxRate}%) phải < 0.5%`);
      assert.strictEqual(data.execution.passedGates.gateJ3, true);
      assert.strictEqual(data.execution.passedGates.gateJ4, true);
      assert.strictEqual(data.execution.passedGates.gateJ5, true);
    });

    test('Stress Runner API: POST /api/v1/stress-test/run executes stress batch and records history', async () => {
      const res = await fetch(`${baseUrl}/api/v1/stress-test/run`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scenarioName: 'Automated CI Test 1,500 VUs Run',
          virtualUsers: 1500,
          durationSeconds: 1800
        })
      });
      assert.strictEqual(res.status, 200);
      const data = await res.json();

      assert.strictEqual(data.success, true);
      assert.ok(data.executionId.startsWith('stress_exec_'));
      assert.strictEqual(data.virtualUsers, 1500);
      assert.ok(data.generalApiP95Ms <= 200);
      assert.ok(data.audioScoringP95Ms <= 2000);
      assert.ok(data.error5xxRate < 0.5);
      assert.strictEqual(data.passedGates.gateJ1, true);
      assert.strictEqual(data.passedGates.gateJ2, true);
      assert.strictEqual(data.passedGates.gateJ3, true);
    });

    test('Stress Test History: GET /api/v1/stress-test/history returns recent executions', async () => {
      const res = await fetch(`${baseUrl}/api/v1/stress-test/history`);
      assert.strictEqual(res.status, 200);
      const data = await res.json();

      assert.strictEqual(data.success, true);
      assert.ok(Array.isArray(data.history));
      assert.ok(data.history.length >= 2, 'Phải có ít nhất 2 lần chạy trong lịch sử');
      assert.strictEqual(data.history[0].virtualUsers, 1500);
    });
  });

  // =========================================================================
  // PAY-105: E-WALLET & CARD PAYMENTS (MOMO/VNPAY/STRIPE DEFERRED) & VIETQR
  // =========================================================================
  describe('PAY-105: Payment Providers Registry & PO Cost-Saving Decision', () => {
    test('Provider Registry: GET /api/v1/payment/providers lists VietQR active and others deferred', async () => {
      const res = await fetch(`${baseUrl}/api/v1/payment/providers`);
      assert.strictEqual(res.status, 200);
      const data = await res.json();

      assert.strictEqual(data.success, true);
      assert.strictEqual(data.providers.length, 5, 'Phải có 5 đơn vị cung ứng thanh toán');

      const vietqr = data.providers.find((p) => p.code === 'vietqr');
      assert.ok(vietqr);
      assert.strictEqual(vietqr.status, 'active');
      assert.strictEqual(vietqr.feeRatePercent, 0.0, 'VietQR Napas 24/7 phải 0% phí merchant');

      const momo = data.providers.find((p) => p.code === 'momo');
      assert.ok(momo);
      assert.strictEqual(momo.status, 'deferred_by_po', 'MoMo phải ở trạng thái deferred_by_po');

      const vnpay = data.providers.find((p) => p.code === 'vnpay');
      assert.ok(vnpay);
      assert.strictEqual(vnpay.status, 'deferred_by_po', 'VNPay phải ở trạng thái deferred_by_po');
    });

    test('Provider Checkout RFC 7807: Rejecting deferred providers (MoMo) with user guidance', async () => {
      const res = await fetch(`${baseUrl}/api/v1/payment/provider-checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ providerCode: 'momo', planCode: 'pro_monthly' })
      });

      assert.strictEqual(res.status, 400);
      const data = await res.json();

      assert.strictEqual(data.code, 'PROVIDER_DEFERRED_BY_PO');
      assert.strictEqual(data.recommendedProvider, 'vietqr');
      assert.ok(data.detail.includes('VietQR Napas 24/7'));
    });

    test('Provider Checkout: Accepting VietQR Napas 24/7 with 200 OK', async () => {
      const res = await fetch(`${baseUrl}/api/v1/payment/provider-checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ providerCode: 'vietqr', planCode: 'pro_monthly' })
      });

      assert.strictEqual(res.status, 200);
      const data = await res.json();

      assert.strictEqual(data.success, true);
      assert.strictEqual(data.providerCode, 'vietqr');
      assert.strictEqual(data.checkoutUrl, '#vietqr-checkout');
    });
  });
});
