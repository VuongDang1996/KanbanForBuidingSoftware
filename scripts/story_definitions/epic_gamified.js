export const gamifiedStories = [
  {
    id: 'GAME-101',
    epic_id: 'epic-gamified-3d',
    title: 'Multi-Tier Level Progression & 4-World Map Engine: Bản Đồ Phiêu Lưu Phát Âm Tuyến Tính 4 Thế Giới',
    persona: 'Người học trẻ tuổi (Gen Z, sinh viên đại học) dễ nản lòng khi học phát âm theo giáo trình truyền thống khô khan',
    action: 'khám phá bản đồ thế giới phiêu lưu 4 vùng đất (Đảo Nguyên Âm, Vịnh Âm Đuôi, Núi Trọng Âm, Đền Thờ Phản Xạ), vượt qua từng ải bài học để mở khóa màn chơi mới',
    value: 'duy trì động lực luyện tập hằng ngày thông qua lộ trình trực quan hóa dạng game RPG, tạo cảm giác chinh phục rõ rệt với cơ chế 3 sao và rương phần thưởng',
    priority: 'must',
    status: 'done',
    size: 'L',
    points: 8,
    uiMockupUrl: '/src/ui-reference/game_3d_rpg_chi_n_luy_n_ph_t_m_light_mode/code.html',
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-game-101-3star-unlock',
        given: 'Người chơi hoàn thành ải bài học với điểm số ≥85%',
        when: 'Hệ thống tính điểm hoàn tất',
        then: 'Ải được trao 3 sao vàng lấp lánh kèm hiệu ứng pháo hoa particle, con đường dẫn sang ải tiếp theo phát sáng rực rỡ và mở khóa nút "Bắt đầu Ải kế".',
        completed: true
      },
      {
        id: 'ac-game-101-four-biomes-canvas',
        given: 'Giao diện bản đồ thế giới phiêu lưu GamifiedView',
        when: 'Render trên màn hình máy tính hoặc điện thoại',
        then: 'Bản đồ hiển thị 4 quần xã sinh thái độc đáo (Biển ngọc, Thung lũng xanh, Núi lửa tím, Đền cổ vàng kim) theo phong cách Isometric mượt mà 60 FPS, các node ải có hoạt ảnh nhấp nhô floating.',
        completed: true
      },
      {
        id: 'ac-game-101-node-preview-modal',
        given: 'Người chơi click vào một node ải đã mở khóa',
        when: 'Hộp thoại chi tiết ải mở ra',
        then: 'Hiển thị mục tiêu âm vị (ví dụ: /t/ vs /d/), quái thú trấn giữ ải và phần thưởng Kim Cương Phonics khi hoàn thành.',
        completed: true
      },
      {
        id: 'ac-game-101-keyboard-world-switch',
        given: 'Người chơi sử dụng phím tắt trên bàn phím',
        when: 'Bấm các phím số 1, 2, 3, 4',
        then: 'Camera trên bản đồ lướt mượt mà chuyển đổi qua lại giữa 4 thế giới mà không bị giật khung hình.',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-game-101-fe-map', title: 'Xây dựng component GameMapCanvas.jsx hiển thị 4 thế giới sinh thái và các node ải kết nối bằng SVG Bezier curve', category: 'Frontend', completed: true },
      { id: 't-game-101-fe-floating', title: 'Thiết kế hiệu ứng floating animation và particle pháo hoa khi mở khóa ải mới', category: 'Frontend', completed: true },
      { id: 't-game-101-fe-storage', title: 'Lưu trữ tiến trình chơi game tức thời vào LocalStorage client-side', category: 'Frontend', completed: true },
      { id: 't-game-101-qa', title: 'Kiểm thử logic mở khóa tuần tự 40 ải và xử lý ngoại lệ mất mạng khi đang chơi', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 PURE FRONTEND DESIGN SPECIFICATION
- **Phân loại**: Pure Frontend Isometric Map & Canvas Progression
- **UI Mockup**: \`vietphonics-app/src/ui-reference/game_3d_rpg_chi_n_luy_n_ph_t_m_light_mode/code.html\`
- **Frontend Component**: \`vietphonics-app/src/views/GamifiedView.jsx\`

#### 📐 Isometric Map Architecture
\`\`\`
+-------------------------------------------------------------+
| [Thế Giới 1: Đảo Nguyên Âm] -> [Thế Giới 2: Vịnh Âm Đuôi]...|
+-------------------------------------------------------------+
|        (Ải 3: ★★★)                                          |
|            \                                                |
|             \--- (Ải 4: ★★☆)                                |
|                      \                                      |
|                       \--- [🔒 Boss Vịnh Âm Đuôi]           |
+-------------------------------------------------------------+
| [💎 450 Gems]  [🔥 Streak: 7 Ngày]  [⚡ Level 5 Adventurer]   |
+-------------------------------------------------------------+
\`\`\`

#### 🎨 Design Tokens
- **Node Unlocked**: \`w-16 h-16 rounded-3xl bg-white text-slate-900 font-black text-xl shadow-[0_10px_25px_rgba(0,0,0,0.3)] border-4 border-amber-400 hover:scale-110 transition-all cursor-pointer flex items-center justify-center\`.
- **Node Locked**: \`w-16 h-16 rounded-3xl bg-slate-800 text-slate-500 border-2 border-slate-700 opacity-60 flex items-center justify-center\`.`
  },
  {
    id: 'GAME-102',
    epic_id: 'epic-gamified-3d',
    title: 'Dual Voice Controller: Real-Time Web Speech Microphone & Fallback Simulation: Bộ Điều Khiển Giọng Nói Kép Cho Game',
    persona: 'Người chơi tham gia chế độ chơi phát âm trong mọi hoàn cảnh (phòng yên tĩnh có mic, hoặc môi trường công cộng ồn ào)',
    action: 'kích hoạt micro để tung chiêu thức bằng giọng nói chuẩn, hoặc chuyển đổi mượt sang chế độ mô phỏng âm thanh kiểm thử (Dev/Simulator Mode) khi môi trường không tiện nói to',
    value: 'đảm bảo trải nghiệm chơi game không bao giờ bị gián đoạn vì lỗi phần cứng micro hoặc tiếng ồn xung quanh, tăng tính khả dụng 100% trong mọi kịch bản thực tế',
    priority: 'must',
    status: 'done',
    size: 'M',
    points: 5,
    uiMockupUrl: '/src/ui-reference/game_3d_rpg_chi_n_luy_n_ph_t_m_light_mode/code.html',
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-game-102-realtime-voice-hud',
        given: 'Người chơi đang trong trận chiến phát âm',
        when: 'Micro bắt đầu nhận âm thanh',
        then: 'Nút micro tròn trung tâm tỏa sóng radar gradient Rose-Sky, đồng hồ đo decibel dB thời gian thực nhảy múa sống động kèm độ trễ dưới 25ms.',
        completed: true
      },
      {
        id: 'ac-game-102-voice-spell-attack',
        given: 'Từ khóa mục tiêu hiển thị (ví dụ "contact")',
        when: 'Người chơi nói đúng từ vào micro',
        then: 'Hệ thống nhận diện tức thời và kích hoạt chiêu thức tấn công tung đòn chí mạng (Critical Strike) vào quái vật.',
        completed: true
      },
      {
        id: 'ac-game-102-dev-simulator-fallback',
        given: 'Người chơi ở nơi công cộng ồn ào hoặc trình duyệt không hỗ trợ Web Speech',
        when: 'Bật chế độ "Giả Lập Giọng Nói (Dev / Simulator Mode)"',
        then: 'Xuất hiện phím bấm "Test Cast Spell" mô phỏng việc phát âm đạt chuẩn để người chơi tiếp tục cốt truyện game mà không bị chặn.',
        completed: true
      },
      {
        id: 'ac-game-102-auto-reconnect-loop',
        given: 'Web Speech API bị ngắt kết nối do khoảng lặng kéo dài',
        when: 'Sự kiện onend kích hoạt',
        then: 'Hệ thống tự động khởi tạo lại phiên nhận diện (Auto-Reconnect Loop) mà không yêu cầu người dùng phải bấm lại nút mic.',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-game-102-fe-audio', title: 'Tích hợp Web Audio API AnalyserNode tính toán RMS decibel và Pitch trực tiếp trên AudioContext', category: 'Audio/DSP', completed: true },
      { id: 't-game-102-fe-hook', title: 'Xây dựng hook useGameSpeechRecognition với khả năng tự phục hồi (auto-reconnect)', category: 'Frontend', completed: true },
      { id: 't-game-102-fe-sim', title: 'Phát triển bộ giả lập VoiceSimulator hỗ trợ kiểm thử không cần micro', category: 'Frontend', completed: true },
      { id: 't-game-102-qa', title: 'Kiểm thử khả năng chịu lỗi khi người dùng cắm/rút tai nghe trong trận đánh', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 PURE FRONTEND DESIGN SPECIFICATION
- **Phân loại**: Pure Frontend Audio & Speech Controller
- **UI Mockup**: \`vietphonics-app/src/ui-reference/game_3d_rpg_chi_n_luy_n_ph_t_m_light_mode/code.html\`
- **Frontend Component**: \`vietphonics-app/src/components/game/VoiceController.jsx\`

#### 🎨 Voice HUD Design Tokens
- **Voice HUD Container**: \`bg-slate-900/90 border border-slate-800 rounded-3xl p-4 flex items-center justify-between shadow-2xl\`.
- **RMS Energy Meter**: \`h-2 rounded-full bg-slate-800\`, Active Fill: \`bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-500\`.
- **Latency Badge**: \`font-mono text-xs text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/30\`.`
  },
  {
    id: 'GAME-103',
    epic_id: 'epic-gamified-3d',
    title: 'Auditory Discrimination Boss Arenas & Turn-Based Minimal Pair Counter-Spells: Đấu Trường Trùm Phân Biệt Cặp Âm Tối Thiểu',
    persona: 'Học viên đã học lý thuyết các cặp âm dễ nhầm lẫn nhưng hay mất tập trung và phản xạ chậm trong giao tiếp thực tế',
    action: 'đối đầu với các Boss Quái Thú Ngữ Âm (The Final-T Titan, The Schwa Dragon, The Vowel Chimera) theo cơ chế chiến đấu theo lượt (Turn-based RPG), nghe âm thanh trùm tung ra và chọn thần chú phản đòn chính xác',
    value: 'biến bài tập phân biệt cặp âm tối thiểu (minimal pairs e.g., ship/sheep, bad/bed) thành trải nghiệm kịch tính nghẹt thở, rèn luyện đôi tai nhạy bén tuyệt đối chỉ trong 5 phút chơi',
    priority: 'must',
    status: 'done',
    size: 'L',
    points: 8,
    uiMockupUrl: '/src/ui-reference/game_3d_rpg_chi_n_luy_n_ph_t_m_light_mode/code.html',
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-game-103-boss-hp-shake',
        given: 'Người chơi đối đầu với Boss "The Final-T Titan" (100 HP)',
        when: 'Người chơi chọn đúng thần chú phản đòn',
        then: 'Thanh máu Boss sụt giảm 35 HP kèm hoạt ảnh rung lắc màn hình (Screen Shake) và âm thanh vung gươm chân thực.',
        completed: true
      },
      {
        id: 'ac-game-103-turn-based-counterspells',
        given: 'Boss tung đòn và phát ra âm thanh thử thách (ví dụ "beat" /biːt/)',
        when: 'Màn hình hiển thị 2 thẻ bài phản đòn [1] "bit" vs [2] "beat"',
        then: 'Người chơi có 3.5 giây đếm ngược để chọn thẻ bài tương ứng; chọn đúng sẽ phản đòn, chọn sai Boss sẽ gây sát thương vào người chơi.',
        completed: true
      },
      {
        id: 'ac-game-103-l1-acoustic-magnifier',
        given: 'Người chơi chọn nhầm từ ngắn sang từ dài',
        when: 'Lượt đánh kết thúc',
        then: 'Kính lúp âm học hiển thị giải thích: "Âm /iː/ trong \'beat\' kéo dài 220ms, miệng cười bè; khác với âm /ɪ/ trong \'bit\' chỉ kéo dài 80ms thả lỏng".',
        completed: true
      },
      {
        id: 'ac-game-103-number-keys-combat',
        given: 'Người chơi thao tác nhanh bằng bàn phím',
        when: 'Bấm phím 1 hoặc 2',
        then: 'Thẻ bài ma thuật được tung ra tức thời mà không cần click chuột.',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-game-103-fe-arena', title: 'Xây dựng component BossArenaView.jsx với hệ thống animation thanh máu, rung màn hình (shake effect) và thẻ bài ma thuật', category: 'Frontend', completed: true },
      { id: 't-game-103-fe-audio', title: 'Tiền tải (Preload) toàn bộ ngân hàng âm thanh cặp từ tối thiểu Minimal Pairs Audio Kit với Web Audio API', category: 'Audio/DSP', completed: true },
      { id: 't-game-103-fe-keys', title: 'Tích hợp listener bàn phím số 1, 2 cho lượt phản đòn nhanh', category: 'Frontend', completed: true },
      { id: 't-game-103-qa', title: 'Kiểm thử cân bằng độ khó (game balancing) cho 3 Boss đầu tiên', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 PURE FRONTEND DESIGN SPECIFICATION
- **Phân loại**: Pure Frontend Turn-Based Game Arena Component
- **UI Mockup**: \`vietphonics-app/src/ui-reference/game_3d_rpg_chi_n_luy_n_ph_t_m_light_mode/code.html\`
- **Frontend Component**: \`vietphonics-app/src/views/BossArenaView.jsx\`

#### 📐 Boss Arena Battle HUD
\`\`\`
+-------------------------------------------------------------+
| BOSS: The Final-T Titan [HP: ================== 65/100]     |
| (Boss đang niệm chú: "beat" - 3.5s còn lại)                 |
+-------------------------------------------------------------+
|             [1] THẺ PHÉP: "bit"    |   [2] THẺ PHÉP: "beat" |
|             Phiên âm: /bɪt/        |   Phiên âm: /biːt/     |
+-------------------------------------------------------------+
| BẠN: Adventurer [HP: ==================== 100/100]          |
+-------------------------------------------------------------+
\`\`\`

#### 🎨 Design Tokens
- **Boss HP Bar**: \`h-5 rounded-full bg-slate-950 border border-slate-700 overflow-hidden\`, Fill: \`bg-gradient-to-r from-rose-600 to-amber-500 transition-all duration-300\`.
- **Spell Card**: \`p-5 rounded-2xl bg-slate-900/80 border-2 border-indigo-500/50 hover:border-indigo-400 backdrop-blur-md shadow-xl cursor-pointer active:scale-95\`.`
  },
  {
    id: 'GAME-104',
    epic_id: 'epic-gamified-3d',
    title: 'Zero-Latency Web Audio API Sound Synthesizer & 3D Isometric Combat Canvas: Bộ Tổng Hợp Âm Thanh Không Độ Trễ & Đồ Họa Đẳng Cự 60 FPS',
    persona: 'Người dùng chơi game trên máy tính cấu hình khiêm tốn hoặc trình duyệt di động đòi hỏi hiệu năng cao và âm thanh sống động',
    action: 'trải nghiệm các hiệu ứng âm thanh sống động (tiếng chém kiếm, tiếng thu thập tiền vàng, tiếng nổ phép thuật) được tổng hợp trực tiếp bằng thuật toán toán học mà không tốn dung lượng tải file',
    value: 'đạt tốc độ khởi động game tức thì (Zero Asset Download Time), giảm thiểu 95% băng thông mạng cho máy chủ và loại bỏ độ trễ âm thanh thường thấy của thẻ HTML5 Audio',
    priority: 'should',
    status: 'done',
    size: 'M',
    points: 5,
    uiMockupUrl: '/src/ui-reference/game_3d_rpg_chi_n_luy_n_ph_t_m_light_mode/code.html',
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-game-104-procedural-synth',
        given: 'Game cần phát hiệu ứng âm thanh (tiếng đòn đánh, tiếng nhặt vàng, tiếng thăng cấp)',
        when: 'Hàm playSynthSfx(type) được gọi',
        then: 'Web Audio API OscillatorNode và GainNode tổng hợp sóng âm với envelope ADSR tùy chỉnh trong 0ms, phát ra âm thanh tức thời mà không cần tải file .mp3.',
        completed: true
      },
      {
        id: 'ac-game-104-zero-asset-download',
        given: 'Học viên mở màn chơi game lần đầu',
        when: 'Kiểm tra lưu lượng mạng tải âm thanh hiệu ứng',
        then: 'Dung lượng tải = 0 KB do toàn bộ SFX được sinh bằng thuật toán toán học phía client.',
        completed: true
      },
      {
        id: 'ac-game-104-safari-audio-unlock',
        given: 'Học viên chơi game trên trình duyệt Safari iOS',
        when: 'Chạm tay vào màn hình lần đầu tiên',
        then: 'AudioContext tự động chuyển sang trạng thái "running" mượt mà theo đúng chính sách autoplay của Apple.',
        completed: true
      },
      {
        id: 'ac-game-104-accessible-reduced-motion',
        given: 'Người chơi bật chế độ "Giảm chuyển động (Reduced Motion)"',
        when: 'Hiệu ứng nổ hạt particle diễn ra',
        then: 'Hệ thống tự động tắt các chớp sáng nhấp nháy, đảm bảo an toàn cho người nhạy cảm ánh sáng (Photosensitive Safe).',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-game-104-fe-synth', title: 'Xây dựng module soundEffects.js sử dụng Web Audio API OscillatorNode cho 8 loại hiệu ứng game SFX', category: 'Audio/DSP', completed: true },
      { id: 't-game-104-fe-safari', title: 'Xử lý chính sách âm thanh autoplay và mở khóa AudioContext trên Safari iOS', category: 'Frontend', completed: true },
      { id: 't-game-104-fe-motion', title: 'Tích hợp media query prefers-reduced-motion ngắt hạt nổ ánh sáng', category: 'Frontend', completed: true },
      { id: 't-game-104-qa', title: 'Kiểm thử stress-test chạy 200 lượt phát âm thanh dồn dập không làm nghẽn luồng UI chính', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 PURE FRONTEND DESIGN SPECIFICATION
- **Phân loại**: Pure Frontend Procedural Sound Synthesizer
- **UI Mockup**: \`vietphonics-app/src/ui-reference/game_3d_rpg_chi_n_luy_n_ph_t_m_light_mode/code.html\`
- **Frontend Component**: \`vietphonics-app/src/utils/soundEffects.js\`

#### 🧮 Procedural Sound Synthesis Code
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
- **Zero Server Overhead**: 0 byte asset downloads, 100% in-browser Web Audio.`
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
    uiMockupUrl: '/src/ui-reference/game_3d_rpg_chi_n_luy_n_ph_t_m_light_mode/code.html',
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-game-105-inventory-modal',
        given: 'Người chơi tích lũy đủ Kim Cương Phonics trong game',
        when: 'Mở Cửa Hàng Trang Bị và mua vật phẩm "Khiên Đóng Băng Chuỗi (Streak Freeze)"',
        then: 'Vật phẩm xuất hiện trong Túi Đồ (Inventory) với biểu tượng khiên băng 3D phát sáng, sẵn sàng tự động kích hoạt bảo vệ streak nếu quên luyện tập 1 ngày.',
        completed: true
      },
      {
        id: 'ac-game-105-university-podium',
        given: 'Giao diện Bảng Xếp Hạng Liên Trường (University Leaderboard View)',
        when: 'Học viên mở bảng xếp hạng',
        then: 'Top 3 trường đại học dẫn đầu hiển thị trên bục vinh quang 3D (Hạng 1: Vàng kim, Hạng 2: Bạc, Hạng 3: Đồng) kèm logo sắc nét của các trường ĐH Bách Khoa, Ngoại Thương, Kinh Tế Quốc Dân.',
        completed: true
      },
      {
        id: 'ac-game-105-personal-rank-footer',
        given: 'Học viên đã chọn trường đại học của mình trong hồ sơ',
        when: 'Bảng xếp hạng hiển thị',
        then: 'Thanh vị trí cá nhân được ghim cố định ở đáy màn hình: "Bạn đang xếp hạng 14 trong 820 sinh viên ĐH Bách Khoa Hà Nội".',
        completed: false
      },
      {
        id: 'ac-game-105-redis-zset-backend',
        given: 'Học viên hoàn thành bài học và ghi nhận điểm XP',
        when: 'Gửi yêu cầu ghi điểm lên API GET/POST /api/v1/leaderboard/university',
        then: 'Máy chủ tính toán thứ hạng thời gian thực qua Redis Sorted Sets trong dưới 20ms mà không gây nghẽn database PostgreSQL.',
        completed: false
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-game-105-fe-board', title: 'Xây dựng giao diện LeaderboardView với bục vinh quang Podium Top 3 và danh sách bảng xếp hạng liên trường', category: 'Frontend', completed: true },
      { id: 't-game-105-fe-store', title: 'Thiết kế hệ thống Inventory và Perk Store với Modal mua đồ và trang bị vật phẩm trực quan', category: 'Frontend', completed: true },
      { id: 't-game-105-be-redis', title: 'Triển khai Redis Sorted Sets leaderboard service cho 5,000 users', category: 'Backend', completed: false },
      { id: 't-game-105-qa', title: 'Kiểm thử kịch bản đồng thời 500 sinh viên nộp điểm XP cùng lúc xem bảng xếp hạng có cập nhật chính xác', category: 'QA', completed: false }
    ]),
    notes: `### 🎯 FULLSTACK FEATURE SPECIFICATION
- **Phân loại**: Full-stack RPG Inventory & University Leaderboard Engine
- **UI Mockup**: \`vietphonics-app/src/ui-reference/game_3d_rpg_chi_n_luy_n_ph_t_m_light_mode/code.html\`
- **Frontend Component**: \`vietphonics-app/src/views/LeaderboardView.jsx\`

#### 🎨 University Podium Design Tokens
- **Podium Rank 1**: \`h-36 bg-gradient-to-t from-amber-500 to-yellow-400 text-slate-950 font-black rounded-t-3xl shadow-[0_0_35px_rgba(245,158,11,0.5)] flex flex-col items-center justify-end p-4\`.
- **Podium Rank 2**: \`h-28 bg-gradient-to-t from-slate-400 to-slate-200 text-slate-950 font-bold rounded-t-3xl flex flex-col items-center justify-end p-4\`.
- **Podium Rank 3**: \`h-24 bg-gradient-to-t from-amber-800 to-amber-700 text-white font-bold rounded-t-3xl flex flex-col items-center justify-end p-4\`.

#### 🗄️ Backend Redis ZSET Architecture
\`\`\`
ZINCRBY leaderboard:uni:weekly 50 "HUST"
ZREVRANGE leaderboard:uni:weekly 0 9 WITHSCORES
\`\`\`
- O(log N) runtime < 2ms, phục vụ 5,000 users đồng thời với tải CPU server < 1%.`
  }
];
