/**
 * 2D Biomechanical Sagittal Vocal Tract Data Library (PRON-201)
 * Static vector coordinate cache loaded directly by the client (Gate B / AC 4)
 * Supports dynamic Bézier transformation and L1 Vietnamese Ghost Overlay.
 */

export const PHONEME_ANATOMY_CATALOG = {
  '/θ/': {
    phoneme: '/θ/',
    name: 'Interdental Voiceless Fricative',
    sampleWord: 'think',
    sampleIpa: '/θɪŋk/',
    isVoiced: false,
    defaultSliders: {
      tongueElevation: 35,
      jawDrop: 25,
      airPressure: 65
    },
    // Primary Sagittal Tongue Path (Protruding slightly between incisors)
    tonguePath: 'M 330 400 C 340 350, 360 305, 400 290 C 445 272, 485 290, 515 298 C 532 301, 550 300, 552 297 C 550 303, 532 315, 505 325 C 450 345, 410 370, 390 420 Z',
    // L1 Vietnamese Habitual Ghost Tongue Path (Retracted inside oral cavity, touching alveolar ridge like "Th")
    l1GhostPath: 'M 330 400 C 340 350, 360 310, 400 295 C 435 280, 470 270, 500 255 C 505 260, 495 285, 485 305 C 450 340, 410 370, 390 420 Z',
    constrictionPoint: { x: 545, y: 298, gapLabel: 'Khe Hở Răng: 2.5mm' },
    frictionIndex: 88,
    contactTarget: 'Đầu Lưỡi Kẹp Giữa Hai Hàm Răng',
    l1Mistake: 'Rụt đầu lưỡi vào trong vòm miệng và phát âm như âm "Thờ" tiếng Việt (/tʰ/) hoặc biến thành âm /t/ (nhầm "think" thành "tink").',
    correctiveGuidance: 'Đặt nhẹ đầu lưỡi thò ra giữa 2 hàng răng cửa từ 2-3mm. Tuyệt đối không cắn chặt răng. Nhẹ nhàng đẩy luồng hơi liên tục luồn qua kẽ răng.',
    tactileTrick: 'Đặt ngón tay trỏ sát trước mép môi. Khi phát âm từ "think", đầu lưỡi phải khẽ chạm vào ngón tay và cảm nhận rõ luồng hơi ấm phả ra!'
  },
  '/ð/': {
    phoneme: '/ð/',
    name: 'Interdental Voiced Fricative',
    sampleWord: 'this',
    sampleIpa: '/ðɪs/',
    isVoiced: true,
    defaultSliders: {
      tongueElevation: 36,
      jawDrop: 24,
      airPressure: 60
    },
    tonguePath: 'M 330 400 C 340 350, 360 305, 400 290 C 445 272, 485 290, 515 298 C 532 301, 550 300, 552 297 C 550 303, 532 315, 505 325 C 450 345, 410 370, 390 420 Z',
    l1GhostPath: 'M 330 400 C 340 350, 360 315, 395 300 C 430 285, 465 260, 495 240 C 500 250, 490 280, 475 310 C 440 345, 405 375, 390 420 Z',
    constrictionPoint: { x: 545, y: 298, gapLabel: 'Khe Hở Răng: 2.5mm' },
    frictionIndex: 84,
    contactTarget: 'Đầu Lưỡi Kẹp Giữa Hai Răng + Rung Thanh Quản',
    l1Mistake: 'Đọc âm /ð/ thành âm /d/ tiếng Việt (đọc "this" thành "đít", "that" thành "đát").',
    correctiveGuidance: 'Khẩu hình giống hệt /θ/ nhưng kích hoạt rung dây thanh quản (Voiced Vibration). Cảm nhận độ râm ran ở đầu lưỡi khi luồng hơi thoát ra.',
    tactileTrick: 'Đặt 2 ngón tay lên yết hầu (cổ họng). Bạn phải cảm nhận rung bần bật khi nói "this", khác hoàn toàn với "think" không rung!'
  },
  '/ʃ/': {
    phoneme: '/ʃ/',
    name: 'Postalveolar Voiceless Fricative',
    sampleWord: 'she',
    sampleIpa: '/ʃiː/',
    isVoiced: false,
    defaultSliders: {
      tongueElevation: 65,
      jawDrop: 20,
      airPressure: 75
    },
    tonguePath: 'M 330 400 C 340 340, 370 280, 420 240 C 455 220, 480 230, 495 245 C 500 252, 495 265, 480 280 C 445 320, 410 365, 390 420 Z',
    l1GhostPath: 'M 330 400 C 340 350, 370 320, 410 300 C 450 285, 490 280, 520 285 C 525 292, 510 310, 485 330 C 445 360, 410 385, 390 420 Z',
    constrictionPoint: { x: 490, y: 235, gapLabel: 'Khe Vòm Miệng: 3.0mm' },
    frictionIndex: 92,
    contactTarget: 'Thân Lưỡi Nâng Sát Vòm Cứng + Chu Môi',
    l1Mistake: 'Người miền Bắc làm bẹt môi đọc /ʃ/ thành /s/ (nhầm "she" thành "sea").',
    correctiveGuidance: 'Chu tròn môi như đang ra hiệu "Suỵt!". Nâng thân lưỡi cong hình muỗng lên sát vòm miệng cứng, luồng hơi dày phả mạnh.',
    tactileTrick: 'Hai bên mép môi phải thu tròn lại thành hình chữ O nhỏ, không được dẹt khóe môi sang hai bên!'
  },
  '/ʒ/': {
    phoneme: '/ʒ/',
    name: 'Postalveolar Voiced Fricative',
    sampleWord: 'measure',
    sampleIpa: '/ˈmeʒ.ər/',
    isVoiced: true,
    defaultSliders: {
      tongueElevation: 64,
      jawDrop: 20,
      airPressure: 70
    },
    tonguePath: 'M 330 400 C 340 340, 370 280, 420 240 C 455 220, 480 230, 495 245 C 500 252, 495 265, 480 280 C 445 320, 410 365, 390 420 Z',
    l1GhostPath: 'M 330 400 C 340 350, 370 320, 410 300 C 450 285, 490 280, 520 285 C 525 292, 510 310, 485 330 C 445 360, 410 385, 390 420 Z',
    constrictionPoint: { x: 490, y: 235, gapLabel: 'Khe Vòm Miệng: 3.0mm' },
    frictionIndex: 90,
    contactTarget: 'Thân Lưỡi Vòm Cứng + Rung Thanh Quản',
    l1Mistake: 'Thay thế bằng âm "dờ" hoặc "gi" tiếng Việt, mất đi tiếng xát rung đặc trưng.',
    correctiveGuidance: 'Khẩu hình y hệt /ʃ/ (chu tròn môi) nhưng kích hoạt rung dây thanh quản liên tục.',
    tactileTrick: 'Tạo tiếng ong kêu "dzzzz" trong khi chu tròn môi hết cỡ!'
  }
};

/**
 * Calculates dynamic SVG Bézier transformation offsets from slider values
 * @param {number} tongueElevation (10 to 90)
 * @param {number} jawDrop (5 to 80)
 * @returns {{ yOffset: number, jawY: number }}
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
