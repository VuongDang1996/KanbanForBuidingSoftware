import React, { useState, useEffect } from 'react';
import { X, Layers, Check } from 'lucide-react';
import { EPIC_COLORS } from '../constants/sampleData';

export default function EpicModal({
  isOpen,
  onClose,
  onSave,
  epicToEdit = null
}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('indigo');

  useEffect(() => {
    if (epicToEdit) {
      setTitle(epicToEdit.title || '');
      setDescription(epicToEdit.description || '');
      setColor(epicToEdit.color || 'indigo');
    } else {
      setTitle('');
      setDescription('');
      setColor('indigo');
    }
  }, [epicToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSave({
      id: epicToEdit ? epicToEdit.id : `epic-${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      color
    });
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
      <div className="relative bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl max-w-md w-full p-5 sm:p-6 z-10">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
              <Layers className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-white">
              {epicToEdit ? 'Edit Epic Backbone' : 'New Architectural Epic'}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Epic Title *
            </label>
            <input
              type="text"
              required
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Subscription & Checkout Architecture"
              className="w-full text-xs sm:text-sm rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Description / Scope
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Core value proposition and customer outcomes delivered in this epic..."
              className="w-full text-xs rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Color Accent
            </label>
            <div className="flex items-center gap-3">
              {EPIC_COLORS.map((c) => {
                const isSelected = color === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setColor(c.id)}
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                      isSelected ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-900 scale-110' : 'opacity-70 hover:opacity-100'
                    } ${c.badge.split(' ')[0]}`}
                    title={c.name}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
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
              className="px-4 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-all disabled:opacity-50 shadow-sm"
            >
              {epicToEdit ? 'Save Changes' : 'Create Epic'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
