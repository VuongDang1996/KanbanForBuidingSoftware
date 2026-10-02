import React from 'react';
import {
  Plus,
  MoreHorizontal,
  Flame,
  Star,
  Sparkles,
  Archive,
  Edit2,
  Trash2,
  Layers
} from 'lucide-react';
import StoryCard from './StoryCard';
import { MOSCOW_PRIORITIES, EPIC_COLORS } from '../constants/sampleData';

export default function StoryMapMatrix({
  epics,
  stories,
  onStoryClick,
  onStatusChange,
  onAddStoryToEpic,
  onEditEpic,
  onDeleteEpic,
  onAddEpic
}) {
  // Priority ordering helper
  const priorityOrder = { must: 0, should: 1, could: 2, wont: 3 };

  return (
    <div className="flex-1 overflow-x-auto p-4 sm:p-6">
      {epics.length === 0 ? (
        <div className="h-96 flex flex-col items-center justify-center text-center max-w-md mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
            <Layers className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-slate-100">No Epics Created Yet</h3>
          <p className="text-xs text-slate-400 mt-1 mb-4">
            Start by adding an architectural Epic or decompose your product idea using the AI intake generator.
          </p>
          <button
            onClick={onAddEpic}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-sm transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create First Epic</span>
          </button>
        </div>
      ) : (
        <div className="flex items-start gap-5 min-w-max pb-8">
          {epics.map((epic) => {
            const colorConfig = EPIC_COLORS.find(c => c.id === epic.color) || EPIC_COLORS[0];
            const epicStories = stories
              .filter(s => s.epicId === epic.id)
              .sort((a, b) => (priorityOrder[a.priority] ?? 99) - (priorityOrder[b.priority] ?? 99));

            const totalPoints = epicStories.reduce((acc, s) => acc + (Number(s.points) || 0), 0);
            const mustCount = epicStories.filter(s => s.priority === 'must').length;
            const shouldCount = epicStories.filter(s => s.priority === 'should').length;
            const couldCount = epicStories.filter(s => s.priority === 'could').length;

            return (
              <div
                key={epic.id}
                className="w-80 sm:w-96 flex-shrink-0 flex flex-col bg-slate-900/60 rounded-2xl border border-slate-800/90 overflow-hidden shadow-lg"
              >
                {/* Epic Column Header */}
                <div className={`p-4 border-b border-slate-800 ${colorConfig.headerBg} relative`}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`w-2.5 h-2.5 rounded-full ${colorConfig.badge.split(' ')[0]} ring-2 ring-white/20`} />
                        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                          Epic Backbone
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-white leading-tight">
                        {epic.title}
                      </h3>
                      {epic.description && (
                        <p className="text-xs text-slate-300/80 mt-1 line-clamp-2 leading-relaxed">
                          {epic.description}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onEditEpic(epic)}
                        className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
                        title="Edit Epic"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onDeleteEpic(epic.id)}
                        className="p-1 rounded text-slate-400 hover:text-rose-400 hover:bg-slate-800/80 transition-colors"
                        title="Delete Epic"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Epic Stats & Priority Pills */}
                  <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-200">
                        {epicStories.length} {epicStories.length === 1 ? 'story' : 'stories'}
                      </span>
                      <span>·</span>
                      <span className="font-mono text-indigo-300 font-semibold">
                        {totalPoints} pts
                      </span>
                    </div>

                    <div className="flex items-center gap-1 font-mono text-[10px]">
                      {mustCount > 0 && (
                        <span className="px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30" title="Must-Have stories">
                          {mustCount}M
                        </span>
                      )}
                      {shouldCount > 0 && (
                        <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30" title="Should-Have stories">
                          {shouldCount}S
                        </span>
                      )}
                      {couldCount > 0 && (
                        <span className="px-1.5 py-0.2 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30" title="Could-Have stories">
                          {couldCount}C
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Quick Add Story button directly under Epic Header */}
                <div className="p-2 border-b border-slate-800/60 bg-slate-900/40">
                  <button
                    onClick={() => onAddStoryToEpic(epic.id)}
                    className="w-full py-1.5 px-3 rounded-lg border border-dashed border-slate-700/80 hover:border-indigo-500/50 hover:bg-indigo-500/10 text-xs font-medium text-slate-300 hover:text-indigo-200 flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Plus className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Add Story to {epic.title.split(' ')[0]}</span>
                  </button>
                </div>

                {/* Vertically Stacked Story Cards Ordered by MoSCoW */}
                <div className="p-3 flex flex-col gap-3 overflow-y-auto max-h-[calc(100vh-270px)]">
                  {epicStories.length === 0 ? (
                    <div className="py-8 text-center text-xs text-slate-500">
                      No stories mapped yet. Click above to add one.
                    </div>
                  ) : (
                    epicStories.map((story) => (
                      <StoryCard
                        key={story.id}
                        story={story}
                        epic={epic}
                        onClick={onStoryClick}
                        onStatusChange={onStatusChange}
                        showEpicBadge={false}
                        showQuickMove={true}
                      />
                    ))
                  )}
                </div>
              </div>
            );
          })}

          {/* Add Epic Column Button */}
          <div className="w-72 flex-shrink-0">
            <button
              onClick={onAddEpic}
              className="w-full h-44 rounded-2xl border-2 border-dashed border-slate-800 hover:border-indigo-500/60 hover:bg-slate-900/40 flex flex-col items-center justify-center gap-2 text-slate-400 hover:text-indigo-300 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-800 group-hover:bg-indigo-600/20 border border-slate-700 group-hover:border-indigo-500/40 flex items-center justify-center transition-all">
                <Plus className="w-5 h-5 group-hover:text-indigo-400" />
              </div>
              <span className="text-xs font-semibold">Add Architectural Epic</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
