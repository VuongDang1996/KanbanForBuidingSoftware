import React, { useState } from 'react';
import {
  Sparkles,
  Copy,
  Check,
  Code2,
  Palette,
  Camera,
  Layers,
  Activity,
  Mic,
  Shield,
  Volume2,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

export const ADVANCED_AI_PROMPTS = [
  {
    id: 'ADV-101',
    title: 'Golden Speaker: Voice-Cloned Self Model & 3-Track A/B/C Mirroring',
    tag: 'Voice Cloning & Timbre Mirroring',
    targetStory: 'ADV-101',
    icon: Sparkles,
    v0Prompt: `Create a modern React component named "GoldenSpeakerStudio" in Tailwind CSS (Light Mode) for an AI English pronunciation platform.

Layout & Sections:
1. Top Security & Consent Ribbon:
   - A clean white banner with an emerald green shield icon, stating "Biometric Voice Model Active (Private & Encrypted)".
   - A secondary button: "Delete My Voice Model" in light slate with a red trash icon that triggers a confirmation modal.
   - A badge indicating "30s Enrollment Sample Verified - 16kHz PCM".

2. Main 3-Track Waveform Mirroring Console:
   - Track A (Native Speaker Reference): Audio waveform with a play/pause pill, duration (0:03.2), and pitch contour line in sky blue (#0284C7).
   - Track B (Golden Speaker - Your Cloned Voice): High-priority spotlight card with a sparkling rose badge "Your Voice in Native General American". Waveform synced with Track A, pitch contour in crimson rose (#E11D48).
   - Track C (Your Actual Recording): Live audio track of user's attempt with timestamp, pitch contour in amber/slate showing divergence where the pitch went flat (Vietnamese L1 transfer error).

3. Synchronized Comparison Controls:
   - "Play All Synced" button, "A/B Quick Switcher" toggle (Native vs Golden vs You), and a speed slider (1.0x, 0.8x, 0.5x Slow-Mo).
   - Pitch Alignment Delta Card: Showing "Pitch Correlation: 88%" and "Duration Overlap: 94%".

4. Action Footer:
   - Big floating recording pill with microphone icon, ripple wave animation, and "Re-record My Attempt".

Style with pure white cards (#FFFFFF), soft slate background (#F8FAFC), subtle borders (#E2E8F0), and font-mono for IPA and pitch values.`,
    figmaPrompt: `Design a desktop SaaS screen (1440x900, Light Mode) called "Golden Speaker Voice Clone Studio". 
Acoustic audio tool aesthetic. Top navigation has user avatar, credit counter "Pro Plan - Unlimited Clones", and privacy badge. 
Central canvas features 3 horizontally stacked waveform audio player rows: 
Row 1 has badge "Native Coach (US)", Row 2 has highlighted card with gradient border and badge "Golden Speaker (Clone of You)", Row 3 has "Your Actual Speech". 
Each row displays interactive SVG pitch curves and amplitude spikes. 
Below is a pitch contour delta overlay graph where 3 color-coded lines compare intonation curves. 
Bottom control bar features large circular record button, A/B/C switch tabs, and playback speed stepper.
Colors: Pure white (#FFFFFF), light slate (#F8FAFC), slate-200 borders, crimson rose (#E11D48) accents, sky blue (#0284C7).`,
    midjourneyPrompt: `Minimalist high-end UI design of an AI voice cloning speech lab, displaying 3 layered glowing audio waveforms and pitch contour curves on a pristine white and silver glass interface, holographic sound waves, elegant data visualization, clean typography, hyper-detailed, UI/UX Behance showcase, 8k resolution, light theme --ar 16:9 --v 6.1`,
    researchNote: 'Dựa trên nghiên cứu "Golden Speaker Builder" (Ding et al., Texas A&M) và trào lưu AI Voice Mirroring 2025-2026. Học viên bắt chước tốt hơn 40% khi nghe chính âm sắc giọng mình phát âm chuẩn thay vì giọng người lạ.'
  },
  {
    id: 'ADV-102',
    title: 'Webcam Lip & Jaw Tracking: MediaPipe 478 Landmark Real-Time Gauges',
    tag: 'Computer Vision & Mouth Calipers',
    targetStory: 'ADV-102',
    icon: Camera,
    v0Prompt: `Build a React component "WebcamMouthTracker" using Tailwind CSS for client-side webcam biofeedback in Light Mode.

Key Features & UI Structure:
1. Video Viewport (Center-Left, 60% width):
   - A 16:9 mirrored webcam preview container with rounded-2xl corners, subtle shadow, and 1px border.
   - An interactive SVG overlay demonstrating 478 MediaPipe facial landmarks with subtle green/rose dot calipers focusing on the mouth, lips, and lower jaw contour.
   - A privacy guarantee floating pill: "🔒 Zero Cloud Upload: 100% Client-Side WebAssembly Processing".
   - Split-screen comparison toggle: "Picture-in-Picture Native Mouth Video" showing a native speaker articulating the target vowel /æ/ simultaneously.

2. Real-Time Physical Calipers Panel (Right, 40% width):
   - Gauge 1: Jaw Opening (Lower Incisor Drop)
     - Vertical progress bar with a target green bracket (80% - 95% opening for /æ/). Current reading: 65% (Amber warning: "Hạ quai hàm thêm 1.5cm - Miệng mở chưa đủ rộng").
   - Gauge 2: Lip Rounding (Horizontal vs Vertical Aperture)
     - Circular radial dial showing circularity ratio for sounds like /uː/ or /ʃ/.
   - Gauge 3: Lip Spread (Smile Tension)
     - Horizontal slider showing corner-of-mouth retraction for /iː/.

3. Instant Vietnamese Articulatory Feedback Banner:
   - Alert banner with gentle amber background: "Phát hiện thói quen khẩu hình hẹp tiếng Việt: Bạn đang phát âm /æ/ bằng cách mở miệng như âm 'e' tiếng Việt. Hãy tưởng tượng bác sĩ bảo nói 'A'!".

4. Calibration & Settings:
   - 3-second neutral face calibration button ("Calibrate Face Scale").
   - Toggle button for "Wireframe Landmark Overlay on/off".

Use a clean medical/phonetics lab theme: white cards, slate-100 bars, emerald-500 for within-target, amber-500 for adjustments, and rose-600 accents.`,
    figmaPrompt: `Design a split-screen desktop UI for "AI Webcam Articulation Coach". 
Left side: Live webcam feed with subtle turquoise facial mesh wireframe over the mouth, showing real-time millimeter distance measurements between upper and lower lips. 
Small PiP window in top corner showing native speech pathologist mouth movement. 
Right side: Three clinical measurement meters (Jaw Height, Lip Rounding, Corner Tension) with numerical percentages, min-max target brackets, and real-time status pills ("Target Reached", "Too Flat", "Drop Jaw"). 
Design in Light Mode with slate-50 background, pure white floating cards, soft drop shadows, and clean JetBrains Mono numbers.`,
    midjourneyPrompt: `Futuristic medical speech therapy interface, webcam facial mesh tracking lip and jaw movement with delicate holographic measurement calipers, pristine white minimalist medical UI, clean typography, hyper-realistic UI design, dribbble award-winning, 8k --ar 16:9 --v 6.1`,
    researchNote: '100% Client-side WebAssembly qua MediaPipe Tasks Vision. Giải quyết triệt để vấn đề người Việt không mở đủ khẩu hình hàm dưới cho Target 1 (/æ/ trong "cat", "access", "fantastic").'
  },
  {
    id: 'ADV-103',
    title: 'Live Vowel Space Quadrilateral F1/F2 Formant Biofeedback Chart',
    tag: 'Acoustic Biofeedback & Formant Map',
    targetStory: 'ADV-103',
    icon: Activity,
    v0Prompt: `Build an interactive React component "AcousticVowelSpaceQuadrant" in Tailwind CSS (Light Mode) for real-time formant biofeedback.

Components & Layout:
1. Quadrilateral Canvas (Main Viewport):
   - A 2D coordinate graph representing the International Phonetic Association Vowel Space.
   - Y-Axis (Inverted): Formant 1 (F1: 200Hz to 1000Hz - High Tongue / Close Jaw to Low Tongue / Open Jaw).
   - X-Axis (Inverted): Formant 2 (F2: 2500Hz to 800Hz - Front Tongue to Back Tongue).
   - Elliptical Target Zones: 12 shaded ellipses representing native General American vowels:
     - /iː/ (sheep - top left: high front)
     - /ɪ/ (ship - slightly lower & central)
     - /æ/ (cat - bottom left: low front)
     - /ʌ/ (cup - mid central-back)
     - /uː/ (moon - top right: high back)
     - /ɑː/ (car - bottom right: low back)
   - Live Voice Puck: A glowing pulsing circle with motion trail representing the user's live audio F1/F2 pitch coordinates extracted via Web Audio API LPC.
   - When the puck enters the target ellipse (e.g. /iː/), the ellipse highlights in emerald green with a celebratory sound effect badge ("Ding! Target Hit").

2. Side Panel - Vietnamese L1 Acoustic Traps:
   - Target Sound Selector pills (/iː/ vs /ɪ/, /æ/ vs /e/, /ʌ/ vs /ɑː/).
   - "Distance to Native Target" gauge: showing current Hz delta (e.g., "F1 is 140Hz too low — drop your jaw lower to shift downward on the chart").
   - 3-Point Personal Calibration Card (Lobanov normalization button: "Say /iː/, /ɑː/, /uː/ for 2 seconds to calibrate for your vocal tract").

Light theme: Clean white canvas with light slate gridlines (#E2E8F0), pastel colored ellipses, dark slate labels (#0F172A), and vibrant neon-rose/cyan puck trail.`,
    figmaPrompt: `Design an acoustic biofeedback chart UI for vowel pronunciation. 
Main area is an inverted 2D scatter plot showing standard IPA vowel quadrilateral with target ellipses for vowels /iː/, /ɪ/, /e/, /æ/, /ʌ/, /ɑː/, /ɔː/, /ʊ/, /uː/. 
A bright illuminated orb with dynamic motion trail shows current user vocal position. 
Right sidebar has vowel pair selector, real-time Hz delta indicators, and voice calibration modal. 
Design in Light Mode: clean white paper aesthetic, soft slate borders, pastel scientific color-coding, modern data-visualization UI.`,
    midjourneyPrompt: `Clean scientific data visualization dashboard of an acoustic vowel space chart, F1 and F2 frequency coordinates, glowing interactive nodes, minimal swiss typography, light mode, clean white background, high-resolution UI screen mockup, Behance trending --ar 16:9 --v 6.1`,
    researchNote: 'Biofeedback thị giác trực tiếp bằng Formant F1/F2 (giải pháp được chứng minh lâm sàng tại Đại học British Columbia). Người học nhìn thấy vị trí lưỡi và tự nắn khẩu hình để đưa chấm sáng vào vùng xanh lá.'
  },
  {
    id: 'ADV-104',
    title: 'AI Phonetics Coach with Memory & Articulatory Diagnosis',
    tag: 'LLM Reasoning & Articulatory Vectors',
    targetStory: 'ADV-104',
    icon: Shield,
    v0Prompt: `Create a modern React component "ArticulatoryAiCoach" in Tailwind CSS (Light Mode) displaying deep articulatory phonetics diagnosis with memory.

Layout & Cards:
1. Header with Memory Badge:
   - AI Coach Avatar with name "Dr. Phonics AI (Articulatory Engine)".
   - Weekly Recurrence Banner: "⚠️ Lỗi lặp lại tuần này: Bạn đã thay thế âm /ð/ bằng /d/ 12 lần (từ 'they', 'this', 'other'). Hãy cùng sửa dứt điểm hôm nay!"

2. The 3 Physical Articulatory Vectors Card:
   - Vector 1: Voicing (Thanh Quản)
     - Status: ✓ Đúng (Vocal cords vibrating properly). Pill: Green.
   - Vector 2: Place of Articulation (Vị Trí Cấu Âm)
     - Status: ✗ Sai (Lưỡi đang đặt ở nướu răng trên /d/ thay vì kẹp nhẹ giữa 2 hàm răng /ð/). Pill: Rose-500.
   - Vector 3: Manner of Articulation (Cách Thoát Hơi)
     - Status: ✗ Sai (Bạn đang bật tắc hơi /d/ dạng plosive thay vì thổi ma sát liên tục /ð/ dạng fricative). Pill: Amber-500.

3. Interactive Physical Correction Guide (Vietnamese):
   - A step-by-step physical instruction card with anatomical mini-diagram: "1. Thè nhẹ 2mm đầu lưỡi ra giữa 2 hàm răng. 2. Cắn nhẹ (không làm đau). 3. Vừa rung cổ họng vừa thổi gió luồn qua khe răng."

4. 30-Second Micro-Drill Launcher:
   - Rapid-fire drill: "Tập 5 từ chứa /ð/: this, that, these, those, with". Start button with 30s countdown timer.

Style: Clean clinical aesthetic with white cards, slate-200 borders, distinct status pills, and Vietnamese pedagogical copy.`,
    figmaPrompt: `Design an AI Speech Pathology consultation card in Light Mode. 
Top has conversational notification banner referencing past learning history ("You repeated this error 12 times this week"). 
Center contains 3 status metric tiles for Articulatory Phonetics: Voicing (Vocal Cord Vibration), Place of Articulation (Tongue/Teeth), Manner of Articulation (Airflow Pattern). 
Lower section provides a step-by-step physical mouth adjustment guide with dental illustrations, followed by a primary CTA button "Start 30-Second Muscle-Memory Drill". 
Style: Minimalist white cards, slate-200 borders, rose and emerald accents.`,
    midjourneyPrompt: `Modern clean UI card design for an AI speech doctor consultation, anatomical tongue and dental diagram, elegant typography, light mode, white background, soft shadow, dribbble design awards --ar 16:9 --v 6.1`,
    researchNote: 'Kết hợp Mispronunciation Detection & Diagnosis (MDD) với vector cấu âm học và bộ nhớ ngữ cảnh nhiều tuần. LLM chỉ diễn giải dữ liệu JSON có cấu trúc, không bị ảo giác điểm.'
  },
  {
    id: 'ADV-105',
    title: 'Connected Speech Lab: Linking Arcs & Reduction Decoder',
    tag: 'Connected Speech & Linking Arcs',
    targetStory: 'ADV-105',
    icon: Layers,
    v0Prompt: `Create a modern React component "ConnectedSpeechLab" in Tailwind CSS (Light Mode).

Features & Layout:
1. Mode Switcher Bar:
   - Mode 1: "Visual Linking & Shadowing" (Active)
   - Mode 2: "Listening Decoder (Reverse Dictation)"

2. Sentence Display with Dynamic Linking Arcs (SVG):
   - Target sentence: "Turn it off and pick it up"
   - Words displayed in large typography (28px font-bold text-slate-900).
   - Underneath words, curved colorful SVG linking arcs connect:
     - "Turn‿it" (Consonant to Vowel Linking: /tɜːrnɪt/) - Blue Arc
     - "it‿off" (Flapped /t/: /ɪ.ɾɒf/) - Rose Arc
     - "off‿and" (Liaison: /ɒfənd/) - Sky Arc
     - "pick‿it‿up" (Double link: /pɪ.kɪ.tʌp/) - Emerald Arc
   - Each arc is clickable: clicking an arc isolates and loops that 0.4s audio segment with slow-motion (0.7x).

3. Reduction & Slang Dictionary Pill Ribbon:
   - Highlight cards for common reductions:
     - "want to" → "wanna" (/ˈwɒn.ə/)
     - "going to" → "gonna" (/ˈɡən.ə/)
     - "did you" → "didja" (/ˈdɪdʒ.ə/ - Palatalization Assimilation)

4. Acoustic Forced-Alignment Gap Meter:
   - When user records the sentence, system measures the silence gap between words.
   - If pause between "Turn" and "it" > 120ms, it flags "Robotic Staccato Pause detected (210ms). Try blending without stopping airflow."
   - Overall "Fluidity & Connected Speech Score: 84%".

5. Listening Decoder Mode:
   - Native audio plays at natural fast speed: "Whaddaya wanna do tonight?"
   - User types the standard written English words ("What do you want to do tonight?").
   - Shows diff comparison explaining how spoken English compresses function words.

Use a high-clarity Light Mode theme with white cards, colorful SVG arcs, smooth hover transitions, and clear phonetic breakdown.`,
    figmaPrompt: `Design an interactive sentence pronunciation screen called "Connected Speech Lab" in Light Mode. 
In the center, large English text displays words connected by curved visual ligature arcs underneath, color-coded by linguistic phenomenon (Consonant-to-Vowel Linking in blue, Flapped T in pink, Reduction in green). 
Clicking any ligature reveals an audio scrubber with loop toggle. 
Below is a speech rhythm timeline showing syllable durations and pause intervals in milliseconds. 
Clean white cards, slate-50 background, colorful curved vectors, modern language-learning UI.`,
    midjourneyPrompt: `Interactive linguistics interface with colorful connecting arcs between typography letters, audio waveform scrubbers, minimalist white aesthetic, hyper-detailed UI design, dribbble trending --ar 16:9 --v 6.1`,
    researchNote: 'Giải quyết điểm yếu lớn nhất của người Việt: nói theo nhịp âm tiết (syllable-timed) làm câu bị giật cụt. Vẽ trực quan cung nối âm ‿ giúp luyện tai nghe kịp phim và podcast tốc độ thật.'
  },
  {
    id: 'ADV-106',
    title: 'Dual Intelligibility vs Accent Comprehensibility Scorecard',
    tag: 'Intelligibility Principle & ASR Panel',
    targetStory: 'ADV-106',
    icon: Volume2,
    v0Prompt: `Build a React component "IntelligibilityScorecard" in Tailwind CSS (Light Mode) based on the "Intelligibility Principle" in linguistics.

Key Components:
1. Dual-Axis Hero Scorecard:
   - Metric A (Primary, 70% visual prominence): "Intelligibility Score: 94%" (Green radial meter - "Will international colleagues and native speakers understand your words clearly?").
   - Metric B (Secondary, 30% prominence): "Accent Strength: 68%" (Slate/Blue bar - "How close is your phonetic timbre to standard General American?").
   - Encouraging Pedagogical Message: "🎉 Xuất sắc! Điểm hiểu được đạt 94%. Bạn nói rất rõ ràng và tự tin. Giữ một chút âm sắc Việt Nam (Vietnamese accent flavor) là hoàn toàn bình thường và duyên dáng trong môi trường quốc tế!"

2. Multi-ASR Listener Panel Simulation:
   - Shows how 3 different AI listeners transcribed your recording:
     - Listener 1 (OpenAI Whisper): 100% Match ("I want to eat a fresh peach on the beach")
     - Listener 2 (Meta Wav2Vec2): 100% Match
     - Listener 3 (Web Speech API): 92% Match (Misheard 1 word)
   - Average Word Error Rate (WER): 2.6%.

3. Critical "Dangerous Homophone Collision" Warning Alert:
   - High-contrast alert card for dangerous L1 vowel length / consonant slips:
     - Word Attempted: "Beach" (/biːtʃ/ - long i)
     - Risk: Did not slip into vulgar homophone "Bitch" (/bɪtʃ/ - short i). Status: SAFE ✓ (Vowel duration: 280ms).
     - Other monitored pairs: sheet/shit, piece/piss, focus/fuck-us.

4. CEFR & IELTS Pronunciation Band Mapping:
   - Progress pill: "Equivalent to IELTS Pronunciation Band 7.5 / CEFR C1 Professional Fluency".

Clean white card aesthetic, vibrant emerald score meters, rose alert badges, and informative tooltips explaining the research behind intelligibility vs accent.`,
    figmaPrompt: `Design a comprehensive pronunciation scorecard in Light Mode with two distinct focal scores: 
A large primary circular progress ring for "Intelligibility Score" (94% - Can people understand you?) and a secondary linear slider for "Accent Closeness" (68% - Native American resemblance). 
A panel below titled "Listener Simulation Panel" displays 3 independent AI models and their transcription accuracy. 
An emergency alert card highlights "No Embarrassing Homophone Slips detected (beach vs bitch verified)". 
Palette: Slate-50 background, pure white cards, vivid emerald #059669 and rose #E11D48 accents.`,
    midjourneyPrompt: `Luxury SaaS analytics dashboard for voice clarity and accent comprehensibility, circular emerald data rings, elegant typography, clean white layout, light mode, UI Behance portfolio --ar 16:9 --v 6.1`,
    researchNote: 'Phân định rõ ranh giới giữa "Nói để được hiểu" (Intelligibility) và "Nói mất hẳn giọng mẹ đẻ" (Accent Reduction). Giúp người đi làm tự tin, không bị ám ảnh cầu toàn tiêu cực.'
  },
  {
    id: 'ADV-107',
    title: 'Spontaneous Speech Voice Journal: 60s Daily Free Speaking & Transfer Gap',
    tag: 'Spontaneous Speech & Longitudinal Tracking',
    targetStory: 'ADV-107',
    icon: Mic,
    v0Prompt: `Create a React component "SpontaneousVoiceJournal" in Tailwind CSS (Light Mode).

Layout & Features:
1. Daily Prompt Card:
   - Day badge: "Day 42 of 90 Voice Challenge".
   - Speaking Prompt in English & Vietnamese: "Describe a project you worked on recently that made you feel proud. (Kể về một dự án gần đây khiến bạn tự hào - 60 giây)."
   - Suggestion chip pills with target vocabulary to use: "collaboration", "architecture", "breakthrough".

2. 60-Second Audio Recorder with Live ASR Transcription:
   - Big circular microphone button with live recording timer (00:38 / 01:00).
   - Audio waveform reacting to user's volume.
   - Live streaming transcription text box highlighting detected speech errors in real-time as words appear (unscripted forced alignment).

3. "Transfer Gap" Metric Card (Key Innovation):
   - Scripted Reading Score (controlled exercises): 88%
   - Spontaneous Speech Score (free speaking): 71%
   - Transfer Gap: 17% gap.
   - Insight: "Khi tự do suy nghĩ ý tưởng, các lỗi rụng âm đuôi /s, ed/ và nuốt /θ/ xuất hiện trở lại nhiều hơn 2.4 lần. Hãy tập trung thở đều và chậm lại 10%!"

4. "Day 1 vs Day 90" Audio Time Capsule:
   - Dual player comparing Day 1 recording vs Current Day recording with audio crossfader slider to hear audible transformation.

Light Mode styling: Soft background (#F8FAFC), crisp white containers, subtle rose recording pulse, and interactive line charts showing gap narrowing over weeks.`,
    figmaPrompt: `Design a mobile-responsive desktop UI for "Daily Pronunciation Voice Journal". 
Top card features a daily creative speaking prompt with timer countdown (60s). 
Middle card features an active recording module with live voice waveform and streaming auto-transcription where mispronounced syllables are marked in amber. 
Bottom section displays a comparison chart: "The Transfer Gap" (Read-Aloud Score 88% vs Free-Speaking Score 71%) and an audio player comparing Day 1 vs Day 90 voice recordings. 
Light theme, modern journaling aesthetic, pure white surfaces, soft shadows.`,
    midjourneyPrompt: `Minimalist audio voice journal app interface, daily speaking prompt, sound recording waveform, line chart showing progress over 90 days, clean white and rose palette, light mode UI --ar 16:9 --v 6.1`,
    researchNote: 'Đo lường sự chuyển giao (Transfer) thực tế từ bài tập sang giao tiếp tự do. Speechace v9 & ELSA 2026 đang đầu tư mạnh mẽ vào bài toán chấm điểm không kịch bản.'
  },
  {
    id: 'ADV-108',
    title: 'Accent Explorer & Target Dialect Selector (US vs UK vs AUS)',
    tag: 'Multi-Dialect Code-Switching & Non-Rhoticity',
    targetStory: 'ADV-108',
    icon: Code2,
    v0Prompt: `Create a React component "AccentExplorer" in Tailwind CSS (Light Mode) for multi-dialect speech customization.

Layout & Controls:
1. 3-Way Dialect Selector Pill Group:
   - Option A: 🇺🇸 General American (GA) - Default
   - Option B: 🇬🇧 British Received Pronunciation (RP)
   - Option C: 🇦🇺 General Australian (AusE)
   - Each option shows a mini badge indicating its key characteristics (e.g., GA: Rhotic R + T-Flapping; RP: Non-rhotic + Pure Vowels; AusE: Raised Front Vowels).

2. Comparative Sound Explorer Card:
   - Word sample: "Water and Car"
   - Tabular / 3-Column Comparison:
     - General American: /ˈwɑː.t̬ɚ/ and /kɑːr/ (R-colored, flapping t sounds like 'd')
     - British RP: /ˈwɔː.tə/ and /kɑː/ (Intrusive non-rhotic, glottal / aspirated t)
     - Australian: /ˈwoː.tə/ and /kɐː/ (Vowel shifts, open schwa)
   - Each column has a mini speaker button to hear native speaker pronunciation in that specific dialect.

3. Dialect-Adaptive Scoring Rules Banner:
   - An info badge showing: "Scoring engine adapted for British RP: Dropping the final /r/ in 'car' or 'water' will NOT be penalized as an ending sound omission."

4. Accent Progression Radar Chart:
   - A spider/radar chart displaying user's alignment across 5 dialect features (Rhoticity, Vowel Openness, Intonation Contour, Glottal Stops, Rhythm).

Light theme: Clean white cards (#FFFFFF), slate-200 borders, distinct flag icons, and high-contrast typography.`,
    figmaPrompt: `Design an Accent Customization Selector UI for a language learning platform in Light Mode. 
Top row has 3 large interactive selector cards for General American, British RP, and Australian English with country flags and phonetic profiles. 
Below is a comparative audio card showcasing how words like "water", "schedule", "can't" sound across the three dialects with IPA transcriptions. 
An indicator confirms "Dialect-Specific Scoring Active (Non-rhotic R permitted for UK/AUS)". 
Style: Clean white cards, slate-200 borders, crisp typography, light theme.`,
    midjourneyPrompt: `Clean modern UI screen showing dialect switching between American, British, and Australian accents, interactive sound waves, flag icons, minimalist white interface, award-winning UI mockup --ar 16:9 --v 6.1`,
    researchNote: 'Tôn trọng sự đa dạng phương ngữ (BoldVoice Accent Explorer). Chấm điểm chuẩn xác theo mục tiêu học viên: đi du học Úc, làm việc với sếp Mỹ, hay thi IELTS theo chuẩn Anh.'
  }
];

export default function AiDesignPromptsView() {
  const [selectedStoryId, setSelectedStoryId] = useState('ADV-101');
  const [copiedKey, setCopiedKey] = useState(null);

  const selectedItem = ADVANCED_AI_PROMPTS.find(p => p.id === selectedStoryId) || ADVANCED_AI_PROMPTS[0];

  const handleCopy = (text, key) => {
    navigator.clipboard?.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-rose-600" />
                <span>Epic 9: Advanced AI Speech Lab</span>
              </span>
              <span className="text-xs font-mono text-emerald-600 font-semibold">
                ● 2026 Production-Ready AI Prompts
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
              AI UI/UX Design Prompt Studio (v0.dev · Figma AI · Midjourney)
            </h2>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
              Bộ prompt chuẩn hóa theo hệ màu <strong>Acoustic Precision Light Mode</strong> (Card trắng #FFFFFF, Slate-50, viền Slate-200, điểm nhấn Crimson Rose #E11D48). Bấm nút Copy để sinh mã UI tức thì trên v0.dev, Figma AI hoặc Claude.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
              8 Stories · 3 Prompts Mỗi Feature
            </span>
          </div>
        </div>
      </div>

      {/* Story Ribbon Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
        {ADVANCED_AI_PROMPTS.map((item) => {
          const isSelected = item.id === selectedStoryId;
          const IconComp = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setSelectedStoryId(item.id)}
              className={`p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between gap-1.5 ${
                isSelected
                  ? 'bg-rose-50 border-rose-400 text-rose-900 ring-2 ring-rose-400/20 shadow-xs'
                  : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700 shadow-2xs'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`font-mono text-[11px] font-bold ${isSelected ? 'text-rose-600' : 'text-slate-800'}`}>
                  {item.id}
                </span>
                <IconComp className={`w-3.5 h-3.5 ${isSelected ? 'text-rose-600' : 'text-slate-400'}`} />
              </div>
              <span className="text-[10px] font-medium truncate block">
                {item.title.split(':')[0]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Prompt Inspector */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        {/* Story Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-800">
                {selectedItem.id}
              </span>
              <span className="text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full">
                {selectedItem.tag}
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              {selectedItem.title}
            </h3>
          </div>

          <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-600 max-w-md">
            <span className="font-bold text-slate-800">Cơ sở khoa học 2026: </span>
            <span>{selectedItem.researchNote}</span>
          </div>
        </div>

        {/* 3 Prompts Stack */}
        <div className="p-5 sm:p-6 space-y-6">
          
          {/* Prompt 1: v0.dev / React + Tailwind */}
          <div className="rounded-xl border border-slate-200 overflow-hidden bg-slate-50/40">
            <div className="p-3 bg-white border-b border-slate-200 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-rose-600" />
                <span className="text-xs font-bold text-slate-900">
                  1. Prompt v0.dev / React + Tailwind CSS (Light Mode)
                </span>
                <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                  Copy & Paste vào v0.dev hoặc Claude Artifacts
                </span>
              </div>
              <button
                onClick={() => handleCopy(selectedItem.v0Prompt, `${selectedItem.id}-v0`)}
                className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-lg shadow-2xs transition-all"
              >
                {copiedKey === `${selectedItem.id}-v0` ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-white" />
                    <span>Đã Copy!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Prompt v0</span>
                  </>
                )}
              </button>
            </div>
            <div className="p-4 bg-slate-900 text-slate-100 font-mono text-xs leading-relaxed overflow-x-auto max-h-72">
              <pre className="whitespace-pre-wrap">{selectedItem.v0Prompt}</pre>
            </div>
          </div>

          {/* Prompt 2: Figma AI / UI UX */}
          <div className="rounded-xl border border-slate-200 overflow-hidden bg-slate-50/40">
            <div className="p-3 bg-white border-b border-slate-200 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-sky-600" />
                <span className="text-xs font-bold text-slate-900">
                  2. Prompt Figma AI / UI Mockup (1440x900 Light Mode)
                </span>
              </div>
              <button
                onClick={() => handleCopy(selectedItem.figmaPrompt, `${selectedItem.id}-figma`)}
                className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg transition-all"
              >
                {copiedKey === `${selectedItem.id}-figma` ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Đã Copy!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Figma Prompt</span>
                  </>
                )}
              </button>
            </div>
            <div className="p-4 bg-slate-50 text-slate-800 font-mono text-xs leading-relaxed overflow-x-auto">
              <pre className="whitespace-pre-wrap">{selectedItem.figmaPrompt}</pre>
            </div>
          </div>

          {/* Prompt 3: Midjourney / Visual Concept */}
          <div className="rounded-xl border border-slate-200 overflow-hidden bg-slate-50/40">
            <div className="p-3 bg-white border-b border-slate-200 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span className="text-xs font-bold text-slate-900">
                  3. Prompt Midjourney / DALL-E (Concept & Hero Asset)
                </span>
              </div>
              <button
                onClick={() => handleCopy(selectedItem.midjourneyPrompt, `${selectedItem.id}-mj`)}
                className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg transition-all"
              >
                {copiedKey === `${selectedItem.id}-mj` ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Đã Copy!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Midjourney Prompt</span>
                  </>
                )}
              </button>
            </div>
            <div className="p-4 bg-slate-50 text-slate-800 font-mono text-xs leading-relaxed overflow-x-auto">
              <pre className="whitespace-pre-wrap">{selectedItem.midjourneyPrompt}</pre>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
