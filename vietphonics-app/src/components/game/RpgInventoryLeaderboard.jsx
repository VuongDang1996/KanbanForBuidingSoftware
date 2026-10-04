import React, { useState, useEffect } from 'react';
import { PERK_ITEMS_CATALOG, UNIVERSITIES_CATALOG } from '../../lib/scoring/rpgInventoryLeaderboard';

export default function RpgInventoryLeaderboard({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('leaderboard'); // 'leaderboard' | 'inventory'
  const [gemsBalance, setGemsBalance] = useState(500);
  const [inventory, setInventory] = useState([]);
  const [catalog, setCatalog] = useState(PERK_ITEMS_CATALOG);
  const [podium, setPodium] = useState([]);
  const [rankings, setRankings] = useState([]);
  const [personalRank, setPersonalRank] = useState(null);
  const [buyFeedback, setBuyFeedback] = useState(null);
  const [xpFeedback, setXpFeedback] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch Inventory and Leaderboard
  const loadData = async () => {
    try {
      setLoading(true);
      const [invRes, leadRes] = await Promise.all([
        fetch('/api/v1/game/inventory'),
        fetch('/api/v1/leaderboard/university?universityId=HUST')
      ]);

      const invData = await invRes.json();
      if (invData.success) {
        setGemsBalance(invData.gemsBalance);
        setInventory(invData.inventory);
        if (invData.catalog) setCatalog(invData.catalog);
      }

      const leadData = await leadRes.json();
      if (leadData.success) {
        setPodium(leadData.podium);
        setRankings(leadData.rankings);
        setPersonalRank(leadData.personalRank);
      }
    } catch (err) {
      console.error('Failed to load inventory/leaderboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  const handleBuyItem = async (itemId) => {
    try {
      const res = await fetch('/api/v1/game/inventory/buy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId })
      });
      const data = await res.json();
      if (data.success) {
        setGemsBalance(data.gemsBalance);
        setInventory(data.inventory);
        setBuyFeedback(`Đã mua thành công ${data.purchasedItem.name}!`);
        setTimeout(() => setBuyFeedback(null), 3000);
      } else {
        setBuyFeedback(data.error || 'Giao dịch thất bại.');
        setTimeout(() => setBuyFeedback(null), 3000);
      }
    } catch (err) {
      setBuyFeedback('Lỗi kết nối máy chủ khi mua vật phẩm.');
      setTimeout(() => setBuyFeedback(null), 3000);
    }
  };

  const handleSubmitTestXp = async () => {
    try {
      const res = await fetch('/api/v1/leaderboard/submit-xp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          universityId: 'HUST',
          universityName: 'ĐH Bách Khoa Hà Nội',
          userName: 'Học viên Bách Khoa',
          xp: 150
        })
      });
      const data = await res.json();
      if (data.success) {
        setPodium(data.podium);
        setPersonalRank(data.personalRank);
        setXpFeedback('+150 XP đã được ghi nhận cho ĐH Bách Khoa Hà Nội!');
        setTimeout(() => setXpFeedback(null), 3000);
        // Reload full rankings
        loadData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
      data-testid="rpg-leaderboard-modal"
    >
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header with Navigation Tabs & Gems Display */}
        <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
              <span className="material-symbols-outlined text-2xl">trophy</span>
            </div>
            <div>
              <h2 className="font-headline-md text-lg font-bold">
                Bảng Xếp Hạng & Túi Đồ Phục Sức (GAME-105)
              </h2>
              <p className="font-label-mono text-xs text-indigo-200">
                Liên Trường Đại Học • Hệ Thống Vật Phẩm & Khiên Đóng Băng
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Gems balance */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 border border-white/20">
              <span className="material-symbols-outlined text-amber-400 text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                diamond
              </span>
              <span className="font-headline-sm text-sm font-extrabold text-amber-300" data-testid="gems-balance">
                {gemsBalance}
              </span>
              <span className="font-label-mono text-[10px] text-slate-300">Kim Cương</span>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
              data-testid="close-leaderboard-modal"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6">
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`py-3 px-4 font-headline-sm text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'leaderboard'
                ? 'border-indigo-600 text-indigo-700 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
            data-testid="tab-leaderboard"
          >
            <span className="material-symbols-outlined text-sm">leaderboard</span>
            <span>Bảng Xếp Hạng Liên Trường (Top 3 Podium)</span>
          </button>

          <button
            onClick={() => setActiveTab('inventory')}
            className={`py-3 px-4 font-headline-sm text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'inventory'
                ? 'border-indigo-600 text-indigo-700 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
            data-testid="tab-inventory"
          >
            <span className="material-symbols-outlined text-sm">backpack</span>
            <span>Túi Đồ & Cửa Hàng Phục Sức (Perks Store)</span>
            {inventory.length > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-mono">
                {inventory.length}
              </span>
            )}
          </button>
        </div>

        {/* Main Content Area */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: LEADERBOARD & PODIUM */}
          {activeTab === 'leaderboard' && (
            <div className="space-y-6">
              {/* Feedback toast */}
              {xpFeedback && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-fade-in">
                  <span className="material-symbols-outlined text-emerald-600 text-base">check_circle</span>
                  <span>{xpFeedback}</span>
                </div>
              )}

              {/* 3D PODIUM SECTION (AC 2) */}
              <div className="p-6 rounded-3xl bg-gradient-to-b from-indigo-950 via-slate-900 to-slate-950 text-white relative overflow-hidden shadow-inner">
                <div className="text-center mb-6">
                  <span className="px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 font-label-mono text-[11px] uppercase tracking-wider font-bold">
                    Tuần Này • Season 12
                  </span>
                  <h3 className="font-headline-md text-xl font-bold mt-2 text-white">
                    Vinh Quang Liên Trường Đại Học
                  </h3>
                  <p className="text-xs text-indigo-200/80 mt-1">
                    Điểm XP từ mỗi buổi phát âm chuẩn đóng góp trực tiếp vào cờ thi đua trường của bạn
                  </p>
                </div>

                {/* 3 Towers Podium: 2nd (Silver), 1st (Gold), 3rd (Bronze) */}
                <div className="flex items-end justify-center gap-3 sm:gap-6 pt-6 pb-2 max-w-lg mx-auto">
                  {/* Rank 2 - Silver */}
                  {podium[1] && (
                    <div className="flex-1 flex flex-col items-center">
                      <div className="text-center mb-2">
                        <div className="w-10 h-10 rounded-full bg-slate-300 border-2 border-slate-100 text-slate-800 flex items-center justify-center font-black text-sm shadow-md mx-auto">
                          2
                        </div>
                        <div className="text-xs font-bold text-slate-200 truncate mt-1">
                          {podium[1].shortName}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          {podium[1].totalXp.toLocaleString()} XP
                        </div>
                      </div>
                      <div
                        className="w-full h-28 bg-gradient-to-t from-slate-400 to-slate-200 text-slate-950 font-bold rounded-t-3xl flex flex-col items-center justify-end p-3 shadow-lg"
                        data-testid="podium-rank-2"
                      >
                        <span className="material-symbols-outlined text-slate-700 text-2xl">military_tech</span>
                        <span className="font-black text-xs text-slate-900 uppercase">Hạng 2</span>
                      </div>
                    </div>
                  )}

                  {/* Rank 1 - Gold (Center, Highest) */}
                  {podium[0] && (
                    <div className="flex-1 flex flex-col items-center">
                      <div className="text-center mb-2">
                        <div className="w-12 h-12 rounded-full bg-amber-400 border-2 border-amber-200 text-slate-950 flex items-center justify-center font-black text-base shadow-[0_0_20px_rgba(245,158,11,0.6)] mx-auto animate-bounce">
                          👑 1
                        </div>
                        <div className="text-sm font-extrabold text-amber-300 truncate mt-1">
                          {podium[0].shortName}
                        </div>
                        <div className="text-[11px] text-amber-200 font-mono font-bold">
                          {podium[0].totalXp.toLocaleString()} XP
                        </div>
                      </div>
                      <div
                        className="w-full h-36 bg-gradient-to-t from-amber-500 to-yellow-400 text-slate-950 font-black rounded-t-3xl shadow-[0_0_35px_rgba(245,158,11,0.5)] flex flex-col items-center justify-end p-4"
                        data-testid="podium-rank-1"
                      >
                        <span className="material-symbols-outlined text-amber-950 text-3xl">workspace_premium</span>
                        <span className="font-black text-sm text-amber-950 uppercase">Vô Địch</span>
                      </div>
                    </div>
                  )}

                  {/* Rank 3 - Bronze */}
                  {podium[2] && (
                    <div className="flex-1 flex flex-col items-center">
                      <div className="text-center mb-2">
                        <div className="w-10 h-10 rounded-full bg-amber-700 border-2 border-amber-600 text-white flex items-center justify-center font-black text-sm shadow-md mx-auto">
                          3
                        </div>
                        <div className="text-xs font-bold text-amber-200 truncate mt-1">
                          {podium[2].shortName}
                        </div>
                        <div className="text-[10px] text-amber-300/70 font-mono">
                          {podium[2].totalXp.toLocaleString()} XP
                        </div>
                      </div>
                      <div
                        className="w-full h-24 bg-gradient-to-t from-amber-800 to-amber-700 text-white font-bold rounded-t-3xl flex flex-col items-center justify-end p-3 shadow-lg"
                        data-testid="podium-rank-3"
                      >
                        <span className="material-symbols-outlined text-amber-300 text-2xl">shield</span>
                        <span className="font-black text-xs text-amber-100 uppercase">Hạng 3</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Full Leaderboard Table */}
              <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-xs">
                <div className="flex items-center justify-between px-5 py-3 bg-slate-50 border-b border-slate-200">
                  <span className="font-headline-sm text-xs font-bold text-slate-700 uppercase">
                    Bảng Tổng Sắp Liên Trường
                  </span>
                  <button
                    onClick={handleSubmitTestXp}
                    className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-label-mono text-[11px] font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                    data-testid="btn-test-xp"
                  >
                    <span className="material-symbols-outlined text-xs">add</span>
                    <span>Nạp +150 XP (HUST)</span>
                  </button>
                </div>

                <div className="divide-y divide-slate-100">
                  {rankings.map((uni) => (
                    <div
                      key={uni.id}
                      className={`flex items-center justify-between px-5 py-3.5 transition-colors ${
                        uni.id === 'HUST' ? 'bg-indigo-50/60 font-semibold' : 'hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-xs font-bold ${
                            uni.rank === 1
                              ? 'bg-amber-100 text-amber-800'
                              : uni.rank === 2
                              ? 'bg-slate-200 text-slate-800'
                              : uni.rank === 3
                              ? 'bg-amber-200 text-amber-900'
                              : 'text-slate-500'
                          }`}
                        >
                          {uni.rank}
                        </span>
                        <div>
                          <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                            <span>{uni.name}</span>
                            {uni.id === 'HUST' && (
                              <span className="px-1.5 py-0.5 rounded bg-indigo-200/80 text-indigo-800 text-[10px] font-normal">
                                Trường của bạn
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            {uni.totalStudents} sinh viên đang hoạt động
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="font-label-mono text-xs font-bold text-indigo-700">
                          {uni.totalXp.toLocaleString()} XP
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: INVENTORY & PERK STORE (AC 1) */}
          {activeTab === 'inventory' && (
            <div className="space-y-6">
              {/* Buy feedback toast */}
              {buyFeedback && (
                <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-semibold flex items-center gap-2 animate-fade-in">
                  <span className="material-symbols-outlined text-indigo-600 text-base">info</span>
                  <span>{buyFeedback}</span>
                </div>
              )}

              {/* Owned Inventory Deck */}
              <div>
                <h3 className="font-headline-sm text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-base text-indigo-600">inventory_2</span>
                  Trang Bị Đang Sở Hữu ({inventory.length})
                </h3>

                {inventory.length === 0 ? (
                  <div className="p-6 rounded-2xl bg-slate-50 border border-dashed border-slate-300 text-center text-slate-500 text-xs">
                    Túi đồ hiện đang trống. Hãy dùng Kim Cương để mở khóa Khiên Băng Đóng Băng Chuỗi hoặc Gậy Phonics bên dưới!
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {inventory.map((item) => (
                      <div
                        key={item.itemId}
                        className="p-4 rounded-2xl bg-gradient-to-br from-white to-slate-50 border-2 border-indigo-200 shadow-sm flex items-center gap-3 relative"
                        data-testid={`inventory-item-${item.itemId}`}
                      >
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-sky-400 to-indigo-600 text-white flex items-center justify-center shadow-md">
                          <span className="material-symbols-outlined text-2xl">
                            {item.itemId === 'streak_freeze' ? 'ac_unit' : 'auto_fix_high'}
                          </span>
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900">{item.name}</div>
                          <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
                            <span className="material-symbols-outlined text-xs">check_circle</span>
                            <span>Số lượng: {item.quantity}</span>
                          </div>
                        </div>
                        {item.itemId === 'streak_freeze' && (
                          <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded-full bg-cyan-100 text-cyan-800 text-[9px] font-mono font-bold animate-pulse">
                            ACTIVE
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Perk Store Items */}
              <div>
                <h3 className="font-headline-sm text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-base text-amber-500">storefront</span>
                  Cửa Hàng Vật Phẩm & Phép Thuật (Perk Store)
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {catalog.map((perk) => {
                    const canAfford = gemsBalance >= perk.costGems;
                    return (
                      <div
                        key={perk.id}
                        className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between hover:border-indigo-300 transition-all"
                        data-testid={`perk-card-${perk.id}`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${perk.badgeGradient} text-white flex items-center justify-center shadow-md`}>
                              <span className="material-symbols-outlined text-2xl">{perk.icon}</span>
                            </div>
                            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 font-label-mono text-xs font-bold">
                              <span className="material-symbols-outlined text-sm text-amber-500" style={{ fontVariationSettings: "'FILL' 1" }}>
                                diamond
                              </span>
                              <span>{perk.costGems}</span>
                            </div>
                          </div>

                          <h4 className="font-headline-sm text-xs font-bold text-slate-900 leading-snug">
                            {perk.name}
                          </h4>
                          <p className="text-[11px] text-slate-600 mt-1 line-clamp-2">
                            {perk.description}
                          </p>

                          <div className="mt-3 p-2 rounded-xl bg-slate-50 text-[10px] text-indigo-700 font-mono font-semibold">
                            ⚡ {perk.effect}
                          </div>
                        </div>

                        <button
                          onClick={() => handleBuyItem(perk.id)}
                          disabled={!canAfford}
                          className={`mt-4 w-full py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                            canAfford
                              ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
                              : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                          }`}
                          data-testid={`buy-btn-${perk.id}`}
                        >
                          <span className="material-symbols-outlined text-sm">shopping_bag</span>
                          <span>{canAfford ? 'Mua Ngay' : 'Không Đủ Kim Cương'}</span>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Pinned Personal Rank Footer (AC 3) */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between px-6 py-3.5 bg-gradient-to-r from-indigo-900 to-slate-900 text-white border-t border-indigo-950 shadow-lg"
          data-testid="personal-rank-footer"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/30 border border-indigo-400/40 flex items-center justify-center text-amber-400 font-black text-sm">
              #14
            </div>
            <div>
              <div className="text-xs font-extrabold text-amber-300">
                {personalRank?.rankText || 'Bạn đang xếp hạng 14 trong 820 sinh viên ĐH Bách Khoa Hà Nội'}
              </div>
              <div className="text-[10px] text-indigo-200">
                Chỉ còn 350 XP nữa để bứt phá vào Top 10 Bách Khoa!
              </div>
            </div>
          </div>

          <div className="mt-2 sm:mt-0 flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
