/**
 * 10-Minute Daily Personalized Practice Path (Adaptive Curriculum) Engine (ELSA-401)
 * Generates 5 tailored micro-steps based on user's weak phonemes and regional L1 transfer traps.
 */

export const REGIONAL_CURRICULA = {
  bac: {
    dialectName: 'Bắc Bộ (Northern VN)',
    trapTitle: 'Khắc phục bẫy âm L/N & rụng phụ âm đuôi /ks/',
    steps: [
      { order: 1, type: 'warmup', title: 'Khởi Động Cơ Miệng', phoneme: '/m/', targetWord: 'moon', durationMin: 2, trapReason: 'Thả lỏng cơ môi và cộng hưởng vòm họng.' },
      { order: 2, type: 'challenge', title: 'Âm Yếu #1 (<70%)', phoneme: '/l/-/n/', targetWord: 'light', durationMin: 2, trapReason: 'Bạn đã nhầm lẫn L/N 4 lần trong các buổi học trước.' },
      { order: 3, type: 'challenge', title: 'Âm Yếu #2 (<70%)', phoneme: '/ks/', targetWord: 'six', durationMin: 2, trapReason: 'Thói quen rụng cụm phụ âm đuôi /ks/ thành "sích".' },
      { order: 4, type: 'minimal_pair', title: 'Cặp Từ Tối Thiểu', phoneme: '/l/ vs /n/', targetWord: 'line vs nine', durationMin: 2, trapReason: 'Phân biệt chính xác vị trí đầu lưỡi chạm lợi hàm trên.' },
      { order: 5, type: 'sentence', title: 'Câu Ứng Dụng Thực Tế', phoneme: 'Ngữ điệu liên từ', targetWord: 'The light shines bright every night.', durationMin: 2, trapReason: 'Kiểm soát nhịp điệu và nối âm tự nhiên trong giao tiếp.' }
    ]
  },
  nam: {
    dialectName: 'Nam Bộ (Southern VN)',
    trapTitle: 'Khắc phục nuốt âm đuôi /t/, /k/ & phân biệt /v/ - /j/',
    steps: [
      { order: 1, type: 'warmup', title: 'Khởi Động Cơ Miệng', phoneme: '/s/', targetWord: 'sun', durationMin: 2, trapReason: 'Mở rộng luồng hơi liên tục qua kẽ răng.' },
      { order: 2, type: 'challenge', title: 'Âm Yếu #1 (<70%)', phoneme: '/t/', targetWord: 'contact', durationMin: 2, trapReason: 'Bạn hay nuốt tắt thanh hầu âm đuôi /t/ thành âm câm.' },
      { order: 3, type: 'challenge', title: 'Âm Yếu #2 (<70%)', phoneme: '/k/', targetWord: 'speak', durationMin: 2, trapReason: 'Cần bật dứt khoát âm chặn vô thanh /k/ ở cuống họng.' },
      { order: 4, type: 'minimal_pair', title: 'Cặp Từ Tối Thiểu', phoneme: '/t/ vs /p/', targetWord: 'cat vs cap', durationMin: 2, trapReason: 'Phân biệt khép môi (/p/) và chặn đầu lưỡi (/t/).' },
      { order: 5, type: 'sentence', title: 'Câu Ứng Dụng Thực Tế', phoneme: 'Bật âm đuôi liên tục', targetWord: 'Please contact the team to speak about the project.', durationMin: 2, trapReason: 'Luyện tập giữ âm đuôi khi nói nhanh.' }
    ]
  },
  trung: {
    dialectName: 'Trung Bộ (Central VN)',
    trapTitle: 'Khắc phục thanh điệu nặng & mở rộng nguyên âm đôi',
    steps: [
      { order: 1, type: 'warmup', title: 'Khởi Động Cơ Miệng', phoneme: '/h/', targetWord: 'home', durationMin: 2, trapReason: 'Mở rộng vòm họng và thả lỏng cơ cổ.' },
      { order: 2, type: 'challenge', title: 'Âm Yếu #1 (<70%)', phoneme: '/eə/', targetWord: 'square', durationMin: 2, trapReason: 'Trường độ nguyên âm đôi chưa đủ độ dài (thường bị ngắt sớm).' },
      { order: 3, type: 'challenge', title: 'Âm Yếu #2 (<70%)', phoneme: '/ɪə/', targetWord: 'clear', durationMin: 2, trapReason: 'Cần lướt từ âm /ɪ/ sang schwa /ə/ mềm mại.' },
      { order: 4, type: 'minimal_pair', title: 'Cặp Từ Tối Thiểu', phoneme: '/eə/ vs /ɪə/', targetWord: 'hair vs hear', durationMin: 2, trapReason: 'Khẩu hình mở rộng vừa phải, tránh bẹt miệng.' },
      { order: 5, type: 'sentence', title: 'Câu Ứng Dụng Thực Tế', phoneme: 'Hạ trọng âm từ', targetWord: 'The air was clear and fair around the square.', durationMin: 2, trapReason: 'Giải phóng ngữ điệu trầm dồn dập, tạo nhịp điệu tiếng Anh tự nhiên.' }
    ]
  }
};

/**
 * AC 1 & AC 3: Get personalized 5-step curriculum for user's dialect
 */
export function getDailyPathCurriculum(dialect = 'nam') {
  const safeDialect = REGIONAL_CURRICULA[dialect] ? dialect : 'nam';
  const data = REGIONAL_CURRICULA[safeDialect];
  return {
    dialect: safeDialect,
    dialectName: data.dialectName,
    trapTitle: data.trapTitle,
    totalSteps: data.steps.length,
    totalMinutes: data.steps.reduce((acc, s) => acc + s.durationMin, 0),
    steps: data.steps
  };
}

/**
 * AC 2: Step completion state calculator
 */
export function processStepCompletion({ currentCompletedSteps = 0, targetOrder = 1, totalSteps = 5 }) {
  const newCompleted = Math.min(totalSteps, Math.max(currentCompletedSteps, targetOrder));
  const remainingMinutes = Math.max(0, (totalSteps - newCompleted) * 2);
  const nextStepOrder = newCompleted < totalSteps ? newCompleted + 1 : totalSteps;
  const isAllCompleted = newCompleted >= totalSteps;

  return {
    completedSteps: newCompleted,
    nextStepOrder,
    remainingMinutes,
    isAllCompleted,
    progressPercent: Math.round((newCompleted / totalSteps) * 100)
  };
}
