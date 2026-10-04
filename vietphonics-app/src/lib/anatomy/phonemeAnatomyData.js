/**
 * 2D Biomechanical Sagittal Vocal Tract Data Library (PRON-201)
 * COMPLETE 44 GENERAL AMERICAN IPA PHONEMES DATASET
 * 12 Monophthongs + 8 Diphthongs + 24 Consonants
 * Biomechanically precise SVG Bézier curves, L1 Vietnamese Ghost Overlays,
 * Tactile biofeedback tricks, and Coronal Lip geometries.
 */

export const PHONEME_ANATOMY_CATALOG = {
  "/iː/": {
    "phoneme": "/iː/",
    "name": "Close Front Unrounded Vowel",
    "vietnameseName": "Nguyên âm i dài",
    "category": "monophthong",
    "categoryVi": "Nguyên Âm Đơn",
    "subCategory": "Front Vowel",
    "sampleWord": "sheep",
    "sampleIpa": "/ʃiːp/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 82,
      "jawDrop": 15,
      "airPressure": 55
    },
    "tonguePath": "M 330 400 C 340 330, 380 230, 440 205 C 475 195, 505 230, 520 260 C 525 270, 505 295, 470 310 C 430 340, 395 375, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 340, 380 260, 430 240 C 465 235, 495 260, 505 285 C 475 320, 420 360, 390 420 Z",
    "constrictionPoint": {
      "x": 445,
      "y": 205,
      "gapLabel": "Vòm Cứng Trước: 2.0mm"
    },
    "frictionIndex": 15,
    "contactTarget": "Thân Lưỡi Nâng Rất Cao Sát Vòm Cứng Trước",
    "l1Mistake": "Đọc ngắn cụt như âm \"i\" tiếng Việt, môi không kéo căng sang hai bên.",
    "correctiveGuidance": "Kéo khóe miệng sang hai bên như đang cười tươi. Đẩy thân trước của lưỡi lên rất cao sát vòm cứng, duy trì âm dài ngân vang.",
    "tactileTrick": "Đặt 2 ngón tay lên hai bên khóe môi và cảm nhận cơ mép môi căng cứng khi kéo dài \"eeeee\".",
    "lipShape": {
      "coronalType": "spread",
      "label": "Cười mở rộng sang 2 bên",
      "mouthOpening": 20,
      "lipRoundness": 10
    },
    "audioTone": {
      "freq": 440,
      "f1": 280,
      "f2": 2250
    }
  },
  "iː": {
    "phoneme": "/iː/",
    "name": "Close Front Unrounded Vowel",
    "vietnameseName": "Nguyên âm i dài",
    "category": "monophthong",
    "categoryVi": "Nguyên Âm Đơn",
    "subCategory": "Front Vowel",
    "sampleWord": "sheep",
    "sampleIpa": "/ʃiːp/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 82,
      "jawDrop": 15,
      "airPressure": 55
    },
    "tonguePath": "M 330 400 C 340 330, 380 230, 440 205 C 475 195, 505 230, 520 260 C 525 270, 505 295, 470 310 C 430 340, 395 375, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 340, 380 260, 430 240 C 465 235, 495 260, 505 285 C 475 320, 420 360, 390 420 Z",
    "constrictionPoint": {
      "x": 445,
      "y": 205,
      "gapLabel": "Vòm Cứng Trước: 2.0mm"
    },
    "frictionIndex": 15,
    "contactTarget": "Thân Lưỡi Nâng Rất Cao Sát Vòm Cứng Trước",
    "l1Mistake": "Đọc ngắn cụt như âm \"i\" tiếng Việt, môi không kéo căng sang hai bên.",
    "correctiveGuidance": "Kéo khóe miệng sang hai bên như đang cười tươi. Đẩy thân trước của lưỡi lên rất cao sát vòm cứng, duy trì âm dài ngân vang.",
    "tactileTrick": "Đặt 2 ngón tay lên hai bên khóe môi và cảm nhận cơ mép môi căng cứng khi kéo dài \"eeeee\".",
    "lipShape": {
      "coronalType": "spread",
      "label": "Cười mở rộng sang 2 bên",
      "mouthOpening": 20,
      "lipRoundness": 10
    },
    "audioTone": {
      "freq": 440,
      "f1": 280,
      "f2": 2250
    }
  },
  "/ɪ/": {
    "phoneme": "/ɪ/",
    "name": "Near-Close Near-Front Vowel",
    "vietnameseName": "Nguyên âm i ngắn",
    "category": "monophthong",
    "categoryVi": "Nguyên Âm Đơn",
    "subCategory": "Front Vowel",
    "sampleWord": "ship",
    "sampleIpa": "/ʃɪp/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 68,
      "jawDrop": 28,
      "airPressure": 50
    },
    "tonguePath": "M 330 400 C 340 340, 375 250, 435 225 C 470 215, 495 245, 510 270 C 515 280, 495 305, 465 320 C 425 350, 395 380, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 330, 380 230, 440 205 C 475 195, 505 230, 520 260 C 525 270, 505 295, 470 310 C 430 340, 395 375, 390 420 Z",
    "constrictionPoint": {
      "x": 435,
      "y": 225,
      "gapLabel": "Khoảng Cách Vòm: 4.0mm"
    },
    "frictionIndex": 18,
    "contactTarget": "Lưỡi Thấp Hơn /iː/ Một Chút, Thả Lỏng Môi",
    "l1Mistake": "Dễ nhầm lẫn với /iː/ dài (đọc \"ship\" thành \"sheep\" gây hiểu nhầm nghĩa).",
    "correctiveGuidance": "Hạ hàm mở nhẹ hơn /iː/, thả lỏng cơ môi và lưỡi. Phát âm dứt khoát, âm sắc nằm giữa \"i\" và \"ê\".",
    "tactileTrick": "Cảm giác quai hàm hơi rơi xuống khoảng nửa đốt ngón tay khi phát ra âm \"ɪ\" giật nhanh.",
    "lipShape": {
      "coronalType": "neutral",
      "label": "Hơi mở nhẹ, thả lỏng",
      "mouthOpening": 30,
      "lipRoundness": 15
    },
    "audioTone": {
      "freq": 390,
      "f1": 400,
      "f2": 1950
    }
  },
  "ɪ": {
    "phoneme": "/ɪ/",
    "name": "Near-Close Near-Front Vowel",
    "vietnameseName": "Nguyên âm i ngắn",
    "category": "monophthong",
    "categoryVi": "Nguyên Âm Đơn",
    "subCategory": "Front Vowel",
    "sampleWord": "ship",
    "sampleIpa": "/ʃɪp/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 68,
      "jawDrop": 28,
      "airPressure": 50
    },
    "tonguePath": "M 330 400 C 340 340, 375 250, 435 225 C 470 215, 495 245, 510 270 C 515 280, 495 305, 465 320 C 425 350, 395 380, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 330, 380 230, 440 205 C 475 195, 505 230, 520 260 C 525 270, 505 295, 470 310 C 430 340, 395 375, 390 420 Z",
    "constrictionPoint": {
      "x": 435,
      "y": 225,
      "gapLabel": "Khoảng Cách Vòm: 4.0mm"
    },
    "frictionIndex": 18,
    "contactTarget": "Lưỡi Thấp Hơn /iː/ Một Chút, Thả Lỏng Môi",
    "l1Mistake": "Dễ nhầm lẫn với /iː/ dài (đọc \"ship\" thành \"sheep\" gây hiểu nhầm nghĩa).",
    "correctiveGuidance": "Hạ hàm mở nhẹ hơn /iː/, thả lỏng cơ môi và lưỡi. Phát âm dứt khoát, âm sắc nằm giữa \"i\" và \"ê\".",
    "tactileTrick": "Cảm giác quai hàm hơi rơi xuống khoảng nửa đốt ngón tay khi phát ra âm \"ɪ\" giật nhanh.",
    "lipShape": {
      "coronalType": "neutral",
      "label": "Hơi mở nhẹ, thả lỏng",
      "mouthOpening": 30,
      "lipRoundness": 15
    },
    "audioTone": {
      "freq": 390,
      "f1": 400,
      "f2": 1950
    }
  },
  "/e/": {
    "phoneme": "/e/",
    "name": "Open-Mid Front Unrounded Vowel",
    "vietnameseName": "Nguyên âm e ngắn",
    "category": "monophthong",
    "categoryVi": "Nguyên Âm Đơn",
    "subCategory": "Front Vowel",
    "sampleWord": "bed",
    "sampleIpa": "/bed/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 55,
      "jawDrop": 40,
      "airPressure": 50
    },
    "tonguePath": "M 330 400 C 340 345, 370 270, 420 250 C 455 240, 485 265, 495 285 C 500 295, 480 320, 450 335 C 415 360, 395 385, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 340, 365 285, 410 275 C 445 270, 470 290, 480 310 C 440 345, 405 375, 390 420 Z",
    "constrictionPoint": {
      "x": 420,
      "y": 250,
      "gapLabel": "Độ Mở Miệng: 6.0mm"
    },
    "frictionIndex": 12,
    "contactTarget": "Thân Lưỡi Nằm Ở Tầng Giữa Khoang Miệng",
    "l1Mistake": "Người Việt thường đọc thành âm \"ê\" hẹp hoặc bẹt quá thành \"e\".",
    "correctiveGuidance": "Khẩu hình mở rộng hơn /ɪ/, hai khóe miệng thả lỏng tự nhiên, đầu lưỡi chạm nhẹ chân răng cửa dưới.",
    "tactileTrick": "Đưa ngón tay vào giữa 2 hàm răng, khoảng cách vừa vặn lọt 1 ngón tay trỏ nằm ngang.",
    "lipShape": {
      "coronalType": "neutral",
      "label": "Mở vừa phải, không kéo khóe môi",
      "mouthOpening": 42,
      "lipRoundness": 10
    },
    "audioTone": {
      "freq": 370,
      "f1": 550,
      "f2": 1800
    }
  },
  "e": {
    "phoneme": "/e/",
    "name": "Open-Mid Front Unrounded Vowel",
    "vietnameseName": "Nguyên âm e ngắn",
    "category": "monophthong",
    "categoryVi": "Nguyên Âm Đơn",
    "subCategory": "Front Vowel",
    "sampleWord": "bed",
    "sampleIpa": "/bed/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 55,
      "jawDrop": 40,
      "airPressure": 50
    },
    "tonguePath": "M 330 400 C 340 345, 370 270, 420 250 C 455 240, 485 265, 495 285 C 500 295, 480 320, 450 335 C 415 360, 395 385, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 340, 365 285, 410 275 C 445 270, 470 290, 480 310 C 440 345, 405 375, 390 420 Z",
    "constrictionPoint": {
      "x": 420,
      "y": 250,
      "gapLabel": "Độ Mở Miệng: 6.0mm"
    },
    "frictionIndex": 12,
    "contactTarget": "Thân Lưỡi Nằm Ở Tầng Giữa Khoang Miệng",
    "l1Mistake": "Người Việt thường đọc thành âm \"ê\" hẹp hoặc bẹt quá thành \"e\".",
    "correctiveGuidance": "Khẩu hình mở rộng hơn /ɪ/, hai khóe miệng thả lỏng tự nhiên, đầu lưỡi chạm nhẹ chân răng cửa dưới.",
    "tactileTrick": "Đưa ngón tay vào giữa 2 hàm răng, khoảng cách vừa vặn lọt 1 ngón tay trỏ nằm ngang.",
    "lipShape": {
      "coronalType": "neutral",
      "label": "Mở vừa phải, không kéo khóe môi",
      "mouthOpening": 42,
      "lipRoundness": 10
    },
    "audioTone": {
      "freq": 370,
      "f1": 550,
      "f2": 1800
    }
  },
  "/æ/": {
    "phoneme": "/æ/",
    "name": "Near-Open Front Unrounded Vowel",
    "vietnameseName": "Nguyên âm e bẹt / a bẹt",
    "category": "monophthong",
    "categoryVi": "Nguyên Âm Đơn",
    "subCategory": "Front Vowel",
    "sampleWord": "cat",
    "sampleIpa": "/kæt/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 25,
      "jawDrop": 72,
      "airPressure": 60
    },
    "tonguePath": "M 330 400 C 340 360, 365 310, 410 300 C 445 295, 475 315, 485 335 C 490 345, 465 365, 435 375 C 400 390, 390 410, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 345, 370 270, 420 250 C 455 240, 485 265, 495 285 C 500 295, 480 320, 450 335 C 415 360, 395 385, 390 420 Z",
    "constrictionPoint": {
      "x": 410,
      "y": 300,
      "gapLabel": "Hạ Hàm Sâu: 12.0mm"
    },
    "frictionIndex": 20,
    "contactTarget": "Lưỡi Dẹt Phẳng, Hạ Quai Hàm Rất Thấp",
    "l1Mistake": "Miệng mở không đủ rộng, phát âm thành âm \"e\" thông thường (nhầm \"cat\" thành \"ket\").",
    "correctiveGuidance": "Hạ tối đa quai hàm xuống dưới và đồng thời căng khóe môi sang 2 bên. Lưỡi nằm bẹp dưới đáy miệng.",
    "tactileTrick": "Mở hàm rộng đến mức có thể nhét vừa 2 ngón tay trỏ và giữa đặt chồng lên nhau!",
    "lipShape": {
      "coronalType": "open",
      "label": "Mở to hết cỡ + dẹt ngang",
      "mouthOpening": 75,
      "lipRoundness": 5
    },
    "audioTone": {
      "freq": 320,
      "f1": 850,
      "f2": 1600
    }
  },
  "æ": {
    "phoneme": "/æ/",
    "name": "Near-Open Front Unrounded Vowel",
    "vietnameseName": "Nguyên âm e bẹt / a bẹt",
    "category": "monophthong",
    "categoryVi": "Nguyên Âm Đơn",
    "subCategory": "Front Vowel",
    "sampleWord": "cat",
    "sampleIpa": "/kæt/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 25,
      "jawDrop": 72,
      "airPressure": 60
    },
    "tonguePath": "M 330 400 C 340 360, 365 310, 410 300 C 445 295, 475 315, 485 335 C 490 345, 465 365, 435 375 C 400 390, 390 410, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 345, 370 270, 420 250 C 455 240, 485 265, 495 285 C 500 295, 480 320, 450 335 C 415 360, 395 385, 390 420 Z",
    "constrictionPoint": {
      "x": 410,
      "y": 300,
      "gapLabel": "Hạ Hàm Sâu: 12.0mm"
    },
    "frictionIndex": 20,
    "contactTarget": "Lưỡi Dẹt Phẳng, Hạ Quai Hàm Rất Thấp",
    "l1Mistake": "Miệng mở không đủ rộng, phát âm thành âm \"e\" thông thường (nhầm \"cat\" thành \"ket\").",
    "correctiveGuidance": "Hạ tối đa quai hàm xuống dưới và đồng thời căng khóe môi sang 2 bên. Lưỡi nằm bẹp dưới đáy miệng.",
    "tactileTrick": "Mở hàm rộng đến mức có thể nhét vừa 2 ngón tay trỏ và giữa đặt chồng lên nhau!",
    "lipShape": {
      "coronalType": "open",
      "label": "Mở to hết cỡ + dẹt ngang",
      "mouthOpening": 75,
      "lipRoundness": 5
    },
    "audioTone": {
      "freq": 320,
      "f1": 850,
      "f2": 1600
    }
  },
  "/ʌ/": {
    "phoneme": "/ʌ/",
    "name": "Open-Mid Back Unrounded Vowel",
    "vietnameseName": "Nguyên âm á ngắn (Strut)",
    "category": "monophthong",
    "categoryVi": "Nguyên Âm Đơn",
    "subCategory": "Central Vowel",
    "sampleWord": "cup",
    "sampleIpa": "/kʌp/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 40,
      "jawDrop": 55,
      "airPressure": 55
    },
    "tonguePath": "M 330 400 C 340 355, 360 300, 400 285 C 435 280, 465 305, 475 325 C 480 335, 455 355, 425 365 C 395 385, 390 410, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 365, 355 330, 390 320 C 425 315, 450 335, 460 355 C 430 380, 395 405, 390 420 Z",
    "constrictionPoint": {
      "x": 400,
      "y": 285,
      "gapLabel": "Vòm Họng Giữa: 8.0mm"
    },
    "frictionIndex": 14,
    "contactTarget": "Thân Lưỡi Hơi Lùi Về Sau, Thả Lỏng Môi",
    "l1Mistake": "Đọc quá giống âm \"ă\" gắt hoặc \"ơ\" tiếng Việt.",
    "correctiveGuidance": "Miệng mở vừa phải, môi thả lỏng hình oval đứng, phát âm ngắn dứt khoát từ sâu trong họng.",
    "tactileTrick": "Âm thanh bật ra như tiếng thở dốc ngắn khi bị đấm nhẹ vào bụng!",
    "lipShape": {
      "coronalType": "neutral",
      "label": "Mở tự nhiên hình oval đứng",
      "mouthOpening": 50,
      "lipRoundness": 10
    },
    "audioTone": {
      "freq": 350,
      "f1": 700,
      "f2": 1250
    }
  },
  "ʌ": {
    "phoneme": "/ʌ/",
    "name": "Open-Mid Back Unrounded Vowel",
    "vietnameseName": "Nguyên âm á ngắn (Strut)",
    "category": "monophthong",
    "categoryVi": "Nguyên Âm Đơn",
    "subCategory": "Central Vowel",
    "sampleWord": "cup",
    "sampleIpa": "/kʌp/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 40,
      "jawDrop": 55,
      "airPressure": 55
    },
    "tonguePath": "M 330 400 C 340 355, 360 300, 400 285 C 435 280, 465 305, 475 325 C 480 335, 455 355, 425 365 C 395 385, 390 410, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 365, 355 330, 390 320 C 425 315, 450 335, 460 355 C 430 380, 395 405, 390 420 Z",
    "constrictionPoint": {
      "x": 400,
      "y": 285,
      "gapLabel": "Vòm Họng Giữa: 8.0mm"
    },
    "frictionIndex": 14,
    "contactTarget": "Thân Lưỡi Hơi Lùi Về Sau, Thả Lỏng Môi",
    "l1Mistake": "Đọc quá giống âm \"ă\" gắt hoặc \"ơ\" tiếng Việt.",
    "correctiveGuidance": "Miệng mở vừa phải, môi thả lỏng hình oval đứng, phát âm ngắn dứt khoát từ sâu trong họng.",
    "tactileTrick": "Âm thanh bật ra như tiếng thở dốc ngắn khi bị đấm nhẹ vào bụng!",
    "lipShape": {
      "coronalType": "neutral",
      "label": "Mở tự nhiên hình oval đứng",
      "mouthOpening": 50,
      "lipRoundness": 10
    },
    "audioTone": {
      "freq": 350,
      "f1": 700,
      "f2": 1250
    }
  },
  "/ɑː/": {
    "phoneme": "/ɑː/",
    "name": "Open Back Unrounded Vowel",
    "vietnameseName": "Nguyên âm a dài sâu",
    "category": "monophthong",
    "categoryVi": "Nguyên Âm Đơn",
    "subCategory": "Back Vowel",
    "sampleWord": "father",
    "sampleIpa": "/ˈfɑːðər/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 20,
      "jawDrop": 75,
      "airPressure": 50
    },
    "tonguePath": "M 330 400 C 340 365, 350 325, 385 315 C 420 310, 450 335, 460 355 C 465 365, 440 380, 410 390 C 380 405, 390 415, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 360, 365 310, 410 300 C 445 295, 475 315, 485 335 C 490 345, 465 365, 435 375 C 400 390, 390 410, 390 420 Z",
    "constrictionPoint": {
      "x": 385,
      "y": 315,
      "gapLabel": "Cuống Họng Sau: 10.0mm"
    },
    "frictionIndex": 10,
    "contactTarget": "Cuống Lưỡi Hạ Thấp Tối Đa Sát Cổ Họng",
    "l1Mistake": "Phát âm nông ở đầu miệng như chữ \"A\" tiếng Việt.",
    "correctiveGuidance": "Mở rộng họng giống như khi bác sĩ yêu cầu bạn há miệng nói \"Aaa\". Lưỡi kéo sâu về sau, ngân dài trầm.",
    "tactileTrick": "Nhìn vào gương thấy rõ lưỡi gà và khoảng sâu hun hút trong cuống họng.",
    "lipShape": {
      "coronalType": "open",
      "label": "Há to tròn sâu",
      "mouthOpening": 80,
      "lipRoundness": 15
    },
    "audioTone": {
      "freq": 310,
      "f1": 800,
      "f2": 1100
    }
  },
  "ɑː": {
    "phoneme": "/ɑː/",
    "name": "Open Back Unrounded Vowel",
    "vietnameseName": "Nguyên âm a dài sâu",
    "category": "monophthong",
    "categoryVi": "Nguyên Âm Đơn",
    "subCategory": "Back Vowel",
    "sampleWord": "father",
    "sampleIpa": "/ˈfɑːðər/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 20,
      "jawDrop": 75,
      "airPressure": 50
    },
    "tonguePath": "M 330 400 C 340 365, 350 325, 385 315 C 420 310, 450 335, 460 355 C 465 365, 440 380, 410 390 C 380 405, 390 415, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 360, 365 310, 410 300 C 445 295, 475 315, 485 335 C 490 345, 465 365, 435 375 C 400 390, 390 410, 390 420 Z",
    "constrictionPoint": {
      "x": 385,
      "y": 315,
      "gapLabel": "Cuống Họng Sau: 10.0mm"
    },
    "frictionIndex": 10,
    "contactTarget": "Cuống Lưỡi Hạ Thấp Tối Đa Sát Cổ Họng",
    "l1Mistake": "Phát âm nông ở đầu miệng như chữ \"A\" tiếng Việt.",
    "correctiveGuidance": "Mở rộng họng giống như khi bác sĩ yêu cầu bạn há miệng nói \"Aaa\". Lưỡi kéo sâu về sau, ngân dài trầm.",
    "tactileTrick": "Nhìn vào gương thấy rõ lưỡi gà và khoảng sâu hun hút trong cuống họng.",
    "lipShape": {
      "coronalType": "open",
      "label": "Há to tròn sâu",
      "mouthOpening": 80,
      "lipRoundness": 15
    },
    "audioTone": {
      "freq": 310,
      "f1": 800,
      "f2": 1100
    }
  },
  "/ɒ/": {
    "phoneme": "/ɒ/",
    "name": "Open Back Rounded Vowel",
    "vietnameseName": "Nguyên âm o ngắn",
    "category": "monophthong",
    "categoryVi": "Nguyên Âm Đơn",
    "subCategory": "Back Vowel",
    "sampleWord": "pot",
    "sampleIpa": "/pɒt/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 30,
      "jawDrop": 65,
      "airPressure": 55
    },
    "tonguePath": "M 330 400 C 340 360, 355 315, 395 305 C 430 300, 460 325, 470 345 C 475 355, 450 375, 420 385 C 385 405, 390 415, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 350, 360 270, 400 260 C 435 255, 465 280, 475 305 C 440 340, 405 375, 390 420 Z",
    "constrictionPoint": {
      "x": 395,
      "y": 305,
      "gapLabel": "Khoang Miệng Sau: 8.5mm"
    },
    "frictionIndex": 16,
    "contactTarget": "Môi Hơi Tròn, Cuống Lưỡi Hơi Nâng Sau",
    "l1Mistake": "Chu môi quá nhiều biến thành \"ô\" hoặc không chu môi thành \"a\".",
    "correctiveGuidance": "Hạ hàm mở rộng, môi hơi khum tròn nhẹ, phát ra âm dứt khoát ngắn.",
    "tactileTrick": "Tạo hình môi giống hình quả trứng gà dựng đứng.",
    "lipShape": {
      "coronalType": "round",
      "label": "Khum tròn nhẹ hình bầu dục",
      "mouthOpening": 65,
      "lipRoundness": 45
    },
    "audioTone": {
      "freq": 330,
      "f1": 750,
      "f2": 1000
    }
  },
  "ɒ": {
    "phoneme": "/ɒ/",
    "name": "Open Back Rounded Vowel",
    "vietnameseName": "Nguyên âm o ngắn",
    "category": "monophthong",
    "categoryVi": "Nguyên Âm Đơn",
    "subCategory": "Back Vowel",
    "sampleWord": "pot",
    "sampleIpa": "/pɒt/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 30,
      "jawDrop": 65,
      "airPressure": 55
    },
    "tonguePath": "M 330 400 C 340 360, 355 315, 395 305 C 430 300, 460 325, 470 345 C 475 355, 450 375, 420 385 C 385 405, 390 415, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 350, 360 270, 400 260 C 435 255, 465 280, 475 305 C 440 340, 405 375, 390 420 Z",
    "constrictionPoint": {
      "x": 395,
      "y": 305,
      "gapLabel": "Khoang Miệng Sau: 8.5mm"
    },
    "frictionIndex": 16,
    "contactTarget": "Môi Hơi Tròn, Cuống Lưỡi Hơi Nâng Sau",
    "l1Mistake": "Chu môi quá nhiều biến thành \"ô\" hoặc không chu môi thành \"a\".",
    "correctiveGuidance": "Hạ hàm mở rộng, môi hơi khum tròn nhẹ, phát ra âm dứt khoát ngắn.",
    "tactileTrick": "Tạo hình môi giống hình quả trứng gà dựng đứng.",
    "lipShape": {
      "coronalType": "round",
      "label": "Khum tròn nhẹ hình bầu dục",
      "mouthOpening": 65,
      "lipRoundness": 45
    },
    "audioTone": {
      "freq": 330,
      "f1": 750,
      "f2": 1000
    }
  },
  "/ɔː/": {
    "phoneme": "/ɔː/",
    "name": "Open-Mid Back Rounded Vowel",
    "vietnameseName": "Nguyên âm o dài",
    "category": "monophthong",
    "categoryVi": "Nguyên Âm Đơn",
    "subCategory": "Back Vowel",
    "sampleWord": "door",
    "sampleIpa": "/dɔːr/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 45,
      "jawDrop": 50,
      "airPressure": 55
    },
    "tonguePath": "M 330 400 C 340 350, 360 275, 405 265 C 440 260, 470 285, 480 310 C 485 320, 460 345, 430 360 C 395 385, 390 410, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 360, 355 315, 395 305 C 430 300, 460 325, 470 345 C 475 355, 450 375, 420 385 C 385 405, 390 415, 390 420 Z",
    "constrictionPoint": {
      "x": 405,
      "y": 265,
      "gapLabel": "Vòm Miệng Sau: 6.0mm"
    },
    "frictionIndex": 18,
    "contactTarget": "Môi Chu Tròn Rõ Rệt, Cuống Lưỡi Nâng Trung Bình",
    "l1Mistake": "Đọc cụt và nông thành chữ \"o\" tiếng Việt.",
    "correctiveGuidance": "Chu môi tròn hẳn ra phía trước thành hình ống nhỏ, nâng cuống lưỡi lên và kéo dài âm.",
    "tactileTrick": "Đặt ống hút vào miệng và phát âm \"awww\" sao cho môi ôm khít quanh ống hút.",
    "lipShape": {
      "coronalType": "round",
      "label": "Chu tròn hình chữ O",
      "mouthOpening": 50,
      "lipRoundness": 75
    },
    "audioTone": {
      "freq": 360,
      "f1": 600,
      "f2": 950
    }
  },
  "ɔː": {
    "phoneme": "/ɔː/",
    "name": "Open-Mid Back Rounded Vowel",
    "vietnameseName": "Nguyên âm o dài",
    "category": "monophthong",
    "categoryVi": "Nguyên Âm Đơn",
    "subCategory": "Back Vowel",
    "sampleWord": "door",
    "sampleIpa": "/dɔːr/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 45,
      "jawDrop": 50,
      "airPressure": 55
    },
    "tonguePath": "M 330 400 C 340 350, 360 275, 405 265 C 440 260, 470 285, 480 310 C 485 320, 460 345, 430 360 C 395 385, 390 410, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 360, 355 315, 395 305 C 430 300, 460 325, 470 345 C 475 355, 450 375, 420 385 C 385 405, 390 415, 390 420 Z",
    "constrictionPoint": {
      "x": 405,
      "y": 265,
      "gapLabel": "Vòm Miệng Sau: 6.0mm"
    },
    "frictionIndex": 18,
    "contactTarget": "Môi Chu Tròn Rõ Rệt, Cuống Lưỡi Nâng Trung Bình",
    "l1Mistake": "Đọc cụt và nông thành chữ \"o\" tiếng Việt.",
    "correctiveGuidance": "Chu môi tròn hẳn ra phía trước thành hình ống nhỏ, nâng cuống lưỡi lên và kéo dài âm.",
    "tactileTrick": "Đặt ống hút vào miệng và phát âm \"awww\" sao cho môi ôm khít quanh ống hút.",
    "lipShape": {
      "coronalType": "round",
      "label": "Chu tròn hình chữ O",
      "mouthOpening": 50,
      "lipRoundness": 75
    },
    "audioTone": {
      "freq": 360,
      "f1": 600,
      "f2": 950
    }
  },
  "/ʊ/": {
    "phoneme": "/ʊ/",
    "name": "Near-Close Near-Back Vowel",
    "vietnameseName": "Nguyên âm u ngắn",
    "category": "monophthong",
    "categoryVi": "Nguyên Âm Đơn",
    "subCategory": "Back Vowel",
    "sampleWord": "foot",
    "sampleIpa": "/fʊt/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 70,
      "jawDrop": 25,
      "airPressure": 50
    },
    "tonguePath": "M 330 400 C 340 335, 365 245, 415 230 C 450 220, 480 250, 490 275 C 495 285, 470 310, 440 325 C 400 355, 390 400, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 325, 370 220, 420 200 C 455 190, 485 220, 495 250 C 500 260, 475 290, 445 310 C 405 345, 390 395, 390 420 Z",
    "constrictionPoint": {
      "x": 415,
      "y": 230,
      "gapLabel": "Vòm Họng Sau: 4.5mm"
    },
    "frictionIndex": 16,
    "contactTarget": "Cuống Lưỡi Nâng Cao, Môi Khum Hơi Chu",
    "l1Mistake": "Dễ nhầm lẫn với /uː/ dài (chu môi quá chặt) hoặc phát âm thành \"u\" tiếng Việt.",
    "correctiveGuidance": "Môi khum tròn nhẹ nhưng không chu nhọn. Phát âm ngắn và giật, âm vang đục nằm giữa \"u\" và \"ư\".",
    "tactileTrick": "Hai bên má hơi thả lỏng, không gồng cơ mép môi.",
    "lipShape": {
      "coronalType": "round",
      "label": "Khum tròn nhẹ, thả lỏng",
      "mouthOpening": 25,
      "lipRoundness": 60
    },
    "audioTone": {
      "freq": 380,
      "f1": 450,
      "f2": 1050
    }
  },
  "ʊ": {
    "phoneme": "/ʊ/",
    "name": "Near-Close Near-Back Vowel",
    "vietnameseName": "Nguyên âm u ngắn",
    "category": "monophthong",
    "categoryVi": "Nguyên Âm Đơn",
    "subCategory": "Back Vowel",
    "sampleWord": "foot",
    "sampleIpa": "/fʊt/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 70,
      "jawDrop": 25,
      "airPressure": 50
    },
    "tonguePath": "M 330 400 C 340 335, 365 245, 415 230 C 450 220, 480 250, 490 275 C 495 285, 470 310, 440 325 C 400 355, 390 400, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 325, 370 220, 420 200 C 455 190, 485 220, 495 250 C 500 260, 475 290, 445 310 C 405 345, 390 395, 390 420 Z",
    "constrictionPoint": {
      "x": 415,
      "y": 230,
      "gapLabel": "Vòm Họng Sau: 4.5mm"
    },
    "frictionIndex": 16,
    "contactTarget": "Cuống Lưỡi Nâng Cao, Môi Khum Hơi Chu",
    "l1Mistake": "Dễ nhầm lẫn với /uː/ dài (chu môi quá chặt) hoặc phát âm thành \"u\" tiếng Việt.",
    "correctiveGuidance": "Môi khum tròn nhẹ nhưng không chu nhọn. Phát âm ngắn và giật, âm vang đục nằm giữa \"u\" và \"ư\".",
    "tactileTrick": "Hai bên má hơi thả lỏng, không gồng cơ mép môi.",
    "lipShape": {
      "coronalType": "round",
      "label": "Khum tròn nhẹ, thả lỏng",
      "mouthOpening": 25,
      "lipRoundness": 60
    },
    "audioTone": {
      "freq": 380,
      "f1": 450,
      "f2": 1050
    }
  },
  "/uː/": {
    "phoneme": "/uː/",
    "name": "Close Back Rounded Vowel",
    "vietnameseName": "Nguyên âm u dài",
    "category": "monophthong",
    "categoryVi": "Nguyên Âm Đơn",
    "subCategory": "Back Vowel",
    "sampleWord": "boot",
    "sampleIpa": "/buːt/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 85,
      "jawDrop": 12,
      "airPressure": 55
    },
    "tonguePath": "M 330 400 C 340 325, 370 215, 425 195 C 460 185, 490 215, 500 245 C 505 255, 480 285, 450 305 C 410 340, 390 395, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 335, 365 245, 415 230 C 450 220, 480 250, 490 275 C 495 285, 470 310, 440 325 C 400 355, 390 400, 390 420 Z",
    "constrictionPoint": {
      "x": 425,
      "y": 195,
      "gapLabel": "Cuống Họng Trên: 2.0mm"
    },
    "frictionIndex": 12,
    "contactTarget": "Cuống Lưỡi Nâng Rất Cao Sát Vòm Mềm + Chu Môi Chặt",
    "l1Mistake": "Đọc âm ngắn cụt không đủ độ chu tròn của môi.",
    "correctiveGuidance": "Môi chu nhọn tròn hẳn ra trước như đang huýt sáo. Cuống lưỡi kéo cao sát vòm miệng mềm, ngân dài.",
    "tactileTrick": "Khoảng hở giữa hai môi chỉ nhỏ bằng đầu que tăm bông!",
    "lipShape": {
      "coronalType": "round",
      "label": "Chu nhọn tròn xoe như huýt sáo",
      "mouthOpening": 15,
      "lipRoundness": 95
    },
    "audioTone": {
      "freq": 410,
      "f1": 300,
      "f2": 900
    }
  },
  "uː": {
    "phoneme": "/uː/",
    "name": "Close Back Rounded Vowel",
    "vietnameseName": "Nguyên âm u dài",
    "category": "monophthong",
    "categoryVi": "Nguyên Âm Đơn",
    "subCategory": "Back Vowel",
    "sampleWord": "boot",
    "sampleIpa": "/buːt/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 85,
      "jawDrop": 12,
      "airPressure": 55
    },
    "tonguePath": "M 330 400 C 340 325, 370 215, 425 195 C 460 185, 490 215, 500 245 C 505 255, 480 285, 450 305 C 410 340, 390 395, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 335, 365 245, 415 230 C 450 220, 480 250, 490 275 C 495 285, 470 310, 440 325 C 400 355, 390 400, 390 420 Z",
    "constrictionPoint": {
      "x": 425,
      "y": 195,
      "gapLabel": "Cuống Họng Trên: 2.0mm"
    },
    "frictionIndex": 12,
    "contactTarget": "Cuống Lưỡi Nâng Rất Cao Sát Vòm Mềm + Chu Môi Chặt",
    "l1Mistake": "Đọc âm ngắn cụt không đủ độ chu tròn của môi.",
    "correctiveGuidance": "Môi chu nhọn tròn hẳn ra trước như đang huýt sáo. Cuống lưỡi kéo cao sát vòm miệng mềm, ngân dài.",
    "tactileTrick": "Khoảng hở giữa hai môi chỉ nhỏ bằng đầu que tăm bông!",
    "lipShape": {
      "coronalType": "round",
      "label": "Chu nhọn tròn xoe như huýt sáo",
      "mouthOpening": 15,
      "lipRoundness": 95
    },
    "audioTone": {
      "freq": 410,
      "f1": 300,
      "f2": 900
    }
  },
  "/ɜː/": {
    "phoneme": "/ɜː/",
    "name": "Open-Mid Central Unrounded Vowel",
    "vietnameseName": "Nguyên âm ơ dài (Nurse / Bird)",
    "category": "monophthong",
    "categoryVi": "Nguyên Âm Đơn",
    "subCategory": "Central Vowel",
    "sampleWord": "bird",
    "sampleIpa": "/bɜːrd/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 60,
      "jawDrop": 35,
      "airPressure": 55
    },
    "tonguePath": "M 330 400 C 340 345, 370 260, 415 245 C 450 240, 480 265, 490 290 C 495 300, 470 325, 440 340 C 405 365, 390 405, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 350, 365 285, 410 275 C 445 270, 475 295, 485 315 C 450 345, 405 375, 390 420 Z",
    "constrictionPoint": {
      "x": 415,
      "y": 245,
      "gapLabel": "Vòm Họng Trung Tâm: 5.0mm"
    },
    "frictionIndex": 15,
    "contactTarget": "Thân Lưỡi Cong Nhẹ Ở Giữa Khoang Miệng",
    "l1Mistake": "Đọc thành \"ơ\" ngắn tiếng Việt hoặc \"ưa\", mất độ cong sâu.",
    "correctiveGuidance": "Nâng thân lưỡi ở trung tâm, đầu lưỡi hơi co nhẹ lại, giữ khẩu hình bất động và ngân dài âm.",
    "tactileTrick": "Đặt đầu lưỡi ở vị trí lưng chừng lơ lửng, không chạm vào bất cứ đâu.",
    "lipShape": {
      "coronalType": "neutral",
      "label": "Thả lỏng trung tính",
      "mouthOpening": 35,
      "lipRoundness": 20
    },
    "audioTone": {
      "freq": 360,
      "f1": 500,
      "f2": 1400
    }
  },
  "ɜː": {
    "phoneme": "/ɜː/",
    "name": "Open-Mid Central Unrounded Vowel",
    "vietnameseName": "Nguyên âm ơ dài (Nurse / Bird)",
    "category": "monophthong",
    "categoryVi": "Nguyên Âm Đơn",
    "subCategory": "Central Vowel",
    "sampleWord": "bird",
    "sampleIpa": "/bɜːrd/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 60,
      "jawDrop": 35,
      "airPressure": 55
    },
    "tonguePath": "M 330 400 C 340 345, 370 260, 415 245 C 450 240, 480 265, 490 290 C 495 300, 470 325, 440 340 C 405 365, 390 405, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 350, 365 285, 410 275 C 445 270, 475 295, 485 315 C 450 345, 405 375, 390 420 Z",
    "constrictionPoint": {
      "x": 415,
      "y": 245,
      "gapLabel": "Vòm Họng Trung Tâm: 5.0mm"
    },
    "frictionIndex": 15,
    "contactTarget": "Thân Lưỡi Cong Nhẹ Ở Giữa Khoang Miệng",
    "l1Mistake": "Đọc thành \"ơ\" ngắn tiếng Việt hoặc \"ưa\", mất độ cong sâu.",
    "correctiveGuidance": "Nâng thân lưỡi ở trung tâm, đầu lưỡi hơi co nhẹ lại, giữ khẩu hình bất động và ngân dài âm.",
    "tactileTrick": "Đặt đầu lưỡi ở vị trí lưng chừng lơ lửng, không chạm vào bất cứ đâu.",
    "lipShape": {
      "coronalType": "neutral",
      "label": "Thả lỏng trung tính",
      "mouthOpening": 35,
      "lipRoundness": 20
    },
    "audioTone": {
      "freq": 360,
      "f1": 500,
      "f2": 1400
    }
  },
  "/ə/": {
    "phoneme": "/ə/",
    "name": "Mid Central Vowel (Schwa)",
    "vietnameseName": "Nguyên âm ơ nhẹ (Schwa)",
    "category": "monophthong",
    "categoryVi": "Nguyên Âm Đơn",
    "subCategory": "Central Vowel",
    "sampleWord": "about",
    "sampleIpa": "/əˈbaʊt/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 50,
      "jawDrop": 35,
      "airPressure": 45
    },
    "tonguePath": "M 330 400 C 340 350, 370 275, 415 260 C 450 255, 480 280, 490 300 C 495 310, 470 330, 440 345 C 405 370, 390 410, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 345, 370 260, 415 245 C 450 240, 480 265, 490 290 C 495 300, 470 325, 440 340 C 405 365, 390 405, 390 420 Z",
    "constrictionPoint": {
      "x": 415,
      "y": 260,
      "gapLabel": "Vị Trí Nghỉ: 6.0mm"
    },
    "frictionIndex": 10,
    "contactTarget": "Toàn Bộ Khẩu Hình Ở Trạng Thái Nghỉ Thả Lỏng Hoàn Toàn",
    "l1Mistake": "Nhấn quá mạnh thành âm \"ơ\" to rõ như tiếng Việt.",
    "correctiveGuidance": "Đây là âm lướt nhẹ nhất trong tiếng Anh. Tuyệt đối không nhấn trọng âm, phát ra cực kỳ ngắn nhẹ.",
    "tactileTrick": "Cảm giác như bạn chỉ thở khẽ ra một tiếng \"ờ\" lười biếng mà không cần cử động cơ mặt.",
    "lipShape": {
      "coronalType": "neutral",
      "label": "Thả lỏng hoàn toàn (lazy mouth)",
      "mouthOpening": 35,
      "lipRoundness": 10
    },
    "audioTone": {
      "freq": 350,
      "f1": 500,
      "f2": 1500
    }
  },
  "ə": {
    "phoneme": "/ə/",
    "name": "Mid Central Vowel (Schwa)",
    "vietnameseName": "Nguyên âm ơ nhẹ (Schwa)",
    "category": "monophthong",
    "categoryVi": "Nguyên Âm Đơn",
    "subCategory": "Central Vowel",
    "sampleWord": "about",
    "sampleIpa": "/əˈbaʊt/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 50,
      "jawDrop": 35,
      "airPressure": 45
    },
    "tonguePath": "M 330 400 C 340 350, 370 275, 415 260 C 450 255, 480 280, 490 300 C 495 310, 470 330, 440 345 C 405 370, 390 410, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 345, 370 260, 415 245 C 450 240, 480 265, 490 290 C 495 300, 470 325, 440 340 C 405 365, 390 405, 390 420 Z",
    "constrictionPoint": {
      "x": 415,
      "y": 260,
      "gapLabel": "Vị Trí Nghỉ: 6.0mm"
    },
    "frictionIndex": 10,
    "contactTarget": "Toàn Bộ Khẩu Hình Ở Trạng Thái Nghỉ Thả Lỏng Hoàn Toàn",
    "l1Mistake": "Nhấn quá mạnh thành âm \"ơ\" to rõ như tiếng Việt.",
    "correctiveGuidance": "Đây là âm lướt nhẹ nhất trong tiếng Anh. Tuyệt đối không nhấn trọng âm, phát ra cực kỳ ngắn nhẹ.",
    "tactileTrick": "Cảm giác như bạn chỉ thở khẽ ra một tiếng \"ờ\" lười biếng mà không cần cử động cơ mặt.",
    "lipShape": {
      "coronalType": "neutral",
      "label": "Thả lỏng hoàn toàn (lazy mouth)",
      "mouthOpening": 35,
      "lipRoundness": 10
    },
    "audioTone": {
      "freq": 350,
      "f1": 500,
      "f2": 1500
    }
  },
  "/eɪ/": {
    "phoneme": "/eɪ/",
    "name": "Face Diphthong",
    "vietnameseName": "Nguyên âm đôi e-i",
    "category": "diphthong",
    "categoryVi": "Nguyên Âm Đôi",
    "subCategory": "Diphthong",
    "sampleWord": "face",
    "sampleIpa": "/feɪs/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 68,
      "jawDrop": 30,
      "airPressure": 55
    },
    "tonguePath": "M 330 400 C 340 340, 375 250, 430 225 C 465 215, 495 245, 510 270 C 515 280, 490 305, 460 320 C 420 350, 395 380, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 345, 370 270, 420 250 C 455 240, 485 265, 495 285 C 500 295, 480 320, 450 335 C 415 360, 395 385, 390 420 Z",
    "constrictionPoint": {
      "x": 430,
      "y": 225,
      "gapLabel": "Trượt Từ /e/ Lên /ɪ/"
    },
    "frictionIndex": 25,
    "contactTarget": "Lưỡi Trượt Nâng Từ Vị Trí /e/ Lên Dần /ɪ/",
    "l1Mistake": "Đọc phẳng lì như âm \"ây\" tiếng Việt (đọc \"face\" thành \"phây\").",
    "correctiveGuidance": "Bắt đầu từ âm /e/ mở vừa, sau đó nâng hàm và thân lưỡi trượt mượt mà về phía âm /ɪ/.",
    "tactileTrick": "Cảm nhận quai hàm hơi khép lại từ từ trong khi phát âm.",
    "lipShape": {
      "coronalType": "spread",
      "label": "Mở vừa trượt dần sang cười dẹt",
      "mouthOpening": 35,
      "lipRoundness": 15
    },
    "audioTone": {
      "freq": 400,
      "f1": 500,
      "f2": 2000
    }
  },
  "eɪ": {
    "phoneme": "/eɪ/",
    "name": "Face Diphthong",
    "vietnameseName": "Nguyên âm đôi e-i",
    "category": "diphthong",
    "categoryVi": "Nguyên Âm Đôi",
    "subCategory": "Diphthong",
    "sampleWord": "face",
    "sampleIpa": "/feɪs/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 68,
      "jawDrop": 30,
      "airPressure": 55
    },
    "tonguePath": "M 330 400 C 340 340, 375 250, 430 225 C 465 215, 495 245, 510 270 C 515 280, 490 305, 460 320 C 420 350, 395 380, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 345, 370 270, 420 250 C 455 240, 485 265, 495 285 C 500 295, 480 320, 450 335 C 415 360, 395 385, 390 420 Z",
    "constrictionPoint": {
      "x": 430,
      "y": 225,
      "gapLabel": "Trượt Từ /e/ Lên /ɪ/"
    },
    "frictionIndex": 25,
    "contactTarget": "Lưỡi Trượt Nâng Từ Vị Trí /e/ Lên Dần /ɪ/",
    "l1Mistake": "Đọc phẳng lì như âm \"ây\" tiếng Việt (đọc \"face\" thành \"phây\").",
    "correctiveGuidance": "Bắt đầu từ âm /e/ mở vừa, sau đó nâng hàm và thân lưỡi trượt mượt mà về phía âm /ɪ/.",
    "tactileTrick": "Cảm nhận quai hàm hơi khép lại từ từ trong khi phát âm.",
    "lipShape": {
      "coronalType": "spread",
      "label": "Mở vừa trượt dần sang cười dẹt",
      "mouthOpening": 35,
      "lipRoundness": 15
    },
    "audioTone": {
      "freq": 400,
      "f1": 500,
      "f2": 2000
    }
  },
  "/aɪ/": {
    "phoneme": "/aɪ/",
    "name": "Price Diphthong",
    "vietnameseName": "Nguyên âm đôi a-i",
    "category": "diphthong",
    "categoryVi": "Nguyên Âm Đôi",
    "subCategory": "Diphthong",
    "sampleWord": "time",
    "sampleIpa": "/taɪm/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 50,
      "jawDrop": 55,
      "airPressure": 55
    },
    "tonguePath": "M 330 400 C 340 350, 370 280, 425 245 C 460 235, 490 260, 500 285 C 505 295, 480 320, 450 335 C 415 365, 390 405, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 365, 350 325, 385 315 C 420 310, 450 335, 460 355 C 465 365, 440 380, 410 390 C 380 405, 390 415, 390 420 Z",
    "constrictionPoint": {
      "x": 425,
      "y": 245,
      "gapLabel": "Trượt Từ /a/ Lên /ɪ/"
    },
    "frictionIndex": 25,
    "contactTarget": "Hạ Hàm Há To Rồi Khép Dần Về /ɪ/",
    "l1Mistake": "Đọc như âm \"ai\" tiếng Việt mà không kéo dài trượt khẩu hình.",
    "correctiveGuidance": "Bắt đầu với miệng há to /a/, sau đó nâng hàm và kéo mép môi về hướng /ɪ/.",
    "tactileTrick": "Chuyển động hàm từ mở rộng 2 ngón tay thu hẹp lại còn 1 ngón tay.",
    "lipShape": {
      "coronalType": "open",
      "label": "Mở to rồi thu dẹt sang 2 bên",
      "mouthOpening": 65,
      "lipRoundness": 10
    },
    "audioTone": {
      "freq": 380,
      "f1": 750,
      "f2": 1800
    }
  },
  "aɪ": {
    "phoneme": "/aɪ/",
    "name": "Price Diphthong",
    "vietnameseName": "Nguyên âm đôi a-i",
    "category": "diphthong",
    "categoryVi": "Nguyên Âm Đôi",
    "subCategory": "Diphthong",
    "sampleWord": "time",
    "sampleIpa": "/taɪm/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 50,
      "jawDrop": 55,
      "airPressure": 55
    },
    "tonguePath": "M 330 400 C 340 350, 370 280, 425 245 C 460 235, 490 260, 500 285 C 505 295, 480 320, 450 335 C 415 365, 390 405, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 365, 350 325, 385 315 C 420 310, 450 335, 460 355 C 465 365, 440 380, 410 390 C 380 405, 390 415, 390 420 Z",
    "constrictionPoint": {
      "x": 425,
      "y": 245,
      "gapLabel": "Trượt Từ /a/ Lên /ɪ/"
    },
    "frictionIndex": 25,
    "contactTarget": "Hạ Hàm Há To Rồi Khép Dần Về /ɪ/",
    "l1Mistake": "Đọc như âm \"ai\" tiếng Việt mà không kéo dài trượt khẩu hình.",
    "correctiveGuidance": "Bắt đầu với miệng há to /a/, sau đó nâng hàm và kéo mép môi về hướng /ɪ/.",
    "tactileTrick": "Chuyển động hàm từ mở rộng 2 ngón tay thu hẹp lại còn 1 ngón tay.",
    "lipShape": {
      "coronalType": "open",
      "label": "Mở to rồi thu dẹt sang 2 bên",
      "mouthOpening": 65,
      "lipRoundness": 10
    },
    "audioTone": {
      "freq": 380,
      "f1": 750,
      "f2": 1800
    }
  },
  "/ɔɪ/": {
    "phoneme": "/ɔɪ/",
    "name": "Choice Diphthong",
    "vietnameseName": "Nguyên âm đôi o-i",
    "category": "diphthong",
    "categoryVi": "Nguyên Âm Đôi",
    "subCategory": "Diphthong",
    "sampleWord": "boy",
    "sampleIpa": "/bɔɪ/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 55,
      "jawDrop": 45,
      "airPressure": 55
    },
    "tonguePath": "M 330 400 C 340 345, 370 265, 420 240 C 455 230, 485 255, 500 280 C 505 290, 480 315, 450 335 C 410 365, 390 405, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 350, 360 275, 405 265 C 440 260, 470 285, 480 310 C 485 320, 460 345, 430 360 C 395 385, 390 410, 390 420 Z",
    "constrictionPoint": {
      "x": 420,
      "y": 240,
      "gapLabel": "Trượt Từ /ɔ/ Sang /ɪ/"
    },
    "frictionIndex": 22,
    "contactTarget": "Môi Tròn Ở /ɔ/ Rồi Dẹt Dần Sang /ɪ/",
    "l1Mistake": "Đọc phẳng như âm \"oi\" tiếng Việt.",
    "correctiveGuidance": "Môi chu tròn ở âm /ɔ/, sau đó kéo rộng sang hai bên kết thúc ở /ɪ/.",
    "tactileTrick": "Môi chuyển động rõ rệt từ hình tròn chữ O sang khuôn miệng cười!",
    "lipShape": {
      "coronalType": "round",
      "label": "Tròn môi trượt sang cười dẹt",
      "mouthOpening": 45,
      "lipRoundness": 65
    },
    "audioTone": {
      "freq": 390,
      "f1": 580,
      "f2": 1700
    }
  },
  "ɔɪ": {
    "phoneme": "/ɔɪ/",
    "name": "Choice Diphthong",
    "vietnameseName": "Nguyên âm đôi o-i",
    "category": "diphthong",
    "categoryVi": "Nguyên Âm Đôi",
    "subCategory": "Diphthong",
    "sampleWord": "boy",
    "sampleIpa": "/bɔɪ/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 55,
      "jawDrop": 45,
      "airPressure": 55
    },
    "tonguePath": "M 330 400 C 340 345, 370 265, 420 240 C 455 230, 485 255, 500 280 C 505 290, 480 315, 450 335 C 410 365, 390 405, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 350, 360 275, 405 265 C 440 260, 470 285, 480 310 C 485 320, 460 345, 430 360 C 395 385, 390 410, 390 420 Z",
    "constrictionPoint": {
      "x": 420,
      "y": 240,
      "gapLabel": "Trượt Từ /ɔ/ Sang /ɪ/"
    },
    "frictionIndex": 22,
    "contactTarget": "Môi Tròn Ở /ɔ/ Rồi Dẹt Dần Sang /ɪ/",
    "l1Mistake": "Đọc phẳng như âm \"oi\" tiếng Việt.",
    "correctiveGuidance": "Môi chu tròn ở âm /ɔ/, sau đó kéo rộng sang hai bên kết thúc ở /ɪ/.",
    "tactileTrick": "Môi chuyển động rõ rệt từ hình tròn chữ O sang khuôn miệng cười!",
    "lipShape": {
      "coronalType": "round",
      "label": "Tròn môi trượt sang cười dẹt",
      "mouthOpening": 45,
      "lipRoundness": 65
    },
    "audioTone": {
      "freq": 390,
      "f1": 580,
      "f2": 1700
    }
  },
  "/aʊ/": {
    "phoneme": "/aʊ/",
    "name": "Mouth Diphthong",
    "vietnameseName": "Nguyên âm đôi a-u",
    "category": "diphthong",
    "categoryVi": "Nguyên Âm Đôi",
    "subCategory": "Diphthong",
    "sampleWord": "now",
    "sampleIpa": "/naʊ/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 45,
      "jawDrop": 60,
      "airPressure": 55
    },
    "tonguePath": "M 330 400 C 340 355, 360 280, 410 260 C 445 250, 475 275, 485 300 C 490 310, 465 335, 435 355 C 395 385, 390 410, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 365, 350 325, 385 315 C 420 310, 450 335, 460 355 C 465 365, 440 380, 410 390 C 380 405, 390 415, 390 420 Z",
    "constrictionPoint": {
      "x": 410,
      "y": 260,
      "gapLabel": "Trượt Từ /a/ Lên /ʊ/"
    },
    "frictionIndex": 22,
    "contactTarget": "Há To /a/ Rồi Chu Môi Hướng Về /ʊ/",
    "l1Mistake": "Đọc nhanh thành âm \"ao\" tiếng Việt.",
    "correctiveGuidance": "Khởi đầu với khẩu hình há to như /a/, sau đó khép hàm và chu môi tròn về phía /ʊ/.",
    "tactileTrick": "Quan sát miệng thu nhỏ từ mở rộng sang một vòng tròn nhỏ.",
    "lipShape": {
      "coronalType": "open",
      "label": "Há to trượt sang chu tròn",
      "mouthOpening": 65,
      "lipRoundness": 50
    },
    "audioTone": {
      "freq": 360,
      "f1": 750,
      "f2": 1100
    }
  },
  "aʊ": {
    "phoneme": "/aʊ/",
    "name": "Mouth Diphthong",
    "vietnameseName": "Nguyên âm đôi a-u",
    "category": "diphthong",
    "categoryVi": "Nguyên Âm Đôi",
    "subCategory": "Diphthong",
    "sampleWord": "now",
    "sampleIpa": "/naʊ/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 45,
      "jawDrop": 60,
      "airPressure": 55
    },
    "tonguePath": "M 330 400 C 340 355, 360 280, 410 260 C 445 250, 475 275, 485 300 C 490 310, 465 335, 435 355 C 395 385, 390 410, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 365, 350 325, 385 315 C 420 310, 450 335, 460 355 C 465 365, 440 380, 410 390 C 380 405, 390 415, 390 420 Z",
    "constrictionPoint": {
      "x": 410,
      "y": 260,
      "gapLabel": "Trượt Từ /a/ Lên /ʊ/"
    },
    "frictionIndex": 22,
    "contactTarget": "Há To /a/ Rồi Chu Môi Hướng Về /ʊ/",
    "l1Mistake": "Đọc nhanh thành âm \"ao\" tiếng Việt.",
    "correctiveGuidance": "Khởi đầu với khẩu hình há to như /a/, sau đó khép hàm và chu môi tròn về phía /ʊ/.",
    "tactileTrick": "Quan sát miệng thu nhỏ từ mở rộng sang một vòng tròn nhỏ.",
    "lipShape": {
      "coronalType": "open",
      "label": "Há to trượt sang chu tròn",
      "mouthOpening": 65,
      "lipRoundness": 50
    },
    "audioTone": {
      "freq": 360,
      "f1": 750,
      "f2": 1100
    }
  },
  "/əʊ/": {
    "phoneme": "/əʊ/",
    "name": "Goat Diphthong",
    "vietnameseName": "Nguyên âm đôi ơ-u / o-u",
    "category": "diphthong",
    "categoryVi": "Nguyên Âm Đôi",
    "subCategory": "Diphthong",
    "sampleWord": "go",
    "sampleIpa": "/ɡəʊ/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 60,
      "jawDrop": 35,
      "airPressure": 50
    },
    "tonguePath": "M 330 400 C 340 345, 365 255, 415 240 C 450 230, 480 255, 490 280 C 495 290, 470 315, 440 335 C 400 365, 390 405, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 350, 360 275, 405 265 C 440 260, 470 285, 480 310 C 485 320, 460 345, 430 360 C 395 385, 390 410, 390 420 Z",
    "constrictionPoint": {
      "x": 415,
      "y": 240,
      "gapLabel": "Trượt Từ /ə/ Sang /ʊ/"
    },
    "frictionIndex": 20,
    "contactTarget": "Thả Lỏng Ở /ə/ Rồi Chu Môi Nhẹ Sang /ʊ/",
    "l1Mistake": "Người Việt hay đọc thành chữ \"ô\" cụt cứng (đọc \"go\" thành \"gô\").",
    "correctiveGuidance": "Bắt đầu từ âm schwa thả lỏng /ə/, sau đó từ từ khum môi tròn hướng về /ʊ/.",
    "tactileTrick": "Không được cố định hình môi chữ Ô; môi phải có sự chuyển động thu nhỏ dần.",
    "lipShape": {
      "coronalType": "round",
      "label": "Thả lỏng rồi chu tròn lại",
      "mouthOpening": 35,
      "lipRoundness": 65
    },
    "audioTone": {
      "freq": 370,
      "f1": 500,
      "f2": 1200
    }
  },
  "əʊ": {
    "phoneme": "/əʊ/",
    "name": "Goat Diphthong",
    "vietnameseName": "Nguyên âm đôi ơ-u / o-u",
    "category": "diphthong",
    "categoryVi": "Nguyên Âm Đôi",
    "subCategory": "Diphthong",
    "sampleWord": "go",
    "sampleIpa": "/ɡəʊ/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 60,
      "jawDrop": 35,
      "airPressure": 50
    },
    "tonguePath": "M 330 400 C 340 345, 365 255, 415 240 C 450 230, 480 255, 490 280 C 495 290, 470 315, 440 335 C 400 365, 390 405, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 350, 360 275, 405 265 C 440 260, 470 285, 480 310 C 485 320, 460 345, 430 360 C 395 385, 390 410, 390 420 Z",
    "constrictionPoint": {
      "x": 415,
      "y": 240,
      "gapLabel": "Trượt Từ /ə/ Sang /ʊ/"
    },
    "frictionIndex": 20,
    "contactTarget": "Thả Lỏng Ở /ə/ Rồi Chu Môi Nhẹ Sang /ʊ/",
    "l1Mistake": "Người Việt hay đọc thành chữ \"ô\" cụt cứng (đọc \"go\" thành \"gô\").",
    "correctiveGuidance": "Bắt đầu từ âm schwa thả lỏng /ə/, sau đó từ từ khum môi tròn hướng về /ʊ/.",
    "tactileTrick": "Không được cố định hình môi chữ Ô; môi phải có sự chuyển động thu nhỏ dần.",
    "lipShape": {
      "coronalType": "round",
      "label": "Thả lỏng rồi chu tròn lại",
      "mouthOpening": 35,
      "lipRoundness": 65
    },
    "audioTone": {
      "freq": 370,
      "f1": 500,
      "f2": 1200
    }
  },
  "/ɪə/": {
    "phoneme": "/ɪə/",
    "name": "Near Diphthong",
    "vietnameseName": "Nguyên âm đôi i-ơ",
    "category": "diphthong",
    "categoryVi": "Nguyên Âm Đôi",
    "subCategory": "Diphthong",
    "sampleWord": "near",
    "sampleIpa": "/nɪər/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 65,
      "jawDrop": 30,
      "airPressure": 50
    },
    "tonguePath": "M 330 400 C 340 345, 370 260, 420 240 C 455 230, 485 255, 495 280 C 500 290, 475 315, 445 335 C 405 365, 390 405, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 340, 375 250, 435 225 C 470 215, 495 245, 510 270 C 515 280, 495 305, 465 320 C 425 350, 395 380, 390 420 Z",
    "constrictionPoint": {
      "x": 420,
      "y": 240,
      "gapLabel": "Trượt Từ /ɪ/ Về /ə/"
    },
    "frictionIndex": 18,
    "contactTarget": "Lưỡi Từ /ɪ/ Thả Rơi Nhẹ Về /ə/",
    "l1Mistake": "Đọc thành âm \"ia\" tiếng Việt.",
    "correctiveGuidance": "Bắt đầu bằng /ɪ/ dứt khoát, sau đó thả lỏng hàm và toàn bộ cơ mặt trôi về schwa /ə/.",
    "tactileTrick": "Cảm giác như trượt dốc từ một âm có độ căng nhẹ xuống trạng thái hoàn toàn thư giãn.",
    "lipShape": {
      "coronalType": "neutral",
      "label": "Cười nhẹ rồi thả lỏng hoàn toàn",
      "mouthOpening": 32,
      "lipRoundness": 10
    },
    "audioTone": {
      "freq": 390,
      "f1": 420,
      "f2": 1700
    }
  },
  "ɪə": {
    "phoneme": "/ɪə/",
    "name": "Near Diphthong",
    "vietnameseName": "Nguyên âm đôi i-ơ",
    "category": "diphthong",
    "categoryVi": "Nguyên Âm Đôi",
    "subCategory": "Diphthong",
    "sampleWord": "near",
    "sampleIpa": "/nɪər/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 65,
      "jawDrop": 30,
      "airPressure": 50
    },
    "tonguePath": "M 330 400 C 340 345, 370 260, 420 240 C 455 230, 485 255, 495 280 C 500 290, 475 315, 445 335 C 405 365, 390 405, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 340, 375 250, 435 225 C 470 215, 495 245, 510 270 C 515 280, 495 305, 465 320 C 425 350, 395 380, 390 420 Z",
    "constrictionPoint": {
      "x": 420,
      "y": 240,
      "gapLabel": "Trượt Từ /ɪ/ Về /ə/"
    },
    "frictionIndex": 18,
    "contactTarget": "Lưỡi Từ /ɪ/ Thả Rơi Nhẹ Về /ə/",
    "l1Mistake": "Đọc thành âm \"ia\" tiếng Việt.",
    "correctiveGuidance": "Bắt đầu bằng /ɪ/ dứt khoát, sau đó thả lỏng hàm và toàn bộ cơ mặt trôi về schwa /ə/.",
    "tactileTrick": "Cảm giác như trượt dốc từ một âm có độ căng nhẹ xuống trạng thái hoàn toàn thư giãn.",
    "lipShape": {
      "coronalType": "neutral",
      "label": "Cười nhẹ rồi thả lỏng hoàn toàn",
      "mouthOpening": 32,
      "lipRoundness": 10
    },
    "audioTone": {
      "freq": 390,
      "f1": 420,
      "f2": 1700
    }
  },
  "/eə/": {
    "phoneme": "/eə/",
    "name": "Square Diphthong",
    "vietnameseName": "Nguyên âm đôi e-ơ",
    "category": "diphthong",
    "categoryVi": "Nguyên Âm Đôi",
    "subCategory": "Diphthong",
    "sampleWord": "hair",
    "sampleIpa": "/heər/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 55,
      "jawDrop": 40,
      "airPressure": 50
    },
    "tonguePath": "M 330 400 C 340 350, 370 270, 415 255 C 450 250, 480 275, 490 295 C 495 305, 470 325, 440 345 C 405 370, 390 410, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 345, 370 270, 420 250 C 455 240, 485 265, 495 285 C 500 295, 480 320, 450 335 C 415 360, 395 385, 390 420 Z",
    "constrictionPoint": {
      "x": 415,
      "y": 255,
      "gapLabel": "Trượt Từ /e/ Về /ə/"
    },
    "frictionIndex": 18,
    "contactTarget": "Mở Miệng Ở /e/ Rồi Trôi Về /ə/",
    "l1Mistake": "Đọc như âm \"e\" đơn lập mà không lướt âm đuôi.",
    "correctiveGuidance": "Phát âm /e/ mở rộng miệng, sau đó từ từ thả lỏng miệng về âm schwa /ə/.",
    "tactileTrick": "Miệng mở rộng vừa phải rồi hơi khép nhẹ lại ở đuôi âm.",
    "lipShape": {
      "coronalType": "neutral",
      "label": "Mở vừa trôi về thả lỏng",
      "mouthOpening": 40,
      "lipRoundness": 10
    },
    "audioTone": {
      "freq": 370,
      "f1": 550,
      "f2": 1650
    }
  },
  "eə": {
    "phoneme": "/eə/",
    "name": "Square Diphthong",
    "vietnameseName": "Nguyên âm đôi e-ơ",
    "category": "diphthong",
    "categoryVi": "Nguyên Âm Đôi",
    "subCategory": "Diphthong",
    "sampleWord": "hair",
    "sampleIpa": "/heər/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 55,
      "jawDrop": 40,
      "airPressure": 50
    },
    "tonguePath": "M 330 400 C 340 350, 370 270, 415 255 C 450 250, 480 275, 490 295 C 495 305, 470 325, 440 345 C 405 370, 390 410, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 345, 370 270, 420 250 C 455 240, 485 265, 495 285 C 500 295, 480 320, 450 335 C 415 360, 395 385, 390 420 Z",
    "constrictionPoint": {
      "x": 415,
      "y": 255,
      "gapLabel": "Trượt Từ /e/ Về /ə/"
    },
    "frictionIndex": 18,
    "contactTarget": "Mở Miệng Ở /e/ Rồi Trôi Về /ə/",
    "l1Mistake": "Đọc như âm \"e\" đơn lập mà không lướt âm đuôi.",
    "correctiveGuidance": "Phát âm /e/ mở rộng miệng, sau đó từ từ thả lỏng miệng về âm schwa /ə/.",
    "tactileTrick": "Miệng mở rộng vừa phải rồi hơi khép nhẹ lại ở đuôi âm.",
    "lipShape": {
      "coronalType": "neutral",
      "label": "Mở vừa trôi về thả lỏng",
      "mouthOpening": 40,
      "lipRoundness": 10
    },
    "audioTone": {
      "freq": 370,
      "f1": 550,
      "f2": 1650
    }
  },
  "/ʊə/": {
    "phoneme": "/ʊə/",
    "name": "Cure Diphthong",
    "vietnameseName": "Nguyên âm đôi u-ơ",
    "category": "diphthong",
    "categoryVi": "Nguyên Âm Đôi",
    "subCategory": "Diphthong",
    "sampleWord": "tour",
    "sampleIpa": "/tʊər/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 65,
      "jawDrop": 30,
      "airPressure": 50
    },
    "tonguePath": "M 330 400 C 340 340, 365 255, 415 240 C 450 230, 480 255, 490 280 C 495 290, 470 315, 440 335 C 400 365, 390 405, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 335, 365 245, 415 230 C 450 220, 480 250, 490 275 C 495 285, 470 310, 440 325 C 400 355, 390 400, 390 420 Z",
    "constrictionPoint": {
      "x": 415,
      "y": 240,
      "gapLabel": "Trượt Từ /ʊ/ Về /ə/"
    },
    "frictionIndex": 18,
    "contactTarget": "Chu Môi Ở /ʊ/ Rồi Mở Thả Lỏng Về /ə/",
    "l1Mistake": "Đọc thành âm \"ua\" tiếng Việt.",
    "correctiveGuidance": "Bắt đầu từ âm /ʊ/ khum môi tròn, sau đó mở rộng khóe môi thả lỏng về schwa /ə/.",
    "tactileTrick": "Môi mở ra từ trạng thái chu tròn sang trạng thái tự nhiên.",
    "lipShape": {
      "coronalType": "round",
      "label": "Khum môi mở sang tự nhiên",
      "mouthOpening": 30,
      "lipRoundness": 50
    },
    "audioTone": {
      "freq": 380,
      "f1": 450,
      "f2": 1250
    }
  },
  "ʊə": {
    "phoneme": "/ʊə/",
    "name": "Cure Diphthong",
    "vietnameseName": "Nguyên âm đôi u-ơ",
    "category": "diphthong",
    "categoryVi": "Nguyên Âm Đôi",
    "subCategory": "Diphthong",
    "sampleWord": "tour",
    "sampleIpa": "/tʊər/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 65,
      "jawDrop": 30,
      "airPressure": 50
    },
    "tonguePath": "M 330 400 C 340 340, 365 255, 415 240 C 450 230, 480 255, 490 280 C 495 290, 470 315, 440 335 C 400 365, 390 405, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 335, 365 245, 415 230 C 450 220, 480 250, 490 275 C 495 285, 470 310, 440 325 C 400 355, 390 400, 390 420 Z",
    "constrictionPoint": {
      "x": 415,
      "y": 240,
      "gapLabel": "Trượt Từ /ʊ/ Về /ə/"
    },
    "frictionIndex": 18,
    "contactTarget": "Chu Môi Ở /ʊ/ Rồi Mở Thả Lỏng Về /ə/",
    "l1Mistake": "Đọc thành âm \"ua\" tiếng Việt.",
    "correctiveGuidance": "Bắt đầu từ âm /ʊ/ khum môi tròn, sau đó mở rộng khóe môi thả lỏng về schwa /ə/.",
    "tactileTrick": "Môi mở ra từ trạng thái chu tròn sang trạng thái tự nhiên.",
    "lipShape": {
      "coronalType": "round",
      "label": "Khum môi mở sang tự nhiên",
      "mouthOpening": 30,
      "lipRoundness": 50
    },
    "audioTone": {
      "freq": 380,
      "f1": 450,
      "f2": 1250
    }
  },
  "/p/": {
    "phoneme": "/p/",
    "name": "Voiceless Bilabial Plosive",
    "vietnameseName": "Âm bật hai môi vô thanh",
    "category": "consonant",
    "categoryVi": "Phụ Âm",
    "subCategory": "Plosive",
    "sampleWord": "pen",
    "sampleIpa": "/pen/",
    "isVoiced": false,
    "defaultSliders": {
      "tongueElevation": 35,
      "jawDrop": 15,
      "airPressure": 90
    },
    "tonguePath": "M 330 400 C 340 360, 370 310, 420 290 C 460 280, 490 300, 505 320 C 510 330, 480 350, 450 365 C 410 385, 390 410, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 355, 365 300, 410 280 C 450 270, 480 290, 495 310 C 450 340, 405 375, 390 420 Z",
    "constrictionPoint": {
      "x": 585,
      "y": 278,
      "gapLabel": "Hai Môi Khép Kín: 0.0mm"
    },
    "frictionIndex": 95,
    "contactTarget": "Mím Chặt Hai Môi Chặn Khí Rồi Bật Mạnh",
    "l1Mistake": "Người Việt đọc thành âm /b/ hoặc không bật luồng hơi gió nén (unreleased).",
    "correctiveGuidance": "Mím chặt hai môi lại để tích tụ áp suất khí sau môi, sau đó mở bung môi thật nhanh tạo tiếng nổ \"p\" giòn giã.",
    "tactileTrick": "Đặt một tờ giấy mỏng trước miệng; khi phát âm /p/, tờ giấy phải bay mạnh về phía trước!",
    "lipShape": {
      "coronalType": "bilabial",
      "label": "Mím chặt hai môi",
      "mouthOpening": 5,
      "lipRoundness": 20
    },
    "audioTone": {
      "freq": 200,
      "f1": 0,
      "f2": 0
    }
  },
  "p": {
    "phoneme": "/p/",
    "name": "Voiceless Bilabial Plosive",
    "vietnameseName": "Âm bật hai môi vô thanh",
    "category": "consonant",
    "categoryVi": "Phụ Âm",
    "subCategory": "Plosive",
    "sampleWord": "pen",
    "sampleIpa": "/pen/",
    "isVoiced": false,
    "defaultSliders": {
      "tongueElevation": 35,
      "jawDrop": 15,
      "airPressure": 90
    },
    "tonguePath": "M 330 400 C 340 360, 370 310, 420 290 C 460 280, 490 300, 505 320 C 510 330, 480 350, 450 365 C 410 385, 390 410, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 355, 365 300, 410 280 C 450 270, 480 290, 495 310 C 450 340, 405 375, 390 420 Z",
    "constrictionPoint": {
      "x": 585,
      "y": 278,
      "gapLabel": "Hai Môi Khép Kín: 0.0mm"
    },
    "frictionIndex": 95,
    "contactTarget": "Mím Chặt Hai Môi Chặn Khí Rồi Bật Mạnh",
    "l1Mistake": "Người Việt đọc thành âm /b/ hoặc không bật luồng hơi gió nén (unreleased).",
    "correctiveGuidance": "Mím chặt hai môi lại để tích tụ áp suất khí sau môi, sau đó mở bung môi thật nhanh tạo tiếng nổ \"p\" giòn giã.",
    "tactileTrick": "Đặt một tờ giấy mỏng trước miệng; khi phát âm /p/, tờ giấy phải bay mạnh về phía trước!",
    "lipShape": {
      "coronalType": "bilabial",
      "label": "Mím chặt hai môi",
      "mouthOpening": 5,
      "lipRoundness": 20
    },
    "audioTone": {
      "freq": 200,
      "f1": 0,
      "f2": 0
    }
  },
  "/b/": {
    "phoneme": "/b/",
    "name": "Voiced Bilabial Plosive",
    "vietnameseName": "Âm bật hai môi hữu thanh",
    "category": "consonant",
    "categoryVi": "Phụ Âm",
    "subCategory": "Plosive",
    "sampleWord": "bad",
    "sampleIpa": "/bæd/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 35,
      "jawDrop": 18,
      "airPressure": 75
    },
    "tonguePath": "M 330 400 C 340 360, 370 310, 420 290 C 460 280, 490 300, 505 320 C 510 330, 480 350, 450 365 C 410 385, 390 410, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 360, 370 310, 420 290 C 460 280, 490 300, 505 320 C 510 330, 480 350, 450 365 C 410 385, 390 410, 390 420 Z",
    "constrictionPoint": {
      "x": 585,
      "y": 278,
      "gapLabel": "Hai Môi Khép + Rung Cổ"
    },
    "frictionIndex": 85,
    "contactTarget": "Mím Hai Môi + Kích Hoạt Rung Thanh Quản",
    "l1Mistake": "Nuốt âm /b/ ở cuối từ (vd \"cab\" đọc thành \"cap\").",
    "correctiveGuidance": "Mím hai môi chặn khí giống /p/, nhưng rung dây thanh quản ngay từ khoảnh khắc trước khi mở môi.",
    "tactileTrick": "Đặt ngón tay lên cổ họng, cảm nhận độ rung rè xuất hiện trước khi môi bung ra.",
    "lipShape": {
      "coronalType": "bilabial",
      "label": "Mím môi có rung thanh",
      "mouthOpening": 8,
      "lipRoundness": 20
    },
    "audioTone": {
      "freq": 150,
      "f1": 0,
      "f2": 0
    }
  },
  "b": {
    "phoneme": "/b/",
    "name": "Voiced Bilabial Plosive",
    "vietnameseName": "Âm bật hai môi hữu thanh",
    "category": "consonant",
    "categoryVi": "Phụ Âm",
    "subCategory": "Plosive",
    "sampleWord": "bad",
    "sampleIpa": "/bæd/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 35,
      "jawDrop": 18,
      "airPressure": 75
    },
    "tonguePath": "M 330 400 C 340 360, 370 310, 420 290 C 460 280, 490 300, 505 320 C 510 330, 480 350, 450 365 C 410 385, 390 410, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 360, 370 310, 420 290 C 460 280, 490 300, 505 320 C 510 330, 480 350, 450 365 C 410 385, 390 410, 390 420 Z",
    "constrictionPoint": {
      "x": 585,
      "y": 278,
      "gapLabel": "Hai Môi Khép + Rung Cổ"
    },
    "frictionIndex": 85,
    "contactTarget": "Mím Hai Môi + Kích Hoạt Rung Thanh Quản",
    "l1Mistake": "Nuốt âm /b/ ở cuối từ (vd \"cab\" đọc thành \"cap\").",
    "correctiveGuidance": "Mím hai môi chặn khí giống /p/, nhưng rung dây thanh quản ngay từ khoảnh khắc trước khi mở môi.",
    "tactileTrick": "Đặt ngón tay lên cổ họng, cảm nhận độ rung rè xuất hiện trước khi môi bung ra.",
    "lipShape": {
      "coronalType": "bilabial",
      "label": "Mím môi có rung thanh",
      "mouthOpening": 8,
      "lipRoundness": 20
    },
    "audioTone": {
      "freq": 150,
      "f1": 0,
      "f2": 0
    }
  },
  "/t/": {
    "phoneme": "/t/",
    "name": "Voiceless Alveolar Plosive",
    "vietnameseName": "Âm bật đầu lưỡi vô thanh",
    "category": "consonant",
    "categoryVi": "Phụ Âm",
    "subCategory": "Plosive",
    "sampleWord": "tea",
    "sampleIpa": "/tiː/",
    "isVoiced": false,
    "defaultSliders": {
      "tongueElevation": 75,
      "jawDrop": 22,
      "airPressure": 90
    },
    "tonguePath": "M 330 400 C 340 340, 370 280, 420 250 C 460 225, 500 235, 526 268 C 522 280, 490 300, 460 320 C 420 355, 390 405, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 350, 370 300, 410 285 C 450 275, 480 295, 495 315 C 450 345, 405 375, 390 420 Z",
    "constrictionPoint": {
      "x": 526,
      "y": 268,
      "gapLabel": "Đầu Lưỡi Chạm Chân Răng Trên"
    },
    "frictionIndex": 95,
    "contactTarget": "Đầu Lưỡi Áp Chặt Nướu Răng Trên Bật Hơi Dứt Khoát",
    "l1Mistake": "Nuốt âm đuôi /-t/ (vd \"cat\" đọc thành \"ca\") hoặc phát âm như âm \"thờ\" tiếng Việt.",
    "correctiveGuidance": "Đặt đầu lưỡi ép chặt vào nướu răng cửa trên chặn kín luồng khí, sau đó giật đầu lưỡi xuống giải phóng luồng hơi đanh dứt khoát.",
    "tactileTrick": "Không được để đầu lưỡi thò ra răng; phải nén khí chặt phía sau nướu răng trên.",
    "lipShape": {
      "coronalType": "neutral",
      "label": "Răng khép gần sát, đầu lưỡi sau nướu",
      "mouthOpening": 22,
      "lipRoundness": 10
    },
    "audioTone": {
      "freq": 250,
      "f1": 0,
      "f2": 0
    }
  },
  "t": {
    "phoneme": "/t/",
    "name": "Voiceless Alveolar Plosive",
    "vietnameseName": "Âm bật đầu lưỡi vô thanh",
    "category": "consonant",
    "categoryVi": "Phụ Âm",
    "subCategory": "Plosive",
    "sampleWord": "tea",
    "sampleIpa": "/tiː/",
    "isVoiced": false,
    "defaultSliders": {
      "tongueElevation": 75,
      "jawDrop": 22,
      "airPressure": 90
    },
    "tonguePath": "M 330 400 C 340 340, 370 280, 420 250 C 460 225, 500 235, 526 268 C 522 280, 490 300, 460 320 C 420 355, 390 405, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 350, 370 300, 410 285 C 450 275, 480 295, 495 315 C 450 345, 405 375, 390 420 Z",
    "constrictionPoint": {
      "x": 526,
      "y": 268,
      "gapLabel": "Đầu Lưỡi Chạm Chân Răng Trên"
    },
    "frictionIndex": 95,
    "contactTarget": "Đầu Lưỡi Áp Chặt Nướu Răng Trên Bật Hơi Dứt Khoát",
    "l1Mistake": "Nuốt âm đuôi /-t/ (vd \"cat\" đọc thành \"ca\") hoặc phát âm như âm \"thờ\" tiếng Việt.",
    "correctiveGuidance": "Đặt đầu lưỡi ép chặt vào nướu răng cửa trên chặn kín luồng khí, sau đó giật đầu lưỡi xuống giải phóng luồng hơi đanh dứt khoát.",
    "tactileTrick": "Không được để đầu lưỡi thò ra răng; phải nén khí chặt phía sau nướu răng trên.",
    "lipShape": {
      "coronalType": "neutral",
      "label": "Răng khép gần sát, đầu lưỡi sau nướu",
      "mouthOpening": 22,
      "lipRoundness": 10
    },
    "audioTone": {
      "freq": 250,
      "f1": 0,
      "f2": 0
    }
  },
  "/d/": {
    "phoneme": "/d/",
    "name": "Voiced Alveolar Plosive",
    "vietnameseName": "Âm bật đầu lưỡi hữu thanh",
    "category": "consonant",
    "categoryVi": "Phụ Âm",
    "subCategory": "Plosive",
    "sampleWord": "did",
    "sampleIpa": "/dɪd/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 74,
      "jawDrop": 22,
      "airPressure": 75
    },
    "tonguePath": "M 330 400 C 340 340, 370 280, 420 250 C 460 225, 500 235, 526 268 C 522 280, 490 300, 460 320 C 420 355, 390 405, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 350, 370 300, 410 285 C 450 275, 480 295, 495 315 C 450 345, 405 375, 390 420 Z",
    "constrictionPoint": {
      "x": 526,
      "y": 268,
      "gapLabel": "Nướu Răng Trên + Rung Dây Thanh"
    },
    "frictionIndex": 82,
    "contactTarget": "Đầu Lưỡi Nướu Răng Trên + Rung Thanh Quản",
    "l1Mistake": "Đọc âm đuôi /-d/ thành /-t/ hoặc nuốt âm hoàn toàn.",
    "correctiveGuidance": "Khẩu hình giống /t/ nhưng dây thanh quản rung mạnh khi bật âm giải phóng.",
    "tactileTrick": "Đặt tay lên cổ họng, cảm nhận độ rung rõ rệt ngay khoảnh khắc đầu lưỡi chạm nướu.",
    "lipShape": {
      "coronalType": "neutral",
      "label": "Răng mở nhẹ, lưỡi chạm nướu",
      "mouthOpening": 22,
      "lipRoundness": 10
    },
    "audioTone": {
      "freq": 180,
      "f1": 0,
      "f2": 0
    }
  },
  "d": {
    "phoneme": "/d/",
    "name": "Voiced Alveolar Plosive",
    "vietnameseName": "Âm bật đầu lưỡi hữu thanh",
    "category": "consonant",
    "categoryVi": "Phụ Âm",
    "subCategory": "Plosive",
    "sampleWord": "did",
    "sampleIpa": "/dɪd/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 74,
      "jawDrop": 22,
      "airPressure": 75
    },
    "tonguePath": "M 330 400 C 340 340, 370 280, 420 250 C 460 225, 500 235, 526 268 C 522 280, 490 300, 460 320 C 420 355, 390 405, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 350, 370 300, 410 285 C 450 275, 480 295, 495 315 C 450 345, 405 375, 390 420 Z",
    "constrictionPoint": {
      "x": 526,
      "y": 268,
      "gapLabel": "Nướu Răng Trên + Rung Dây Thanh"
    },
    "frictionIndex": 82,
    "contactTarget": "Đầu Lưỡi Nướu Răng Trên + Rung Thanh Quản",
    "l1Mistake": "Đọc âm đuôi /-d/ thành /-t/ hoặc nuốt âm hoàn toàn.",
    "correctiveGuidance": "Khẩu hình giống /t/ nhưng dây thanh quản rung mạnh khi bật âm giải phóng.",
    "tactileTrick": "Đặt tay lên cổ họng, cảm nhận độ rung rõ rệt ngay khoảnh khắc đầu lưỡi chạm nướu.",
    "lipShape": {
      "coronalType": "neutral",
      "label": "Răng mở nhẹ, lưỡi chạm nướu",
      "mouthOpening": 22,
      "lipRoundness": 10
    },
    "audioTone": {
      "freq": 180,
      "f1": 0,
      "f2": 0
    }
  },
  "/k/": {
    "phoneme": "/k/",
    "name": "Voiceless Velar Plosive",
    "vietnameseName": "Âm bật cuống lưỡi vô thanh",
    "category": "consonant",
    "categoryVi": "Phụ Âm",
    "subCategory": "Plosive",
    "sampleWord": "cat",
    "sampleIpa": "/kæt/",
    "isVoiced": false,
    "defaultSliders": {
      "tongueElevation": 80,
      "jawDrop": 30,
      "airPressure": 90
    },
    "tonguePath": "M 330 400 C 335 320, 360 220, 405 200 C 440 195, 470 240, 485 275 C 490 285, 470 320, 440 345 C 400 375, 390 410, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 355, 360 300, 400 285 C 435 280, 465 305, 475 325 C 480 335, 455 355, 425 365 C 395 385, 390 410, 390 420 Z",
    "constrictionPoint": {
      "x": 405,
      "y": 200,
      "gapLabel": "Cuống Lưỡi Chặn Vòm Mềm: 0.0mm"
    },
    "frictionIndex": 94,
    "contactTarget": "Cuống Lưỡi Nâng Chạm Chặt Vòm Họng Mềm Bật Hơi",
    "l1Mistake": "Đọc nhẹ như chữ \"c\" tiếng Việt, thiếu luồng khí nén bật mạnh.",
    "correctiveGuidance": "Nâng phần cuống lưỡi sau ép chặt vào vòm miệng mềm (lưỡi gà) để chặn hoàn toàn luồng khí, sau đó hạ cuống lưỡi bật hơi mạnh.",
    "tactileTrick": "Cảm giác như chuẩn bị khạc nhẹ một hạt bụi ở sâu trong cuống họng.",
    "lipShape": {
      "coronalType": "neutral",
      "label": "Mở miệng tự nhiên, cuống lưỡi nâng",
      "mouthOpening": 30,
      "lipRoundness": 10
    },
    "audioTone": {
      "freq": 220,
      "f1": 0,
      "f2": 0
    }
  },
  "k": {
    "phoneme": "/k/",
    "name": "Voiceless Velar Plosive",
    "vietnameseName": "Âm bật cuống lưỡi vô thanh",
    "category": "consonant",
    "categoryVi": "Phụ Âm",
    "subCategory": "Plosive",
    "sampleWord": "cat",
    "sampleIpa": "/kæt/",
    "isVoiced": false,
    "defaultSliders": {
      "tongueElevation": 80,
      "jawDrop": 30,
      "airPressure": 90
    },
    "tonguePath": "M 330 400 C 335 320, 360 220, 405 200 C 440 195, 470 240, 485 275 C 490 285, 470 320, 440 345 C 400 375, 390 410, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 355, 360 300, 400 285 C 435 280, 465 305, 475 325 C 480 335, 455 355, 425 365 C 395 385, 390 410, 390 420 Z",
    "constrictionPoint": {
      "x": 405,
      "y": 200,
      "gapLabel": "Cuống Lưỡi Chặn Vòm Mềm: 0.0mm"
    },
    "frictionIndex": 94,
    "contactTarget": "Cuống Lưỡi Nâng Chạm Chặt Vòm Họng Mềm Bật Hơi",
    "l1Mistake": "Đọc nhẹ như chữ \"c\" tiếng Việt, thiếu luồng khí nén bật mạnh.",
    "correctiveGuidance": "Nâng phần cuống lưỡi sau ép chặt vào vòm miệng mềm (lưỡi gà) để chặn hoàn toàn luồng khí, sau đó hạ cuống lưỡi bật hơi mạnh.",
    "tactileTrick": "Cảm giác như chuẩn bị khạc nhẹ một hạt bụi ở sâu trong cuống họng.",
    "lipShape": {
      "coronalType": "neutral",
      "label": "Mở miệng tự nhiên, cuống lưỡi nâng",
      "mouthOpening": 30,
      "lipRoundness": 10
    },
    "audioTone": {
      "freq": 220,
      "f1": 0,
      "f2": 0
    }
  },
  "/g/": {
    "phoneme": "/g/",
    "name": "Voiced Velar Plosive",
    "vietnameseName": "Âm bật cuống lưỡi hữu thanh",
    "category": "consonant",
    "categoryVi": "Phụ Âm",
    "subCategory": "Plosive",
    "sampleWord": "good",
    "sampleIpa": "/ɡʊd/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 78,
      "jawDrop": 30,
      "airPressure": 75
    },
    "tonguePath": "M 330 400 C 335 320, 360 220, 405 200 C 440 195, 470 240, 485 275 C 490 285, 470 320, 440 345 C 400 375, 390 410, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 355, 360 300, 400 285 C 435 280, 465 305, 475 325 C 480 335, 455 355, 425 365 C 395 385, 390 410, 390 420 Z",
    "constrictionPoint": {
      "x": 405,
      "y": 200,
      "gapLabel": "Vòm Mềm + Rung Cuống Họng"
    },
    "frictionIndex": 80,
    "contactTarget": "Cuống Lưỡi Chạm Vòm Mềm + Rung Dây Thanh",
    "l1Mistake": "Nuốt âm đuôi /-g/ hoặc nhầm sang /k/ (vd \"bag\" đọc thành \"béc\").",
    "correctiveGuidance": "Khẩu hình y hệt /k/ nhưng dây thanh quản rung liên tục trong cuống họng.",
    "tactileTrick": "Tiếng ực nhẹ ở đáy cổ họng khi cuống lưỡi hạ xuống.",
    "lipShape": {
      "coronalType": "neutral",
      "label": "Mở vừa, cuống họng rung",
      "mouthOpening": 30,
      "lipRoundness": 10
    },
    "audioTone": {
      "freq": 160,
      "f1": 0,
      "f2": 0
    }
  },
  "g": {
    "phoneme": "/g/",
    "name": "Voiced Velar Plosive",
    "vietnameseName": "Âm bật cuống lưỡi hữu thanh",
    "category": "consonant",
    "categoryVi": "Phụ Âm",
    "subCategory": "Plosive",
    "sampleWord": "good",
    "sampleIpa": "/ɡʊd/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 78,
      "jawDrop": 30,
      "airPressure": 75
    },
    "tonguePath": "M 330 400 C 335 320, 360 220, 405 200 C 440 195, 470 240, 485 275 C 490 285, 470 320, 440 345 C 400 375, 390 410, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 355, 360 300, 400 285 C 435 280, 465 305, 475 325 C 480 335, 455 355, 425 365 C 395 385, 390 410, 390 420 Z",
    "constrictionPoint": {
      "x": 405,
      "y": 200,
      "gapLabel": "Vòm Mềm + Rung Cuống Họng"
    },
    "frictionIndex": 80,
    "contactTarget": "Cuống Lưỡi Chạm Vòm Mềm + Rung Dây Thanh",
    "l1Mistake": "Nuốt âm đuôi /-g/ hoặc nhầm sang /k/ (vd \"bag\" đọc thành \"béc\").",
    "correctiveGuidance": "Khẩu hình y hệt /k/ nhưng dây thanh quản rung liên tục trong cuống họng.",
    "tactileTrick": "Tiếng ực nhẹ ở đáy cổ họng khi cuống lưỡi hạ xuống.",
    "lipShape": {
      "coronalType": "neutral",
      "label": "Mở vừa, cuống họng rung",
      "mouthOpening": 30,
      "lipRoundness": 10
    },
    "audioTone": {
      "freq": 160,
      "f1": 0,
      "f2": 0
    }
  },
  "/f/": {
    "phoneme": "/f/",
    "name": "Voiceless Labiodental Fricative",
    "vietnameseName": "Âm xát răng-môi vô thanh",
    "category": "consonant",
    "categoryVi": "Phụ Âm",
    "subCategory": "Fricative",
    "sampleWord": "fish",
    "sampleIpa": "/fɪʃ/",
    "isVoiced": false,
    "defaultSliders": {
      "tongueElevation": 30,
      "jawDrop": 20,
      "airPressure": 85
    },
    "tonguePath": "M 330 400 C 340 360, 370 310, 420 290 C 460 280, 490 300, 505 320 C 510 330, 480 350, 450 365 C 410 385, 390 410, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 360, 370 310, 420 290 C 460 280, 490 300, 505 320 C 510 330, 480 350, 450 365 C 410 385, 390 410, 390 420 Z",
    "constrictionPoint": {
      "x": 550,
      "y": 310,
      "gapLabel": "Răng Cửa Trên Chạm Môi Dưới"
    },
    "frictionIndex": 88,
    "contactTarget": "Răng Cửa Trên Đặt Nhẹ Lên Mép Trong Môi Dưới Thổi Hơi",
    "l1Mistake": "Người Việt đọc thành âm \"ph\" hai môi không chạm răng.",
    "correctiveGuidance": "Răng cửa trên chạm nhẹ vào 1/3 bờ trong của môi dưới, nhẹ nhàng đẩy luồng khí xát qua kẽ răng và môi.",
    "tactileTrick": "Nhìn gương thấy rõ 2 chiếc răng cửa trên cắn nhẹ lên môi dưới!",
    "lipShape": {
      "coronalType": "labiodental",
      "label": "Răng cửa trên chạm bờ môi dưới",
      "mouthOpening": 20,
      "lipRoundness": 10
    },
    "audioTone": {
      "freq": 280,
      "f1": 0,
      "f2": 0
    }
  },
  "f": {
    "phoneme": "/f/",
    "name": "Voiceless Labiodental Fricative",
    "vietnameseName": "Âm xát răng-môi vô thanh",
    "category": "consonant",
    "categoryVi": "Phụ Âm",
    "subCategory": "Fricative",
    "sampleWord": "fish",
    "sampleIpa": "/fɪʃ/",
    "isVoiced": false,
    "defaultSliders": {
      "tongueElevation": 30,
      "jawDrop": 20,
      "airPressure": 85
    },
    "tonguePath": "M 330 400 C 340 360, 370 310, 420 290 C 460 280, 490 300, 505 320 C 510 330, 480 350, 450 365 C 410 385, 390 410, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 360, 370 310, 420 290 C 460 280, 490 300, 505 320 C 510 330, 480 350, 450 365 C 410 385, 390 410, 390 420 Z",
    "constrictionPoint": {
      "x": 550,
      "y": 310,
      "gapLabel": "Răng Cửa Trên Chạm Môi Dưới"
    },
    "frictionIndex": 88,
    "contactTarget": "Răng Cửa Trên Đặt Nhẹ Lên Mép Trong Môi Dưới Thổi Hơi",
    "l1Mistake": "Người Việt đọc thành âm \"ph\" hai môi không chạm răng.",
    "correctiveGuidance": "Răng cửa trên chạm nhẹ vào 1/3 bờ trong của môi dưới, nhẹ nhàng đẩy luồng khí xát qua kẽ răng và môi.",
    "tactileTrick": "Nhìn gương thấy rõ 2 chiếc răng cửa trên cắn nhẹ lên môi dưới!",
    "lipShape": {
      "coronalType": "labiodental",
      "label": "Răng cửa trên chạm bờ môi dưới",
      "mouthOpening": 20,
      "lipRoundness": 10
    },
    "audioTone": {
      "freq": 280,
      "f1": 0,
      "f2": 0
    }
  },
  "/v/": {
    "phoneme": "/v/",
    "name": "Voiced Labiodental Fricative",
    "vietnameseName": "Âm xát răng-môi hữu thanh",
    "category": "consonant",
    "categoryVi": "Phụ Âm",
    "subCategory": "Fricative",
    "sampleWord": "voice",
    "sampleIpa": "/vɔɪs/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 30,
      "jawDrop": 20,
      "airPressure": 75
    },
    "tonguePath": "M 330 400 C 340 360, 370 310, 420 290 C 460 280, 490 300, 505 320 C 510 330, 480 350, 450 365 C 410 385, 390 410, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 360, 370 310, 420 290 C 460 280, 490 300, 505 320 C 510 330, 480 350, 450 365 C 410 385, 390 410, 390 420 Z",
    "constrictionPoint": {
      "x": 550,
      "y": 310,
      "gapLabel": "Răng Cửa Môi Dưới + Rung Dây Thanh"
    },
    "frictionIndex": 85,
    "contactTarget": "Răng Cửa Trên Chạm Môi Dưới + Rung Dây Thanh",
    "l1Mistake": "Người miền Nam hay lẫn lộn /v/ thành âm \"d/gi\" (/j/), đọc \"voice\" thành \"doi-xừ\".",
    "correctiveGuidance": "Khẩu hình giống hệt /f/ (răng cửa trên cắn nhẹ môi dưới) nhưng kích hoạt rung dây thanh quản tạo tiếng rè râm ran.",
    "tactileTrick": "Cảm giác môi dưới rung tê tê khi luồng hơi thoát qua kẽ răng.",
    "lipShape": {
      "coronalType": "labiodental",
      "label": "Răng trên cắn môi dưới + rung tê",
      "mouthOpening": 20,
      "lipRoundness": 10
    },
    "audioTone": {
      "freq": 190,
      "f1": 0,
      "f2": 0
    }
  },
  "v": {
    "phoneme": "/v/",
    "name": "Voiced Labiodental Fricative",
    "vietnameseName": "Âm xát răng-môi hữu thanh",
    "category": "consonant",
    "categoryVi": "Phụ Âm",
    "subCategory": "Fricative",
    "sampleWord": "voice",
    "sampleIpa": "/vɔɪs/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 30,
      "jawDrop": 20,
      "airPressure": 75
    },
    "tonguePath": "M 330 400 C 340 360, 370 310, 420 290 C 460 280, 490 300, 505 320 C 510 330, 480 350, 450 365 C 410 385, 390 410, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 360, 370 310, 420 290 C 460 280, 490 300, 505 320 C 510 330, 480 350, 450 365 C 410 385, 390 410, 390 420 Z",
    "constrictionPoint": {
      "x": 550,
      "y": 310,
      "gapLabel": "Răng Cửa Môi Dưới + Rung Dây Thanh"
    },
    "frictionIndex": 85,
    "contactTarget": "Răng Cửa Trên Chạm Môi Dưới + Rung Dây Thanh",
    "l1Mistake": "Người miền Nam hay lẫn lộn /v/ thành âm \"d/gi\" (/j/), đọc \"voice\" thành \"doi-xừ\".",
    "correctiveGuidance": "Khẩu hình giống hệt /f/ (răng cửa trên cắn nhẹ môi dưới) nhưng kích hoạt rung dây thanh quản tạo tiếng rè râm ran.",
    "tactileTrick": "Cảm giác môi dưới rung tê tê khi luồng hơi thoát qua kẽ răng.",
    "lipShape": {
      "coronalType": "labiodental",
      "label": "Răng trên cắn môi dưới + rung tê",
      "mouthOpening": 20,
      "lipRoundness": 10
    },
    "audioTone": {
      "freq": 190,
      "f1": 0,
      "f2": 0
    }
  },
  "/θ/": {
    "phoneme": "/θ/",
    "name": "Interdental Voiceless Fricative",
    "vietnameseName": "Âm xát kẹp răng vô thanh",
    "category": "consonant",
    "categoryVi": "Phụ Âm",
    "subCategory": "Fricative",
    "sampleWord": "think",
    "sampleIpa": "/θɪŋk/",
    "isVoiced": false,
    "defaultSliders": {
      "tongueElevation": 35,
      "jawDrop": 25,
      "airPressure": 70
    },
    "tonguePath": "M 330 400 C 340 350, 360 305, 400 290 C 445 272, 485 290, 515 298 C 532 301, 550 300, 552 297 C 550 303, 532 315, 505 325 C 450 345, 410 370, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 350, 360 310, 400 295 C 435 280, 470 270, 500 255 C 505 260, 495 285, 485 305 C 450 340, 410 370, 390 420 Z",
    "constrictionPoint": {
      "x": 545,
      "y": 298,
      "gapLabel": "Khe Hở Răng: 2.5mm"
    },
    "frictionIndex": 88,
    "contactTarget": "Đầu Lưỡi Kẹp Giữa Hai Hàm Răng Thổi Hơi",
    "l1Mistake": "Rụt đầu lưỡi vào trong vòm miệng và phát âm như âm \"Thờ\" tiếng Việt (/tʰ/) hoặc biến thành âm /t/ (nhầm \"think\" thành \"tink\").",
    "correctiveGuidance": "Đặt nhẹ đầu lưỡi thò ra giữa 2 hàng răng cửa từ 2-3mm. Tuyệt đối không cắn chặt răng. Nhẹ nhàng đẩy luồng hơi liên tục luồn qua kẽ răng.",
    "tactileTrick": "Đặt ngón tay trỏ sát trước mép môi. Khi phát âm từ \"think\", đầu lưỡi phải khẽ chạm vào ngón tay và cảm nhận rõ luồng hơi ấm phả ra!",
    "lipShape": {
      "coronalType": "dental",
      "label": "Đầu lưỡi thò ra 2-3mm giữa 2 răng",
      "mouthOpening": 25,
      "lipRoundness": 10
    },
    "audioTone": {
      "freq": 300,
      "f1": 0,
      "f2": 0
    }
  },
  "θ": {
    "phoneme": "/θ/",
    "name": "Interdental Voiceless Fricative",
    "vietnameseName": "Âm xát kẹp răng vô thanh",
    "category": "consonant",
    "categoryVi": "Phụ Âm",
    "subCategory": "Fricative",
    "sampleWord": "think",
    "sampleIpa": "/θɪŋk/",
    "isVoiced": false,
    "defaultSliders": {
      "tongueElevation": 35,
      "jawDrop": 25,
      "airPressure": 70
    },
    "tonguePath": "M 330 400 C 340 350, 360 305, 400 290 C 445 272, 485 290, 515 298 C 532 301, 550 300, 552 297 C 550 303, 532 315, 505 325 C 450 345, 410 370, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 350, 360 310, 400 295 C 435 280, 470 270, 500 255 C 505 260, 495 285, 485 305 C 450 340, 410 370, 390 420 Z",
    "constrictionPoint": {
      "x": 545,
      "y": 298,
      "gapLabel": "Khe Hở Răng: 2.5mm"
    },
    "frictionIndex": 88,
    "contactTarget": "Đầu Lưỡi Kẹp Giữa Hai Hàm Răng Thổi Hơi",
    "l1Mistake": "Rụt đầu lưỡi vào trong vòm miệng và phát âm như âm \"Thờ\" tiếng Việt (/tʰ/) hoặc biến thành âm /t/ (nhầm \"think\" thành \"tink\").",
    "correctiveGuidance": "Đặt nhẹ đầu lưỡi thò ra giữa 2 hàng răng cửa từ 2-3mm. Tuyệt đối không cắn chặt răng. Nhẹ nhàng đẩy luồng hơi liên tục luồn qua kẽ răng.",
    "tactileTrick": "Đặt ngón tay trỏ sát trước mép môi. Khi phát âm từ \"think\", đầu lưỡi phải khẽ chạm vào ngón tay và cảm nhận rõ luồng hơi ấm phả ra!",
    "lipShape": {
      "coronalType": "dental",
      "label": "Đầu lưỡi thò ra 2-3mm giữa 2 răng",
      "mouthOpening": 25,
      "lipRoundness": 10
    },
    "audioTone": {
      "freq": 300,
      "f1": 0,
      "f2": 0
    }
  },
  "/ð/": {
    "phoneme": "/ð/",
    "name": "Interdental Voiced Fricative",
    "vietnameseName": "Âm xát kẹp răng hữu thanh",
    "category": "consonant",
    "categoryVi": "Phụ Âm",
    "subCategory": "Fricative",
    "sampleWord": "this",
    "sampleIpa": "/ðɪs/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 36,
      "jawDrop": 24,
      "airPressure": 65
    },
    "tonguePath": "M 330 400 C 340 350, 360 305, 400 290 C 445 272, 485 290, 515 298 C 532 301, 550 300, 552 297 C 550 303, 532 315, 505 325 C 450 345, 410 370, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 350, 360 315, 395 300 C 430 285, 465 260, 495 240 C 500 250, 490 280, 475 310 C 440 345, 405 375, 390 420 Z",
    "constrictionPoint": {
      "x": 545,
      "y": 298,
      "gapLabel": "Khe Hở Răng: 2.5mm + Rung"
    },
    "frictionIndex": 84,
    "contactTarget": "Đầu Lưỡi Kẹp Giữa Hai Răng + Rung Thanh Quản",
    "l1Mistake": "Đọc âm /ð/ thành âm /d/ tiếng Việt (đọc \"this\" thành \"đít\", \"that\" thành \"đát\").",
    "correctiveGuidance": "Khẩu hình giống hệt /θ/ nhưng kích hoạt rung dây thanh quản. Cảm nhận độ râm ran ở đầu lưỡi khi luồng hơi thoát ra.",
    "tactileTrick": "Đặt 2 ngón tay lên yết hầu (cổ họng). Bạn phải cảm nhận rung bần bật khi nói \"this\", khác hoàn toàn với \"think\" không rung!",
    "lipShape": {
      "coronalType": "dental",
      "label": "Đầu lưỡi kẹp giữa 2 răng + rung thanh",
      "mouthOpening": 25,
      "lipRoundness": 10
    },
    "audioTone": {
      "freq": 175,
      "f1": 0,
      "f2": 0
    }
  },
  "ð": {
    "phoneme": "/ð/",
    "name": "Interdental Voiced Fricative",
    "vietnameseName": "Âm xát kẹp răng hữu thanh",
    "category": "consonant",
    "categoryVi": "Phụ Âm",
    "subCategory": "Fricative",
    "sampleWord": "this",
    "sampleIpa": "/ðɪs/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 36,
      "jawDrop": 24,
      "airPressure": 65
    },
    "tonguePath": "M 330 400 C 340 350, 360 305, 400 290 C 445 272, 485 290, 515 298 C 532 301, 550 300, 552 297 C 550 303, 532 315, 505 325 C 450 345, 410 370, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 350, 360 315, 395 300 C 430 285, 465 260, 495 240 C 500 250, 490 280, 475 310 C 440 345, 405 375, 390 420 Z",
    "constrictionPoint": {
      "x": 545,
      "y": 298,
      "gapLabel": "Khe Hở Răng: 2.5mm + Rung"
    },
    "frictionIndex": 84,
    "contactTarget": "Đầu Lưỡi Kẹp Giữa Hai Răng + Rung Thanh Quản",
    "l1Mistake": "Đọc âm /ð/ thành âm /d/ tiếng Việt (đọc \"this\" thành \"đít\", \"that\" thành \"đát\").",
    "correctiveGuidance": "Khẩu hình giống hệt /θ/ nhưng kích hoạt rung dây thanh quản. Cảm nhận độ râm ran ở đầu lưỡi khi luồng hơi thoát ra.",
    "tactileTrick": "Đặt 2 ngón tay lên yết hầu (cổ họng). Bạn phải cảm nhận rung bần bật khi nói \"this\", khác hoàn toàn với \"think\" không rung!",
    "lipShape": {
      "coronalType": "dental",
      "label": "Đầu lưỡi kẹp giữa 2 răng + rung thanh",
      "mouthOpening": 25,
      "lipRoundness": 10
    },
    "audioTone": {
      "freq": 175,
      "f1": 0,
      "f2": 0
    }
  },
  "/s/": {
    "phoneme": "/s/",
    "name": "Voiceless Alveolar Fricative",
    "vietnameseName": "Âm xát chân răng vô thanh (xì hơi)",
    "category": "consonant",
    "categoryVi": "Phụ Âm",
    "subCategory": "Fricative",
    "sampleWord": "see",
    "sampleIpa": "/siː/",
    "isVoiced": false,
    "defaultSliders": {
      "tongueElevation": 70,
      "jawDrop": 15,
      "airPressure": 85
    },
    "tonguePath": "M 330 400 C 340 340, 370 280, 420 255 C 460 235, 495 245, 518 268 C 515 278, 485 300, 455 320 C 415 355, 390 405, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 350, 370 300, 410 285 C 450 275, 480 295, 495 315 C 450 345, 405 375, 390 420 Z",
    "constrictionPoint": {
      "x": 518,
      "y": 268,
      "gapLabel": "Rãnh Hẹp Chân Răng: 1.5mm"
    },
    "frictionIndex": 90,
    "contactTarget": "Đầu Lưỡi Gần Nướu Trên Tạo Rãnh Xì Sắc Bén",
    "l1Mistake": "Nuốt âm đuôi /-s/ theo thói quen đơn lập tiếng Việt hoặc phát âm yếu.",
    "correctiveGuidance": "Hai hàm răng khép gần sát nhau, đầu lưỡi đặt sát nướu răng trên tạo khe hẹp siêu nhỏ, đẩy luồng hơi xì sắc bén như tiếng lốp xe xì hơi.",
    "tactileTrick": "Luồng hơi thổi ra sắc lẹm, nếu để bàn tay trước cằm sẽ thấy luồng gió mát lạnh hướng xuống dưới.",
    "lipShape": {
      "coronalType": "spread",
      "label": "Hai hàm răng khép sát, mép môi hơi dẹt",
      "mouthOpening": 15,
      "lipRoundness": 10
    },
    "audioTone": {
      "freq": 350,
      "f1": 0,
      "f2": 0
    }
  },
  "s": {
    "phoneme": "/s/",
    "name": "Voiceless Alveolar Fricative",
    "vietnameseName": "Âm xát chân răng vô thanh (xì hơi)",
    "category": "consonant",
    "categoryVi": "Phụ Âm",
    "subCategory": "Fricative",
    "sampleWord": "see",
    "sampleIpa": "/siː/",
    "isVoiced": false,
    "defaultSliders": {
      "tongueElevation": 70,
      "jawDrop": 15,
      "airPressure": 85
    },
    "tonguePath": "M 330 400 C 340 340, 370 280, 420 255 C 460 235, 495 245, 518 268 C 515 278, 485 300, 455 320 C 415 355, 390 405, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 350, 370 300, 410 285 C 450 275, 480 295, 495 315 C 450 345, 405 375, 390 420 Z",
    "constrictionPoint": {
      "x": 518,
      "y": 268,
      "gapLabel": "Rãnh Hẹp Chân Răng: 1.5mm"
    },
    "frictionIndex": 90,
    "contactTarget": "Đầu Lưỡi Gần Nướu Trên Tạo Rãnh Xì Sắc Bén",
    "l1Mistake": "Nuốt âm đuôi /-s/ theo thói quen đơn lập tiếng Việt hoặc phát âm yếu.",
    "correctiveGuidance": "Hai hàm răng khép gần sát nhau, đầu lưỡi đặt sát nướu răng trên tạo khe hẹp siêu nhỏ, đẩy luồng hơi xì sắc bén như tiếng lốp xe xì hơi.",
    "tactileTrick": "Luồng hơi thổi ra sắc lẹm, nếu để bàn tay trước cằm sẽ thấy luồng gió mát lạnh hướng xuống dưới.",
    "lipShape": {
      "coronalType": "spread",
      "label": "Hai hàm răng khép sát, mép môi hơi dẹt",
      "mouthOpening": 15,
      "lipRoundness": 10
    },
    "audioTone": {
      "freq": 350,
      "f1": 0,
      "f2": 0
    }
  },
  "/z/": {
    "phoneme": "/z/",
    "name": "Voiced Alveolar Fricative",
    "vietnameseName": "Âm xát chân răng hữu thanh (tiếng ong kêu)",
    "category": "consonant",
    "categoryVi": "Phụ Âm",
    "subCategory": "Fricative",
    "sampleWord": "zoo",
    "sampleIpa": "/zuː/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 70,
      "jawDrop": 15,
      "airPressure": 75
    },
    "tonguePath": "M 330 400 C 340 340, 370 280, 420 255 C 460 235, 495 245, 518 268 C 515 278, 485 300, 455 320 C 415 355, 390 405, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 350, 370 300, 410 285 C 450 275, 480 295, 495 315 C 450 345, 405 375, 390 420 Z",
    "constrictionPoint": {
      "x": 518,
      "y": 268,
      "gapLabel": "Rãnh Nướu + Rung Rè Cổ Họng"
    },
    "frictionIndex": 86,
    "contactTarget": "Khẩu Hình Giống /s/ + Rung Dây Thanh Rè Mạnh",
    "l1Mistake": "Vô thanh hóa âm /z/ thành /s/ (đọc \"is\" thành \"ịt\" hoặc \"ít\").",
    "correctiveGuidance": "Khẩu hình y hệt /s/ nhưng bắt buộc rung dây thanh quản tạo tiếng ong vò vẽ kêu \"zzzzz\".",
    "tactileTrick": "Cảm giác rung tê ở đỉnh hàm răng cửa trên khi phát âm.",
    "lipShape": {
      "coronalType": "spread",
      "label": "Răng khép sát, rung tê hai hàm",
      "mouthOpening": 15,
      "lipRoundness": 10
    },
    "audioTone": {
      "freq": 170,
      "f1": 0,
      "f2": 0
    }
  },
  "z": {
    "phoneme": "/z/",
    "name": "Voiced Alveolar Fricative",
    "vietnameseName": "Âm xát chân răng hữu thanh (tiếng ong kêu)",
    "category": "consonant",
    "categoryVi": "Phụ Âm",
    "subCategory": "Fricative",
    "sampleWord": "zoo",
    "sampleIpa": "/zuː/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 70,
      "jawDrop": 15,
      "airPressure": 75
    },
    "tonguePath": "M 330 400 C 340 340, 370 280, 420 255 C 460 235, 495 245, 518 268 C 515 278, 485 300, 455 320 C 415 355, 390 405, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 350, 370 300, 410 285 C 450 275, 480 295, 495 315 C 450 345, 405 375, 390 420 Z",
    "constrictionPoint": {
      "x": 518,
      "y": 268,
      "gapLabel": "Rãnh Nướu + Rung Rè Cổ Họng"
    },
    "frictionIndex": 86,
    "contactTarget": "Khẩu Hình Giống /s/ + Rung Dây Thanh Rè Mạnh",
    "l1Mistake": "Vô thanh hóa âm /z/ thành /s/ (đọc \"is\" thành \"ịt\" hoặc \"ít\").",
    "correctiveGuidance": "Khẩu hình y hệt /s/ nhưng bắt buộc rung dây thanh quản tạo tiếng ong vò vẽ kêu \"zzzzz\".",
    "tactileTrick": "Cảm giác rung tê ở đỉnh hàm răng cửa trên khi phát âm.",
    "lipShape": {
      "coronalType": "spread",
      "label": "Răng khép sát, rung tê hai hàm",
      "mouthOpening": 15,
      "lipRoundness": 10
    },
    "audioTone": {
      "freq": 170,
      "f1": 0,
      "f2": 0
    }
  },
  "/ʃ/": {
    "phoneme": "/ʃ/",
    "name": "Postalveolar Voiceless Fricative",
    "vietnameseName": "Âm s nặng / suỵt vô thanh",
    "category": "consonant",
    "categoryVi": "Phụ Âm",
    "subCategory": "Fricative",
    "sampleWord": "she",
    "sampleIpa": "/ʃiː/",
    "isVoiced": false,
    "defaultSliders": {
      "tongueElevation": 65,
      "jawDrop": 20,
      "airPressure": 80
    },
    "tonguePath": "M 330 400 C 340 340, 370 280, 420 240 C 455 220, 480 230, 495 245 C 500 252, 495 265, 480 280 C 445 320, 410 365, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 350, 370 320, 410 300 C 450 285, 490 280, 520 285 C 525 292, 510 310, 485 330 C 445 360, 410 385, 390 420 Z",
    "constrictionPoint": {
      "x": 490,
      "y": 235,
      "gapLabel": "Khe Vòm Miệng: 3.0mm"
    },
    "frictionIndex": 92,
    "contactTarget": "Thân Lưỡi Nâng Sát Vòm Cứng + Chu Môi",
    "l1Mistake": "Người miền Bắc làm bẹt môi đọc /ʃ/ thành /s/ (nhầm \"she\" thành \"sea\").",
    "correctiveGuidance": "Chu tròn môi như đang ra hiệu \"Suỵt!\". Nâng thân lưỡi cong hình muỗng lên sát vòm miệng cứng, luồng hơi dày phả mạnh.",
    "tactileTrick": "Hai bên mép môi phải thu tròn lại thành hình chữ O nhỏ, không được dẹt khóe môi sang hai bên!",
    "lipShape": {
      "coronalType": "round",
      "label": "Chu tròn môi như ra hiệu \"Suỵt!\"",
      "mouthOpening": 22,
      "lipRoundness": 80
    },
    "audioTone": {
      "freq": 320,
      "f1": 0,
      "f2": 0
    }
  },
  "ʃ": {
    "phoneme": "/ʃ/",
    "name": "Postalveolar Voiceless Fricative",
    "vietnameseName": "Âm s nặng / suỵt vô thanh",
    "category": "consonant",
    "categoryVi": "Phụ Âm",
    "subCategory": "Fricative",
    "sampleWord": "she",
    "sampleIpa": "/ʃiː/",
    "isVoiced": false,
    "defaultSliders": {
      "tongueElevation": 65,
      "jawDrop": 20,
      "airPressure": 80
    },
    "tonguePath": "M 330 400 C 340 340, 370 280, 420 240 C 455 220, 480 230, 495 245 C 500 252, 495 265, 480 280 C 445 320, 410 365, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 350, 370 320, 410 300 C 450 285, 490 280, 520 285 C 525 292, 510 310, 485 330 C 445 360, 410 385, 390 420 Z",
    "constrictionPoint": {
      "x": 490,
      "y": 235,
      "gapLabel": "Khe Vòm Miệng: 3.0mm"
    },
    "frictionIndex": 92,
    "contactTarget": "Thân Lưỡi Nâng Sát Vòm Cứng + Chu Môi",
    "l1Mistake": "Người miền Bắc làm bẹt môi đọc /ʃ/ thành /s/ (nhầm \"she\" thành \"sea\").",
    "correctiveGuidance": "Chu tròn môi như đang ra hiệu \"Suỵt!\". Nâng thân lưỡi cong hình muỗng lên sát vòm miệng cứng, luồng hơi dày phả mạnh.",
    "tactileTrick": "Hai bên mép môi phải thu tròn lại thành hình chữ O nhỏ, không được dẹt khóe môi sang hai bên!",
    "lipShape": {
      "coronalType": "round",
      "label": "Chu tròn môi như ra hiệu \"Suỵt!\"",
      "mouthOpening": 22,
      "lipRoundness": 80
    },
    "audioTone": {
      "freq": 320,
      "f1": 0,
      "f2": 0
    }
  },
  "/ʒ/": {
    "phoneme": "/ʒ/",
    "name": "Postalveolar Voiced Fricative",
    "vietnameseName": "Âm s nặng hữu thanh",
    "category": "consonant",
    "categoryVi": "Phụ Âm",
    "subCategory": "Fricative",
    "sampleWord": "measure",
    "sampleIpa": "/ˈmeʒ.ər/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 64,
      "jawDrop": 20,
      "airPressure": 70
    },
    "tonguePath": "M 330 400 C 340 340, 370 280, 420 240 C 455 220, 480 230, 495 245 C 500 252, 495 265, 480 280 C 445 320, 410 365, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 350, 370 320, 410 300 C 450 285, 490 280, 520 285 C 525 292, 510 310, 485 330 C 445 360, 410 385, 390 420 Z",
    "constrictionPoint": {
      "x": 490,
      "y": 235,
      "gapLabel": "Vòm Cứng + Rung Thanh Quản"
    },
    "frictionIndex": 90,
    "contactTarget": "Thân Lưỡi Vòm Cứng + Rung Thanh Quản",
    "l1Mistake": "Thay thế bằng âm \"dờ\" hoặc \"gi\" tiếng Việt, mất đi tiếng xát rung đặc trưng.",
    "correctiveGuidance": "Khẩu hình y hệt /ʃ/ (chu tròn môi) nhưng kích hoạt rung dây thanh quản liên tục.",
    "tactileTrick": "Tạo tiếng ong kêu \"dzzzz\" trong khi chu tròn môi hết cỡ!",
    "lipShape": {
      "coronalType": "round",
      "label": "Chu môi tròn + rung thanh quản",
      "mouthOpening": 22,
      "lipRoundness": 80
    },
    "audioTone": {
      "freq": 175,
      "f1": 0,
      "f2": 0
    }
  },
  "ʒ": {
    "phoneme": "/ʒ/",
    "name": "Postalveolar Voiced Fricative",
    "vietnameseName": "Âm s nặng hữu thanh",
    "category": "consonant",
    "categoryVi": "Phụ Âm",
    "subCategory": "Fricative",
    "sampleWord": "measure",
    "sampleIpa": "/ˈmeʒ.ər/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 64,
      "jawDrop": 20,
      "airPressure": 70
    },
    "tonguePath": "M 330 400 C 340 340, 370 280, 420 240 C 455 220, 480 230, 495 245 C 500 252, 495 265, 480 280 C 445 320, 410 365, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 350, 370 320, 410 300 C 450 285, 490 280, 520 285 C 525 292, 510 310, 485 330 C 445 360, 410 385, 390 420 Z",
    "constrictionPoint": {
      "x": 490,
      "y": 235,
      "gapLabel": "Vòm Cứng + Rung Thanh Quản"
    },
    "frictionIndex": 90,
    "contactTarget": "Thân Lưỡi Vòm Cứng + Rung Thanh Quản",
    "l1Mistake": "Thay thế bằng âm \"dờ\" hoặc \"gi\" tiếng Việt, mất đi tiếng xát rung đặc trưng.",
    "correctiveGuidance": "Khẩu hình y hệt /ʃ/ (chu tròn môi) nhưng kích hoạt rung dây thanh quản liên tục.",
    "tactileTrick": "Tạo tiếng ong kêu \"dzzzz\" trong khi chu tròn môi hết cỡ!",
    "lipShape": {
      "coronalType": "round",
      "label": "Chu môi tròn + rung thanh quản",
      "mouthOpening": 22,
      "lipRoundness": 80
    },
    "audioTone": {
      "freq": 175,
      "f1": 0,
      "f2": 0
    }
  },
  "/h/": {
    "phoneme": "/h/",
    "name": "Voiceless Glottal Fricative",
    "vietnameseName": "Âm thở thanh môn vô thanh",
    "category": "consonant",
    "categoryVi": "Phụ Âm",
    "subCategory": "Fricative",
    "sampleWord": "hat",
    "sampleIpa": "/hæt/",
    "isVoiced": false,
    "defaultSliders": {
      "tongueElevation": 35,
      "jawDrop": 35,
      "airPressure": 65
    },
    "tonguePath": "M 330 400 C 340 360, 370 310, 420 290 C 460 280, 490 300, 505 320 C 510 330, 480 350, 450 365 C 410 385, 390 410, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 360, 370 310, 420 290 C 460 280, 490 300, 505 320 C 510 330, 480 350, 450 365 C 410 385, 390 410, 390 420 Z",
    "constrictionPoint": {
      "x": 295,
      "y": 430,
      "gapLabel": "Thanh Môn Mở Rộng: 5.0mm"
    },
    "frictionIndex": 40,
    "contactTarget": "Khoang Miệng Thả Lỏng Hoàn Toàn, Thổi Hơi Từ Họng",
    "l1Mistake": "Khạc hơi quá mạnh từ cuống họng như âm \"kh\" tiếng Việt.",
    "correctiveGuidance": "Cơ quan phát âm chuẩn bị sẵn khẩu hình cho nguyên âm kế tiếp. Thở ra một luồng khí nhẹ nhàng từ thanh môn không có cản trở.",
    "tactileTrick": "Thổi hơi làm mờ mặt gương hoặc mắt kính để lau kính.",
    "lipShape": {
      "coronalType": "neutral",
      "label": "Mở tự nhiên thả lỏng",
      "mouthOpening": 35,
      "lipRoundness": 10
    },
    "audioTone": {
      "freq": 180,
      "f1": 0,
      "f2": 0
    }
  },
  "h": {
    "phoneme": "/h/",
    "name": "Voiceless Glottal Fricative",
    "vietnameseName": "Âm thở thanh môn vô thanh",
    "category": "consonant",
    "categoryVi": "Phụ Âm",
    "subCategory": "Fricative",
    "sampleWord": "hat",
    "sampleIpa": "/hæt/",
    "isVoiced": false,
    "defaultSliders": {
      "tongueElevation": 35,
      "jawDrop": 35,
      "airPressure": 65
    },
    "tonguePath": "M 330 400 C 340 360, 370 310, 420 290 C 460 280, 490 300, 505 320 C 510 330, 480 350, 450 365 C 410 385, 390 410, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 360, 370 310, 420 290 C 460 280, 490 300, 505 320 C 510 330, 480 350, 450 365 C 410 385, 390 410, 390 420 Z",
    "constrictionPoint": {
      "x": 295,
      "y": 430,
      "gapLabel": "Thanh Môn Mở Rộng: 5.0mm"
    },
    "frictionIndex": 40,
    "contactTarget": "Khoang Miệng Thả Lỏng Hoàn Toàn, Thổi Hơi Từ Họng",
    "l1Mistake": "Khạc hơi quá mạnh từ cuống họng như âm \"kh\" tiếng Việt.",
    "correctiveGuidance": "Cơ quan phát âm chuẩn bị sẵn khẩu hình cho nguyên âm kế tiếp. Thở ra một luồng khí nhẹ nhàng từ thanh môn không có cản trở.",
    "tactileTrick": "Thổi hơi làm mờ mặt gương hoặc mắt kính để lau kính.",
    "lipShape": {
      "coronalType": "neutral",
      "label": "Mở tự nhiên thả lỏng",
      "mouthOpening": 35,
      "lipRoundness": 10
    },
    "audioTone": {
      "freq": 180,
      "f1": 0,
      "f2": 0
    }
  },
  "/tʃ/": {
    "phoneme": "/tʃ/",
    "name": "Voiceless Postalveolar Affricate",
    "vietnameseName": "Âm tắc xát vô thanh (ch nặng)",
    "category": "consonant",
    "categoryVi": "Phụ Âm",
    "subCategory": "Affricate",
    "sampleWord": "chin",
    "sampleIpa": "/tʃɪn/",
    "isVoiced": false,
    "defaultSliders": {
      "tongueElevation": 72,
      "jawDrop": 22,
      "airPressure": 85
    },
    "tonguePath": "M 330 400 C 340 340, 370 270, 425 240 C 460 220, 495 235, 520 258 C 515 272, 485 295, 455 320 C 415 355, 390 405, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 350, 370 290, 410 275 C 450 265, 480 285, 495 305 C 450 340, 405 375, 390 420 Z",
    "constrictionPoint": {
      "x": 510,
      "y": 245,
      "gapLabel": "Chặn /t/ Bung Sang /ʃ/"
    },
    "frictionIndex": 94,
    "contactTarget": "Chặn Khí Ở Vòm Nướu Sau Rồi Bung Ma Sát /ʃ/",
    "l1Mistake": "Đọc nông như chữ \"ch\" tiếng Việt (đọc \"cheap\" thành \"chíp\" phẳng lì).",
    "correctiveGuidance": "Khép răng, chu môi, đầu lưỡi chặn khí ở nướu sau như /t/ rồi bung nổ tức thì sang âm xát /ʃ/.",
    "tactileTrick": "Tiếng nổ xì mạnh giống như tiếng đoàn tàu hỏa hơi nước \"ch-ch-ch\"!",
    "lipShape": {
      "coronalType": "round",
      "label": "Chu môi mở nhẹ, bật nổ xát",
      "mouthOpening": 25,
      "lipRoundness": 70
    },
    "audioTone": {
      "freq": 300,
      "f1": 0,
      "f2": 0
    }
  },
  "tʃ": {
    "phoneme": "/tʃ/",
    "name": "Voiceless Postalveolar Affricate",
    "vietnameseName": "Âm tắc xát vô thanh (ch nặng)",
    "category": "consonant",
    "categoryVi": "Phụ Âm",
    "subCategory": "Affricate",
    "sampleWord": "chin",
    "sampleIpa": "/tʃɪn/",
    "isVoiced": false,
    "defaultSliders": {
      "tongueElevation": 72,
      "jawDrop": 22,
      "airPressure": 85
    },
    "tonguePath": "M 330 400 C 340 340, 370 270, 425 240 C 460 220, 495 235, 520 258 C 515 272, 485 295, 455 320 C 415 355, 390 405, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 350, 370 290, 410 275 C 450 265, 480 285, 495 305 C 450 340, 405 375, 390 420 Z",
    "constrictionPoint": {
      "x": 510,
      "y": 245,
      "gapLabel": "Chặn /t/ Bung Sang /ʃ/"
    },
    "frictionIndex": 94,
    "contactTarget": "Chặn Khí Ở Vòm Nướu Sau Rồi Bung Ma Sát /ʃ/",
    "l1Mistake": "Đọc nông như chữ \"ch\" tiếng Việt (đọc \"cheap\" thành \"chíp\" phẳng lì).",
    "correctiveGuidance": "Khép răng, chu môi, đầu lưỡi chặn khí ở nướu sau như /t/ rồi bung nổ tức thì sang âm xát /ʃ/.",
    "tactileTrick": "Tiếng nổ xì mạnh giống như tiếng đoàn tàu hỏa hơi nước \"ch-ch-ch\"!",
    "lipShape": {
      "coronalType": "round",
      "label": "Chu môi mở nhẹ, bật nổ xát",
      "mouthOpening": 25,
      "lipRoundness": 70
    },
    "audioTone": {
      "freq": 300,
      "f1": 0,
      "f2": 0
    }
  },
  "/dʒ/": {
    "phoneme": "/dʒ/",
    "name": "Voiced Postalveolar Affricate",
    "vietnameseName": "Âm tắc xát hữu thanh (j rung)",
    "category": "consonant",
    "categoryVi": "Phụ Âm",
    "subCategory": "Affricate",
    "sampleWord": "joy",
    "sampleIpa": "/dʒɔɪ/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 70,
      "jawDrop": 22,
      "airPressure": 78
    },
    "tonguePath": "M 330 400 C 340 340, 370 270, 425 240 C 460 220, 495 235, 520 258 C 515 272, 485 295, 455 320 C 415 355, 390 405, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 350, 370 290, 410 275 C 450 265, 480 285, 495 305 C 450 340, 405 375, 390 420 Z",
    "constrictionPoint": {
      "x": 510,
      "y": 245,
      "gapLabel": "Chặn /d/ Bung /ʒ/ + Rung"
    },
    "frictionIndex": 88,
    "contactTarget": "Chặn /d/ Bung Sang /ʒ/ + Rung Mạnh Thanh Quản",
    "l1Mistake": "Người Việt thay bằng âm \"d/gi\" tiếng Việt hoặc mất tính bật khí.",
    "correctiveGuidance": "Khẩu hình giống /tʃ/ (chu tròn môi) nhưng kích hoạt rung dây thanh quản mạnh mẽ từ trong cổ họng.",
    "tactileTrick": "Rung mạnh ở cổ họng kết hợp với cảm giác giật bật ở đầu lưỡi.",
    "lipShape": {
      "coronalType": "round",
      "label": "Chu môi tròn + bật nổ rung",
      "mouthOpening": 25,
      "lipRoundness": 70
    },
    "audioTone": {
      "freq": 175,
      "f1": 0,
      "f2": 0
    }
  },
  "dʒ": {
    "phoneme": "/dʒ/",
    "name": "Voiced Postalveolar Affricate",
    "vietnameseName": "Âm tắc xát hữu thanh (j rung)",
    "category": "consonant",
    "categoryVi": "Phụ Âm",
    "subCategory": "Affricate",
    "sampleWord": "joy",
    "sampleIpa": "/dʒɔɪ/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 70,
      "jawDrop": 22,
      "airPressure": 78
    },
    "tonguePath": "M 330 400 C 340 340, 370 270, 425 240 C 460 220, 495 235, 520 258 C 515 272, 485 295, 455 320 C 415 355, 390 405, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 350, 370 290, 410 275 C 450 265, 480 285, 495 305 C 450 340, 405 375, 390 420 Z",
    "constrictionPoint": {
      "x": 510,
      "y": 245,
      "gapLabel": "Chặn /d/ Bung /ʒ/ + Rung"
    },
    "frictionIndex": 88,
    "contactTarget": "Chặn /d/ Bung Sang /ʒ/ + Rung Mạnh Thanh Quản",
    "l1Mistake": "Người Việt thay bằng âm \"d/gi\" tiếng Việt hoặc mất tính bật khí.",
    "correctiveGuidance": "Khẩu hình giống /tʃ/ (chu tròn môi) nhưng kích hoạt rung dây thanh quản mạnh mẽ từ trong cổ họng.",
    "tactileTrick": "Rung mạnh ở cổ họng kết hợp với cảm giác giật bật ở đầu lưỡi.",
    "lipShape": {
      "coronalType": "round",
      "label": "Chu môi tròn + bật nổ rung",
      "mouthOpening": 25,
      "lipRoundness": 70
    },
    "audioTone": {
      "freq": 175,
      "f1": 0,
      "f2": 0
    }
  },
  "/m/": {
    "phoneme": "/m/",
    "name": "Bilabial Nasal",
    "vietnameseName": "Âm mũi hai môi",
    "category": "consonant",
    "categoryVi": "Phụ Âm",
    "subCategory": "Nasal",
    "sampleWord": "man",
    "sampleIpa": "/mæn/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 35,
      "jawDrop": 12,
      "airPressure": 60
    },
    "tonguePath": "M 330 400 C 340 360, 370 310, 420 290 C 460 280, 490 300, 505 320 C 510 330, 480 350, 450 365 C 410 385, 390 410, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 360, 370 310, 420 290 C 460 280, 490 300, 505 320 C 510 330, 480 350, 450 365 C 410 385, 390 410, 390 420 Z",
    "constrictionPoint": {
      "x": 585,
      "y": 278,
      "gapLabel": "Môi Khép Kín + Thoát Khí Mũi"
    },
    "frictionIndex": 75,
    "contactTarget": "Hai Môi Ngậm Kín, Lưỡi Gà Hạ Thoát Khí Qua Mũi",
    "l1Mistake": "Âm /m/ tương đối tự nhiên, lưu ý giữ âm vang ở cuối từ.",
    "correctiveGuidance": "Mím chặt hai môi, hạ lưỡi gà xuống để toàn bộ luồng khí rung thanh thoát ra khoang mũi.",
    "tactileTrick": "Đặt ngón tay lên sống mũi, cảm nhận độ rung mạnh của khoang mũi.",
    "lipShape": {
      "coronalType": "bilabial",
      "label": "Hai môi ngậm kín tự nhiên",
      "mouthOpening": 5,
      "lipRoundness": 10
    },
    "audioTone": {
      "freq": 140,
      "f1": 250,
      "f2": 1000
    }
  },
  "m": {
    "phoneme": "/m/",
    "name": "Bilabial Nasal",
    "vietnameseName": "Âm mũi hai môi",
    "category": "consonant",
    "categoryVi": "Phụ Âm",
    "subCategory": "Nasal",
    "sampleWord": "man",
    "sampleIpa": "/mæn/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 35,
      "jawDrop": 12,
      "airPressure": 60
    },
    "tonguePath": "M 330 400 C 340 360, 370 310, 420 290 C 460 280, 490 300, 505 320 C 510 330, 480 350, 450 365 C 410 385, 390 410, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 360, 370 310, 420 290 C 460 280, 490 300, 505 320 C 510 330, 480 350, 450 365 C 410 385, 390 410, 390 420 Z",
    "constrictionPoint": {
      "x": 585,
      "y": 278,
      "gapLabel": "Môi Khép Kín + Thoát Khí Mũi"
    },
    "frictionIndex": 75,
    "contactTarget": "Hai Môi Ngậm Kín, Lưỡi Gà Hạ Thoát Khí Qua Mũi",
    "l1Mistake": "Âm /m/ tương đối tự nhiên, lưu ý giữ âm vang ở cuối từ.",
    "correctiveGuidance": "Mím chặt hai môi, hạ lưỡi gà xuống để toàn bộ luồng khí rung thanh thoát ra khoang mũi.",
    "tactileTrick": "Đặt ngón tay lên sống mũi, cảm nhận độ rung mạnh của khoang mũi.",
    "lipShape": {
      "coronalType": "bilabial",
      "label": "Hai môi ngậm kín tự nhiên",
      "mouthOpening": 5,
      "lipRoundness": 10
    },
    "audioTone": {
      "freq": 140,
      "f1": 250,
      "f2": 1000
    }
  },
  "/n/": {
    "phoneme": "/n/",
    "name": "Alveolar Nasal",
    "vietnameseName": "Âm mũi chân răng",
    "category": "consonant",
    "categoryVi": "Phụ Âm",
    "subCategory": "Nasal",
    "sampleWord": "no",
    "sampleIpa": "/nəʊ/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 75,
      "jawDrop": 20,
      "airPressure": 60
    },
    "tonguePath": "M 330 400 C 340 340, 370 280, 420 250 C 460 225, 500 235, 526 268 C 522 280, 490 300, 460 320 C 420 355, 390 405, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 350, 370 290, 410 275 C 450 265, 480 285, 495 305 C 450 340, 405 375, 390 420 Z",
    "constrictionPoint": {
      "x": 526,
      "y": 268,
      "gapLabel": "Đầu Lưỡi Áp Chân Răng + Hơi Qua Mũi"
    },
    "frictionIndex": 78,
    "contactTarget": "Đầu Lưỡi Ép Chặt Nướu Răng Trên, Khí Thoát Qua Mũi",
    "l1Mistake": "Người miền Bắc ở một số tỉnh hay lẫn lộn /l/ với /n/.",
    "correctiveGuidance": "Đầu lưỡi ép chặt chặn toàn bộ khoang miệng, luồng hơi chuyển hướng đi lên khoang mũi.",
    "tactileTrick": "Bịt nhẹ mũi lại thì âm /n/ sẽ bị nghẽn không phát ra được!",
    "lipShape": {
      "coronalType": "neutral",
      "label": "Răng mở nhẹ, đầu lưỡi chạm nướu",
      "mouthOpening": 20,
      "lipRoundness": 10
    },
    "audioTone": {
      "freq": 160,
      "f1": 280,
      "f2": 1400
    }
  },
  "n": {
    "phoneme": "/n/",
    "name": "Alveolar Nasal",
    "vietnameseName": "Âm mũi chân răng",
    "category": "consonant",
    "categoryVi": "Phụ Âm",
    "subCategory": "Nasal",
    "sampleWord": "no",
    "sampleIpa": "/nəʊ/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 75,
      "jawDrop": 20,
      "airPressure": 60
    },
    "tonguePath": "M 330 400 C 340 340, 370 280, 420 250 C 460 225, 500 235, 526 268 C 522 280, 490 300, 460 320 C 420 355, 390 405, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 350, 370 290, 410 275 C 450 265, 480 285, 495 305 C 450 340, 405 375, 390 420 Z",
    "constrictionPoint": {
      "x": 526,
      "y": 268,
      "gapLabel": "Đầu Lưỡi Áp Chân Răng + Hơi Qua Mũi"
    },
    "frictionIndex": 78,
    "contactTarget": "Đầu Lưỡi Ép Chặt Nướu Răng Trên, Khí Thoát Qua Mũi",
    "l1Mistake": "Người miền Bắc ở một số tỉnh hay lẫn lộn /l/ với /n/.",
    "correctiveGuidance": "Đầu lưỡi ép chặt chặn toàn bộ khoang miệng, luồng hơi chuyển hướng đi lên khoang mũi.",
    "tactileTrick": "Bịt nhẹ mũi lại thì âm /n/ sẽ bị nghẽn không phát ra được!",
    "lipShape": {
      "coronalType": "neutral",
      "label": "Răng mở nhẹ, đầu lưỡi chạm nướu",
      "mouthOpening": 20,
      "lipRoundness": 10
    },
    "audioTone": {
      "freq": 160,
      "f1": 280,
      "f2": 1400
    }
  },
  "/ŋ/": {
    "phoneme": "/ŋ/",
    "name": "Velar Nasal",
    "vietnameseName": "Âm mũi cuống lưỡi (ng đuôi)",
    "category": "consonant",
    "categoryVi": "Phụ Âm",
    "subCategory": "Nasal",
    "sampleWord": "sing",
    "sampleIpa": "/sɪŋ/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 82,
      "jawDrop": 25,
      "airPressure": 65
    },
    "tonguePath": "M 330 400 C 335 320, 360 215, 405 195 C 440 190, 470 235, 485 270 C 490 280, 470 315, 440 340 C 400 370, 390 410, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 355, 360 300, 400 285 C 435 280, 465 305, 475 325 C 480 335, 455 355, 425 365 C 395 385, 390 410, 390 420 Z",
    "constrictionPoint": {
      "x": 405,
      "y": 195,
      "gapLabel": "Cuống Lưỡi Chạm Vòm Mềm + Hơi Mũi"
    },
    "frictionIndex": 82,
    "contactTarget": "Cuống Lưỡi Ép Kín Vòm Mềm, Luồng Hơi Thoát Qua Mũi",
    "l1Mistake": "Thêm âm /g/ ở đuôi từ (đọc \"sing\" thành \"sing-gờ\").",
    "correctiveGuidance": "Nâng cuống lưỡi ép chặt vòm miệng mềm, hạ lưỡi gà cho hơi lên mũi. Không nhả cuống lưỡi ra tạo âm g.",
    "tactileTrick": "Giữ nguyên cuống lưỡi dính chặt vòm họng cho đến khi âm thanh tắt hẳn.",
    "lipShape": {
      "coronalType": "neutral",
      "label": "Miệng mở tự nhiên, cuống lưỡi dính",
      "mouthOpening": 28,
      "lipRoundness": 10
    },
    "audioTone": {
      "freq": 170,
      "f1": 300,
      "f2": 2000
    }
  },
  "ŋ": {
    "phoneme": "/ŋ/",
    "name": "Velar Nasal",
    "vietnameseName": "Âm mũi cuống lưỡi (ng đuôi)",
    "category": "consonant",
    "categoryVi": "Phụ Âm",
    "subCategory": "Nasal",
    "sampleWord": "sing",
    "sampleIpa": "/sɪŋ/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 82,
      "jawDrop": 25,
      "airPressure": 65
    },
    "tonguePath": "M 330 400 C 335 320, 360 215, 405 195 C 440 190, 470 235, 485 270 C 490 280, 470 315, 440 340 C 400 370, 390 410, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 355, 360 300, 400 285 C 435 280, 465 305, 475 325 C 480 335, 455 355, 425 365 C 395 385, 390 410, 390 420 Z",
    "constrictionPoint": {
      "x": 405,
      "y": 195,
      "gapLabel": "Cuống Lưỡi Chạm Vòm Mềm + Hơi Mũi"
    },
    "frictionIndex": 82,
    "contactTarget": "Cuống Lưỡi Ép Kín Vòm Mềm, Luồng Hơi Thoát Qua Mũi",
    "l1Mistake": "Thêm âm /g/ ở đuôi từ (đọc \"sing\" thành \"sing-gờ\").",
    "correctiveGuidance": "Nâng cuống lưỡi ép chặt vòm miệng mềm, hạ lưỡi gà cho hơi lên mũi. Không nhả cuống lưỡi ra tạo âm g.",
    "tactileTrick": "Giữ nguyên cuống lưỡi dính chặt vòm họng cho đến khi âm thanh tắt hẳn.",
    "lipShape": {
      "coronalType": "neutral",
      "label": "Miệng mở tự nhiên, cuống lưỡi dính",
      "mouthOpening": 28,
      "lipRoundness": 10
    },
    "audioTone": {
      "freq": 170,
      "f1": 300,
      "f2": 2000
    }
  },
  "/l/": {
    "phoneme": "/l/",
    "name": "Alveolar Lateral Approximant",
    "vietnameseName": "Âm tiếp cận cạnh lưỡi",
    "category": "consonant",
    "categoryVi": "Phụ Âm",
    "subCategory": "Approximant",
    "sampleWord": "leg",
    "sampleIpa": "/leɡ/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 75,
      "jawDrop": 22,
      "airPressure": 60
    },
    "tonguePath": "M 330 400 C 340 345, 370 285, 420 260 C 460 235, 500 240, 526 268 C 518 285, 485 315, 455 335 C 415 365, 390 405, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 350, 370 300, 410 285 C 450 275, 480 295, 495 315 C 450 340, 405 375, 390 420 Z",
    "constrictionPoint": {
      "x": 526,
      "y": 268,
      "gapLabel": "Đầu Lưỡi Chạm Nướu, Khí Ra 2 Cạnh"
    },
    "frictionIndex": 65,
    "contactTarget": "Đầu Lưỡi Chạm Chân Răng Trên, Luồng Khí Thoát Hai Bên Thân Lưỡi",
    "l1Mistake": "Lẫn lộn /l/ thành /n/ (Bắc Bộ) hoặc nuốt \"dark L\" ở đuôi từ (đọc \"milk\" thành \"miu\").",
    "correctiveGuidance": "Đầu lưỡi chạm chính giữa nướu răng cửa trên, hai bên thân lưỡi hạ xuống để không khí tự do lùa qua hai bên sườn.",
    "tactileTrick": "Khi làm \"dark L\" đuôi từ (\"feel\"), giữ đầu lưỡi ở chân răng trên và nâng nhẹ cuống lưỡi.",
    "lipShape": {
      "coronalType": "neutral",
      "label": "Đầu lưỡi tựa nướu răng trên",
      "mouthOpening": 25,
      "lipRoundness": 10
    },
    "audioTone": {
      "freq": 220,
      "f1": 350,
      "f2": 1200
    }
  },
  "l": {
    "phoneme": "/l/",
    "name": "Alveolar Lateral Approximant",
    "vietnameseName": "Âm tiếp cận cạnh lưỡi",
    "category": "consonant",
    "categoryVi": "Phụ Âm",
    "subCategory": "Approximant",
    "sampleWord": "leg",
    "sampleIpa": "/leɡ/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 75,
      "jawDrop": 22,
      "airPressure": 60
    },
    "tonguePath": "M 330 400 C 340 345, 370 285, 420 260 C 460 235, 500 240, 526 268 C 518 285, 485 315, 455 335 C 415 365, 390 405, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 350, 370 300, 410 285 C 450 275, 480 295, 495 315 C 450 340, 405 375, 390 420 Z",
    "constrictionPoint": {
      "x": 526,
      "y": 268,
      "gapLabel": "Đầu Lưỡi Chạm Nướu, Khí Ra 2 Cạnh"
    },
    "frictionIndex": 65,
    "contactTarget": "Đầu Lưỡi Chạm Chân Răng Trên, Luồng Khí Thoát Hai Bên Thân Lưỡi",
    "l1Mistake": "Lẫn lộn /l/ thành /n/ (Bắc Bộ) hoặc nuốt \"dark L\" ở đuôi từ (đọc \"milk\" thành \"miu\").",
    "correctiveGuidance": "Đầu lưỡi chạm chính giữa nướu răng cửa trên, hai bên thân lưỡi hạ xuống để không khí tự do lùa qua hai bên sườn.",
    "tactileTrick": "Khi làm \"dark L\" đuôi từ (\"feel\"), giữ đầu lưỡi ở chân răng trên và nâng nhẹ cuống lưỡi.",
    "lipShape": {
      "coronalType": "neutral",
      "label": "Đầu lưỡi tựa nướu răng trên",
      "mouthOpening": 25,
      "lipRoundness": 10
    },
    "audioTone": {
      "freq": 220,
      "f1": 350,
      "f2": 1200
    }
  },
  "/r/": {
    "phoneme": "/r/",
    "name": "Post-alveolar Approximant",
    "vietnameseName": "Âm tiếp cận sau chân răng (r uốn lưỡi)",
    "category": "consonant",
    "categoryVi": "Phụ Âm",
    "subCategory": "Approximant",
    "sampleWord": "red",
    "sampleIpa": "/red/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 68,
      "jawDrop": 25,
      "airPressure": 65
    },
    "tonguePath": "M 330 400 C 340 335, 370 265, 425 240 C 460 230, 480 245, 495 260 C 490 275, 470 300, 440 330 C 400 365, 390 405, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 350, 370 295, 415 280 C 455 270, 485 290, 500 310 C 455 345, 405 375, 390 420 Z",
    "constrictionPoint": {
      "x": 495,
      "y": 260,
      "gapLabel": "Đầu Lưỡi Cong Không Chạm: 4.0mm"
    },
    "frictionIndex": 70,
    "contactTarget": "Đầu Lưỡi Cong Về Sau Vòm Cứng NHƯNG KHÔNG ĐƯỢC CHẠM",
    "l1Mistake": "Rung lưỡi như chữ \"r\" tiếng Việt hoặc đọc thành \"d/z\" (Hà Nội).",
    "correctiveGuidance": "Cong đầu lưỡi ngược về phía sau vòm họng, mép môi hơi chu nhẹ. Tuyệt đối không để đầu lưỡi chạm vào bất kỳ điểm nào trong miệng!",
    "tactileTrick": "Hai bên sườn lưỡi tì vào mặt trong hàm răng hàm trên, đầu lưỡi lơ lửng trong không trung.",
    "lipShape": {
      "coronalType": "round",
      "label": "Môi hơi chu tròn nhẹ, lưỡi cuộn sâu",
      "mouthOpening": 25,
      "lipRoundness": 50
    },
    "audioTone": {
      "freq": 210,
      "f1": 350,
      "f2": 1100
    }
  },
  "r": {
    "phoneme": "/r/",
    "name": "Post-alveolar Approximant",
    "vietnameseName": "Âm tiếp cận sau chân răng (r uốn lưỡi)",
    "category": "consonant",
    "categoryVi": "Phụ Âm",
    "subCategory": "Approximant",
    "sampleWord": "red",
    "sampleIpa": "/red/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 68,
      "jawDrop": 25,
      "airPressure": 65
    },
    "tonguePath": "M 330 400 C 340 335, 370 265, 425 240 C 460 230, 480 245, 495 260 C 490 275, 470 300, 440 330 C 400 365, 390 405, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 350, 370 295, 415 280 C 455 270, 485 290, 500 310 C 455 345, 405 375, 390 420 Z",
    "constrictionPoint": {
      "x": 495,
      "y": 260,
      "gapLabel": "Đầu Lưỡi Cong Không Chạm: 4.0mm"
    },
    "frictionIndex": 70,
    "contactTarget": "Đầu Lưỡi Cong Về Sau Vòm Cứng NHƯNG KHÔNG ĐƯỢC CHẠM",
    "l1Mistake": "Rung lưỡi như chữ \"r\" tiếng Việt hoặc đọc thành \"d/z\" (Hà Nội).",
    "correctiveGuidance": "Cong đầu lưỡi ngược về phía sau vòm họng, mép môi hơi chu nhẹ. Tuyệt đối không để đầu lưỡi chạm vào bất kỳ điểm nào trong miệng!",
    "tactileTrick": "Hai bên sườn lưỡi tì vào mặt trong hàm răng hàm trên, đầu lưỡi lơ lửng trong không trung.",
    "lipShape": {
      "coronalType": "round",
      "label": "Môi hơi chu tròn nhẹ, lưỡi cuộn sâu",
      "mouthOpening": 25,
      "lipRoundness": 50
    },
    "audioTone": {
      "freq": 210,
      "f1": 350,
      "f2": 1100
    }
  },
  "/w/": {
    "phoneme": "/w/",
    "name": "Labio-velar Approximant",
    "vietnameseName": "Âm tiếp cận môi-vòm mềm",
    "category": "consonant",
    "categoryVi": "Phụ Âm",
    "subCategory": "Approximant",
    "sampleWord": "wet",
    "sampleIpa": "/wet/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 80,
      "jawDrop": 15,
      "airPressure": 60
    },
    "tonguePath": "M 330 400 C 335 325, 365 220, 415 200 C 450 195, 480 235, 495 265 C 500 275, 475 305, 445 325 C 405 355, 390 400, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 360, 370 310, 420 290 C 460 280, 490 300, 505 320 C 510 330, 480 350, 450 365 C 410 385, 390 410, 390 420 Z",
    "constrictionPoint": {
      "x": 585,
      "y": 278,
      "gapLabel": "Chu Môi Tròn Nhỏ + Nâng Cuống Lưỡi"
    },
    "frictionIndex": 60,
    "contactTarget": "Môi Chu Nhọn Tròn Xoe + Cuống Lưỡi Nâng Cao Sát Vòm Mềm",
    "l1Mistake": "Đọc thành âm \"qu\" hoặc \"v\" tiếng Việt (đọc \"wet\" thành \"quét\" hoặc \"vét\").",
    "correctiveGuidance": "Môi chu nhỏ hết cỡ giống như huýt sáo, cuống lưỡi nâng cao. Mở nhanh môi sang nguyên âm kế tiếp.",
    "tactileTrick": "Chuyển động môi mở bung nhanh giống như camera zoom out.",
    "lipShape": {
      "coronalType": "round",
      "label": "Chu nhọn tròn xoe bung nhanh",
      "mouthOpening": 15,
      "lipRoundness": 90
    },
    "audioTone": {
      "freq": 200,
      "f1": 300,
      "f2": 800
    }
  },
  "w": {
    "phoneme": "/w/",
    "name": "Labio-velar Approximant",
    "vietnameseName": "Âm tiếp cận môi-vòm mềm",
    "category": "consonant",
    "categoryVi": "Phụ Âm",
    "subCategory": "Approximant",
    "sampleWord": "wet",
    "sampleIpa": "/wet/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 80,
      "jawDrop": 15,
      "airPressure": 60
    },
    "tonguePath": "M 330 400 C 335 325, 365 220, 415 200 C 450 195, 480 235, 495 265 C 500 275, 475 305, 445 325 C 405 355, 390 400, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 360, 370 310, 420 290 C 460 280, 490 300, 505 320 C 510 330, 480 350, 450 365 C 410 385, 390 410, 390 420 Z",
    "constrictionPoint": {
      "x": 585,
      "y": 278,
      "gapLabel": "Chu Môi Tròn Nhỏ + Nâng Cuống Lưỡi"
    },
    "frictionIndex": 60,
    "contactTarget": "Môi Chu Nhọn Tròn Xoe + Cuống Lưỡi Nâng Cao Sát Vòm Mềm",
    "l1Mistake": "Đọc thành âm \"qu\" hoặc \"v\" tiếng Việt (đọc \"wet\" thành \"quét\" hoặc \"vét\").",
    "correctiveGuidance": "Môi chu nhỏ hết cỡ giống như huýt sáo, cuống lưỡi nâng cao. Mở nhanh môi sang nguyên âm kế tiếp.",
    "tactileTrick": "Chuyển động môi mở bung nhanh giống như camera zoom out.",
    "lipShape": {
      "coronalType": "round",
      "label": "Chu nhọn tròn xoe bung nhanh",
      "mouthOpening": 15,
      "lipRoundness": 90
    },
    "audioTone": {
      "freq": 200,
      "f1": 300,
      "f2": 800
    }
  },
  "/j/": {
    "phoneme": "/j/",
    "name": "Palatal Approximant",
    "vietnameseName": "Âm tiếp cận vòm cứng (bán nguyên âm y)",
    "category": "consonant",
    "categoryVi": "Phụ Âm",
    "subCategory": "Approximant",
    "sampleWord": "yes",
    "sampleIpa": "/jes/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 82,
      "jawDrop": 18,
      "airPressure": 60
    },
    "tonguePath": "M 330 400 C 340 330, 380 230, 440 205 C 475 195, 505 230, 520 260 C 525 270, 505 295, 470 310 C 430 340, 395 375, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 350, 370 295, 415 280 C 455 270, 485 290, 500 310 C 455 345, 405 375, 390 420 Z",
    "constrictionPoint": {
      "x": 440,
      "y": 205,
      "gapLabel": "Thân Lưỡi Sát Vòm Cứng: 2.5mm"
    },
    "frictionIndex": 55,
    "contactTarget": "Thân Trước Lưỡi Nâng Sát Vòm Cứng Lướt Nhanh",
    "l1Mistake": "Đọc thành âm \"d/gi\" tiếng Việt có ma sát rè (đọc \"yes\" thành \"dét\").",
    "correctiveGuidance": "Khẩu hình bắt đầu như âm /iː/, không tạo ma sát răng hay lưỡi. Lướt mượt mà sang nguyên âm sau.",
    "tactileTrick": "Âm thanh lướt êm dịu, không được có tiếng cọ xát răng hay rè ở cổ.",
    "lipShape": {
      "coronalType": "spread",
      "label": "Khóe môi kéo dẹt lướt nhanh",
      "mouthOpening": 22,
      "lipRoundness": 10
    },
    "audioTone": {
      "freq": 240,
      "f1": 280,
      "f2": 2200
    }
  },
  "j": {
    "phoneme": "/j/",
    "name": "Palatal Approximant",
    "vietnameseName": "Âm tiếp cận vòm cứng (bán nguyên âm y)",
    "category": "consonant",
    "categoryVi": "Phụ Âm",
    "subCategory": "Approximant",
    "sampleWord": "yes",
    "sampleIpa": "/jes/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 82,
      "jawDrop": 18,
      "airPressure": 60
    },
    "tonguePath": "M 330 400 C 340 330, 380 230, 440 205 C 475 195, 505 230, 520 260 C 525 270, 505 295, 470 310 C 430 340, 395 375, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 350, 370 295, 415 280 C 455 270, 485 290, 500 310 C 455 345, 405 375, 390 420 Z",
    "constrictionPoint": {
      "x": 440,
      "y": 205,
      "gapLabel": "Thân Lưỡi Sát Vòm Cứng: 2.5mm"
    },
    "frictionIndex": 55,
    "contactTarget": "Thân Trước Lưỡi Nâng Sát Vòm Cứng Lướt Nhanh",
    "l1Mistake": "Đọc thành âm \"d/gi\" tiếng Việt có ma sát rè (đọc \"yes\" thành \"dét\").",
    "correctiveGuidance": "Khẩu hình bắt đầu như âm /iː/, không tạo ma sát răng hay lưỡi. Lướt mượt mà sang nguyên âm sau.",
    "tactileTrick": "Âm thanh lướt êm dịu, không được có tiếng cọ xát răng hay rè ở cổ.",
    "lipShape": {
      "coronalType": "spread",
      "label": "Khóe môi kéo dẹt lướt nhanh",
      "mouthOpening": 22,
      "lipRoundness": 10
    },
    "audioTone": {
      "freq": 240,
      "f1": 280,
      "f2": 2200
    }
  }
};

export const ALL_44_PHONEMES_LIST = [
  {
    "phoneme": "/iː/",
    "name": "Close Front Unrounded Vowel",
    "vietnameseName": "Nguyên âm i dài",
    "category": "monophthong",
    "categoryVi": "Nguyên Âm Đơn",
    "subCategory": "Front Vowel",
    "sampleWord": "sheep",
    "sampleIpa": "/ʃiːp/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 82,
      "jawDrop": 15,
      "airPressure": 55
    },
    "tonguePath": "M 330 400 C 340 330, 380 230, 440 205 C 475 195, 505 230, 520 260 C 525 270, 505 295, 470 310 C 430 340, 395 375, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 340, 380 260, 430 240 C 465 235, 495 260, 505 285 C 475 320, 420 360, 390 420 Z",
    "constrictionPoint": {
      "x": 445,
      "y": 205,
      "gapLabel": "Vòm Cứng Trước: 2.0mm"
    },
    "frictionIndex": 15,
    "contactTarget": "Thân Lưỡi Nâng Rất Cao Sát Vòm Cứng Trước",
    "l1Mistake": "Đọc ngắn cụt như âm \"i\" tiếng Việt, môi không kéo căng sang hai bên.",
    "correctiveGuidance": "Kéo khóe miệng sang hai bên như đang cười tươi. Đẩy thân trước của lưỡi lên rất cao sát vòm cứng, duy trì âm dài ngân vang.",
    "tactileTrick": "Đặt 2 ngón tay lên hai bên khóe môi và cảm nhận cơ mép môi căng cứng khi kéo dài \"eeeee\".",
    "lipShape": {
      "coronalType": "spread",
      "label": "Cười mở rộng sang 2 bên",
      "mouthOpening": 20,
      "lipRoundness": 10
    },
    "audioTone": {
      "freq": 440,
      "f1": 280,
      "f2": 2250
    }
  },
  {
    "phoneme": "/ɪ/",
    "name": "Near-Close Near-Front Vowel",
    "vietnameseName": "Nguyên âm i ngắn",
    "category": "monophthong",
    "categoryVi": "Nguyên Âm Đơn",
    "subCategory": "Front Vowel",
    "sampleWord": "ship",
    "sampleIpa": "/ʃɪp/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 68,
      "jawDrop": 28,
      "airPressure": 50
    },
    "tonguePath": "M 330 400 C 340 340, 375 250, 435 225 C 470 215, 495 245, 510 270 C 515 280, 495 305, 465 320 C 425 350, 395 380, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 330, 380 230, 440 205 C 475 195, 505 230, 520 260 C 525 270, 505 295, 470 310 C 430 340, 395 375, 390 420 Z",
    "constrictionPoint": {
      "x": 435,
      "y": 225,
      "gapLabel": "Khoảng Cách Vòm: 4.0mm"
    },
    "frictionIndex": 18,
    "contactTarget": "Lưỡi Thấp Hơn /iː/ Một Chút, Thả Lỏng Môi",
    "l1Mistake": "Dễ nhầm lẫn với /iː/ dài (đọc \"ship\" thành \"sheep\" gây hiểu nhầm nghĩa).",
    "correctiveGuidance": "Hạ hàm mở nhẹ hơn /iː/, thả lỏng cơ môi và lưỡi. Phát âm dứt khoát, âm sắc nằm giữa \"i\" và \"ê\".",
    "tactileTrick": "Cảm giác quai hàm hơi rơi xuống khoảng nửa đốt ngón tay khi phát ra âm \"ɪ\" giật nhanh.",
    "lipShape": {
      "coronalType": "neutral",
      "label": "Hơi mở nhẹ, thả lỏng",
      "mouthOpening": 30,
      "lipRoundness": 15
    },
    "audioTone": {
      "freq": 390,
      "f1": 400,
      "f2": 1950
    }
  },
  {
    "phoneme": "/e/",
    "name": "Open-Mid Front Unrounded Vowel",
    "vietnameseName": "Nguyên âm e ngắn",
    "category": "monophthong",
    "categoryVi": "Nguyên Âm Đơn",
    "subCategory": "Front Vowel",
    "sampleWord": "bed",
    "sampleIpa": "/bed/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 55,
      "jawDrop": 40,
      "airPressure": 50
    },
    "tonguePath": "M 330 400 C 340 345, 370 270, 420 250 C 455 240, 485 265, 495 285 C 500 295, 480 320, 450 335 C 415 360, 395 385, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 340, 365 285, 410 275 C 445 270, 470 290, 480 310 C 440 345, 405 375, 390 420 Z",
    "constrictionPoint": {
      "x": 420,
      "y": 250,
      "gapLabel": "Độ Mở Miệng: 6.0mm"
    },
    "frictionIndex": 12,
    "contactTarget": "Thân Lưỡi Nằm Ở Tầng Giữa Khoang Miệng",
    "l1Mistake": "Người Việt thường đọc thành âm \"ê\" hẹp hoặc bẹt quá thành \"e\".",
    "correctiveGuidance": "Khẩu hình mở rộng hơn /ɪ/, hai khóe miệng thả lỏng tự nhiên, đầu lưỡi chạm nhẹ chân răng cửa dưới.",
    "tactileTrick": "Đưa ngón tay vào giữa 2 hàm răng, khoảng cách vừa vặn lọt 1 ngón tay trỏ nằm ngang.",
    "lipShape": {
      "coronalType": "neutral",
      "label": "Mở vừa phải, không kéo khóe môi",
      "mouthOpening": 42,
      "lipRoundness": 10
    },
    "audioTone": {
      "freq": 370,
      "f1": 550,
      "f2": 1800
    }
  },
  {
    "phoneme": "/æ/",
    "name": "Near-Open Front Unrounded Vowel",
    "vietnameseName": "Nguyên âm e bẹt / a bẹt",
    "category": "monophthong",
    "categoryVi": "Nguyên Âm Đơn",
    "subCategory": "Front Vowel",
    "sampleWord": "cat",
    "sampleIpa": "/kæt/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 25,
      "jawDrop": 72,
      "airPressure": 60
    },
    "tonguePath": "M 330 400 C 340 360, 365 310, 410 300 C 445 295, 475 315, 485 335 C 490 345, 465 365, 435 375 C 400 390, 390 410, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 345, 370 270, 420 250 C 455 240, 485 265, 495 285 C 500 295, 480 320, 450 335 C 415 360, 395 385, 390 420 Z",
    "constrictionPoint": {
      "x": 410,
      "y": 300,
      "gapLabel": "Hạ Hàm Sâu: 12.0mm"
    },
    "frictionIndex": 20,
    "contactTarget": "Lưỡi Dẹt Phẳng, Hạ Quai Hàm Rất Thấp",
    "l1Mistake": "Miệng mở không đủ rộng, phát âm thành âm \"e\" thông thường (nhầm \"cat\" thành \"ket\").",
    "correctiveGuidance": "Hạ tối đa quai hàm xuống dưới và đồng thời căng khóe môi sang 2 bên. Lưỡi nằm bẹp dưới đáy miệng.",
    "tactileTrick": "Mở hàm rộng đến mức có thể nhét vừa 2 ngón tay trỏ và giữa đặt chồng lên nhau!",
    "lipShape": {
      "coronalType": "open",
      "label": "Mở to hết cỡ + dẹt ngang",
      "mouthOpening": 75,
      "lipRoundness": 5
    },
    "audioTone": {
      "freq": 320,
      "f1": 850,
      "f2": 1600
    }
  },
  {
    "phoneme": "/ʌ/",
    "name": "Open-Mid Back Unrounded Vowel",
    "vietnameseName": "Nguyên âm á ngắn (Strut)",
    "category": "monophthong",
    "categoryVi": "Nguyên Âm Đơn",
    "subCategory": "Central Vowel",
    "sampleWord": "cup",
    "sampleIpa": "/kʌp/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 40,
      "jawDrop": 55,
      "airPressure": 55
    },
    "tonguePath": "M 330 400 C 340 355, 360 300, 400 285 C 435 280, 465 305, 475 325 C 480 335, 455 355, 425 365 C 395 385, 390 410, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 365, 355 330, 390 320 C 425 315, 450 335, 460 355 C 430 380, 395 405, 390 420 Z",
    "constrictionPoint": {
      "x": 400,
      "y": 285,
      "gapLabel": "Vòm Họng Giữa: 8.0mm"
    },
    "frictionIndex": 14,
    "contactTarget": "Thân Lưỡi Hơi Lùi Về Sau, Thả Lỏng Môi",
    "l1Mistake": "Đọc quá giống âm \"ă\" gắt hoặc \"ơ\" tiếng Việt.",
    "correctiveGuidance": "Miệng mở vừa phải, môi thả lỏng hình oval đứng, phát âm ngắn dứt khoát từ sâu trong họng.",
    "tactileTrick": "Âm thanh bật ra như tiếng thở dốc ngắn khi bị đấm nhẹ vào bụng!",
    "lipShape": {
      "coronalType": "neutral",
      "label": "Mở tự nhiên hình oval đứng",
      "mouthOpening": 50,
      "lipRoundness": 10
    },
    "audioTone": {
      "freq": 350,
      "f1": 700,
      "f2": 1250
    }
  },
  {
    "phoneme": "/ɑː/",
    "name": "Open Back Unrounded Vowel",
    "vietnameseName": "Nguyên âm a dài sâu",
    "category": "monophthong",
    "categoryVi": "Nguyên Âm Đơn",
    "subCategory": "Back Vowel",
    "sampleWord": "father",
    "sampleIpa": "/ˈfɑːðər/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 20,
      "jawDrop": 75,
      "airPressure": 50
    },
    "tonguePath": "M 330 400 C 340 365, 350 325, 385 315 C 420 310, 450 335, 460 355 C 465 365, 440 380, 410 390 C 380 405, 390 415, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 360, 365 310, 410 300 C 445 295, 475 315, 485 335 C 490 345, 465 365, 435 375 C 400 390, 390 410, 390 420 Z",
    "constrictionPoint": {
      "x": 385,
      "y": 315,
      "gapLabel": "Cuống Họng Sau: 10.0mm"
    },
    "frictionIndex": 10,
    "contactTarget": "Cuống Lưỡi Hạ Thấp Tối Đa Sát Cổ Họng",
    "l1Mistake": "Phát âm nông ở đầu miệng như chữ \"A\" tiếng Việt.",
    "correctiveGuidance": "Mở rộng họng giống như khi bác sĩ yêu cầu bạn há miệng nói \"Aaa\". Lưỡi kéo sâu về sau, ngân dài trầm.",
    "tactileTrick": "Nhìn vào gương thấy rõ lưỡi gà và khoảng sâu hun hút trong cuống họng.",
    "lipShape": {
      "coronalType": "open",
      "label": "Há to tròn sâu",
      "mouthOpening": 80,
      "lipRoundness": 15
    },
    "audioTone": {
      "freq": 310,
      "f1": 800,
      "f2": 1100
    }
  },
  {
    "phoneme": "/ɒ/",
    "name": "Open Back Rounded Vowel",
    "vietnameseName": "Nguyên âm o ngắn",
    "category": "monophthong",
    "categoryVi": "Nguyên Âm Đơn",
    "subCategory": "Back Vowel",
    "sampleWord": "pot",
    "sampleIpa": "/pɒt/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 30,
      "jawDrop": 65,
      "airPressure": 55
    },
    "tonguePath": "M 330 400 C 340 360, 355 315, 395 305 C 430 300, 460 325, 470 345 C 475 355, 450 375, 420 385 C 385 405, 390 415, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 350, 360 270, 400 260 C 435 255, 465 280, 475 305 C 440 340, 405 375, 390 420 Z",
    "constrictionPoint": {
      "x": 395,
      "y": 305,
      "gapLabel": "Khoang Miệng Sau: 8.5mm"
    },
    "frictionIndex": 16,
    "contactTarget": "Môi Hơi Tròn, Cuống Lưỡi Hơi Nâng Sau",
    "l1Mistake": "Chu môi quá nhiều biến thành \"ô\" hoặc không chu môi thành \"a\".",
    "correctiveGuidance": "Hạ hàm mở rộng, môi hơi khum tròn nhẹ, phát ra âm dứt khoát ngắn.",
    "tactileTrick": "Tạo hình môi giống hình quả trứng gà dựng đứng.",
    "lipShape": {
      "coronalType": "round",
      "label": "Khum tròn nhẹ hình bầu dục",
      "mouthOpening": 65,
      "lipRoundness": 45
    },
    "audioTone": {
      "freq": 330,
      "f1": 750,
      "f2": 1000
    }
  },
  {
    "phoneme": "/ɔː/",
    "name": "Open-Mid Back Rounded Vowel",
    "vietnameseName": "Nguyên âm o dài",
    "category": "monophthong",
    "categoryVi": "Nguyên Âm Đơn",
    "subCategory": "Back Vowel",
    "sampleWord": "door",
    "sampleIpa": "/dɔːr/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 45,
      "jawDrop": 50,
      "airPressure": 55
    },
    "tonguePath": "M 330 400 C 340 350, 360 275, 405 265 C 440 260, 470 285, 480 310 C 485 320, 460 345, 430 360 C 395 385, 390 410, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 360, 355 315, 395 305 C 430 300, 460 325, 470 345 C 475 355, 450 375, 420 385 C 385 405, 390 415, 390 420 Z",
    "constrictionPoint": {
      "x": 405,
      "y": 265,
      "gapLabel": "Vòm Miệng Sau: 6.0mm"
    },
    "frictionIndex": 18,
    "contactTarget": "Môi Chu Tròn Rõ Rệt, Cuống Lưỡi Nâng Trung Bình",
    "l1Mistake": "Đọc cụt và nông thành chữ \"o\" tiếng Việt.",
    "correctiveGuidance": "Chu môi tròn hẳn ra phía trước thành hình ống nhỏ, nâng cuống lưỡi lên và kéo dài âm.",
    "tactileTrick": "Đặt ống hút vào miệng và phát âm \"awww\" sao cho môi ôm khít quanh ống hút.",
    "lipShape": {
      "coronalType": "round",
      "label": "Chu tròn hình chữ O",
      "mouthOpening": 50,
      "lipRoundness": 75
    },
    "audioTone": {
      "freq": 360,
      "f1": 600,
      "f2": 950
    }
  },
  {
    "phoneme": "/ʊ/",
    "name": "Near-Close Near-Back Vowel",
    "vietnameseName": "Nguyên âm u ngắn",
    "category": "monophthong",
    "categoryVi": "Nguyên Âm Đơn",
    "subCategory": "Back Vowel",
    "sampleWord": "foot",
    "sampleIpa": "/fʊt/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 70,
      "jawDrop": 25,
      "airPressure": 50
    },
    "tonguePath": "M 330 400 C 340 335, 365 245, 415 230 C 450 220, 480 250, 490 275 C 495 285, 470 310, 440 325 C 400 355, 390 400, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 325, 370 220, 420 200 C 455 190, 485 220, 495 250 C 500 260, 475 290, 445 310 C 405 345, 390 395, 390 420 Z",
    "constrictionPoint": {
      "x": 415,
      "y": 230,
      "gapLabel": "Vòm Họng Sau: 4.5mm"
    },
    "frictionIndex": 16,
    "contactTarget": "Cuống Lưỡi Nâng Cao, Môi Khum Hơi Chu",
    "l1Mistake": "Dễ nhầm lẫn với /uː/ dài (chu môi quá chặt) hoặc phát âm thành \"u\" tiếng Việt.",
    "correctiveGuidance": "Môi khum tròn nhẹ nhưng không chu nhọn. Phát âm ngắn và giật, âm vang đục nằm giữa \"u\" và \"ư\".",
    "tactileTrick": "Hai bên má hơi thả lỏng, không gồng cơ mép môi.",
    "lipShape": {
      "coronalType": "round",
      "label": "Khum tròn nhẹ, thả lỏng",
      "mouthOpening": 25,
      "lipRoundness": 60
    },
    "audioTone": {
      "freq": 380,
      "f1": 450,
      "f2": 1050
    }
  },
  {
    "phoneme": "/uː/",
    "name": "Close Back Rounded Vowel",
    "vietnameseName": "Nguyên âm u dài",
    "category": "monophthong",
    "categoryVi": "Nguyên Âm Đơn",
    "subCategory": "Back Vowel",
    "sampleWord": "boot",
    "sampleIpa": "/buːt/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 85,
      "jawDrop": 12,
      "airPressure": 55
    },
    "tonguePath": "M 330 400 C 340 325, 370 215, 425 195 C 460 185, 490 215, 500 245 C 505 255, 480 285, 450 305 C 410 340, 390 395, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 335, 365 245, 415 230 C 450 220, 480 250, 490 275 C 495 285, 470 310, 440 325 C 400 355, 390 400, 390 420 Z",
    "constrictionPoint": {
      "x": 425,
      "y": 195,
      "gapLabel": "Cuống Họng Trên: 2.0mm"
    },
    "frictionIndex": 12,
    "contactTarget": "Cuống Lưỡi Nâng Rất Cao Sát Vòm Mềm + Chu Môi Chặt",
    "l1Mistake": "Đọc âm ngắn cụt không đủ độ chu tròn của môi.",
    "correctiveGuidance": "Môi chu nhọn tròn hẳn ra trước như đang huýt sáo. Cuống lưỡi kéo cao sát vòm miệng mềm, ngân dài.",
    "tactileTrick": "Khoảng hở giữa hai môi chỉ nhỏ bằng đầu que tăm bông!",
    "lipShape": {
      "coronalType": "round",
      "label": "Chu nhọn tròn xoe như huýt sáo",
      "mouthOpening": 15,
      "lipRoundness": 95
    },
    "audioTone": {
      "freq": 410,
      "f1": 300,
      "f2": 900
    }
  },
  {
    "phoneme": "/ɜː/",
    "name": "Open-Mid Central Unrounded Vowel",
    "vietnameseName": "Nguyên âm ơ dài (Nurse / Bird)",
    "category": "monophthong",
    "categoryVi": "Nguyên Âm Đơn",
    "subCategory": "Central Vowel",
    "sampleWord": "bird",
    "sampleIpa": "/bɜːrd/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 60,
      "jawDrop": 35,
      "airPressure": 55
    },
    "tonguePath": "M 330 400 C 340 345, 370 260, 415 245 C 450 240, 480 265, 490 290 C 495 300, 470 325, 440 340 C 405 365, 390 405, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 350, 365 285, 410 275 C 445 270, 475 295, 485 315 C 450 345, 405 375, 390 420 Z",
    "constrictionPoint": {
      "x": 415,
      "y": 245,
      "gapLabel": "Vòm Họng Trung Tâm: 5.0mm"
    },
    "frictionIndex": 15,
    "contactTarget": "Thân Lưỡi Cong Nhẹ Ở Giữa Khoang Miệng",
    "l1Mistake": "Đọc thành \"ơ\" ngắn tiếng Việt hoặc \"ưa\", mất độ cong sâu.",
    "correctiveGuidance": "Nâng thân lưỡi ở trung tâm, đầu lưỡi hơi co nhẹ lại, giữ khẩu hình bất động và ngân dài âm.",
    "tactileTrick": "Đặt đầu lưỡi ở vị trí lưng chừng lơ lửng, không chạm vào bất cứ đâu.",
    "lipShape": {
      "coronalType": "neutral",
      "label": "Thả lỏng trung tính",
      "mouthOpening": 35,
      "lipRoundness": 20
    },
    "audioTone": {
      "freq": 360,
      "f1": 500,
      "f2": 1400
    }
  },
  {
    "phoneme": "/ə/",
    "name": "Mid Central Vowel (Schwa)",
    "vietnameseName": "Nguyên âm ơ nhẹ (Schwa)",
    "category": "monophthong",
    "categoryVi": "Nguyên Âm Đơn",
    "subCategory": "Central Vowel",
    "sampleWord": "about",
    "sampleIpa": "/əˈbaʊt/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 50,
      "jawDrop": 35,
      "airPressure": 45
    },
    "tonguePath": "M 330 400 C 340 350, 370 275, 415 260 C 450 255, 480 280, 490 300 C 495 310, 470 330, 440 345 C 405 370, 390 410, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 345, 370 260, 415 245 C 450 240, 480 265, 490 290 C 495 300, 470 325, 440 340 C 405 365, 390 405, 390 420 Z",
    "constrictionPoint": {
      "x": 415,
      "y": 260,
      "gapLabel": "Vị Trí Nghỉ: 6.0mm"
    },
    "frictionIndex": 10,
    "contactTarget": "Toàn Bộ Khẩu Hình Ở Trạng Thái Nghỉ Thả Lỏng Hoàn Toàn",
    "l1Mistake": "Nhấn quá mạnh thành âm \"ơ\" to rõ như tiếng Việt.",
    "correctiveGuidance": "Đây là âm lướt nhẹ nhất trong tiếng Anh. Tuyệt đối không nhấn trọng âm, phát ra cực kỳ ngắn nhẹ.",
    "tactileTrick": "Cảm giác như bạn chỉ thở khẽ ra một tiếng \"ờ\" lười biếng mà không cần cử động cơ mặt.",
    "lipShape": {
      "coronalType": "neutral",
      "label": "Thả lỏng hoàn toàn (lazy mouth)",
      "mouthOpening": 35,
      "lipRoundness": 10
    },
    "audioTone": {
      "freq": 350,
      "f1": 500,
      "f2": 1500
    }
  },
  {
    "phoneme": "/eɪ/",
    "name": "Face Diphthong",
    "vietnameseName": "Nguyên âm đôi e-i",
    "category": "diphthong",
    "categoryVi": "Nguyên Âm Đôi",
    "subCategory": "Diphthong",
    "sampleWord": "face",
    "sampleIpa": "/feɪs/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 68,
      "jawDrop": 30,
      "airPressure": 55
    },
    "tonguePath": "M 330 400 C 340 340, 375 250, 430 225 C 465 215, 495 245, 510 270 C 515 280, 490 305, 460 320 C 420 350, 395 380, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 345, 370 270, 420 250 C 455 240, 485 265, 495 285 C 500 295, 480 320, 450 335 C 415 360, 395 385, 390 420 Z",
    "constrictionPoint": {
      "x": 430,
      "y": 225,
      "gapLabel": "Trượt Từ /e/ Lên /ɪ/"
    },
    "frictionIndex": 25,
    "contactTarget": "Lưỡi Trượt Nâng Từ Vị Trí /e/ Lên Dần /ɪ/",
    "l1Mistake": "Đọc phẳng lì như âm \"ây\" tiếng Việt (đọc \"face\" thành \"phây\").",
    "correctiveGuidance": "Bắt đầu từ âm /e/ mở vừa, sau đó nâng hàm và thân lưỡi trượt mượt mà về phía âm /ɪ/.",
    "tactileTrick": "Cảm nhận quai hàm hơi khép lại từ từ trong khi phát âm.",
    "lipShape": {
      "coronalType": "spread",
      "label": "Mở vừa trượt dần sang cười dẹt",
      "mouthOpening": 35,
      "lipRoundness": 15
    },
    "audioTone": {
      "freq": 400,
      "f1": 500,
      "f2": 2000
    }
  },
  {
    "phoneme": "/aɪ/",
    "name": "Price Diphthong",
    "vietnameseName": "Nguyên âm đôi a-i",
    "category": "diphthong",
    "categoryVi": "Nguyên Âm Đôi",
    "subCategory": "Diphthong",
    "sampleWord": "time",
    "sampleIpa": "/taɪm/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 50,
      "jawDrop": 55,
      "airPressure": 55
    },
    "tonguePath": "M 330 400 C 340 350, 370 280, 425 245 C 460 235, 490 260, 500 285 C 505 295, 480 320, 450 335 C 415 365, 390 405, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 365, 350 325, 385 315 C 420 310, 450 335, 460 355 C 465 365, 440 380, 410 390 C 380 405, 390 415, 390 420 Z",
    "constrictionPoint": {
      "x": 425,
      "y": 245,
      "gapLabel": "Trượt Từ /a/ Lên /ɪ/"
    },
    "frictionIndex": 25,
    "contactTarget": "Hạ Hàm Há To Rồi Khép Dần Về /ɪ/",
    "l1Mistake": "Đọc như âm \"ai\" tiếng Việt mà không kéo dài trượt khẩu hình.",
    "correctiveGuidance": "Bắt đầu với miệng há to /a/, sau đó nâng hàm và kéo mép môi về hướng /ɪ/.",
    "tactileTrick": "Chuyển động hàm từ mở rộng 2 ngón tay thu hẹp lại còn 1 ngón tay.",
    "lipShape": {
      "coronalType": "open",
      "label": "Mở to rồi thu dẹt sang 2 bên",
      "mouthOpening": 65,
      "lipRoundness": 10
    },
    "audioTone": {
      "freq": 380,
      "f1": 750,
      "f2": 1800
    }
  },
  {
    "phoneme": "/ɔɪ/",
    "name": "Choice Diphthong",
    "vietnameseName": "Nguyên âm đôi o-i",
    "category": "diphthong",
    "categoryVi": "Nguyên Âm Đôi",
    "subCategory": "Diphthong",
    "sampleWord": "boy",
    "sampleIpa": "/bɔɪ/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 55,
      "jawDrop": 45,
      "airPressure": 55
    },
    "tonguePath": "M 330 400 C 340 345, 370 265, 420 240 C 455 230, 485 255, 500 280 C 505 290, 480 315, 450 335 C 410 365, 390 405, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 350, 360 275, 405 265 C 440 260, 470 285, 480 310 C 485 320, 460 345, 430 360 C 395 385, 390 410, 390 420 Z",
    "constrictionPoint": {
      "x": 420,
      "y": 240,
      "gapLabel": "Trượt Từ /ɔ/ Sang /ɪ/"
    },
    "frictionIndex": 22,
    "contactTarget": "Môi Tròn Ở /ɔ/ Rồi Dẹt Dần Sang /ɪ/",
    "l1Mistake": "Đọc phẳng như âm \"oi\" tiếng Việt.",
    "correctiveGuidance": "Môi chu tròn ở âm /ɔ/, sau đó kéo rộng sang hai bên kết thúc ở /ɪ/.",
    "tactileTrick": "Môi chuyển động rõ rệt từ hình tròn chữ O sang khuôn miệng cười!",
    "lipShape": {
      "coronalType": "round",
      "label": "Tròn môi trượt sang cười dẹt",
      "mouthOpening": 45,
      "lipRoundness": 65
    },
    "audioTone": {
      "freq": 390,
      "f1": 580,
      "f2": 1700
    }
  },
  {
    "phoneme": "/aʊ/",
    "name": "Mouth Diphthong",
    "vietnameseName": "Nguyên âm đôi a-u",
    "category": "diphthong",
    "categoryVi": "Nguyên Âm Đôi",
    "subCategory": "Diphthong",
    "sampleWord": "now",
    "sampleIpa": "/naʊ/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 45,
      "jawDrop": 60,
      "airPressure": 55
    },
    "tonguePath": "M 330 400 C 340 355, 360 280, 410 260 C 445 250, 475 275, 485 300 C 490 310, 465 335, 435 355 C 395 385, 390 410, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 365, 350 325, 385 315 C 420 310, 450 335, 460 355 C 465 365, 440 380, 410 390 C 380 405, 390 415, 390 420 Z",
    "constrictionPoint": {
      "x": 410,
      "y": 260,
      "gapLabel": "Trượt Từ /a/ Lên /ʊ/"
    },
    "frictionIndex": 22,
    "contactTarget": "Há To /a/ Rồi Chu Môi Hướng Về /ʊ/",
    "l1Mistake": "Đọc nhanh thành âm \"ao\" tiếng Việt.",
    "correctiveGuidance": "Khởi đầu với khẩu hình há to như /a/, sau đó khép hàm và chu môi tròn về phía /ʊ/.",
    "tactileTrick": "Quan sát miệng thu nhỏ từ mở rộng sang một vòng tròn nhỏ.",
    "lipShape": {
      "coronalType": "open",
      "label": "Há to trượt sang chu tròn",
      "mouthOpening": 65,
      "lipRoundness": 50
    },
    "audioTone": {
      "freq": 360,
      "f1": 750,
      "f2": 1100
    }
  },
  {
    "phoneme": "/əʊ/",
    "name": "Goat Diphthong",
    "vietnameseName": "Nguyên âm đôi ơ-u / o-u",
    "category": "diphthong",
    "categoryVi": "Nguyên Âm Đôi",
    "subCategory": "Diphthong",
    "sampleWord": "go",
    "sampleIpa": "/ɡəʊ/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 60,
      "jawDrop": 35,
      "airPressure": 50
    },
    "tonguePath": "M 330 400 C 340 345, 365 255, 415 240 C 450 230, 480 255, 490 280 C 495 290, 470 315, 440 335 C 400 365, 390 405, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 350, 360 275, 405 265 C 440 260, 470 285, 480 310 C 485 320, 460 345, 430 360 C 395 385, 390 410, 390 420 Z",
    "constrictionPoint": {
      "x": 415,
      "y": 240,
      "gapLabel": "Trượt Từ /ə/ Sang /ʊ/"
    },
    "frictionIndex": 20,
    "contactTarget": "Thả Lỏng Ở /ə/ Rồi Chu Môi Nhẹ Sang /ʊ/",
    "l1Mistake": "Người Việt hay đọc thành chữ \"ô\" cụt cứng (đọc \"go\" thành \"gô\").",
    "correctiveGuidance": "Bắt đầu từ âm schwa thả lỏng /ə/, sau đó từ từ khum môi tròn hướng về /ʊ/.",
    "tactileTrick": "Không được cố định hình môi chữ Ô; môi phải có sự chuyển động thu nhỏ dần.",
    "lipShape": {
      "coronalType": "round",
      "label": "Thả lỏng rồi chu tròn lại",
      "mouthOpening": 35,
      "lipRoundness": 65
    },
    "audioTone": {
      "freq": 370,
      "f1": 500,
      "f2": 1200
    }
  },
  {
    "phoneme": "/ɪə/",
    "name": "Near Diphthong",
    "vietnameseName": "Nguyên âm đôi i-ơ",
    "category": "diphthong",
    "categoryVi": "Nguyên Âm Đôi",
    "subCategory": "Diphthong",
    "sampleWord": "near",
    "sampleIpa": "/nɪər/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 65,
      "jawDrop": 30,
      "airPressure": 50
    },
    "tonguePath": "M 330 400 C 340 345, 370 260, 420 240 C 455 230, 485 255, 495 280 C 500 290, 475 315, 445 335 C 405 365, 390 405, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 340, 375 250, 435 225 C 470 215, 495 245, 510 270 C 515 280, 495 305, 465 320 C 425 350, 395 380, 390 420 Z",
    "constrictionPoint": {
      "x": 420,
      "y": 240,
      "gapLabel": "Trượt Từ /ɪ/ Về /ə/"
    },
    "frictionIndex": 18,
    "contactTarget": "Lưỡi Từ /ɪ/ Thả Rơi Nhẹ Về /ə/",
    "l1Mistake": "Đọc thành âm \"ia\" tiếng Việt.",
    "correctiveGuidance": "Bắt đầu bằng /ɪ/ dứt khoát, sau đó thả lỏng hàm và toàn bộ cơ mặt trôi về schwa /ə/.",
    "tactileTrick": "Cảm giác như trượt dốc từ một âm có độ căng nhẹ xuống trạng thái hoàn toàn thư giãn.",
    "lipShape": {
      "coronalType": "neutral",
      "label": "Cười nhẹ rồi thả lỏng hoàn toàn",
      "mouthOpening": 32,
      "lipRoundness": 10
    },
    "audioTone": {
      "freq": 390,
      "f1": 420,
      "f2": 1700
    }
  },
  {
    "phoneme": "/eə/",
    "name": "Square Diphthong",
    "vietnameseName": "Nguyên âm đôi e-ơ",
    "category": "diphthong",
    "categoryVi": "Nguyên Âm Đôi",
    "subCategory": "Diphthong",
    "sampleWord": "hair",
    "sampleIpa": "/heər/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 55,
      "jawDrop": 40,
      "airPressure": 50
    },
    "tonguePath": "M 330 400 C 340 350, 370 270, 415 255 C 450 250, 480 275, 490 295 C 495 305, 470 325, 440 345 C 405 370, 390 410, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 345, 370 270, 420 250 C 455 240, 485 265, 495 285 C 500 295, 480 320, 450 335 C 415 360, 395 385, 390 420 Z",
    "constrictionPoint": {
      "x": 415,
      "y": 255,
      "gapLabel": "Trượt Từ /e/ Về /ə/"
    },
    "frictionIndex": 18,
    "contactTarget": "Mở Miệng Ở /e/ Rồi Trôi Về /ə/",
    "l1Mistake": "Đọc như âm \"e\" đơn lập mà không lướt âm đuôi.",
    "correctiveGuidance": "Phát âm /e/ mở rộng miệng, sau đó từ từ thả lỏng miệng về âm schwa /ə/.",
    "tactileTrick": "Miệng mở rộng vừa phải rồi hơi khép nhẹ lại ở đuôi âm.",
    "lipShape": {
      "coronalType": "neutral",
      "label": "Mở vừa trôi về thả lỏng",
      "mouthOpening": 40,
      "lipRoundness": 10
    },
    "audioTone": {
      "freq": 370,
      "f1": 550,
      "f2": 1650
    }
  },
  {
    "phoneme": "/ʊə/",
    "name": "Cure Diphthong",
    "vietnameseName": "Nguyên âm đôi u-ơ",
    "category": "diphthong",
    "categoryVi": "Nguyên Âm Đôi",
    "subCategory": "Diphthong",
    "sampleWord": "tour",
    "sampleIpa": "/tʊər/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 65,
      "jawDrop": 30,
      "airPressure": 50
    },
    "tonguePath": "M 330 400 C 340 340, 365 255, 415 240 C 450 230, 480 255, 490 280 C 495 290, 470 315, 440 335 C 400 365, 390 405, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 335, 365 245, 415 230 C 450 220, 480 250, 490 275 C 495 285, 470 310, 440 325 C 400 355, 390 400, 390 420 Z",
    "constrictionPoint": {
      "x": 415,
      "y": 240,
      "gapLabel": "Trượt Từ /ʊ/ Về /ə/"
    },
    "frictionIndex": 18,
    "contactTarget": "Chu Môi Ở /ʊ/ Rồi Mở Thả Lỏng Về /ə/",
    "l1Mistake": "Đọc thành âm \"ua\" tiếng Việt.",
    "correctiveGuidance": "Bắt đầu từ âm /ʊ/ khum môi tròn, sau đó mở rộng khóe môi thả lỏng về schwa /ə/.",
    "tactileTrick": "Môi mở ra từ trạng thái chu tròn sang trạng thái tự nhiên.",
    "lipShape": {
      "coronalType": "round",
      "label": "Khum môi mở sang tự nhiên",
      "mouthOpening": 30,
      "lipRoundness": 50
    },
    "audioTone": {
      "freq": 380,
      "f1": 450,
      "f2": 1250
    }
  },
  {
    "phoneme": "/p/",
    "name": "Voiceless Bilabial Plosive",
    "vietnameseName": "Âm bật hai môi vô thanh",
    "category": "consonant",
    "categoryVi": "Phụ Âm",
    "subCategory": "Plosive",
    "sampleWord": "pen",
    "sampleIpa": "/pen/",
    "isVoiced": false,
    "defaultSliders": {
      "tongueElevation": 35,
      "jawDrop": 15,
      "airPressure": 90
    },
    "tonguePath": "M 330 400 C 340 360, 370 310, 420 290 C 460 280, 490 300, 505 320 C 510 330, 480 350, 450 365 C 410 385, 390 410, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 355, 365 300, 410 280 C 450 270, 480 290, 495 310 C 450 340, 405 375, 390 420 Z",
    "constrictionPoint": {
      "x": 585,
      "y": 278,
      "gapLabel": "Hai Môi Khép Kín: 0.0mm"
    },
    "frictionIndex": 95,
    "contactTarget": "Mím Chặt Hai Môi Chặn Khí Rồi Bật Mạnh",
    "l1Mistake": "Người Việt đọc thành âm /b/ hoặc không bật luồng hơi gió nén (unreleased).",
    "correctiveGuidance": "Mím chặt hai môi lại để tích tụ áp suất khí sau môi, sau đó mở bung môi thật nhanh tạo tiếng nổ \"p\" giòn giã.",
    "tactileTrick": "Đặt một tờ giấy mỏng trước miệng; khi phát âm /p/, tờ giấy phải bay mạnh về phía trước!",
    "lipShape": {
      "coronalType": "bilabial",
      "label": "Mím chặt hai môi",
      "mouthOpening": 5,
      "lipRoundness": 20
    },
    "audioTone": {
      "freq": 200,
      "f1": 0,
      "f2": 0
    }
  },
  {
    "phoneme": "/b/",
    "name": "Voiced Bilabial Plosive",
    "vietnameseName": "Âm bật hai môi hữu thanh",
    "category": "consonant",
    "categoryVi": "Phụ Âm",
    "subCategory": "Plosive",
    "sampleWord": "bad",
    "sampleIpa": "/bæd/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 35,
      "jawDrop": 18,
      "airPressure": 75
    },
    "tonguePath": "M 330 400 C 340 360, 370 310, 420 290 C 460 280, 490 300, 505 320 C 510 330, 480 350, 450 365 C 410 385, 390 410, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 360, 370 310, 420 290 C 460 280, 490 300, 505 320 C 510 330, 480 350, 450 365 C 410 385, 390 410, 390 420 Z",
    "constrictionPoint": {
      "x": 585,
      "y": 278,
      "gapLabel": "Hai Môi Khép + Rung Cổ"
    },
    "frictionIndex": 85,
    "contactTarget": "Mím Hai Môi + Kích Hoạt Rung Thanh Quản",
    "l1Mistake": "Nuốt âm /b/ ở cuối từ (vd \"cab\" đọc thành \"cap\").",
    "correctiveGuidance": "Mím hai môi chặn khí giống /p/, nhưng rung dây thanh quản ngay từ khoảnh khắc trước khi mở môi.",
    "tactileTrick": "Đặt ngón tay lên cổ họng, cảm nhận độ rung rè xuất hiện trước khi môi bung ra.",
    "lipShape": {
      "coronalType": "bilabial",
      "label": "Mím môi có rung thanh",
      "mouthOpening": 8,
      "lipRoundness": 20
    },
    "audioTone": {
      "freq": 150,
      "f1": 0,
      "f2": 0
    }
  },
  {
    "phoneme": "/t/",
    "name": "Voiceless Alveolar Plosive",
    "vietnameseName": "Âm bật đầu lưỡi vô thanh",
    "category": "consonant",
    "categoryVi": "Phụ Âm",
    "subCategory": "Plosive",
    "sampleWord": "tea",
    "sampleIpa": "/tiː/",
    "isVoiced": false,
    "defaultSliders": {
      "tongueElevation": 75,
      "jawDrop": 22,
      "airPressure": 90
    },
    "tonguePath": "M 330 400 C 340 340, 370 280, 420 250 C 460 225, 500 235, 526 268 C 522 280, 490 300, 460 320 C 420 355, 390 405, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 350, 370 300, 410 285 C 450 275, 480 295, 495 315 C 450 345, 405 375, 390 420 Z",
    "constrictionPoint": {
      "x": 526,
      "y": 268,
      "gapLabel": "Đầu Lưỡi Chạm Chân Răng Trên"
    },
    "frictionIndex": 95,
    "contactTarget": "Đầu Lưỡi Áp Chặt Nướu Răng Trên Bật Hơi Dứt Khoát",
    "l1Mistake": "Nuốt âm đuôi /-t/ (vd \"cat\" đọc thành \"ca\") hoặc phát âm như âm \"thờ\" tiếng Việt.",
    "correctiveGuidance": "Đặt đầu lưỡi ép chặt vào nướu răng cửa trên chặn kín luồng khí, sau đó giật đầu lưỡi xuống giải phóng luồng hơi đanh dứt khoát.",
    "tactileTrick": "Không được để đầu lưỡi thò ra răng; phải nén khí chặt phía sau nướu răng trên.",
    "lipShape": {
      "coronalType": "neutral",
      "label": "Răng khép gần sát, đầu lưỡi sau nướu",
      "mouthOpening": 22,
      "lipRoundness": 10
    },
    "audioTone": {
      "freq": 250,
      "f1": 0,
      "f2": 0
    }
  },
  {
    "phoneme": "/d/",
    "name": "Voiced Alveolar Plosive",
    "vietnameseName": "Âm bật đầu lưỡi hữu thanh",
    "category": "consonant",
    "categoryVi": "Phụ Âm",
    "subCategory": "Plosive",
    "sampleWord": "did",
    "sampleIpa": "/dɪd/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 74,
      "jawDrop": 22,
      "airPressure": 75
    },
    "tonguePath": "M 330 400 C 340 340, 370 280, 420 250 C 460 225, 500 235, 526 268 C 522 280, 490 300, 460 320 C 420 355, 390 405, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 350, 370 300, 410 285 C 450 275, 480 295, 495 315 C 450 345, 405 375, 390 420 Z",
    "constrictionPoint": {
      "x": 526,
      "y": 268,
      "gapLabel": "Nướu Răng Trên + Rung Dây Thanh"
    },
    "frictionIndex": 82,
    "contactTarget": "Đầu Lưỡi Nướu Răng Trên + Rung Thanh Quản",
    "l1Mistake": "Đọc âm đuôi /-d/ thành /-t/ hoặc nuốt âm hoàn toàn.",
    "correctiveGuidance": "Khẩu hình giống /t/ nhưng dây thanh quản rung mạnh khi bật âm giải phóng.",
    "tactileTrick": "Đặt tay lên cổ họng, cảm nhận độ rung rõ rệt ngay khoảnh khắc đầu lưỡi chạm nướu.",
    "lipShape": {
      "coronalType": "neutral",
      "label": "Răng mở nhẹ, lưỡi chạm nướu",
      "mouthOpening": 22,
      "lipRoundness": 10
    },
    "audioTone": {
      "freq": 180,
      "f1": 0,
      "f2": 0
    }
  },
  {
    "phoneme": "/k/",
    "name": "Voiceless Velar Plosive",
    "vietnameseName": "Âm bật cuống lưỡi vô thanh",
    "category": "consonant",
    "categoryVi": "Phụ Âm",
    "subCategory": "Plosive",
    "sampleWord": "cat",
    "sampleIpa": "/kæt/",
    "isVoiced": false,
    "defaultSliders": {
      "tongueElevation": 80,
      "jawDrop": 30,
      "airPressure": 90
    },
    "tonguePath": "M 330 400 C 335 320, 360 220, 405 200 C 440 195, 470 240, 485 275 C 490 285, 470 320, 440 345 C 400 375, 390 410, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 355, 360 300, 400 285 C 435 280, 465 305, 475 325 C 480 335, 455 355, 425 365 C 395 385, 390 410, 390 420 Z",
    "constrictionPoint": {
      "x": 405,
      "y": 200,
      "gapLabel": "Cuống Lưỡi Chặn Vòm Mềm: 0.0mm"
    },
    "frictionIndex": 94,
    "contactTarget": "Cuống Lưỡi Nâng Chạm Chặt Vòm Họng Mềm Bật Hơi",
    "l1Mistake": "Đọc nhẹ như chữ \"c\" tiếng Việt, thiếu luồng khí nén bật mạnh.",
    "correctiveGuidance": "Nâng phần cuống lưỡi sau ép chặt vào vòm miệng mềm (lưỡi gà) để chặn hoàn toàn luồng khí, sau đó hạ cuống lưỡi bật hơi mạnh.",
    "tactileTrick": "Cảm giác như chuẩn bị khạc nhẹ một hạt bụi ở sâu trong cuống họng.",
    "lipShape": {
      "coronalType": "neutral",
      "label": "Mở miệng tự nhiên, cuống lưỡi nâng",
      "mouthOpening": 30,
      "lipRoundness": 10
    },
    "audioTone": {
      "freq": 220,
      "f1": 0,
      "f2": 0
    }
  },
  {
    "phoneme": "/g/",
    "name": "Voiced Velar Plosive",
    "vietnameseName": "Âm bật cuống lưỡi hữu thanh",
    "category": "consonant",
    "categoryVi": "Phụ Âm",
    "subCategory": "Plosive",
    "sampleWord": "good",
    "sampleIpa": "/ɡʊd/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 78,
      "jawDrop": 30,
      "airPressure": 75
    },
    "tonguePath": "M 330 400 C 335 320, 360 220, 405 200 C 440 195, 470 240, 485 275 C 490 285, 470 320, 440 345 C 400 375, 390 410, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 355, 360 300, 400 285 C 435 280, 465 305, 475 325 C 480 335, 455 355, 425 365 C 395 385, 390 410, 390 420 Z",
    "constrictionPoint": {
      "x": 405,
      "y": 200,
      "gapLabel": "Vòm Mềm + Rung Cuống Họng"
    },
    "frictionIndex": 80,
    "contactTarget": "Cuống Lưỡi Chạm Vòm Mềm + Rung Dây Thanh",
    "l1Mistake": "Nuốt âm đuôi /-g/ hoặc nhầm sang /k/ (vd \"bag\" đọc thành \"béc\").",
    "correctiveGuidance": "Khẩu hình y hệt /k/ nhưng dây thanh quản rung liên tục trong cuống họng.",
    "tactileTrick": "Tiếng ực nhẹ ở đáy cổ họng khi cuống lưỡi hạ xuống.",
    "lipShape": {
      "coronalType": "neutral",
      "label": "Mở vừa, cuống họng rung",
      "mouthOpening": 30,
      "lipRoundness": 10
    },
    "audioTone": {
      "freq": 160,
      "f1": 0,
      "f2": 0
    }
  },
  {
    "phoneme": "/f/",
    "name": "Voiceless Labiodental Fricative",
    "vietnameseName": "Âm xát răng-môi vô thanh",
    "category": "consonant",
    "categoryVi": "Phụ Âm",
    "subCategory": "Fricative",
    "sampleWord": "fish",
    "sampleIpa": "/fɪʃ/",
    "isVoiced": false,
    "defaultSliders": {
      "tongueElevation": 30,
      "jawDrop": 20,
      "airPressure": 85
    },
    "tonguePath": "M 330 400 C 340 360, 370 310, 420 290 C 460 280, 490 300, 505 320 C 510 330, 480 350, 450 365 C 410 385, 390 410, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 360, 370 310, 420 290 C 460 280, 490 300, 505 320 C 510 330, 480 350, 450 365 C 410 385, 390 410, 390 420 Z",
    "constrictionPoint": {
      "x": 550,
      "y": 310,
      "gapLabel": "Răng Cửa Trên Chạm Môi Dưới"
    },
    "frictionIndex": 88,
    "contactTarget": "Răng Cửa Trên Đặt Nhẹ Lên Mép Trong Môi Dưới Thổi Hơi",
    "l1Mistake": "Người Việt đọc thành âm \"ph\" hai môi không chạm răng.",
    "correctiveGuidance": "Răng cửa trên chạm nhẹ vào 1/3 bờ trong của môi dưới, nhẹ nhàng đẩy luồng khí xát qua kẽ răng và môi.",
    "tactileTrick": "Nhìn gương thấy rõ 2 chiếc răng cửa trên cắn nhẹ lên môi dưới!",
    "lipShape": {
      "coronalType": "labiodental",
      "label": "Răng cửa trên chạm bờ môi dưới",
      "mouthOpening": 20,
      "lipRoundness": 10
    },
    "audioTone": {
      "freq": 280,
      "f1": 0,
      "f2": 0
    }
  },
  {
    "phoneme": "/v/",
    "name": "Voiced Labiodental Fricative",
    "vietnameseName": "Âm xát răng-môi hữu thanh",
    "category": "consonant",
    "categoryVi": "Phụ Âm",
    "subCategory": "Fricative",
    "sampleWord": "voice",
    "sampleIpa": "/vɔɪs/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 30,
      "jawDrop": 20,
      "airPressure": 75
    },
    "tonguePath": "M 330 400 C 340 360, 370 310, 420 290 C 460 280, 490 300, 505 320 C 510 330, 480 350, 450 365 C 410 385, 390 410, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 360, 370 310, 420 290 C 460 280, 490 300, 505 320 C 510 330, 480 350, 450 365 C 410 385, 390 410, 390 420 Z",
    "constrictionPoint": {
      "x": 550,
      "y": 310,
      "gapLabel": "Răng Cửa Môi Dưới + Rung Dây Thanh"
    },
    "frictionIndex": 85,
    "contactTarget": "Răng Cửa Trên Chạm Môi Dưới + Rung Dây Thanh",
    "l1Mistake": "Người miền Nam hay lẫn lộn /v/ thành âm \"d/gi\" (/j/), đọc \"voice\" thành \"doi-xừ\".",
    "correctiveGuidance": "Khẩu hình giống hệt /f/ (răng cửa trên cắn nhẹ môi dưới) nhưng kích hoạt rung dây thanh quản tạo tiếng rè râm ran.",
    "tactileTrick": "Cảm giác môi dưới rung tê tê khi luồng hơi thoát qua kẽ răng.",
    "lipShape": {
      "coronalType": "labiodental",
      "label": "Răng trên cắn môi dưới + rung tê",
      "mouthOpening": 20,
      "lipRoundness": 10
    },
    "audioTone": {
      "freq": 190,
      "f1": 0,
      "f2": 0
    }
  },
  {
    "phoneme": "/θ/",
    "name": "Interdental Voiceless Fricative",
    "vietnameseName": "Âm xát kẹp răng vô thanh",
    "category": "consonant",
    "categoryVi": "Phụ Âm",
    "subCategory": "Fricative",
    "sampleWord": "think",
    "sampleIpa": "/θɪŋk/",
    "isVoiced": false,
    "defaultSliders": {
      "tongueElevation": 35,
      "jawDrop": 25,
      "airPressure": 70
    },
    "tonguePath": "M 330 400 C 340 350, 360 305, 400 290 C 445 272, 485 290, 515 298 C 532 301, 550 300, 552 297 C 550 303, 532 315, 505 325 C 450 345, 410 370, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 350, 360 310, 400 295 C 435 280, 470 270, 500 255 C 505 260, 495 285, 485 305 C 450 340, 410 370, 390 420 Z",
    "constrictionPoint": {
      "x": 545,
      "y": 298,
      "gapLabel": "Khe Hở Răng: 2.5mm"
    },
    "frictionIndex": 88,
    "contactTarget": "Đầu Lưỡi Kẹp Giữa Hai Hàm Răng Thổi Hơi",
    "l1Mistake": "Rụt đầu lưỡi vào trong vòm miệng và phát âm như âm \"Thờ\" tiếng Việt (/tʰ/) hoặc biến thành âm /t/ (nhầm \"think\" thành \"tink\").",
    "correctiveGuidance": "Đặt nhẹ đầu lưỡi thò ra giữa 2 hàng răng cửa từ 2-3mm. Tuyệt đối không cắn chặt răng. Nhẹ nhàng đẩy luồng hơi liên tục luồn qua kẽ răng.",
    "tactileTrick": "Đặt ngón tay trỏ sát trước mép môi. Khi phát âm từ \"think\", đầu lưỡi phải khẽ chạm vào ngón tay và cảm nhận rõ luồng hơi ấm phả ra!",
    "lipShape": {
      "coronalType": "dental",
      "label": "Đầu lưỡi thò ra 2-3mm giữa 2 răng",
      "mouthOpening": 25,
      "lipRoundness": 10
    },
    "audioTone": {
      "freq": 300,
      "f1": 0,
      "f2": 0
    }
  },
  {
    "phoneme": "/ð/",
    "name": "Interdental Voiced Fricative",
    "vietnameseName": "Âm xát kẹp răng hữu thanh",
    "category": "consonant",
    "categoryVi": "Phụ Âm",
    "subCategory": "Fricative",
    "sampleWord": "this",
    "sampleIpa": "/ðɪs/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 36,
      "jawDrop": 24,
      "airPressure": 65
    },
    "tonguePath": "M 330 400 C 340 350, 360 305, 400 290 C 445 272, 485 290, 515 298 C 532 301, 550 300, 552 297 C 550 303, 532 315, 505 325 C 450 345, 410 370, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 350, 360 315, 395 300 C 430 285, 465 260, 495 240 C 500 250, 490 280, 475 310 C 440 345, 405 375, 390 420 Z",
    "constrictionPoint": {
      "x": 545,
      "y": 298,
      "gapLabel": "Khe Hở Răng: 2.5mm + Rung"
    },
    "frictionIndex": 84,
    "contactTarget": "Đầu Lưỡi Kẹp Giữa Hai Răng + Rung Thanh Quản",
    "l1Mistake": "Đọc âm /ð/ thành âm /d/ tiếng Việt (đọc \"this\" thành \"đít\", \"that\" thành \"đát\").",
    "correctiveGuidance": "Khẩu hình giống hệt /θ/ nhưng kích hoạt rung dây thanh quản. Cảm nhận độ râm ran ở đầu lưỡi khi luồng hơi thoát ra.",
    "tactileTrick": "Đặt 2 ngón tay lên yết hầu (cổ họng). Bạn phải cảm nhận rung bần bật khi nói \"this\", khác hoàn toàn với \"think\" không rung!",
    "lipShape": {
      "coronalType": "dental",
      "label": "Đầu lưỡi kẹp giữa 2 răng + rung thanh",
      "mouthOpening": 25,
      "lipRoundness": 10
    },
    "audioTone": {
      "freq": 175,
      "f1": 0,
      "f2": 0
    }
  },
  {
    "phoneme": "/s/",
    "name": "Voiceless Alveolar Fricative",
    "vietnameseName": "Âm xát chân răng vô thanh (xì hơi)",
    "category": "consonant",
    "categoryVi": "Phụ Âm",
    "subCategory": "Fricative",
    "sampleWord": "see",
    "sampleIpa": "/siː/",
    "isVoiced": false,
    "defaultSliders": {
      "tongueElevation": 70,
      "jawDrop": 15,
      "airPressure": 85
    },
    "tonguePath": "M 330 400 C 340 340, 370 280, 420 255 C 460 235, 495 245, 518 268 C 515 278, 485 300, 455 320 C 415 355, 390 405, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 350, 370 300, 410 285 C 450 275, 480 295, 495 315 C 450 345, 405 375, 390 420 Z",
    "constrictionPoint": {
      "x": 518,
      "y": 268,
      "gapLabel": "Rãnh Hẹp Chân Răng: 1.5mm"
    },
    "frictionIndex": 90,
    "contactTarget": "Đầu Lưỡi Gần Nướu Trên Tạo Rãnh Xì Sắc Bén",
    "l1Mistake": "Nuốt âm đuôi /-s/ theo thói quen đơn lập tiếng Việt hoặc phát âm yếu.",
    "correctiveGuidance": "Hai hàm răng khép gần sát nhau, đầu lưỡi đặt sát nướu răng trên tạo khe hẹp siêu nhỏ, đẩy luồng hơi xì sắc bén như tiếng lốp xe xì hơi.",
    "tactileTrick": "Luồng hơi thổi ra sắc lẹm, nếu để bàn tay trước cằm sẽ thấy luồng gió mát lạnh hướng xuống dưới.",
    "lipShape": {
      "coronalType": "spread",
      "label": "Hai hàm răng khép sát, mép môi hơi dẹt",
      "mouthOpening": 15,
      "lipRoundness": 10
    },
    "audioTone": {
      "freq": 350,
      "f1": 0,
      "f2": 0
    }
  },
  {
    "phoneme": "/z/",
    "name": "Voiced Alveolar Fricative",
    "vietnameseName": "Âm xát chân răng hữu thanh (tiếng ong kêu)",
    "category": "consonant",
    "categoryVi": "Phụ Âm",
    "subCategory": "Fricative",
    "sampleWord": "zoo",
    "sampleIpa": "/zuː/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 70,
      "jawDrop": 15,
      "airPressure": 75
    },
    "tonguePath": "M 330 400 C 340 340, 370 280, 420 255 C 460 235, 495 245, 518 268 C 515 278, 485 300, 455 320 C 415 355, 390 405, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 350, 370 300, 410 285 C 450 275, 480 295, 495 315 C 450 345, 405 375, 390 420 Z",
    "constrictionPoint": {
      "x": 518,
      "y": 268,
      "gapLabel": "Rãnh Nướu + Rung Rè Cổ Họng"
    },
    "frictionIndex": 86,
    "contactTarget": "Khẩu Hình Giống /s/ + Rung Dây Thanh Rè Mạnh",
    "l1Mistake": "Vô thanh hóa âm /z/ thành /s/ (đọc \"is\" thành \"ịt\" hoặc \"ít\").",
    "correctiveGuidance": "Khẩu hình y hệt /s/ nhưng bắt buộc rung dây thanh quản tạo tiếng ong vò vẽ kêu \"zzzzz\".",
    "tactileTrick": "Cảm giác rung tê ở đỉnh hàm răng cửa trên khi phát âm.",
    "lipShape": {
      "coronalType": "spread",
      "label": "Răng khép sát, rung tê hai hàm",
      "mouthOpening": 15,
      "lipRoundness": 10
    },
    "audioTone": {
      "freq": 170,
      "f1": 0,
      "f2": 0
    }
  },
  {
    "phoneme": "/ʃ/",
    "name": "Postalveolar Voiceless Fricative",
    "vietnameseName": "Âm s nặng / suỵt vô thanh",
    "category": "consonant",
    "categoryVi": "Phụ Âm",
    "subCategory": "Fricative",
    "sampleWord": "she",
    "sampleIpa": "/ʃiː/",
    "isVoiced": false,
    "defaultSliders": {
      "tongueElevation": 65,
      "jawDrop": 20,
      "airPressure": 80
    },
    "tonguePath": "M 330 400 C 340 340, 370 280, 420 240 C 455 220, 480 230, 495 245 C 500 252, 495 265, 480 280 C 445 320, 410 365, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 350, 370 320, 410 300 C 450 285, 490 280, 520 285 C 525 292, 510 310, 485 330 C 445 360, 410 385, 390 420 Z",
    "constrictionPoint": {
      "x": 490,
      "y": 235,
      "gapLabel": "Khe Vòm Miệng: 3.0mm"
    },
    "frictionIndex": 92,
    "contactTarget": "Thân Lưỡi Nâng Sát Vòm Cứng + Chu Môi",
    "l1Mistake": "Người miền Bắc làm bẹt môi đọc /ʃ/ thành /s/ (nhầm \"she\" thành \"sea\").",
    "correctiveGuidance": "Chu tròn môi như đang ra hiệu \"Suỵt!\". Nâng thân lưỡi cong hình muỗng lên sát vòm miệng cứng, luồng hơi dày phả mạnh.",
    "tactileTrick": "Hai bên mép môi phải thu tròn lại thành hình chữ O nhỏ, không được dẹt khóe môi sang hai bên!",
    "lipShape": {
      "coronalType": "round",
      "label": "Chu tròn môi như ra hiệu \"Suỵt!\"",
      "mouthOpening": 22,
      "lipRoundness": 80
    },
    "audioTone": {
      "freq": 320,
      "f1": 0,
      "f2": 0
    }
  },
  {
    "phoneme": "/ʒ/",
    "name": "Postalveolar Voiced Fricative",
    "vietnameseName": "Âm s nặng hữu thanh",
    "category": "consonant",
    "categoryVi": "Phụ Âm",
    "subCategory": "Fricative",
    "sampleWord": "measure",
    "sampleIpa": "/ˈmeʒ.ər/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 64,
      "jawDrop": 20,
      "airPressure": 70
    },
    "tonguePath": "M 330 400 C 340 340, 370 280, 420 240 C 455 220, 480 230, 495 245 C 500 252, 495 265, 480 280 C 445 320, 410 365, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 350, 370 320, 410 300 C 450 285, 490 280, 520 285 C 525 292, 510 310, 485 330 C 445 360, 410 385, 390 420 Z",
    "constrictionPoint": {
      "x": 490,
      "y": 235,
      "gapLabel": "Vòm Cứng + Rung Thanh Quản"
    },
    "frictionIndex": 90,
    "contactTarget": "Thân Lưỡi Vòm Cứng + Rung Thanh Quản",
    "l1Mistake": "Thay thế bằng âm \"dờ\" hoặc \"gi\" tiếng Việt, mất đi tiếng xát rung đặc trưng.",
    "correctiveGuidance": "Khẩu hình y hệt /ʃ/ (chu tròn môi) nhưng kích hoạt rung dây thanh quản liên tục.",
    "tactileTrick": "Tạo tiếng ong kêu \"dzzzz\" trong khi chu tròn môi hết cỡ!",
    "lipShape": {
      "coronalType": "round",
      "label": "Chu môi tròn + rung thanh quản",
      "mouthOpening": 22,
      "lipRoundness": 80
    },
    "audioTone": {
      "freq": 175,
      "f1": 0,
      "f2": 0
    }
  },
  {
    "phoneme": "/h/",
    "name": "Voiceless Glottal Fricative",
    "vietnameseName": "Âm thở thanh môn vô thanh",
    "category": "consonant",
    "categoryVi": "Phụ Âm",
    "subCategory": "Fricative",
    "sampleWord": "hat",
    "sampleIpa": "/hæt/",
    "isVoiced": false,
    "defaultSliders": {
      "tongueElevation": 35,
      "jawDrop": 35,
      "airPressure": 65
    },
    "tonguePath": "M 330 400 C 340 360, 370 310, 420 290 C 460 280, 490 300, 505 320 C 510 330, 480 350, 450 365 C 410 385, 390 410, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 360, 370 310, 420 290 C 460 280, 490 300, 505 320 C 510 330, 480 350, 450 365 C 410 385, 390 410, 390 420 Z",
    "constrictionPoint": {
      "x": 295,
      "y": 430,
      "gapLabel": "Thanh Môn Mở Rộng: 5.0mm"
    },
    "frictionIndex": 40,
    "contactTarget": "Khoang Miệng Thả Lỏng Hoàn Toàn, Thổi Hơi Từ Họng",
    "l1Mistake": "Khạc hơi quá mạnh từ cuống họng như âm \"kh\" tiếng Việt.",
    "correctiveGuidance": "Cơ quan phát âm chuẩn bị sẵn khẩu hình cho nguyên âm kế tiếp. Thở ra một luồng khí nhẹ nhàng từ thanh môn không có cản trở.",
    "tactileTrick": "Thổi hơi làm mờ mặt gương hoặc mắt kính để lau kính.",
    "lipShape": {
      "coronalType": "neutral",
      "label": "Mở tự nhiên thả lỏng",
      "mouthOpening": 35,
      "lipRoundness": 10
    },
    "audioTone": {
      "freq": 180,
      "f1": 0,
      "f2": 0
    }
  },
  {
    "phoneme": "/tʃ/",
    "name": "Voiceless Postalveolar Affricate",
    "vietnameseName": "Âm tắc xát vô thanh (ch nặng)",
    "category": "consonant",
    "categoryVi": "Phụ Âm",
    "subCategory": "Affricate",
    "sampleWord": "chin",
    "sampleIpa": "/tʃɪn/",
    "isVoiced": false,
    "defaultSliders": {
      "tongueElevation": 72,
      "jawDrop": 22,
      "airPressure": 85
    },
    "tonguePath": "M 330 400 C 340 340, 370 270, 425 240 C 460 220, 495 235, 520 258 C 515 272, 485 295, 455 320 C 415 355, 390 405, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 350, 370 290, 410 275 C 450 265, 480 285, 495 305 C 450 340, 405 375, 390 420 Z",
    "constrictionPoint": {
      "x": 510,
      "y": 245,
      "gapLabel": "Chặn /t/ Bung Sang /ʃ/"
    },
    "frictionIndex": 94,
    "contactTarget": "Chặn Khí Ở Vòm Nướu Sau Rồi Bung Ma Sát /ʃ/",
    "l1Mistake": "Đọc nông như chữ \"ch\" tiếng Việt (đọc \"cheap\" thành \"chíp\" phẳng lì).",
    "correctiveGuidance": "Khép răng, chu môi, đầu lưỡi chặn khí ở nướu sau như /t/ rồi bung nổ tức thì sang âm xát /ʃ/.",
    "tactileTrick": "Tiếng nổ xì mạnh giống như tiếng đoàn tàu hỏa hơi nước \"ch-ch-ch\"!",
    "lipShape": {
      "coronalType": "round",
      "label": "Chu môi mở nhẹ, bật nổ xát",
      "mouthOpening": 25,
      "lipRoundness": 70
    },
    "audioTone": {
      "freq": 300,
      "f1": 0,
      "f2": 0
    }
  },
  {
    "phoneme": "/dʒ/",
    "name": "Voiced Postalveolar Affricate",
    "vietnameseName": "Âm tắc xát hữu thanh (j rung)",
    "category": "consonant",
    "categoryVi": "Phụ Âm",
    "subCategory": "Affricate",
    "sampleWord": "joy",
    "sampleIpa": "/dʒɔɪ/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 70,
      "jawDrop": 22,
      "airPressure": 78
    },
    "tonguePath": "M 330 400 C 340 340, 370 270, 425 240 C 460 220, 495 235, 520 258 C 515 272, 485 295, 455 320 C 415 355, 390 405, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 350, 370 290, 410 275 C 450 265, 480 285, 495 305 C 450 340, 405 375, 390 420 Z",
    "constrictionPoint": {
      "x": 510,
      "y": 245,
      "gapLabel": "Chặn /d/ Bung /ʒ/ + Rung"
    },
    "frictionIndex": 88,
    "contactTarget": "Chặn /d/ Bung Sang /ʒ/ + Rung Mạnh Thanh Quản",
    "l1Mistake": "Người Việt thay bằng âm \"d/gi\" tiếng Việt hoặc mất tính bật khí.",
    "correctiveGuidance": "Khẩu hình giống /tʃ/ (chu tròn môi) nhưng kích hoạt rung dây thanh quản mạnh mẽ từ trong cổ họng.",
    "tactileTrick": "Rung mạnh ở cổ họng kết hợp với cảm giác giật bật ở đầu lưỡi.",
    "lipShape": {
      "coronalType": "round",
      "label": "Chu môi tròn + bật nổ rung",
      "mouthOpening": 25,
      "lipRoundness": 70
    },
    "audioTone": {
      "freq": 175,
      "f1": 0,
      "f2": 0
    }
  },
  {
    "phoneme": "/m/",
    "name": "Bilabial Nasal",
    "vietnameseName": "Âm mũi hai môi",
    "category": "consonant",
    "categoryVi": "Phụ Âm",
    "subCategory": "Nasal",
    "sampleWord": "man",
    "sampleIpa": "/mæn/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 35,
      "jawDrop": 12,
      "airPressure": 60
    },
    "tonguePath": "M 330 400 C 340 360, 370 310, 420 290 C 460 280, 490 300, 505 320 C 510 330, 480 350, 450 365 C 410 385, 390 410, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 360, 370 310, 420 290 C 460 280, 490 300, 505 320 C 510 330, 480 350, 450 365 C 410 385, 390 410, 390 420 Z",
    "constrictionPoint": {
      "x": 585,
      "y": 278,
      "gapLabel": "Môi Khép Kín + Thoát Khí Mũi"
    },
    "frictionIndex": 75,
    "contactTarget": "Hai Môi Ngậm Kín, Lưỡi Gà Hạ Thoát Khí Qua Mũi",
    "l1Mistake": "Âm /m/ tương đối tự nhiên, lưu ý giữ âm vang ở cuối từ.",
    "correctiveGuidance": "Mím chặt hai môi, hạ lưỡi gà xuống để toàn bộ luồng khí rung thanh thoát ra khoang mũi.",
    "tactileTrick": "Đặt ngón tay lên sống mũi, cảm nhận độ rung mạnh của khoang mũi.",
    "lipShape": {
      "coronalType": "bilabial",
      "label": "Hai môi ngậm kín tự nhiên",
      "mouthOpening": 5,
      "lipRoundness": 10
    },
    "audioTone": {
      "freq": 140,
      "f1": 250,
      "f2": 1000
    }
  },
  {
    "phoneme": "/n/",
    "name": "Alveolar Nasal",
    "vietnameseName": "Âm mũi chân răng",
    "category": "consonant",
    "categoryVi": "Phụ Âm",
    "subCategory": "Nasal",
    "sampleWord": "no",
    "sampleIpa": "/nəʊ/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 75,
      "jawDrop": 20,
      "airPressure": 60
    },
    "tonguePath": "M 330 400 C 340 340, 370 280, 420 250 C 460 225, 500 235, 526 268 C 522 280, 490 300, 460 320 C 420 355, 390 405, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 350, 370 290, 410 275 C 450 265, 480 285, 495 305 C 450 340, 405 375, 390 420 Z",
    "constrictionPoint": {
      "x": 526,
      "y": 268,
      "gapLabel": "Đầu Lưỡi Áp Chân Răng + Hơi Qua Mũi"
    },
    "frictionIndex": 78,
    "contactTarget": "Đầu Lưỡi Ép Chặt Nướu Răng Trên, Khí Thoát Qua Mũi",
    "l1Mistake": "Người miền Bắc ở một số tỉnh hay lẫn lộn /l/ với /n/.",
    "correctiveGuidance": "Đầu lưỡi ép chặt chặn toàn bộ khoang miệng, luồng hơi chuyển hướng đi lên khoang mũi.",
    "tactileTrick": "Bịt nhẹ mũi lại thì âm /n/ sẽ bị nghẽn không phát ra được!",
    "lipShape": {
      "coronalType": "neutral",
      "label": "Răng mở nhẹ, đầu lưỡi chạm nướu",
      "mouthOpening": 20,
      "lipRoundness": 10
    },
    "audioTone": {
      "freq": 160,
      "f1": 280,
      "f2": 1400
    }
  },
  {
    "phoneme": "/ŋ/",
    "name": "Velar Nasal",
    "vietnameseName": "Âm mũi cuống lưỡi (ng đuôi)",
    "category": "consonant",
    "categoryVi": "Phụ Âm",
    "subCategory": "Nasal",
    "sampleWord": "sing",
    "sampleIpa": "/sɪŋ/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 82,
      "jawDrop": 25,
      "airPressure": 65
    },
    "tonguePath": "M 330 400 C 335 320, 360 215, 405 195 C 440 190, 470 235, 485 270 C 490 280, 470 315, 440 340 C 400 370, 390 410, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 355, 360 300, 400 285 C 435 280, 465 305, 475 325 C 480 335, 455 355, 425 365 C 395 385, 390 410, 390 420 Z",
    "constrictionPoint": {
      "x": 405,
      "y": 195,
      "gapLabel": "Cuống Lưỡi Chạm Vòm Mềm + Hơi Mũi"
    },
    "frictionIndex": 82,
    "contactTarget": "Cuống Lưỡi Ép Kín Vòm Mềm, Luồng Hơi Thoát Qua Mũi",
    "l1Mistake": "Thêm âm /g/ ở đuôi từ (đọc \"sing\" thành \"sing-gờ\").",
    "correctiveGuidance": "Nâng cuống lưỡi ép chặt vòm miệng mềm, hạ lưỡi gà cho hơi lên mũi. Không nhả cuống lưỡi ra tạo âm g.",
    "tactileTrick": "Giữ nguyên cuống lưỡi dính chặt vòm họng cho đến khi âm thanh tắt hẳn.",
    "lipShape": {
      "coronalType": "neutral",
      "label": "Miệng mở tự nhiên, cuống lưỡi dính",
      "mouthOpening": 28,
      "lipRoundness": 10
    },
    "audioTone": {
      "freq": 170,
      "f1": 300,
      "f2": 2000
    }
  },
  {
    "phoneme": "/l/",
    "name": "Alveolar Lateral Approximant",
    "vietnameseName": "Âm tiếp cận cạnh lưỡi",
    "category": "consonant",
    "categoryVi": "Phụ Âm",
    "subCategory": "Approximant",
    "sampleWord": "leg",
    "sampleIpa": "/leɡ/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 75,
      "jawDrop": 22,
      "airPressure": 60
    },
    "tonguePath": "M 330 400 C 340 345, 370 285, 420 260 C 460 235, 500 240, 526 268 C 518 285, 485 315, 455 335 C 415 365, 390 405, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 350, 370 300, 410 285 C 450 275, 480 295, 495 315 C 450 340, 405 375, 390 420 Z",
    "constrictionPoint": {
      "x": 526,
      "y": 268,
      "gapLabel": "Đầu Lưỡi Chạm Nướu, Khí Ra 2 Cạnh"
    },
    "frictionIndex": 65,
    "contactTarget": "Đầu Lưỡi Chạm Chân Răng Trên, Luồng Khí Thoát Hai Bên Thân Lưỡi",
    "l1Mistake": "Lẫn lộn /l/ thành /n/ (Bắc Bộ) hoặc nuốt \"dark L\" ở đuôi từ (đọc \"milk\" thành \"miu\").",
    "correctiveGuidance": "Đầu lưỡi chạm chính giữa nướu răng cửa trên, hai bên thân lưỡi hạ xuống để không khí tự do lùa qua hai bên sườn.",
    "tactileTrick": "Khi làm \"dark L\" đuôi từ (\"feel\"), giữ đầu lưỡi ở chân răng trên và nâng nhẹ cuống lưỡi.",
    "lipShape": {
      "coronalType": "neutral",
      "label": "Đầu lưỡi tựa nướu răng trên",
      "mouthOpening": 25,
      "lipRoundness": 10
    },
    "audioTone": {
      "freq": 220,
      "f1": 350,
      "f2": 1200
    }
  },
  {
    "phoneme": "/r/",
    "name": "Post-alveolar Approximant",
    "vietnameseName": "Âm tiếp cận sau chân răng (r uốn lưỡi)",
    "category": "consonant",
    "categoryVi": "Phụ Âm",
    "subCategory": "Approximant",
    "sampleWord": "red",
    "sampleIpa": "/red/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 68,
      "jawDrop": 25,
      "airPressure": 65
    },
    "tonguePath": "M 330 400 C 340 335, 370 265, 425 240 C 460 230, 480 245, 495 260 C 490 275, 470 300, 440 330 C 400 365, 390 405, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 350, 370 295, 415 280 C 455 270, 485 290, 500 310 C 455 345, 405 375, 390 420 Z",
    "constrictionPoint": {
      "x": 495,
      "y": 260,
      "gapLabel": "Đầu Lưỡi Cong Không Chạm: 4.0mm"
    },
    "frictionIndex": 70,
    "contactTarget": "Đầu Lưỡi Cong Về Sau Vòm Cứng NHƯNG KHÔNG ĐƯỢC CHẠM",
    "l1Mistake": "Rung lưỡi như chữ \"r\" tiếng Việt hoặc đọc thành \"d/z\" (Hà Nội).",
    "correctiveGuidance": "Cong đầu lưỡi ngược về phía sau vòm họng, mép môi hơi chu nhẹ. Tuyệt đối không để đầu lưỡi chạm vào bất kỳ điểm nào trong miệng!",
    "tactileTrick": "Hai bên sườn lưỡi tì vào mặt trong hàm răng hàm trên, đầu lưỡi lơ lửng trong không trung.",
    "lipShape": {
      "coronalType": "round",
      "label": "Môi hơi chu tròn nhẹ, lưỡi cuộn sâu",
      "mouthOpening": 25,
      "lipRoundness": 50
    },
    "audioTone": {
      "freq": 210,
      "f1": 350,
      "f2": 1100
    }
  },
  {
    "phoneme": "/w/",
    "name": "Labio-velar Approximant",
    "vietnameseName": "Âm tiếp cận môi-vòm mềm",
    "category": "consonant",
    "categoryVi": "Phụ Âm",
    "subCategory": "Approximant",
    "sampleWord": "wet",
    "sampleIpa": "/wet/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 80,
      "jawDrop": 15,
      "airPressure": 60
    },
    "tonguePath": "M 330 400 C 335 325, 365 220, 415 200 C 450 195, 480 235, 495 265 C 500 275, 475 305, 445 325 C 405 355, 390 400, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 360, 370 310, 420 290 C 460 280, 490 300, 505 320 C 510 330, 480 350, 450 365 C 410 385, 390 410, 390 420 Z",
    "constrictionPoint": {
      "x": 585,
      "y": 278,
      "gapLabel": "Chu Môi Tròn Nhỏ + Nâng Cuống Lưỡi"
    },
    "frictionIndex": 60,
    "contactTarget": "Môi Chu Nhọn Tròn Xoe + Cuống Lưỡi Nâng Cao Sát Vòm Mềm",
    "l1Mistake": "Đọc thành âm \"qu\" hoặc \"v\" tiếng Việt (đọc \"wet\" thành \"quét\" hoặc \"vét\").",
    "correctiveGuidance": "Môi chu nhỏ hết cỡ giống như huýt sáo, cuống lưỡi nâng cao. Mở nhanh môi sang nguyên âm kế tiếp.",
    "tactileTrick": "Chuyển động môi mở bung nhanh giống như camera zoom out.",
    "lipShape": {
      "coronalType": "round",
      "label": "Chu nhọn tròn xoe bung nhanh",
      "mouthOpening": 15,
      "lipRoundness": 90
    },
    "audioTone": {
      "freq": 200,
      "f1": 300,
      "f2": 800
    }
  },
  {
    "phoneme": "/j/",
    "name": "Palatal Approximant",
    "vietnameseName": "Âm tiếp cận vòm cứng (bán nguyên âm y)",
    "category": "consonant",
    "categoryVi": "Phụ Âm",
    "subCategory": "Approximant",
    "sampleWord": "yes",
    "sampleIpa": "/jes/",
    "isVoiced": true,
    "defaultSliders": {
      "tongueElevation": 82,
      "jawDrop": 18,
      "airPressure": 60
    },
    "tonguePath": "M 330 400 C 340 330, 380 230, 440 205 C 475 195, 505 230, 520 260 C 525 270, 505 295, 470 310 C 430 340, 395 375, 390 420 Z",
    "l1GhostPath": "M 330 400 C 340 350, 370 295, 415 280 C 455 270, 485 290, 500 310 C 455 345, 405 375, 390 420 Z",
    "constrictionPoint": {
      "x": 440,
      "y": 205,
      "gapLabel": "Thân Lưỡi Sát Vòm Cứng: 2.5mm"
    },
    "frictionIndex": 55,
    "contactTarget": "Thân Trước Lưỡi Nâng Sát Vòm Cứng Lướt Nhanh",
    "l1Mistake": "Đọc thành âm \"d/gi\" tiếng Việt có ma sát rè (đọc \"yes\" thành \"dét\").",
    "correctiveGuidance": "Khẩu hình bắt đầu như âm /iː/, không tạo ma sát răng hay lưỡi. Lướt mượt mà sang nguyên âm sau.",
    "tactileTrick": "Âm thanh lướt êm dịu, không được có tiếng cọ xát răng hay rè ở cổ.",
    "lipShape": {
      "coronalType": "spread",
      "label": "Khóe môi kéo dẹt lướt nhanh",
      "mouthOpening": 22,
      "lipRoundness": 10
    },
    "audioTone": {
      "freq": 240,
      "f1": 280,
      "f2": 2200
    }
  }
];

/**
 * Calculates dynamic SVG Bézier transformation offsets from slider values
 * @param {number} tongueElevation (10 to 90)
 * @param {number} jawDrop (5 to 80)
 * @returns {{ yOffset: number, jawY: number, totalTranslateY: number }}
 */
export function calculateAnatomyTransform(tongueElevation = 35, jawDrop = 25) {
  const yOffset = Number(((35 - tongueElevation) * 0.4).toFixed(2));
  const jawY = Number(((jawDrop - 25) * 0.3).toFixed(2));
  return {
    yOffset,
    jawY,
    totalTranslateY: Number((yOffset + jawY).toFixed(2))
  };
}
