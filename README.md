# StoryMapper — Agile Product Breakdown & Story Mapping Studio

> A Linear-inspired agile story mapping and product backlog studio for startup founders and product teams. Deconstruct product ideas into structured **Epics, User Stories, Gherkin Acceptance Criteria, and Technical Subtasks** backed by a **local SQLite database**.

---

## ⚡ Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start both the SQLite backend & React frontend concurrently
npm run dev
```

- **Frontend App**: [http://localhost:5173](http://localhost:5173)
- **SQLite REST API**: [http://localhost:3001](http://localhost:3001)
- **Database File**: `data/storymapper.db` (created automatically in the project folder)

---

## 🗄️ Database Architecture & Storage

Your work is saved into a **real, persistent SQLite database file** located at:
```
data/storymapper.db
```

### Relational Schema:
- **`projects`**: Project metadata, name, description, timestamps.
- **`epics`**: Architectural epic backbones with custom color tags and swimlane ordering.
- **`stories`**: User stories linked by `epic_id`, containing:
  - MoSCoW priority (`must`, `should`, `could`, `wont`)
  - Status (`backlog`, `todo`, `in-progress`, `done`)
  - Persona, Action, and Value narrative
  - T-shirt sizes (`XS`, `S`, `M`, `L`, `XL`) & Fibonacci story points
  - **Gherkin Acceptance Criteria** (`Given... When... Then...`)
  - **Technical Subtasks** (`[Frontend]`, `[Backend]`, `[Database]`, `[DevOps]`, `[QA]`)
  - Implementation notes
- **Dual-Layer Resilience**: Even if the backend server is temporarily stopped, the frontend seamlessly caches to `LocalStorage` and syncs back to SQLite the moment the server reconnects.

---

## 🎯 Core Features

1. **AI Idea Intake & Decomposition**:
   - Describe any concept in 1–3 sentences or pick quick presets (*SaaS B2B Analytics, Coffee Subscription, E-commerce Marketplace, Mobile Habit Tracker*).
   - Generates domain-tailored Epics, MoSCoW-prioritized Stories, and Gherkin specifications.
2. **Three Toggleable Views**:
   - **Story Map Matrix**: Horizontal flow of Epics with vertically stacked MoSCoW priority cards.
   - **Interactive Kanban Board**: 4 columns (*Backlog, To Do, In Progress, Done*) with HTML5 drag-and-drop, quick move arrows, and celebratory confetti upon completion.
   - **Agile Table View**: High-density sortable table with instant status selectors and ID copying.
3. **User Story Detail Drawer**:
   - Edit *As a [Persona], I want to [Action], so that [Value]*.
   - Check off Gherkin acceptance criteria and engineering subtasks.
   - Change T-Shirt sizes and MoSCoW priorities on the fly.
4. **Export & Import Studio**:
   - **Jira/GitHub CSV**: Formatted RFC 4180 CSV download with full story metadata.
   - **Notion/Markdown**: Clean document with headings, tables, and task checklists (`- [ ]`).
   - **Raw JSON**: Machine-readable format with 1-click import to restore or backup backlogs.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Tailwind CSS, Lucide React, Canvas Confetti
- **Backend API**: Node.js, Express, CORS
- **Database Engine**: Built-in `node:sqlite` (Node.js native zero-dependency SQLite driver with WAL journal mode)
- **Tooling**: Vite, Concurrently
