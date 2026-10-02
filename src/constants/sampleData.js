// Unified Agile backlog for StoryMapper
// Single Master Project: AI English Pronunciation Platform for Vietnamese Users

export const MOSCOW_PRIORITIES = {
  must: {
    id: 'must',
    label: 'Must-Have',
    shortLabel: 'Must',
    color: 'rose',
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/30',
    text: 'text-rose-400',
    badge: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
    description: 'Critical for MVP. Non-negotiable core functionality.'
  },
  should: {
    id: 'should',
    label: 'Should-Have',
    shortLabel: 'Should',
    color: 'amber',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    text: 'text-amber-400',
    badge: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    description: 'High impact features important for launch, but viable workarounds exist.'
  },
  could: {
    id: 'could',
    label: 'Could-Have',
    shortLabel: 'Could',
    color: 'blue',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    text: 'text-blue-400',
    badge: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
    description: 'Desirable improvements if time and resources permit.'
  },
  wont: {
    id: 'wont',
    label: "Won't-Have (Now)",
    shortLabel: "Won't",
    color: 'slate',
    bg: 'bg-slate-500/10',
    border: 'border-slate-500/30',
    text: 'text-slate-400',
    badge: 'bg-slate-500/15 text-slate-300 border-slate-500/30',
    description: 'Out of scope for this release; scheduled for future iterations.'
  }
};

export const STATUSES = {
  backlog: {
    id: 'backlog',
    label: 'Backlog',
    icon: 'Inbox',
    color: 'slate',
    bg: 'bg-slate-500/15 text-slate-300 border-slate-600/30',
    dot: 'bg-slate-400'
  },
  todo: {
    id: 'todo',
    label: 'To Do',
    icon: 'CircleDot',
    color: 'blue',
    bg: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
    dot: 'bg-sky-400'
  },
  'in-progress': {
    id: 'in-progress',
    label: 'In Progress',
    icon: 'Clock',
    color: 'amber',
    bg: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    dot: 'bg-amber-400 animate-pulse'
  },
  done: {
    id: 'done',
    label: 'Done',
    icon: 'CheckCircle2',
    color: 'emerald',
    bg: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    dot: 'bg-emerald-400'
  }
};

export const T_SHIRT_SIZES = {
  XS: { label: 'XS', points: 1, desc: 'Trivial (< 2 hrs)' },
  S: { label: 'S', points: 2, desc: 'Small (half-day)' },
  M: { label: 'M', points: 3, desc: 'Medium (1-2 days)' },
  L: { label: 'L', points: 5, desc: 'Large (3-5 days)' },
  XL: { label: 'XL', points: 8, desc: 'Epic chunk (1-2 sprints)' }
};

export const TASK_CATEGORIES = [
  { id: 'Frontend', label: 'Frontend', color: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30' },
  { id: 'Backend', label: 'Backend', color: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' },
  { id: 'Database', label: 'Database', color: 'bg-amber-500/15 text-amber-300 border-amber-500/30' },
  { id: 'DevOps', label: 'DevOps', color: 'bg-purple-500/15 text-purple-300 border-purple-500/30' },
  { id: 'QA', label: 'QA', color: 'bg-rose-500/15 text-rose-300 border-rose-500/30' },
  { id: 'Design', label: 'Design', color: 'bg-pink-500/15 text-pink-300 border-pink-500/30' },
  { id: 'Content', label: 'Content', color: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30' }
];

export const EPIC_COLORS = [
  { id: 'indigo', name: 'Indigo', border: 'border-indigo-500', headerBg: 'bg-indigo-950/60', text: 'text-indigo-400', badge: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' },
  { id: 'emerald', name: 'Emerald', border: 'border-emerald-500', headerBg: 'bg-emerald-950/60', text: 'text-emerald-400', badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
  { id: 'violet', name: 'Violet', border: 'border-violet-500', headerBg: 'bg-violet-950/60', text: 'text-violet-400', badge: 'bg-violet-500/20 text-violet-300 border-violet-500/30' },
  { id: 'amber', name: 'Amber', border: 'border-amber-500', headerBg: 'bg-amber-950/60', text: 'text-amber-400', badge: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
  { id: 'cyan', name: 'Cyan', border: 'border-cyan-500', headerBg: 'bg-cyan-950/60', text: 'text-cyan-400', badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' },
  { id: 'rose', name: 'Rose', border: 'border-rose-500', headerBg: 'bg-rose-950/60', text: 'text-rose-400', badge: 'bg-rose-500/20 text-rose-300 border-rose-500/30' }
];

export const VIETNAMESE_PRONUNCIATION_PROJECT = {
  id: 'proj-viet-pronounce',
  name: 'VietPhonics AI — English Pronunciation Platform for Vietnamese Users',
  description: 'Single unified product backlog for building an AI-powered pronunciation & speaking website tailored specifically for Vietnamese ESL learners, IT engineers, and IELTS candidates.',
  epics: [
    {
      id: 'epic-diagnostic',
      title: 'Diagnostic Speech Assessment & L1 Profiling',
      description: 'Vietnamese mother-tongue error calibration, 3-minute baseline diagnostic screener, and CEFR/IELTS score estimation.',
      color: 'indigo',
      order: 1
    },
    {
      id: 'epic-ending-sounds',
      title: 'Final Consonants & Core Phoneme Engine',
      description: 'Ending sound inspector (/s, /z, /t, /d, /k, /ks/), forced phoneme alignment, and speech fluency monitoring.',
      color: 'emerald',
      order: 2
    },
    {
      id: 'epic-prosody',
      title: 'Rhythm, Syllable Stress & Intonation',
      description: 'Anti-tone de-biasing, visual syllable stress weight gauges, schwa /ə/ reduction, and dual pitch curve overlays.',
      color: 'violet',
      order: 3
    },
    {
      id: 'epic-articulation',
      title: 'Minimal Pairs & Mouth Placement Guide',
      description: 'Vietnamese-tailored minimal pair contrasts (/θ/-/t/, /iː/-/ɪ/), physical mouth instructions in Vietnamese, and 2D vocal tract diagrams.',
      color: 'amber',
      order: 4
    },
    {
      id: 'epic-roleplay-ielts',
      title: 'Conversational AI & IELTS Speaking',
      description: 'Low-latency AI conversational voice practice, workplace situations (IT standup), and official IELTS Speaking Part 1 & 2 mock examiner.',
      color: 'cyan',
      order: 5
    },
    {
      id: 'epic-retention',
      title: 'Daily Habit, Spaced Repetition & Monetization',
      description: 'Adaptive 10-minute daily practice path, SM-2 weak sound bank, streak shields, and Pro subscription paywall.',
      color: 'rose',
      order: 6
    },
    {
      id: 'epic-gamified-3d',
      title: '3D Voice-Controlled Gamification & Adventure Quests',
      description: 'Web-based 3D world (Three.js/WebGL) where learners control avatar movement, leap over obstacles, cast spells, and battle bosses using accurate English pronunciation.',
      color: 'amber',
      order: 7
    }
  ],
  stories: [
    // 1. Diagnostic Assessment & L1 Profiling
    {
      id: 'VN-102',
      epicId: 'epic-diagnostic',
      title: 'Vietnamese L1 3-Minute Diagnostic Pronunciation Screener',
      persona: 'New Vietnamese Learner Starting Their Journey',
      action: 'read 5 calibrated diagnostic sentences designed specifically around Vietnamese mother-tongue phonetic traps',
      value: 'I get an instant, empathetic diagnosis in Vietnamese explaining my Top 3 pronunciation habits and an estimated IELTS Pronunciation band',
      priority: 'must',
      status: 'todo',
      size: 'L',
      points: 8,
      acceptanceCriteria: [
        {
          id: 'ac-vn-102-1',
          given: '5 trigger sentences (e.g. "Six months ago, she baked fresh bread for breakfast on the street")',
          when: 'The user finishes recording',
          then: 'The engine computes error frequencies for: Dropped Ending Sounds, /θ/ vs /t/ substitutions, /ʃ/ vs /s/ confusion, and Flat Tone vs Stress.',
          completed: false
        },
        {
          id: 'ac-vn-102-2',
          given: 'Assessment finishes',
          when: 'Report generates',
          then: 'UI presents an empathetic diagnostic summary in Vietnamese: "Điểm phát âm của bạn: 68% - Cần khắc phục: 1. Bật âm đuôi /s, ks/, 2. Đặt lưỡi cho âm /θ/, 3. Nhấn trọng âm thay vì đánh dấu sắc/huyền".',
          completed: false
        }
      ],
      technicalTasks: [
        { id: 't-vn-4', title: 'Create calibrated 5-sentence diagnostic phoneme matrix covering all 44 English phonemes with high Vietnamese interference', category: 'Backend', completed: false },
        { id: 't-vn-5', title: 'Build Vietnamese localized diagnostic scorecard with radar chart and recommended 7-day sprint', category: 'Frontend', completed: false }
      ],
      notes: 'Sentence 1: "Six months ago, she baked fresh bread for breakfast on the street." Sentence 2: "They think that the comfortable clothes are worth the price."'
    },
    {
      id: 'ELSA-102',
      epicId: 'epic-diagnostic',
      title: 'Native Language (L1) Mother-Tongue Error Calibration',
      persona: 'Vietnamese Speaker with Regional Accent (Northern vs Southern VN)',
      action: 'select my regional accent background (e.g. Northern Vietnamese with /d/-/z/ merge, or Southern with /v/-/j/ merge)',
      value: 'the acoustic model calibrates its phonetic error detector to my specific regional transfer habits',
      priority: 'must',
      status: 'done',
      size: 'S',
      points: 3,
      acceptanceCriteria: [
        {
          id: 'ac-elsa-102-1',
          given: 'Onboarding settings',
          when: 'User selects Vietnamese native language',
          then: 'Acoustic priors for missing final stops (/k/, /t/, /p/) and dropped fricatives (/s/, /z/) are given higher weighting in phoneme decoding.',
          completed: true
        }
      ],
      technicalTasks: [
        { id: 't-elsa-4', title: 'Implement L1 confusion matrix weighting in GOP acoustic decoding pipeline', category: 'Backend', completed: true },
        { id: 't-elsa-5', title: 'Create native language selector modal in onboarding questionnaire', category: 'Frontend', completed: true }
      ],
      notes: 'Crucial for avoiding false positives on slightly accented phonemes.'
    },
    {
      id: 'ELSA-103',
      epicId: 'epic-diagnostic',
      title: 'Predicted IELTS & CEFR Speaking Band Estimator',
      persona: 'IELTS / TOEIC Candidate in Vietnam',
      action: 'view my estimated IELTS Speaking band (e.g. 6.5) and CEFR proficiency level (B1/B2/C1) based on my pronunciation accuracy',
      value: 'I can benchmark my progress toward university graduation or immigration requirements',
      priority: 'should',
      status: 'todo',
      size: 'M',
      points: 5,
      acceptanceCriteria: [
        {
          id: 'ac-elsa-103-1',
          given: 'A completed diagnostic test',
          when: 'The score is tabulated',
          then: 'Maps overall percentage to CEFR (A1 through C2) and IELTS Speaking Band (4.0 to 8.5).',
          completed: false
        }
      ],
      technicalTasks: [
        { id: 't-elsa-6', title: 'Implement statistical mapping function correlating phonetic error rate with IELTS band descriptors', category: 'Backend', completed: false },
        { id: 't-elsa-7', title: 'Design CEFR level badge with percentile comparison against Vietnamese user average', category: 'Frontend', completed: false }
      ],
      notes: 'Vietnamese test-takers are heavily driven by target IELTS band numbers (6.5, 7.0).'
    },

    // 2. Final Consonants & Core Phoneme Engine
    {
      id: 'VN-101',
      epicId: 'epic-ending-sounds',
      title: 'Final Consonant Sound "Ending Sound" Inspector & Alert System',
      persona: 'Vietnamese English Learner Dropping Final Consonants',
      action: 'receive instant real-time visual and audio alerts whenever I drop ending consonants (/s/, /z/, /t/, /d/, /k/, /tʃ/, /ks/) in words like "five", "street", "breakfast", "like"',
      value: 'I eliminate the #1 phonological mistake of Vietnamese speakers that prevents foreigners from understanding my speech',
      priority: 'must',
      status: 'todo',
      size: 'M',
      points: 5,
      acceptanceCriteria: [
        {
          id: 'ac-vn-101-1',
          given: 'A target word with a final plosive or fricative (e.g. "six" /sɪks/)',
          when: 'The user drops the final consonant cluster (pronouncing /sɪ/)',
          then: 'The missing ending letters "x" (/ks/) are highlighted in bright red with an alert: "Missing ending sound /ks/".',
          completed: false
        },
        {
          id: 'ac-vn-101-2',
          given: 'The user accurately voices and releases the final consonant',
          when: 'Evaluated by the acoustic model',
          then: 'An emerald badge chimes "Perfect Ending Sound!" and awards 10 bonus accuracy points.',
          completed: false
        }
      ],
      technicalTasks: [
        { id: 't-vn-1', title: 'Implement Forced Alignment threshold specifically on word-final phoneme boundaries (/s/, /z/, /t/, /d/, /k/, /tʃ/, /ks/)', category: 'Backend', completed: false },
        { id: 't-vn-2', title: 'Build animated "Ending Sound Inspector" visual callout pill in Practice view', category: 'Frontend', completed: false },
        { id: 't-vn-3', title: 'Curate dictionary of 300 high-frequency words where Vietnamese learners commonly drop endings', category: 'Database', completed: false }
      ],
      notes: 'In Vietnamese phonotactics, open syllables dominate. Explicitly training the release of final plosives is essential for intelligibility.'
    },
    {
      id: 'ELSA-201',
      epicId: 'epic-ending-sounds',
      title: 'Real-Time Phoneme Error Heatmap with Forced Alignment',
      persona: 'Learner Practicing Sentences Aloud',
      action: 'see each letter in my sentence colored green (>80% accuracy), yellow (60-80%), or red (<60%) immediately after speaking',
      value: 'I pinpoint the exact phonemes I mispronounced without guessing',
      priority: 'must',
      status: 'done',
      size: 'L',
      points: 8,
      acceptanceCriteria: [
        {
          id: 'ac-elsa-201-1',
          given: 'A spoken user recording',
          when: 'The Forced Alignment engine aligns phonemes against the reference text',
          then: 'Each character in the sentence renders with color-coded chip matching its Goodness of Pronunciation (GOP) score.',
          completed: true
        }
      ],
      technicalTasks: [
        { id: 't-elsa-8', title: 'Build tokenized phoneme sentence renderer with interactive popover drawers', category: 'Frontend', completed: true },
        { id: 't-elsa-9', title: 'Integrate forced-alignment phoneme acoustic model with Goodness of Pronunciation (GOP)', category: 'Backend', completed: true }
      ],
      notes: 'Store user attempts to track historical phoneme error rate.'
    },
    {
      id: 'ELSA-204',
      epicId: 'epic-ending-sounds',
      title: 'Speech Fluency, Natural Pauses & Filler Word Monitor',
      persona: 'Vietnamese Professional Speaking Staccato or Pausing Excessively',
      action: 'receive feedback on my speaking speed (Words Per Minute), awkward mid-word pauses, and filler words ("um", "uh", "à")',
      value: 'I can speak smoothly at conversational tempo (120-150 WPM) without staccato syllable pauses',
      priority: 'should',
      status: 'todo',
      size: 'M',
      points: 5,
      acceptanceCriteria: [
        {
          id: 'ac-elsa-204-1',
          given: 'A 30-second speech recording',
          when: 'Analyzed by the fluency engine',
          then: 'Calculates WPM speed gauge, counts filler word occurrences, and flags pauses exceeding 1.2 seconds.',
          completed: false
        }
      ],
      technicalTasks: [
        { id: 't-elsa-14', title: 'Build silence detection thresholding and filler word regex classifier on ASR transcripts', category: 'Backend', completed: false },
        { id: 't-elsa-15', title: 'Design fluency speedometer widget with WPM target zone (120-150 WPM)', category: 'Frontend', completed: false }
      ],
      notes: 'Vietnamese speakers often speak word-by-word with unnatural pauses.'
    },
    {
      id: 'PRON-101',
      epicId: 'epic-ending-sounds',
      title: 'Web Audio API Low-Latency In-Browser Audio Streaming Engine',
      persona: 'Web Learner on Chrome/Safari/Edge',
      action: 'record speech in the browser with 16kHz PCM audio chunking streamed over WebSocket',
      value: 'I get sub-second pronunciation scores on desktop and mobile web without installing a heavy mobile app',
      priority: 'must',
      status: 'done',
      size: 'M',
      points: 5,
      acceptanceCriteria: [
        {
          id: 'ac-pron-1',
          given: 'A user clicks the microphone button',
          when: 'Microphone permissions are granted',
          then: 'Audio is recorded at 16kHz mono PCM with active animated waveform within 50ms.',
          completed: true
        }
      ],
      technicalTasks: [
        { id: 't-pron-1', title: 'Build React useAudioRecorder hook using AudioWorkletNode', category: 'Frontend', completed: true },
        { id: 't-pron-2', title: 'Handle iOS Safari audio context resume policies and web microphone fallback', category: 'Frontend', completed: true }
      ],
      notes: 'Web-first architecture is your key differentiator over ELSA mobile app.'
    },

    // 3. Rhythm, Syllable Stress & Intonation
    {
      id: 'VN-103',
      epicId: 'epic-prosody',
      title: 'Syllable Stress vs. Tone Mark Visualizer & Schwa De-Toner',
      persona: 'Vietnamese Speaker Applying Vietnamese Tones to English Words',
      action: 'see visual syllable weight bars and duration curves that teach me to lengthen stressed syllables and reduce unstressed syllables to schwa (/ə/)',
      value: 'I stop pronouncing English words with robotic, staccato tone marks (sắc, huyền, nặng) and sound naturally rhythmic',
      priority: 'should',
      status: 'in-progress',
      size: 'M',
      points: 5,
      acceptanceCriteria: [
        {
          id: 'ac-vn-103-1',
          given: 'A multi-syllabic word like "COM-for-ta-ble"',
          when: 'The user pronounces it as 4 equal syllables with tone marks ("com-fơ-tờ-bồ")',
          then: 'The visualizer flags equal duration and prompts: "Shorten and soften the unstressed syllables to /ə/".',
          completed: true
        },
        {
          id: 'ac-vn-103-2',
          given: 'The learner holds the primary stressed syllable for >2x the duration of unstressed syllables',
          when: 'Evaluated',
          then: 'The rhythm indicator lights up green with "Natural Stress Rhythm".',
          completed: false
        }
      ],
      technicalTasks: [
        { id: 't-vn-6', title: 'Build Syllable Weight Bar animation component displaying relative duration (ms) and dB energy', category: 'Frontend', completed: true },
        { id: 't-vn-7', title: 'Calculate acoustic vowel reduction index comparing formant centralization of unstressed vowels against schwa /ə/ target', category: 'Backend', completed: false }
      ],
      notes: 'Vietnamese is syllable-timed; English is stress-timed. This visual contrast provides an immediate "aha!" moment for Vietnamese learners.'
    },
    {
      id: 'ELSA-202',
      epicId: 'epic-prosody',
      title: 'Syllable Stress & Capitalized Word Emphasis Evaluator',
      persona: 'Speaker Struggling with Word Cadence',
      action: 'practice multi-syllabic words with visual stress capitalization (e.g. de-VE-lop-ment vs DE-ve-lop-ment)',
      value: 'I avoid the robotic flat speech that makes Vietnamese speakers hard to understand',
      priority: 'must',
      status: 'in-progress',
      size: 'M',
      points: 5,
      acceptanceCriteria: [
        {
          id: 'ac-elsa-202-1',
          given: 'A target word with primary stress on syllable 2',
          when: 'User stresses syllable 1 by holding it longer or louder',
          then: 'The stressed syllable is highlighted in red with instruction "Stress the second syllable: de-VE-lop-ment".',
          completed: true
        }
      ],
      technicalTasks: [
        { id: 't-elsa-10', title: 'Implement acoustic energy and vowel duration ratio calculation across syllable nuclei', category: 'Backend', completed: true },
        { id: 't-elsa-11', title: 'Build visual syllable stress bar widget with relative loudness animations', category: 'Frontend', completed: false }
      ],
      notes: 'Stress errors are frequently more disorienting to native listeners than isolated vowel substitutions.'
    },
    {
      id: 'ELSA-203',
      epicId: 'epic-prosody',
      title: 'Suprasegmental Pitch & Sentence Intonation Melody Canvas',
      persona: 'Advanced Speaker Sounding Monotone',
      action: 'view my voice pitch frequency overlaid on a native speaker pitch curve to practice rising and falling intonation',
      value: 'my speech sounds natural, engaging, and expressive rather than flat and robotic',
      priority: 'should',
      status: 'in-progress',
      size: 'L',
      points: 8,
      acceptanceCriteria: [
        {
          id: 'ac-elsa-203-1',
          given: 'A question requiring rising intonation (e.g. "Are you coming tonight?")',
          when: 'User speaks with falling intonation',
          then: 'The pitch curve drops at the end and an intonation alert explains "Your pitch fell. Raise your tone at the end of yes/no questions."',
          completed: false
        }
      ],
      technicalTasks: [
        { id: 't-elsa-12', title: 'Implement fundamental frequency (F0) contour extraction using CREPE / YIN algorithm', category: 'Backend', completed: false },
        { id: 't-elsa-13', title: 'Build dual Canvas pitch curve component with Dynamic Time Warping alignment', category: 'Frontend', completed: true }
      ],
      notes: 'Normalize pitch contours relative to speaker median F0 to accommodate male and female voice ranges.'
    },

    // 4. Minimal Pairs & Mouth Placement Guide
    {
      id: 'VN-105',
      epicId: 'epic-articulation',
      title: 'Vietnamese Native-Tongue Mouth & Tongue Placement Coach',
      persona: 'Beginner Struggling with Non-Vietnamese Sounds (/θ/, /ð/, /ʃ/, /dʒ/)',
      action: 'read physical mouth placement instructions written in simple Vietnamese with an interactive 2D anatomical cross-section',
      value: 'I clearly understand where to put my teeth and tongue without reading confusing linguistic jargon',
      priority: 'must',
      status: 'done',
      size: 'S',
      points: 3,
      acceptanceCriteria: [
        {
          id: 'ac-vn-105-1',
          given: 'A sound like /θ/ ("think")',
          when: 'User opens the placement guide',
          then: 'It displays clear Vietnamese guidance: "Cắn nhẹ đầu lưỡi giữa hai hàm răng, thổi luồng hơi nhẹ ra ngoài (không phát âm thành chữ Thờ tiếng Việt)".',
          completed: true
        },
        {
          id: 'ac-vn-105-2',
          given: 'The 2D anatomical mouth diagram',
          when: 'The user taps the sound',
          then: 'An animated SVG shows the tongue contacting the upper teeth with airflow arrows.',
          completed: true
        }
      ],
      technicalTasks: [
        { id: 't-vn-11', title: 'Write Vietnamese localization copy for all 44 English phoneme mouth-shape guides', category: 'Content', completed: true },
        { id: 't-vn-12', title: 'Render interactive SVG cross-section mouth visualizer highlighting tongue tip, teeth, and airflow vector', category: 'Frontend', completed: true }
      ],
      notes: 'Eliminates intimidation for adult Vietnamese learners starting from scratch.'
    },
    {
      id: 'ELSA-205',
      epicId: 'epic-articulation',
      title: 'Minimal Pair Auditory Discrimination Quizzes (/θ/-/t/, /iː/-/ɪ/)',
      persona: 'Learner Unable to Hear Phonemic Contrasts',
      action: 'play rapid-fire listening and speaking quizzes distinguishing easily confused pairs (e.g. "sheep" vs "ship", "think" vs "sink")',
      value: 'I train my ear and vocal muscles to prevent misunderstanding words in conversation',
      priority: 'must',
      status: 'done',
      size: 'S',
      points: 3,
      acceptanceCriteria: [
        {
          id: 'ac-elsa-205-1',
          given: 'A minimal pair test between /θ/ and /s/',
          when: 'System plays audio of "think"',
          then: 'User chooses between "think" and "sink" within 3 seconds, building auditory discrimination.',
          completed: true
        }
      ],
      technicalTasks: [
        { id: 't-elsa-16', title: 'Curate database of 150 Vietnamese-specific minimal pair audio samples', category: 'Content', completed: true },
        { id: 't-elsa-17', title: 'Build fast 2-choice rapid tap quiz card in practice view', category: 'Frontend', completed: true }
      ],
      notes: 'Crucial for Vietnamese speakers who substitute /θ/ with /t/ or /s/.'
    },
    {
      id: 'PRON-201',
      epicId: 'epic-articulation',
      title: 'Interactive 2D Anatomical Lip & Tongue Articulation Guide',
      persona: 'Visual Learner Confused by Mouth Position',
      action: 'view a high-contrast anatomical cross-section showing tongue position, teeth contact, and lip rounding for any sound',
      value: 'I have a clear mental model of physical mouth geometry instead of guessing blindly',
      priority: 'should',
      status: 'in-progress',
      size: 'M',
      points: 5,
      acceptanceCriteria: [
        {
          id: 'ac-pron-5',
          given: 'A phoneme instruction drawer open for /r/ vs /l/',
          when: 'User taps the sound',
          then: 'SVG cross-section dynamically updates tongue tip height, velum closure, and vocal cord vibration status.',
          completed: true
        }
      ],
      technicalTasks: [
        { id: 't-pron-6', title: 'Implement animated SVG mouth cross-section component with parametric tongue control points', category: 'Frontend', completed: true },
        { id: 't-pron-7', title: 'Map 44 IPA symbols to anatomical parameters (jaw, tongue body, tongue tip, lips)', category: 'Frontend', completed: true }
      ],
      notes: 'Provides instant visual clarity on how to shape sounds.'
    },
    {
      id: 'PRON-202',
      epicId: 'epic-articulation',
      title: 'Phonemic Audio Dictation & Gap-Fill Exercises (Nghe Chính Tả & Điền Âm Vị Khuyết)',
      persona: 'Học Viên Muốn Rèn Luyện Thính Giác Nhận Diện Âm Vị',
      action: 'nghe người bản ngữ phát âm các từ hoặc câu chứa âm đang học, sau đó gõ lại từ hoặc điền vào chỗ trống âm vị còn thiếu (ví dụ: nghe thấy /θɪŋk/ -> điền th_nk hoặc chọn /θ/ vs /t/)',
      value: 'tôi huấn luyện đôi tai nhận diện chính xác âm thanh bản ngữ trước khi nói, tránh tình trạng nghe một đằng phát âm một nẻo',
      priority: 'must',
      status: 'in-progress',
      size: 'M',
      points: 5,
      acceptanceCriteria: [
        {
          id: 'ac-pron-202-1',
          given: 'Một bài tập dictation cho âm /θ/ (ví dụ từ "think")',
          when: 'Người học bấm nghe âm thanh Oxford và gõ đáp án vào ô chữ',
          then: 'Hệ thống kiểm tra ngay lập tức, gạch chân âm vị mục tiêu và hiển thị phân tích ngữ âm nếu nhầm lẫn với âm /t/ hoặc /s/.',
          completed: true
        },
        {
          id: 'ac-pron-202-2',
          given: 'Người học gõ sai từ quá 2 lần',
          when: 'Bấm nút "Gợi ý khẩu hình"',
          then: 'Hệ thống phát lại âm thanh ở tốc độ chậm 0.75x kèm hình ảnh hướng dẫn vị trí đặt đầu lưỡi giữa hai hàm răng.',
          completed: true
        }
      ],
      technicalTasks: [
        { id: 't-pron-202-1', title: 'Xây dựng component AudioDictationCard với audio player, input gõ từ và cơ chế kiểm tra tức thì', category: 'Frontend', completed: true },
        { id: 't-pron-202-2', title: 'Biên soạn ngân hàng 50+ câu dictation chuẩn theo từng âm IPA (/θ/, /iː/, /ʃ/, /æ/, /r/, /l/)', category: 'Content', completed: true }
      ],
      notes: 'Bài tập thính giác chủ động (Active Listening) giúp liên kết giữa âm thanh nghe được và ký tự ngữ âm.'
    },
    {
      id: 'PRON-203',
      epicId: 'epic-articulation',
      title: 'Targeted Sound Read-Aloud & Contextual Fluency Drills (Đọc To Đoạn Văn Ngữ Cảnh Chứa Âm Đang Luyện)',
      persona: 'Học Viên Muốn Chuyển Đổi Từ Âm Đơn Sang Phản Xạ Đọc Cả Câu Ngữ Cảnh Dài',
      action: 'đọc to các câu ngạn ngữ, văn cảnh đời sống hoặc câu lắt léo (Tongue Twisters) tập trung dày đặc âm đang học (ví dụ âm /θ/: "The thirty-three thieves thought that they thrilled the throne throughout Thursday")',
      value: 'tôi làm quen với việc duy trì phát âm chuẩn khi nói cả câu dài có ngữ cảnh tự nhiên thay vì chỉ phát âm đúng khi đọc từ đơn lẻ',
      priority: 'must',
      status: 'in-progress',
      size: 'M',
      points: 5,
      acceptanceCriteria: [
        {
          id: 'ac-pron-203-1',
          given: 'Học viên đọc to câu ngữ cảnh dài chứa nhiều âm mục tiêu',
          when: 'Giọng nói được thu qua Web Speech API và Forced Alignment',
          then: 'Mỗi từ chứa âm mục tiêu được tô màu xanh (>80%), vàng (60-80%), đỏ (<60%) theo thời gian thực kèm đếm số lần phát âm đạt (ví dụ 6/8 lần).',
          completed: true
        },
        {
          id: 'ac-pron-203-2',
          given: 'Học viên đọc vấp hoặc nuốt âm mục tiêu',
          when: 'Kết thúc bài đọc',
          then: 'Hệ thống đánh dấu các điểm vấp và gợi ý đọc chậm lại từng cụm từ (chunking).',
          completed: true
        }
      ],
      technicalTasks: [
        { id: 't-pron-203-1', title: 'Xây dựng UI ReadAloudCard với bộ đếm mục tiêu (target sound hits) và hiển thị văn bản ngữ cảnh', category: 'Frontend', completed: true },
        { id: 't-pron-203-2', title: 'Tích hợp bộ nhận diện giọng nói Web Speech API theo thời gian thực cho câu dài', category: 'Frontend', completed: true }
      ],
      notes: 'Cầu nối quan trọng từ việc phát âm âm lẻ sang phản xạ giao tiếp câu dài trong đời sống.'
    },
    {
      id: 'PRON-204',
      epicId: 'epic-articulation',
      title: 'Dual-Track Audio Recording & Native Speaker Waveform Comparison (Thu Âm & Đối Chiếu Trực Quan Sóng Âm Với Giọng Bản Ngữ)',
      persona: 'Học Viên Muốn Nhìn Thấy Và Nghe Thấy Rõ Sự Khác Biệt Giữa Giọng Mình Và Người Bản Ngữ',
      action: 'thu âm giọng nói của mình cho từ/câu mục tiêu, sau đó nhìn thấy 2 dải sóng âm (Waveform/Spectrogram) đặt song song: Track 1 của Người Bản Ngữ Oxford và Track 2 của Bản Thân, cùng nút nghe luân phiên A/B',
      value: 'tôi có bằng chứng trực quan về độ dài nguyên âm, độ ma sát hơi và lực bật âm đuôi, từ đó tự điều chỉnh cơ miệng chuẩn xác theo mẫu bản ngữ',
      priority: 'must',
      status: 'in-progress',
      size: 'L',
      points: 8,
      acceptanceCriteria: [
        {
          id: 'ac-pron-204-1',
          given: 'Học viên hoàn thành thu âm một từ (ví dụ "think")',
          when: 'Màn hình hiển thị kết quả phân tích',
          then: 'Vẽ 2 dải biểu đồ sóng âm thanh (Native Speaker Waveform vs User Spoken Waveform) căn chỉnh cùng trục thời gian để so sánh độ mở âm và thời lượng.',
          completed: true
        },
        {
          id: 'ac-pron-204-2',
          given: 'Tính năng A/B Voice Mirroring',
          when: 'Học viên nhấp nút "Đối chiếu A/B"',
          then: 'Hệ thống phát lần lượt: 1 lần giọng bản ngữ Oxford và 1 lần giọng học viên để tai cảm nhận rõ điểm khác biệt về âm sắc.',
          completed: true
        }
      ],
      technicalTasks: [
        { id: 't-pron-204-1', title: 'Xây dựng component WaveformComparisonCanvas vẽ song song 2 đồ thị sóng âm Canvas API', category: 'Frontend', completed: true },
        { id: 't-pron-204-2', title: 'Tích hợp MediaRecorder API thu âm 16kHz mono và trích xuất mảng biên độ âm thanh (amplitude buffer)', category: 'Frontend', completed: true },
        { id: 't-pron-204-3', title: 'Thiết kế cơ chế phát A/B so sánh đối chiếu giọng bản ngữ và giọng người học', category: 'Frontend', completed: true }
      ],
      notes: 'Visual & Auditory Biofeedback cực kỳ hiệu quả giúp người học tự điều chỉnh cơ miệng mà không cần giáo viên kè kè bên cạnh.'
    },
    {
      id: 'PRON-205',
      epicId: 'epic-articulation',
      title: '3-Tier Positional Phoneme Ladder: Initial, Medial & Final Word Drills (Luyện Âm Phân Vị: Đầu - Giữa - Cuối Từ)',
      persona: 'Học Viên Hay Bị Vấp Âm Khi Vị Trí Âm Thay Đổi Trong Từ',
      action: 'luyện tập phát âm từ đơn theo 3 vị trí ngữ âm học có cấu trúc phân tầng: Initial Words (âm ở đầu từ: this, that), Medial Words (âm ở giữa từ: mother, weather) và Final Words (âm ở cuối từ: breathe, soothe)',
      value: 'tôi nắm vững phản xạ cơ miệng ở mọi vị trí phân bố âm (phonotactic distribution), đặc biệt khắc phục triệt để thói quen nuốt âm đuôi và líu lưỡi ở âm giữa từ của người Việt',
      priority: 'must',
      status: 'in-progress',
      size: 'M',
      points: 5,
      acceptanceCriteria: [
        {
          id: 'ac-pron-205-1',
          given: 'Một âm mục tiêu (ví dụ âm hữu thanh /ð/)',
          when: 'Học viên chọn chế độ luyện phân vị âm',
          then: 'Hệ thống hiển thị danh sách từ chia theo 3 nhóm rõ ràng: Initial Words (This, That, They), Middle Words (Mother, Weather, Brother), End Words (Breathe, Bathe, Soothe).',
          completed: true
        },
        {
          id: 'ac-pron-205-2',
          given: 'Học viên phát âm từ thuộc nhóm Final Words (như "breathe")',
          when: 'Acoustic model phân tích tín hiệu âm thanh',
          then: 'Hệ thống kiểm tra xem âm rung /ð/ ở cuối từ có được duy trì âm lượng và độ dài hay bị nuốt/chuyển thành âm câm, hiển thị thông báo "Bật rõ âm đuôi /ð/".',
          completed: true
        }
      ],
      technicalTasks: [
        { id: 't-pron-205-1', title: 'Xây dựng cấu trúc dữ liệu PositionalPhonemeBank phân loại từ theo Initial / Medial / Final cho 44 âm IPA', category: 'Database', completed: true },
        { id: 't-pron-205-2', title: 'Thiết kế UI PositionalWordCards với tab chuyển đổi vị trí và audio mẫu Oxford', category: 'Frontend', completed: true }
      ],
      notes: 'Khác biệt vị trí phân bố âm đóng vai trò sống còn trong ngữ âm trị liệu. Người Việt thường chỉ phát âm đúng khi âm đứng ở đầu từ, nhưng gặp âm ở giữa hay cuối từ là nuốt hoặc sai lệch.'
    },
    {
      id: 'PRON-206',
      epicId: 'epic-articulation',
      title: 'Connected Speech Positional Progression: Phrases & Full Sentences (Nâng Cấp Độ Ngữ Đoạn: Cụm Từ Đến Câu Hoàn Chỉnh Theo Vị Trí)',
      persona: 'Học Viên Đã Đọc Được Từ Đơn Nhưng Vỡ Khẩu Hình Khi Nói Cụm Từ Và Cả Câu',
      action: 'luyện tập theo nấc thang lũy tiến ngữ đoạn: từ cấp độ Phrases (cụm từ: "this and that", "my mother said", "breathe deeply") nâng dần lên cấp độ Sentences (câu hoàn chỉnh: "This is the best that they could do") chia theo từng vị trí Initial/Medial/End',
      value: 'tôi duy trì được khẩu hình chuẩn xác trong chuỗi lời nói tự nhiên (connected speech), liên kết từ mượt mà mà không bị rơi rụng âm vị mục tiêu',
      priority: 'must',
      status: 'in-progress',
      size: 'M',
      points: 5,
      acceptanceCriteria: [
        {
          id: 'ac-pron-206-1',
          given: 'Học viên chọn luyện cấp độ Phrases hoặc Sentences theo vị trí âm',
          when: 'Học viên đọc cụm từ hoặc câu hoàn chỉnh',
          then: 'Hệ thống nhận diện bằng Forced Alignment, highlight các từ mang âm mục tiêu và chấm điểm mức độ liên kết âm (linking & phrasing).',
          completed: true
        },
        {
          id: 'ac-pron-206-2',
          given: 'Một bài luyện Initial/Medial/End Sentences',
          when: 'Học viên hoàn thành câu',
          then: 'Hệ thống chấm điểm độ trôi chảy (Fluency score) kèm phân tích tốc độ nói (WPM) và vị trí âm đích đạt chuẩn.',
          completed: true
        }
      ],
      technicalTasks: [
        { id: 't-pron-206-1', title: 'Biên soạn 100+ cụm từ (Phrases) và câu (Sentences) phân tầng theo Initial / Medial / Final cho các âm trọng điểm', category: 'Content', completed: true },
        { id: 't-pron-206-2', title: 'Tích hợp thanh tiến trình nấc thang độ khó (Words -> Phrases -> Sentences) trong giao diện bài tập', category: 'Frontend', completed: true }
      ],
      notes: 'Thực tế sư phạm cho thấy chuyển đổi từ Word sang Phrase rồi sang Sentence là lộ trình chuẩn quốc tế giúp học viên không bị quá tải nhận thức (cognitive overload).'
    },
    {
      id: 'PRON-207',
      epicId: 'epic-articulation',
      title: 'Phonetic Exception Words & Grammatical Voicing Alternation Rules (Bộ Từ Ngoại Lệ & Quy Tắc Biến Đổi Âm Vị Danh Từ - Động Từ)',
      persona: 'Học Viên Bị Bẫy Bởi Chính Tả Tiếng Anh Không Đi Liền Với Phiên Âm',
      action: 'học và luyện tập chuyên sâu các từ ngoại lệ (Exception Words: ví dụ chữ TH câm trong "asthma", "thyme", "Thomas") và quy tắc chuyển đổi âm vô thanh/hữu thanh giữa danh từ và động từ (Noun /θ/ vs Verb /ð/: "breath" vs "breathe", "bath" vs "bathe")',
      value: 'tôi hiểu rõ bản chất quy tắc ngữ âm và từ loại, không bị mặt chữ đánh lừa và tự tin dùng đúng từ loại trong cả văn viết lẫn văn nói',
      priority: 'should',
      status: 'in-progress',
      size: 'S',
      points: 3,
      acceptanceCriteria: [
        {
          id: 'ac-pron-207-1',
          given: 'Danh sách các từ ngoại lệ chính tả tiếng Anh',
          when: 'Học viên mở chuyên đề "TH Exception Words"',
          then: 'Hệ thống gắn nhãn cảnh báo đặc biệt (Special Exception Badge), giải thích nguyên nhân lịch sử ngữ âm (từ mượn tiếng Hy Lạp, Pháp) kèm audio chuẩn.',
          completed: true
        },
        {
          id: 'ac-pron-207-2',
          given: 'Cặp từ biến đổi từ loại Noun vs Verb (như "breath" /θ/ vs "breathe" /ð/)',
          when: 'Học viên thực hành so sánh',
          then: 'Hiển thị giải thích quy tắc: danh từ tận cùng bằng âm vô thanh /θ/ (không rung dây thanh), động từ tận cùng bằng âm hữu thanh /ð/ (rung dây thanh + nguyên âm kéo dài).',
          completed: true
        }
      ],
      technicalTasks: [
        { id: 't-pron-207-1', title: 'Xây dựng bộ dữ liệu Exception & Grammatical Voicing Pairs cho các âm vị tiếng Anh', category: 'Content', completed: true },
        { id: 't-pron-207-2', title: 'Thiết kế card bài tập Exception với thẻ so sánh tương tác Noun vs Verb', category: 'Frontend', completed: true }
      ],
      notes: 'Giúp học viên nâng tầm phát âm từ mức cơ học lên mức học thuật bản ngữ (Grammar-Phonology interface).'
    },
    {
      id: 'PRON-208',
      epicId: 'epic-articulation',
      title: 'L1 Confusion-Trap Cross-Transition Drills: Target Sound vs. Intrusion Sound (Bài Tập Chuyển Đổi Đối Kháng Âm Đích & Âm Bẫy L1 ở Cấp Từ & Câu)',
      persona: 'Người Học Dễ Bị Lẫn Lộn Hoặc Đồng Hóa Âm Khi Âm Đích Đứng Gần Âm Thay Thế Tiếng Việt',
      action: 'luyện tập các bài tập chuyển đổi đối kháng chuyên sâu (e.g. Voiced TH vs D Words & Sentences: "they" vs "day", "there" vs "dare"; câu: "They dare to go there today")',
      value: 'bộ não và dây thần kinh vận động miệng của tôi hình thành phản xạ phân biệt rõ ràng giữa vị trí kẹp răng (/ð/) và vị trí chân răng (/d/), xóa bỏ vĩnh viễn thói quen thay thế âm tiếng Việt vào tiếng Anh',
      priority: 'must',
      status: 'in-progress',
      size: 'L',
      points: 8,
      acceptanceCriteria: [
        {
          id: 'ac-pron-208-1',
          given: 'Một bài tập Minimal Pairs đối kháng (như Voiced TH vs D)',
          when: 'Học viên thực hiện bài tập',
          then: 'Hiển thị các cặp từ đối xứng (they/day, there/dare, though/dough, breathe/breed) với âm thanh so sánh tức thì và mô tả vị trí đặt lưỡi khác nhau.',
          completed: true
        },
        {
          id: 'ac-pron-208-2',
          given: 'Bài tập câu chuyển đổi liên tục (Voiced TH to D Sentences: e.g. "They dare to go there today")',
          when: 'Học viên đọc câu',
          then: 'Hệ thống dùng ASR và Forced Alignment tách riêng điểm số của từng âm đích (/ð/) và âm bẫy (/d/), cảnh báo nếu học viên đồng hóa âm /ð/ thành âm /d/.',
          completed: true
        }
      ],
      technicalTasks: [
        { id: 't-pron-208-1', title: 'Thu thập và xây dựng ma trận Minimal Pairs & Cross-Transition Sentences cho các cặp âm dễ lẫn của người Việt (/ð/ vs /d/, /θ/ vs /t/, /ʃ/ vs /s/, /iː/ vs /ɪ/)', category: 'Content', completed: true },
        { id: 't-pron-208-2', title: 'Xây dựng UI CrossTransitionDrillStudio với đồ thị so sánh vị trí phát âm (Interdental vs Alveolar)', category: 'Frontend', completed: true }
      ],
      notes: 'Đặc trị bẫy ngữ âm kinh điển nhất của người Việt: phát âm "they" thành "đây", "this" thành "đít". Luyện chuyển đổi đan xen giúp làm chủ cơ miệng ở tốc độ cao.'
    },
    {
      id: 'PRON-209',
      epicId: 'epic-articulation',
      title: 'Numbered Target Phoneme System & Multi-Spelling Sound Annotation (Hệ Thống Đánh Số Âm Vị Mục Tiêu & Gạch Chân Quy Tắc Chính Tả)',
      persona: 'Học Viên Mới Bắt Đầu Thường Bị Rối Bởi Ký Tự IPA Và Đọc Sai Do Nhìn Chữ Cái Đoán Âm',
      action: 'luyện tập với các câu được chú thích bằng hệ thống số âm mục tiêu (Target 1, Target 2, Target 3...) đặt ngay trên từng âm tiết và gạch chân các tổ hợp chữ cái đại diện (ví dụ: số 2 trên chữ "I", "ie" trong "tried", "y" trong "flying", "igh" trong "high")',
      value: 'tôi nắm bắt trực giác quy luật chính tả tiếng Anh (Spelling-to-Sound Mapping), nhận ra ngay nhiều chữ cái khác nhau cùng tạo ra một âm thanh duy nhất mà không bị rào cản IPA gây nản lòng',
      priority: 'must',
      status: 'in-progress',
      size: 'M',
      points: 5,
      acceptanceCriteria: [
        {
          id: 'ac-pron-209-1',
          given: 'Một câu luyện tập có chứa âm mục tiêu (ví dụ Target 2 cho âm /aɪ/: "I tried flying high")',
          when: 'Hệ thống hiển thị văn bản',
          then: 'Chữ số Target ("2") xuất hiện ngay phía trên các chữ cái tạo âm, và các ký tự "I", "ie", "y", "igh" được gạch chân sắc nét.',
          completed: true
        },
        {
          id: 'ac-pron-209-2',
          given: 'Học viên nhấp vào số Target hoặc chữ cái được gạch chân',
          when: 'Một popover mở ra',
          then: 'Hiển thị danh sách tất cả các quy tắc chính tả tạo ra âm này (Digraph Rules: i_e, y, igh, ie, i) cùng 3 ví dụ thông dụng.',
          completed: true
        }
      ],
      technicalTasks: [
        { id: 't-pron-209-1', title: 'Xây dựng component NumberedAnnotationRenderer hỗ trợ đánh số target trên đầu chữ cái và gạch chân phoneme digraphs', category: 'Frontend', completed: true },
        { id: 't-pron-209-2', title: 'Thiết kế cơ sở dữ liệu ánh xạ 44 âm IPA sang hệ thống Numbered Targets (Target 1 đến Target 20)', category: 'Database', completed: true }
      ],
      notes: 'Phương pháp Numbered Target System được áp dụng rộng rãi bởi các chuyên gia khẩu hình Mỹ (như Luke Priddy / Color Vowel System), giúp học viên ESL nhận diện cấu trúc âm thanh trực quan gấp 3 lần so với chỉ nhìn ký hiệu IPA.'
    },
    {
      id: 'PRON-210',
      epicId: 'epic-articulation',
      title: 'Video-Synchronized Masterclass & Exaggerated Articulation Shadowing (Video Khẩu Hình Cường Điệu & Luyện Shadowing Đồng Bộ)',
      persona: 'Học Viên Cần Nhìn Thấy Chuyển Động Cơ Mặt, Quai Hàm Và Dáng Môi Thực Tế Của Người Bản Ngữ',
      action: 'xem các video bài giảng của chuyên gia bản ngữ phân tích khẩu hình phóng đại (Exaggerated Facial Articulation), với phụ đề chạy nhịp nhàng đồng bộ theo từng âm vị đánh số và chế độ Shadowing Loop lặp lại câu mẫu',
      value: 'tôi sao chép chuẩn xác từng cử động cơ hàm và khóe miệng thực tế của người bản xứ, luyện nói nhại (shadowing) để giảm thiểu triệt để giọng điệu cứng ngắc (accent reduction)',
      priority: 'must',
      status: 'in-progress',
      size: 'L',
      points: 8,
      acceptanceCriteria: [
        {
          id: 'ac-pron-210-1',
          given: 'Danh sách video bài học theo từng Target Sound (Target 1: /æ/ 7:01, Target 2: /aɪ/ 3:20)',
          when: 'Học viên bấm phát video',
          then: 'Video hiển thị hình ảnh giảng viên thị phạm khẩu hình phóng đại kèm phụ đề đồng bộ gắn số mục tiêu nhảy chữ theo giọng nói.',
          completed: true
        },
        {
          id: 'ac-pron-210-2',
          given: 'Chế độ Shadowing Practice Mode kích hoạt',
          when: 'Video phát xong câu mẫu',
          then: 'Tự động mở mic thu âm giọng học viên đọc nhại lại theo nhịp điệu và đối chiếu tức thời độ tương đồng trường độ âm thanh.',
          completed: true
        }
      ],
      technicalTasks: [
        { id: 't-pron-210-1', title: 'Xây dựng VideoLessonPlayer với danh sách bài học (Playlist drawer), time-synced subtitle overlay và điều khiển tốc độ 0.75x/1.0x', category: 'Frontend', completed: true },
        { id: 't-pron-210-2', title: 'Tích hợp tính năng Shadowing Loop tự động đếm nhịp và thu âm lồng tiếng (Voice Dubbing Shadowing)', category: 'Frontend', completed: true }
      ],
      notes: 'Kỹ thuật khẩu hình cường điệu (Exaggeration Technique) là bí quyết cốt lõi trong Accent Reduction, giúp giải phóng cơ mặt vốn quen với khẩu hình hẹp của tiếng Việt.'
    },
    {
      id: 'PRON-211',
      epicId: 'epic-articulation',
      title: 'Dense Target Sound Saturation Sentences & Accent Reduction Benchmark (Luyện Câu Bão Hòa Âm Mục Tiêu & Đánh Giá Giảm Giọng Lơ Lớ)',
      persona: 'Người Học Đã Phát Âm Được Từ Đơn Nhưng Vẫn Giữ Giọng Lơ Lớ Khi Nói Cả Câu',
      action: 'luyện tập các câu bão hòa âm mục tiêu (Sound Saturation: câu có 70-90% các từ chứa cùng một âm vị mục tiêu, ví dụ: "That access point is absolutely fantastic" hoặc "I tried flying high"), sau đó thu âm để hệ thống tính toán chỉ số Accent Reduction Index',
      value: 'tôi rèn luyện sức bền cơ miệng và sự đồng nhất của khẩu hình trong suốt câu nói, triệt tiêu phản xạ thả lỏng cơ miệng dẫn đến méo âm ở cuối câu',
      priority: 'must',
      status: 'in-progress',
      size: 'M',
      points: 5,
      acceptanceCriteria: [
        {
          id: 'ac-pron-211-1',
          given: 'Một bài luyện bão hòa âm mục tiêu (ví dụ Target 1 với 5 âm /æ/)',
          when: 'Học viên đọc câu hoàn chỉnh',
          then: 'Hệ thống đánh giá độ mở hàm và trường độ của từng vị trí âm mục tiêu trong suốt câu, tính toán Consistency Score (độ ổn định khẩu hình).',
          completed: true
        },
        {
          id: 'ac-pron-211-2',
          given: 'Học viên phát âm chuẩn ở những từ đầu nhưng bị hẹp hàm ở từ cuối ("fantastic")',
          when: 'Báo cáo hoàn tất',
          then: 'Cảnh báo: "Khẩu hình bị hẹp lại ở cuối câu! Giữ nguyên độ mở quai hàm cho cả hai âm /æ/ trong từ \'fantastic\'".',
          completed: true
        }
      ],
      technicalTasks: [
        { id: 't-pron-211-1', title: 'Biên soạn ngân hàng câu bão hòa âm vị (Dense Saturation Corpus) cho 20 Target Sounds tiếng Anh', category: 'Content', completed: true },
        { id: 't-pron-211-2', title: 'Xây dựng thuật toán Accent Reduction Consistency Index đo độ ổn định trường độ âm vị trong chuỗi câu dài', category: 'Backend', completed: true }
      ],
      notes: 'Câu bão hòa âm vị đóng vai trò như bài tập tạ cho cơ miệng (muscle training), giúp biến phát âm chuẩn từ nỗ lực gượng gạo thành phản xạ tự nhiên vô điều kiện.'
    },

    // 5. Conversational AI & IELTS Speaking
    {
      id: 'VN-104',
      epicId: 'epic-roleplay-ielts',
      title: 'IELTS Speaking Part 1 & 2 AI Mock Examiner for Vietnamese Candidates',
      persona: 'Vietnamese Student or Working Professional Aiming for IELTS 7.0+',
      action: 'answer common IELTS Speaking prompts (e.g. Hometown, Work, Technology, Culture) and receive an instant Pronunciation Band score (Band 5.0 to 8.5)',
      value: 'I practice high-stakes exam conditions with actionable feedback mapped directly to official IELTS Pronunciation Band Descriptors',
      priority: 'should',
      status: 'in-progress',
      size: 'L',
      points: 8,
      acceptanceCriteria: [
        {
          id: 'ac-vn-104-1',
          given: 'An IELTS Part 2 cue card prompt',
          when: 'The user speaks continuously for 1 to 2 minutes',
          then: 'The AI examiner calculates: Band Score for Pronunciation, Chunking & Linking score, and flags accent interference that reduces intelligibility.',
          completed: true
        },
        {
          id: 'ac-vn-104-2',
          given: 'The speech analysis finishes',
          when: 'The scorecard renders',
          then: 'It provides specific advice on how to move from Band 6.0 (some phonemic inaccuracies) to Band 7.0+ (sustained flexible intonation and syllable stress).',
          completed: false
        }
      ],
      technicalTasks: [
        { id: 't-vn-8', title: 'Prompt engineer LLM evaluator with official British Council / IDP IELTS Pronunciation Band Descriptors', category: 'Backend', completed: true },
        { id: 't-vn-9', title: 'Build 2-minute timed examination recorder UI with preparation timer and prompt card', category: 'Frontend', completed: true },
        { id: 't-vn-10', title: 'Store mock exam historical transcripts and audio recordings for progress tracking', category: 'Database', completed: false }
      ],
      notes: 'Massive market appeal in Vietnam where hundreds of thousands of students take IELTS annually.'
    },
    {
      id: 'ELSA-301',
      epicId: 'epic-roleplay-ielts',
      title: 'Dynamic Scenario AI Speaking Roleplay (IT Standup, Coffee Shop)',
      persona: 'Vietnamese IT Engineer / Professional Speaking to Foreign Clients',
      action: 'have unscripted spoken conversation with an AI partner simulating realistic workplace scenarios (Daily Scrum Standup, Demoing Software, Coffee Shop)',
      value: 'I build spontaneous speaking confidence without fear of embarrassment in front of real people',
      priority: 'must',
      status: 'in-progress',
      size: 'L',
      points: 8,
      acceptanceCriteria: [
        {
          id: 'ac-elsa-301-1',
          given: 'An active AI roleplay scenario ("Daily Standup with US Project Manager")',
          when: 'User speaks their status update',
          then: 'System transcribes audio, evaluates pronunciation, and generates context-aware audio AI response within 1.2 seconds.',
          completed: true
        }
      ],
      technicalTasks: [
        { id: 't-elsa-18', title: 'Integrate LLM conversation agent with streaming Text-To-Speech (TTS) pipeline', category: 'Backend', completed: true },
        { id: 't-elsa-19', title: 'Build chat bubble voice interface with animated speaking waveform and mic controls', category: 'Frontend', completed: true }
      ],
      notes: 'Target Vietnamese IT outsourcing community (FPT, VNG, KMS, TMA).'
    },
    {
      id: 'ELSA-302',
      epicId: 'epic-roleplay-ielts',
      title: 'Post-Roleplay Comprehensive Scorecard (Pronunciation + Grammar)',
      persona: 'Roleplay Practicer Reviewing Performance',
      action: 'view a summary scorecard after completing an AI roleplay session highlighting pronunciation errors, vocabulary enhancements, and grammar corrections',
      value: 'I get holistic feedback on real communicative competence rather than just isolated phonemes',
      priority: 'should',
      status: 'todo',
      size: 'M',
      points: 5,
      acceptanceCriteria: [
        {
          id: 'ac-elsa-302-1',
          given: 'A completed roleplay session with 6 conversational turns',
          when: 'Session ends',
          then: 'Dashboard displays: Pronunciation Score (e.g. 78%), Grammar Correctness (85%), and 3 Better Ways to Say It.',
          completed: false
        }
      ],
      technicalTasks: [
        { id: 't-elsa-21', title: 'Implement post-conversation grammar and lexical variety analysis pipeline via LLM', category: 'Backend', completed: false },
        { id: 't-elsa-22', title: 'Build interactive scorecard dialog with audio replay for mispronounced words', category: 'Frontend', completed: false }
      ],
      notes: 'Provides complete educational loop after conversation.'
    },

    // 6. Retention, Daily Path & Monetization
    {
      id: 'USER-101',
      epicId: 'epic-retention',
      title: 'Learner Authentication, Pronunciation Mastery Dashboard & Practice Recording History',
      persona: 'Vietnamese Learner Tracking Their Speaking Journey',
      action: 'log in with my account, view my 4-pillar pronunciation mastery scores (% Ending Sounds, Minimal Pairs, Stress, Connected Speech), and review my complete history of recorded speech attempts',
      value: 'I have full visibility into my phonetic improvement over time and can listen back to native reference audio for every past mistake',
      priority: 'must',
      status: 'done',
      size: 'L',
      points: 8,
      acceptanceCriteria: [
        {
          id: 'ac-user-101-1',
          given: 'A logged-in learner opening the "Tiến Độ & Lịch Sử" tab',
          when: 'The dashboard loads',
          then: 'Displays overall GOP pronunciation score (e.g. 76% - IELTS 7.0), radar/progress bars for 4 Vietnamese phonetic pillars, and streak shields.',
          completed: true
        },
        {
          id: 'ac-user-101-2',
          given: 'A user reviewing past practice attempts',
          when: 'Viewing recording history items',
          then: 'Each record shows target phrase, IPA, GOP score, Vietnamese error tags, and provides a 1-click button to listen to native reference pronunciation.',
          completed: true
        }
      ],
      technicalTasks: [
        { id: 't-user-1', title: 'Build UserProfileProgressView component with 4-pillar phoneme mastery bars and historical recording logs', category: 'Frontend', completed: true },
        { id: 't-user-2', title: 'Implement AuthModal supporting Demo accounts, custom learner profile registration, and L1 regional accent calibration', category: 'Frontend', completed: true },
        { id: 't-user-3', title: 'Integrate Web Speech Synthesis API for instant native audio reference playback of historical recordings', category: 'Frontend', completed: true }
      ],
      notes: 'Essential for user retention; allows learners to see tangible proof of their accent reduction.'
    },
    {
      id: 'ELSA-401',
      epicId: 'epic-retention',
      title: '10-Minute Daily Personalized Practice Path (Adaptive Curriculum)',
      persona: 'Busy Office Worker / Student with 15 Minutes Daily',
      action: 'open the app each day and have a personalized 3-step practice path automatically ready for me targeting my weakest phonemes',
      value: 'I never wonder what to practice next and can build continuous improvement in just 10 minutes a day',
      priority: 'must',
      status: 'todo',
      size: 'M',
      points: 5,
      acceptanceCriteria: [
        {
          id: 'ac-elsa-401-1',
          given: 'A user opens the platform for the day',
          when: 'Home path loads',
          then: 'Curates 3 micro-modules: 1) Sound Warmup (weak phonemes), 2) Sentence Practice, 3) Quick Roleplay.',
          completed: false
        }
      ],
      technicalTasks: [
        { id: 't-elsa-24', title: 'Build adaptive lesson recommendation algorithm querying recent user error logs', category: 'Backend', completed: false },
        { id: 't-elsa-25', title: 'Create Daily Path progress card on dashboard with step indicators', category: 'Frontend', completed: false }
      ],
      notes: 'Keeps cognitive friction low for daily active users.'
    },
    {
      id: 'ELSA-402',
      epicId: 'epic-retention',
      title: 'Automated Error Bank with Spaced Repetition (SM-2 Algorithm)',
      persona: 'Diligently Improving Learner',
      action: 'have every word I mispronounce (<60%) automatically saved into my personal Error Bank for scheduled review at 1, 3, 7, and 14 days',
      value: 'I systematically eliminate my recurring mistakes through scientifically proven spaced retrieval practice',
      priority: 'should',
      status: 'backlog',
      size: 'M',
      points: 5,
      acceptanceCriteria: [
        {
          id: 'ac-elsa-402-1',
          given: 'User scores <60% on "comfortable"',
          when: 'Lesson finishes',
          then: 'Word is added to user error_bank with next review due date calculated via SuperMemo SM-2 interval.',
          completed: false
        }
      ],
      technicalTasks: [
        { id: 't-elsa-26', title: 'Implement SM-2 spaced repetition calculation service in backend', category: 'Backend', completed: false },
        { id: 't-elsa-27', title: 'Build "My Sound Bank" review deck UI with audio comparison and mastery status', category: 'Frontend', completed: false }
      ],
      notes: 'High retention driver; gives users a tangible sense of clearing their debt of mistakes.'
    },
    {
      id: 'ELSA-601',
      epicId: 'epic-retention',
      title: 'Daily Practice Streak Counter & Streak Freeze Shields',
      persona: 'Habit Builder',
      action: 'see my active speaking streak on the home screen and use a "Streak Freeze" if I miss a day due to work/travel',
      value: 'I build a daily English speaking habit without losing motivation after a single missed day',
      priority: 'should',
      status: 'done',
      size: 'S',
      points: 2,
      acceptanceCriteria: [
        {
          id: 'ac-elsa-601-1',
          given: 'User completes at least 1 speaking lesson today',
          when: 'Streak updates',
          then: 'Streak counter increments by 1 with flame particle animation.',
          completed: true
        }
      ],
      technicalTasks: [
        { id: 't-elsa-35', title: 'Implement timezone-aware daily streak calculation service in backend', category: 'Backend', completed: true },
        { id: 't-elsa-36', title: 'Build celebratory streak milestone unlock modal with confetti burst', category: 'Frontend', completed: true }
      ],
      notes: 'Vietnamese users respond very strongly to gamified streaks.'
    },
    {
      id: 'ELSA-602',
      epicId: 'epic-retention',
      title: 'Freemium 5-Lesson Daily Limit & Pro Subscription Paywall',
      persona: 'Free Tier User Deciding to Upgrade',
      action: 'hit a friendly paywall after completing 5 free lessons today offering an upgrade to Pro for unlimited AI Roleplays',
      value: 'the company monetizes engaged users while allowing free users to build initial habit',
      priority: 'must',
      status: 'todo',
      size: 'M',
      points: 5,
      acceptanceCriteria: [
        {
          id: 'ac-elsa-602-1',
          given: 'A free tier user attempts a 6th lesson today',
          when: 'Lesson starts',
          then: 'A paywall modal opens showcasing Pro benefits (Unlimited AI Roleplay, Detailed Phoneme Breakdown, IELTS Examiner).',
          completed: false
        }
      ],
      technicalTasks: [
        { id: 't-elsa-37', title: 'Implement daily lesson usage quota tracking in database with midnight reset', category: 'Backend', completed: false },
        { id: 't-elsa-38', title: 'Design high-converting Pro paywall dialog with MoMo / VNPay / Stripe checkout options', category: 'Frontend', completed: false }
      ],
      notes: 'Support domestic Vietnamese payment methods (MoMo, VNPay, domestic bank QR) for 4x higher checkout conversion.'
    },
    {
      id: 'USER-101',
      epicId: 'epic-retention',
      title: 'Learner Authentication, Pronunciation Mastery Dashboard & Practice Recording History',
      persona: 'Vietnamese Learner Tracking Their Speaking Journey',
      action: 'log in with my account, view my 4-pillar pronunciation mastery scores (% Ending Sounds, Minimal Pairs, Stress, Connected Speech), and review my complete history of recorded speech attempts',
      value: 'I have full visibility into my phonetic improvement over time and can listen back to native reference audio for every past mistake',
      priority: 'must',
      status: 'done',
      size: 'L',
      points: 8,
      acceptanceCriteria: [
        {
          id: 'ac-user-101-1',
          given: 'A logged-in learner opening the "Tiến Độ & Lịch Sử" tab',
          when: 'The dashboard loads',
          then: 'Displays overall GOP pronunciation score (e.g. 76% - IELTS 7.0), radar/progress bars for 4 Vietnamese phonetic pillars, and streak shields.',
          completed: true
        },
        {
          id: 'ac-user-101-2',
          given: 'A user reviewing past practice attempts',
          when: 'Viewing recording history items',
          then: 'Each record shows target phrase, IPA, GOP score, Vietnamese error tags, and provides a 1-click button to listen to native reference pronunciation.',
          completed: true
        }
      ],
      technicalTasks: [
        { id: 't-user-1', title: 'Build UserProfileProgressView component with 4-pillar phoneme mastery bars and historical recording logs', category: 'Frontend', completed: true },
        { id: 't-user-2', title: 'Implement AuthModal supporting Demo accounts, custom learner profile registration, and L1 regional accent calibration', category: 'Frontend', completed: true },
        { id: 't-user-3', title: 'Integrate Web Speech Synthesis API for instant native audio reference playback of historical recordings', category: 'Frontend', completed: true }
      ],
      notes: 'Essential for user retention; allows learners to see tangible proof of their accent reduction.'
    },
    {
      id: 'USER-102',
      epicId: 'epic-diagnostic',
      title: 'Theo Dõi Tiến Độ Chi Tiết Từng Âm IPA & Lịch Sử Cải Thiện Âm Vị (Granular Phoneme Mastery Ledger)',
      persona: 'Người Học Tiếng Anh Cần Kiểm Soát Tiến Độ Từng Âm',
      action: 'xem bảng thống kê chi tiết tỷ lệ chính xác, số lần luyện tập, và biểu đồ tiến bộ theo thời gian của từng âm trong 44 âm IPA (/θ/, /iː/, /ʃ/, /s/, /t/, /d/...)',
      value: 'tôi biết chính xác âm nào mình đã thuần thục để duy trì, và âm nào còn yếu để tập trung cải thiện mà không phải đoán mò',
      priority: 'must',
      status: 'done',
      size: 'M',
      points: 5,
      acceptanceCriteria: [
        {
          id: 'ac-user-102-1',
          given: 'Học viên mở bảng thống kê tiến độ âm vị (Phoneme Mastery Grid)',
          when: 'Màn hình tải',
          then: 'Hiển thị ma trận 44 âm IPA được phân loại theo 3 màu: Đã làm chủ (>80% - Xanh), Đang cải thiện (60-80% - Vàng), và Cần khắc phục gấp (<60% - Đỏ).',
          completed: true
        },
        {
          id: 'ac-user-102-2',
          given: 'Học viên chọn vào một âm bất kỳ (ví dụ /θ/)',
          when: 'Xem chi tiết âm',
          then: 'Hiển thị: Tỷ lệ chính xác trung bình, số lượt đã luyện tập, biểu đồ tăng/giảm điểm qua các ngày, danh sách từ vựng đã ghi âm chứa âm đó, và nút 1-click để luyện tập riêng âm này.',
          completed: true
        }
      ],
      technicalTasks: [
        { id: 't-user-102-1', title: 'Thiết kế component ma trận 44 âm IPA kèm tooltip chi tiết và bộ lọc nguyên âm/phụ âm', category: 'Frontend', completed: true },
        { id: 't-user-102-2', title: 'Xây dựng schema lưu trữ lịch sử Goodness of Pronunciation (GOP) theo từng phoneme_id trong SQLite backend', category: 'Backend', completed: true },
        { id: 't-user-102-3', title: 'Tích hợp nút tắt chuyển nhanh sang Khẩu hình 2D hoặc Game 3D theo đúng âm vị đang xem', category: 'Frontend', completed: true }
      ],
      notes: 'Tính năng thiết yếu giúp người học thấy rõ sự tiến bộ cụ thể của từng âm vị theo ngày thay vì chỉ có điểm số chung chung.'
    },
    {
      id: 'GAME-101',
      epicId: 'epic-gamified-3d',
      title: 'Multi-Tier Level Progression & 4-World Map Engine',
      persona: 'Vietnamese Learner Playing Pronunciation RPG',
      action: 'progress through 4 distinct phonetic worlds (World 1: Âm Đuôi, World 2: Cặp Âm, World 3: Trọng Âm, World 4: Nối Âm & Trùm Rồng) with 12 playable stages and 3-star ratings',
      value: 'I have a clear, structured roadmap that progressively challenges my pronunciation from basic final consonants to fluent connected speech',
      priority: 'must',
      status: 'in-progress',
      size: 'L',
      points: 8,
      acceptanceCriteria: [
        {
          id: 'ac-game-101-1',
          given: 'A player selecting a World (1: Final Consonants, 2: Minimal Pairs, 3: Syllable Stress, 4: Connected Speech)',
          when: 'The world loads',
          then: 'The UI displays stage nodes with unlock status, star ratings (⭐⭐⭐), target phonemes, and XP rewards.',
          completed: true
        },
        {
          id: 'ac-game-101-2',
          given: 'Completing a stage with GOP score >= 90%',
          when: 'Stage victory triggers',
          then: '3 stars are awarded, the next stage unlocks, and player XP/streak updates with fanfare animation.',
          completed: true
        }
      ],
      technicalTasks: [
        { id: 't-game-1', title: 'Implement GameWorlds and Stages data schema with 12 calibrated pedagogical levels', category: 'Frontend', completed: true },
        { id: 't-game-2', title: 'Build interactive World & Stage Selector ribbon with 3-star rating indicators', category: 'Frontend', completed: true },
        { id: 't-game-3', title: 'Persist stage completion and stars in local storage & SQLite player profile', category: 'Backend', completed: false }
      ],
      notes: 'Structured progression turns fragmented pronunciation drills into an addictive, rewarding adventure.'
    },
    {
      id: 'GAME-102',
      epicId: 'epic-gamified-3d',
      title: 'Dual Voice Controller: Real-Time Web Speech Microphone & Fallback Simulation',
      persona: 'Player Wanting Hands-Free Voice Control',
      action: 'speak directly into my laptop or phone microphone using Web Speech API, with one-click simulation buttons available for noisy environments',
      value: 'I can practice authentic vocal production and get instant in-game spellcast reactions without friction',
      priority: 'must',
      status: 'done',
      size: 'M',
      points: 5,
      acceptanceCriteria: [
        {
          id: 'ac-game-102-1',
          given: 'A player enabling real microphone mode',
          when: 'Speaking the target word clearly (e.g. "SIX" or "THINK")',
          then: 'The browser Web Speech engine captures phonemes in real-time, validates the word, and unleashes the spell beam within 300ms.',
          completed: true
        },
        {
          id: 'ac-game-102-2',
          given: 'A user testing without a microphone or in a quiet study room',
          when: 'Clicking the "Hô Thần Chú Chuẩn" or "Thử Lỗi Người Việt" buttons',
          then: 'The game triggers the exact same combat animation, audio feedback, and educational acoustic diagnostic tip.',
          completed: true
        }
      ],
      technicalTasks: [
        { id: 't-game-4', title: 'Integrate Web Speech API (window.SpeechRecognition) with auto-start and speech result parser', category: 'Frontend', completed: true },
        { id: 't-game-5', title: 'Implement fallback simulation triggers with Vietnamese phonetic error explanations', category: 'Frontend', completed: true }
      ],
      notes: 'Ensures 100% usability whether in a private bedroom with microphone or in a quiet library with simulation mode.'
    },
    {
      id: 'GAME-103',
      epicId: 'epic-gamified-3d',
      title: 'Auditory Discrimination Boss Arenas & Turn-Based Minimal Pair Counter-Spells',
      persona: 'Player Facing Regional Dungeon Bosses',
      action: 'face epic area bosses (Stone Golem, Twin Phantoms, Chronos Titan, Dragon of Accents) and cast the precise phonetic counter-spell within a 3-second timer',
      value: 'I build lightning-fast auditory discrimination reflexes under game pressure, conquering my mother-tongue instincts',
      priority: 'should',
      status: 'in-progress',
      size: 'L',
      points: 8,
      acceptanceCriteria: [
        {
          id: 'ac-game-103-1',
          given: 'A boss stage encounter (e.g. Twin Phantoms requiring /θ/ vs /t/ contrast)',
          when: 'Player accurately voices the counter-spell within 3 seconds',
          then: 'Deals 150-250 DMG to the boss health bar with screen shake, particle sparks, and combo increment.',
          completed: true
        },
        {
          id: 'ac-game-103-2',
          given: 'Player confuses the sound (e.g. saying /tɪŋk/ instead of /θɪŋk/)',
          when: 'Boss barrier deflects attack',
          then: 'Player takes 15 HP damage, combo resets, and an anatomical mouth guide tip appears explaining tongue placement.',
          completed: true
        }
      ],
      technicalTasks: [
        { id: 't-game-6', title: 'Build boss encounter state machine with boss HP bars, enrage timers, and damage calculations', category: 'Frontend', completed: true },
        { id: 't-game-7', title: 'Create Vietnamese-specific phonetic feedback generator for minimal pair confusions', category: 'Backend', completed: true }
      ],
      notes: 'Boss encounters provide exhilarating milestone tests at the conclusion of each curriculum world.'
    },
    {
      id: 'GAME-104',
      epicId: 'epic-gamified-3d',
      title: 'Zero-Latency Web Audio API Sound Synthesizer & 3D Isometric Combat Canvas',
      persona: 'Web Player on Any Device',
      action: 'experience crisp sound effects (laser beams, shattering crystals, hurt thuds, victory fanfares) and smooth 60 FPS combat animations with zero external sound file downloads',
      value: 'The game loads instantaneously (<1s) and plays without audio lag even on spotty 3G/4G mobile connections',
      priority: 'must',
      status: 'done',
      size: 'M',
      points: 5,
      acceptanceCriteria: [
        {
          id: 'ac-game-104-1',
          given: 'Any combat action (successful shatter or damage taken)',
          when: 'Action occurs',
          then: 'Synthesized Web Audio frequencies generate immediately without network requests.',
          completed: true
        },
        {
          id: 'ac-game-104-2',
          given: 'Low-power mobile laptop or phone',
          when: 'Rendering isometric perspective track',
          then: 'Maintains buttery 60 FPS with CSS perspective grid and hardware-accelerated transforms.',
          completed: true
        }
      ],
      technicalTasks: [
        { id: 't-game-8', title: 'Implement SoundFX class with OscillatorNode and GainNode synthesis (Laser, Shatter, Hurt, Victory)', category: 'Frontend', completed: true },
        { id: 't-game-9', title: 'Render responsive isometric combat arena with glowing spellcast beam and destructible obstacle states', category: 'Frontend', completed: true }
      ],
      notes: 'Pure synthesizer architecture eliminates 15MB+ of audio asset downloads.'
    },
    {
      id: 'GAME-105',
      epicId: 'epic-gamified-3d',
      title: 'RPG Equipment Inventory, Perk System & University Leaderboard Ranks',
      persona: 'Competitive Vietnamese College Student / IT Engineer',
      action: 'equip magical phonetic gear (Wand of Ending Sounds, Boots of Stress Rhythm) and climb university rankings (ĐHQG, Bách Khoa, NEU)',
      value: 'I stay motivated to practice daily through progression prestige and pride in representing my university',
      priority: 'could',
      status: 'in-progress',
      size: 'S',
      points: 3,
      acceptanceCriteria: [
        {
          id: 'ac-game-105-1',
          given: 'Player viewing their avatar profile',
          when: 'Opening the Inventory modal',
          then: 'Equipped gear with phonetic combat perks and locked legendary gear are displayed clearly.',
          completed: true
        },
        {
          id: 'ac-game-105-2',
          given: 'Reaching higher levels (Level 5+)',
          when: 'XP threshold is crossed',
          then: 'Level Up modal triggers, unlocking new equipment slots and titles.',
          completed: false
        }
      ],
      technicalTasks: [
        { id: 't-game-10', title: 'Build RPG Inventory & Equipment modal with equipment perks and unlock requirements', category: 'Frontend', completed: true },
        { id: 't-game-11', title: 'Create university leaderboard ranking schema in SQLite backend', category: 'Backend', completed: false }
      ],
      notes: 'Strong social and competitive motivator for university students and young tech professionals.'
    }
  ]
};

// Aliases for backwards-compatibility
export const INITIAL_PROJECT = VIETNAMESE_PRONUNCIATION_PROJECT;
export const ELSA_PROJECT = VIETNAMESE_PRONUNCIATION_PROJECT;
export const PRONUNCIATION_PROJECT = VIETNAMESE_PRONUNCIATION_PROJECT;
export const VIETNAMESE_ACCENT_EPIC = VIETNAMESE_PRONUNCIATION_PROJECT.epics[0];
export const VIETNAMESE_ACCENT_STORIES = VIETNAMESE_PRONUNCIATION_PROJECT.stories.filter(s => s.id.startsWith('VN-'));
