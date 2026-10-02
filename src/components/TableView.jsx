import React, { useState } from 'react';
import {
  ArrowUpDown,
  ChevronDown,
  CheckSquare,
  Code2,
  Trash2,
  ExternalLink,
  Plus,
  Copy,
  Check
} from 'lucide-react';
import { MOSCOW_PRIORITIES, STATUSES, EPIC_COLORS } from '../constants/sampleData';
import { copyToClipboard } from '../utils/exportUtils';

export default function TableView({
  epics,
  stories,
  onStoryClick,
  onStatusChange,
  onDeleteStory,
  onAddStory
}) {
  const [sortField, setSortField] = useState('id');
  const [sortAsc, setSortAsc] = useState(true);
  const [copiedId, setCopiedId] = useState(null);

  const priorityWeights = { must: 4, should: 3, could: 2, wont: 1 };
  const statusWeights = { backlog: 1, todo: 2, 'in-progress': 3, done: 4 };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const sortedStories = [...stories].sort((a, b) => {
    let comparison = 0;
    if (sortField === 'id') {
      comparison = a.id.localeCompare(b.id);
    } else if (sortField === 'title') {
      comparison = a.title.localeCompare(b.title);
    } else if (sortField === 'priority') {
      comparison = (priorityWeights[a.priority] || 0) - (priorityWeights[b.priority] || 0);
    } else if (sortField === 'points') {
      comparison = (Number(a.points) || 0) - (Number(b.points) || 0);
    } else if (sortField === 'status') {
      comparison = (statusWeights[a.status] || 0) - (statusWeights[b.status] || 0);
    }
    return sortAsc ? comparison : -comparison;
  });

  const handleCopyId = async (e, id) => {
    e.stopPropagation();
    await copyToClipboard(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="flex-1 p-4 sm:p-6 overflow-x-auto">
      <div className="max-w-[1720px] mx-auto bg-slate-900/60 rounded-2xl border border-slate-800 overflow-hidden shadow-lg">
        {/* Table Header Action Bar */}
        <div className="p-3.5 border-b border-slate-800 bg-slate-900/80 flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Agile Backlog Records
            </h3>
            <span className="text-xs font-mono text-slate-500">
              ({stories.length} stories)
            </span>
          </div>

          <button
            onClick={onAddStory}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-sm transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Story</span>
          </button>
        </div>

        {/* Dense Table */}
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 font-semibold select-none">
              <th
                onClick={() => handleSort('id')}
                className="py-3 px-4 cursor-pointer hover:text-white transition-colors w-28"
              >
                <div className="flex items-center gap-1">
                  <span>ID</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-500" />
                </div>
              </th>

              <th
                onClick={() => handleSort('title')}
                className="py-3 px-4 cursor-pointer hover:text-white transition-colors"
              >
                <div className="flex items-center gap-1">
                  <span>Story Summary & Persona</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-500" />
                </div>
              </th>

              <th className="py-3 px-4 w-44">Epic</th>

              <th
                onClick={() => handleSort('priority')}
                className="py-3 px-4 cursor-pointer hover:text-white transition-colors w-32"
              >
                <div className="flex items-center gap-1">
                  <span>Priority</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-500" />
                </div>
              </th>

              <th
                onClick={() => handleSort('points')}
                className="py-3 px-4 cursor-pointer hover:text-white transition-colors w-28 text-center"
              >
                <div className="flex items-center justify-center gap-1">
                  <span>Size / Pts</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-500" />
                </div>
              </th>

              <th className="py-3 px-4 w-32 text-center">Progress</th>

              <th
                onClick={() => handleSort('status')}
                className="py-3 px-4 cursor-pointer hover:text-white transition-colors w-36"
              >
                <div className="flex items-center gap-1">
                  <span>Status</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-500" />
                </div>
              </th>

              <th className="py-3 px-4 w-20 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800/60">
            {sortedStories.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-12 text-center text-slate-500">
                  No stories match your filter criteria.
                </td>
              </tr>
            ) : (
              sortedStories.map((story) => {
                const epic = epics.find((e) => e.id === story.epicId);
                const epicColor = epic
                  ? EPIC_COLORS.find((c) => c.id === epic.color) || EPIC_COLORS[0]
                  : null;
                const priority = MOSCOW_PRIORITIES[story.priority] || MOSCOW_PRIORITIES.should;
                const status = STATUSES[story.status] || STATUSES.todo;

                const totalAc = story.acceptanceCriteria?.length || 0;
                const doneAc = story.acceptanceCriteria?.filter((a) => a.completed).length || 0;

                const totalTasks = story.technicalTasks?.length || 0;
                const doneTasks = story.technicalTasks?.filter((t) => t.completed).length || 0;

                return (
                  <tr
                    key={story.id}
                    onClick={() => onStoryClick(story)}
                    className="group hover:bg-slate-800/40 cursor-pointer transition-colors"
                  >
                    {/* Story ID */}
                    <td className="py-3 px-4 font-mono font-semibold text-slate-300">
                      <div className="flex items-center gap-1.5">
                        <span>{story.id}</span>
                        <button
                          onClick={(e) => handleCopyId(e, story.id)}
                          className="opacity-0 group-hover:opacity-100 p-1 text-slate-500 hover:text-indigo-400 transition-opacity"
                          title="Copy Story ID"
                        >
                          {copiedId === story.id ? (
                            <Check className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                    </td>

                    {/* Title & Persona */}
                    <td className="py-3 px-4 max-w-md">
                      <div className="font-semibold text-slate-100 group-hover:text-white line-clamp-1">
                        {story.title}
                      </div>
                      {story.persona && (
                        <div className="text-[11px] text-slate-400 italic line-clamp-1 mt-0.5">
                          As a {story.persona}...
                        </div>
                      )}
                    </td>

                    {/* Epic */}
                    <td className="py-3 px-4">
                      {epic ? (
                        <span
                          className={`inline-block max-w-[160px] truncate text-[11px] font-medium px-2 py-0.5 rounded-full border ${epicColor?.badge}`}
                        >
                          {epic.title}
                        </span>
                      ) : (
                        <span className="text-slate-500 text-[11px]">Unassigned</span>
                      )}
                    </td>

                    {/* Priority */}
                    <td className="py-3 px-4">
                      <span
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${priority.badge}`}
                      >
                        {priority.label}
                      </span>
                    </td>

                    {/* Points */}
                    <td className="py-3 px-4 text-center font-mono">
                      <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700/60 font-semibold">
                        {story.size || 'M'} · {story.points || 0}pt
                      </span>
                    </td>

                    {/* AC & Tasks Progress */}
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-2 font-mono text-[11px]">
                        <span
                          className={`flex items-center gap-1 ${
                            doneAc === totalAc && totalAc > 0 ? 'text-emerald-400' : 'text-slate-400'
                          }`}
                          title="Acceptance Criteria completed"
                        >
                          <CheckSquare className="w-3 h-3" />
                          <span>
                            {doneAc}/{totalAc}
                          </span>
                        </span>
                        <span
                          className={`flex items-center gap-1 ${
                            doneTasks === totalTasks && totalTasks > 0
                              ? 'text-emerald-400'
                              : 'text-slate-400'
                          }`}
                          title="Technical Tasks completed"
                        >
                          <Code2 className="w-3 h-3" />
                          <span>
                            {doneTasks}/{totalTasks}
                          </span>
                        </span>
                      </div>
                    </td>

                    {/* Status Dropdown */}
                    <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                      <select
                        value={story.status}
                        onChange={(e) => onStatusChange(story.id, e.target.value)}
                        className={`text-[11px] font-medium rounded-lg px-2.5 py-1 border bg-slate-900 cursor-pointer focus:outline-none focus:ring-1 focus:ring-indigo-500 ${status.bg}`}
                      >
                        {Object.entries(STATUSES).map(([key, val]) => (
                          <option key={key} value={key} className="bg-slate-900 text-slate-200">
                            {val.label}
                          </option>
                        ))}
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => onStoryClick(story)}
                          className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                          title="View Details"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onDeleteStory(story.id)}
                          className="p-1 rounded text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                          title="Delete Story"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
