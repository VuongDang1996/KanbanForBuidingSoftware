import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const appRoot = path.join(__dirname, '..', 'vietphonics-app');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(full));
    } else if (file.endsWith('.jsx')) {
      results.push(full);
    }
  });
  return results;
}

function processJSX(content) {
  let result = '';
  let i = 0;
  while (i < content.length) {
    if (content.startsWith('<button', i) && (/\s|>/.test(content[i + 7]))) {
      let j = i + 7;
      let braceDepth = 0;
      let inString = null;
      while (j < content.length) {
        const char = content[j];
        if (inString) {
          if (char === '\\') {
            j += 2;
            continue;
          }
          if (char === inString) {
            inString = null;
          }
        } else {
          if (char === '"' || char === "'" || char === '`') {
            inString = char;
          } else if (char === '{') {
            braceDepth++;
          } else if (char === '}') {
            braceDepth--;
          } else if (char === '>' && braceDepth === 0) {
            break;
          }
        }
        j++;
      }
      
      let attrs = content.substring(i + 7, j);
      
      if (!attrs.includes('type=')) {
        attrs = ' type="button"' + attrs;
      }
      if (!attrs.includes('aria-label=')) {
        let label = 'Nút tương tác';
        if (attrs.includes('handleMicToggle') || attrs.includes('isRecording')) {
          label = 'Bật tắt ghi âm giọng nói';
        } else if (attrs.includes('playAudio') || attrs.includes('playWord') || attrs.includes('playTTS') || attrs.includes('playSpeech')) {
          label = 'Phát âm mẫu chuẩn bản ngữ';
        } else if (attrs.includes('setShowDiagnosticModal')) {
          label = 'Mở bài kiểm tra chẩn đoán L1';
        } else if (attrs.includes('setShowStreakModal')) {
          label = 'Xem chi tiết chuỗi luyện tập';
        } else if (attrs.includes('setShowUpgradeModal') || attrs.includes('setQrModalOpen')) {
          label = 'Nâng cấp gói VietPhonics PRO';
        } else if (attrs.includes('setSpectrogramOpen')) {
          label = 'Mở biểu đồ phổ ký Spectrogram';
        } else if (attrs.includes('setActiveTab')) {
          label = 'Chuyển phân hệ học';
        } else if (attrs.includes('handlePhonemeSelect')) {
          label = 'Chọn âm vị thực hành';
        } else if (attrs.includes('handleTestPerfect') || attrs.includes('handleTestError')) {
          label = 'Kiểm thử kết quả đòn đánh';
        } else if (attrs.includes('close')) {
          label = 'Đóng cửa sổ';
        } else if (attrs.includes('dictation')) {
          label = 'Chế độ luyện chính tả';
        }
        attrs = ` aria-label="${label}"` + attrs;
      }
      
      result += '<button' + attrs + '>';
      i = j + 1;
    } else {
      result += content[i];
      i++;
    }
  }
  return result;
}

const files = walk(path.join(appRoot, 'src'));
console.log(`[A11y] Enhancing ${files.length} JSX files with exact parser...`);

let modified = 0;
for (const f of files) {
  const code = fs.readFileSync(f, 'utf8');
  const transformed = processJSX(code);
  if (transformed !== code) {
    fs.writeFileSync(f, transformed, 'utf8');
    modified++;
    console.log(`✓ Enhanced: ${path.basename(f)}`);
  }
}

console.log(`[A11y] Successfully updated ${modified} files.`);
