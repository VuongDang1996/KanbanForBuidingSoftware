export const endingSoundsStories = [
  {
    id: 'PRON-101',
    epic_id: 'epic-ending-sounds',
    title: 'Web Audio API Low-Latency In-Browser Audio Streaming: Bộ Thu Âm Trình Duyệt Không Độ Trễ & Hiển Thị Sóng Âm 48kHz',
    persona: 'Người học tiếng Anh cần phản hồi phát âm tức thì ngay khi vừa dứt lời, không chấp nhận độ trễ (latency) gây mất tập trung',
    action: 'thu âm giọng nói trực tiếp qua micro trình duyệt bằng Web Audio API, truyền luồng âm thanh PCM 16kHz/48kHz với độ trễ dưới 50ms và hiển thị dải sóng âm thời gian thực 60fps',
    value: 'loại bỏ hoàn toàn cảm giác giật lag, tạo trải nghiệm mượt mà tức thời như đang đối thoại trực tiếp với giáo viên bản xứ',
    priority: 'must',
    status: 'done',
    size: 'L',
    points: 8,
    uiMockupUrl: '/src/ui-reference/acoustic_precision_light/code.html',
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-pron-101-worklet-init',
        given: 'Học viên cấp quyền sử dụng microphone trong trình duyệt',
        when: 'AudioContext được khởi tạo',
        then: 'Hệ thống nạp AudioWorkletProcessor trích xuất luồng mẫu PCM 16kHz Float32 mono với buffer size 1024 mẫu và độ trễ ngắt âm thanh dưới 50ms.',
        completed: true
      },
      {
        id: 'ac-pron-101-canvas-render',
        given: 'AudioContext đang nhận luồng dữ liệu micro',
        when: 'AnalyserNode tính toán biến đổi Fourier nhanh (FFT Size 1024)',
        then: 'LiveWaveformCanvas vẽ 64 thanh phổ tần số đối xứng dạng sóng âm neon gradient từ Sky-400 sang Rose-500 ở tốc độ ổn định 60 FPS mà không làm rớt khung hình (Zero Frame Drop).',
        completed: true
      },
      {
        id: 'ac-pron-101-push-to-talk',
        given: 'Học viên nhấn và giữ phím Space hoặc nút Mic tròn ở trung tâm',
        when: 'Sự kiện keydown / mousedown kích hoạt',
        then: 'Trạng thái chuyển sang recording ngay lập tức, nút mic mở rộng viền phát sáng pulsating ring, và tự động dừng thu âm khi nhả phím (keyup / mouseup).',
        completed: true
      },
      {
        id: 'ac-pron-101-mic-denied-fallback',
        given: 'Trình duyệt từ chối quyền microphone hoặc không tìm thấy thiết bị thu âm',
        when: 'Học viên cố gắng bấm nút thu âm',
        then: 'Hiển thị hộp thoại MicPermissionDeniedModal hướng dẫn bật lại quyền mic trên Chrome/Safari kèm nút "Kiểm tra lại thiết bị".',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-pron-101-worklet', title: 'Xây dựng pcm-recorder-processor.js trong AudioWorklet thread tách biệt hoàn toàn khỏi Main UI thread', category: 'Frontend', completed: true },
      { id: 't-pron-101-canvas', title: 'Phát triển component LiveWaveformCanvas.jsx sử dụng requestAnimationFrame và 2D Canvas context', category: 'Frontend', completed: true },
      { id: 't-pron-101-ptt', title: 'Thiết lập listener bàn phím toàn cục xử lý Push-to-Talk bằng phím Space với bộ đệm chống dội phím (Debounce)', category: 'Frontend', completed: true },
      { id: 't-pron-101-fallback', title: 'Xây dựng modal cảnh báo MicPermissionModal.jsx với đồ họa minh họa các bước cấp quyền micro', category: 'Frontend', completed: true }
    ]),
    notes: `### 🎨 PURE FRONTEND DESIGN SPECIFICATION
- **Phân loại**: Pure Frontend Audio Pipeline & Canvas 2D
- **UI Mockup**: \`vietphonics-app/src/ui-reference/acoustic_precision_light/code.html\`
- **Frontend Component**: \`vietphonics-app/src/components/audio/AudioRecordingController.jsx\`

#### 📐 Component Hierarchy & State
\`\`\`
<AudioRecordingController onAudioData={handleChunk} onStop={handleRecordingEnd}>
  <LiveWaveformCanvas 
    analyserNode={analyserNode} 
    isRecording={isRecording} 
    barCount={64} 
  />
  <PushToTalkButton 
    isRecording={isRecording} 
    volumeRms={currentVolumeRms} 
    hotkey="Space" 
  />
  <MicPermissionModal 
    isOpen={hasPermissionError} 
    onRetry={requestMicAccess} 
  />
</AudioRecordingController>
\`\`\`

#### 🎵 AudioWorklet Architecture
- \`navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, sampleRate: 16000 } })\`
- AudioWorklet tách riêng khỏi main event loop:
\`\`\`javascript
class PCMRecorderProcessor extends AudioWorkletProcessor {
  process(inputs) {
    const input = inputs[0];
    if (input && input[0]) {
      this.port.postMessage(input[0]); // Float32Array 128 samples
    }
    return true;
  }
}
\`\`\`

#### 🎨 Design Tokens & Visual Specs
- **Mic Button**: \`w-24 h-24 rounded-full bg-gradient-to-tr from-rose-600 to-rose-400 shadow-[0_0_40px_rgba(244,63,94,0.45)] ring-4 ring-rose-500/20 active:scale-95 transition-all\`.
- **Waveform Canvas**: \`h-24 w-full max-w-lg rounded-2xl bg-slate-900/90 border border-slate-800 shadow-inner\`.
- **Canvas Rendering**: 64 bars đối xứng trục tâm, màu gradient \`#38bdf8\` (Sky-400) đến \`#f43f5e\` (Rose-500).`
  },
  {
    id: 'ELSA-201',
    epic_id: 'epic-ending-sounds',
    title: 'Real-Time Phoneme Error Heatmap with Forced Alignment: Bản Đồ Nhiệt Âm Vị Thời Gian Thực & Căn Chỉnh Cưỡng Bức',
    persona: 'Học viên muốn biết chính xác đến từng mili-giây và từng ký tự xem mình phát âm sai ở đâu trong một từ hoặc câu dài',
    action: 'đọc câu tiếng Anh và nhận kết quả tức thì dưới dạng Bản Đồ Nhiệt Âm Vị (Phoneme Heatmap), trong đó từng âm vị được tô màu trực quan: Xanh lá (Đúng ≥85%), Vàng cam (Tạm chấp nhận 60-84%), Đỏ (Phát âm sai <60%)',
    value: 'chỉ ra lỗi sai với độ chính xác đến từng âm tố, loại bỏ hoàn toàn sự hoang mang "tôi nói cả câu mà không biết sai chữ nào"',
    priority: 'must',
    status: 'done',
    size: 'XL',
    points: 13,
    uiMockupUrl: '/src/ui-reference/ph_ng_luy_n_ph_t_m_ph_k_m_h_c_light_mode/code.html',
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-elsa-201-ctc-alignment',
        given: 'Bản ghi âm giọng nói của học viên đã được gửi lên hệ thống',
        when: 'Mô hình CTC Forced Alignment xử lý',
        then: 'Trả về danh sách từng từ và các âm vị IPA con tương ứng kèm mốc thời gian (startMs, endMs) và điểm tin cậy độ chính xác (0-100%).',
        completed: true
      },
      {
        id: 'ac-elsa-201-heatmap-chips',
        given: 'Dữ liệu điểm số âm vị được trả về máy khách',
        when: 'PhonemeHeatmapRenderer hiển thị trên màn hình',
        then: 'Từng âm vị được bao bọc trong thẻ chip có màu: Xanh lá (≥85%), Vàng hổ phách (60-84%), Đỏ hồng (<60% kèm hiệu ứng viền phát sáng cảnh báo).',
        completed: true
      },
      {
        id: 'ac-elsa-201-phoneme-popover',
        given: 'Học viên click vào một âm vị có điểm dưới 60% (ví dụ âm /t/ bị nuốt trong từ "contact")',
        when: 'Drawer chẩn đoán mở ra',
        then: 'Hiển thị ký hiệu IPA to bản, mô tả khẩu hình sai thường gặp của người Việt và nút "Nghe lại âm này".',
        completed: true
      },
      {
        id: 'ac-elsa-201-colorblind-mode',
        given: 'Người dùng bật chế độ hỗ trợ thị giác trong phần Cài đặt',
        when: 'Bản đồ nhiệt hiển thị',
        then: 'Bổ sung các icon hình học (Tick tròn, Chấm than, Dấu X) bên cạnh màu sắc để đảm bảo khả năng tiếp cận WCAG 2.1 AA.',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-elsa-201-chips', title: 'Xây dựng component PhonemeHeatmapRenderer.jsx render danh sách từ và âm vị theo flex-wrap', category: 'Frontend', completed: true },
      { id: 't-elsa-201-drawer', title: 'Thiết kế PhonemeQuickDiagnosticDrawer.jsx hiển thị giải thích âm học và bài tập khắc phục nhanh', category: 'Frontend', completed: true },
      { id: 't-elsa-201-ctc-api', title: 'Xây dựng endpoint POST /api/v1/scoring/phoneme-alignment tích hợp mô hình Wav2Vec2-CTC', category: 'AI/Backend', completed: true },
      { id: 't-elsa-201-cache', title: 'Lưu trữ ma trận âm vị target dictionary vào Redis cache giảm thời gian trích xuất xuống < 5ms', category: 'Backend', completed: true }
    ]),
    notes: `### 🎯 FULLSTACK FEATURE SPECIFICATION
- **Phân loại**: Full-stack AI Feature (Interactive Heatmap Chips + CTC Forced Alignment)
- **UI Mockup**: \`vietphonics-app/src/ui-reference/ph_ng_luy_n_ph_t_m_ph_k_m_h_c_light_mode/code.html\`
- **Frontend Component**: \`vietphonics-app/src/components/scoring/PhonemeHeatmapRenderer.jsx\`

#### 🎨 Frontend Heatmap Layout
\`\`\`
+---------------------------------------------------------------+
| Câu: "She sells seashells by the seashore"                    |
| [She]       [sells]     [sea-shells]      [by]  [the]  [seashore] |
| ʃ   iː      s  ɛ  l  z   s  iː  ʃ  ɛ  l  z                         |
| [●] [●]    [●][●][●][▲] [●] [●][▲][●][●][✕]                       |
+---------------------------------------------------------------+
\`\`\`
- **Chip Tokens**:
  - Green (≥85%): \`bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-1 rounded-lg font-mono text-sm\`
  - Amber (60-84%): \`bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2 py-1 rounded-lg font-mono text-sm\`
  - Red (<60%): \`bg-rose-500/10 text-rose-400 border border-rose-500/30 px-2 py-1 rounded-lg font-mono text-sm animate-pulse\`

#### 🗄️ Backend API Contract
\`\`\`http
POST /api/v1/scoring/phoneme-alignment
Authorization: Bearer <JWT>
Content-Type: application/json

{
  "audioUrl": "https://r2.vietphonics.com/audio/session_102.opus",
  "targetSentence": "She sells seashells by the seashore"
}
\`\`\`
- **Response**: Trả về cấu trúc JSON phân cấp Word -> Phoneme array với các trường \`symbol\`, \`score\`, \`startMs\`, \`endMs\`, \`errorType\`.
- **Database Table**: \`phoneme_alignment_records\` (PostgreSQL) lưu vết để tính toán tiến bộ lịch sử.`
  },
  {
    id: 'ELSA-204',
    epic_id: 'epic-ending-sounds',
    title: 'Speech Fluency, Natural Pauses & Filler Word Monitor: Giám Sát Độ Lưu Loát, Quãng Nghỉ Tự Nhiên & Từ Đệm Rác',
    persona: 'Người học tiếng Anh giao tiếp hoặc luyện thi nói hay bị ấp úng, chèn quá nhiều từ đệm rác ("uhm", "ah", "like", "you know") và ngập ngừng ngắt quãng sai chỗ',
    action: 'nói các đoạn văn dài và quan sát thước đo độ lưu loát (Fluency Timeline), đếm số lượng từ đệm rác, đo độ dài quãng nghỉ ngắt câu (Pauses) và đo tốc độ nói chuẩn (Words Per Minute - WPM)',
    value: 'rèn luyện nhịp thở và phong thái nói đĩnh đạc tự tin, cải thiện trực tiếp tiêu chí Fluency & Coherence trong các bài thuyết trình và phỏng vấn tiếng Anh',
    priority: 'must',
    status: 'in-progress',
    size: 'M',
    points: 5,
    uiMockupUrl: '/src/ui-reference/acoustic_precision_light/code.html',
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-elsa-204-wpm-gauge',
        given: 'Dữ liệu bài nói của học viên kéo dài từ 15 đến 60 giây',
        when: 'Giao diện FluencyTracker tải lên',
        then: 'Hiển thị đồng hồ WPM bán nguyệt SVG với kim chỉ số mượt mà, phân chia 3 dải tốc độ: Chậm (<110 WPM), Lý tưởng (120-150 WPM), và Quá nhanh (>170 WPM).',
        completed: true
      },
      {
        id: 'ac-elsa-204-timeline-segments',
        given: 'Các mốc thời gian lời nói và khoảng lặng được phân tích',
        when: 'Thanh timeline hiển thị trên màn hình',
        then: 'Phân đoạn nói bình thường màu Sky-500, khoảng lặng tự nhiên (<0.5s) màu xám mờ, và quãng nghỉ ấp úng (>0.6s) màu Amber-500 có viền cảnh báo nổi bật.',
        completed: true
      },
      {
        id: 'ac-elsa-204-audio-excerpt-playback',
        given: 'Học viên click vào một khoảng nghỉ hoặc từ đệm rác trên thanh timeline',
        when: 'Hành động click diễn ra',
        then: 'Trình duyệt tự động cắt và phát đoạn âm thanh 1.5 giây quanh điểm đó để học viên tự nghe lại khoảnh khắc ngập ngừng của mình.',
        completed: true
      },
      {
        id: 'ac-elsa-204-l1-filler-filter',
        given: 'Bài nói chứa các từ đệm tiếng Việt L1 ("ờ", "ừm", "kiểu như")',
        when: 'Bật bộ lọc L1 Hesitation Filter',
        then: 'Làm nổi bật các thẻ từ đệm kèm lời khuyên thay thế bằng sự im lặng có chủ đích.',
        completed: false
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-elsa-204-gauge', title: 'Xây dựng component WpmSpeedometerGauge.jsx bằng SVG thuần với kim xoay góc -90deg đến +90deg', category: 'Frontend', completed: true },
      { id: 't-elsa-204-timeline', title: 'Phát triển component FluencyInteractiveTimeline.jsx có khả năng kéo trượt zoom và click chọn đoạn', category: 'Frontend', completed: true },
      { id: 't-elsa-204-audio-slice', title: 'Xây dựng hàm playBufferSegment(audioBuffer, startMs, endMs) sử dụng Web Audio API AudioBufferSourceNode', category: 'Frontend', completed: true },
      { id: 't-elsa-204-l1-filter', title: 'Tích hợp bộ lọc phân loại từ đệm tiếng Việt vào thanh công cụ điều khiển', category: 'Frontend', completed: false }
    ]),
    notes: `### 🎨 PURE FRONTEND DESIGN SPECIFICATION
- **Phân loại**: Pure Frontend UI/UX Component (Fluency Speedometer & Timeline)
- **UI Mockup**: \`vietphonics-app/src/ui-reference/acoustic_precision_light/code.html\`
- **Frontend Component**: \`vietphonics-app/src/components/scoring/FluencyTimelineTracker.jsx\`

#### 📐 Layout & Timeline Track Structure
\`\`\`
+-------------------------------------------------------------+
| [ Đồng Hồ WPM: 128 WPM (Chuẩn) ]  [ 2 Từ Đệm ]  [ 1 Ngập Ngừng ] |
+-------------------------------------------------------------+
| 0s       2s           4s            6s            8s        |
| [=== Nói ===] [..Nghỉ..] [==== Nói ====] [!Ùm!] [=== Nói ===] |
+-------------------------------------------------------------+
| > Bấm vào đoạn [!Ùm!] để nghe lại 1.5s ngập ngừng          |
+-------------------------------------------------------------+
\`\`\`

#### 🎨 Micro-Interactions & Audio Snippets
- **WPM Speedometer**: SVG Arc \`d="M 20 100 A 80 80 0 0 1 180 100"\` với kim chỉ số xoay theo công thức: \`angle = ((wpm - 80) / 120) * 180 - 90\`.
- **Audio Excerpt Slice**:
\`\`\`javascript
function playAudioSnippet(audioBuffer, startMs, endMs) {
  const source = audioContext.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(audioContext.destination);
  source.start(0, startMs / 1000, (endMs - startMs) / 1000);
}
\`\`\`
- **Tokens**:
  - Segment Speech: \`bg-sky-500/20 border-sky-500/50 text-sky-300 rounded px-2 py-1 text-xs\`
  - Segment Pause (>0.6s): \`bg-amber-500/20 border border-amber-500 text-amber-400 rounded px-2 py-1 text-xs font-mono\`
  - Segment Filler: \`bg-purple-500/20 border border-purple-500 text-purple-300 rounded-full px-2.5 py-0.5 text-xs font-semibold\`.`
  },
  {
    id: 'VN-101',
    epic_id: 'epic-ending-sounds',
    title: 'Final Consonant Sound "Ending Sound" Inspector & Acoustical Burst Analyzer: Thanh Tra Âm Cuối & Phân Tích Xung Âm Bật Hơi',
    persona: 'Học viên Việt Nam thường xuyên mắc tật "nuốt sạch âm đuôi" (bỏ quên các âm /t/, /d/, /k/, /g/, /p/, /b/, /s/, /z/, /ks/ ở cuối từ)',
    action: 'phát âm các từ có đuôi phức tạp và quan sát xung sóng âm bật hơi (Acoustical Burst Spike) trên màn hình để kiểm tra xem mình có thực sự nhả âm cuối hay chỉ ngậm miệng lại',
    value: 'trị tận gốc "căn bệnh thế kỷ" của người Việt học tiếng Anh: nói tiếng Anh không có âm đuôi khiến người nước ngoài hoàn toàn không hiểu',
    priority: 'must',
    status: 'in-progress',
    size: 'XL',
    points: 13,
    uiMockupUrl: '/src/ui-reference/acoustic_precision_light/code.html',
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-vn-101-dual-oscilloscope',
        given: 'Từ mục tiêu có phụ âm đuôi bật hơi (e.g., "contact", "desk", "six")',
        when: 'Học viên hoàn thành phát âm',
        then: 'Hiển thị 2 kênh sóng âm song song: Kênh trên là giọng bản ngữ chuẩn, kênh dưới là giọng học viên, căn chỉnh đồng bộ theo đỉnh nguyên âm chính.',
        completed: true
      },
      {
        id: 'ac-vn-101-burst-spike-indicator',
        given: 'Hệ thống đo đạc xung năng lượng âm học (Transient Burst Energy Spike dE/dt)',
        when: 'Tỷ lệ năng lượng xung trong 50ms cuối của từ đạt ≥ 0.35',
        then: 'Hiển thị huy hiệu xanh lá "Bật hơi chuẩn!"; nếu thiếu xung bật hơi, vị trí cuối từ xuất hiện vòng tròn đỏ nhấp nháy cảnh báo "Nuốt âm đuôi".',
        completed: true
      },
      {
        id: 'ac-vn-101-l1-unreleased-stop-warning',
        given: 'Học viên khép miệng ngậm hơi theo thói quen tiếng Việt (Unreleased Stop e.g. "bát" thay vì "bat")',
        when: 'Hệ thống phát hiện năng lượng dải tần số 3kHz - 8kHz bị triệt tiêu đột ngột',
        then: 'Hiển thị sơ đồ giải phẫu 2D chỉ rõ cách mở nhẹ đầu lưỡi để nhả luồng hơi bật ra ngoài.',
        completed: false
      },
      {
        id: 'ac-vn-101-slowmo-playback',
        given: 'Học viên muốn nghe phân tích chi tiết âm đuôi',
        when: 'Bấm nút "Nghe Chậm 0.5x"',
        then: 'Hệ thống phát lại đoạn audio ở tốc độ nửa nhịp nhưng vẫn giữ nguyên cao độ giọng nói (Pitch-preserving Timestretch) qua Web Audio API.',
        completed: false
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-vn-101-scope', title: 'Xây dựng component OscilloscopeDualWaveform.jsx vẽ 2 kênh sóng âm bằng Canvas 2D', category: 'Frontend', completed: true },
      { id: 't-vn-101-burst-meter', title: 'Thiết kế AcousticalBurstMeter.jsx hiển thị thanh đo tỷ lệ năng lượng xung nhịp', category: 'Frontend', completed: true },
      { id: 't-vn-101-dsp-burst', title: 'Viết thuật toán trích xuất đạo hàm năng lượng dE/dt và Zero Crossing Rate (ZCR) trong 50ms cuối', category: 'Audio/DSP', completed: false },
      { id: 't-vn-101-slowmo', title: 'Tích hợp Phase Vocoder hoặc Web Audio playbackRate giữ pitch để phát chậm 0.5x', category: 'Audio/DSP', completed: false }
    ]),
    notes: `### 🎯 FULLSTACK & AUDIO DSP SPECIFICATION
- **Phân loại**: Full-stack Audio DSP & Oscilloscope Visualizer
- **UI Mockup**: \`vietphonics-app/src/ui-reference/acoustic_precision_light/code.html\`
- **Frontend Component**: \`vietphonics-app/src/components/ending-sounds/EndingSoundInspector.jsx\`

#### 🎨 Dual Oscilloscope Visualization
\`\`\`
+-------------------------------------------------------------+
| NATIVE:  ---~--/\/\/\--~---..|  <-- [Xung bật /t/ rõ ràng]   |
| USER:    ---~--/\/\/\-------..|  <-- [! KHÔNG CÓ XUNG BẬT !]  |
+-------------------------------------------------------------+
| Burst Energy Ratio: 0.12 (Ngưỡng yêu cầu: >= 0.35) -> Cần sửa |
+-------------------------------------------------------------+
\`\`\`

#### 🧮 Acoustic Burst Formula
\`\`\`
BurstEnergyRatio = \int_{T_{end}-50ms}^{T_{end}} |x(t)|^2 dt / E_{vowel}
\`\`\`
- Nếu \`BurstEnergyRatio < 0.20\`: Người học hoàn toàn ngậm miệng lại (Vietnamese unreleased stop coda).
- Nếu \`BurstEnergyRatio >= 0.35\`: Luồng khí bật ra đủ mạnh tạo âm nổ (Released plosive).

#### 🗄️ Backend Contract & Wasm Client Scale
- **Rust/Wasm Client-Side**: Thuật toán tính toán năng lượng tức thời chạy trực tiếp trên client bằng WebAssembly, giảm 100% tải tính toán âm học trên server backend.
- **REST API Fallback**:
\`\`\`http
POST /api/v1/acoustic/ending-burst
Content-Type: application/json

{
  "word": "contact",
  "targetEndingPhoneme": "/t/",
  "audioUrl": "https://r2.../c1.opus"
}
\`\`\``
  }
];
