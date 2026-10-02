import React, { useState } from 'react';
import {
  Layers,
  Sparkles,
  Plus,
  Download,
  RotateCcw,
  FilePlus2,
  CheckCircle2,
  Edit2,
  Check,
  X,
  Database,
  HardDrive,
  Mic,
  ChevronDown,
  User,
  Flame,
  BarChart3
} from 'lucide-react';

export default function Header({
  project,
  dbStatus,
  currentUser,
  onOpenAuthModal,
  onUpdateProjectName,
  onOpenIdeaGenerator,
  onResetToDefault,
  onOpenExport,
  onAddEpic,
  onAddStory
}) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(project.name);

  const totalEpics = project.epics.length;
  const totalStories = project.stories.length;
  const totalPoints = project.stories.reduce((acc, s) => acc + (Number(s.points) || 0), 0);
  const completedStories = project.stories.filter(s => s.status === 'done').length;
  const completionPercent = totalStories > 0 ? Math.round((completedStories / totalStories) * 100) : 0;

  const handleSaveName = () => {
    if (nameInput.trim()) {
      onUpdateProjectName(nameInput.trim());
    } else {
      setNameInput(project.name);
    }
    setIsEditingName(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSaveName();
    if (e.key === 'Escape') {
      setNameInput(project.name);
      setIsEditingName(false);
    }
  };

  return (
    <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-30">
      {/* Top Bar */}
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 py-3">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Logo & Project Switcher */}
          <div className="flex items-center gap-3.5 flex-wrap">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-600 flex items-center justify-center shadow-glow-sm text-white font-bold ring-1 ring-white/20">
                <Layers className="w-5 h-5" />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                  StoryMapper
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-300 border border-rose-500/30 flex items-center gap-1">
                  <span>🇻🇳</span> Vietnamese English Pronunciation
                </span>
              </div>
            </div>

            <div className="hidden sm:block h-5 w-px bg-slate-800" />

            {/* Project Name & Quick Rename */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-slate-400">Project:</span>
              {isEditingName ? (
                <div className="flex items-center gap-1.5">
                  <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    className="bg-slate-800 border border-indigo-500/50 rounded-lg px-2.5 py-1 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 max-w-xs sm:max-w-md"
                  />
                  <button
                    onClick={handleSaveName}
                    className="p-1 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
                    title="Save title"
                  >
                    <Check className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      setNameInput(project.name);
                      setIsEditingName(false);
                    }}
                    className="p-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                    title="Cancel"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => {
                    setNameInput(project.name);
                    setIsEditingName(true);
                  }}
                  className="group flex items-center gap-2 px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 hover:border-slate-600 cursor-pointer transition-all max-w-[280px] sm:max-w-md truncate"
                  title="Click to rename project"
                >
                  <span className="text-sm font-semibold text-slate-200 group-hover:text-white truncate">
                    {project.name}
                  </span>
                  <Edit2 className="w-3 h-3 text-slate-500 group-hover:text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                </div>
              )}
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* AI Generator / Intake Button */}
            <button
              onClick={onOpenIdeaGenerator}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-indigo-300 bg-indigo-950/70 hover:bg-indigo-900/80 border border-indigo-500/40 hover:border-indigo-400 rounded-lg shadow-glow-sm transition-all"
              title="Decompose new startup or feature ideas with AI"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
              <span>AI Decompose Feature</span>
            </button>

            {/* Reset Roadmap to Default */}
            <button
              onClick={onResetToDefault}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-300 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 rounded-lg transition-colors"
              title="Reset backlog to default Vietnamese Pronunciation roadmap"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">Reset Roadmap</span>
            </button>

            {/* Export Backlog */}
            <button
              onClick={onOpenExport}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-750 border border-slate-700 hover:border-slate-500 rounded-lg transition-colors"
              title="Export to Jira CSV, Markdown, or JSON"
            >
              <Download className="w-3.5 h-3.5 text-slate-400" />
              <span>Export</span>
            </button>

            <div className="h-4 w-px bg-slate-800 hidden sm:block mx-1" />

            <button
              onClick={onAddEpic}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-indigo-200 bg-indigo-900/40 hover:bg-indigo-900/70 border border-indigo-800/60 rounded-lg transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Epic</span>
            </button>

            <button
              onClick={onAddStory}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-sm transition-all hover:shadow-glow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Story</span>
            </button>

            <div className="h-5 w-px bg-slate-800 hidden sm:block mx-1" />

            {/* User Account & Login / Progress Button */}
            <button
              onClick={onOpenAuthModal}
              className="flex items-center gap-2 p-1 pl-1.5 pr-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-800 border border-slate-700/80 hover:border-indigo-500/50 transition-all shadow-sm"
              title="Đăng nhập & Quản lý hồ sơ học viên"
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-sm shadow">
                {currentUser?.avatar || '👤'}
              </div>
              <div className="text-left hidden sm:block">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-white leading-none truncate max-w-[120px]">
                    {currentUser?.name || 'Đăng Nhập'}
                  </span>
                  {currentUser && (
                    <span className="text-[9px] px-1 py-0.2 rounded bg-amber-500 text-slate-950 font-black">
                      LV.{currentUser.level}
                    </span>
                  )}
                </div>
                {currentUser ? (
                  <span className="text-[10px] text-amber-400 font-medium flex items-center gap-0.5 leading-tight mt-0.5">
                    <Flame className="w-2.5 h-2.5 fill-amber-400" />
                    <span>{currentUser.streak} ngày streak</span>
                  </span>
                ) : (
                  <span className="text-[10px] text-slate-400">Xem tiến độ</span>
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Metadata Overview Bar & Database Status */}
        <div className="mt-3 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-slate-500">Epics:</span>
              <span className="font-semibold text-slate-200 bg-slate-800/90 px-2 py-0.5 rounded border border-slate-700/50">
                {totalEpics}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-500">Stories:</span>
              <span className="font-semibold text-slate-200 bg-slate-800/90 px-2 py-0.5 rounded border border-slate-700/50">
                {totalStories}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-500">Total Points:</span>
              <span className="font-semibold text-indigo-300 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-800/40 font-mono">
                {totalPoints} pts
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-500">Progress:</span>
              <div className="flex items-center gap-2">
                <div className="w-24 sm:w-32 bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-700/60">
                  <div
                    className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${completionPercent}%` }}
                  />
                </div>
                <span className="font-mono text-emerald-400 text-xs font-semibold">
                  {completionPercent}%
                </span>
                <span className="text-[11px] text-slate-500">
                  ({completedStories}/{totalStories} done)
                </span>
              </div>
            </div>
          </div>

          {/* Database Connection Status Badge */}
          <div className="flex items-center gap-2">
            {dbStatus?.connected ? (
              <div
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[11px]"
                title="Your backlog is continuously saved into a real SQLite database file (data/storymapper.db)"
              >
                <Database className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-semibold">SQLite Database</span>
                <span className="text-emerald-500/80 font-sans hidden md:inline">
                  (data/storymapper.db)
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-0.5" />
              </div>
            ) : (
              <div
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-[11px]"
                title="Backend API not detected; saving safely to browser LocalStorage"
              >
                <HardDrive className="w-3.5 h-3.5 text-amber-400" />
                <span>LocalStorage (Browser)</span>
                <span className="w-2 h-2 rounded-full bg-amber-400" />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
