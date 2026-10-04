/**
 * vietQrEmvco.js
 * Dynamic VietQR EMVCo Generator, Banking Deep Links, and Pricing Matrix (PAY-101, PAY-102, PAY-103)
 */

export const BANK_CONFIG = {
  bin: '970422', // MB Bank
  shortName: 'MB Bank',
  accountNumber: '0988123456',
  accountName: 'CONG TY VIETPHONICS VIET NAM'
};

export const PRICING_PLANS = [
  {
    id: 'pro_monthly',
    name: 'Gói 1 Tháng',
    badge: 'Ôn Thi Cấp Tốc',
    price: 149000,
    dailyCost: '4.900đ/ngày',
    originalPrice: 199000,
    discountPercent: 25,
    durationMonths: 1,
    popular: false,
    description: 'Phù hợp ôn thi cấp tốc 30 ngày trước kỳ thi IELTS'
  },
  {
    id: 'pro_annual',
    name: 'Gói 1 Năm',
    badge: 'Gói Phổ Biến Nhất • Tiết Kiệm 40%',
    price: 599000,
    dailyCost: '1.640đ/ngày',
    originalPrice: 999000,
    discountPercent: 40,
    durationMonths: 12,
    popular: true,
    description: 'Chi phí tối ưu nhất, bảo chứng tăng tối thiểu 1.5 Band phát âm'
  },
  {
    id: 'pro_lifetime',
    name: 'Gói Trọn Đời (Lifetime VIP)',
    badge: 'Sở Hữu Vĩnh Viễn',
    price: 1299000,
    dailyCost: 'Đầu tư 1 lần',
    originalPrice: 2499000,
    discountPercent: 48,
    durationMonths: 120,
    popular: false,
    description: 'Mở khóa vĩnh viễn toàn bộ tính năng và bản cập nhật AI tương lai'
  }
];

export const FEATURE_COMPARISON = [
  { feature: 'Luyện 44 Âm IPA & Nhận Diện Lỗi L1', free: '5 bài/ngày', pro: 'Không giới hạn 24/7' },
  { feature: 'AI Speaking Roleplay Alex (120 Scenario)', free: 'Khóa', pro: 'Mở khóa toàn bộ' },
  { feature: 'IELTS Speaking Mock Examiner (Band 9.0)', free: 'Khóa', pro: 'Chấm chi tiết 4 tiêu chí' },
  { feature: 'Ngân Hàng Từ Lỗi Spaced Repetition SM-2', free: 'Tối đa 5 từ', pro: 'Không giới hạn' },
  { feature: 'Phân Tích Khẩu Hình Giải Phẫu 2D & 3D', free: 'Cơ bản', pro: 'Đầy đủ cảm biến 3D' },
  { feature: 'Khiên Bảo Vệ Streak Freeze Shield', free: '1 khiên', pro: 'Tặng kèm 5 khiên/tháng' }
];

/**
 * Computes EMVCo CRC-16-CCITT (polynomial 0x1021, initial value 0xFFFF)
 * @param {string} str
 * @returns {string} 4-character uppercase hex
 */
export function calculateCrc16(str) {
  let crc = 0xFFFF;
  for (let i = 0; i < str.length; i++) {
    crc ^= (str.charCodeAt(i) << 8);
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) !== 0) {
        crc = ((crc << 1) ^ 0x1021) & 0xFFFF;
      } else {
        crc = (crc << 1) & 0xFFFF;
      }
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, '0');
}

/**
 * Generates an EMVCo-compliant VietQR payload string
 * @param {Object} params
 * @returns {string} EMVCo QR String
 */
export function generateVietQrEmvcoString({
  bankBin = BANK_CONFIG.bin,
  accountNumber = BANK_CONFIG.accountNumber,
  amount = 599000,
  orderCode = 'VP_ORDER'
}) {
  // Format 00: Payload Format Indicator (01)
  let payload = '000201';
  // Format 01: Point of Initiation Method (12 = Dynamic QR)
  payload += '010212';

  // Format 38: Merchant Account Information (VietQR Napas)
  // Sub-tag 00: GUID (A000000727), Sub-tag 01: Beneficiary Org (0006<bin>01<accLen><acc>)
  const beneficiary = `0006${bankBin}01${String(accountNumber.length).padStart(2, '0')}${accountNumber}`;
  const tag38Value = `0010A00000072701${String(beneficiary.length).padStart(2, '0')}${beneficiary}0208QRIBFTTA`;
  payload += `38${String(tag38Value.length).padStart(2, '0')}${tag38Value}`;

  // Format 53: Transaction Currency (704 = VND)
  payload += '5303704';

  // Format 54: Transaction Amount
  const amountStr = String(Math.round(amount));
  payload += `54${String(amountStr.length).padStart(2, '0')}${amountStr}`;

  // Format 58: Country Code (VN)
  payload += '5802VN';

  // Format 62: Additional Data Field (Memo / Order Code)
  const tag62Value = `08${String(orderCode.length).padStart(2, '0')}${orderCode}`;
  payload += `62${String(tag62Value.length).padStart(2, '0')}${tag62Value}`;

  // Format 63: CRC Checksum (tag 63 + len 04)
  payload += '6304';
  const crc = calculateCrc16(payload);

  return payload + crc;
}

/**
 * Generates QuickLink VietQR image URL
 */
export function getVietQrImageUrl({
  bankBin = BANK_CONFIG.bin,
  accountNumber = BANK_CONFIG.accountNumber,
  amount = 599000,
  orderCode = 'VP_ORDER',
  accountName = BANK_CONFIG.accountName
}) {
  const encodedName = encodeURIComponent(accountName);
  const encodedMemo = encodeURIComponent(orderCode);
  return `https://img.vietqr.io/image/${bankBin}-${accountNumber}-compact2.png?amount=${amount}&addInfo=${encodedMemo}&accountName=${encodedName}`;
}

/**
 * Generates Banking App Deep Link for mobile 1-scan intent
 */
export function buildBankingDeepLink({
  bankBin = BANK_CONFIG.bin,
  accountNumber = BANK_CONFIG.accountNumber,
  amount = 599000,
  orderCode = 'VP_ORDER'
}) {
  // VietQR Universal Scheme & Mobile Fallback
  return `vietqr://transfer?bin=${bankBin}&account=${accountNumber}&amount=${amount}&memo=${encodeURIComponent(orderCode)}`;
}

/**
 * Generates unique transfer memo syntax
 */
export function generateOrderMemo(userId = 'learner', planCode = 'pro_annual') {
  const shortId = userId.replace(/[^a-zA-Z0-9]/g, '').slice(-5).toUpperCase();
  const planTag = planCode.includes('annual') ? '1Y' : planCode.includes('lifetime') ? 'LIFE' : '1M';
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `VP ${shortId} ${planTag} ${randomSuffix}`;
}
