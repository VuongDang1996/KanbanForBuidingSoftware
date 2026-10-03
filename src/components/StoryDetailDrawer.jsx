import React, { useState, useEffect } from 'react';
import {
  X,
  Trash2,
  Plus,
  CheckSquare,
  Square,
  Code2,
  User,
  Zap,
  Tag,
  Clock,
  Layers,
  Check,
  Sparkles,
  ChevronDown,
  Palette,
  ExternalLink,
  Eye,
  Link,
  Sliders,
  CheckCircle2
} from 'lucide-react';
import {
  MOSCOW_PRIORITIES,
  STATUSES,
  T_SHIRT_SIZES,
  TASK_CATEGORIES,
  EPIC_COLORS
} from '../constants/sampleData';

export default function StoryDetailDrawer({
  story,
  epics,
  isOpen,
  onClose,
  onSave,
  onDelete
}) {
  const [formData, setFormData] = useState(null);
  const [activeDrawerTab, setActiveDrawerTab] = useState('specs'); // 'specs' | 'ui'
  const [newGiven, setNewGiven] = useState('');
  const [newWhen, setNewWhen] = useState('');
  const [newThen, setNewThen] = useState('');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState('Frontend');
  const [isSaved, setIsSaved] = useState(false);
  const [isEditingNotes, setIsEditingNotes] = useState(false);

  useEffect(() => {
    if (story) {
      setFormData(JSON.parse(JSON.stringify(story)));
    }
  }, [story]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !formData) return null;

  const currentEpic = epics.find((e) => e.id === formData.epicId);
  const currentEpicColor = currentEpic
    ? EPIC_COLORS.find((c) => c.id === currentEpic.color) || EPIC_COLORS[0]
    : null;

  // Handlers for story fields
  const updateField = (field, value) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    onSave(updated);
    showSavedNotification();
  };

  const handleSizeChange = (sizeKey) => {
    const sizeObj = T_SHIRT_SIZES[sizeKey];
    const updated = {
      ...formData,
      size: sizeKey,
      points: sizeObj ? sizeObj.points : formData.points
    };
    setFormData(updated);
    onSave(updated);
    showSavedNotification();
  };

  const showSavedNotification = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 1200);
  };

  // Acceptance Criteria handlers
  const toggleAc = (acId) => {
    const updatedAc = (formData.acceptanceCriteria || []).map((ac) =>
      ac.id === acId ? { ...ac, completed: !ac.completed } : ac
    );
    const updated = { ...formData, acceptanceCriteria: updatedAc };
    setFormData(updated);
    onSave(updated);
    showSavedNotification();
  };

  const addAc = (e) => {
    e.preventDefault();
    if (!newGiven.trim() || !newWhen.trim() || !newThen.trim()) return;

    const newCriteria = {
      id: `ac-${Date.now()}`,
      given: newGiven.trim(),
      when: newWhen.trim(),
      then: newThen.trim(),
      completed: false
    };

    const updated = {
      ...formData,
      acceptanceCriteria: [...(formData.acceptanceCriteria || []), newCriteria]
    };
    setFormData(updated);
    onSave(updated);
    setNewGiven('');
    setNewWhen('');
    setNewThen('');
    showSavedNotification();
  };

  const removeAc = (acId) => {
    const updated = {
      ...formData,
      acceptanceCriteria: (formData.acceptanceCriteria || []).filter((a) => a.id !== acId)
    };
    setFormData(updated);
    onSave(updated);
    showSavedNotification();
  };

  // Technical Subtasks handlers
  const toggleTask = (taskId) => {
    const updatedTasks = (formData.technicalTasks || []).map((t) =>
      t.id === taskId ? { ...t, completed: !t.completed } : t
    );
    const updated = { ...formData, technicalTasks: updatedTasks };
    setFormData(updated);
    onSave(updated);
    showSavedNotification();
  };

  const addTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask = {
      id: `task-${Date.now()}`,
      title: newTaskTitle.trim(),
      category: newTaskCategory,
      completed: false
    };

    const updated = {
      ...formData,
      technicalTasks: [...(formData.technicalTasks || []), newTask]
    };
    setFormData(updated);
    onSave(updated);
    setNewTaskTitle('');
    showSavedNotification();
  };

  const removeTask = (taskId) => {
    const updated = {
      ...formData,
      technicalTasks: (formData.technicalTasks || []).filter((t) => t.id !== taskId)
    };
    setFormData(updated);
    onSave(updated);
    showSavedNotification();
  };

  // Progress metrics
  const totalAc = formData.acceptanceCriteria?.length || 0;
  const doneAc = formData.acceptanceCriteria?.filter((a) => a.completed).length || 0;
  const acPercent = totalAc > 0 ? Math.round((doneAc / totalAc) * 100) : 0;

  const totalTasks = formData.technicalTasks?.length || 0;
  const doneTasks = formData.technicalTasks?.filter((t) => t.completed).length || 0;
  const taskPercent = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/75 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer Container */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-2xl bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col justify-between overflow-hidden">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-900/95 sticky top-0 z-10">
            <div className="flex items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  {formData.id}
                </span>

                {/* Epic Dropdown Selector */}
                <select
                  value={formData.epicId}
                  onChange={(e) => updateField('epicId', e.target.value)}
                  className="text-xs font-semibold px-2.5 py-1 rounded-lg border border-slate-700 bg-slate-800 text-indigo-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  {epics.map((epic) => (
                    <option key={epic.id} value={epic.id}>
                      Epic: {epic.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                {isSaved && (
                  <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                    <Check className="w-3 h-3" />
                    <span>Saved</span>
                  </span>
                )}

                <button
                  onClick={() => onDelete(formData.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                  title="Delete Story"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  title="Close (Esc)"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Title Input */}
            <input
              type="text"
              value={formData.title}
              onChange={(e) => updateField('title', e.target.value)}
              placeholder="Story Title..."
              className="w-full text-base sm:text-lg font-bold text-white bg-transparent border-0 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 rounded px-1 py-0.5"
            />

            {/* Drawer Tab Switcher */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 mt-2.5">
              <button
                type="button"
                onClick={() => setActiveDrawerTab('specs')}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  activeDrawerTab === 'specs'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                📋 Story Narrative & Tasks
              </button>
              <button
                type="button"
                onClick={() => setActiveDrawerTab('ui')}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  activeDrawerTab === 'ui'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                🎨 UI Reference & Design Specs
              </button>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-4 sm:p-6 overflow-y-auto flex-1 flex flex-col gap-6">
            {activeDrawerTab === 'specs' ? (
              <>
            
            {/* Status & Priority & Sizing Matrix Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
              {/* Status */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => updateField('status', e.target.value)}
                  className="w-full text-xs font-medium rounded-lg px-2.5 py-1.5 border border-slate-700 bg-slate-800 text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  {Object.entries(STATUSES).map(([key, val]) => (
                    <option key={key} value={key}>
                      {val.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* MoSCoW Priority */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                  MoSCoW Priority
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) => updateField('priority', e.target.value)}
                  className="w-full text-xs font-semibold rounded-lg px-2.5 py-1.5 border border-slate-700 bg-slate-800 text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  {Object.entries(MOSCOW_PRIORITIES).map(([key, val]) => (
                    <option key={key} value={key}>
                      {val.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sizing & Points */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                  Size & Story Points
                </label>
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700">
                    {Object.keys(T_SHIRT_SIZES).map((sizeKey) => (
                      <button
                        key={sizeKey}
                        type="button"
                        onClick={() => handleSizeChange(sizeKey)}
                        className={`px-2 py-1 text-[10px] font-mono font-bold rounded ${
                          formData.size === sizeKey
                            ? 'bg-indigo-600 text-white shadow-sm'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {sizeKey}
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    min="1"
                    max="40"
                    value={formData.points || 1}
                    onChange={(e) => updateField('points', Number(e.target.value))}
                    className="w-14 text-center font-mono text-xs font-bold rounded-lg border border-slate-700 bg-slate-800 py-1 text-indigo-300"
                    title="Story Points"
                  />
                </div>
              </div>
            </div>

            {/* Persona & Value Formulation */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-indigo-400" />
                  <span>User Story Formulation</span>
                </h4>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-indigo-400 uppercase tracking-wide mb-1">
                      As a [Persona]
                    </label>
                    <input
                      type="text"
                      value={formData.persona || ''}
                      onChange={(e) => updateField('persona', e.target.value)}
                      placeholder="e.g. Specialty Coffee Drinker"
                      className="w-full text-xs rounded-lg border border-slate-700 bg-slate-900 px-2.5 py-1.5 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-indigo-400 uppercase tracking-wide mb-1">
                      I want to [Action]
                    </label>
                    <input
                      type="text"
                      value={formData.action || ''}
                      onChange={(e) => updateField('action', e.target.value)}
                      placeholder="e.g. customize delivery interval"
                      className="w-full text-xs rounded-lg border border-slate-700 bg-slate-900 px-2.5 py-1.5 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-indigo-400 uppercase tracking-wide mb-1">
                      So that [Value]
                    </label>
                    <input
                      type="text"
                      value={formData.value || ''}
                      onChange={(e) => updateField('value', e.target.value)}
                      placeholder="e.g. I never run out of beans"
                      className="w-full text-xs rounded-lg border border-slate-700 bg-slate-900 px-2.5 py-1.5 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                {/* Narrative Preview */}
                <div className="p-2.5 rounded-lg bg-indigo-950/30 border border-indigo-900/40 text-xs text-indigo-200 leading-relaxed italic">
                  &ldquo;As a <span className="font-semibold text-white">{formData.persona || '[Persona]'}</span>,
                  I want to <span className="font-semibold text-white">{formData.action || '[Action]'}</span>,
                  so that <span className="font-semibold text-white">{formData.value || '[Value]'}</span>.&rdquo;
                </div>
              </div>
            </div>

            {/* Acceptance Criteria Checklist (Gherkin) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                    <CheckSquare className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Acceptance Criteria (Gherkin)</span>
                  </h4>
                  <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                    {doneAc}/{totalAc} ({acPercent}%)
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              {totalAc > 0 && (
                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-emerald-400 h-full rounded-full transition-all duration-300"
                    style={{ width: `${acPercent}%` }}
                  />
                </div>
              )}

              {/* Criteria List */}
              <div className="space-y-2">
                {(formData.acceptanceCriteria || []).map((ac) => (
                  <div
                    key={ac.id}
                    className="group flex items-start gap-2.5 p-3 rounded-xl bg-slate-800/50 hover:bg-slate-800/80 border border-slate-700/60 transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => toggleAc(ac.id)}
                      className="mt-0.5 text-slate-400 hover:text-emerald-400 transition-colors flex-shrink-0"
                    >
                      {ac.completed ? (
                        <CheckSquare className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Square className="w-4 h-4" />
                      )}
                    </button>

                    <div className="flex-1 text-xs leading-relaxed">
                      <span className="font-semibold text-emerald-400 mr-1.5 font-mono">GIVEN</span>
                      <span className={ac.completed ? 'line-through text-slate-400' : 'text-slate-200'}>
                        {ac.given}
                      </span>
                      <span className="font-semibold text-emerald-400 mx-1.5 font-mono">WHEN</span>
                      <span className={ac.completed ? 'line-through text-slate-400' : 'text-slate-200'}>
                        {ac.when}
                      </span>
                      <span className="font-semibold text-emerald-400 mx-1.5 font-mono">THEN</span>
                      <span className={ac.completed ? 'line-through text-slate-400' : 'text-slate-200'}>
                        {ac.then}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeAc(ac.id)}
                      className="opacity-0 group-hover:opacity-100 p-1 text-slate-500 hover:text-rose-400 transition-opacity flex-shrink-0"
                      title="Delete Criterion"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add New Criterion Form */}
              <form onSubmit={addAc} className="p-3 rounded-xl bg-slate-900 border border-dashed border-slate-700/80 space-y-2">
                <span className="text-[11px] font-semibold text-slate-400">
                  + Add Gherkin Acceptance Criterion
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <input
                    type="text"
                    placeholder="Given [context]..."
                    value={newGiven}
                    onChange={(e) => setNewGiven(e.target.value)}
                    className="text-xs bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                  <input
                    type="text"
                    placeholder="When [action occurs]..."
                    value={newWhen}
                    onChange={(e) => setNewWhen(e.target.value)}
                    className="text-xs bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                  <input
                    type="text"
                    placeholder="Then [expected outcome]..."
                    value={newThen}
                    onChange={(e) => setNewThen(e.target.value)}
                    className="text-xs bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div className="flex justify-end pt-1">
                  <button
                    type="submit"
                    disabled={!newGiven.trim() || !newWhen.trim() || !newThen.trim()}
                    className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-500/40 rounded-lg disabled:opacity-50 disabled:pointer-events-none transition-all"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add Criterion</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Technical Subtasks Checklist */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Technical Subtasks</span>
                  </h4>
                  <span className="font-mono text-[10px] text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/30">
                    {doneTasks}/{totalTasks} ({taskPercent}%)
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              {totalTasks > 0 && (
                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-indigo-400 h-full rounded-full transition-all duration-300"
                    style={{ width: `${taskPercent}%` }}
                  />
                </div>
              )}

              {/* Task list */}
              <div className="space-y-2">
                {(formData.technicalTasks || []).map((t) => {
                  const catConfig = TASK_CATEGORIES.find((c) => c.id === t.category) || TASK_CATEGORIES[0];
                  return (
                    <div
                      key={t.id}
                      className="group flex items-center justify-between gap-2.5 p-2.5 rounded-xl bg-slate-800/50 hover:bg-slate-800/80 border border-slate-700/60 transition-colors"
                    >
                      <div className="flex items-center gap-2.5 flex-1 min-w-0">
                        <button
                          type="button"
                          onClick={() => toggleTask(t.id)}
                          className="text-slate-400 hover:text-indigo-400 transition-colors flex-shrink-0"
                        >
                          {t.completed ? (
                            <CheckSquare className="w-4 h-4 text-indigo-400" />
                          ) : (
                            <Square className="w-4 h-4" />
                          )}
                        </button>
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${catConfig.color}`}
                        >
                          {t.category}
                        </span>
                        <span
                          className={`text-xs leading-normal truncate ${
                            t.completed ? 'line-through text-slate-400' : 'text-slate-200'
                          }`}
                        >
                          {t.title}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeTask(t.id)}
                        className="opacity-0 group-hover:opacity-100 p-1 text-slate-500 hover:text-rose-400 transition-opacity"
                        title="Delete Task"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Add New Task Form */}
              <form onSubmit={addTask} className="p-3 rounded-xl bg-slate-900 border border-dashed border-slate-700/80 flex items-center gap-2">
                <select
                  value={newTaskCategory}
                  onChange={(e) => setNewTaskCategory(e.target.value)}
                  className="text-xs font-semibold rounded-lg px-2.5 py-1.5 border border-slate-700 bg-slate-800 text-indigo-300 focus:outline-none"
                >
                  {TASK_CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.id}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  placeholder="Technical task description (e.g. Add Redis cache layer)..."
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="flex-1 text-xs bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-indigo-500"
                />

                <button
                  type="submit"
                  disabled={!newTaskTitle.trim()}
                  className="px-3 py-1.5 text-xs font-semibold text-indigo-300 bg-indigo-950/60 hover:bg-indigo-900 border border-indigo-500/40 rounded-lg disabled:opacity-50 transition-all flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add Task</span>
                </button>
              </form>
            </div>

            {/* Implementation Notes & Technical Architecture Blueprint */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Technical Design & Architecture Blueprint</span>
                </label>
                <button
                  type="button"
                  onClick={() => setIsEditingNotes(!isEditingNotes)}
                  className="px-2.5 py-1 text-[11px] font-semibold text-indigo-300 bg-indigo-950/60 hover:bg-indigo-900/80 border border-indigo-500/40 rounded-lg transition-all flex items-center gap-1"
                >
                  {isEditingNotes ? (
                    <>
                      <Eye className="w-3 h-3" />
                      <span>Preview Blueprint</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      <span>Edit Raw Markdown</span>
                    </>
                  )}
                </button>
              </div>

              {isEditingNotes ? (
                <textarea
                  rows={8}
                  value={formData.notes || ''}
                  onChange={(e) => updateField('notes', e.target.value)}
                  placeholder="Architecture decisions, dependencies, mockups, or API links..."
                  className="w-full text-xs font-mono rounded-xl border border-slate-700 bg-slate-900 p-3.5 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 leading-relaxed"
                />
              ) : (
                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 max-h-96 overflow-y-auto">
                  <ArchitectureNotesViewer markdown={formData.notes} />
                </div>
              )}
            </div>
          </>
        ) : (
          /* UI Design Reference & Specs Tab */
          <div className="space-y-6">
            {/* Visual UI Mockup Preview */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-indigo-400" />
                  <span>UI Design & Wireframe Reference</span>
                </h4>
                <a
                  href={formData.uiMockupUrl || '/mockups/pronunciation_ui_mockup.jpg'}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-[11px] text-indigo-400 hover:text-indigo-300 underline"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>Open Full Size</span>
                </a>
              </div>

              <div className="rounded-xl overflow-hidden border border-slate-700/80 bg-slate-950 relative group">
                <img
                  src={formData.uiMockupUrl || '/mockups/pronunciation_ui_mockup.jpg'}
                  alt="UI Reference Mockup"
                  className="w-full h-auto max-h-72 object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.src = '/mockups/pronunciation_ui_mockup.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-3 py-1.5 rounded-lg bg-indigo-600/90 text-white text-xs font-semibold shadow-lg">
                    Click "Open Full Size" to inspect in HD
                  </span>
                </div>
              </div>
            </div>

            {/* Custom Figma / Wireframe Link Input */}
            <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-2">
              <label className="block text-[11px] font-bold text-indigo-400 uppercase tracking-wide flex items-center gap-1.5">
                <Link className="w-3.5 h-3.5" />
                <span>Figma Frame or UI Image URL</span>
              </label>
              <input
                type="url"
                value={formData.uiMockupUrl || ''}
                onChange={(e) => updateField('uiMockupUrl', e.target.value)}
                placeholder="https://www.figma.com/design/... or image URL"
                className="w-full text-xs rounded-lg border border-slate-700 bg-slate-900 px-2.5 py-1.5 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono"
              />
              <p className="text-[10px] text-slate-400">
                Attach your Figma frame or screenshot URL. Defaults to the built-in PhonoCraft UI design system.
              </p>
            </div>

            {/* UX Engineering State Checklist */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Frontend Component States to Build</span>
              </h4>
              <div className="space-y-1.5 text-xs text-slate-300 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                <label className="flex items-center gap-2 cursor-pointer hover:text-white">
                  <input type="checkbox" defaultChecked className="rounded border-slate-700 text-indigo-600 focus:ring-0" />
                  <span>1. Default / Idle State (Target sentence rendered with clean typography)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer hover:text-white">
                  <input type="checkbox" defaultChecked className="rounded border-slate-700 text-indigo-600 focus:ring-0" />
                  <span>2. Audio Recording State (Pulsing microphone button with live waveform audio feedback)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer hover:text-white">
                  <input type="checkbox" defaultChecked className="rounded border-slate-700 text-indigo-600 focus:ring-0" />
                  <span>3. Phoneme Heatmap Result (Green ≥85, Yellow 60-84, Red &lt;60 color tokens)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer hover:text-white">
                  <input type="checkbox" defaultChecked className="rounded border-slate-700 text-indigo-600 focus:ring-0" />
                  <span>4. Phoneme Error Diagnostic Modal (Shows detected substitution + audio sample)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer hover:text-white">
                  <input type="checkbox" defaultChecked className="rounded border-slate-700 text-indigo-600 focus:ring-0" />
                  <span>5. Dual Pitch Contour Curves (Target blue intonation line vs user gold line)</span>
                </label>
              </div>
            </div>

            {/* Design System CSS Tokens */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-indigo-400" />
                <span>Design Tokens & CSS Reference</span>
              </h4>
              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Background:</span>
                  <span className="text-white font-bold">#0a0f1d (Deep Slate)</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Accent Glow:</span>
                  <span className="text-indigo-400 font-bold">#6366f1 (Indigo)</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Correct Phoneme:</span>
                  <span className="text-emerald-400 font-bold">#10b981 (Emerald)</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Error Phoneme:</span>
                  <span className="text-rose-400 font-bold">#ef4444 (Rose)</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-800 bg-slate-900 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-400 font-mono text-[10px]">Esc</kbd> to close
            </span>
            <button
              onClick={onClose}
              className="px-4 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors shadow-sm"
            >
              Done Editing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ArchitectureNotesViewer({ markdown }) {
  if (!markdown || !markdown.trim()) {
    return <p className="text-xs text-slate-500 italic">No technical architecture notes provided.</p>;
  }

  const lines = markdown.split('\n');
  const elements = [];
  let inCodeBlock = false;
  let codeBuffer = [];
  let codeLang = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith('```')) {
      if (!inCodeBlock) {
        inCodeBlock = true;
        codeLang = line.replace('```', '').trim();
        codeBuffer = [];
      } else {
        inCodeBlock = false;
        elements.push(
          <div key={`code-block-${i}`} className="my-2 rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
            {codeLang && (
              <div className="px-3 py-1 bg-slate-900 border-b border-slate-800 text-[10px] font-mono text-indigo-400 font-bold uppercase flex items-center justify-between">
                <span>{codeLang}</span>
                <span className="text-slate-500 text-[9px]">Syntax Block</span>
              </div>
            )}
            <pre className="p-3 font-mono text-[11px] leading-relaxed text-indigo-200 overflow-x-auto whitespace-pre">
              {codeBuffer.join('\n')}
            </pre>
          </div>
        );
      }
      continue;
    }

    if (inCodeBlock) {
      codeBuffer.push(line);
      continue;
    }

    if (line.startsWith('### ')) {
      elements.push(
        <h4 key={`h3-${i}`} className="text-xs font-bold text-sky-400 uppercase tracking-wider mt-3.5 mb-1.5 flex items-center gap-1.5 border-b border-slate-800/80 pb-1">
          <span>{line.replace('### ', '')}</span>
        </h4>
      );
    } else if (line.startsWith('## ')) {
      elements.push(
        <h3 key={`h2-${i}`} className="text-sm font-extrabold text-white mt-4 mb-2">
          {line.replace('## ', '')}
        </h3>
      );
    } else if (line.startsWith('- ')) {
      const content = line.substring(2);
      elements.push(
        <li key={`li-${i}`} className="text-xs text-slate-300 ml-4 list-disc mb-1 leading-relaxed">
          {formatInlineMarkdown(content)}
        </li>
      );
    } else if (line.trim() === '---') {
      elements.push(<hr key={`hr-${i}`} className="my-2.5 border-slate-800" />);
    } else if (line.trim().length > 0) {
      elements.push(
        <p key={`p-${i}`} className="text-xs text-slate-300 mb-1 leading-relaxed">
          {formatInlineMarkdown(line)}
        </p>
      );
    }
  }

  return <div className="space-y-1">{elements}</div>;
}

function formatInlineMarkdown(text) {
  const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={idx} className="font-semibold text-slate-100">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code
          key={idx}
          className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-slate-800 text-rose-300 border border-slate-700"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}
