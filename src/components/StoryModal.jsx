import React, { useState, useEffect } from 'react';
import { X, Plus, User, CheckSquare, Code2, Tag } from 'lucide-react';
import {
  MOSCOW_PRIORITIES,
  STATUSES,
  T_SHIRT_SIZES,
  TASK_CATEGORIES
} from '../constants/sampleData';

export default function StoryModal({
  isOpen,
  onClose,
  epics,
  defaultEpicId,
  defaultStatus = 'backlog',
  onSave
}) {
  const [epicId, setEpicId] = useState('');
  const [title, setTitle] = useState('');
  const [persona, setPersona] = useState('');
  const [action, setAction] = useState('');
  const [value, setValue] = useState('');
  const [priority, setPriority] = useState('must');
  const [status, setStatus] = useState(defaultStatus);
  const [size, setSize] = useState('M');
  const [points, setPoints] = useState(5);
  const [initialAcGiven, setInitialAcGiven] = useState('');
  const [initialAcWhen, setInitialAcWhen] = useState('');
  const [initialAcThen, setInitialAcThen] = useState('');

  useEffect(() => {
    if (isOpen) {
      setEpicId(defaultEpicId || (epics.length > 0 ? epics[0].id : ''));
      setStatus(defaultStatus || 'backlog');
      setTitle('');
      setPersona('');
      setAction('');
      setValue('');
      setPriority('must');
      setSize('M');
      setPoints(5);
      setInitialAcGiven('');
      setInitialAcWhen('');
      setInitialAcThen('');
    }
  }, [isOpen, defaultEpicId, defaultStatus, epics]);

  if (!isOpen) return null;

  const handleSizeChange = (sz) => {
    setSize(sz);
    if (T_SHIRT_SIZES[sz]) {
      setPoints(T_SHIRT_SIZES[sz].points);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const acceptanceCriteria = [];
    if (initialAcGiven.trim() && initialAcWhen.trim() && initialAcThen.trim()) {
      acceptanceCriteria.push({
        id: `ac-${Date.now()}`,
        given: initialAcGiven.trim(),
        when: initialAcWhen.trim(),
        then: initialAcThen.trim(),
        completed: false
      });
    }

    const storyNumber = Math.floor(100 + Math.random() * 900);

    const newStory = {
      id: `STORY-${storyNumber}`,
      epicId: epicId || (epics[0] ? epics[0].id : 'epic-default'),
      title: title.trim(),
      persona: persona.trim() || 'User',
      action: action.trim() || title.trim(),
      value: value.trim() || 'achieve my product goals',
      priority,
      status,
      size,
      points: Number(points) || 3,
      acceptanceCriteria,
      technicalTasks: [
        { id: `t-${Date.now()}-1`, title: `Design & prototype ${title.trim()} UI`, category: 'Frontend', completed: false },
        { id: `t-${Date.now()}-2`, title: `Implement API endpoint and business logic`, category: 'Backend', completed: false }
      ],
      notes: ''
    };

    onSave(newStory);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl max-w-lg w-full p-5 sm:p-6 z-10 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-white">Create User Story</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-xs">
          {/* Epic & Status */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Target Epic *
              </label>
              <select
                value={epicId}
                onChange={(e) => setEpicId(e.target.value)}
                required
                className="w-full text-xs rounded-xl border border-slate-700 bg-slate-950 p-2 text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                {epics.map((epic) => (
                  <option key={epic.id} value={epic.id}>
                    {epic.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Initial Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full text-xs rounded-xl border border-slate-700 bg-slate-950 p-2 text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                {Object.entries(STATUSES).map(([key, val]) => (
                  <option key={key} value={key}>
                    {val.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Story Summary / Title *
            </label>
            <input
              type="text"
              required
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. 1-Click Subscription Pause & Skip Cycle"
              className="w-full text-xs sm:text-sm rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Agile Story Narrative */}
          <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-2">
            <span className="text-[10px] font-bold uppercase text-indigo-400">
              User Story Narrative (As a... I want to... So that...)
            </span>
            <div className="space-y-2">
              <input
                type="text"
                value={persona}
                onChange={(e) => setPersona(e.target.value)}
                placeholder="As a [Persona] (e.g. Traveling Member)..."
                className="w-full text-xs rounded-lg border border-slate-700 bg-slate-950 p-2 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
              <input
                type="text"
                value={action}
                onChange={(e) => setAction(e.target.value)}
                placeholder="I want to [Action] (e.g. pause upcoming coffee shipment)..."
                className="w-full text-xs rounded-lg border border-slate-700 bg-slate-950 p-2 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
              <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="So that [Value] (e.g. I avoid beans arriving while away)..."
                className="w-full text-xs rounded-lg border border-slate-700 bg-slate-950 p-2 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* MoSCoW Priority & Sizing */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                MoSCoW Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full text-xs rounded-xl border border-slate-700 bg-slate-950 p-2 text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                {Object.entries(MOSCOW_PRIORITIES).map(([key, val]) => (
                  <option key={key} value={key}>
                    {val.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                T-Shirt Size & Points
              </label>
              <div className="flex items-center gap-1.5">
                <div className="flex bg-slate-950 border border-slate-700 rounded-lg p-0.5">
                  {Object.keys(T_SHIRT_SIZES).map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => handleSizeChange(sz)}
                      className={`px-2 py-1 text-[10px] font-mono font-bold rounded ${
                        size === sz ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  min="1"
                  max="40"
                  value={points}
                  onChange={(e) => setPoints(Number(e.target.value))}
                  className="w-12 text-center font-mono rounded-lg border border-slate-700 bg-slate-950 py-1 text-indigo-300"
                />
              </div>
            </div>
          </div>

          {/* Initial Acceptance Criterion (Optional) */}
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <span className="text-[11px] font-semibold text-slate-400">
              Initial Acceptance Criterion (Gherkin format)
            </span>
            <div className="space-y-1.5">
              <input
                type="text"
                placeholder="Given [e.g. A user with an active delivery scheduled within 5 days]"
                value={initialAcGiven}
                onChange={(e) => setInitialAcGiven(e.target.value)}
                className="w-full text-xs bg-slate-900 border border-slate-800 rounded-lg p-1.5 text-slate-200"
              />
              <input
                type="text"
                placeholder="When [e.g. They click 'Skip Next Dispatch']"
                value={initialAcWhen}
                onChange={(e) => setInitialAcWhen(e.target.value)}
                className="w-full text-xs bg-slate-900 border border-slate-800 rounded-lg p-1.5 text-slate-200"
              />
              <input
                type="text"
                placeholder="Then [e.g. Next dispatch date advances by 1 cycle with zero charge]"
                value={initialAcThen}
                onChange={(e) => setInitialAcThen(e.target.value)}
                className="w-full text-xs bg-slate-900 border border-slate-800 rounded-lg p-1.5 text-slate-200"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="pt-2 border-t border-slate-800 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-750 border border-slate-700 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!title.trim()}
              className="px-4 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-all shadow-sm disabled:opacity-50"
            >
              Create Story
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
