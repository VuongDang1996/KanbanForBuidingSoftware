import React, { useState } from 'react';
import {
  Inbox,
  CircleDot,
  Clock,
  CheckCircle2,
  Plus
} from 'lucide-react';
import confetti from 'canvas-confetti';
import StoryCard from './StoryCard';
import { STATUSES } from '../constants/sampleData';

export default function KanbanBoard({
  epics,
  stories,
  onStoryClick,
  onStatusChange,
  onAddStoryWithStatus
}) {
  const [draggedStoryId, setDraggedStoryId] = useState(null);
  const [dragOverColumn, setDragOverColumn] = useState(null);

  const columns = [
    { id: 'backlog', title: 'Backlog', icon: Inbox, color: 'text-slate-400', borderColor: 'border-slate-700/60' },
    { id: 'todo', title: 'To Do', icon: CircleDot, color: 'text-sky-400', borderColor: 'border-sky-500/30' },
    { id: 'in-progress', title: 'In Progress', icon: Clock, color: 'text-amber-400', borderColor: 'border-amber-500/30' },
    { id: 'done', title: 'Done', icon: CheckCircle2, color: 'text-emerald-400', borderColor: 'border-emerald-500/30' }
  ];

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch (e) {
      // Fallback
    }
  };

  const handleStatusChangeWithConfetti = (storyId, newStatus) => {
    if (newStatus === 'done') {
      triggerConfetti();
    }
    onStatusChange(storyId, newStatus);
  };

  // Drag and Drop handlers
  const handleDragStart = (e, storyId) => {
    setDraggedStoryId(storyId);
    e.dataTransfer.setData('text/plain', storyId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, colId) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverColumn !== colId) {
      setDragOverColumn(colId);
    }
  };

  const handleDragLeave = () => {
    setDragOverColumn(null);
  };

  const handleDrop = (e, colId) => {
    e.preventDefault();
    const storyId = e.dataTransfer.getData('text/plain') || draggedStoryId;
    if (storyId) {
      handleStatusChangeWithConfetti(storyId, colId);
    }
    setDraggedStoryId(null);
    setDragOverColumn(null);
  };

  return (
    <div className="flex-1 overflow-x-auto p-4 sm:p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 min-w-[320px] md:min-w-0 pb-8">
        {columns.map((col) => {
          const colStories = stories.filter((s) => s.status === col.id);
          const colPoints = colStories.reduce((acc, s) => acc + (Number(s.points) || 0), 0);
          const IconComponent = col.icon;
          const isOver = dragOverColumn === col.id;

          return (
            <div
              key={col.id}
              onDragOver={(e) => handleDragOver(e, col.id)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, col.id)}
              className={`flex flex-col bg-slate-900/60 rounded-2xl border transition-all duration-200 overflow-hidden shadow-md ${
                isOver
                  ? 'border-indigo-500 ring-2 ring-indigo-500/20 bg-slate-900/90'
                  : 'border-slate-800'
              }`}
            >
              {/* Column Header */}
              <div className="p-3.5 border-b border-slate-800 bg-slate-900/80 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <IconComponent className={`w-4 h-4 ${col.color}`} />
                  <h3 className="text-xs font-bold text-slate-100 uppercase tracking-wider">
                    {col.title}
                  </h3>
                  <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700/60">
                    {colStories.length}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-mono text-slate-400">
                    {colPoints} pts
                  </span>
                  <button
                    onClick={() => onAddStoryWithStatus(col.id)}
                    className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                    title={`Add story in ${col.title}`}
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Cards Container */}
              <div className="p-3 flex flex-col gap-3 flex-1 overflow-y-auto min-h-[400px] max-h-[calc(100vh-250px)]">
                {colStories.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-slate-800/80 rounded-xl text-xs text-slate-500">
                    <span>Drop cards here or click + above</span>
                  </div>
                ) : (
                  colStories.map((story) => {
                    const epic = epics.find((e) => e.id === story.epicId);
                    return (
                      <div
                        key={story.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, story.id)}
                        className="cursor-grab active:cursor-grabbing"
                      >
                        <StoryCard
                          story={story}
                          epic={epic}
                          onClick={onStoryClick}
                          onStatusChange={handleStatusChangeWithConfetti}
                          showEpicBadge={true}
                          showQuickMove={true}
                        />
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
