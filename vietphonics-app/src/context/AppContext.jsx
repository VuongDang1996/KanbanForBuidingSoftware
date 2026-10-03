import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext(null);

export const DIALECTS = {
  bac: {
    id: 'bac',
    name: 'Miền Bắc',
    label: '🇻🇳 Giọng Miền Bắc: /d/-/z/ calibrated',
    desc: 'Hà Nội & Bắc Bộ: Chuẩn hoá /d/ ➔ /z/, âm đuôi /t/-/d/, tránh lẫn lộn l/n',
    f0Mean: '215 Hz',
    f1f2Offset: '-12 Hz',
    tip: 'Đặc thù Giọng Bắc: Đang cải thiện xuất sắc cặp âm /z/ và /ʒ/, cần tập trung duy trì luồng hơi âm đuôi /t/ & /d/!'
  },
  trung: {
    id: 'trung',
    name: 'Miền Trung',
    label: '🇻🇳 Giọng Miền Trung: Tonal Pitch calibrated',
    desc: 'Nghệ An, Huế, Đà Nẵng: Giải phóng nén thanh quản, mở rộng âm vực nguyên âm /e/-/ɛ/',
    f0Mean: '198 Hz',
    f1f2Offset: '+24 Hz',
    tip: 'Đặc thù Giọng Trung: Ngữ điệu ổn định, cần mở rộng khẩu hình cho các nguyên âm đôi /eə/ và /ɪə/!'
  },
  nam: {
    id: 'nam',
    name: 'Miền Nam',
    label: '🇻🇳 Giọng Miền Nam: /v/-/j/ calibrated',
    desc: 'Sài Gòn & Nam Bộ: Khắc phục biến đổi /v/ ➔ /j/, giữ âm đuôi khép miệng /p/, /k/, /t/',
    f0Mean: '228 Hz',
    f1f2Offset: '-5 Hz',
    tip: 'Đặc thù Giọng Nam: Ngữ điệu mềm mại tự nhiên, cần chú ý phát rõ phụ âm đuôi /k/ và /t/ thay vì nuốt âm!'
  }
};

export function AppProvider({ children }) {
  const [activeTab, setActiveTab] = useState('tong-quan');
  const [dialect, setDialect] = useState('bac');
  const [streak, setStreak] = useState(14);
  const [shields, setShields] = useState(2);
  const [isPro, setIsPro] = useState(false);
  const [gopScore, setGopScore] = useState(76);
  const [showDiagnosticModal, setShowDiagnosticModal] = useState(false);
  const [showStreakModal, setShowStreakModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  // Selected item to load in Practice Studio
  const [currentPracticeItem, setCurrentPracticeItem] = useState({
    id: 'practice-01',
    word: 'Months',
    sentence: 'Six months ago, she baked fresh bread for breakfast on the street.',
    ipa: '/sɪks mʌnθs əˈɡoʊ, ʃi beɪkt freʃ bred fɔːr ˈbrekfəst ɒn ðə striːt/',
    targetPhonemes: ['/ks/', '/nθs/', '/kt/', '/st/'],
    difficulty: 'Intermediate',
    trap: 'Rụng âm đuôi -ed và nuốt cụm /ks/, /nθs/'
  });

  // Saved error words
  const [errorWords, setErrorWords] = useState([
    { id: 'err-1', word: 'Months', ipa: '/mʌnθs/', errorType: 'Mất /s/ đuôi', note: 'Nói thành "mân-tờ"', score: 54, count: 5 },
    { id: 'err-2', word: 'Breakfast', ipa: '/ˈbrek.fəst/', errorType: 'Sai trọng âm', note: 'Nhấn âm 2, rụng cụm /-st/', score: 66, count: 3 },
    { id: 'err-3', word: 'Street', ipa: '/striːt/', errorType: 'Nuốt âm đuôi /t/', note: 'Dừng hơi đột ngột tắt thanh hầu', score: 59, count: 6 },
    { id: 'err-4', word: 'Clothes', ipa: '/kloʊðz/', errorType: 'Nhầm /ð/ và /d/', note: 'Không kẹp lưỡi, biến thành "clốt"', score: 48, count: 7 },
    { id: 'err-5', word: 'Specific', ipa: '/spəˈsɪf.ɪk/', errorType: 'Cụm /sp/ đầu & /k/ đuôi', note: 'Thêm dấu sắc s-pơ-xi-phích', score: 62, count: 4 }
  ]);

  const triggerPractice = (item) => {
    setCurrentPracticeItem(item);
    setActiveTab('phong-luyen-phat-am');
  };

  const incrementStreak = () => {
    setStreak(s => s + 1);
    setShowStreakModal(true);
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        dialect,
        setDialect,
        dialectConfig: DIALECTS[dialect],
        streak,
        shields,
        setShields,
        isPro,
        setIsPro,
        gopScore,
        setGopScore,
        showDiagnosticModal,
        setShowDiagnosticModal,
        showStreakModal,
        setShowStreakModal,
        showUpgradeModal,
        setShowUpgradeModal,
        currentPracticeItem,
        setCurrentPracticeItem,
        triggerPractice,
        errorWords,
        setErrorWords,
        incrementStreak
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
