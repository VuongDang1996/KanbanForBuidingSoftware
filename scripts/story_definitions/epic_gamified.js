export const gamifiedStories = [
  {
    id: 'GAME-101',
    epic_id: 'epic-gamified-3d',
    title: 'Multi-Tier Level Progression & 4-World Map Engine: Bản Đồ Phiêu Lưu Phát Âm Tuyến Tính 4 Thế Giới',
    persona: 'Người học trẻ tuổi (Gen Z, sinh viên đại học) dễ nản lòng khi học phát âm theo giáo trình truyền thống khô khan',
    action: 'khám phá bản đồ thế giới phiêu lưu 4 vùng đất (Đảo Nguyên Âm, Vịnh Âm Đuôi, Núi Trọng Âm, Đền Thờ Phản Xạ), vượt qua từng ải bài học để mở khóa màn chơi mới',
    value: 'duy trì động lực luyện tập hằng ngày thông qua lộ trình trực quan hóa dạng game RPG, tạo cảm giác chinh phục rõ rệt với cơ chế 3 sao và rương phần thưởng',
    priority: 'must',
    status: 'in-progress',
    size: 'L',
    points: 8,
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-game-101-progression',
        given: 'Người chơi hoàn thành ải 1 với điểm số phát âm từ 85% trở lên',
        when: 'Hệ thống tính điểm hoàn thành ải',
        then: 'Ải 1 được thưởng 3 sao vàng lấp lánh kèm hiệu ứng pháo hoa particle, đường mòn nối sang ải 2 phát sáng rực rỡ và mở khóa nút "Bắt đầu Ải 2" ngay lập tức mà không cần reload trang.',
        completed: true
      },
      {
        id: 'ac-game-101-frontend-design',
        given: 'Giao diện bản đồ thế giới phiêu lưu GamifiedView',
        when: 'Render trên màn hình máy tính hoặc điện thoại di động',
        then: 'Bản đồ hiển thị 4 quần xã sinh thái độc đáo (Biển ngọc, Thung lũng xanh, Núi lửa tím, Đền cổ vàng kim) theo phong cách Isometric mượt mà, các node ải có hoạt ảnh nhấp nhô floating 60fps, viền sao gradient, huy hiệu tiến độ % hoàn thành thế giới hiển thị rõ trên thanh header.',
        completed: true
      },
      {
        id: 'ac-game-101-backend-design',
        given: '5,000 người chơi đồng thời di chuyển trên bản đồ và mở khóa ải',
        when: 'Đồng bộ hóa dữ liệu tiến trình chơi game lên máy chủ',
        then: 'Dữ liệu tiến trình ải được lưu tức thời vào LocalStorage client-side và đồng bộ ngầm (optimistic update + debounced batch POST 5s) qua REST endpoint POST /api/v1/game/progress; Redis cache lưu giữ map layout static JSON với TTL 24h, P95 độ trễ truy vấn tiến độ < 80ms.',
        completed: true
      },
      {
        id: 'ac-game-101-l1-precision',
        given: 'Ải bài học thuộc Thế giới 2: Vịnh Âm Đuôi (Consonant Haven)',
        when: 'Người chơi mở chi tiết ải',
        then: 'Nhiệm vụ ải ghi rõ tiêu chuẩn diệt quái: "Vượt qua thử thách phân biệt âm cuối /t/ vs /d/ và /s/ vs /z/ của người Việt", kèm gợi ý mẹo rung thanh quản trước khi vào trận.',
        completed: true
      },
      {
        id: 'ac-game-101-a11y-fallback',
        given: 'Người dùng điều hướng bằng bàn phím hoặc công nghệ hỗ trợ',
        when: 'Dùng phím Tab hoặc mũi tên trên bàn phím',
        then: 'Focus outline màu hồng rose-500 nhảy mượt qua từng node ải, thông báo rõ ràng "Ải 3: Đã mở khóa - Đạt 2 trên 3 sao - Nhấn Enter để bắt đầu", hỗ trợ phím tắt số 1-4 để chuyển đổi nhanh giữa 4 thế giới.',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-game-101-fe-map', title: 'Xây dựng component GameMapCanvas.jsx hiển thị 4 thế giới sinh thái và các node ải kết nối bằng SVG Bezier curve', category: 'Frontend', completed: true },
      { id: 't-game-101-fe-sync', title: 'Triển khai cơ chế lưu tiến trình song song LocalStorage và REST sync API với cơ chế chống xung đột timestamp', category: 'Frontend', completed: true },
      { id: 't-game-101-be-cache', title: 'Thiết lập Redis hash user_game_progress_5000_v1 cho 5,000 active users với tốc độ đọc < 5ms', category: 'Backend', completed: true },
      { id: 't-game-101-be-db', title: 'Thiết kế bảng game_progressions và map_levels trong PostgreSQL với compound index', category: 'Backend', completed: true },
      { id: 't-game-101-qa', title: 'Viết bộ kiểm thử tự động kiểm tra logic mở khóa tuần tự 40 ải và xử lý ngoại lệ mất mạng khi đang chơi', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 FRONTEND DESIGN SPECIFICATION
- **Component File**: \`vietphonics-app/src/views/GamifiedView.jsx\`
- **Component Hierarchy**:
  \`\`\`
  <GamifiedView currentWorld={activeWorld}>
    <WorldNavigationHeader worlds={worldCatalog} activeWorld={activeWorld} onSelectWorld={setActiveWorld} />
    <GameMapCanvas worldId={activeWorld.id}>
      <PathSvgCurve nodes={activeWorld.nodes} />
      {activeWorld.nodes.map(node => (
        <LevelNodeMarker
          key={node.id}
          status={node.status} // 'locked' | 'unlocked' | 'mastered'
          stars={node.stars}
          onClick={() => handleStartLevel(node)}
        />
      ))}
    </GameMapCanvas>
    <PlayerStatsFloatBar xp={userXp} streak={userStreak} phonicsGems={gems} />
  </GamifiedView>
  \`\`\`
- **Stitch Design Tokens**:
  - World 1: Emerald \`#10b981\`, World 2: Sky \`#0ea5e9\`, World 3: Rose \`#f43f5e\`, World 4: Amber \`#fbbf24\`
  - Node Unlocked: \`w-16 h-16 rounded-3xl bg-white text-slate-900 font-black text-xl shadow-[0_10px_25px_rgba(0,0,0,0.3)] border-4 border-amber-400 hover:scale-110 transition-all cursor-pointer\`
  - Node Locked: \`w-16 h-16 rounded-3xl bg-slate-800 text-slate-500 border-2 border-slate-700 opacity-60 flex items-center justify-center\`.

---

### 🗄️ BACKEND DESIGN SPECIFICATION
- **REST API Endpoint**:
  \`\`\`http
  POST /api/v1/game/progress
  Authorization: Bearer <JWT>
  Content-Type: application/json

  Request Body:
  {
    "userId": "usr_99a8b12f",
    "levelId": "lvl_w2_03",
    "starsEarned": 3,
    "scorePercent": 92.5,
    "completedAt": "2026-10-03T15:20:00Z"
  }

  Response 200 OK:
  {
    "success": true,
    "unlockedNextLevelId": "lvl_w2_04",
    "bonusXp": 120,
    "totalGems": 450,
    "unlockedPerk": null
  }
  \`\`\`
- **Database Schema**:
  \`\`\`sql
  CREATE TABLE user_game_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    world_id VARCHAR(30) NOT NULL,
    level_id VARCHAR(30) NOT NULL,
    stars INT NOT NULL CHECK (stars BETWEEN 0 AND 3),
    high_score NUMERIC(5, 2) NOT NULL DEFAULT 0.0,
    is_completed BOOLEAN NOT NULL DEFAULT FALSE,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_user_level UNIQUE(user_id, level_id)
  );
  \`\`\`
- **High Concurrency (5,000 Users)**:
  - Tiến trình game được nạp sẵn vào Redis in-memory cache \`user:game_progress:{userId}\`.
  - Batching update định kỳ 5 giây/lần giảm 80% tải ghi database.`
  },
  {
    id: 'GAME-102',
    epic_id: 'epic-gamified-3d',
    title: 'Dual Voice Controller: Real-Time Web Speech Microphone & Fallback Simulation: Bộ Điều Khiển Giọng Nói Kép Cho Game',
    persona: 'Người chơi tham gia chế độ chơi phát âm trong mọi hoàn cảnh (phòng yên tĩnh có mic, hoặc môi trường công cộng ồn ào)',
    action: 'kích hoạt micro để tung chiêu thức bằng giọng nói chuẩn, hoặc chuyển đổi mượt sang chế độ mô phỏng âm thanh kiểm thử (Dev/Simulator Mode) khi môi trường không tiện nói to',
    value: 'đảm bảo trải nghiệm chơi game không bao giờ bị gián đoạn vì lỗi phần cứng micro hoặc tiếng ồn xung quanh, tăng tính khả dụng 100% trong mọi kịch bản thực tế',
    priority: 'must',
    status: 'in-progress',
    size: 'M',
    points: 5,
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-game-102-dual-input',
        given: 'Người chơi đang trong trận chiến phát âm',
        when: 'Người chơi nói từ khóa hiển thị vào micro hoặc bấm nút mô phỏng "Test Cast Spell"',
        then: 'Hệ thống nhận diện phát âm thời gian thực với độ trễ phản hồi dưới 120ms, hiển thị thanh năng lượng âm thanh (RMS Energy Gauge) và kích hoạt hiệu ứng tung chiêu thức đánh quái vật.',
        completed: true
      },
      {
        id: 'ac-game-102-frontend-design',
        given: 'Giao diện bảng điều khiển âm thanh game HUD',
        when: 'Micro bắt đầu thu âm',
        then: 'Nút micro tròn trung tâm tỏa sóng radar gradient Rose-Sky, đồng hồ đo decibel dB thời gian thực nhảy múa sống động, hiển thị trạng thái "Đang lắng nghe: Hãy nói rõ âm /t/!" với font chữ JetBrains Mono hiển thị độ trễ latency 18ms.',
        completed: true
      },
      {
        id: 'ac-game-102-backend-design',
        given: '5,000 phiên thu âm diễn ra đồng thời trong các màn chơi game',
        when: 'Xử lý nhận diện và phân tích tín hiệu giọng nói',
        then: 'Toàn bộ việc nhận diện từ khóa và trích xuất đặc trưng âm thanh được xử lý cục bộ trên trình duyệt thông qua Web Speech API SpeechRecognition và Web Audio AnalyserNode, máy chủ backend chịu tải 0% CPU cho việc xử lý âm thanh thời gian thực của game.',
        completed: true
      },
      {
        id: 'ac-game-102-l1-precision',
        given: 'Người chơi phát âm từ "cat" nhưng nói thành "cát" (thiếu âm bật hơi /t/)',
        when: 'Bộ phân tích kiểm tra đặc trưng âm học',
        then: 'Chiêu thức bắn ra bị giảm 50% sát thương (Glancing Hit), trên màn hình hiển thị lời nhắc chiến thuật: "Thiếu âm đuôi /t/! Bật đầu lưỡi vào vòm họng để tung đòn chí mạng (Critical Hit)!".',
        completed: true
      },
      {
        id: 'ac-game-102-a11y-fallback',
        given: 'Người chơi bị khiếm thính hoặc gặp lỗi cấp quyền micro',
        when: 'Trình duyệt từ chối quyền truy cập micro',
        then: 'Hệ thống hiển thị banner lịch sự kèm nút chuyển ngay sang chế độ "Bàn phím + Máy tạo âm ảo (Voice Synthesizer Fallback)" cho phép chơi game luyện mắt và nhận diện ngữ âm mà không bị khóa tính năng.',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-game-102-fe-audio', title: 'Tích hợp Web Audio API AnalyserNode tính toán RMS decibel và Pitch trực tiếp trên AudioContext', category: 'Audio/DSP', completed: true },
      { id: 't-game-102-fe-hook', title: 'Xây dựng hook useGameSpeechRecognition với khả năng tự phục hồi (auto-reconnect) khi Web Speech API bị drop', category: 'Frontend', completed: true },
      { id: 't-game-102-fe-sim', title: 'Phát triển bộ giả lập VoiceSimulator phát sóng sine và gửi mock transcript hỗ trợ kiểm thử không cần micro', category: 'Frontend', completed: true },
      { id: 't-game-102-be-arch', title: 'Thiết kế kiến trúc Client-First DSP loại bỏ hoàn toàn gánh nặng streaming âm thanh thô lên server cho 5,000 user', category: 'DevOps/Scale', completed: true },
      { id: 't-game-102-qa', title: 'Kiểm thử khả năng chịu lỗi khi người dùng cắm/rút tai nghe hoặc đổi thiết bị thu âm giữa trận đánh', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 FRONTEND DESIGN SPECIFICATION
- **Component File**: \`vietphonics-app/src/components/game/VoiceController.jsx\`
- **Stitch Design Tokens**:
  - Voice HUD Container: \`bg-slate-900/90 border border-slate-800 rounded-3xl p-4 flex items-center justify-between shadow-2xl\`
  - RMS Meter: \`h-2 rounded-full bg-slate-800\`, Active Fill: \`bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-500\`
  - Latency Badge: \`font-mono text-xs text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/30\`.

---

### 🗄️ BACKEND DESIGN SPECIFICATION
- **Client-First Edge Architecture**:
  - Không cần gửi streaming audio lên server; 100% DSP tính trên client AudioContext.
  - Chỉ gửi telemetry định kỳ: \`POST /api/v1/telemetry/game-audio\` (batching 30s) kiểm tra tỷ lệ lỗi micro.`
  },
  {
    id: 'GAME-103',
    epic_id: 'epic-gamified-3d',
    title: 'Auditory Discrimination Boss Arenas & Turn-Based Minimal Pair Counter-Spells: Đấu Trường Trùm Phân Biệt Cặp Âm Tối Thiểu',
    persona: 'Học viên đã học lý thuyết các cặp âm dễ nhầm lẫn nhưng hay mất tập trung và phản xạ chậm trong giao tiếp thực tế',
    action: 'đối đầu với các Boss Quái Thú Ngữ Âm (The Final-T Titan, The Schwa Dragon, The Vowel Chimera) theo cơ chế chiến đấu theo lượt (Turn-based RPG), nghe âm thanh trùm tung ra và chọn thần chú phản đòn chính xác',
    value: 'biến bài tập phân biệt cặp âm tối thiểu (minimal pairs e.g., ship/sheep, bad/bed) thành trải nghiệm kịch tính nghẹt thở, rèn luyện đôi tai nhạy bén tuyệt đối chỉ trong 5 phút chơi',
    priority: 'must',
    status: 'in-progress',
    size: 'L',
    points: 8,
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-game-103-boss-combat',
        given: 'Người chơi đối đầu với Boss "The Final-T Titan" (100 HP)',
        when: 'Trùm chuẩn bị tung chiêu búa sét và phát ra âm thanh thử thách e.g. "beat" (/biːt/)',
        then: 'Màn hình hiển thị 2 thẻ bài thần chú phản đòn: [1] "bit" (/bɪt/) vs [2] "beat" (/biːt/); người chơi chọn đúng "beat" trong vòng 3.5 giây sẽ tung đòn phản công gây 35 sát thương và làm choáng Boss.',
        completed: true
      },
      {
        id: 'ac-game-103-frontend-design',
        given: 'Giao diện đấu trường Boss Arena View',
        when: 'Trận chiến bắt đầu',
        then: 'Thanh máu Boss hoành tráng đỏ rực rỡ có hiệu ứng rung lắc (screen shake) khi nhận sát thương, nhân vật người chơi hiển thị thanh mana xanh lam, thẻ bài ma thuật có viền kính mờ glassmorphism bo tròn 16px và âm thanh vung kiếm/bắn phép chân thực.',
        completed: true
      },
      {
        id: 'ac-game-103-backend-design',
        given: 'Hàng ngàn trận Boss diễn ra đồng thời trong giờ cao điểm',
        when: 'Hệ thống tải tài nguyên âm thanh và hoạt ảnh trận đánh',
        then: 'Toàn bộ âm thanh trận đánh (tiếng trùm gầm, tiếng phép thuật, mẫu phát âm bản ngữ HD) được nén chuẩn Opus bitrate 48kbps và nạp sẵn vào trình duyệt qua HTML5 Audio Buffer Cache, không phát sinh bất kỳ yêu cầu mạng nào giữa trận đánh.',
        completed: true
      },
      {
        id: 'ac-game-103-l1-precision',
        given: 'Cặp âm đối kháng nhắm vào lỗi phổ biến nhất của người Việt',
        when: 'Trùm tung chiêu cặp âm /iː/ (căng) vs /ɪ/ (chùng) hoặc /s/ vs /ʃ/',
        then: 'Hệ thống hiển thị kính lúp âm học giải thích ngay sau mỗi lượt đánh: "Từ vừa nghe có nguyên âm dài /iː/ kéo dài 220ms, miệng kéo bè sang hai bên như đang mỉm cười".',
        completed: true
      },
      {
        id: 'ac-game-103-a11y-fallback',
        given: 'Người chơi sử dụng phím số để chọn bài',
        when: 'Bấm phím 1 hoặc 2 trên bàn phím',
        then: 'Hệ thống nhận diện phím bấm ngay lập tức mà không cần di chuột, hỗ trợ chế độ làm chậm nhịp độ trận đấu (Slow-Motion Combat Mode) cho người mới bắt đầu.',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-game-103-fe-arena', title: 'Xây dựng component BossArenaView.jsx với hệ thống animation thanh máu, rung màn hình (shake effect) và thẻ bài ma thuật', category: 'Frontend', completed: true },
      { id: 't-game-103-fe-audio', title: 'Tiền tải (Preload) toàn bộ ngân hàng âm thanh cặp từ tối thiểu Minimal Pairs Audio Kit với Web Audio API', category: 'Audio/DSP', completed: true },
      { id: 't-game-103-be-boss', title: 'Xây dựng State Machine và catalog dữ liệu 10 Boss ngữ âm trong cơ sở dữ liệu', category: 'Backend', completed: true },
      { id: 't-game-103-be-cdn', title: 'Triển khai nén audio Opus 48kbps và Cloudflare R2 cache rules giúp phục vụ 5,000 trận Boss cùng lúc với băng thông tối thiểu', category: 'DevOps/Scale', completed: true },
      { id: 't-game-103-qa', title: 'Kiểm thử cân bằng độ khó (game balancing) cho 3 Boss đầu tiên đảm bảo tỷ lệ vượt ải lần đầu đạt 65-75%', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 FRONTEND DESIGN SPECIFICATION
- **Component File**: \`vietphonics-app/src/views/BossArenaView.jsx\`
- **Stitch Design Tokens**:
  - Boss HP Bar: \`h-5 rounded-full bg-slate-950 border border-slate-700 overflow-hidden\`, Fill: \`bg-gradient-to-r from-rose-600 to-amber-500 transition-all duration-300\`
  - Spell Card: \`p-5 rounded-2xl bg-slate-900/80 border-2 border-indigo-500/50 hover:border-indigo-400 backdrop-blur-md shadow-xl cursor-pointer active:scale-95\`.

---

### 🗄️ BACKEND DESIGN SPECIFICATION
- **REST API Endpoint**:
  \`\`\`http
  POST /api/v1/game/boss-battle-result
  Authorization: Bearer <JWT>
  Content-Type: application/json

  Request Body:
  {
    "bossId": "boss_final_t_titan",
    "victory": true,
    "damageDealt": 105,
    "accuracyPercent": 88.0,
    "durationSec": 125
  }

  Response 200 OK:
  {
    "bossDefeated": true,
    "trophyEarned": "trophy_titan_slayer",
    "xpAwarded": 250,
    "leaderboardRank": 14
  }
  \`\`\``
  },
  {
    id: 'GAME-104',
    epic_id: 'epic-gamified-3d',
    title: 'Zero-Latency Web Audio API Sound Synthesizer & 3D Isometric Combat Canvas: Bộ Tổng Hợp Âm Thanh Không Độ Trễ & Đồ Họa Đẳng Cự 60 FPS',
    persona: 'Người dùng chơi game trên máy tính cấu hình khiêm tốn hoặc trình duyệt di động đòi hỏi hiệu năng cao và âm thanh sống động',
    action: 'trải nghiệm các hiệu ứng âm thanh sống động (tiếng chém kiếm, tiếng thu thập tiền vàng, tiếng nổ phép thuật) được tổng hợp trực tiếp bằng thuật toán toán học mà không tốn dung lượng tải file',
    value: 'đạt tốc độ khởi động game tức thì (Zero Asset Download Time), giảm thiểu 95% băng thông mạng cho máy chủ và loại bỏ độ trễ âm thanh thường thấy của thẻ HTML5 Audio',
    priority: 'should',
    status: 'in-progress',
    size: 'M',
    points: 5,
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-game-104-synth',
        given: 'Người chơi gây sát thương hoặc nhặt sao may mắn',
        when: 'Hàm phát âm thanh game triggerAudioFX(type) được gọi',
        then: 'Hệ thống dùng AudioContext.createOscillator() và GainNode để tổng hợp sóng vuông/sóng sine với envelope ADSR tùy chỉnh trong vòng 0ms, phát ra tiếng bip-bop retro 8-bit hoặc chimes ma thuật trong trẻo.',
        completed: true
      },
      {
        id: 'ac-game-104-frontend-design',
        given: 'Khung canvas đồ họa trận đánh 3D Isometric',
        when: 'Render liên tục bằng requestAnimationFrame',
        then: 'Khung hình duy trì ổn định 60 khung hình/giây (60 FPS), các hạt particle sao vàng bay tỏa ra từ mục tiêu và rơi xuống mượt mà không gây giật lag hay rò rỉ bộ nhớ (zero memory leak).',
        completed: true
      },
      {
        id: 'ac-game-104-backend-design',
        given: '5,000 phiên canvas chạy đồng thời trên hàng ngàn trình duyệt học viên',
        when: 'Kiểm tra tài nguyên máy chủ và tải CPU máy khách',
        then: 'Tài nguyên mạng backend tiêu thụ = 0 KB nhờ tạo âm thanh thủ tục (procedural synthesis); client CPU duy trì dưới 12% trên chip Intel Core i3 / Snapdragon 680 tầm trung.',
        completed: true
      },
      {
        id: 'ac-game-104-l1-precision',
        given: 'Âm thanh phản hồi khi học viên phát âm đúng trọng âm tiếng Anh',
        when: 'Hệ thống phát tín hiệu thành công',
        then: 'Âm sắc tổng hợp có tần số cao vút mô phỏng sự vươn cao của cao độ trọng âm (High Pitch Rise), củng cố nhận thức giác quan về bản chất ngữ điệu tiếng Anh.',
        completed: true
      },
      {
        id: 'ac-game-104-a11y-fallback',
        given: 'Người chơi bị nhạy cảm ánh sáng (photosensitive) hoặc muốn tắt âm thanh',
        when: 'Bật toggle "Chế độ giảm hiệu ứng (Reduced Motion)" hoặc "Tắt tiếng SFX"',
        then: 'Hệ thống tắt toàn bộ hạt nổ chớp sáng và ngắt audio context ngay lập tức, tuân thủ tiêu chuẩn WCAG 2.1 AAA.',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-game-104-fe-synth', title: 'Xây dựng module SoundSynthesizer.js sử dụng Web Audio API OscillatorNode cho 8 loại hiệu ứng game SFX', category: 'Audio/DSP', completed: true },
      { id: 't-game-104-fe-canvas', title: 'Tối ưu hóa vòng lặp render Isometric Canvas với cơ chế Object Pooling tái sử dụng mảng Particle', category: 'Frontend', completed: true },
      { id: 't-game-104-fe-safari', title: 'Xử lý chính sách âm thanh autoplay và mở khóa AudioContext trên Safari iOS khi người dùng chạm màn hình lần đầu', category: 'Frontend', completed: true },
      { id: 't-game-104-be-zero', title: 'Đo kiểm benchmark hiệu năng đảm bảo không tiêu tốn băng thông CDN cho asset âm thanh hiệu ứng', category: 'DevOps/Scale', completed: true },
      { id: 't-game-104-qa', title: 'Kiểm thử stress-test chạy 200 lượt phát âm thanh dồn dập không làm nghẽn luồng UI chính (Main Thread)', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 FRONTEND DESIGN SPECIFICATION
- **Component File**: \`vietphonics-app/src/utils/soundEffects.js\`
- **Procedural Sound Engine**:
  \`\`\`javascript
  export function playSynthSfx(type) {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    if (type === 'hit') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.4, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.12);
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    }
  }
  \`\`\`
- **Zero Server Overhead**: 0 byte audio SFX asset downloads.`
  },
  {
    id: 'GAME-105',
    epic_id: 'epic-gamified-3d',
    title: 'RPG Equipment Inventory, Perk System & University Leaderboard Ranks: Túi Đồ Trang Bị, Kỹ Năng Bổ Trợ & Bảng Xếp Hạng Trường Đại Học',
    persona: 'Sinh viên các trường đại học tại Việt Nam (Bách Khoa, Ngoại Thương, Kinh Tế...) có tính cạnh tranh cao và tinh thần màu cờ sắc áo',
    action: 'trang bị các vật phẩm RPG (Khiên Đóng Băng Chuỗi, Đũa Phép Bật Âm, Tai Nghe Vàng) và tích lũy điểm kinh nghiệm XP để đưa trường đại học của mình lên top 1 bảng xếp hạng',
    value: 'kích hoạt hiệu ứng tâm lý thi đua lành mạnh và lòng tự hào trường học, tạo ra động lực nội tại mạnh mẽ giúp học viên vào app luyện nói mỗi ngày',
    priority: 'should',
    status: 'in-progress',
    size: 'L',
    points: 8,
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-game-105-inventory',
        given: 'Người chơi tích lũy đủ 500 Kim Cương Phonics trong game',
        when: 'Người chơi mở Cửa Hàng Trang Bị và mua "Khiên Bảo Vệ Chuỗi Luyện Tập (Streak Freeze Shield)"',
        then: 'Vật phẩm xuất hiện trong Túi Đồ (Inventory) với biểu tượng khiên băng 3D phát sáng, sẵn sàng tự động kích hoạt bảo vệ nếu người chơi quên luyện tập 1 ngày.',
        completed: true
      },
      {
        id: 'ac-game-105-frontend-design',
        given: 'Giao diện Bảng Xếp Hạng Liên Trường (University Leaderboard View)',
        when: 'Mở tab Bảng Xếp Hạng',
        then: 'Top 3 trường đại học dẫn đầu hiển thị trên bục vinh quang 3D hoành tráng (Hạng 1: Vàng kim rực rỡ, Hạng 2: Bạc lấp lánh, Hạng 3: Đồng cổ điển), logo các trường đại học lớn tại Việt Nam hiển thị sắc nét, thanh tiến độ điểm trường của người dùng được ghim cố định ở đáy màn hình.',
        completed: true
      },
      {
        id: 'ac-game-105-backend-design',
        given: '5,000 học viên liên tục ghi điểm XP từ các bài luyện phát âm',
        when: 'Cập nhật bảng xếp hạng trường học và cá nhân theo thời gian thực',
        then: 'Sử dụng cấu trúc dữ liệu Redis Sorted Sets (ZADD, ZREVRANGEBYSCORE) với độ phức tạp thuật toán O(log(N)), đảm bảo tính toán thứ hạng cho 5,000 học viên và 100 trường học trong thời gian dưới 20ms mà không gây nghẽn database PostgreSQL chính.',
        completed: true
      },
      {
        id: 'ac-game-105-l1-precision',
        given: 'Trang bị vật phẩm "Kính Lúp Cấu Âm (Phoneme Lens)"',
        when: 'Người chơi vào các bài luyện âm khó như /θ/ hay /ð/',
        then: 'Túi đồ tự động kích hoạt Perk đặc biệt: Làm chậm tốc độ mẫu phát âm của người bản ngữ 20% và phóng to hình ảnh khẩu hình lưỡi đặt giữa hai hàm răng.',
        completed: true
      },
      {
        id: 'ac-game-105-a11y-fallback',
        given: 'Người dùng tra cứu vị trí thứ hạng của mình',
        when: 'Sử dụng trình đọc màn hình TalkBack/NVDA',
        then: 'Hệ thống đọc rõ: "Bạn đang xếp hạng 14 trên 5,000 sinh viên Đại học Bách Khoa Hà Nội, cần thêm 120 điểm XP để lên hạng 13".',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-game-105-fe-board', title: 'Xây dựng giao diện LeaderboardView với bục vinh quang Podium Top 3 và danh sách bảng xếp hạng liên trường', category: 'Frontend', completed: true },
      { id: 't-game-105-fe-store', title: 'Thiết kế hệ thống Inventory và Perk Store với Modal mua đồ và trang bị vật phẩm trực quan', category: 'Frontend', completed: true },
      { id: 't-game-105-be-redis', title: 'Triển khai Redis Sorted Sets leaderboard service cho 5,000 users với background cron sync về PostgreSQL mỗi 5 phút', category: 'Backend', completed: true },
      { id: 't-game-105-be-db', title: 'Thiết kế bảng user_inventories và university_rankings trong PostgreSQL', category: 'Backend', completed: true },
      { id: 't-game-105-qa', title: 'Kiểm thử kịch bản đồng thời 500 sinh viên nộp điểm XP cùng lúc xem bảng xếp hạng có cập nhật chính xác', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 FRONTEND DESIGN SPECIFICATION
- **Component File**: \`vietphonics-app/src/views/LeaderboardView.jsx\`
- **Stitch Design Tokens**:
  - Podium Rank 1: \`h-36 bg-gradient-to-t from-amber-500 to-yellow-400 text-slate-950 font-black rounded-t-3xl shadow-[0_0_35px_rgba(245,158,11,0.5)] flex flex-col items-center justify-end p-4\`
  - Podium Rank 2: \`h-28 bg-gradient-to-t from-slate-400 to-slate-200 text-slate-950 font-bold rounded-t-3xl flex flex-col items-center justify-end p-4\`
  - Podium Rank 3: \`h-24 bg-gradient-to-t from-amber-800 to-amber-700 text-white font-bold rounded-t-3xl flex flex-col items-center justify-end p-4\`.

---

### 🗄️ BACKEND DESIGN SPECIFICATION
- **REST API Endpoint**:
  \`\`\`http
  GET /api/v1/leaderboard/university?limit=10
  Authorization: Bearer <JWT>

  Response 200 OK:
  {
    "myRank": 14,
    "myUniversity": "Đại Học Bách Khoa Hà Nội",
    "topUniversities": [
      { "rank": 1, "name": "ĐH Bách Khoa Hà Nội", "totalXp": 482900, "activeStudents": 820 },
      { "rank": 2, "name": "ĐH Ngoại Thương FTU", "totalXp": 421500, "activeStudents": 690 },
      { "rank": 3, "name": "ĐH Kinh Tế Quốc Dân NEU", "totalXp": 389000, "activeStudents": 550 }
    ]
  }
  \`\`\`
- **High Concurrency (5,000 Users)**:
  - Redis Commands: \`ZINCRBY leaderboard:uni:weekly 50 "HUST"\`, \`ZREVRANGE leaderboard:uni:weekly 0 9 WITHSCORES\` chạy O(log N) < 2ms.`
  }
];
