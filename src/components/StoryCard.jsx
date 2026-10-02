import React from 'react';
import {
  CheckSquare,
  CheckCircle2,
  Code2,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  User,
  ArrowRight
} from 'lucide-react';
import { MOSCOW_PRIORITIES, STATUSES } from '../constants/sampleData';

export default function StoryCard({
  story,
  epic,
  onClick,
  onStatusChange,
  showEpicBadge = false,
  showQuickMove = true
}) {
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
      className="group relative bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-slate-700/80 rounded-xl p-3.5 cursor-pointer transition-all duration-200 shadow-sm hover:shadow-glow-sm flex flex-col gap-2.5"
    >
      {/* Top Header: ID, Priority, Size */}
      <div className="flex items-center justify-between gap-1.5 flex-wrap">
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-[11px] font-semibold text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700/60">
            {story.id}
          </span>
          <span
            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${priorityInfo.badge}`}
            title={priorityInfo.description}
          >
            {priorityInfo.shortLabel}
          </span>
        </div>

        <div className="flex items-center gap-1">
          {story.points && (
            <span className="text-[10px] font-mono font-medium text-slate-400 bg-slate-800/80 px-1.5 py-0.5 rounded border border-slate-700/40">
              {story.size || 'M'} · {story.points}pt
            </span>
          )}
        </div>
      </div>

      {/* Optional Epic Badge */}
      {showEpicBadge && epic && (
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
          <span className="text-[11px] font-medium text-indigo-300 truncate max-w-[220px]">
            {epic.title}
          </span>
        </div>
      )}

      {/* Title */}
      <h4 className="text-xs sm:text-sm font-semibold text-slate-100 group-hover:text-white leading-snug line-clamp-2">
        {story.title}
      </h4>

      {/* Persona Pill */}
      {story.persona && (
        <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
          <User className="w-3 h-3 text-slate-500 flex-shrink-0" />
          <span className="truncate italic">As a {story.persona}...</span>
        </div>
      )}

      {/* Footer Metrics & Actions */}
      <div className="mt-1 pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2 text-[11px] text-slate-400">
        
        {/* Status badge */}
        <div className="flex items-center gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full ${statusInfo.dot}`} />
          <span className="text-[10px] font-medium text-slate-300">
            {statusInfo.label}
          </span>
        </div>

        {/* AC & Tasks Counters */}
        <div className="flex items-center gap-2 font-mono text-[10px]">
          {totalAc > 0 && (
            <span
              className={`flex items-center gap-1 ${
                completedAc === totalAc ? 'text-emerald-400' : 'text-slate-400'
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
                completedTasks === totalTasks ? 'text-emerald-400' : 'text-slate-400'
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
                className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                title={`Move to ${statusKeys[currentIndex - 1]}`}
              >
                <ChevronLeft className="w-3 h-3" />
              </button>
            )}
            {currentIndex < statusKeys.length - 1 && (
              <button
                onClick={handleNextStatus}
                className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
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
