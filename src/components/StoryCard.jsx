import React from 'react';
import {
  CheckSquare,
  CheckCircle2,
  Code2,
  ChevronLeft,
  ChevronRight,
  User
} from 'lucide-react';
import { MOSCOW_PRIORITIES, STATUSES } from '../constants/sampleData';

const LIGHT_PRIORITY_BADGES = {
  must: 'bg-rose-50 text-rose-700 border-rose-200 font-semibold',
  should: 'bg-amber-50 text-amber-800 border-amber-200 font-semibold',
  could: 'bg-sky-50 text-sky-700 border-sky-200 font-semibold',
  wont: 'bg-slate-100 text-slate-600 border-slate-200 font-medium'
};

export default function StoryCard({
  story,
  epic,
  onClick,
  onStatusChange,
  showEpicBadge = false,
  showQuickMove = true,
  theme = 'light'
}) {
  const isLight = theme === 'light';
  const priorityInfo = MOSCOW_PRIORITIES[story.priority] || MOSCOW_PRIORITIES.should;
  const statusInfo = STATUSES[story.status] || STATUSES.todo;

  const totalAc = story.acceptanceCriteria ? story.acceptanceCriteria.length : 0;
  const completedAc = story.acceptanceCriteria ? story.acceptanceCriteria.filter(a => a.completed).length : 0;

  const totalTasks = story.technicalTasks ? story.technicalTasks.length : 0;
  const completedTasks = story.technicalTasks ? story.technicalTasks.filter(t => t.completed).length : 0;

  // Status transitions
  const statusKeys = ['backlog', 'todo', 'in-progress', 'done'];
  const currentIndex = statusKeys.indexOf(story.status);

  const handlePrevStatus = (e) => {
    e.stopPropagation();
    if (currentIndex > 0) {
      onStatusChange(story.id, statusKeys[currentIndex - 1]);
    }
  };

  const handleNextStatus = (e) => {
    e.stopPropagation();
    if (currentIndex < statusKeys.length - 1) {
      onStatusChange(story.id, statusKeys[currentIndex + 1]);
    }
  };

  return (
    <div
      onClick={() => onClick(story)}
      className={`group relative rounded-xl p-3.5 cursor-pointer transition-all duration-200 flex flex-col gap-2.5 ${
        isLight
          ? 'bg-white hover:bg-slate-50/80 border border-slate-200 hover:border-slate-300 shadow-2xs hover:shadow-md'
          : 'bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-slate-700/80 shadow-sm hover:shadow-glow-sm'
      }`}
    >
      {/* Top Header: ID, Priority, Size */}
      <div className="flex items-center justify-between gap-1.5 flex-wrap">
        <div className="flex items-center gap-1.5">
          <span
            className={`font-mono text-[11px] font-semibold px-1.5 py-0.5 rounded border ${
              isLight
                ? 'text-slate-700 bg-slate-100 border-slate-200'
                : 'text-slate-400 bg-slate-800 border-slate-700/60'
            }`}
          >
            {story.id}
          </span>
          <span
            className={`text-[10px] px-2 py-0.5 rounded-full border ${
              isLight
                ? (LIGHT_PRIORITY_BADGES[story.priority] || LIGHT_PRIORITY_BADGES.should)
                : `${priorityInfo.badge} font-semibold`
            }`}
            title={priorityInfo.description}
          >
            {priorityInfo.shortLabel}
          </span>
        </div>

        <div className="flex items-center gap-1">
          {story.points && (
            <span
              className={`text-[10px] font-mono font-medium px-1.5 py-0.5 rounded border ${
                isLight
                  ? 'text-slate-600 bg-slate-100 border-slate-200'
                  : 'text-slate-400 bg-slate-800/80 border-slate-700/40'
              }`}
            >
              {story.size || 'M'} · {story.points}pt
            </span>
          )}
        </div>
      </div>

      {/* Optional Epic Badge */}
      {showEpicBadge && epic && (
        <div className="flex items-center gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full ${isLight ? 'bg-rose-500' : 'bg-indigo-400'}`} />
          <span
            className={`text-[11px] font-semibold truncate max-w-[220px] ${
              isLight ? 'text-rose-600' : 'text-indigo-300'
            }`}
          >
            {epic.title}
          </span>
        </div>
      )}

      {/* Title */}
      <h4
        className={`text-xs sm:text-sm font-semibold leading-snug line-clamp-2 transition-colors ${
          isLight
            ? 'text-slate-900 group-hover:text-rose-600'
            : 'text-slate-100 group-hover:text-white'
        }`}
      >
        {story.title}
      </h4>

      {/* Persona Pill */}
      {story.persona && (
        <div className={`flex items-center gap-1.5 text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
          <User className={`w-3 h-3 flex-shrink-0 ${isLight ? 'text-slate-400' : 'text-slate-500'}`} />
          <span className="truncate italic">As a {story.persona}...</span>
        </div>
      )}

      {/* Footer Metrics & Actions */}
      <div
        className={`mt-1 pt-2 border-t flex items-center justify-between gap-2 text-[11px] ${
          isLight ? 'border-slate-100 text-slate-500' : 'border-slate-800/80 text-slate-400'
        }`}
      >
        {/* Status badge */}
        <div className="flex items-center gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full ${statusInfo.dot}`} />
          <span className={`text-[10px] font-medium ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
            {statusInfo.label}
          </span>
        </div>

        {/* AC & Tasks Counters */}
        <div className="flex items-center gap-2 font-mono text-[10px]">
          {totalAc > 0 && (
            <span
              className={`flex items-center gap-1 ${
                completedAc === totalAc
                  ? (isLight ? 'text-emerald-600 font-semibold' : 'text-emerald-400')
                  : (isLight ? 'text-slate-500' : 'text-slate-400')
              }`}
              title="Acceptance Criteria completed"
            >
              <CheckSquare className="w-3 h-3" />
              <span>
                {completedAc}/{totalAc}
              </span>
            </span>
          )}

          {totalTasks > 0 && (
            <span
              className={`flex items-center gap-1 ${
                completedTasks === totalTasks
                  ? (isLight ? 'text-emerald-600 font-semibold' : 'text-emerald-400')
                  : (isLight ? 'text-slate-500' : 'text-slate-400')
              }`}
              title="Technical Tasks completed"
            >
              <Code2 className="w-3 h-3" />
              <span>
                {completedTasks}/{totalTasks}
              </span>
            </span>
          )}
        </div>

        {/* Quick move buttons */}
        {showQuickMove && (
          <div className="flex items-center gap-0.5 opacity-60 group-hover:opacity-100 transition-opacity">
            {currentIndex > 0 && (
              <button
                onClick={handlePrevStatus}
                className={`p-1 rounded transition-colors ${
                  isLight
                    ? 'hover:bg-slate-100 text-slate-400 hover:text-slate-700'
                    : 'hover:bg-slate-800 text-slate-400 hover:text-white'
                }`}
                title={`Move to ${statusKeys[currentIndex - 1]}`}
              >
                <ChevronLeft className="w-3 h-3" />
              </button>
            )}
            {currentIndex < statusKeys.length - 1 && (
              <button
                onClick={handleNextStatus}
                className={`p-1 rounded transition-colors ${
                  isLight
                    ? 'hover:bg-slate-100 text-slate-400 hover:text-slate-700'
                    : 'hover:bg-slate-800 text-slate-400 hover:text-white'
                }`}
                title={`Move to ${statusKeys[currentIndex + 1]}`}
              >
                <ChevronRight className="w-3 h-3" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
