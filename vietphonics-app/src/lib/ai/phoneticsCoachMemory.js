/**
 * phoneticsCoachMemory.js
 * ADV-104: AI Phonetics Coach Long-Term Context Memory & Articulatory Explanations
 */

export const VIETNAMESE_L1_ARTICULATORY_KNOWLEDGE = {
  unreleased_stops: {
    rule: 'Hiện tượng nuốt âm tắt cuối /p, t, k/',
    biomechanics: 'Trong tiếng Việt, các âm đuôi /p, t, k/ là âm khép miệng hoàn toàn (unreleased stops) không có luồng hơi thoát ra. Trong tiếng Anh, bắt buộc phải nén áp suất trong khoang miệng rồi bật tách đầu lưỡi/môi để tạo tiếng nổ (burst release).'
  },
  interdental_theta: {
    rule: 'Lẫn lộn giữa âm xát kẹp răng /θ/ và âm tắc chân răng /t/',
    biomechanics: 'Âm /θ/ yêu cầu đầu lưỡi đưa ra giữa hai hàm răng từ 2-3mm để luồng hơi ma sát qua khe hở. Nếu lưỡi rụt vào chạm nướu trên sẽ lập tức biến thành âm /t/ ("think" thành "tinh").'
  },
  sibilant_coda: {
    rule: 'Rụng âm xát /s/ và /z/ cuối từ',
    biomechanics: 'Tiếng Việt không có âm xát ở vị trí đuôi âm tiết (coda). Người học phải duy trì luồng hơi liên tục qua kẽ răng cửa ngay cả khi đã phát âm xong nguyên âm.'
  }
};

/**
 * Gets or initializes user's 30-day phonetic profile memory
 */
export function getOrCreateCoachMemoryProfile(userId = 'learner_01') {
  return {
    userId,
    masteredPhonemes: ['/iː/', '/uː/', '/m/', '/n/', '/f/', '/v/', '/s/', '/z/', '/b/', '/d/'],
    masteredCount: 28,
    totalPhonemes: 44,
    strugglingPhonemes: [
      { symbol: '/θ/', errorRate: '35%', lastTrained: 'Hôm nay', issue: 'Rụt lưỡi thành /t/' },
      { symbol: '/t/', errorRate: '30%', lastTrained: 'Hôm nay', issue: 'Nuốt âm đuôi' },
      { symbol: '/æ/', errorRate: '25%', lastTrained: '2 ngày trước', issue: 'Hàm chưa đủ độ mở' }
    ],
    sparkline7Days: [58, 62, 65, 71, 74, 80, 85],
    recentSessions: [
      {
        date: 'Hôm qua',
        phoneme: '/t/',
        accuracy: 52,
        notes: 'Nuốt 80% âm /t/ cuối trong các từ đa âm tiết'
      },
      {
        date: 'Hôm nay',
        phoneme: '/t/',
        accuracy: 75,
        notes: 'Cải thiện rõ rệt, đặc biệt từ "contact" và "fantastic" đã bật nổ âm rõ'
      }
    ]
  };
}

/**
 * Generates an articulatory, memory-aware coach response
 * @param {string} prompt - user question
 * @param {Object} profile - coach memory profile
 * @returns {Object} response with text, articulatory tips, and tokens
 */
export function generateCoachResponse(prompt = '', profile = null) {
  const mem = profile || getOrCreateCoachMemoryProfile();
  const lower = prompt.toLowerCase();

  let responseText = '';
  let articulatoryTip = null;

  if (lower.includes('hôm nay') && (lower.includes('đỡ hơn') || lower.includes('/t/') || lower.includes('tiến bộ'))) {
    responseText = `Chào bạn! So với hôm qua bạn nuốt hơn 70% âm /t/ cuối, hôm nay bạn đã bật âm chuẩn 75%, đặc biệt ở các từ như "contact" và "fantastic" âm bật rất dứt khoát! Hãy tiếp tục duy trì đà này nhé.`;
    articulatoryTip = VIETNAMESE_L1_ARTICULATORY_KNOWLEDGE.unreleased_stops;
  } else if (lower.includes('/θ/') || lower.includes('thought') || lower.includes('think') || lower.includes('đặt lưỡi')) {
    responseText = `Để phát âm âm /θ/ chuẩn như người bản ngữ, bạn hãy thò đầu lưỡi ra giữa hai hàm răng khoảng 2-3mm rồi thổi nhẹ luồng hơi qua khe răng. Tuyệt đối không rụt lưỡi chạm vào nướu trên nhé!`;
    articulatoryTip = VIETNAMESE_L1_ARTICULATORY_KNOWLEDGE.interdental_theta;
  } else {
    responseText = `Tôi đã ghi nhận câu hỏi của bạn. Dựa trên hồ sơ ngữ âm 14 ngày qua, bạn đã làm chủ 28/44 âm IPA. Điểm mấu chốt lúc này là kiểm soát hơi thở và duy trì độ mở quai hàm ổn định khi phát âm các câu dài.`;
    articulatoryTip = VIETNAMESE_L1_ARTICULATORY_KNOWLEDGE.sibilant_coda;
  }

  // Token chunks for SSE streaming simulation
  const tokens = responseText.split(' ').map(w => w + ' ');

  return {
    prompt,
    responseText,
    articulatoryTip,
    tokens,
    memorySnapshot: {
      masteredCount: mem.masteredCount,
      strugglingCount: mem.strugglingPhonemes.length,
      currentTrend: '+12% trong 7 ngày qua'
    }
  };
}
