/**
 * Vietnamese Native-Tongue Mouth & Tongue Placement Calibration (VN-105)
 * Pedagogical articulatory guides contrasting Vietnamese L1 oral posture with English targets.
 * Features 3-step practical cues, side-by-side palate posture comparison, tactile mnemonics, and feedback evaluation.
 */

export const NATIVE_PLACEMENT_GUIDES = [
  {
    id: 'guide_dh',
    phoneme: '/ð/',
    title: 'Âm Xát Răng Hữu Thanh (this, that, brother)',
    difficultyLevel: 'Rất Cao cho Người Việt',
    vietnameseAnalogy: 'Tiếng ong vo ve "zzz" khi kẹp lưỡi giữa hai hàm răng',
    threeSteps: [
      {
        step: 1,
        name: 'Kẹp Nhẹ Đầu Lưỡi',
        action: 'Thò nhẹ 2–3mm đầu lưỡi ra giữa 2 hàm răng cửa trên và dưới.',
        visualCue: 'tongue_interdental',
        detail: 'Hàm răng trên chỉ chạm hờ lên mặt lưỡi, tuyệt đối không cắn chặt làm nghẹt hơi.'
      },
      {
        step: 2,
        name: 'Rung Tiếng Ong "zzz"',
        action: 'Rung mạnh dây thanh quản ở cổ họng đẩy âm qua kẽ răng.',
        visualCue: 'vocal_cord_vibrate',
        detail: 'Tạo cảm giác ngứa ran tê nhẹ ở đầu lưỡi như luồng điện thoại rung.'
      },
      {
        step: 3,
        name: 'Rụt Lưỡi Nhả Âm',
        action: 'Rụt nhanh đầu lưỡi về khoang miệng để chuyển tiếp sang nguyên âm tiếp theo.',
        visualCue: 'retract_smooth',
        detail: 'Rút dứt khoát và mượt mà, không bật đập vào răng để tránh biến thành âm /d/.'
      }
    ],
    contrastPalate: {
      vietnamesePosture: 'Thói quen tiếng Việt: Vòm miệng mềm thả lỏng, đầu lưỡi thụt sâu sau răng hoặc chạm chân răng tạo âm /d/ cứng (như "đít", "đát") hoặc /z/ mềm (như "dít", "dát").',
      englishPosture: 'Vòm họng căng, luồng hơi nén mạnh qua khe hẹp giữa đầu lưỡi và răng cửa trên kèm độ rung liên tục của dây thanh.'
    },
    tactileMnemonic: {
      action: 'Đặt 2 ngón tay lên thanh quản (yết hầu)',
      sensation: 'Cổ họng bạn phải rung rần rần rõ rệt khi phát âm từ "this", "mother", "breathe". Nếu không rung, bạn đang nhầm sang âm vô thanh /θ/!',
      icon: 'touch_app'
    },
    benchmarkWords: [
      { word: 'this', ipa: '/ðɪs/', meaning: 'cái này' },
      { word: 'that', ipa: '/ðæt/', meaning: 'cái kia' },
      { word: 'brother', ipa: '/ˈbrʌðər/', meaning: 'anh/em trai' },
      { word: 'breathe', ipa: '/briːð/', meaning: 'hít thở' }
    ]
  },
  {
    id: 'guide_th',
    phoneme: '/θ/',
    title: 'Âm Xát Răng Vô Thanh (think, thank, breath)',
    difficultyLevel: 'Cao cho Người Việt',
    vietnameseAnalogy: 'Tiếng gió phà mát rượi qua đầu lưỡi kẹp răng',
    threeSteps: [
      {
        step: 1,
        name: 'Kẹp Lưỡi Chuẩn Bị',
        action: 'Cắn nhẹ 2mm đầu lưỡi giữa 2 hàm răng như âm /ð/.',
        visualCue: 'tongue_interdental',
        detail: 'Miệng hé khoảng 5mm, cơ cằm thả lỏng tự nhiên.'
      },
      {
        step: 2,
        name: 'Thổi Gió Mát (Không Rung)',
        action: 'Thổi luồng hơi gió mát liên tục ra ngoài qua khe hở.',
        visualCue: 'cool_air_blow',
        detail: 'Dây thanh quản hoàn toàn im lặng, chỉ có tiếng gió xì xào êm dịu.'
      },
      {
        step: 3,
        name: 'Nhả Hơi Đều Đặn',
        action: 'Duy trì luồng gió ổn định, không giật cục thành tiếng "thờ" hay "tờ".',
        visualCue: 'air_stream_steady',
        detail: 'Tuyệt đối không đập lưỡi vào vòm họng tạo tiếng "tơ-ti" (thirty).'
      }
    ],
    contrastPalate: {
      vietnamesePosture: 'Người Việt có xu hướng thụt lưỡi vào trong đập vào chân răng tạo thành âm "t" (/t/) hoặc âm "th" tiếng Việt (bật hơi vòm mềm).',
      englishPosture: 'Đầu lưỡi luôn lộ ra ngoài răng, tạo khe xát phẳng đều giữa lưỡi và răng cửa.'
    },
    tactileMnemonic: {
      action: 'Đặt lòng bàn tay cách miệng 3cm',
      sensation: 'Bạn phải cảm nhận được luồng gió mát phà trực tiếp vào lòng bàn tay như một chiếc quạt gió mini!',
      icon: 'air'
    },
    benchmarkWords: [
      { word: 'think', ipa: '/θɪŋk/', meaning: 'suy nghĩ' },
      { word: 'thank', ipa: '/θæŋk/', meaning: 'cảm ơn' },
      { word: 'thirty', ipa: '/ˈθɜːrti/', meaning: 'ba mươi' },
      { word: 'breath', ipa: '/breθ/', meaning: 'hơi thở' }
    ]
  },
  {
    id: 'guide_ae',
    phoneme: '/æ/',
    title: 'Nguyên Âm "A Bẹt" Mở Quai Hàm (cat, map, apple)',
    difficultyLevel: 'Trung Bình – Bẫy Phản Xạ Ngắn',
    vietnameseAnalogy: 'Khẩu hình cười to hết cỡ kết hợp hạ quai hàm 2 ngón tay',
    threeSteps: [
      {
        step: 1,
        name: 'Hạ Quai Hàm 2 Ngón Tay',
        action: 'Mở rộng cằm dưới xuống khoảng 2 đốt ngón tay.',
        visualCue: 'jaw_drop_double',
        detail: 'Mở rộng miệng gấp đôi so với âm "a" hay "e" bình thường của tiếng Việt.'
      },
      {
        step: 2,
        name: 'Cười Kéo Rộng Khóe Môi',
        action: 'Kéo căng 2 khóe miệng sang 2 bên như đang mỉm cười toe toét.',
        visualCue: 'wide_smile',
        detail: 'Môi mỏng áp sát vào răng, không chúm môi.'
      },
      {
        step: 3,
        name: 'Dẹt Lưỡi Sát Sàn Miệng',
        action: 'Đầu lưỡi chạm chân răng cửa dưới, thân lưỡi ép dẹt xuống đáy miệng.',
        visualCue: 'flat_tongue_floor',
        detail: 'Phát âm lai giữa âm "a" và "e", dứt khoát và căng cơ miệng.'
      }
    ],
    contrastPalate: {
      vietnamesePosture: 'Khẩu hình tiếng Việt thường nhỏ và khép, cơ mặt thả lỏng, khiến âm /æ/ bị biến thành "e" hẹp (như "két" thay vì "cat").',
      englishPosture: 'Quai hàm hạ sâu mở toang khoang miệng, cơ má và môi kéo căng sang hai bên.'
    },
    tactileMnemonic: {
      action: 'Dựng đứng 2 ngón tay trỏ và giữa áp vào khoảng hở răng',
      sensation: 'Khoảng cách giữa 2 hàm răng cửa phải đủ rộng để vừa khít 2 ngón tay của bạn!',
      icon: 'straighten'
    },
    benchmarkWords: [
      { word: 'cat', ipa: '/kæt/', meaning: 'con mèo' },
      { word: 'apple', ipa: '/ˈæpl/', meaning: 'quả táo' },
      { word: 'man', ipa: '/mæn/', meaning: 'người đàn ông' },
      { word: 'black', ipa: '/blæk/', meaning: 'màu đen' }
    ]
  }
];

export function getPlacementGuidesCatalog() {
  return NATIVE_PLACEMENT_GUIDES;
}

export function getPlacementGuideByPhoneme(phonemeOrId) {
  if (!phonemeOrId) return null;
  const normalized = phonemeOrId.trim().toLowerCase();
  return NATIVE_PLACEMENT_GUIDES.find(
    (g) => g.id.toLowerCase() === normalized || g.phoneme.toLowerCase() === normalized
  ) || null;
}

export function evaluatePlacementFeedback({
  phoneme,
  rating = 5,
  feedbackNote = ''
}) {
  const guide = getPlacementGuideByPhoneme(phoneme);
  if (!guide) {
    return {
      success: false,
      error: `Placement guide not found for phoneme: ${phoneme}`
    };
  }

  const cleanRating = Math.max(1, Math.min(5, Number(rating) || 5));
  const isHelpful = cleanRating >= 4;

  return {
    success: true,
    guideId: guide.id,
    phoneme: guide.phoneme,
    title: guide.title,
    rating: cleanRating,
    isHelpful,
    feedbackNote: feedbackNote.trim(),
    message: isHelpful
      ? `Cảm ơn bạn! Mẹo xúc giác cấu âm ${guide.phoneme} đã được ghi nhận vào hồ sơ luyện tập.`
      : `Hệ thống ghi nhận đánh giá của bạn để cải tiến cẩm nang cấu âm ${guide.phoneme} thêm sinh động!`
  };
}
