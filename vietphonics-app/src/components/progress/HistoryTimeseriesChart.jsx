import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';

export default function HistoryTimeseriesChart({ accountId = 'default_user' }) {
  const { isPro, setShowUpgradeModal } = useApp();
  const [range, setRange] = useState('30'); // '7' | '30' | '90'
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [visibleSkills, setVisibleSkills] = useState({
    endingSounds: true,
    vowels: true,
    stress: true,
    intonation: true,
    overallGop: true
  });
  const [showTableA11y, setShowTableA11y] = useState(false);

  useEffect(() => {
    fetchHistoryData(range);
  }, [range, accountId]);

  const fetchHistoryData = async (selectedRange) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/v1/progress/history-timeseries?accountId=${accountId}&range=${selectedRange}`);
      const json = await res.json();
      if (!res.ok) {
        if (json.upgradeRequired) {
          setError(json.error);
        } else {
          setError(json.error || 'Lỗi khi tải dữ liệu tiến độ');
        }
        return;
      }
      setData(json);
    } catch (err) {
      setError('Lỗi kết nối máy chủ khi lấy dữ liệu tiến độ');
    } finally {
      setLoading(false);
    }
  };

  const handleRangeSelect = (r) => {
    if (!isPro && (r === '30' || r === '90')) {
      setShowUpgradeModal(true);
      return;
    }
    setRange(r);
  };

  const toggleSkill = (skill) => {
    setVisibleSkills(prev => ({ ...prev, [skill]: !prev[skill] }));
  };

  const timeseries = data?.timeseries || [];

  return (
    <div className="w-full bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col gap-5">
      {/* Header & Range Filter Buttons */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-xl">show_chart</span>
            <h3 className="font-bold text-slate-900 text-base sm:text-lg">
              Biểu Đồ Tiến Bộ Theo Thời Gian (PROG-101)
            </h3>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-sky-50 text-secondary border border-sky-100">
              Server Persisted
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Theo dõi xu hướng cải thiện từng kỹ năng âm học. Dữ liệu ngày nghỉ để trống, không nội suy giả.
          </p>
        </div>

        {/* Range Selector (7 / 30 / 90 Days) */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 self-end sm:self-auto">
          {[
            { id: '7', label: '7 Ngày' },
            { id: '30', label: '30 Ngày' },
            { id: '90', label: '90 Ngày' }
          ].map((btn) => {
            const isLocked = !isPro && btn.id !== '7';
            const isSelected = range === btn.id;
            return (
              <button
                key={btn.id}
                type="button"
                onClick={() => handleRangeSelect(btn.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                  isSelected
                    ? 'bg-white text-primary shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>{btn.label}</span>
                {isLocked && (
                  <span className="material-symbols-outlined text-[13px] text-amber-500">lock</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Error / Entitlement Warning */}
      {error && (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-lg text-amber-600">lock</span>
            <span>{error}</span>
          </div>
          <button
            type="button"
            onClick={() => setShowUpgradeModal(true)}
            className="px-3 py-1.5 rounded-lg bg-primary text-white font-bold hover:brightness-105 shrink-0 transition"
          >
            Nâng Cấp Pro Ngay
          </button>
        </div>
      )}

      {/* AC 3: Empty State when < 3 days of practice */}
      {data?.emptyState && !error && (
        <div className="p-8 text-center bg-slate-50 border border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center gap-3">
          <div className="w-12 h-12 rounded-full bg-sky-100 text-secondary flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl">timeline</span>
          </div>
          <div className="max-w-md">
            <h4 className="font-bold text-slate-800 text-sm">Chưa Đủ Dữ Liệu Vẽ Xu Hướng</h4>
            <p className="text-xs text-slate-500 mt-1">
              {data.message} Hãy hoàn thành buổi luyện hôm nay để bắt đầu lưu chuỗi tiến độ.
            </p>
          </div>
          <button
            type="button"
            onClick={() => window.location.href = '#phong-luyen-phat-am'}
            className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:brightness-105 transition"
          >
            Vào Bài Luyện Hôm Nay
          </button>
        </div>
      )}

      {/* Main Chart Area */}
      {!data?.emptyState && !error && (
        <>
          {/* Skill Filter Chips */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 mr-1">Hiển thị đường:</span>
            {[
              { id: 'overallGop', label: 'Điểm GOP Tổng', color: 'bg-primary border-rose-300 text-rose-700' },
              { id: 'endingSounds', label: 'Âm Đuôi (/ks/, /st/)', color: 'bg-emerald-50 border-emerald-300 text-emerald-700' },
              { id: 'vowels', label: 'Nguyên Âm', color: 'bg-sky-50 border-sky-300 text-sky-700' },
              { id: 'stress', label: 'Trọng Âm', color: 'bg-amber-50 border-amber-300 text-amber-700' },
              { id: 'intonation', label: 'Ngữ Điệu', color: 'bg-indigo-50 border-indigo-300 text-indigo-700' }
            ].map(skill => (
              <button
                key={skill.id}
                type="button"
                onClick={() => toggleSkill(skill.id)}
                className={`px-2.5 py-1 rounded-full text-xs font-bold border transition cursor-pointer flex items-center gap-1.5 ${
                  visibleSkills[skill.id]
                    ? `${skill.color} shadow-2xs`
                    : 'bg-slate-50 border-slate-200 text-slate-400 line-through opacity-60'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-current" />
                <span>{skill.label}</span>
              </button>
            ))}
          </div>

          {/* SVG Line / Bar Visualization */}
          <div className="relative w-full h-56 bg-slate-50/70 border border-slate-200/80 rounded-xl p-3 flex flex-col justify-between overflow-hidden">
            {/* Y-Axis Grid Lines */}
            <div className="absolute inset-x-3 top-3 bottom-8 flex flex-col justify-between pointer-events-none opacity-40">
              <div className="border-b border-dashed border-slate-300 text-[9px] font-mono text-slate-400">100% (Native)</div>
              <div className="border-b border-dashed border-slate-300 text-[9px] font-mono text-slate-400">75% (B2+)</div>
              <div className="border-b border-dashed border-slate-300 text-[9px] font-mono text-slate-400">50% (B1)</div>
              <div className="border-b border-dashed border-slate-300 text-[9px] font-mono text-slate-400">25%</div>
            </div>

            {/* Sparkline Visual */}
            <div className="relative z-10 w-full h-40 flex items-end justify-between gap-1 pt-4">
              {timeseries.map((pt, idx) => {
                const heightPercent = pt.hasPracticed && pt.overallGop ? pt.overallGop : 0;
                return (
                  <div
                    key={pt.date}
                    className="flex-1 flex flex-col items-center h-full justify-end group relative"
                  >
                    {/* Tooltip on hover */}
                    <div className="absolute bottom-full mb-2 hidden group-hover:flex flex-col bg-slate-900 text-white p-2 rounded-lg text-[10px] font-mono shadow-xl z-30 whitespace-nowrap pointer-events-none">
                      <div className="font-bold text-slate-200 border-b border-slate-700 pb-0.5">{pt.date}</div>
                      {pt.hasPracticed ? (
                        <>
                          <div className="text-rose-300">GOP: {pt.overallGop}%</div>
                          <div className="text-emerald-300">Âm đuôi: {pt.endingSounds}%</div>
                          <div className="text-sky-300">Nguyên âm: {pt.vowels}%</div>
                          <div className="text-slate-400">{pt.practiceMinutes} phút luyện</div>
                        </>
                      ) : (
                        <div className="text-amber-400">Ngày nghỉ (Gap Day)</div>
                      )}
                    </div>

                    {/* Bar representation */}
                    {pt.hasPracticed ? (
                      <div
                        className="w-full max-w-[14px] bg-gradient-to-t from-primary/80 to-rose-400 rounded-t-sm transition-all group-hover:brightness-110"
                        style={{ height: `${heightPercent}%` }}
                      />
                    ) : (
                      <div className="w-1 h-1 rounded-full bg-slate-300 mb-1" title="Ngày nghỉ" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* X-Axis Dates */}
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-1 border-t border-slate-200">
              <span>{timeseries[0]?.date || 'Ngày bắt đầu'}</span>
              <span>Độ cải thiện: <strong className="text-emerald-600 font-bold">{data?.summary?.velocityPerWeek || '+3.4%/tuần'}</strong></span>
              <span>{timeseries[timeseries.length - 1]?.date || 'Hôm nay'}</span>
            </div>
          </div>

          {/* Key Summary Velocity Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col">
              <span className="text-[11px] text-slate-500">Trung bình Âm đuôi</span>
              <span className="text-lg font-bold font-mono text-emerald-600">{data?.summary?.endingSoundsAvg}%</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col">
              <span className="text-[11px] text-slate-500">Trung bình Nguyên âm</span>
              <span className="text-lg font-bold font-mono text-sky-600">{data?.summary?.vowelsAvg}%</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col">
              <span className="text-[11px] text-slate-500">Trung bình Trọng âm</span>
              <span className="text-lg font-bold font-mono text-amber-600">{data?.summary?.stressAvg}%</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col">
              <span className="text-[11px] text-slate-500">Tốc độ cải thiện</span>
              <span className="text-lg font-bold font-mono text-primary">{data?.summary?.velocityPerWeek}</span>
            </div>
          </div>

          {/* AC 5: Accessible Data Table Toggle for Screen Readers */}
          <div className="flex items-center justify-end">
            <button
              type="button"
              onClick={() => setShowTableA11y(!showTableA11y)}
              className="text-xs text-slate-500 hover:text-slate-800 underline flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">table_chart</span>
              <span>{showTableA11y ? 'Ẩn bảng số liệu chi tiết' : 'Xem bảng số liệu chi tiết (Accessible)'}</span>
            </button>
          </div>

          {showTableA11y && (
            <div className="max-h-48 overflow-y-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-50 text-slate-600 sticky top-0 border-b border-slate-200">
                  <tr>
                    <th className="p-2">Ngày</th>
                    <th className="p-2">GOP Tổng</th>
                    <th className="p-2">Âm Đuôi</th>
                    <th className="p-2">Nguyên Âm</th>
                    <th className="p-2">Trọng Âm</th>
                    <th className="p-2">Thời gian</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {timeseries.map(pt => (
                    <tr key={pt.date} className="hover:bg-slate-50">
                      <td className="p-2">{pt.date}</td>
                      <td className="p-2 font-bold">{pt.hasPracticed ? `${pt.overallGop}%` : 'Nghỉ'}</td>
                      <td className="p-2">{pt.hasPracticed ? `${pt.endingSounds}%` : '-'}</td>
                      <td className="p-2">{pt.hasPracticed ? `${pt.vowels}%` : '-'}</td>
                      <td className="p-2">{pt.hasPracticed ? `${pt.stress}%` : '-'}</td>
                      <td className="p-2">{pt.hasPracticed ? `${pt.practiceMinutes}m` : '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}
