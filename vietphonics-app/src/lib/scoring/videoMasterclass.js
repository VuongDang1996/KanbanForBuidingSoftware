/**
 * Video-Synchronized Masterclass & Exaggerated Articulation Engine (PRON-210)
 * Provides dual-camera angles (frontal vs profile), WebVTT cues synchronization,
 * slow-motion and A-B loop playback controls, and client SVG fallback simulations.
 */

export const MASTERCLASS_LESSONS = [
  {
    id: 'mc_theta_01',
    phoneme: '/θ/',
    title: 'Dental Fricative Mastery: Kỹ Thuật Đặt Lưỡi Kẹp Răng Siêu Phóng Đại',
    expert: 'Dr. Sarah Jenkins (Phonetics Specialist, Oxford)',
    durationSec: 12.0,
    angles: [
      {
        id: 'frontal',
        label: 'Góc Nhìn Thẳng (Frontal)',
        description: 'Quan sát độ hé của môi và diện tích tiếp xúc của lưỡi với răng cửa trên.'
      },
      {
        id: 'profile_45',
        label: 'Góc Nghiêng 45° (Profile)',
        description: 'Quan sát độ vươn ra của đầu lưỡi và góc mở quai hàm dưới.'
      }
    ],
    cues: [
      {
        id: 'cue_01',
        startSec: 0.0,
        endSec: 2.5,
        title: 'Bước 1: Thả Lỏng & Hé Hàm',
        instruction: 'Thả lỏng cơ hàm, mở miệng nhẹ khoảng 5mm, chuẩn bị luồng khí.',
        zoomLevel: 1.0,
        targetSpot: { x: 50, y: 55 },
        lipShape: 'open_relaxed',
        vietnameseTip: 'Không gồng môi, thả lỏng cằm dưới hoàn toàn.'
      },
      {
        id: 'cue_02',
        startSec: 2.5,
        endSec: 6.0,
        title: 'Bước 2: Phóng Đại - Kẹp Đầu Lưỡi Giữa Răng',
        instruction: 'Thò nhẹ 2-3mm đầu lưỡi ra giữa 2 hàm răng cửa (Exaggerated Placement).',
        zoomLevel: 2.2,
        targetSpot: { x: 50, y: 60 },
        lipShape: 'tongue_interdental',
        vietnameseTip: 'Răng cửa trên chạm nhẹ vào mặt trên đầu lưỡi, không cắn chặt!'
      },
      {
        id: 'cue_03',
        startSec: 6.0,
        endSec: 9.5,
        title: 'Bước 3: Đẩy Luồng Khí Vô Thanh',
        instruction: 'Thổi luồng hơi liên tục qua khe hở giữa răng và lưỡi, dây thanh không rung.',
        zoomLevel: 1.8,
        targetSpot: { x: 50, y: 58 },
        lipShape: 'air_stream',
        vietnameseTip: 'Đặt lòng bàn tay trước miệng cảm nhận luồng gió mát phà ra.'
      },
      {
        id: 'cue_04',
        startSec: 9.5,
        endSec: 12.0,
        title: 'Bước 4: Rút Lưỡi Nhả Âm',
        instruction: 'Rút nhẹ đầu lưỡi về sau chân răng trên khi chuyển tiếp sang nguyên âm tiếp theo.',
        zoomLevel: 1.2,
        targetSpot: { x: 50, y: 52 },
        lipShape: 'retract_smooth',
        vietnameseTip: 'Chuyển động dứt khoát, tránh để lưỡi va đập vào răng tạo tiếng /t/.'
      }
    ]
  },
  {
    id: 'mc_w_02',
    phoneme: '/w/',
    title: 'Labial-Velar Glide: Kỹ Thuật Chu Môi Vòng Tròn Hẹp',
    expert: 'Michael Hayes (Speech & Dialect Coach, NYC)',
    durationSec: 10.0,
    angles: [
      {
        id: 'frontal',
        label: 'Góc Nhìn Thẳng (Frontal)',
        description: 'Quan sát đường kính miệng thu nhỏ lại thành vòng tròn chữ O.'
      },
      {
        id: 'profile_45',
        label: 'Góc Nghiêng 45° (Profile)',
        description: 'Quan sát độ nhô ra phía trước của 2 vành môi.'
      }
    ],
    cues: [
      {
        id: 'cue_w_01',
        startSec: 0.0,
        endSec: 4.5,
        title: 'Bước 1: Chu Môi Tối Đa',
        instruction: 'Chu 2 môi về phía trước thành vòng tròn nhỏ đường kính 1cm.',
        zoomLevel: 2.0,
        targetSpot: { x: 50, y: 58 },
        lipShape: 'tight_circle',
        vietnameseTip: 'Như đang chuẩn bị huýt sáo hoặc thổi nến.'
      },
      {
        id: 'cue_w_02',
        startSec: 4.5,
        endSec: 10.0,
        title: 'Bước 2: Rung Cuống Lưỡi & Bung Khí',
        instruction: 'Nâng cuống lưỡi lên vòm họng mềm, rung dây thanh rồi mở bung môi.',
        zoomLevel: 1.5,
        targetSpot: { x: 50, y: 54 },
        lipShape: 'open_burst',
        vietnameseTip: 'Rung cổ họng phát âm /u/ rồi bung miệng thành /w/.'
      }
    ]
  },
  {
    id: 'mc_ae_03',
    phoneme: '/æ/',
    title: 'Near-Open Front Vowel: Hạ Quai Hàm Sâu "A Bẹt" Chuẩn Mỹ',
    expert: 'Emma Watson (Articulatory Voice Coach, LA)',
    durationSec: 10.0,
    angles: [
      {
        id: 'frontal',
        label: 'Góc Nhìn Thẳng (Frontal)',
        description: 'Quan sát độ kéo dẹt của 2 khóe miệng sang 2 bên.'
      },
      {
        id: 'profile_45',
        label: 'Góc Nghiêng 45° (Profile)',
        description: 'Quan sát độ mở hạ thấp của cằm dưới (2 ngón tay).'
      }
    ],
    cues: [
      {
        id: 'cue_ae_01',
        startSec: 0.0,
        endSec: 4.0,
        title: 'Bước 1: Hạ Sâu Cằm Dưới',
        instruction: 'Hạ cằm dưới mở rộng khẩu hình, đủ nhét 2 ngón tay trỏ và giữa.',
        zoomLevel: 1.8,
        targetSpot: { x: 50, y: 65 },
        lipShape: 'wide_jaw_drop',
        vietnameseTip: 'Mở rộng miệng gấp đôi âm "a" trong tiếng Việt.'
      },
      {
        id: 'cue_ae_02',
        startSec: 4.0,
        endSec: 10.0,
        title: 'Bước 2: Kéo Căng Khóe Miệng',
        instruction: 'Kéo nhẹ khóe miệng sang 2 bên như đang mỉm cười nhẹ trong khi vẫn giữ cằm hạ thấp.',
        zoomLevel: 1.6,
        targetSpot: { x: 50, y: 60 },
        lipShape: 'smile_stretch',
        vietnameseTip: 'Lưỡi nằm dẹt sát sàn miệng, cuống lưỡi hơi cong nhẹ.'
      }
    ]
  }
];

export function getMasterclassCatalog() {
  return MASTERCLASS_LESSONS;
}

export function getMasterclassLesson(lessonIdOrPhoneme) {
  if (!lessonIdOrPhoneme) return null;
  const normalized = lessonIdOrPhoneme.trim().toLowerCase();
  return MASTERCLASS_LESSONS.find(
    (l) => l.id.toLowerCase() === normalized || l.phoneme.toLowerCase() === normalized
  ) || null;
}

export function getCurrentCue(lesson, currentTimeSec) {
  if (!lesson || !Array.isArray(lesson.cues)) return null;
  const time = Math.max(0, currentTimeSec);
  return lesson.cues.find((c) => time >= c.startSec && time < c.endSec) || lesson.cues[lesson.cues.length - 1];
}

export function evaluateMasterclassSession({
  lessonId,
  watchDurationSec = 0,
  cameraAngle = 'frontal',
  playbackRate = 1.0,
  loopEnabled = false
}) {
  const lesson = getMasterclassLesson(lessonId);
  if (!lesson) {
    return {
      success: false,
      error: `Lesson not found for ID: ${lessonId}`
    };
  }

  const completionRatio = Math.min(1.0, Math.max(0, watchDurationSec / lesson.durationSec));
  const isCompleted = completionRatio >= 0.75; // 75% watched counts as completed

  return {
    success: true,
    lessonId: lesson.id,
    phoneme: lesson.phoneme,
    title: lesson.title,
    watchDurationSec,
    durationSec: lesson.durationSec,
    completionPercentage: Math.round(completionRatio * 100),
    isCompleted,
    cameraAngle,
    playbackRate,
    loopEnabled,
    feedback: isCompleted
      ? `Chúc mừng! Bạn đã hoàn thành lớp học khẩu hình phóng đại âm ${lesson.phoneme}.`
      : `Bạn đã xem ${Math.round(completionRatio * 100)}% thời lượng lớp học. Hãy hoàn tất để làm chủ khẩu hình!`
  };
}
