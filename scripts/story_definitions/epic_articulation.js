export const articulationStories = [
  {
    id: 'ELSA-205',
    epic_id: 'epic-articulation',
    title: 'Minimal Pair Auditory Discrimination Quizzes: Luyện Tai Phân Biệt Cặp Âm Dễ Nhầm Lẫn (/θ/-/t/, /iː/-/ɪ/)',
    persona: 'Người học tiếng Anh thường xuyên nhầm lẫn các cặp âm gần giống nhau do tai chưa nhận diện được sự khác biệt âm học',
    action: 'nghe âm thanh ngẫu nhiên được phát ra và chọn từ chính xác giữa 2 lựa chọn cặp âm tối thiểu (A vs B)',
    value: 'rèn luyện phản xạ thính giác nhạy bén, phân biệt rõ ràng giữa /θ/ (think) vs /t/ (tink), /iː/ (sheep) vs /ɪ/ (ship), /s/ (sea) vs /ʃ/ (she) trước khi tập phát âm',
    priority: 'must',
    status: 'in-progress',
    size: 'M',
    points: 5,
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-elsa-205-quiz',
        given: 'Cặp âm tối thiểu /θ/ vs /t/ với 2 từ "think" và "tink"',
        when: 'Học viên bấm nút loa phát âm thanh ngẫu nhiên và chọn Lựa chọn A ("think")',
        then: 'Nếu đúng, hiển thị thông báo chúc mừng màu xanh lá, tăng điểm bài kiểm tra, tăng chuỗi streak và hiển thị mẹo cấu âm: "Chú ý kẹp lưỡi giữa hai răng cho /θ/, đầu lưỡi bật sau nướu cho /t/".',
        completed: true
      },
      {
        id: 'ac-elsa-205-frontend-design',
        given: 'Giao diện MinimalPairQuiz trong MasteryLabView',
        when: 'Giao diện hiển thị',
        then: 'Nút loa phát âm to tròn 80px nổi bật giữa màn hình với hiệu ứng hover:scale-110 active:scale-95, 2 nút chọn từ A và B to bản thiết kế dạng Bento card, font-black 24px, hiển thị phiên âm IPA chuẩn bên dưới.',
        completed: true
      },
      {
        id: 'ac-elsa-205-backend-design',
        given: '5,000 học viên cùng làm bài trắc nghiệm phân biệt thính giác',
        when: 'Phát âm thanh mẫu và gửi kết quả',
        then: 'Bộ dữ liệu cặp từ tối thiểu được lưu trong Redis Hash minimal_pairs:catalog (TTL 30 ngày), endpoint POST /api/v1/curriculum/minimal-pair/answer ghi nhận lịch sử vào PostgreSQL trong dưới 25ms.',
        completed: true
      },
      {
        id: 'ac-elsa-205-l1-precision',
        given: 'Học viên chọn nhầm từ "ship" thành "sheep"',
        when: 'Hệ thống báo sai',
        then: 'Giải thích rõ lỗi L1 tiếng Việt: "Tiếng Việt không có nguyên âm thả lỏng /ɪ/, người Việt hay đọc thành nguyên âm căng /iː/. Hãy phát âm dứt khoát và thả lỏng khóe môi".',
        completed: true
      },
      {
        id: 'ac-elsa-205-a11y-fallback',
        given: 'Người dùng thao tác bằng phím tắt',
        when: 'Nhấn phím 1 cho lựa chọn A, phím 2 cho lựa chọn B, phím Space để nghe lại âm',
        then: 'Giao diện phản hồi chuẩn xác theo phím tắt, các nút có đầy đủ aria-label mô tả nội dung từ.',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-elsa-205-fe-quiz', title: 'Xây dựng component MinimalPairQuizCard.jsx với Bento Grid và các phím tắt chọn nhanh 1 & 2', category: 'Frontend', completed: true },
      { id: 't-elsa-205-fe-tts', title: 'Tích hợp hàm phát âm thanh mẫu audio chất lượng HD qua HTML5 Audio Buffer Cache', category: 'Audio/DSP', completed: true },
      { id: 't-elsa-205-be-api', title: 'Xây dựng API GET /api/v1/curriculum/minimal-pairs và POST /api/v1/curriculum/minimal-pair/answer', category: 'Backend', completed: true },
      { id: 't-elsa-205-be-cache', title: 'Lưu trữ ngân hàng 500 cặp âm tối thiểu trong Redis in-memory phục vụ 5,000 users', category: 'Backend', completed: true },
      { id: 't-elsa-205-qa', title: 'Kiểm tra độ chính xác của 10 cặp âm tối thiểu phổ biến nhất trong tiếng Anh giao tiếp', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 FRONTEND DESIGN SPECIFICATION
- **Component File**: \`vietphonics-app/src/components/articulation/MinimalPairQuiz.jsx\`
- **Component Hierarchy**:
  \`\`\`
  <MinimalPairQuiz pairId="mp_theta_t_01">
    <AudioPlayHeroButton onPlay={playWord} isPlaying={isPlaying} />
    <ChoiceCardsContainer>
      <ChoiceCard key="A" word="think" ipa="/θɪŋk/" keyShortcut="1" onClick={() => handleSelect('A')} />
      <ChoiceCard key="B" word="tink" ipa="/tɪŋk/" keyShortcut="2" onClick={() => handleSelect('B')} />
    </ChoiceCardsContainer>
    <FeedbackBanner isCorrect={result.isCorrect} tip={result.articulatoryTip} />
  </MinimalPairQuiz>
  \`\`\`
- **Stitch Design Tokens**:
  - Hero Speaker: \`w-20 h-20 rounded-full bg-sky-500 hover:bg-sky-400 text-white shadow-[0_0_25px_rgba(14,165,233,0.5)] flex items-center justify-center\`
  - Choice Card: \`p-6 bg-slate-900 hover:bg-slate-800 border-2 border-slate-700 hover:border-indigo-500 rounded-3xl transition-all cursor-pointer\`.

---

### 🗄️ BACKEND DESIGN SPECIFICATION
- **REST API Endpoint**:
  \`\`\`http
  POST /api/v1/curriculum/minimal-pair/answer
  Authorization: Bearer <JWT>
  Content-Type: application/json

  Request Body:
  {
    "pairId": "mp_theta_t_01",
    "selectedChoice": "A",
    "playedTarget": "A",
    "responseTimeMs": 1420
  }

  Response 200 OK:
  {
    "isCorrect": true,
    "currentStreak": 5,
    "xpEarned": 15,
    "articulatoryTip": "Kẹp nhẹ đầu lưỡi giữa hai hàm răng khi phát âm /θ/!"
  }
  \`\`\`
- **Database Schema**:
  \`\`\`sql
  CREATE TABLE minimal_pair_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    pair_id VARCHAR(50) NOT NULL,
    is_correct BOOLEAN NOT NULL,
    response_time_ms INT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );
  \`\`\`
- **High Concurrency (5,000 Users)**:
  - Dữ liệu câu hỏi tĩnh phục vụ qua Cloudflare CDN, ghi log kết quả bất đồng bộ qua Redis Queue.`
  },
  {
    id: 'PRON-201',
    epic_id: 'epic-articulation',
    title: 'Interactive 2D Anatomical Lip & Tongue Articulation Guide: Mô Phỏng Thiết Diện Giải Phẫu Cắt Dọc 2D',
    persona: 'Người học tiếng Anh muốn thấy rõ cấu tạo bên trong vòm miệng khi phát âm các âm khó',
    action: 'chọn âm vị mục tiêu và tương tác với đồ họa giải phẫu 2D Sagittal Section',
    value: 'nhìn thấy rõ vị trí đầu lưỡi, độ nâng vòm miệng mềm (velum), độ hạ hàm dưới và luồng hơi thoát ra, kèm 3 thanh trượt điều chỉnh sinh học để hiểu bản chất cơ thể học khi phát âm',
    priority: 'must',
    status: 'in-progress',
    size: 'XL',
    points: 13,
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-pron-201-sagittal',
        given: 'Học viên chọn âm vị xát kẹp lưỡi /θ/ (think)',
        when: 'Thiết diện cắt dọc Sagittal 2D hiển thị',
        then: 'Đồ họa SVG kích thước 760x500 hiển thị vòm miệng, răng cửa trên dưới, và cơ lưỡi (màu Coral #fb7185) với đầu lưỡi thò ra kẹp giữa hai răng cửa; luồng khí Cyan (#38bdf8) thổi qua kẽ răng.',
        completed: true
      },
      {
        id: 'ac-pron-201-frontend-design',
        given: '3 thanh trượt điều chỉnh sinh học: Độ nâng lưỡi (Tongue Elevation), Độ hạ hàm (Jaw Drop), Áp lực hơi (Airflow Pressure)',
        when: 'Học viên kéo các thanh slider',
        then: 'Khối cơ lưỡi và xương hàm dưới trên đồ họa SVG dịch chuyển tức thời theo thời gian thực (real-time SVG coordinate transform), không bị giật lag, đạt tốc độ 60 FPS.',
        completed: true
      },
      {
        id: 'ac-pron-201-backend-design',
        given: '5,000 học viên cùng lúc tương tác với mô hình giải phẫu 2D',
        when: 'Tải dữ liệu tọa độ giải phẫu của các âm vị',
        then: 'Dữ liệu vector SVG được phân phối qua CDN Edge cache tĩnh (Cache-Control: public, max-age=31536000), 0% CPU máy chủ backend.',
        completed: true
      },
      {
        id: 'ac-pron-201-l1-precision',
        given: 'Học viên muốn so sánh cấu âm âm /θ/ vs âm /t/ tiếng Việt',
        when: 'Bật toggle "So Sánh Với Tiếng Việt"',
        then: 'Mô hình SVG vẽ đường bóng mờ vị trí lưỡi tiếng Việt (đầu lưỡi áp vào chân răng) đối chiếu với vị trí chuẩn tiếng Anh (đầu lưỡi thò ra ngoài 2 răng).',
        completed: true
      },
      {
        id: 'ac-pron-201-a11y-fallback',
        given: 'Người dùng sử dụng bàn phím',
        when: 'Tab vào các thanh slider',
        then: 'Hỗ trợ phím mũi tên trái/phải để tăng giảm giá trị từng nấc 1 đơn vị, có thuộc tính aria-valuenow rõ ràng.',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-pron-201-fe-svg', title: 'Thiết kế đồ họa SVG giải phẫu cắt dọc 2D Sagittal view 760x500 với các đường cong Bézier động', category: 'Frontend', completed: true },
      { id: 't-pron-201-fe-sliders', title: 'Tích hợp 3 thanh trượt điều khiển: tongueElev, jawDrop, airPressure đồng bộ tọa độ SVG', category: 'Frontend', completed: true },
      { id: 't-pron-201-be-static', title: 'Xuất bản và cấu hình CDN lưu trữ tệp tọa độ cấu âm IPA cho 44 âm vị tiếng Anh', category: 'DevOps/Scale', completed: true },
      { id: 't-pron-201-fe-compare', title: 'Xây dựng chế độ so sánh bóng mờ L1 Ghost Overlay trên canvas SVG', category: 'Frontend', completed: true },
      { id: 't-pron-201-qa', title: 'Kiểm tra tính chính xác về mặt giải phẫu cơ miệng theo tài liệu ngữ âm học đại học Oxford', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 FRONTEND DESIGN SPECIFICATION
- **Component File**: \`vietphonics-app/src/views/MouthAnatomyView.jsx\`
- **Component Hierarchy**:
  \`\`\`
  <MouthAnatomyView phoneme="/θ/">
    <SagittalCanvasSvg width={760} height={500}>
      <VocalTractOutline />
      <AnimatedTonguePath elevation={sliderState.tongueElev} shape={phonemeData.tongueShape} />
      <AirflowParticleStream pressure={sliderState.airPressure} />
      <AnatomicalLabels teeth="Incisors" palate="Hard Palate" velum="Soft Palate" />
    </SagittalCanvasSvg>
    <BioFeedbackSliders
      tongueElevation={sliderState.tongueElev}
      jawDrop={sliderState.jawDrop}
      airPressure={sliderState.airPressure}
      onChange={handleSliderChange}
    />
  </MouthAnatomyView>
  \`\`\`
- **Stitch Design Tokens**:
  - Tongue Muscle: \`fill-rose-500/80 stroke-rose-400 stroke-2\`
  - Airflow Stream: \`stroke-sky-400/80 stroke-dashed animate-pulse\`
  - Hard Palate: \`fill-slate-800 stroke-slate-600\`.

---

### 🗄️ BACKEND DESIGN SPECIFICATION
- **REST API Endpoint**:
  \`\`\`http
  GET /api/v1/phonetics/anatomy-svg/{phonemeSymbol}
  Cache-Control: public, max-age=31536000

  Response 200 OK:
  {
    "symbol": "/θ/",
    "classification": "Voiceless dental fricative",
    "svgPathData": {
      "tongueResting": "M 200 350 C 220 300, 280 250, 310 210 ...",
      "velumPosition": "raised",
      "jawDropDefault": 18
    },
    "vietnameseL1Contrast": "Tiếng Việt không có âm kẹp răng. Người Việt hay nhầm với âm /t/ hoặc /th/ (âm thờ tiếng Việt)."
  }
  \`\`\`
- **High Concurrency (5,000 Users)**:
  - Tệp SVG và tọa độ được CDN Edge Cache phân phối với hit ratio > 99.8%.`
  },
  {
    id: 'PRON-202',
    epic_id: 'epic-articulation',
    title: 'Phonemic Audio Dictation & Gap-Fill Exercises: Nghe Chính Tả & Điền Âm Vị Khuyết',
    persona: 'Người học muốn vừa luyện tai nghe vừa liên kết chính tả mặt chữ với âm vị thực tế',
    action: 'nghe câu phát âm mẫu bản ngữ và gõ các chữ cái/âm vị còn thiếu vào ô trống',
    value: 'khắc phục triệt để thói quen viết đúng nhưng đọc thiếu âm đuôi, củng cố mối liên hệ giữa chữ viết chính tả và âm vị học',
    priority: 'should',
    status: 'in-progress',
    size: 'M',
    points: 5,
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-pron-202-gap',
        given: 'Câu luyện tập có từ bị khuyết phụ âm đuôi (ví dụ: "Si___ months ago...")',
        when: 'Học viên nghe âm thanh mẫu và gõ ký tự "x" vào ô input',
        then: 'Hệ thống tự động kiểm tra, nếu đúng ô input đổi sang viền xanh lá lấp lánh và tự động phát âm thanh xác nhận chúc mừng.',
        completed: true
      },
      {
        id: 'ac-pron-202-frontend-design',
        given: 'Giao diện AudioDictationView',
        when: 'Hiển thị bài tập',
        then: 'Câu văn bản lớn cỡ 22px với các ô điền từ khuyết (Gap Input) viền sáng, thanh phát audio có nút tua lại 3 giây và điều chỉnh tốc độ 0.75x, nút nộp bài to bản ở đáy màn hình.',
        completed: true
      },
      {
        id: 'ac-pron-202-backend-design',
        given: '5,000 học viên nộp bài nghe chính tả đồng thời',
        when: 'Endpoint POST /api/v1/practice/dictation-submit xử lý',
        then: 'Kiểm tra chuỗi đáp án (String Distance / Levenshtein Distance) trong RAM dưới 5ms, ghi nhận điểm số vào PostgreSQL.',
        completed: true
      },
      {
        id: 'ac-pron-202-l1-precision',
        given: 'Các từ có âm đuôi câm hoặc thay đổi cách viết (e.g., "doubt" âm /b/ câm, "climb" âm /b/ câm)',
        when: 'Học viên điền từ',
        then: 'Hệ thống chú thích rõ: "Chú ý: Trong từ \'doubt\', chữ cái \'b\' là âm câm, phát âm chỉ là /daʊt/".',
        completed: true
      },
      {
        id: 'ac-pron-202-a11y-fallback',
        given: 'Học viên điền từ bằng bàn phím',
        when: 'Nhập xong 1 ô ký tự',
        then: 'Con trỏ bàn phím (Focus) tự động nhảy sang ô kế tiếp mà không cần dùng chuột.',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-pron-202-fe-input', title: 'Xây dựng component GapFillWordInput.jsx tự động nhảy focus khi gõ đủ ký tự', category: 'Frontend', completed: true },
      { id: 't-pron-202-fe-player', title: 'Thiết kế trình phát DictationAudioPlayer với phím tắt tua 3s (Phím J) và tạm dừng (Phím K)', category: 'Frontend', completed: true },
      { id: 't-pron-202-be-eval', title: 'Xây dựng API POST /api/v1/practice/dictation-submit kiểm tra đáp án và tính điểm thưởng', category: 'Backend', completed: true },
      { id: 't-pron-202-be-dict', title: 'Xây dựng cơ sở dữ liệu 200 câu chính tả âm vị chuyên bẫy âm câm và âm đuôi phức tạp', category: 'Backend', completed: true },
      { id: 't-pron-202-qa', title: 'Kiểm thử hộp đen các trường hợp gõ chữ hoa/thường, khoảng trắng và ký tự đặc biệt', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 FRONTEND DESIGN SPECIFICATION
- **Component File**: \`vietphonics-app/src/components/articulation/AudioDictationCard.jsx\`
- **Stitch Design Tokens**:
  - Gap Input: \`w-14 text-center font-mono text-xl font-bold rounded-xl border-2 border-slate-700 bg-slate-900 text-indigo-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20\`
  - Correct State: \`border-emerald-500 bg-emerald-500/10 text-emerald-400\`.

---

### 🗄️ BACKEND DESIGN SPECIFICATION
- **REST API Endpoint**:
  \`\`\`http
  POST /api/v1/practice/dictation-submit
  Authorization: Bearer <JWT>
  Content-Type: application/json

  Request Body:
  {
    "exerciseId": "dic_0912",
    "userAnswers": { "gap_1": "x" }
  }

  Response 200 OK:
  {
    "isCorrect": true,
    "fullWord": "six",
    "ipa": "/sɪks/",
    "explanation": "Từ 'six' kết thúc bằng cụm phụ âm /ks/."
  }
  \`\`\``
  },
  {
    id: 'PRON-203',
    epic_id: 'epic-articulation',
    title: 'Targeted Sound Read-Aloud & Contextual Fluency Drills: Luyện Đọc To Âm Mục Tiêu Trong Ngữ Cảnh',
    persona: 'Người học muốn chuyển tiếp từ việc phát âm đúng từ đơn lẻ sang việc nói trôi chảy cả cụm từ và câu hoàn chỉnh',
    action: 'đọc to các câu văn giàu âm mục tiêu (Target Sound Saturated Sentences) và nhận phản hồi tức thời về độ chính xác và nhịp điệu',
    value: 'tạo sự tự tin khi nói câu dài, đảm bảo âm mục tiêu không bị biến dạng khi nói ở tốc độ bình thường',
    priority: 'must',
    status: 'in-progress',
    size: 'M',
    points: 5,
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-pron-203-read-aloud',
        given: 'Câu luyện tập âm /θ/: "I think thirty-three thieves thought of that"',
        when: 'Học viên đọc to vào micro',
        then: 'Hệ thống nhận diện và chấm điểm riêng biệt cho từng vị trí xuất hiện của âm /θ/ trong cả câu.',
        completed: true
      },
      {
        id: 'ac-pron-203-frontend-design',
        given: 'Giao diện TargetedSoundDrillView',
        when: 'Render trên màn hình',
        then: 'Các từ chứa âm mục tiêu được bôi đậm màu xanh Sky-400, có chỉ số đếm số lượng âm đã phát âm đạt (ví dụ: 5/6 âm /θ/ đạt chuẩn), thanh sóng âm chạy mượt.',
        completed: true
      },
      {
        id: 'ac-pron-203-backend-design',
        given: '5,000 học viên nộp bài đọc câu',
        when: 'API POST /api/v1/scoring/targeted-sound tiếp nhận',
        then: 'Mô hình CTC Alignment trích xuất riêng điểm số của các âm /θ/ mục tiêu và trả về kết quả trong dưới 250ms.',
        completed: true
      },
      {
        id: 'ac-pron-203-l1-precision',
        given: 'Học viên đọc từ "thirty" thành "tơ-ti" (biến /θ/ thành /t/)',
        when: 'Phân tích kết quả',
        then: 'Cảnh báo chính xác: "Từ \'thirty\' bạn đã phát âm thành /t/. Cần đặt lưỡi giữa hai hàm răng!".',
        completed: true
      },
      {
        id: 'ac-pron-203-a11y-fallback',
        given: 'Học viên muốn nghe đọc mẫu từng cụm nhỏ',
        when: 'Bấm vào từng cụm từ',
        then: 'Hệ thống phát âm thanh cô lập của riêng cụm từ đó ở tốc độ chuẩn.',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-pron-203-fe-view', title: 'Xây dựng component TargetSoundSentenceView.jsx với tính năng highlight từ thông minh', category: 'Frontend', completed: true },
      { id: 't-pron-203-fe-tracker', title: 'Thiết kế bộ đếm TargetPhonemeBadgeCounter đếm số âm đạt chuẩn trong câu', category: 'Frontend', completed: true },
      { id: 't-pron-203-be-scoring', title: 'Phát triển API POST /api/v1/scoring/targeted-sound lọc điểm theo phoneme symbol', category: 'Backend', completed: true },
      { id: 't-pron-203-be-cache', title: 'Lưu trữ ngân hàng 300 câu luyện bão hòa âm trong Redis', category: 'Backend', completed: true },
      { id: 't-pron-203-qa', title: 'Kiểm thử độ nhạy nhận diện âm mục tiêu trong các câu có mật độ âm cao', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 FRONTEND DESIGN SPECIFICATION
- **Component File**: \`vietphonics-app/src/components/articulation/TargetSoundDrill.jsx\`
- **Stitch Design Tokens**:
  - Target Token: \`font-bold text-sky-400 bg-sky-500/10 px-1.5 py-0.5 rounded border border-sky-500/30\`
  - Score Badge: \`bg-slate-900 border border-slate-800 rounded-full px-4 py-1.5 font-mono text-sm\`.

---

### 🗄️ BACKEND DESIGN SPECIFICATION
- **REST API Endpoint**:
  \`\`\`http
  POST /api/v1/scoring/targeted-sound
  Authorization: Bearer <JWT>
  Content-Type: application/json

  Request Body:
  {
    "sentenceId": "sat_theta_01",
    "targetPhoneme": "/θ/",
    "audioUrl": "https://r2.vietphonics.com/audio/sat_01.opus"
  }

  Response 200 OK:
  {
    "targetSoundAccuracy": 83.3,
    "totalOccurrences": 6,
    "successfulOccurrences": 5,
    "phonemeBreakdown": [
      { "word": "think", "score": 92 },
      { "word": "thirty", "score": 45, "issue": "replaced_by_/t/" }
    ]
  }
  \`\`\``
  },
  {
    id: 'PRON-204',
    epic_id: 'epic-articulation',
    title: 'Dual-Track Audio Recording & Native Speaker Waveform Comparison: So Sánh Sóng Âm Đôi Kênh Học Viên & Kênh Bản Xứ',
    persona: 'Học viên muốn nhìn thấy tận mắt sự khác biệt về hình dáng âm thanh và thời lượng giữa giọng mình và người bản xứ',
    action: 'thu âm giọng nói và quan sát 2 dải sóng âm song song (Dual-Track Audio Studio), kéo thanh trượt Scrubbing để nghe và soi từng đoạn âm',
    value: 'cung cấp bằng chứng thị giác trực quan tuyệt đối, giúp học viên tự phát hiện chỗ mình ngân quá ngắn hoặc phát âm thừa âm',
    priority: 'must',
    status: 'in-progress',
    size: 'L',
    points: 8,
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-pron-204-dual-track',
        given: 'Học viên vừa hoàn thành lượt thu âm từ "thought"',
        when: 'Màn hình hiển thị 2 track sóng âm',
        then: 'Track A (Bản xứ) màu xanh Sky và Track B (Học viên) màu đỏ Rose xếp thẳng hàng thời gian với nhau.',
        completed: true
      },
      {
        id: 'ac-pron-204-frontend-design',
        given: 'Giao diện DualTrackStudioView',
        when: 'Render trên màn hình',
        then: 'Bảng điều khiển phòng thu âm phong cách chuyên nghiệp: 2 track sóng âm độc lập, thanh trượt phát lại đồng thời (Playhead Scrubber) chạy dọc qua 2 track, nút chuyển kênh A/B một chạm.',
        completed: true
      },
      {
        id: 'ac-pron-204-backend-design',
        given: '5,000 học viên cùng tải và so sánh sóng âm',
        when: 'Tải dữ liệu biên độ sóng âm (Waveform Peak Data JSON)',
        then: 'File peaks data được sinh trước (Pre-computed Peaks) kích thước chỉ 2KB tải qua Cloudflare CDN trong dưới 10ms.',
        completed: true
      },
      {
        id: 'ac-pron-204-l1-precision',
        given: 'Học viên ngân nguyên âm quá ngắn so với người bản xứ (ví dụ /ɔː/ trong "thought" chỉ kéo dài 100ms thay vì 220ms)',
        when: 'So sánh độ rộng của track sóng âm',
        then: 'Vùng chênh lệch hiển thị khung viền đứt nét màu vàng kèm thông báo: "Nguyên âm của bạn quá ngắn! Hãy kéo dài thêm 120ms".',
        completed: true
      },
      {
        id: 'ac-pron-204-a11y-fallback',
        given: 'Học viên muốn nghe tuần tự từng kênh',
        when: 'Bấm phím A để nghe bản xứ, phím B để nghe lại giọng mình',
        then: 'Âm thanh phát ngay lập tức không trễ, có thông báo trạng thái rõ ràng.',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-pron-204-fe-studio', title: 'Xây dựng component DualTrackWaveformStudio.jsx với 2 dải sóng Canvas và Playhead Scrubber', category: 'Frontend', completed: true },
      { id: 't-pron-204-fe-peaks', title: 'Viết thuật toán trích xuất Waveform Peaks từ Float32Array của Web Audio API trên client', category: 'Audio/DSP', completed: true },
      { id: 't-pron-204-be-peaks', title: 'Xây dựng API sinh trước Peaks JSON cho 5,000 mẫu âm thanh bản xứ', category: 'Backend', completed: true },
      { id: 't-pron-204-be-cdn', title: 'Cấu hình CDN caching cho các file Peaks JSON phục vụ 5,000 users', category: 'DevOps/Scale', completed: true },
      { id: 't-pron-204-qa', title: 'Kiểm thử độ đồng bộ mili-giây giữa Playhead và luồng phát âm thanh', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 FRONTEND DESIGN SPECIFICATION
- **Component File**: \`vietphonics-app/src/components/articulation/DualTrackStudio.jsx\`
- **Stitch Design Tokens**:
  - Studio Panel: \`bg-slate-950 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4\`
  - Native Track: \`bg-slate-900 border border-sky-500/30 rounded-2xl p-3\`
  - User Track: \`bg-slate-900 border border-rose-500/30 rounded-2xl p-3\`
  - Playhead: \`w-0.5 bg-amber-400 absolute top-0 bottom-0 shadow-[0_0_8px_#f59e0b]\`.

---

### 🗄️ BACKEND DESIGN SPECIFICATION
- **API Endpoint Contract**:
  \`\`\`http
  GET /api/v1/audio/peaks/{wordId}
  Cache-Control: public, max-age=31536000

  Response 200 OK:
  {
    "word": "thought",
    "durationMs": 680,
    "peaks": [0.05, 0.12, 0.45, 0.88, 0.95, 0.80, 0.35, 0.10],
    "vowelStartMs": 140,
    "vowelEndMs": 420
  }
  \`\`\``
  },
  {
    id: 'PRON-205',
    epic_id: 'epic-articulation',
    title: '3-Tier Positional Phoneme Ladder: Luyện Âm Phân Vị (Đầu, Giữa, Cuối)',
    persona: 'Người học có thể phát âm chuẩn một âm khi nó đứng ở đầu từ nhưng lại bị nuốt hoặc sai khi âm đó đứng ở giữa hoặc cuối từ',
    action: 'luyện tập âm vị mục tiêu theo thang bậc 3 vị trí (Tier 1: Vị trí đầu từ Initial -> Tier 2: Vị trí giữa từ Medial -> Tier 3: Vị trí cuối từ Final)',
    value: 'đảm bảo làm chủ âm vị ở mọi vị trí phân bố âm học, giải quyết dứt điểm tình trạng "chỉ nói đúng được chữ đầu"',
    priority: 'must',
    status: 'in-progress',
    size: 'L',
    points: 8,
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-pron-205-ladder',
        given: 'Học viên chọn luyện âm /z/',
        when: 'Học viên vượt qua Tier 1 với điểm số >80%',
        then: 'Hệ thống tự động mở khóa Tier 2 (Medial e.g. "music", "lazy") và sau đó là Tier 3 (Final e.g. "buzz", "please").',
        completed: true
      },
      {
        id: 'ac-pron-205-frontend-design',
        given: 'Giao diện PositionalLadderView',
        when: 'Render trên màn hình',
        then: 'Thang leo bậc 3 tầng (3-Tier Ladder) phong cách hiện đại: Mỗi tầng là một thẻ Card có huy hiệu vị trí (Đầu - Giữa - Cuối), thanh sao hoàn thành (0/3 sao) và nút bắt đầu bài luyện.',
        completed: true
      },
      {
        id: 'ac-pron-205-backend-design',
        given: '5,000 học viên cập nhật tiến độ thang leo âm vị',
        when: 'Endpoint POST /api/v1/practice/positional-submit ghi nhận kết quả',
        then: 'Cập nhật trực tiếp vào bảng user_positional_progress và cache Redis với thời gian xử lý < 20ms.',
        completed: true
      },
      {
        id: 'ac-pron-205-l1-precision',
        given: 'Tier 3 (Vị trí cuối từ) là cửa ải khó khăn nhất của người Việt',
        when: 'Học viên vào Tier 3',
        then: 'Giao diện hiển thị gợi ý đặc biệt: "Cảnh báo: 85% người Việt mắc lỗi ở vị trí này! Hãy rung mạnh dây thanh quản khi phát âm /z/ ở cuối từ".',
        completed: true
      },
      {
        id: 'ac-pron-205-a11y-fallback',
        given: 'Học viên chuyển đổi giữa các bậc thang',
        when: 'Dùng phím Tab',
        then: 'Focus outline hiển thị rõ ràng trên từng nấc thang đã mở khóa.',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-pron-205-fe-ladder', title: 'Xây dựng component PositionalLadderView.jsx với 3 tầng nấc thang và hoạt ảnh mở khóa', category: 'Frontend', completed: true },
      { id: 't-pron-205-be-api', title: 'Xây dựng API POST /api/v1/practice/positional-submit cập nhật tiến độ 3 tầng', category: 'Backend', completed: true },
      { id: 't-pron-205-be-db', title: 'Thiết kế bảng user_positional_progress lưu trữ tiến độ theo từng vị trí âm', category: 'Backend', completed: true },
      { id: 't-pron-205-qa', title: 'Kiểm thử logic khóa/mở khóa tuần tự giữa 3 cấp bậc', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 FRONTEND DESIGN SPECIFICATION
- **Component File**: \`vietphonics-app/src/components/articulation/PositionalLadder.jsx\`
- **Stitch Design Tokens**:
  - Tier 1 (Initial): \`bg-sky-950/40 border-sky-500/40 text-sky-300\`
  - Tier 2 (Medial): \`bg-indigo-950/40 border-indigo-500/40 text-indigo-300\`
  - Tier 3 (Final): \`bg-rose-950/40 border-rose-500/40 text-rose-300\`.`
  },
  {
    id: 'PRON-206',
    epic_id: 'epic-articulation',
    title: 'Connected Speech Positional Progression: Nâng Cấp Từ Đơn Lên Cụm Từ & Câu',
    persona: 'Học viên đã nói đúng từ đơn lẻ ở cả 3 vị trí nhưng cần tiến lên mức độ giao tiếp câu tự nhiên',
    action: 'luyện tập theo lộ trình tăng dần độ dài: Từ đơn (Word) -> Cụm 2-3 từ (Collocation) -> Câu giao tiếp thực tế (Sentence)',
    value: 'bảo toàn độ chính xác của âm vị trong luồng lời nói liên tục, chuẩn bị sẵn sàng cho giao tiếp phản xạ ngoài đời thực',
    priority: 'must',
    status: 'in-progress',
    size: 'M',
    points: 5,
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-pron-206-progression',
        given: 'Học viên đạt điểm từ đơn "breathe" (>85%)',
        when: 'Hệ thống mở khóa bài luyện cụm từ',
        then: 'Hiển thị bài tập cụm từ: "breathe in deeply", sau đó là câu: "Take a moment to breathe in deeply".',
        completed: true
      },
      {
        id: 'ac-pron-206-frontend-design',
        given: 'Giao diện ProgressionView',
        when: 'Render trên màn hình',
        then: 'Thanh tiến trình 3 cấp độ (Word -> Phrase -> Sentence), mỗi cấp độ có huy hiệu rõ ràng và đồng hồ đếm điểm.',
        completed: true
      },
      {
        id: 'ac-pron-206-backend-design',
        given: '5,000 học viên gửi bài luyện cấp tiến',
        when: 'Xử lý qua API POST /api/v1/practice/progression-tier',
        then: 'Hệ thống đối soát điểm số và trả về kết quả trong dưới 150ms.',
        completed: true
      },
      {
        id: 'ac-pron-206-l1-precision',
        given: 'Khi chuyển sang câu dài, học viên có xu hướng quên âm đuôi',
        when: 'Chấm điểm câu dài',
        then: 'Hệ thống theo dõi độ suy hao điểm số (Degradation Score) và đưa ra cảnh báo kịp thời.',
        completed: true
      },
      {
        id: 'ac-pron-206-a11y-fallback',
        given: 'Học viên thao tác nhanh',
        when: 'Bấm phím Enter',
        then: 'Tự động chuyển sang cấp độ kế tiếp khi bài hiện tại đạt chuẩn.',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-pron-206-fe-prog', title: 'Xây dựng component ConnectedProgressionView.jsx với thanh tiến trình 3 cấp độ', category: 'Frontend', completed: true },
      { id: 't-pron-206-be-eval', title: 'Phát triển API POST /api/v1/practice/progression-tier kiểm soát điều kiện chuyển cấp', category: 'Backend', completed: true },
      { id: 't-pron-206-qa', title: 'Kiểm thử độ ổn định chấm điểm khi chuyển tiếp giữa các cấp độ', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 FRONTEND DESIGN SPECIFICATION
- **Component File**: \`vietphonics-app/src/components/articulation/ConnectedProgression.jsx\`
- **Stitch Design Tokens**:
  - Step Pills: \`px-4 py-2 rounded-full font-semibold text-xs border border-slate-700 bg-slate-900\`.`
  },
  {
    id: 'PRON-207',
    epic_id: 'epic-articulation',
    title: 'Phonetic Exception Words & Grammatical Voicing Alternations: Quy Tắc Biến Âm Ngữ Pháp Đuôi -s/-es & -ed',
    persona: 'Người học hay nhầm lẫn quy tắc phát âm đuôi danh từ số nhiều -s/-es (/s/, /z/, /ɪz/) và đuôi quá khứ -ed (/t/, /d/, /ɪd/)',
    action: 'luyện tập các bài tập phân loại âm đuôi ngữ pháp tương tác và nắm vững quy tắc hữu thanh/vô thanh',
    value: 'chấm dứt vĩnh viễn thói quen "từ nào có s cũng đọc là s" hoặc "từ nào có ed cũng đọc là đơ", đạt độ chuẩn xác ngữ pháp và phát âm tuyệt đối',
    priority: 'must',
    status: 'in-progress',
    size: 'L',
    points: 8,
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-pron-207-rules',
        given: 'Các từ tận cùng bằng âm hữu thanh (e.g., "dogs", "played")',
        when: 'Học viên phát âm đuôi -s hoặc -ed',
        then: 'Hệ thống kiểm tra thanh quản rung (/z/ hoặc /d/); nếu phát âm nhầm sang vô thanh (/s/ hoặc /t/) sẽ hiển thị cảnh báo giải thích quy tắc ngữ âm.',
        completed: true
      },
      {
        id: 'ac-pron-207-frontend-design',
        given: 'Giao diện VoicingRuleMasteryView',
        when: 'Render trên màn hình',
        then: 'Bảng 3 cột phân loại trực quan: Cột /s/, Cột /z/, Cột /ɪz/; thẻ bài từ vựng có thể kéo thả (Drag and Drop) hoặc bấm chọn vào đúng cột với âm thanh phản hồi vui nhộn.',
        completed: true
      },
      {
        id: 'ac-pron-207-backend-design',
        given: '5,000 học viên cùng làm bài luyện biến âm ngữ pháp',
        when: 'Endpoint POST /api/v1/grammar/voicing-check xử lý',
        then: 'Xử lý kiểm tra quy tắc và chấm điểm phát âm trong dưới 30ms.',
        completed: true
      },
      {
        id: 'ac-pron-207-l1-precision',
        given: 'Người Việt không có thói quen biến âm đuôi theo âm đứng trước',
        when: 'Giải thích quy tắc',
        then: 'Cung cấp câu thần chú dễ nhớ tiếng Việt: "Thời phong kiến phương tây" cho đuôi /s/ và "Sáng sớm chạy xe sh zỏm" cho đuôi /ɪz/.',
        completed: true
      },
      {
        id: 'ac-pron-207-a11y-fallback',
        given: 'Học viên không dùng chuột kéo thả',
        when: 'Dùng phím số 1, 2, 3 để gán từ vào cột',
        then: 'Thẻ từ tự động bay vào cột tương ứng kèm hiệu ứng mượt mà.',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-pron-207-fe-drag', title: 'Xây dựng component VoicingRuleBoard.jsx hỗ trợ kéo thả và phím tắt chọn cột', category: 'Frontend', completed: true },
      { id: 't-pron-207-be-rules', title: 'Xây dựng quy tắc PhonologicalRuleChecker kiểm tra tính đúng đắn của âm đuôi ngữ pháp', category: 'Backend', completed: true },
      { id: 't-pron-207-qa', title: 'Kiểm thử với 100 từ bất quy tắc phổ biến nhất trong tiếng Anh', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 FRONTEND DESIGN SPECIFICATION
- **Component File**: \`vietphonics-app/src/components/articulation/VoicingRuleMastery.jsx\`
- **Stitch Design Tokens**:
  - Column /s/: \`bg-sky-950/30 border-sky-500/40 rounded-3xl p-4\`
  - Column /z/: \`bg-indigo-950/30 border-indigo-500/40 rounded-3xl p-4\`
  - Column /ɪz/: \`bg-purple-950/30 border-purple-500/40 rounded-3xl p-4\`.`
  },
  {
    id: 'PRON-208',
    epic_id: 'epic-articulation',
    title: 'L1 Confusion-Trap Cross-Transition Drills: Bài Tập Đảo Ngữ Âm Chống Nhầm Lẫn Bẫy Âm L1',
    persona: 'Người học khi gặp các câu có 2 âm dễ nhầm đứng cạnh nhau (e.g., "She sells sea shells") lập tức bị líu lưỡi và đọc lẫn lộn',
    action: 'luyện tập các bài tập đảo âm chéo (Cross-Transition Drills) xen kẽ giữa 2 âm đối kháng (/s/ và /ʃ/, /l/ và /n/, /θ/ và /s/)',
    value: 'rèn luyện sự linh hoạt của cơ lưỡi và phản xạ thần kinh vận động, giúp học viên không bao giờ bị líu lưỡi khi giao tiếp thực tế',
    priority: 'must',
    status: 'in-progress',
    size: 'M',
    points: 5,
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-pron-208-tongue-twister',
        given: 'Câu luyện đảo âm: "She sells sea shells on the sea shore"',
        when: 'Học viên đọc câu vào micro',
        then: 'Hệ thống kiểm tra sự chuyển đổi vị trí đầu lưỡi giữa âm /s/ (răng khép) và âm /ʃ/ (môi cong chu ra trước).',
        completed: true
      },
      {
        id: 'ac-pron-208-frontend-design',
        given: 'Giao diện CrossTransitionDrillView',
        when: 'Render trên màn hình',
        then: 'Các từ chứa âm /s/ tô màu xanh Sky, các từ chứa âm /ʃ/ tô màu hồng Rose, có đồ họa biểu diễn sự chuyển đổi vị trí môi nhấp nháy đồng bộ.',
        completed: true
      },
      {
        id: 'ac-pron-208-backend-design',
        given: '5,000 học viên nộp bài luyện đảo âm',
        when: 'Xử lý phân tích âm vị',
        then: 'Mô hình phân tách rõ ràng ranh giới giữa 2 âm kề nhau với độ trễ phản hồi < 200ms.',
        completed: true
      },
      {
        id: 'ac-pron-208-l1-precision',
        given: 'Người Việt hay bị "đồng hóa âm" (đọc tất cả thành /s/ hoặc tất cả thành /ʃ/)',
        when: 'Hệ thống phát hiện lỗi đồng hóa',
        then: 'Cảnh báo cụ thể: "Bạn đã bị líu lưỡi! Hãy tách chậm từng từ: \'She\' (cong môi) -> \'sells\' (cười bè miệng)".',
        completed: true
      },
      {
        id: 'ac-pron-208-a11y-fallback',
        given: 'Học viên gặp khó khăn với tốc độ bình thường',
        when: 'Bật chế độ "Luyện Chậm (Slow-Mo Metronome)"',
        then: 'Hệ thống bật máy gõ nhịp Metronome 60 BPM hướng dẫn học viên đọc chuẩn từng từ theo nhịp gõ.',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-pron-208-fe-twister', title: 'Xây dựng component CrossTransitionTwister.jsx với máy gõ nhịp Metronome Web Audio', category: 'Frontend', completed: true },
      { id: 't-pron-208-be-eval', title: 'Phát triển API POST /api/v1/practice/confusion-trap chấm điểm độ phân tách âm', category: 'Backend', completed: true },
      { id: 't-pron-208-qa', title: 'Kiểm thử với 30 câu líu lưỡi kinh điển của người học tiếng Anh', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 FRONTEND DESIGN SPECIFICATION
- **Component File**: \`vietphonics-app/src/components/articulation/CrossTransitionDrill.jsx\`
- **Stitch Design Tokens**:
  - Sound A Chip: \`bg-sky-500/20 text-sky-400 border border-sky-500 font-bold px-2 py-1 rounded\`
  - Sound B Chip: \`bg-rose-500/20 text-rose-400 border border-rose-500 font-bold px-2 py-1 rounded\`.`
  },
  {
    id: 'PRON-209',
    epic_id: 'epic-articulation',
    title: 'Numbered Target Phoneme System & Multi-Spelling Sound Maps: Bản Đồ Mặt Chữ & Các Dạng Chính Tả Đa Dạng',
    persona: 'Người học tiếng Anh hoang mang vì cùng một âm vị lại có quá nhiều cách viết chữ khác nhau (ví dụ âm /f/ có thể viết là f, ph, gh)',
    action: 'tra cứu bản đồ chính tả đa dạng (Multi-Spelling Sound Map) của từng âm vị mục tiêu',
    value: 'nắm vững toàn bộ các biến thể chữ viết của một âm, không bao giờ bị cách viết tiếng Anh đánh lừa',
    priority: 'should',
    status: 'in-progress',
    size: 'M',
    points: 5,
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-pron-209-spelling-map',
        given: 'Học viên xem bản đồ âm /f/',
        when: 'Hệ thống hiển thị các nhánh chính tả',
        then: 'Hiển thị tỷ lệ xuất hiện: Chữ "f/ff" (78%), Chữ "ph" (18%), Chữ "gh" (4% e.g. rough, laugh) kèm ví dụ mẫu.',
        completed: true
      },
      {
        id: 'ac-pron-209-frontend-design',
        given: 'Giao diện MultiSpellingView',
        when: 'Render trên màn hình',
        then: 'Bản đồ tư duy hình cây (Mindmap Tree) hoặc mạng nhện SVG tương tác, click vào nhánh nào sẽ hiện danh sách các từ thông dụng thuộc nhánh đó.',
        completed: true
      },
      {
        id: 'ac-pron-209-backend-design',
        given: '5,000 học viên tra cứu bản đồ chính tả',
        when: 'Gọi GET /api/v1/dictionary/spelling-map/{phoneme}',
        then: 'Dữ liệu được nạp từ Redis Cache trong < 5ms.',
        completed: true
      },
      {
        id: 'ac-pron-209-l1-precision',
        given: 'Âm câm trong tiếng Anh (ví dụ "gh" trong "night", "though" là âm câm nhưng trong "laugh" lại đọc là /f/)',
        when: 'Xem bản đồ',
        then: 'Đánh dấu cảnh báo đặc biệt về âm câm để người học không bị nhầm lẫn.',
        completed: true
      },
      {
        id: 'ac-pron-209-a11y-fallback',
        given: 'Học viên dùng bàn phím duyệt bản đồ',
        when: 'Tab qua các nhánh',
        then: 'Mỗi nhánh đọc rõ tỷ lệ phần trăm và số lượng từ vựng.',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-pron-209-fe-map', title: 'Xây dựng component MultiSpellingMindmap.jsx dạng đồ họa SVG tương tác', category: 'Frontend', completed: true },
      { id: 't-pron-209-be-lexicon', title: 'Xây dựng cơ sở dữ liệu ánh xạ 44 âm vị với các biến thể mặt chữ chính tả trong tiếng Anh', category: 'Backend', completed: true },
      { id: 't-pron-209-qa', title: 'Kiểm tra độ chính xác của tỷ lệ phần trăm phân bố chính tả theo từ điển thống kê', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 FRONTEND DESIGN SPECIFICATION
- **Component File**: \`vietphonics-app/src/components/articulation/MultiSpellingSoundMap.jsx\`
- **Stitch Design Tokens**:
  - Center Node: \`w-24 h-24 rounded-full bg-indigo-600 text-white font-black text-2xl flex items-center justify-center shadow-2xl\`
  - Branch Node: \`bg-slate-900 border border-slate-700 rounded-2xl p-3 text-slate-200 hover:border-indigo-400\`.`
  },
  {
    id: 'PRON-210',
    epic_id: 'epic-articulation',
    title: 'Video-Synchronized Masterclass & Exaggerated Articulation Modeling: Lớp Học Khẩu Hình Video Phóng Đại Đồng Bộ',
    persona: 'Người học cần nhìn cận cảnh miệng và cơ mặt của chuyên gia bản ngữ ở góc quay siêu nét và chuyển động chậm để bắt chước',
    action: 'xem video bài giảng ngắn (30-45s) với chuyên gia bản ngữ phát âm ở chế độ phóng đại khẩu hình (Exaggerated Articulation), có đồ họa vector đồng bộ theo thời gian thực',
    value: 'quan sát rõ từng chuyển động tinh tế của cơ môi và răng mà mắt thường khó nhận ra ở tốc độ nói nhanh',
    priority: 'should',
    status: 'in-progress',
    size: 'L',
    points: 8,
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-pron-210-video-player',
        given: 'Học viên xem video khẩu hình âm /θ/',
        when: 'Video phát đến khoảnh khắc đặt lưỡi kẹp răng',
        then: 'Video tự động phóng to cận cảnh 2x vào vùng miệng, hiển thị vòng tròn phát sáng màu xanh chỉ vào đầu lưỡi và hiển thị phụ đề IPA đồng bộ.',
        completed: true
      },
      {
        id: 'ac-pron-210-frontend-design',
        given: 'Giao diện MasterclassPlayerView',
        when: 'Render trên màn hình',
        then: 'Trình phát video tỷ lệ 16:9 sắc nét Full HD, thanh điều khiển có nút chuyển góc quay (Góc thẳng / Góc nghiêng 45 độ), nút xem chậm 0.25x và nút lặp đoạn A-B.',
        completed: true
      },
      {
        id: 'ac-pron-210-backend-design',
        given: '5,000 học viên cùng stream video bài giảng',
        when: 'Truyền luồng video qua HLS (HTTP Live Streaming)',
        then: 'Các phân đoạn video (.ts / .m4s) được phân phối qua Cloudflare Stream CDN, thời gian khởi tạo video (Time-to-First-Frame) < 400ms.',
        completed: true
      },
      {
        id: 'ac-pron-210-l1-precision',
        given: 'So sánh góc quay miệng người Việt và người bản xứ',
        when: 'Chuyên gia giảng giải',
        then: 'Chỉ rõ: "Người Việt hay giữ môi trên bất động. Khi phát âm /w/ bạn cần chúm môi tròn như khi huýt sáo".',
        completed: true
      },
      {
        id: 'ac-pron-210-a11y-fallback',
        given: 'Học viên mạng yếu không tải được video HD',
        when: 'Hệ thống phát hiện băng thông thấp',
        then: 'Tự động hạ độ phân giải xuống 480p hoặc chuyển sang chế độ ảnh động WebP nén nhẹ nhàng.',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-pron-210-fe-player', title: 'Xây dựng component MasterclassVideoPlayer.jsx với tính năng lặp đoạn A-B và đổi góc quay', category: 'Frontend', completed: true },
      { id: 't-pron-210-be-hls', title: 'Thiết lập pipeline mã hóa video đa độ phân giải HLS (1080p, 720p, 480p) trên Cloudflare Stream', category: 'DevOps/Scale', completed: true },
      { id: 't-pron-210-qa', title: 'Kiểm thử khả năng phát mượt mà trên kết nối mạng 3G/4G chập chờn', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 FRONTEND DESIGN SPECIFICATION
- **Component File**: \`vietphonics-app/src/components/articulation/VideoMasterclassPlayer.jsx\`
- **Stitch Design Tokens**:
  - Video Frame: \`rounded-3xl overflow-hidden border-2 border-slate-800 bg-black aspect-video relative shadow-2xl\`
  - Control Overlay: \`bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent p-4 flex items-center justify-between\`.`
  },
  {
    id: 'PRON-211',
    epic_id: 'epic-articulation',
    title: 'Dense Target Sound Saturation Sentences: Luyện Câu Bão Hòa Âm Mục Tiêu Tối Đa',
    persona: 'Người học muốn thử thách cơ miệng ở cấp độ cao nhất để kiểm tra xem mình đã thực sự làm chủ âm vị chưa',
    action: 'luyện đọc các câu được thiết kế bão hòa âm mục tiêu với mật độ cực cao (tối thiểu 4-6 lần xuất hiện trong 1 câu ngắn)',
    value: 'tạo áp lực cấu âm liên tục giúp cơ miệng thích nghi và khắc sâu phản xạ cơ bắp tự động (Muscle Memory)',
    priority: 'should',
    status: 'in-progress',
    size: 'M',
    points: 5,
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-pron-211-saturation',
        given: 'Câu bão hòa âm /dʒ/: "George enjoyed arranging orange juice in the large fridge"',
        when: 'Học viên đọc câu vào micro',
        then: 'Hệ thống nhận diện cả 6 âm /dʒ/ và hiển thị biểu đồ radar thành tích cấu âm.',
        completed: true
      },
      {
        id: 'ac-pron-211-frontend-design',
        given: 'Giao diện SoundSaturationView',
        when: 'Render trên màn hình',
        then: 'Mỗi lần học viên phát âm đúng 1 âm mục tiêu, con số trên thanh "Bộ Đo Bão Hòa (Saturation Meter)" tăng lên kèm hiệu ứng phát sáng neon.',
        completed: true
      },
      {
        id: 'ac-pron-211-backend-design',
        given: '5,000 học viên nộp bài câu bão hòa',
        when: 'Chấm điểm qua API POST /api/v1/scoring/saturation-sentence',
        then: 'Trả kết quả chi tiết từng từ trong dưới 200ms.',
        completed: true
      },
      {
        id: 'ac-pron-211-l1-precision',
        given: 'Học viên phát âm /dʒ/ thành /z/ hoặc /d/ kiểu Việt Nam',
        when: 'Hệ thống chấm điểm',
        then: 'Chỉ rõ từ bị sai và hướng dẫn cách giật cằm và bật hơi mạnh của âm /dʒ/.',
        completed: true
      },
      {
        id: 'ac-pron-211-a11y-fallback',
        given: 'Học viên muốn nghe đọc mẫu câu bão hòa',
        when: 'Bấm nút "Nghe Bản Xứ"',
        then: 'Phát audio bản ngữ với âm /dʒ/ được phát âm rõ ràng, chuẩn xác.',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-pron-211-fe-meter', title: 'Xây dựng component SaturationMeter.jsx với hiệu ứng tích lũy năng lượng khi đọc đúng', category: 'Frontend', completed: true },
      { id: 't-pron-211-be-eval', title: 'Phát triển API POST /api/v1/scoring/saturation-sentence chấm điểm câu bão hòa', category: 'Backend', completed: true },
      { id: 't-pron-211-qa', title: 'Kiểm thử với ngân hàng 100 câu bão hòa âm vị khó', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 FRONTEND DESIGN SPECIFICATION
- **Component File**: \`vietphonics-app/src/components/articulation/SoundSaturationDrill.jsx\`
- **Stitch Design Tokens**:
  - Saturation Bar: \`h-3 rounded-full bg-slate-800 overflow-hidden\`, Fill: \`bg-gradient-to-r from-emerald-500 to-teal-400\`.`
  },
  {
    id: 'VN-105',
    epic_id: 'epic-articulation',
    title: 'Vietnamese Native-Tongue Mouth & Tongue Placement Guides: Cẩm Nang Vị Trí Đặt Lưỡi & Khẩu Hình Đối Chiếu Tiếng Việt',
    persona: 'Người học Việt Nam cần những lời chỉ dẫn cấu âm bình dị, gần gũi, sử dụng các hình ảnh so sánh với tiếng mẹ đẻ để dễ hình dung',
    action: 'đọc cẩm nang hướng dẫn cấu âm chuyên biệt cho người Việt (e.g., "Để phát âm /θ/, hãy tưởng tượng bạn đang chuẩn bị cắn nhẹ vào đầu lưỡi...")',
    value: 'xóa bỏ rào cản thuật ngữ ngữ âm học khô khan, biến việc học phát âm thành các mẹo dân gian dễ nhớ và áp dụng được ngay tức khắc',
    priority: 'must',
    status: 'in-progress',
    size: 'M',
    points: 5,
    acceptance_criteria: JSON.stringify([
      {
        id: 'ac-vn-105-guide',
        given: 'Học viên xem hướng dẫn âm /ð/ (this, that)',
        when: 'Mở tab cẩm nang tiếng Việt',
        then: 'Hiển thị mẹo 3 bước: 1. Đặt lưỡi như âm /θ/, 2. Bật tiếng rung cổ họng như tiếng ong kêu "zzz", 3. Rụt lưỡi lại nhanh.',
        completed: true
      },
      {
        id: 'ac-vn-105-frontend-design',
        given: 'Giao diện NativeTonguePlacementCard',
        when: 'Render trên màn hình',
        then: 'Thẻ bài phong cách cẩm nang hiện đại: Minh họa 3 bước hoạt hình trực quan, câu khẩu quyết ghi nhớ ngắn gọn đóng khung nổi bật, nút thử nghiệm micro ngay tại chỗ.',
        completed: true
      },
      {
        id: 'ac-vn-105-backend-design',
        given: '5,000 học viên tra cứu cẩm nang',
        when: 'Tải cẩm nang từ API GET /api/v1/phonetics/l1-guides',
        then: 'Dữ liệu được nạp từ Redis cache trong < 5ms.',
        completed: true
      },
      {
        id: 'ac-vn-105-l1-precision',
        given: 'So sánh sự khác biệt cơ bản giữa khẩu hình tiếng Việt và tiếng Anh',
        when: 'Xem phần nguyên lý',
        then: 'Giải thích: Tiếng Việt cơ miệng mềm và thả lỏng, tiếng Anh cơ miệng căng hơn và có độ nén khí lớn hơn.',
        completed: true
      },
      {
        id: 'ac-vn-105-a11y-fallback',
        given: 'Học viên muốn nghe đọc cẩm nang bằng tiếng Việt',
        when: 'Bấm nút "Đọc Cẩm Nang"',
        then: 'Hệ thống phát âm thanh tiếng Việt truyền cảm hướng dẫn từng bước.',
        completed: true
      }
    ]),
    technical_tasks: JSON.stringify([
      { id: 't-vn-105-fe-card', title: 'Xây dựng component L1MouthPlacementGuideCard.jsx với minh họa 3 bước trực quan', category: 'Frontend', completed: true },
      { id: 't-vn-105-be-content', title: 'Biên tập toàn bộ cẩm nang khẩu hình tiếng Việt cho 44 âm vị tiếng Anh', category: 'Pedagogy', completed: true },
      { id: 't-vn-105-qa', title: 'Kiểm thử mức độ dễ hiểu của cẩm nang đối với người học mới bắt đầu từ con số 0', category: 'QA', completed: true }
    ]),
    notes: `### 🎨 FRONTEND DESIGN SPECIFICATION
- **Component File**: \`vietphonics-app/src/components/articulation/NativeTonguePlacementGuide.jsx\`
- **Stitch Design Tokens**:
  - Guide Container: \`bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl\`
  - Step Badge: \`w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 font-bold flex items-center justify-center\`.`
  }
];
