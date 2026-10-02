import React, { useState } from 'react';
import {
  Sparkles,
  X,
  Coffee,
  BarChart3,
  ShoppingBag,
  Zap,
  ArrowRight,
  Layers,
  CheckCircle,
  Plus
} from 'lucide-react';
import { BACKLOG_PRESETS } from '../constants/presets';
import { generateBacklogFromPrompt } from '../utils/aiGenerator';

export default function IdeaGeneratorModal({
  isOpen,
  onClose,
  onApplyBacklog,
  onOpenManualAddEpic,
  onOpenManualAddStory
}) {
  const [promptText, setPromptText] = useState('');
  const [selectedPresetId, setSelectedPresetId] = useState(null);
  const [importMode, setImportMode] = useState('replace'); // 'replace' or 'append'
  const [isGenerating, setIsGenerating] = useState(false);
  const [progressStep, setProgressStep] = useState('');
  const [progressPercent, setProgressPercent] = useState(0);

  if (!isOpen) return null;

  const handleSelectPreset = (preset) => {
    setSelectedPresetId(preset.id);
    setPromptText(preset.prompt);
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!promptText.trim()) return;

    setIsGenerating(true);
    setProgressPercent(10);
    setProgressStep('Analyzing product vision...');

    // If preset selected and prompt unchanged, use preset's rich data
    const matchedPreset = BACKLOG_PRESETS.find(
      (p) => p.id === selectedPresetId && p.prompt.trim() === promptText.trim()
    );

    let generated;
    if (matchedPreset) {
      // Simulate progression
      const steps = [
        'Analyzing domain models & user personas...',
        'Decomposing requirements into Epics...',
        'Synthesizing MoSCoW stories and Gherkin specifications...',
        'Finalizing technical task breakdowns...'
      ];
      for (let i = 0; i < steps.length; i++) {
        setProgressStep(steps[i]);
        setProgressPercent(Math.round(((i + 1) / steps.length) * 100));
        await new Promise((r) => setTimeout(r, 220));
      }
      generated = {
        projectName: matchedPreset.name,
        projectDescription: matchedPreset.description,
        epics: matchedPreset.epics,
        stories: matchedPreset.stories
      };
    } else {
      generated = await generateBacklogFromPrompt(promptText, (step, pct) => {
        setProgressStep(step);
        setProgressPercent(pct);
      });
    }

    setIsGenerating(false);
    onApplyBacklog(generated, importMode);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={() => !isGenerating && onClose()}
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl max-w-2xl w-full p-5 sm:p-7 overflow-hidden z-10">
        
        {/* Glow accent */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-glow-sm text-white">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                AI Idea Intake & Backlog Generator
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Transform startup concepts into structured Epics, MoSCoW User Stories, Gherkin specs, and engineering tasks.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            disabled={isGenerating}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors disabled:opacity-50"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Presets */}
        <div className="mb-5">
          <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            Quick Startup Presets (1-Click Test)
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {BACKLOG_PRESETS.map((preset) => {
              const isSelected = selectedPresetId === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handleSelectPreset(preset)}
                  disabled={isGenerating}
                  className={`p-2.5 rounded-xl border text-left flex flex-col gap-1 transition-all ${
                    isSelected
                      ? 'bg-indigo-950/60 border-indigo-500 text-white shadow-glow-sm'
                      : 'bg-slate-800/60 hover:bg-slate-800 border-slate-700/60 text-slate-300'
                  }`}
                >
                  <span className="text-[10px] font-semibold uppercase text-indigo-400">
                    {preset.badge}
                  </span>
                  <span className="text-xs font-bold truncate text-slate-100">
                    {preset.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Textarea Form */}
        <form onSubmit={handleGenerate} className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              Describe your startup or feature idea in 1–3 sentences:
            </label>
            <textarea
              rows={4}
              value={promptText}
              onChange={(e) => {
                setPromptText(e.target.value);
                setSelectedPresetId(null);
              }}
              placeholder="e.g. A peer-to-peer equipment rental marketplace for indie film crews with automated identity verification, insurance security deposits, and in-person barcode handoff scan..."
              disabled={isGenerating}
              className="w-full text-xs sm:text-sm rounded-xl border border-slate-700 bg-slate-950/80 p-3.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
            />
          </div>

          {/* Import Mode Radio */}
          <div className="flex items-center gap-4 text-xs text-slate-300">
            <span className="text-slate-400 font-medium">Target Backlog:</span>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="radio"
                name="importMode"
                value="replace"
                checked={importMode === 'replace'}
                onChange={() => setImportMode('replace')}
                className="text-indigo-600 focus:ring-indigo-500"
              />
              <span>Replace current project</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="radio"
                name="importMode"
                value="append"
                checked={importMode === 'append'}
                onChange={() => setImportMode('append')}
                className="text-indigo-600 focus:ring-indigo-500"
              />
              <span>Append to existing backlog</span>
            </label>
          </div>

          {/* Progress Indicator when Generating */}
          {isGenerating && (
            <div className="p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-800/60 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-indigo-300">
                <span className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 animate-spin text-indigo-400" />
                  <span>{progressStep}</span>
                </span>
                <span className="font-mono">{progressPercent}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-2 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>Or manually add:</span>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenManualAddEpic();
                }}
                className="text-indigo-400 hover:text-indigo-300 underline font-medium"
              >
                + Epic
              </button>
              <span>·</span>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenManualAddStory();
                }}
                className="text-indigo-400 hover:text-indigo-300 underline font-medium"
              >
                + Story
              </button>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                disabled={isGenerating}
                className="flex-1 sm:flex-initial px-4 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-750 border border-slate-700 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!promptText.trim() || isGenerating}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2 text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-xl shadow-glow-sm disabled:opacity-50 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isGenerating ? 'Decomposing...' : 'Generate Backlog'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
