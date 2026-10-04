import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Upload,
  Trash2,
  Edit2,
  Check,
  Eye,
  Volume2,
  FileSpreadsheet,
  Globe,
  Sparkles
} from 'lucide-react';

export default function CmsSentencesPanel() {
  const [sentences, setSentences] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterCefr, setFilterCefr] = useState('');
  const [filterTopic, setFilterTopic] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Add/Edit Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    sentenceText: '',
    ipaTranscription: '',
    targetPhoneme: 'θ',
    stressPattern: '',
    cefrLevel: 'B1',
    topic: 'Daily',
    audioUrl: '',
    status: 'published'
  });
  const [ipaError, setIpaError] = useState('');
  const [formMsg, setFormMsg] = useState('');

  // Bulk Import Modal
  const [isBulkOpen, setIsBulkOpen] = useState(false);
  const [csvText, setCsvText] = useState('');
  const [bulkReport, setBulkReport] = useState(null);

  useEffect(() => {
    loadSentences();
  }, [filterCefr, filterTopic, filterStatus]);

  const loadSentences = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append('includeDrafts', 'true');
      if (filterCefr) params.append('cefrLevel', filterCefr);
      if (filterTopic) params.append('topic', filterTopic);
      if (filterStatus) params.append('status', filterStatus);

      const res = await fetch(`http://localhost:3002/api/v1/cms/sentences?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setSentences(data.sentences || []);
      }
    } catch (err) {
      console.error('Failed to load CMS sentences:', err);
    } finally {
      setLoading(false);
    }
  };

  const validateIpaRealtime = (val) => {
    const validRegex = /^[\sa-zA-Zθðʃʒŋtʃdʒæʌəɑɛɪʊɔːˈˌ.ː̃\-]*$/;
    if (!validRegex.test(val)) {
      setIpaError('Cảnh báo: Chuỗi chứa ký tự không thuộc bảng phiên âm IPA quốc tế chuẩn General American.');
    } else {
      setIpaError('');
    }
  };

  const handleSaveSentence = async (e) => {
    e.preventDefault();
    if (ipaError) return;

    try {
      const url = editId
        ? `http://localhost:3002/api/v1/cms/sentences/${editId}/update`
        : 'http://localhost:3002/api/v1/cms/sentences';

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setFormMsg(data.error || 'Có lỗi xảy ra khi lưu.');
        return;
      }

      setIsModalOpen(false);
      setEditId(null);
      setFormData({
        sentenceText: '',
        ipaTranscription: '',
        targetPhoneme: 'θ',
        stressPattern: '',
        cefrLevel: 'B1',
        topic: 'Daily',
        audioUrl: '',
        status: 'published'
      });
      loadSentences();
    } catch (err) {
      setFormMsg('Lỗi kết nối: ' + err.message);
    }
  };

  const handleTogglePublish = async (id, currentStatus) => {
    const nextStatus = currentStatus === 'published' ? 'draft' : 'published';
    try {
      const res = await fetch(`http://localhost:3002/api/v1/cms/sentences/${id}/publish`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus })
      });
      if (res.ok) {
        loadSentences();
      }
    } catch (err) {
      alert('Lỗi cập nhật trạng thái xuất bản: ' + err.message);
    }
  };

  const handleDeleteSentence = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xoá câu luyện này khỏi CMS?')) return;
    try {
      const res = await fetch(`http://localhost:3002/api/v1/cms/sentences/${id}/delete`, {
        method: 'POST'
      });
      if (res.ok) loadSentences();
    } catch (err) {
      alert('Lỗi xoá câu luyện: ' + err.message);
    }
  };

  const handleBulkImport = async () => {
    if (!csvText.trim()) return;

    // Parse CSV rows
    const lines = csvText.trim().split('\n');
    const rows = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line || (i === 0 && line.toLowerCase().includes('sentencetext'))) continue;
      const parts = line.split(',');
      if (parts.length >= 3) {
        rows.push({
          sentenceText: parts[0]?.trim(),
          ipaTranscription: parts[1]?.trim(),
          targetPhoneme: parts[2]?.trim(),
          cefrLevel: parts[3]?.trim() || 'B1',
          topic: parts[4]?.trim() || 'Daily'
        });
      }
    }

    try {
      const res = await fetch('http://localhost:3002/api/v1/cms/sentences/bulk-import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rows })
      });
      const data = await res.json();
      setBulkReport(data);
      if (data.success && data.importedCount > 0) {
        loadSentences();
      }
    } catch (err) {
      alert('Lỗi nạp file hàng loạt: ' + err.message);
    }
  };

  const filteredSentences = sentences.filter(s => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return s.sentence_text.toLowerCase().includes(q) || s.ipa_transcription.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            <h3 className="text-base font-bold text-slate-800">
              CMS Quản Trị Danh Mục Câu Luyện &amp; Phiên Âm IPA (OPS-103)
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Quản lý kho câu luyện GA, kiểm tra Unicode IPA chuẩn hoá, xuất bản bản nháp tức thời.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setIsBulkOpen(true);
              setBulkReport(null);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 transition shadow-sm cursor-pointer"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" /> Nhập Hàng Loạt (CSV)
          </button>
          <button
            type="button"
            onClick={() => {
              setEditId(null);
              setFormData({
                sentenceText: '',
                ipaTranscription: '',
                targetPhoneme: 'θ',
                stressPattern: '',
                cefrLevel: 'B1',
                topic: 'Daily',
                audioUrl: '',
                status: 'published'
              });
              setIpaError('');
              setFormMsg('');
              setIsModalOpen(true);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition shadow-sm cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Thêm Câu Luyện Mới
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm theo nội dung câu hoặc IPA..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
          />
        </div>

        <div>
          <select
            value={filterCefr}
            onChange={(e) => setFilterCefr(e.target.value)}
            className="w-full p-1.5 bg-white border border-slate-200 rounded-lg text-xs"
          >
            <option value="">Tất cả CEFR (A1 - C1)</option>
            <option value="A1">A1 - Sơ Cấp</option>
            <option value="A2">A2 - Tiền Trung Cấp</option>
            <option value="B1">B1 - Trung Cấp</option>
            <option value="B2">B2 - Trung Cao Cấp</option>
            <option value="C1">C1 - Nâng Cao</option>
          </select>
        </div>

        <div>
          <select
            value={filterTopic}
            onChange={(e) => setFilterTopic(e.target.value)}
            className="w-full p-1.5 bg-white border border-slate-200 rounded-lg text-xs"
          >
            <option value="">Tất cả chủ đề</option>
            <option value="Daily">Đời Sống Hằng Ngày (Daily)</option>
            <option value="IT Standup">Họp Kỹ Thuật (IT Standup)</option>
            <option value="IELTS">Luyện Thi Học Thuật (IELTS)</option>
          </select>
        </div>

        <div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full p-1.5 bg-white border border-slate-200 rounded-lg text-xs"
          >
            <option value="">Tất cả trạng thái</option>
            <option value="published">Đã Xuất Bản (Published)</option>
            <option value="draft">Bản Nháp (Draft)</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-2.5 px-3">Câu Luyện Tập &amp; Phiên Âm IPA</th>
                <th className="py-2.5 px-3">Âm Đích</th>
                <th className="py-2.5 px-3">Cấp Độ &amp; Chủ Đề</th>
                <th className="py-2.5 px-3">Trạng Thái</th>
                <th className="py-2.5 px-3">Phiên Bản</th>
                <th className="py-2.5 px-3 text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredSentences.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-slate-400">
                    {loading ? 'Đang tải dữ liệu...' : 'Không tìm thấy câu luyện nào phù hợp bộ lọc.'}
                  </td>
                </tr>
              ) : (
                filteredSentences.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/50 transition">
                    <td className="py-2.5 px-3 max-w-md">
                      <div className="font-medium text-slate-800">{s.sentence_text}</div>
                      <div className="font-mono text-indigo-600 text-[11px] mt-0.5">
                        /{s.ipa_transcription}/
                      </div>
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-700 font-mono font-bold rounded">
                        /{s.target_phoneme}/
                      </span>
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="font-semibold text-slate-700">{s.cefr_level}</div>
                      <div className="text-[11px] text-slate-400">{s.topic}</div>
                    </td>
                    <td className="py-2.5 px-3">
                      <button
                        type="button"
                        onClick={() => handleTogglePublish(s.id, s.status)}
                        className={`px-2 py-0.5 rounded-full font-semibold text-[10px] cursor-pointer transition ${
                          s.status === 'published'
                            ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                            : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                        }`}
                      >
                        {s.status === 'published' ? 'ĐÃ XUẤT BẢN' : 'BẢN NHÁP'}
                      </button>
                    </td>
                    <td className="py-2.5 px-3 font-mono text-slate-500 text-[11px]">
                      v{s.version || 1}
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            setEditId(s.id);
                            setFormData({
                              sentenceText: s.sentence_text,
                              ipaTranscription: s.ipa_transcription,
                              targetPhoneme: s.target_phoneme,
                              stressPattern: s.stress_pattern || '',
                              cefrLevel: s.cefr_level,
                              topic: s.topic,
                              audioUrl: s.audio_url || '',
                              status: s.status
                            });
                            setIpaError('');
                            setIsModalOpen(true);
                          }}
                          className="p-1 text-slate-500 hover:text-indigo-600 rounded hover:bg-indigo-50 cursor-pointer"
                          title="Chỉnh sửa câu"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteSentence(s.id)}
                          className="p-1 text-slate-400 hover:text-rose-600 rounded hover:bg-rose-50 cursor-pointer"
                          title="Xoá câu"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-800">
                {editId ? 'Chỉnh Sửa Câu Luyện Tập' : 'Thêm Mới Câu Luyện Tập Vào CMS'}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {formMsg && (
              <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg">
                {formMsg}
              </div>
            )}

            <form onSubmit={handleSaveSentence} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Văn bản tiếng Anh</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: The weather is thought to be thirty degrees..."
                  value={formData.sentenceText}
                  onChange={(e) => setFormData({ ...formData, sentenceText: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-slate-700 font-semibold">Phiên âm IPA General American</label>
                  <span className="text-[10px] text-slate-400">Kiểm tra chuẩn Unicode GA</span>
                </div>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: ðə ˈwɛðər ɪz θɔt..."
                  value={formData.ipaTranscription}
                  onChange={(e) => {
                    setFormData({ ...formData, ipaTranscription: e.target.value });
                    validateIpaRealtime(e.target.value);
                  }}
                  className={`w-full p-2 border rounded-lg font-mono ${
                    ipaError ? 'border-rose-400 bg-rose-50/40 text-rose-900' : 'border-slate-300'
                  }`}
                />
                {ipaError && (
                  <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" /> {ipaError}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Âm mục tiêu</label>
                  <input
                    type="text"
                    required
                    placeholder="θ, ʃ, æ, v..."
                    value={formData.targetPhoneme}
                    onChange={(e) => setFormData({ ...formData, targetPhoneme: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Cấp độ CEFR</label>
                  <select
                    value={formData.cefrLevel}
                    onChange={(e) => setFormData({ ...formData, cefrLevel: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg"
                  >
                    <option value="A1">A1</option>
                    <option value="A2">A2</option>
                    <option value="B1">B1</option>
                    <option value="B2">B2</option>
                    <option value="C1">C1</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Chủ đề</label>
                  <select
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg"
                  >
                    <option value="Daily">Daily</option>
                    <option value="IT Standup">IT Standup</option>
                    <option value="IELTS">IELTS</option>
                    <option value="Business">Business</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Mẫu trọng âm (Stress Pattern)</label>
                  <input
                    type="text"
                    placeholder="0-1-0-1..."
                    value={formData.stressPattern}
                    onChange={(e) => setFormData({ ...formData, stressPattern: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Trạng thái phát hành</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg font-semibold"
                  >
                    <option value="published">Xuất bản ngay (Published)</option>
                    <option value="draft">Lưu bản nháp (Draft)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg font-medium cursor-pointer"
                >
                  Huỷ
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg cursor-pointer"
                >
                  {editId ? 'Cập Nhật Câu' : 'Tạo Câu Mới'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bulk Import CSV Modal */}
      {isBulkOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-emerald-600" /> Nhập Hàng Loạt Câu Luyện Tập Qua CSV
              </h3>
              <button
                type="button"
                onClick={() => setIsBulkOpen(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Định dạng mỗi dòng: <code className="bg-slate-100 px-1 py-0.5 rounded text-indigo-700 font-mono">sentenceText,ipaTranscription,targetPhoneme,cefrLevel,topic</code>
            </p>

            <textarea
              rows={6}
              placeholder={`The weather is warm today,ðə ˈwɛðər ɪz wɔrm təˈdeɪ,θ,A2,Daily\nWe must deploy now,wi mʌst dɪˈplɔɪ naʊ,p,B1,IT Standup`}
              value={csvText}
              onChange={(e) => setCsvText(e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded-lg text-xs font-mono"
            />

            {bulkReport && (
              <div className={`p-3 rounded-lg text-xs ${bulkReport.failedCount > 0 ? 'bg-amber-50 border border-amber-200 text-amber-800' : 'bg-emerald-50 border border-emerald-200 text-emerald-800'}`}>
                <div className="font-bold">{bulkReport.message}</div>
                {bulkReport.errors && bulkReport.errors.length > 0 && (
                  <ul className="mt-1 list-disc list-inside text-[11px] text-rose-700 space-y-0.5">
                    {bulkReport.errors.slice(0, 5).map((err, i) => (
                      <li key={i}>{err.error}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 text-xs">
              <button
                type="button"
                onClick={() => setIsBulkOpen(false)}
                className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg cursor-pointer"
              >
                Đóng
              </button>
              <button
                type="button"
                onClick={handleBulkImport}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg cursor-pointer"
              >
                Bắt Đầu Nạp Dữ Liệu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
