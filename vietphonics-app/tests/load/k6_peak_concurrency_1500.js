/**
 * k6_peak_concurrency_1500.js
 * 
 * Load & Stress Testing Scenario for 1,500 Concurrent Sessions (SCL-101)
 * Compliance Target: Quality Gate J (J1: P95 <= 200ms, J2: Audio P95 <= 2s, J3: 5xx < 0.5%, J5: 1500 VUs)
 */

import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend, Rate } from 'k6/metrics';

// Custom metric trends for Gate J tracking
const generalApiDuration = new Trend('general_api_duration');
const audioScoringDuration = new Trend('audio_scoring_duration');
const failureRate = new Rate('http_failure_rate');

export const options = {
  stages: [
    { duration: '5m', target: 1500 },  // Stage 1: Ramp-up 0 -> 1,500 VUs in 5 mins
    { duration: '20m', target: 1500 }, // Stage 2: Sustain peak 1,500 VUs for 20 mins
    { duration: '5m', target: 0 }      // Stage 3: Ramp-down to 0 in 5 mins
  ],
  thresholds: {
    'http_req_failed': ['rate<0.005'],                           // Gate J3: Error rate < 0.5%
    'general_api_duration': ['p(95)<200', 'p(99)<500'],          // Gate J1: Normal API P95 <= 200ms
    'audio_scoring_duration': ['p(95)<2000', 'p(99)<3000'],      // Gate J2: Audio scoring P95 <= 2.0s
  }
};

const BASE_URL = __ENV.TARGET_URL || 'http://localhost:3002';

export default function () {
  const rand = Math.random();

  if (rand < 0.50) {
    // 50% Traffic: Audio Practice & Speech Scoring (AC 1)
    const payload = JSON.stringify({
      sentenceId: 'sent_001',
      recordedAudioUrl: 'https://r2.vietphonics.vn/simulated/sample.wav',
      targetPhonemes: ['θ', 'ð']
    });

    const params = {
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': `vu_user_${__VU}`
      },
      tags: { type: 'audio_scoring' }
    };

    const res = http.post(`${BASE_URL}/api/v1/scoring/targeted-sound`, payload, params);
    audioScoringDuration.add(res.timings.duration);
    failureRate.add(res.status >= 500);

    check(res, {
      'audio scoring status 200': (r) => r.status === 200,
      'audio scoring under 2s': (r) => r.timings.duration <= 2000
    });

  } else if (rand < 0.75) {
    // 25% Traffic: Dashboard, Profile & Leaderboards (AC 1)
    const params = {
      headers: { 'x-user-id': `vu_user_${__VU}` },
      tags: { type: 'general_api' }
    };

    const res = http.get(`${BASE_URL}/api/v1/learner/dashboard-data`, params);
    generalApiDuration.add(res.timings.duration);
    failureRate.add(res.status >= 500);

    check(res, {
      'dashboard status 200': (r) => r.status === 200,
      'dashboard latency under 200ms': (r) => r.timings.duration <= 200
    });

  } else if (rand < 0.90) {
    // 15% Traffic: Placement Diagnostic & CMS Sentences (AC 1)
    const params = {
      tags: { type: 'general_api' }
    };

    const res = http.get(`${BASE_URL}/api/v1/cms/sentences?cefr=B1`, params);
    generalApiDuration.add(res.timings.duration);
    failureRate.add(res.status >= 500);

    check(res, {
      'cms status 200': (r) => r.status === 200,
      'cms latency under 200ms': (r) => r.timings.duration <= 200
    });

  } else {
    // 10% Traffic: VietQR Checkout Order Generation (AC 1)
    const payload = JSON.stringify({
      planCode: 'pro_monthly',
      amount: 199000
    });

    const params = {
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': `vu_user_${__VU}`
      },
      tags: { type: 'general_api' }
    };

    const res = http.post(`${BASE_URL}/api/v1/payment/vietqr/create-order`, payload, params);
    generalApiDuration.add(res.timings.duration);
    failureRate.add(res.status >= 500);

    check(res, {
      'checkout status 200': (r) => r.status === 200,
      'checkout latency under 200ms': (r) => r.timings.duration <= 200
    });
  }

  // Realistic human think time: 0.5s - 2.0s
  sleep(Math.random() * 1.5 + 0.5);
}
