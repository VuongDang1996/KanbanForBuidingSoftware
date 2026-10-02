import React, { useState, useRef, useEffect } from 'react';
import {
  Volume2,
  Mic,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Play,
  Pause,
  Headphones,
  BookOpen,
  Activity,
  Sparkles,
  ChevronRight,
  Repeat,
  Sliders,
  Check,
  HelpCircle,
  Flame,
  ArrowRight,
  Layers,
  ListChecks,
  BookmarkCheck,
  Split,
  PlaySquare,
  ListOrdered
} from 'lucide-react';

// ==========================================
// 1. VOICED TH (/ð/) 14-STEP SYLLABUS DATA
// (Directly mapped to the user curriculum screenshot)
// ==========================================
const VOICED_TH_SYLLABUS = [
  {
    id: 'master-guide',
    type: 'guide',
    title: 'How to MASTER one of the most common sounds in English: The Voiced TH',
    category: 'Khởi Động & Khẩu Hình',
    badge: 'Mouth Setup',
    description: 'Rung nhẹ dây thanh quản (vocal cords), kẹp nhẹ đầu lưỡi giữa hai hàm răng và đẩy luồng hơi liên tục (khác âm /d/ đặt lưỡi ở chân răng trên).',
    tip: 'Đặt 2 ngón tay lên cổ họng: khi nói /ð/, bạn phải cảm nhận được độ rung rõ rệt.',
    items: [
      { text: 'The Voiced TH sound /ð/ is in top 10 most common sounds.', ipa: '/ð/', tip: 'Rung cổ họng khi phát âm' }
    ]
  },
  {
    id: 'th-vs-d-minimal-pairs',
    type: 'minimal-pairs',
    title: 'Voiced Th vs D Minimal Pairs',
    category: 'Cặp Âm Đối Kháng',
    badge: '/ð/ vs /d/',
    description: 'Phân biệt cặp âm đối lập kinh điển: /ð/ (kẹp răng rung hơi) vs /d/ (bật lưỡi chân răng trên). Lỗi số 1 của người Việt là thay thế /ð/ bằng "đ".',
    tip: 'Nghe lần lượt 2 từ để tai cảm nhận sự khác biệt giữa âm xát rung và âm tắc nổ.',
    pairs: [
      { a: 'they', ipaA: '/ðeɪ/', b: 'day', ipaB: '/deɪ/', note: 'they (họ) vs day (ngày)' },
      { a: 'there', ipaA: '/ðeər/', b: 'dare', ipaB: '/deər/', note: 'there (ở đó) vs dare (dám)' },
      { a: 'though', ipaA: '/ðoʊ/', b: 'dough', ipaB: '/doʊ/', note: 'though (mặc dù) vs dough (bột nhào)' },
      { a: 'breathe', ipaA: '/briːð/', b: 'breed', ipaB: '/briːd/', note: 'breathe (thở) vs breed (sinh sản)' },
      { a: 'soothe', ipaA: '/suːð/', b: 'sued', ipaB: '/suːd/', note: 'soothe (xoa dịu) vs sued (bị kiện)' }
    ]
  },
  {
    id: 'th-initial-words',
    type: 'words',
    title: 'VOICED TH INITIAL WORDS',
    category: 'Từ Đơn Phân Vị',
    position: 'Initial (Đầu từ)',
    badge: 'Words',
    description: 'Luyện âm /ð/ khi đứng ở vị trí bắt đầu từ. Đây là vị trí phổ biến nhất trong các đại từ và từ chỉ định tiếng Anh.',
    tip: 'Chuẩn bị lưỡi kẹp nhẹ giữa hai hàm răng TRƯỚC KHI phát ra âm thanh.',
    items: [
      { word: 'this', ipa: '/ðɪs/', meaning: 'cái này' },
      { word: 'that', ipa: '/ðæt/', meaning: 'cái kia' },
      { word: 'these', ipa: '/ðiːz/', meaning: 'những cái này' },
      { word: 'those', ipa: '/ðoʊz/', meaning: 'những cái kia' },
      { word: 'they', ipa: '/ðeɪ/', meaning: 'họ / chúng' },
      { word: 'them', ipa: '/ðɛm/', meaning: 'họ (tân ngữ)' },
      { word: 'their', ipa: '/ðɛər/', meaning: 'của họ' },
      { word: 'then', ipa: '/ðɛn/', meaning: 'sau đó' }
    ]
  },
  {
    id: 'th-middle-words',
    type: 'words',
    title: 'VOICED TH MIDDLE WORDS',
    category: 'Từ Đơn Phân Vị',
    position: 'Medial (Giữa từ)',
    badge: 'Words',
    description: 'Luyện âm /ð/ khi đứng ở giữa 2 nguyên âm. Người học thường líu lưỡi hoặc bỏ qua độ rung khi chuyển âm.',
    tip: 'Duy trì luồng hơi rung liên tục khi chuyển từ âm tiết trước sang âm tiết sau.',
    items: [
      { word: 'mother', ipa: '/ˈmʌðər/', meaning: 'người mẹ' },
      { word: 'father', ipa: '/ˈfɑːðər/', meaning: 'người cha' },
      { word: 'brother', ipa: '/ˈbrʌðər/', meaning: 'anh em trai' },
      { word: 'weather', ipa: '/ˈwɛðər/', meaning: 'thời tiết' },
      { word: 'together', ipa: '/təˈɡɛðər/', meaning: 'cùng nhau' },
      { word: 'feather', ipa: '/ˈfɛðər/', meaning: 'lông vũ' },
      { word: 'leather', ipa: '/ˈlɛðər/', meaning: 'da thuộc' },
      { word: 'another', ipa: '/əˈnʌðər/', meaning: 'cái khác' }
    ]
  },
  {
    id: 'th-end-words',
    type: 'words',
    title: 'VOICED TH END WORDS',
    category: 'Từ Đơn Phân Vị',
    position: 'Final (Cuối từ)',
    badge: 'Words',
    description: 'Luyện âm /ð/ khi đứng ở cuối từ. Người Việt có xu hướng nuốt âm đuôi này hoặc ngắt hơi quá đột ngột.',
    tip: 'Kéo dài độ rung của âm /ð/ ít nhất 150ms trước khi kết thúc từ, không nuốt âm.',
    items: [
      { word: 'breathe', ipa: '/briːð/', meaning: 'thở (động từ)' },
      { word: 'bathe', ipa: '/beɪð/', meaning: 'tắm (động từ)' },
      { word: 'soothe', ipa: '/suːð/', meaning: 'xoa dịu' },
      { word: 'smooth', ipa: '/smuːð/', meaning: 'mịn màng, trơn tru' },
      { word: 'clothe', ipa: '/kloʊð/', meaning: 'mặc đồ cho' },
      { word: 'teethe', ipa: '/tiːð/', meaning: 'mọc răng' }
    ]
  },
  {
    id: 'th-initial-phrases',
    type: 'phrases',
    title: 'VOICED TH INITIAL PHRASES',
    category: 'Cụm Từ Phân Vị',
    position: 'Initial (Đầu cụm)',
    badge: 'Phrases',
    description: 'Luyện âm /ð/ trong cụm từ tự nhiên, rèn luyện phản xạ nối âm và nhịp điệu tự nhiên.',
    tip: 'Nối âm mềm mại giữa các từ mà không ngắt quãng staccato.',
    items: [
      { phrase: 'this and that', ipa: '/ðɪs ənd ðæt/', target: 'this, that' },
      { phrase: 'the other day', ipa: '/ði ˈʌðər deɪ/', target: 'the, other' },
      { phrase: 'then and there', ipa: '/ðɛn ənd ðɛər/', target: 'then, there' },
      { phrase: 'these or those', ipa: '/ðiːz ɔːr ðoʊz/', target: 'these, those' }
    ]
  },
  {
    id: 'th-middle-phrases',
    type: 'phrases',
    title: 'VOICED TH MIDDLE PHRASES',
    category: 'Cụm Từ Phân Vị',
    position: 'Medial (Giữa cụm)',
    badge: 'Phrases',
    description: 'Luyện âm /ð/ nằm ở giữa cụm từ trong ngữ cảnh đời sống thường nhật.',
    tip: 'Giữ tốc độ nói đều đặn, không nuốt âm /ð/ ở giữa từ.',
    items: [
      { phrase: 'my mother said', ipa: '/maɪ ˈmʌðər sɛd/', target: 'mother' },
      { phrase: 'together forever', ipa: '/təˈɡɛðər fərˈɛvər/', target: 'together' },
      { phrase: 'cold winter weather', ipa: '/koʊld ˈwɪntər ˈwɛðər/', target: 'weather' },
      { phrase: 'like birds of a feather', ipa: '/laɪk bɜːrdz əv ə ˈfɛðər/', target: 'feather' }
    ]
  },
  {
    id: 'th-end-phrases',
    type: 'phrases',
    title: 'VOICED TH END PHRASES',
    category: 'Cụm Từ Phân Vị',
    position: 'Final (Cuối cụm)',
    badge: 'Phrases',
    description: 'Luyện âm /ð/ đứng ở cuối từ liên kết với từ tiếp theo trong cụm từ.',
    tip: 'Lưu ý hiện tượng nối âm (linking) khi từ tiếp theo bắt đầu bằng nguyên âm.',
    items: [
      { phrase: 'breathe in deeply', ipa: '/briːð ɪn ˈdiːpli/', target: 'breathe' },
      { phrase: 'soothe the pain', ipa: '/suːð ðə peɪn/', target: 'soothe, the' },
      { phrase: 'smooth clean surface', ipa: '/smuːð kliːn ˈsɜːrfɪs/', target: 'smooth' }
    ]
  },
  {
    id: 'th-initial-sentences',
    type: 'sentences',
    title: 'VOICED TH INITIAL SENTENCES',
    category: 'Câu Ngữ Cảnh',
    position: 'Initial (Đầu câu)',
    badge: 'Sentences',
    description: 'Luyện âm /ð/ trong câu hoàn chỉnh với nhiều từ bắt đầu bằng /ð/.',
    tip: 'Tập trung vào sự trôi chảy và ngữ điệu tự nhiên của cả câu.',
    items: [
      { sentence: 'This is the best that they could find for their trip.', targets: ['This', 'that', 'they', 'their'] },
      { sentence: 'These shoes are much better than those old ones.', targets: ['These', 'than', 'those'] }
    ]
  },
  {
    id: 'th-middle-sentences',
    type: 'sentences',
    title: 'VOICED TH MIDDLE SENTENCES',
    category: 'Câu Ngữ Cảnh',
    position: 'Medial (Giữa câu)',
    badge: 'Sentences',
    description: 'Câu chứa dày đặc các từ có âm /ð/ ở giữa (mother, father, gather, together, weather).',
    tip: 'Thả lỏng cơ miệng và duy trì độ rung ổn định qua từng từ.',
    items: [
      { sentence: 'My mother and father gather together when the weather is warm.', targets: ['mother', 'father', 'gather', 'together', 'weather'] },
      { sentence: 'My brother bought another leather jacket yesterday.', targets: ['brother', 'another', 'leather'] }
    ]
  },
  {
    id: 'th-end-sentences',
    type: 'sentences',
    title: 'VOICED TH END SENTENCES',
    category: 'Câu Ngữ Cảnh',
    position: 'Final (Cuối câu)',
    badge: 'Sentences',
    description: 'Câu chứa các động từ tận cùng bằng âm /ð/ như breathe, soothe, teethe.',
    tip: 'Phát âm rõ âm rung /ð/ trước khi ngắt câu hoặc chuyển ý.',
    items: [
      { sentence: 'Take a slow deep breath and breathe calmly to soothe your mind.', targets: ['breathe', 'soothe'] },
      { sentence: 'The baby began to teethe, so we tried to soothe him all night.', targets: ['teethe', 'soothe'] }
    ]
  },
  {
    id: 'th-exception-words',
    type: 'exceptions',
    title: 'TH EXCEPTION WORDS',
    category: 'Từ Ngoại Lệ & Quy Tắc',
    badge: 'Exceptions & Noun/Verb',
    description: 'Các từ có chính tả TH nhưng đọc bất quy tắc (âm câm) hoặc quy tắc biến đổi âm vị Noun /θ/ vs Verb /ð/.',
    tip: 'Đừng để mặt chữ tiếng Anh đánh lừa! Nhớ quy tắc: Danh từ là /θ/ vô thanh, Động từ là /ð/ hữu thanh.',
    items: [
      { word: 'thyme', ipa: '/taɪm/', note: 'Chữ TH đọc là /t/ (âm câm h), không kẹp răng!', meaning: 'Cây xạ hương' },
      { word: 'asthma', ipa: '/ˈæzmə/', note: 'Chữ TH hoàn toàn câm (silent th), đọc là /z/!', meaning: 'Bệnh hen suyễn' },
      { word: 'Thomas', ipa: '/ˈtɒməs/', note: 'Tên riêng: TH phát âm là /t/!', meaning: 'Tên người' },
      { word: 'breath /θ/ vs breathe /ð/', ipa: '/brɛθ/ vs /briːð/', note: 'Quy tắc từ loại: Breath (danh từ, vô thanh) vs Breathe (động từ, hữu thanh)', meaning: 'Hơi thở vs Thở' },
      { word: 'bath /θ/ vs bathe /ð/', ipa: '/bɑːθ/ vs /beɪð/', note: 'Bath (danh từ, vô thanh) vs Bathe (động từ, hữu thanh)', meaning: 'Bồn tắm vs Tắm' }
    ]
  },
  {
    id: 'th-to-d-words',
    type: 'cross-words',
    title: 'VOICED TH TO D WORDS',
    category: 'Luyện Bẫy Âm /ð/ vs /d/',
    badge: '/ð/ -> /d/ Words',
    description: 'Luyện đọc cặp từ chuyển đổi nhanh: Giữ lưỡi kẹp răng (/ð/) rồi lập tức bật lưỡi chân răng (/d/).',
    tip: 'Tập cảm nhận sự khác biệt thể chất: /ð/ là lưỡi ở răng, /d/ là đầu lưỡi đập vào lợi trên.',
    items: [
      { pair: 'they - day', ipa: '/ðeɪ/ - /deɪ/', instruction: 'Lưỡi kẹp răng (/ðeɪ/) -> Lưỡi chạm vòm họng (/deɪ/)' },
      { pair: 'there - dare', ipa: '/ðeər/ - /deər/', instruction: 'Kẹp răng thổi hơi -> Bật chân răng' },
      { pair: 'then - den', ipa: '/ðɛn/ - /dɛn/', instruction: 'Chuyển đổi tức thời, không để âm dẹt' },
      { pair: 'breathe - breed', ipa: '/briːð/ - /briːd/', instruction: 'Rung ma sát cuối từ vs Chặn âm /d/' }
    ]
  },
  {
    id: 'th-to-d-sentences',
    type: 'cross-sentences',
    title: 'VOICED TH TO D SENTENCES',
    category: 'Luyện Bẫy Âm /ð/ vs /d/',
    badge: '/ð/ -> /d/ Sentences',
    description: 'Câu chứa đan xen cả âm /ð/ và âm /d/ để não bộ không bị đồng hóa âm.',
    tip: 'Đọc chậm rãi từng từ, chú ý đổi vị trí đặt lưỡi tức thì khi chuyển từ /ð/ sang /d/.',
    items: [
      { sentence: 'They dare to go there today with their dogs.', targetsTh: ['They', 'there', 'their'], targetsD: ['dare', 'today', 'dogs'] },
      { sentence: 'Dan breathed with relief on the day he did his job.', targetsTh: ['breathed'], targetsD: ['Dan', 'day', 'did'] },
      { sentence: 'Do they know that the door is made of leather?', targetsTh: ['they', 'that', 'the', 'leather'], targetsD: ['Do', 'door'] }
    ]
  }
];

// ==========================================
// 2. ENRICHED SOUNDS MASTER LIST
// ==========================================
const ENRICHED_SOUNDS_DATA = [
  {
    id: 'eth',
    symbol: '/ð/',
    name: 'Âm răng hữu thanh (Voiced TH)',
    word: 'this',
    audioFile: '/audio/think.mp3',
    ipa: '/ðɪs/',
    dictationPrompt: 'Nghe và phân biệt âm hữu thanh /ð/ vs âm /d/:',
    dictationSentence: '[______] is the exact English pronunciation practice I need.',
    targetAnswer: 'this',
    dictationOptions: ['this', 'dis', 'tis'],
    errorExplanation: 'Người Việt hay phát âm /ð/ thành "đ" ("dis") hoặc "th" tiếng Việt ("tis"). Hãy kẹp nhẹ đầu lưỡi giữa hai hàm răng và làm rung dây thanh quản.',
    readAloudSentence: 'They said that their mother and father gather together when the weather is warm.',
    readAloudTargets: ['They', 'that', 'their', 'mother', 'father', 'gather', 'together', 'weather'],
    nativeDuration: '0.62s',
    userDurationSim: '0.39s',
    diffTip: 'Bạn ngắt luồng rung quá sớm hoặc thu lưỡi vào trong khiến âm /ð/ nghe giống âm /d/. Cần duy trì luồng rung liên tục khi phát âm.'
  },
  {
    id: 'theta',
    symbol: '/θ/',
    name: 'Âm răng vô thanh',
    word: 'think',
    audioFile: '/audio/think.mp3',
    ipa: '/θɪŋk/',
    dictationPrompt: 'Nghe và điền từ chính xác chứa âm /θ/:',
    dictationSentence: 'I [______] that honesty is the best policy.',
    targetAnswer: 'think',
    dictationOptions: ['think', 'tink', 'sink'],
    errorExplanation: 'Người Việt hay nhầm /θ/ thành /t/ ("tink") hoặc /s/ ("sink"). Hãy kẹp nhẹ đầu lưỡi giữa hai hàm răng và thổi hơi gió.',
    readAloudSentence: 'The thirty-three thieves thought that they thrilled the throne throughout Thursday.',
    readAloudTargets: ['thirty-three', 'thieves', 'thought', 'thrilled', 'throne', 'throughout', 'Thursday'],
    nativeDuration: '0.65s',
    userDurationSim: '0.42s',
    diffTip: 'Bạn kết thúc âm sớm hơn người bản ngữ 35%. Hãy giữ luồng gió /θ/ liên tục trước khi chuyển sang nguyên âm /ɪ/.'
  },
  {
    id: 'long-i',
    symbol: '/iː/',
    name: 'Nguyên âm dài trước căng',
    word: 'sheep',
    audioFile: '/audio/sheep.mp3',
    ipa: '/ʃiːp/',
    dictationPrompt: 'Nghe và phân biệt nguyên âm dài /iː/ vs ngắn /ɪ/:',
    dictationSentence: 'The farmer has twenty white [______] on the hill.',
    targetAnswer: 'sheep',
    dictationOptions: ['sheep', 'ship'],
    errorExplanation: 'Người Việt hay đọc âm này quá ngắn giống từ "ship" (/ɪ/). Hãy kéo khóe miệng cười và giữ âm ngân dài trên 250ms.',
    readAloudSentence: 'He sees three sweet sheep sleeping peacefully near the green trees.',
    readAloudTargets: ['sees', 'three', 'sweet', 'sheep', 'sleeping', 'peacefully', 'green', 'trees'],
    nativeDuration: '0.72s',
    userDurationSim: '0.38s',
    diffTip: 'Nguyên âm của bạn bị ngắt quá nhanh. Âm /iː/ cần kéo dài gấp 1.8 lần âm /ɪ/ trong tiếng Anh.'
  },
  {
    id: 'esh',
    symbol: '/ʃ/',
    name: 'Âm xì chu môi',
    word: 'she',
    audioFile: '/audio/she.mp3',
    ipa: '/ʃiː/',
    dictationPrompt: 'Nghe và điền từ chính xác chứa âm chu môi /ʃ/:',
    dictationSentence: '[______] promised to show me the new software design.',
    targetAnswer: 'she',
    dictationOptions: ['she', 'see'],
    errorExplanation: 'Người Việt hay bẹt môi đọc thành âm "s" hoặc "x" tiếng Việt (nói "she" nghe thành "see"). Hãy chu tròn môi như ra hiệu "suỵt".',
    readAloudSentence: 'She sells fresh sea shells by the sunny seashore with special shiny shoes.',
    readAloudTargets: ['She', 'fresh', 'shells', 'seashore', 'special', 'shiny', 'shoes'],
    nativeDuration: '0.62s',
    userDurationSim: '0.50s',
    diffTip: 'Luồng gió của bạn còn yếu. Hãy chu môi nhô ra phía trước để tạo ống cộng hưởng ma sát mạnh hơn.'
  },
  {
    id: 'ash',
    symbol: '/æ/',
    name: 'Nguyên âm bẹt mở rộng',
    word: 'cat',
    audioFile: '/audio/cat.mp3',
    ipa: '/kæt/',
    dictationPrompt: 'Nghe và điền từ chính xác chứa âm /æ/:',
    dictationSentence: 'The black [______] jumped over the fence quickly.',
    targetAnswer: 'cat',
    dictationOptions: ['cat', 'cut', 'cart'],
    errorExplanation: 'Người Việt hay đọc lấp lửng thành âm "A" hoặc "E" ("két" hoặc "cát"). Hãy mở rộng quai hàm hạ cằm tối đa.',
    readAloudSentence: 'The fat cat sat on the black mat and grabbed a snack from the bag.',
    readAloudTargets: ['fat', 'cat', 'sat', 'black', 'mat', 'snack', 'bag'],
    nativeDuration: '0.58s',
    userDurationSim: '0.39s',
    diffTip: 'Độ mở hàm của bạn chưa đủ rộng. Hãy hạ quai hàm xuống sâu hơn để nguyên âm vang và bẹt đúng chuẩn.'
  },
  {
    id: 'six',
    symbol: '/ks/',
    name: 'Cụm phụ âm đuôi phức hợp',
    word: 'six',
    audioFile: '/audio/six.mp3',
    ipa: '/sɪks/',
    dictationPrompt: 'Nghe và bắt âm đuôi /ks/:',
    dictationSentence: 'I worked for [______] hours without taking any break.',
    targetAnswer: 'six',
    dictationOptions: ['six', 'sick', 'sit'],
    errorExplanation: '90% người Việt nuốt âm đuôi và phát âm thành "sì". Bạn phải bật nhẹ âm /k/ rồi xì dứt khoát âm /s/ ở cuối từ.',
    readAloudSentence: 'Six strict cooks baked six boxes of mixed snacks on the sixth desk.',
    readAloudTargets: ['Six', 'strict', 'cooks', 'six', 'boxes', 'mixed', 'snacks', 'sixth', 'desk'],
    nativeDuration: '0.68s',
    userDurationSim: '0.40s',
    diffTip: 'Sóng âm của bạn thiếu hoàn toàn phần đuôi cao tần (high-frequency friction)! Hãy xì rõ âm /s/ sau khi chặn âm /k/.'
  }
];

export default function SoundPracticeEnrichedStudio() {
  const [selectedSoundIndex, setSelectedSoundIndex] = useState(0);
  const [activePracticeMode, setActivePracticeMode] = useState('syllabus'); // 'syllabus' | 'dictation' | 'read-aloud' | 'waveform-compare'
  
  const currentSound = ENRICHED_SOUNDS_DATA[selectedSoundIndex];

  // Audio Playback
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const audioRef = useRef(null);

  // Syllabus Tree States
  const [selectedSyllabusIndex, setSelectedSyllabusIndex] = useState(0);
  const [syllabusFilter, setSyllabusFilter] = useState('all'); // 'all' | 'words' | 'phrases' | 'sentences' | 'traps'
  const [completedLessons, setCompletedLessons] = useState(new Set(['master-guide']));
  const [itemRecordingId, setItemRecordingId] = useState(null);
  const [itemScores, setItemScores] = useState({});

  // Mode 1: Dictation States
  const [dictationInput, setDictationInput] = useState('');
  const [dictationChecked, setDictationChecked] = useState(false);
  const [dictationIsCorrect, setDictationIsCorrect] = useState(false);
  const [showDictationHint, setShowDictationHint] = useState(false);

  // Mode 2: Read Aloud States
  const [isReadingAloud, setIsReadingAloud] = useState(false);
  const [readAloudCompleted, setReadAloudCompleted] = useState(false);
  const [readAloudScore, setReadAloudScore] = useState(null);

  // Mode 3: Waveform Comparison States
  const [isRecordingUser, setIsRecordingUser] = useState(false);
  const [hasRecordedUser, setHasRecordedUser] = useState(true);
  const [isMirrorPlaying, setIsMirrorPlaying] = useState(false);
  const [mirrorTurn, setMirrorTurn] = useState(''); // 'native' | 'user'

  // Reset states when changing sound
  useEffect(() => {
    setDictationInput('');
    setDictationChecked(false);
    setDictationIsCorrect(false);
    setShowDictationHint(false);
    setIsReadingAloud(false);
    setReadAloudCompleted(false);
    setReadAloudScore(null);
    setIsMirrorPlaying(false);
    setMirrorTurn('');
  }, [selectedSoundIndex]);

  // High Quality Web Speech Synthesizer
  const speakText = (text, rate = 1.0) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'en-US';
      u.rate = rate;
      window.speechSynthesis.speak(u);
    }
  };

  // Play Native Audio File
  const playNativeSound = (speed = playbackSpeed) => {
    try {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setIsPlayingAudio(true);
      const audio = new Audio(currentSound.audioFile);
      audioRef.current = audio;
      audio.playbackRate = speed;
      audio.onended = () => setIsPlayingAudio(false);
      audio.onerror = () => {
        // Fallback to speech synthesis
        speakText(currentSound.word, speed);
        setTimeout(() => setIsPlayingAudio(false), 900);
      };
      audio.play().catch(() => {
        speakText(currentSound.word, speed);
        setIsPlayingAudio(false);
      });
    } catch {
      speakText(currentSound.word, speed);
      setIsPlayingAudio(false);
    }
  };

  // Check Dictation Answer
  const handleCheckDictation = (val = dictationInput) => {
    const clean = val.trim().toLowerCase();
    const isOk = clean === currentSound.targetAnswer.toLowerCase();
    setDictationIsCorrect(isOk);
    setDictationChecked(true);
  };

  // Trigger Read Aloud Simulation
  const handleToggleReadAloud = () => {
    if (isReadingAloud) {
      setIsReadingAloud(false);
      setReadAloudCompleted(true);
      setReadAloudScore(88);
    } else {
      setIsReadingAloud(true);
      setReadAloudCompleted(false);
      setTimeout(() => {
        setIsReadingAloud(false);
        setReadAloudCompleted(true);
        setReadAloudScore(88);
      }, 3500);
    }
  };

  // Toggle A/B Voice Mirroring
  const handleToggleABMirror = () => {
    if (isMirrorPlaying) {
      setIsMirrorPlaying(false);
      setMirrorTurn('');
      return;
    }

    setIsMirrorPlaying(true);
    setMirrorTurn('native');
    playNativeSound(1.0);

    setTimeout(() => {
      setMirrorTurn('user');
      playNativeSound(0.9);
      setTimeout(() => {
        setIsMirrorPlaying(false);
        setMirrorTurn('');
      }, 1000);
    }, 1200);
  };

  // Test Speaking Item in Syllabus
  const handleTestSyllabusItem = (id) => {
    setItemRecordingId(id);
    setTimeout(() => {
      setItemRecordingId(null);
      const score = Math.floor(Math.random() * 15) + 85;
      setItemScores(prev => ({ ...prev, [id]: score }));
      setCompletedLessons(prev => new Set([...prev, VOICED_TH_SYLLABUS[selectedSyllabusIndex].id]));
    }, 1800);
  };

  // Filtered syllabus items
  const activeSyllabusLesson = VOICED_TH_SYLLABUS[selectedSyllabusIndex] || VOICED_TH_SYLLABUS[0];
  const filteredSyllabus = VOICED_TH_SYLLABUS.filter(item => {
    if (syllabusFilter === 'words') return item.type === 'words';
    if (syllabusFilter === 'phrases') return item.type === 'phrases';
    if (syllabusFilter === 'sentences') return item.type === 'sentences';
    if (syllabusFilter === 'traps') return item.type === 'minimal-pairs' || item.type === 'exceptions' || item.type.startsWith('cross');
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* 1. TOP PHONEME RIBBON SELECTOR */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
            <h3 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              Luyện Tập Chuyên Sâu Từng Âm (Enriched Sound Practice)
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 font-bold border border-rose-200">
                Acoustic Precision UI Kit
              </span>
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Lộ trình ngữ âm trị liệu chuẩn quốc tế: Phân vị (Initial/Middle/End), Đối kháng âm bẫy L1 & Waveform Biofeedback
          </p>
        </div>

        {/* 4 Practice Modes Segmented Tabs */}
        <div className="flex items-center bg-slate-100 border border-slate-200 rounded-xl p-1 text-xs font-semibold overflow-x-auto">
          <button
            onClick={() => setActivePracticeMode('syllabus')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activePracticeMode === 'syllabus'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ListChecks className="w-3.5 h-3.5" />
            <span>14 Cấp Độ Phân Vị & Âm Bẫy</span>
            <span className="px-1.5 py-0.2 rounded-full bg-rose-500 text-white text-[9px] font-mono font-bold">
              14 bài
            </span>
          </button>

          <button
            onClick={() => setActivePracticeMode('dictation')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activePracticeMode === 'dictation'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Headphones className="w-3.5 h-3.5" />
            <span>Nghe Chính Tả (PRON-202)</span>
          </button>

          <button
            onClick={() => setActivePracticeMode('read-aloud')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activePracticeMode === 'read-aloud'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Đọc To Câu Ngữ Cảnh (PRON-203)</span>
          </button>

          <button
            onClick={() => setActivePracticeMode('waveform-compare')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activePracticeMode === 'waveform-compare'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>So Sóng Âm A/B (PRON-204)</span>
          </button>
        </div>
      </div>

      {/* Sound Pills Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
        {ENRICHED_SOUNDS_DATA.map((s, idx) => {
          const isSelected = selectedSoundIndex === idx;
          return (
            <button
              key={s.id}
              onClick={() => setSelectedSoundIndex(idx)}
              className={`p-2.5 rounded-2xl border text-center transition-all flex items-center justify-between px-3 ${
                isSelected
                  ? 'bg-rose-50 border-rose-400 text-rose-900 ring-2 ring-rose-400/20 shadow-sm'
                  : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700 shadow-2xs'
              }`}
            >
              <div className="text-left">
                <span className={`text-base font-black font-mono block ${
                  isSelected ? 'text-rose-600' : 'text-slate-900'
                }`}>
                  {s.symbol}
                </span>
                <span className="text-[10px] text-slate-500 block truncate max-w-[75px]">
                  "{s.word}"
                </span>
              </div>
              <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                isSelected ? 'bg-rose-600 text-white font-bold' : 'bg-slate-100 text-slate-600'
              }`}>
                {s.ipa}
              </span>
            </button>
          );
        })}
      </div>

      {/* ========================================================= */}
      {/* MODE 4: POSITIONAL SYLLABUS & TRAP DRILLS (USER SCREENSHOT) */}
      {/* ========================================================= */}
      {activePracticeMode === 'syllabus' && (
        <div className="rounded-3xl bg-white border border-slate-200 p-6 space-y-6 shadow-sm">
          {/* Header Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-rose-100 text-rose-700 text-[10px] font-extrabold uppercase tracking-wide font-mono">
                  Syllabus Tree • PRON-205..208
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs font-bold text-slate-700">Âm đang chọn: {currentSound.symbol} ({currentSound.name})</span>
              </div>
              <h4 className="text-lg font-black text-slate-900 mt-1">
                Lộ Trình Phân Vị & Chuyển Đổi Âm Bẫy (14 Modules Hoàn Chỉnh)
              </h4>
            </div>

            {/* Syllabus Filters */}
            <div className="flex items-center gap-1.5 bg-slate-50 p-1 rounded-xl border border-slate-200 text-xs">
              {[
                { id: 'all', label: 'Tất cả (14)' },
                { id: 'words', label: 'Từ đơn' },
                { id: 'phrases', label: 'Cụm từ' },
                { id: 'sentences', label: 'Câu' },
                { id: 'traps', label: 'Âm bẫy /ð/-/d/' }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setSyllabusFilter(f.id)}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                    syllabusFilter === f.id
                      ? 'bg-white text-slate-900 shadow-xs font-bold border border-slate-200'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Dual Column Workspace: Syllabus List (Left) + Interactive Drill Player (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* LEFT COLUMN: THE 14-MODULE CURRICULUM LIST (Exactly matching screenshot) */}
            <div className="lg:col-span-5 bg-slate-50/80 border border-slate-200 rounded-2xl p-2.5 max-h-[640px] overflow-y-auto space-y-1">
              <div className="px-2 py-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
                <span>Danh Sách 14 Bài Luyện Tập</span>
                <span className="text-rose-600 font-mono font-bold">
                  {completedLessons.size}/{VOICED_TH_SYLLABUS.length} hoàn thành
                </span>
              </div>

              {filteredSyllabus.map((lesson) => {
                const globalIndex = VOICED_TH_SYLLABUS.findIndex(l => l.id === lesson.id);
                const isSelected = selectedSyllabusIndex === globalIndex;
                const isDone = completedLessons.has(lesson.id);

                return (
                  <button
                    key={lesson.id}
                    onClick={() => setSelectedSyllabusIndex(globalIndex)}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3 group ${
                      isSelected
                        ? 'bg-white border-rose-300 shadow-sm ring-1 ring-rose-200'
                        : 'bg-white/60 border-slate-200/70 hover:bg-white hover:border-slate-300'
                    }`}
                  >
                    {/* Video/Play icon matching user screenshot */}
                    <div className={`mt-0.5 w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                      isSelected ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-500 group-hover:text-slate-700'
                    }`}>
                      <Play className="w-3 h-3 fill-current ml-0.5" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className={`text-xs font-bold transition-colors leading-tight ${
                          isSelected ? 'text-rose-900' : 'text-slate-800'
                        }`}>
                          {lesson.title}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] text-slate-400 font-medium">
                          {lesson.category}
                        </span>
                        <span className="text-[10px] text-slate-300">•</span>
                        <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 font-semibold">
                          {lesson.badge}
                        </span>
                      </div>
                    </div>

                    {/* Completion Status check */}
                    {isDone && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-1" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* RIGHT COLUMN: ACTIVE SYLLABUS DRILL CARD */}
            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
              
              {/* Drill Card Header */}
              <div className="border-b border-slate-100 pb-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-xs font-bold">
                    {activeSyllabusLesson.category}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-400">
                    Bài {selectedSyllabusIndex + 1} / {VOICED_TH_SYLLABUS.length}
                  </span>
                </div>
                <h3 className="text-lg font-black text-slate-900 mt-2">
                  {activeSyllabusLesson.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {activeSyllabusLesson.description}
                </p>

                {/* Pedagogical Tip */}
                {activeSyllabusLesson.tip && (
                  <div className="mt-3 p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Mẹo phát âm:</strong> {activeSyllabusLesson.tip}</span>
                  </div>
                )}
              </div>

              {/* 1. TYPE: GUIDE / FOUNDATION */}
              {activeSyllabusLesson.type === 'guide' && (
                <div className="space-y-4">
                  <div className="p-5 rounded-2xl bg-rose-50/60 border border-rose-100 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-rose-900">Khẩu hình miệng chuẩn âm /ð/:</span>
                      <button
                        onClick={() => speakText("this, that, they, mother, breathe")}
                        className="px-3 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Nghe chuỗi âm mẫu</span>
                      </button>
                    </div>
                    <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-4">
                      <li><strong>Bước 1:</strong> Thả lỏng môi, kẹp nhẹ đầu lưỡi ở giữa 2 hàm răng cửa trên và dưới.</li>
                      <li><strong>Bước 2:</strong> Đẩy luồng hơi ra đồng thời kích hoạt dây thanh quản rung liên tục.</li>
                      <li><strong>Bước 3:</strong> Không rụt lưỡi vào chân răng (nếu rụt lưỡi sẽ bị thành âm "đ").</li>
                    </ul>
                  </div>

                  <button
                    onClick={() => handleTestSyllabusItem('guide-test')}
                    disabled={itemRecordingId === 'guide-test'}
                    className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Mic className={`w-4 h-4 ${itemRecordingId === 'guide-test' ? 'text-rose-400 animate-pulse' : ''}`} />
                    <span>{itemRecordingId === 'guide-test' ? 'Đang phân tích khẩu hình...' : 'Thu âm thử âm /ð/ để kiểm tra độ rung ➔'}</span>
                  </button>
                  {itemScores['guide-test'] && (
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-bold flex items-center justify-between">
                      <span>✓ Khẩu hình đạt chuẩn: Độ rung dây thanh quản 92%</span>
                      <span className="font-mono text-emerald-700">Điểm: {itemScores['guide-test']}/100</span>
                    </div>
                  )}
                </div>
              )}

              {/* 2. TYPE: MINIMAL PAIRS (/ð/ vs /d/) */}
              {activeSyllabusLesson.type === 'minimal-pairs' && (
                <div className="space-y-3">
                  <div className="text-xs font-bold text-slate-700 flex items-center justify-between">
                    <span>So sánh từng cặp từ đối kháng:</span>
                    <span className="text-[11px] text-slate-400">Bấm loa để nghe so sánh</span>
                  </div>

                  <div className="space-y-2">
                    {activeSyllabusLesson.pairs.map((p, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-3">
                          {/* Word A: /ð/ */}
                          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-rose-200">
                            <span className="text-xs font-black text-rose-700 font-mono">{p.a}</span>
                            <span className="text-[10px] text-slate-400 font-mono">{p.ipaA}</span>
                            <button
                              onClick={() => speakText(p.a)}
                              className="p-1 rounded text-rose-600 hover:bg-rose-50"
                              title={`Nghe ${p.a}`}
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <span className="text-xs font-extrabold text-slate-400 font-mono">vs</span>

                          {/* Word B: /d/ */}
                          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
                            <span className="text-xs font-black text-slate-700 font-mono">{p.b}</span>
                            <span className="text-[10px] text-slate-400 font-mono">{p.ipaB}</span>
                            <button
                              onClick={() => speakText(p.b)}
                              className="p-1 rounded text-slate-600 hover:bg-slate-100"
                              title={`Nghe ${p.b}`}
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-3">
                          <span className="text-[11px] text-slate-500 italic">{p.note}</span>
                          <button
                            onClick={() => {
                              speakText(p.a, 0.9);
                              setTimeout(() => speakText(p.b, 0.9), 1100);
                            }}
                            className="px-2.5 py-1 rounded-md bg-slate-900 text-white font-mono text-[10px] font-bold hover:bg-slate-800 whitespace-nowrap"
                          >
                            Nghe Cặp A/B ➔
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. TYPE: WORDS (Initial, Middle, End) */}
              {activeSyllabusLesson.type === 'words' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-700">
                      Danh sách từ vựng ({activeSyllabusLesson.position}):
                    </span>
                    <button
                      onClick={() => {
                        const words = activeSyllabusLesson.items.map(i => i.word).join(', ');
                        speakText(words, 0.85);
                      }}
                      className="text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Nghe toàn bộ từ</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {activeSyllabusLesson.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl border border-slate-200 bg-white hover:border-rose-300 hover:shadow-xs transition-all text-center space-y-1.5 group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-black text-slate-900 font-mono group-hover:text-rose-600 transition-colors">
                            {item.word}
                          </span>
                          <button
                            onClick={() => speakText(item.word)}
                            className="p-1 rounded-full text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          >
                            <Volume2 className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="text-[10px] font-mono text-rose-500 font-semibold bg-rose-50/60 rounded py-0.5">
                          {item.ipa}
                        </div>
                        <div className="text-[10px] text-slate-400 truncate">
                          {item.meaning}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Speech Test Box for words */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="text-xs">
                      <span className="font-bold text-slate-900 block">Kiểm tra phát âm nhóm từ này:</span>
                      <span className="text-slate-500">Đọc to một từ bất kỳ trong danh sách trên</span>
                    </div>

                    <button
                      onClick={() => handleTestSyllabusItem(`words-${activeSyllabusLesson.id}`)}
                      disabled={itemRecordingId === `words-${activeSyllabusLesson.id}`}
                      className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs whitespace-nowrap"
                    >
                      <Mic className={`w-3.5 h-3.5 ${itemRecordingId === `words-${activeSyllabusLesson.id}` ? 'animate-pulse' : ''}`} />
                      <span>{itemRecordingId === `words-${activeSyllabusLesson.id}` ? 'Đang chấm điểm...' : 'Bấm Để Thu Âm Thử'}</span>
                    </button>
                  </div>
                  {itemScores[`words-${activeSyllabusLesson.id}`] && (
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-bold flex items-center justify-between">
                      <span>✓ Đạt chuẩn vị trí âm {activeSyllabusLesson.position}: 94%</span>
                      <span className="font-mono text-emerald-700">Điểm: {itemScores[`words-${activeSyllabusLesson.id}`]}/100</span>
                    </div>
                  )}
                </div>
              )}

              {/* 4. TYPE: PHRASES (Initial, Middle, End) */}
              {activeSyllabusLesson.type === 'phrases' && (
                <div className="space-y-3">
                  <div className="text-xs font-bold text-slate-700 flex items-center justify-between">
                    <span>Cụm từ luyện phản xạ nối âm ({activeSyllabusLesson.position}):</span>
                  </div>

                  <div className="space-y-2">
                    {activeSyllabusLesson.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-extrabold text-slate-900 tracking-wide">
                              {item.phrase}
                            </span>
                            <span className="text-[10px] font-mono text-rose-600 bg-rose-50 px-2 py-0.5 rounded font-bold">
                              {item.ipa}
                            </span>
                          </div>
                          <span className="text-[11px] text-slate-400 mt-0.5 block">
                            Âm mục tiêu trong cụm: <strong>{item.target}</strong>
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => speakText(item.phrase, 0.9)}
                            className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5"
                          >
                            <Volume2 className="w-3.5 h-3.5 text-slate-500" />
                            <span>Nghe mẫu</span>
                          </button>
                          <button
                            onClick={() => handleTestSyllabusItem(`phrase-${idx}`)}
                            className="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-xs flex items-center gap-1.5"
                          >
                            <Mic className="w-3.5 h-3.5 text-rose-600" />
                            <span>{itemScores[`phrase-${idx}`] ? `${itemScores[`phrase-${idx}`]}%` : 'Đọc'}</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 5. TYPE: SENTENCES (Initial, Middle, End) */}
              {activeSyllabusLesson.type === 'sentences' && (
                <div className="space-y-3">
                  <div className="text-xs font-bold text-slate-700">
                    Câu ngữ cảnh hoàn chỉnh ({activeSyllabusLesson.position}):
                  </div>

                  <div className="space-y-3">
                    {activeSyllabusLesson.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-3"
                      >
                        <p className="text-sm sm:text-base font-bold text-slate-900 leading-relaxed">
                          {item.sentence.split(' ').map((word, wIdx) => {
                            const clean = word.replace(/[^a-zA-Z]/g, '');
                            const isTarget = item.targets.some(t => t.toLowerCase() === clean.toLowerCase());
                            return (
                              <span
                                key={wIdx}
                                className={`inline-block mr-1.5 ${
                                  isTarget
                                    ? 'text-rose-600 font-black border-b-2 border-rose-400 bg-rose-50 px-1 rounded'
                                    : 'text-slate-800'
                                }`}
                              >
                                {word}
                              </span>
                            );
                          })}
                        </p>

                        <div className="flex items-center justify-between pt-1">
                          <span className="text-[11px] text-slate-500">
                            Chứa {item.targets.length} từ mang âm mục tiêu
                          </span>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => speakText(item.sentence, 0.9)}
                              className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center gap-1.5 shadow-2xs"
                            >
                              <Volume2 className="w-3.5 h-3.5 text-slate-500" />
                              <span>Nghe cả câu</span>
                            </button>
                            <button
                              onClick={() => handleTestSyllabusItem(`sent-${idx}`)}
                              className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs"
                            >
                              <Mic className="w-3.5 h-3.5" />
                              <span>{itemScores[`sent-${idx}`] ? `Đạt ${itemScores[`sent-${idx}`]}%` : 'Đọc chấm điểm'}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 6. TYPE: EXCEPTIONS & GRAMMATICAL RULES */}
              {activeSyllabusLesson.type === 'exceptions' && (
                <div className="space-y-3">
                  <div className="text-xs font-bold text-slate-700">
                    Bẫy từ ngoại lệ & Cặp quy tắc danh từ vs động từ:
                  </div>

                  <div className="space-y-2.5">
                    {activeSyllabusLesson.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl border border-amber-200/80 bg-amber-50/40 space-y-1.5"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-black text-slate-900 font-mono">
                              {item.word}
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold border border-amber-200">
                              {item.ipa}
                            </span>
                          </div>

                          <button
                            onClick={() => speakText(item.word.split(' vs ')[0])}
                            className="px-2.5 py-1 rounded bg-white border border-amber-300 text-amber-900 font-bold text-xs flex items-center gap-1 hover:bg-amber-100"
                          >
                            <Volume2 className="w-3 h-3 text-amber-700" />
                            <span>Nghe</span>
                          </button>
                        </div>
                        <p className="text-xs text-amber-900 font-medium">
                          ⚠ {item.note}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 7. TYPE: CROSS-WORDS & CROSS-SENTENCES (TH TO D) */}
              {(activeSyllabusLesson.type === 'cross-words' || activeSyllabusLesson.type === 'cross-sentences') && (
                <div className="space-y-4">
                  <div className="p-3.5 rounded-xl bg-rose-50/70 border border-rose-200 text-xs text-rose-900 flex items-start gap-2">
                    <Split className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Mục tiêu bài tập:</strong> Não bộ người Việt hay tự động thay thế /ð/ bằng /d/. Luyện chuyển đổi đan xen giúp ngắt đứt phản xạ đồng hóa âm này.
                    </span>
                  </div>

                  {activeSyllabusLesson.type === 'cross-words' && (
                    <div className="space-y-2">
                      {activeSyllabusLesson.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded-xl border border-slate-200 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                        >
                          <div>
                            <span className="text-sm font-black text-slate-900 font-mono block">
                              {item.pair}
                            </span>
                            <span className="text-xs text-slate-500 font-mono">
                              {item.ipa}
                            </span>
                            <span className="text-[11px] text-slate-400 block mt-0.5">
                              {item.instruction}
                            </span>
                          </div>

                          <button
                            onClick={() => {
                              const [w1, w2] = item.pair.split(' - ');
                              speakText(w1, 0.9);
                              setTimeout(() => speakText(w2, 0.9), 1100);
                            }}
                            className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 self-start sm:self-auto"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>Nghe chuyển đổi ➔</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeSyllabusLesson.type === 'cross-sentences' && (
                    <div className="space-y-3">
                      {activeSyllabusLesson.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-3"
                        >
                          <p className="text-sm sm:text-base font-bold text-slate-900 leading-relaxed">
                            {item.sentence}
                          </p>
                          <div className="flex flex-wrap items-center gap-2 text-xs">
                            <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-mono font-bold">
                              Kẹp răng /ð/: {item.targetsTh.join(', ')}
                            </span>
                            <span className="px-2 py-0.5 rounded bg-cyan-100 text-cyan-800 font-mono font-bold">
                              Bật chân răng /d/: {item.targetsD.join(', ')}
                            </span>
                          </div>

                          <div className="flex items-center justify-end gap-2 pt-1 border-t border-slate-200">
                            <button
                              onClick={() => speakText(item.sentence, 0.85)}
                              className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-xs flex items-center gap-1.5"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                              <span>Nghe mẫu</span>
                            </button>
                            <button
                              onClick={() => handleTestSyllabusItem(`cross-sent-${idx}`)}
                              className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-1.5"
                            >
                              <Mic className="w-3.5 h-3.5" />
                              <span>{itemScores[`cross-sent-${idx}`] ? `Đạt ${itemScores[`cross-sent-${idx}`]}%` : 'Thử thách phát âm'}</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODE 1: PHONEMIC DICTATION (Chính Tả Nghe - Gõ) — PRON-202 */}
      {/* ========================================================= */}
      {activePracticeMode === 'dictation' && (
        <div className="rounded-3xl bg-white border border-slate-200 p-6 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 font-mono">
                User Story PRON-202 • Auditory Discrimination Dictation
              </span>
              <h4 className="text-base font-extrabold text-slate-900 mt-0.5">
                {currentSound.dictationPrompt}
              </h4>
            </div>

            {/* Audio Speed Controls */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium">Tốc độ đọc:</span>
              <button
                onClick={() => { setPlaybackSpeed(1.0); playNativeSound(1.0); }}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition-colors ${
                  playbackSpeed === 1.0 ? 'bg-cyan-700 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                1.0x Chuẩn
              </button>
              <button
                onClick={() => { setPlaybackSpeed(0.75); playNativeSound(0.75); }}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition-colors ${
                  playbackSpeed === 0.75 ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                0.75x Chậm
              </button>
            </div>
          </div>

          {/* Central Audio Trigger Box */}
          <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center text-center space-y-4">
            <button
              onClick={() => playNativeSound()}
              className="w-16 h-16 rounded-full bg-gradient-to-tr from-rose-600 to-cyan-600 hover:from-rose-500 hover:to-cyan-500 text-white shadow-md flex items-center justify-center transition-all group scale-100 hover:scale-105"
            >
              <Volume2 className={`w-7 h-7 ${isPlayingAudio ? 'animate-bounce' : 'group-hover:scale-110'}`} />
            </button>
            <div>
              <span className="text-xs text-slate-600 block font-medium">
                Bấm nút trên để nghe người bản ngữ phát âm từ mẫu ({currentSound.ipa})
              </span>
              <span className="text-[11px] text-cyan-700 font-mono mt-1 block font-bold">
                {isPlayingAudio ? '🔊 Đang phát âm thanh phòng thu...' : 'Oxford Native Voice 44.1kHz'}
              </span>
            </div>

            {/* Sentence with Gap */}
            <div className="text-lg sm:text-xl font-bold text-slate-900 tracking-wide pt-2">
              {currentSound.dictationSentence.split('[______]')[0]}
              <span className="inline-block border-b-2 border-rose-500 px-3 py-0.5 text-rose-700 font-mono bg-rose-50 rounded">
                {dictationInput || '______'}
              </span>
              {currentSound.dictationSentence.split('[______]')[1]}
            </div>
          </div>

          {/* Input & Quick Choice Buttons */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <input
                type="text"
                value={dictationInput}
                onChange={(e) => {
                  setDictationInput(e.target.value);
                  setDictationChecked(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleCheckDictation();
                }}
                placeholder="Gõ từ bạn nghe được vào đây..."
                className="flex-1 w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
              />
              <button
                onClick={() => handleCheckDictation()}
                disabled={!dictationInput.trim()}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white font-bold text-xs shadow-sm transition-all whitespace-nowrap"
              >
                Kiểm Tra Đáp Án ➔
              </button>
            </div>

            {/* Rapid-Choice Chips */}
            <div className="flex items-center gap-2 flex-wrap text-xs text-slate-500">
              <span className="font-medium">Hoặc bấm nhanh đáp án nghi vấn:</span>
              {currentSound.dictationOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    setDictationInput(opt);
                    handleCheckDictation(opt);
                  }}
                  className={`px-3 py-1 rounded-lg border font-mono font-bold transition-all ${
                    dictationInput === opt
                      ? 'bg-cyan-700 text-white border-cyan-700'
                      : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400 shadow-2xs'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Feedback Card upon checking */}
          {dictationChecked && (
            <div className={`p-4 rounded-2xl border text-xs space-y-2 animate-in fade-in duration-200 ${
              dictationIsCorrect
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                : 'bg-rose-50 border-rose-300 text-rose-900'
            }`}>
              <div className="flex items-center justify-between font-extrabold text-sm">
                <div className="flex items-center gap-2">
                  {dictationIsCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-rose-600" />
                  )}
                  <span>
                    {dictationIsCorrect ? 'Chính Xác Tuyệt Đối! Tai bạn nhận diện âm rất tốt.' : 'Chưa Chính Xác!'}
                  </span>
                </div>
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-white font-bold">
                  Đáp án chuẩn: {currentSound.targetAnswer} ({currentSound.ipa})
                </span>
              </div>

              {/* L1 Interference Rationale */}
              <div className="pt-1 text-xs leading-relaxed text-slate-700">
                <strong>Phân tích lỗi phát âm người Việt:</strong> {currentSound.errorExplanation}
              </div>

              {!dictationIsCorrect && (
                <div className="pt-2 flex items-center gap-3">
                  <button
                    onClick={() => {
                      playNativeSound(0.75);
                      setShowDictationHint(true);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-colors flex items-center gap-1.5 shadow-2xs"
                  >
                    <Repeat className="w-3.5 h-3.5" />
                    <span>Nghe lại 0.75x & Xem mẹo khẩu hình</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* MODE 2: CONTEXTUAL READ ALOUD DRILLS — PRON-203 */}
      {/* ========================================================= */}
      {activePracticeMode === 'read-aloud' && (
        <div className="rounded-3xl bg-white border border-slate-200 p-6 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 font-mono">
                User Story PRON-203 • Contextual Read-Aloud & Fluency Drills
              </span>
              <h4 className="text-base font-extrabold text-slate-900 mt-0.5">
                Đọc To Câu Ngữ Cảnh Chứa Dày Đặc Âm {currentSound.symbol}
              </h4>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">Mục tiêu âm vị:</span>
              <span className="px-2.5 py-1 rounded-lg bg-rose-100 text-rose-700 text-xs font-mono font-bold border border-rose-200">
                {currentSound.readAloudTargets.length} vị trí {currentSound.symbol}
              </span>
            </div>
          </div>

          {/* Reading Display Box */}
          <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-4">
            <span className="text-xs text-slate-500 block uppercase font-mono tracking-wider font-semibold">
              Văn Bản Đọc To (Tongue Twister & Contextual Drill)
            </span>

            <div className="text-lg sm:text-2xl font-black text-slate-900 leading-relaxed max-w-2xl mx-auto">
              {currentSound.readAloudSentence.split(' ').map((word, idx) => {
                const clean = word.replace(/[^a-zA-Z]/g, '');
                const isTarget = currentSound.readAloudTargets.some(t => t.toLowerCase() === clean.toLowerCase());

                return (
                  <span
                    key={idx}
                    className={`inline-block mr-2 transition-all ${
                      isTarget
                        ? isReadingAloud
                          ? 'text-rose-600 underline decoration-rose-400 decoration-2 font-black scale-105'
                          : 'text-rose-700 bg-rose-100 px-1.5 py-0.5 rounded font-black border border-rose-200'
                        : 'text-slate-800'
                    }`}
                  >
                    {word}
                  </span>
                );
              })}
            </div>

            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Hãy chú ý duy trì khẩu hình âm <strong>{currentSound.symbol}</strong> chuẩn xác trong suốt quá trình đọc cả câu dài.
            </p>
          </div>

          {/* Live Mic Action & Forced Alignment Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-200">
            <div className="flex items-center gap-3">
              <button
                onClick={handleToggleReadAloud}
                className={`px-6 py-3 rounded-2xl font-bold text-xs flex items-center gap-2 shadow-sm transition-all ${
                  isReadingAloud
                    ? 'bg-rose-600 text-white animate-pulse shadow-rose-200'
                    : 'bg-slate-900 hover:bg-slate-800 text-white'
                }`}
              >
                <Mic className={`w-4 h-4 ${isReadingAloud ? 'animate-bounce' : ''}`} />
                <span>{isReadingAloud ? 'Đang Lắng Nghe & Căn Chỉnh GOP...' : 'Bấm Để Bắt Đầu Đọc To'}</span>
              </button>

              <button
                onClick={() => speakText(currentSound.readAloudSentence, 0.9)}
                className="px-4 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-2 transition-colors"
              >
                <Volume2 className="w-4 h-4 text-slate-500" />
                <span>Nghe Giọng Đọc Mẫu</span>
              </button>
            </div>

            {/* Target Hit Progress */}
            <div className="flex items-center gap-4 text-xs">
              <div className="text-right">
                <span className="text-[11px] text-slate-400 block font-medium">Target Sound Hits</span>
                <span className="font-bold text-slate-900 font-mono text-sm">
                  {readAloudCompleted ? `${currentSound.readAloudTargets.length}/${currentSound.readAloudTargets.length} đạt` : `0/${currentSound.readAloudTargets.length} đạt`}
                </span>
              </div>
              <div className="w-16 h-2 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full bg-emerald-500 transition-all duration-500"
                  style={{ width: readAloudCompleted ? '100%' : isReadingAloud ? '50%' : '0%' }}
                />
              </div>
            </div>
          </div>

          {/* Result Card */}
          {readAloudCompleted && (
            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs space-y-3 animate-in fade-in duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span className="font-extrabold text-sm text-emerald-900">
                    Phân Tích Đoạn Văn Hoàn Tất • Điểm Phát Âm: {readAloudScore}%
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white font-mono font-bold text-[11px]">
                  CEFR B2+ Fluency
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="p-3 rounded-xl bg-white border border-emerald-200">
                  <span className="text-[10px] text-slate-500 uppercase font-mono font-semibold block">Độ Chuẩn Âm Đích</span>
                  <span className="text-base font-extrabold text-emerald-700 font-mono">92% GOP</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-emerald-200">
                  <span className="text-[10px] text-slate-500 uppercase font-mono font-semibold block">Tốc Độ Đọc (WPM)</span>
                  <span className="text-base font-extrabold text-cyan-700 font-mono">118 WPM</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-emerald-200">
                  <span className="text-[10px] text-slate-500 uppercase font-mono font-semibold block">Liên Kết Từ (Chunking)</span>
                  <span className="text-base font-extrabold text-indigo-700 font-mono">Tự nhiên</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* MODE 3: DUAL-TRACK WAVEFORM COMPARISON — PRON-204 */}
      {/* ========================================================= */}
      {activePracticeMode === 'waveform-compare' && (
        <div className="rounded-3xl bg-white border border-slate-200 p-6 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-700 font-mono">
                User Story PRON-204 • Dual-Track Audio Recording & Native Waveform Comparison
              </span>
              <h4 className="text-base font-extrabold text-slate-900 mt-0.5">
                Đối Chiếu Trực Quan Sóng Âm (Native Track vs User Attempt)
              </h4>
            </div>

            {/* A/B Mirror Action */}
            <button
              onClick={handleToggleABMirror}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-sm ${
                isMirrorPlaying
                  ? 'bg-amber-600 text-white animate-pulse'
                  : 'bg-cyan-700 hover:bg-cyan-800 text-white'
              }`}
            >
              <Repeat className="w-3.5 h-3.5" />
              <span>{isMirrorPlaying ? 'Đang phát A/B luân phiên...' : 'Nghe Xen Kẽ A/B (Native vs You)'}</span>
            </button>
          </div>

          {/* Dual Waveform Stack Container */}
          <div className="space-y-4">
            
            {/* TRACK 1: NATIVE SPEAKER (OXFORD US) */}
            <div className={`p-4 rounded-2xl border transition-all ${
              mirrorTurn === 'native'
                ? 'bg-cyan-50 border-cyan-400 ring-2 ring-cyan-200'
                : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center justify-between mb-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-600" />
                  <span className="font-bold text-slate-900">Track 1: Giọng Người Bản Ngữ Oxford (Mẫu Chuẩn)</span>
                  <span className="font-mono text-[10px] text-cyan-800 bg-cyan-100 px-2 py-0.5 rounded border border-cyan-200 font-bold">
                    "{currentSound.word}" {currentSound.ipa}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-slate-500">Thời lượng: {currentSound.nativeDuration}</span>
                  <button
                    onClick={() => playNativeSound()}
                    className="p-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-cyan-700 shadow-2xs"
                    title="Nghe riêng track bản ngữ"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Native Waveform Graphic */}
              <div className="h-16 w-full flex items-center justify-between gap-1 px-2 bg-white rounded-xl border border-slate-200 overflow-hidden">
                {[8, 14, 22, 38, 55, 68, 75, 62, 48, 35, 52, 60, 45, 30, 20, 15, 10].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-gradient-to-t from-cyan-600 to-cyan-400 rounded-full transition-all duration-300"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>

            {/* TRACK 2: USER RECORDED SPOKEN ATTEMPT */}
            <div className={`p-4 rounded-2xl border transition-all ${
              mirrorTurn === 'user'
                ? 'bg-rose-50 border-rose-400 ring-2 ring-rose-200'
                : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center justify-between mb-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <span className="font-bold text-slate-900">Track 2: Giọng Thu Âm Của Bạn</span>
                  <span className="font-mono text-[10px] text-rose-800 bg-rose-100 px-2 py-0.5 rounded border border-rose-200 font-bold">
                    GOP: 68%
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-rose-700 font-bold">Thời lượng: {currentSound.userDurationSim}</span>
                  <button
                    onClick={() => speakText(currentSound.word, 0.9)}
                    className="p-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-rose-600 shadow-2xs"
                    title="Nghe riêng giọng của bạn"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* User Spoken Waveform Graphic */}
              <div className="h-16 w-full flex items-center justify-between gap-1 px-2 bg-white rounded-xl border border-slate-200 overflow-hidden relative">
                {[6, 10, 18, 45, 60, 52, 38, 22, 10, 5, 4, 3, 2, 2, 2, 2, 2].map((h, i) => (
                  <div
                    key={i}
                    className={`flex-1 rounded-full transition-all duration-300 ${
                      i > 9
                        ? 'bg-rose-100 border-b border-rose-400'
                        : 'bg-gradient-to-t from-rose-600 to-rose-400'
                    }`}
                    style={{ height: `${h}%` }}
                  />
                ))}
                
                {/* Visual Gap Callout Indicator */}
                <div className="absolute right-4 top-2 bg-rose-100 border border-rose-300 px-2 py-0.5 rounded text-[10px] text-rose-800 font-mono font-bold">
                  ← Hụt âm đuôi (Cần kéo dài)
                </div>
              </div>
            </div>
          </div>

          {/* Actionable Feedback Comparison Callout */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
              <span>
                <strong>Nhận xét từ sóng âm:</strong> {currentSound.diffTip}
              </span>
            </div>

            <button
              onClick={() => playNativeSound()}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs whitespace-nowrap shadow-xs transition-all self-start sm:self-auto"
            >
              Thu Âm Lại Để Cân Bằng Sóng ➔
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
