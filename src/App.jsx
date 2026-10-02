import React, { useState, useEffect, useMemo, useRef } from 'react';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import StoryMapMatrix from './components/StoryMapMatrix';
import KanbanBoard from './components/KanbanBoard';
import TableView from './components/TableView';
import StoryDetailDrawer from './components/StoryDetailDrawer';
import IdeaGeneratorModal from './components/IdeaGeneratorModal';
import EpicModal from './components/EpicModal';
import StoryModal from './components/StoryModal';
import ExportModal from './components/ExportModal';
import Toast from './components/Toast';
import UiDesignStudio from './components/UiDesignStudio';
import UserProfileProgressView from './components/UserProfileProgressView';
import AuthModal, { DEMO_USERS } from './components/AuthModal';
import { VIETNAMESE_PRONUNCIATION_PROJECT } from './constants/sampleData';
import {
  checkBackendHealth,
  fetchActiveProjectFromDb,
  saveProjectToDb
} from './utils/api';

const STORAGE_KEY = 'storymapper_v1_project';
const VIEW_STORAGE_KEY = 'storymapper_v1_active_view';

export default function App() {
  // Load initial project from LocalStorage or fallback to master Vietnamese project
  const [project, setProject] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.epics && parsed.stories && parsed.id === VIETNAMESE_PRONUNCIATION_PROJECT.id) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load project from localStorage:', e);
    }
    return VIETNAMESE_PRONUNCIATION_PROJECT;
  });

  // Database Connection Status
  const [dbStatus, setDbStatus] = useState({ connected: false });
  const isInitialDbLoadRef = useRef(false);

  // Active view: 'matrix' | 'kanban' | 'table' | 'ui-studio' | 'progress'
  const [activeView, setActiveView] = useState(() => {
    try {
      const savedView = localStorage.getItem(VIEW_STORAGE_KEY);
      if (savedView && ['matrix', 'kanban', 'table', 'ui-studio', 'progress'].includes(savedView)) {
        return savedView;
      }
    } catch (e) {}
    return 'kanban';
  });

  // Current User Account State
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('vietphonics_active_user');
      if (savedUser) return JSON.parse(savedUser);
    } catch (e) {}
    return DEMO_USERS[0];
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Sync user state to localStorage
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('vietphonics_active_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('vietphonics_active_user');
      }
    } catch (e) {}
  }, [currentUser]);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEpicId, setSelectedEpicId] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Modal / Drawer States
  const [isIdeaGenOpen, setIsIdeaGenOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isEpicModalOpen, setIsEpicModalOpen] = useState(false);
  const [epicToEdit, setEpicToEdit] = useState(null);
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const [newStoryDefaultEpicId, setNewStoryDefaultEpicId] = useState('');
  const [newStoryDefaultStatus, setNewStoryDefaultStatus] = useState('backlog');
  const [selectedStoryForDetail, setSelectedStoryForDetail] = useState(null);

  // Toast Notifications
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Check Backend & Connect to SQLite on Mount
  useEffect(() => {
    async function initDbConnection() {
      const health = await checkBackendHealth();
      setDbStatus(health);
      if (health.connected && !isInitialDbLoadRef.current) {
        try {
          const dbProject = await fetchActiveProjectFromDb();
          if (dbProject && dbProject.epics && dbProject.stories) {
            setProject(dbProject);
            isInitialDbLoadRef.current = true;
            console.log('[SQLite] Loaded active project from database file');
          }
        } catch (err) {
          console.warn('[SQLite] Could not fetch active project from SQLite, fallback to local state', err);
        }
      }
    }
    initDbConnection();

    // Periodic check
    const interval = setInterval(async () => {
      const health = await checkBackendHealth();
      setDbStatus(health);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Sync to LocalStorage AND SQLite on project updates
  useEffect(() => {
    // 1. LocalStorage
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(project));
    } catch (e) {
      console.error('Failed to persist project to localStorage:', e);
    }

    // 2. SQLite Backend (Debounced save)
    if (dbStatus.connected) {
      const timer = setTimeout(async () => {
        try {
          await saveProjectToDb(project);
        } catch (err) {
          console.error('[SQLite] Failed to persist to database:', err);
        }
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [project, dbStatus.connected]);

  // Persist active view
  const handleViewChange = (view) => {
    setActiveView(view);
    try {
      localStorage.setItem(VIEW_STORAGE_KEY, view);
    } catch (e) {}
  };

  // Global keyboard shortcuts (Ctrl+K or '/' to focus search)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('input[type="text"][placeholder*="Search"]');
        if (searchInput) searchInput.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filter & Search Logic
  const filteredStories = useMemo(() => {
    return project.stories.filter((story) => {
      // Epic filter
      if (selectedEpicId !== 'all' && story.epicId !== selectedEpicId) {
        return false;
      }
      // Priority filter
      if (selectedPriority !== 'all' && story.priority !== selectedPriority) {
        return false;
      }
      // Status filter
      if (activeView !== 'kanban' && selectedStatus !== 'all' && story.status !== selectedStatus) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inId = story.id.toLowerCase().includes(q);
        const inTitle = story.title.toLowerCase().includes(q);
        const inPersona = (story.persona || '').toLowerCase().includes(q);
        const inAction = (story.action || '').toLowerCase().includes(q);
        const inValue = (story.value || '').toLowerCase().includes(q);
        const inNotes = (story.notes || '').toLowerCase().includes(q);
        const inAc = (story.acceptanceCriteria || []).some(
          (ac) =>
            ac.given.toLowerCase().includes(q) ||
            ac.when.toLowerCase().includes(q) ||
            ac.then.toLowerCase().includes(q)
        );
        const inTasks = (story.technicalTasks || []).some((t) =>
          t.title.toLowerCase().includes(q)
        );

        if (!inId && !inTitle && !inPersona && !inAction && !inValue && !inNotes && !inAc && !inTasks) {
          return false;
        }
      }
      return true;
    });
  }, [project.stories, selectedEpicId, selectedPriority, selectedStatus, searchQuery, activeView]);

  // Project management handlers
  const handleUpdateProjectName = (newName) => {
    setProject((prev) => ({ ...prev, name: newName }));
    showToast(`Renamed project to "${newName}"`);
  };

  // Reset to default Vietnamese Pronunciation roadmap
  const handleResetToDefault = () => {
    if (window.confirm('Reset backlog to the default Vietnamese English Pronunciation Roadmap? Any manual additions will be replaced.')) {
      const defaultProject = JSON.parse(JSON.stringify(VIETNAMESE_PRONUNCIATION_PROJECT));
      setProject(defaultProject);
      setSelectedEpicId('all');
      setSelectedPriority('all');
      setSelectedStatus('all');
      setSearchQuery('');
      showToast('Reset to default Vietnamese English Pronunciation Roadmap');
    }
  };

  // AI Intake / Generated Backlog apply
  const handleApplyGeneratedBacklog = (generated, mode = 'replace') => {
    if (mode === 'replace') {
      const newProj = {
        id: `proj-${Date.now()}`,
        name: generated.projectName || 'Decomposed Backlog',
        description: generated.projectDescription || '',
        epics: generated.epics,
        stories: generated.stories
      };
      setProject(newProj);
      showToast(`Generated backlog for "${generated.projectName}"`);
    } else {
      setProject((prev) => {
        const existingEpicIds = new Set(prev.epics.map((e) => e.id));
        const newEpics = generated.epics.filter((e) => !existingEpicIds.has(e.id));
        return {
          ...prev,
          epics: [...prev.epics, ...newEpics],
          stories: [...prev.stories, ...generated.stories]
        };
      });
      showToast(`Appended ${generated.stories.length} stories to existing project`);
    }
  };

  // Epic CRUD
  const handleSaveEpic = (epicData) => {
    setProject((prev) => {
      const exists = prev.epics.some((e) => e.id === epicData.id);
      if (exists) {
        return {
          ...prev,
          epics: prev.epics.map((e) => (e.id === epicData.id ? { ...e, ...epicData } : e))
        };
      } else {
        return {
          ...prev,
          epics: [...prev.epics, { ...epicData, order: prev.epics.length + 1 }]
        };
      }
    });
    showToast(`Saved epic "${epicData.title}"`);
  };

  const handleDeleteEpic = (epicId) => {
    const epic = project.epics.find((e) => e.id === epicId);
    if (!epic) return;

    const epicStoriesCount = project.stories.filter((s) => s.epicId === epicId).length;
    const confirmMsg = epicStoriesCount > 0
      ? `Delete Epic "${epic.title}" and its ${epicStoriesCount} associated user stories?`
      : `Delete Epic "${epic.title}"?`;

    if (window.confirm(confirmMsg)) {
      setProject((prev) => ({
        ...prev,
        epics: prev.epics.filter((e) => e.id !== epicId),
        stories: prev.stories.filter((s) => s.epicId !== epicId)
      }));
      if (selectedEpicId === epicId) {
        setSelectedEpicId('all');
      }
      showToast(`Deleted epic "${epic.title}"`, 'info');
    }
  };

  // Story CRUD
  const handleSaveNewStory = (newStory) => {
    setProject((prev) => ({
      ...prev,
      stories: [newStory, ...prev.stories]
    }));
    showToast(`Added story "${newStory.title}"`);
  };

  const handleUpdateStory = (updatedStory) => {
    setProject((prev) => ({
      ...prev,
      stories: prev.stories.map((s) => (s.id === updatedStory.id ? updatedStory : s))
    }));
    if (selectedStoryForDetail && selectedStoryForDetail.id === updatedStory.id) {
      setSelectedStoryForDetail(updatedStory);
    }
  };

  const handleDeleteStory = (storyId) => {
    if (window.confirm('Are you sure you want to delete this story?')) {
      setProject((prev) => ({
        ...prev,
        stories: prev.stories.filter((s) => s.id !== storyId)
      }));
      if (selectedStoryForDetail && selectedStoryForDetail.id === storyId) {
        setSelectedStoryForDetail(null);
      }
      showToast('User story deleted', 'info');
    }
  };

  const handleStatusChange = (storyId, newStatus) => {
    setProject((prev) => ({
      ...prev,
      stories: prev.stories.map((s) => (s.id === storyId ? { ...s, status: newStatus } : s))
    }));
  };

  // Modal open triggers
  const handleOpenAddStoryModal = (epicId = '', status = 'backlog') => {
    setNewStoryDefaultEpicId(epicId || (project.epics[0]?.id || ''));
    setNewStoryDefaultStatus(status);
    setIsStoryModalOpen(true);
  };

  const handleOpenEditEpicModal = (epic) => {
    setEpicToEdit(epic);
    setIsEpicModalOpen(true);
  };

  const handleOpenCreateEpicModal = () => {
    setEpicToEdit(null);
    setIsEpicModalOpen(true);
  };

  const handleImportProject = (importedProject) => {
    const imported = {
      id: importedProject.id || `proj-${Date.now()}`,
      name: importedProject.name || 'Imported Project',
      description: importedProject.description || '',
      epics: importedProject.epics || [],
      stories: importedProject.stories || []
    };
    setProject(imported);
    setSelectedEpicId('all');
    setSelectedPriority('all');
    setSelectedStatus('all');
    setSearchQuery('');
    showToast('Project backlog imported and saved to SQLite');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Header with SQLite DB Badge */}
      <Header
        project={project}
        dbStatus={dbStatus}
        currentUser={currentUser}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onUpdateProjectName={handleUpdateProjectName}
        onOpenIdeaGenerator={() => setIsIdeaGenOpen(true)}
        onResetToDefault={handleResetToDefault}
        onOpenExport={() => setIsExportOpen(true)}
        onAddEpic={handleOpenCreateEpicModal}
        onAddStory={() => handleOpenAddStoryModal()}
      />

      {/* Filter and View Switcher Bar */}
      <FilterBar
        activeView={activeView}
        onViewChange={handleViewChange}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedEpicId={selectedEpicId}
        onEpicFilterChange={setSelectedEpicId}
        selectedPriority={selectedPriority}
        onPriorityFilterChange={setSelectedPriority}
        selectedStatus={selectedStatus}
        onStatusFilterChange={setSelectedStatus}
        epics={project.epics}
        totalMatchingStories={filteredStories.length}
        totalStories={project.stories.length}
        onClearFilters={() => {
          setSearchQuery('');
          setSelectedEpicId('all');
          setSelectedPriority('all');
          setSelectedStatus('all');
        }}
      />

      {/* Main Backlog View Area */}
      <main className="flex-1 flex flex-col">
        {activeView === 'matrix' && (
          <StoryMapMatrix
            epics={project.epics}
            stories={filteredStories}
            onStoryClick={(story) => setSelectedStoryForDetail(story)}
            onStatusChange={handleStatusChange}
            onAddStoryToEpic={(epicId) => handleOpenAddStoryModal(epicId)}
            onEditEpic={handleOpenEditEpicModal}
            onDeleteEpic={handleDeleteEpic}
            onAddEpic={handleOpenCreateEpicModal}
          />
        )}

        {activeView === 'kanban' && (
          <KanbanBoard
            epics={project.epics}
            stories={filteredStories}
            onStoryClick={(story) => setSelectedStoryForDetail(story)}
            onStatusChange={handleStatusChange}
            onAddStoryWithStatus={(colId) => handleOpenAddStoryModal('', colId)}
          />
        )}

        {activeView === 'table' && (
          <TableView
            epics={project.epics}
            stories={filteredStories}
            onStoryClick={(story) => setSelectedStoryForDetail(story)}
            onStatusChange={handleStatusChange}
            onDeleteStory={handleDeleteStory}
            onAddStory={() => handleOpenAddStoryModal()}
          />
        )}

        {activeView === 'ui-studio' && (
          <UiDesignStudio project={project} />
        )}

        {activeView === 'progress' && (
          <UserProfileProgressView
            currentUser={currentUser}
            onOpenAuthModal={() => setIsAuthModalOpen(true)}
            onSwitchToStudio={() => handleViewChange('ui-studio')}
          />
        )}
      </main>

      {/* User Story Detail Drawer */}
      <StoryDetailDrawer
        story={selectedStoryForDetail}
        epics={project.epics}
        isOpen={Boolean(selectedStoryForDetail)}
        onClose={() => setSelectedStoryForDetail(null)}
        onSave={handleUpdateStory}
        onDelete={handleDeleteStory}
      />

      {/* Idea Intake / AI Generator Modal */}
      <IdeaGeneratorModal
        isOpen={isIdeaGenOpen}
        onClose={() => setIsIdeaGenOpen(false)}
        onApplyBacklog={handleApplyGeneratedBacklog}
        onOpenManualAddEpic={handleOpenCreateEpicModal}
        onOpenManualAddStory={() => handleOpenAddStoryModal()}
      />

      {/* Epic Create / Edit Modal */}
      <EpicModal
        isOpen={isEpicModalOpen}
        onClose={() => setIsEpicModalOpen(false)}
        onSave={handleSaveEpic}
        epicToEdit={epicToEdit}
      />

      {/* User Story Create Modal */}
      <StoryModal
        isOpen={isStoryModalOpen}
        onClose={() => setIsStoryModalOpen(false)}
        epics={project.epics}
        defaultEpicId={newStoryDefaultEpicId}
        defaultStatus={newStoryDefaultStatus}
        onSave={handleSaveNewStory}
      />

      {/* Export / Share Modal */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        project={project}
        onImportProject={handleImportProject}
      />

      {/* User Login & Profile Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={currentUser}
        onLogin={(u) => {
          setCurrentUser(u);
          showToast(`Xin chào ${u.name}!`);
        }}
        onLogout={() => {
          setCurrentUser(null);
          showToast('Đã đăng xuất tài khoản.');
        }}
      />

      {/* Toast feedback */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
