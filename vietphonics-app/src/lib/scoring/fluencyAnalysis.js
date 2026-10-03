/**
 * Speech Fluency, Natural Pauses & Filler Word Monitoring Engine (ELSA-204)
 * Calculates WPM, tempo categories, pause distributions, and Vietnamese L1 filler tokens.
 */

export const VIETNAMESE_L1_FILLERS = [
  {
    token: 'ờ',
    type: 'l1_vietnamese',
    description: 'Âm đệm phát ra khi người học cố gắng suy nghĩ từ tiếp theo bằng tiếng Việt.',
    tip: 'Thay thế bằng sự im lặng có chủ đích (Intentional Silence). Người bản xứ dùng khoảng lặng để nhấn mạnh, không dùng âm "ờ".'
  },
  {
    token: 'ừm',
    type: 'l1_vietnamese',
    description: 'Âm ngậm miệng kéo dài làm đứt gãy luồng hơi của câu tiếng Anh.',
    tip: 'Giữ môi khép tự nhiên, hít thở nhẹ nhàng và suy nghĩ trước khi mở miệng phát âm cụm tiếp theo.'
  },
  {
    token: 'kiểu như',
    type: 'l1_vietnamese',
    description: 'Cụm từ đệm dịch thô từ "like", làm giảm tính trang trọng và mạch lạc.',
    tip: 'Dừng lại 0.3s thay vì chèn cụm từ đệm tiếng Việt.'
  },
  {
    token: 'um',
    type: 'english_filler',
    description: 'Từ đệm phổ biến trong tiếng Anh khi ngập ngừng.',
    tip: 'Hạn chế dưới 1 lần / phút để đạt điểm Fluency & Coherence IELTS 7.5+.'
  },
  {
    token: 'uh',
    type: 'english_filler',
    description: 'Âm đệm ngắt nhịp nối âm giữa hai mệnh đề.',
    tip: 'Tập kỹ thuật liên kết từ (linking words) để luồng nói trôi chảy liên tục.'
  },
  {
    token: 'like',
    type: 'english_filler',
    description: 'Lạm dụng từ "like" giữa các cụm danh từ.',
    tip: 'Sử dụng các trạng từ liên kết chính xác như "for instance", "such as" thay vì "like".'
  },
  {
    token: 'you know',
    type: 'english_filler',
    description: 'Cụm từ đệm rác tìm kiếm sự đồng thuận.',
    tip: 'Tập trung hoàn thành câu nói mà không cần chèn câu tìm kiếm xác nhận.'
  }
];

/**
 * Calculates Words Per Minute (WPM)
 */
export function calculateWpm(wordsCount, totalDurationSec) {
  if (!totalDurationSec || totalDurationSec <= 0) return 0;
  return Math.round((wordsCount / totalDurationSec) * 60);
}

/**
 * Categorizes speech tempo according to international conversational benchmarks:
 * - Slow (<110 WPM): Quá ngập ngừng, cần tăng tốc độ nối âm
 * - Optimal (110 - 160 WPM): Lý tưởng chuẩn bản ngữ (Conversational Tempo)
 * - Fast (>160 WPM): Quá vội, dễ nuốt âm đuôi và sai trọng âm
 */
export function categorizeTempo(wpm) {
  if (wpm < 110) {
    return {
      category: 'slow',
      label: 'Tốc độ Chậm (<110 WPM)',
      evaluation: 'Nhịp điệu còn rời rạc, ngắt quãng nhiều giữa các từ. Cần luyện nối âm (linking) để tăng tốc độ nói.',
      colorClass: 'text-amber-700 bg-amber-50 border-amber-200',
      badgeClass: 'bg-amber-100 text-amber-800'
    };
  }
  if (wpm <= 160) {
    return {
      category: 'optimal',
      label: 'Tốc độ Lý tưởng (110-160 WPM)',
      evaluation: 'Tốc độ đối thoại tự nhiên, đĩnh đạc chuẩn Cambridge/IELTS Speaking Band 7.5+.',
      colorClass: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      badgeClass: 'bg-emerald-100 text-emerald-800'
    };
  }
  return {
    category: 'fast',
    label: 'Tốc độ Nhanh (>160 WPM)',
    evaluation: 'Nói quá vội khiến các phụ âm đuôi (coda) bị nuốt và trọng âm từ bị mờ nhạt. Hãy giảm tốc độ để tròn vành rõ chữ.',
    colorClass: 'text-rose-700 bg-rose-50 border-rose-200',
    badgeClass: 'bg-rose-100 text-rose-800'
  };
}

/**
 * Computes SVG speedometer needle rotation angle (-90deg to +90deg)
 * Range: 40 WPM (-90deg) to 220 WPM (+90deg). Center: 130 WPM (0deg).
 */
export function calculateNeedleAngle(wpm) {
  const clamped = Math.min(220, Math.max(40, wpm));
  return Math.round(((clamped - 40) / 180) * 180 - 90);
}

/**
 * Full Fluency Analysis for a given sentence and speech duration
 */
export function analyzeFluency({
  sentence = '',
  totalDurationSec = 5.6,
  customSegments = null,
  detectedFillers = null
}) {
  const words = sentence.trim().split(/\s+/).filter(Boolean);
  const wordsCount = words.length || 10;
  const wpm = calculateWpm(wordsCount, totalDurationSec);
  const tempo = categorizeTempo(wpm);
  const needleAngle = calculateNeedleAngle(wpm);

  let segments = [];
  let fillers = [];

  if (customSegments && Array.isArray(customSegments)) {
    segments = customSegments;
  } else {
    // Standard realistic simulation matching acoustic reference
    segments = [
      { id: 'seg-1', type: 'speech', text: 'Six months ago,', startSec: 0.2, endSec: 1.6, duration: 1.4 },
      { id: 'seg-2', type: 'pause', text: '[Nghỉ ngắn 0.3s]', startSec: 1.6, endSec: 1.9, duration: 0.3, isAwkward: false },
      { id: 'seg-3', type: 'speech', text: 'she baked fresh bread', startSec: 1.9, endSec: 3.3, duration: 1.4 },
      { id: 'seg-4', type: 'pause', text: '[Ngập ngừng 0.8s]', startSec: 3.3, endSec: 4.1, duration: 0.8, isAwkward: true },
      { id: 'seg-5', type: 'speech', text: 'for breakfast on the street.', startSec: 4.1, endSec: 5.5, duration: 1.4 }
    ];
  }

  if (detectedFillers && Array.isArray(detectedFillers)) {
    fillers = detectedFillers;
  } else {
    fillers = [
      {
        token: 'ờ',
        type: 'l1_vietnamese',
        startSec: 3.4,
        endSec: 3.8,
        description: 'Ngập ngừng chèn từ đệm "ờ" sau cụm "fresh bread".',
        tip: 'Hãy thay thế bằng sự im lặng có chủ đích. Khoảng lặng giúp câu nói trang trọng hơn.'
      }
    ];
  }

  // Calculate pause ratios
  let speechDuration = 0;
  let pauseDuration = 0;
  let awkwardPausesCount = 0;

  segments.forEach(seg => {
    if (seg.type === 'speech') {
      speechDuration += seg.duration;
    } else if (seg.type === 'pause') {
      pauseDuration += seg.duration;
      if (seg.duration >= 0.5) {
        awkwardPausesCount += 1;
        seg.isAwkward = true;
      }
    }
  });

  const totalCalculated = speechDuration + pauseDuration || totalDurationSec;
  const pauseRatio = Math.round((pauseDuration / totalCalculated) * 1000) / 10; // e.g. 19.5%

  return {
    sentence,
    wordsCount,
    totalDurationSec: Math.round(totalDurationSec * 10) / 10,
    speechDurationSec: Math.round(speechDuration * 10) / 10,
    pauseDurationSec: Math.round(pauseDuration * 10) / 10,
    pauseRatio,
    wpm,
    tempoCategory: tempo.category,
    tempoLabel: tempo.label,
    tempoEvaluation: tempo.evaluation,
    tempoColorClass: tempo.colorClass,
    needleAngle,
    awkwardPausesCount,
    fillersCount: fillers.length,
    segments,
    fillers
  };
}
