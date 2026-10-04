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
