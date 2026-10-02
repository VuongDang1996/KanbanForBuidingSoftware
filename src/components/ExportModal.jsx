import React, { useState } from 'react';
import {
  X,
  FileSpreadsheet,
  FileText,
  FileCode,
  Download,
  Copy,
  Check,
  Upload,
  AlertCircle
} from 'lucide-react';
import {
  generateJiraCsv,
  generateMarkdown,
  generateRawJson,
  downloadFile,
  copyToClipboard
} from '../utils/exportUtils';

export default function ExportModal({
  isOpen,
  onClose,
  project,
  onImportProject
}) {
  const [activeTab, setActiveTab] = useState('csv'); // 'csv', 'markdown', 'json', 'import'
  const [copied, setCopied] = useState(false);
  const [importJsonText, setImportJsonText] = useState('');
  const [importError, setImportError] = useState('');

  if (!isOpen) return null;

  const csvContent = generateJiraCsv(project);
  const mdContent = generateMarkdown(project);
  const jsonContent = generateRawJson(project);

  const handleCopy = async (content) => {
    await copyToClipboard(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCsv = () => {
    const slug = (project.name || 'storymapper').toLowerCase().replace(/[^a-z0-9]/g, '-');
    downloadFile(csvContent, `${slug}-jira-backlog.csv`, 'text/csv;charset=utf-8;');
  };

  const handleDownloadMd = () => {
    const slug = (project.name || 'storymapper').toLowerCase().replace(/[^a-z0-9]/g, '-');
    downloadFile(mdContent, `${slug}-backlog.md`, 'text/markdown;charset=utf-8;');
  };

  const handleDownloadJson = () => {
    const slug = (project.name || 'storymapper').toLowerCase().replace(/[^a-z0-9]/g, '-');
    downloadFile(jsonContent, `${slug}-backlog.json`, 'application/json;charset=utf-8;');
  };

  const handleExecuteImport = () => {
    setImportError('');
    try {
      const parsed = JSON.parse(importJsonText);
      const projectData = parsed.project || parsed;
      if (!projectData.epics || !projectData.stories) {
        throw new Error('Invalid schema: Missing epics or stories arrays.');
      }
      onImportProject(projectData);
      onClose();
    } catch (err) {
      setImportError(err.message || 'Invalid JSON format');
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setImportJsonText(event.target?.result || '');
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl max-w-3xl w-full p-5 sm:p-7 overflow-hidden z-10 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white">
              Export & Share Backlog
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Export your product breakdown to standard project management tools or load existing JSON.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 pt-4 pb-2 border-b border-slate-800/80 overflow-x-auto">
          <button
            onClick={() => setActiveTab('csv')}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'csv'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Jira / GitHub CSV</span>
          </button>

          <button
            onClick={() => setActiveTab('markdown')}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'markdown'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Markdown / Notion</span>
          </button>

          <button
            onClick={() => setActiveTab('json')}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'json'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>Raw JSON</span>
          </button>

          <button
            onClick={() => setActiveTab('import')}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'import'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Import Backlog</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="py-4 flex-1 overflow-y-auto">
          {activeTab === 'csv' && (
            <div className="space-y-4">
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300">
                <span className="font-semibold text-white">Jira Cloud & GitHub Issue Import Spec:</span>
                <p className="mt-1 text-slate-400">
                  Includes properly escaped fields: Issue Type, Summary, Description, Epic Name, Priority, Status, Story Points, Persona, and Gherkin ACs.
                </p>
              </div>

              <div className="relative">
                <textarea
                  readOnly
                  rows={10}
                  value={csvContent}
                  className="w-full font-mono text-[11px] rounded-xl border border-slate-800 bg-slate-950/90 p-3 text-slate-300 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2">
                <button
                  onClick={() => handleCopy(csvContent)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-750 border border-slate-700 rounded-lg transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied CSV' : 'Copy to Clipboard'}</span>
                </button>
                <button
                  onClick={handleDownloadCsv}
                  className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-all shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download .CSV</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'markdown' && (
            <div className="space-y-4">
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300">
                <span className="font-semibold text-white">Notion & GitHub Wiki Markdown:</span>
                <p className="mt-1 text-slate-400">
                  Formatted with headings, agile story formulations, Gherkin checklists, and technical subtask checklists.
                </p>
              </div>

              <div className="relative">
                <textarea
                  readOnly
                  rows={10}
                  value={mdContent}
                  className="w-full font-mono text-[11px] rounded-xl border border-slate-800 bg-slate-950/90 p-3 text-slate-300 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2">
                <button
                  onClick={() => handleCopy(mdContent)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-750 border border-slate-700 rounded-lg transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied Markdown' : 'Copy Markdown'}</span>
                </button>
                <button
                  onClick={handleDownloadMd}
                  className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-all shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download .MD</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'json' && (
            <div className="space-y-4">
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300">
                <span className="font-semibold text-white">Raw Machine-Readable JSON:</span>
                <p className="mt-1 text-slate-400">
                  Complete project state schema including epics, user stories, acceptance criteria, and subtasks.
                </p>
              </div>

              <div className="relative">
                <textarea
                  readOnly
                  rows={10}
                  value={jsonContent}
                  className="w-full font-mono text-[11px] rounded-xl border border-slate-800 bg-slate-950/90 p-3 text-slate-300 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2">
                <button
                  onClick={() => handleCopy(jsonContent)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-750 border border-slate-700 rounded-lg transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied JSON' : 'Copy JSON'}</span>
                </button>
                <button
                  onClick={handleDownloadJson}
                  className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-all shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download .JSON</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'import' && (
            <div className="space-y-4">
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300">
                <span className="font-semibold text-white">Import Existing Project JSON:</span>
                <p className="mt-1 text-slate-400">
                  Paste JSON exported from StoryMapper or upload a `.json` backup file.
                </p>
              </div>

              {importError && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{importError}</span>
                </div>
              )}

              <div>
                <textarea
                  rows={8}
                  value={importJsonText}
                  onChange={(e) => setImportJsonText(e.target.value)}
                  placeholder="Paste StoryMapper JSON content here..."
                  className="w-full font-mono text-[11px] rounded-xl border border-slate-800 bg-slate-950/90 p-3 text-slate-300 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex items-center justify-between gap-2 flex-wrap">
                <label className="cursor-pointer flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-750 border border-slate-700 rounded-lg transition-colors">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload .json file</span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>

                <button
                  onClick={handleExecuteImport}
                  disabled={!importJsonText.trim()}
                  className="px-4 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-all disabled:opacity-50"
                >
                  Load Backlog
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
