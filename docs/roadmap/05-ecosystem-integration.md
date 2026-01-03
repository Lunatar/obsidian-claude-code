# Ecosystem Integration Roadmap

Integrations with popular Obsidian plugins to extend Claude's capabilities.

## Integration Philosophy

Rather than replacing existing plugins, Claude should:
1. **Enhance** - Add AI capabilities to existing workflows
2. **Bridge** - Connect data between plugins
3. **Automate** - Reduce manual steps in plugin usage
4. **Discover** - Help users find and use plugin features

## Planned Integrations

### P1 - High Priority

#### Dataview Integration
**Plugin**: [Dataview](https://github.com/blacksmithgu/obsidian-dataview)
**Status**: Planned
**Complexity**: Medium
**Impact**: High

Dataview is the most popular query plugin. Claude should understand and execute Dataview queries.

**Features:**
- Execute DQL queries programmatically
- Convert natural language to DQL
- Explain existing queries
- Debug query errors
- Suggest query optimizations

**MCP Tool**: `get_dataview_results`
```typescript
Input: {
  query: string,        // DQL or DataviewJS
  format: 'table' | 'list' | 'json'
}
```

**Use cases:**
- "Show me all books I read this year" → Generates and runs DQL
- "What's wrong with this query?" → Debugs DQL
- "Convert this to a Dataview query" → NL to DQL

**Implementation notes:**
- Check if Dataview is installed: `app.plugins.plugins['dataview']`
- Access API: `app.plugins.plugins['dataview'].api`
- Handle async queries properly

#### Templater Integration
**Plugin**: [Templater](https://github.com/SilentVoid13/Templater)
**Status**: Planned
**Complexity**: Medium
**Impact**: High

Templater enables dynamic templates. Claude should be able to create and run templates.

**Features:**
- Execute Templater templates programmatically
- Create new templates from natural language
- Explain template syntax
- Debug template errors
- Suggest template improvements

**MCP Tool**: `trigger_templater`
```typescript
Input: {
  templatePath: string,
  targetPath?: string,
  variables?: Record<string, string>
}
```

**Use cases:**
- "Create a meeting note using my meeting template"
- "Make a template that asks for project name and due date"
- "What does this template code do?"

---

### P2 - Medium Priority

#### Tasks Integration
**Plugin**: [Tasks](https://github.com/obsidian-tasks-group/obsidian-tasks)
**Status**: Planned
**Complexity**: Medium
**Impact**: Medium

Tasks plugin provides rich task management. Claude should understand and manage tasks.

**Features:**
- Query tasks with full Tasks syntax
- Create tasks with proper formatting
- Understand task metadata (due dates, priorities, recurrence)
- Suggest task organization
- Generate task reports

**MCP Tool**: `manage_tasks`
```typescript
Input: {
  action: 'query' | 'create' | 'complete' | 'reschedule',
  query?: string,       // Tasks query syntax
  task?: {
    text: string,
    due?: string,
    priority?: 'high' | 'medium' | 'low',
    recurrence?: string
  }
}
```

**Use cases:**
- "What tasks are due this week?"
- "Create a task to review PRs every Monday"
- "Mark all tasks in this note as complete"

#### Calendar Integration
**Plugin**: [Calendar](https://github.com/liamcain/obsidian-calendar-plugin)
**Status**: Planned
**Complexity**: Low
**Impact**: Medium

Calendar provides date navigation. Claude should be calendar-aware.

**Features:**
- Navigate to specific dates
- Create notes for dates
- Query notes by date range
- Understand calendar context

**MCP Tool**: `calendar_operations`
```typescript
Input: {
  action: 'navigate' | 'get_notes' | 'create_note',
  date?: string,
  dateRange?: { start: string, end: string }
}
```

**Use cases:**
- "What did I write last Tuesday?"
- "Create a note for next Monday"
- "Show me all notes from December"

#### Periodic Notes Integration
**Plugin**: [Periodic Notes](https://github.com/liamcain/obsidian-periodic-notes)
**Status**: Planned
**Complexity**: Low
**Impact**: Medium

Periodic Notes extends daily notes to weekly/monthly/quarterly.

**Features:**
- Access any periodic note type
- Create periodic notes programmatically
- Aggregate data across periods
- Generate periodic reviews

**MCP Tool**: `periodic_notes`
```typescript
Input: {
  type: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly',
  action: 'get' | 'create' | 'navigate',
  date?: string
}
```

#### Smart Connections Integration
**Plugin**: [Smart Connections](https://github.com/brianpetro/obsidian-smart-connections)
**Status**: Planned
**Complexity**: Medium
**Impact**: High

Smart Connections provides embedding-based semantic search.

**Features:**
- Use embeddings for similarity search
- Access Smart Connections index
- Leverage existing embeddings (don't duplicate)
- Combine with other search methods

**MCP Tool**: `smart_search`
```typescript
Input: {
  query: string,
  limit: number,
  threshold?: number    // Similarity threshold
}
```

**Use cases:**
- "Find notes semantically similar to this one"
- "What have I written about machine learning?"

---

### P3 - Low Priority

#### Excalidraw Integration
**Plugin**: [Excalidraw](https://github.com/zsviczian/obsidian-excalidraw-plugin)
**Status**: Idea
**Complexity**: High
**Impact**: Low

Excalidraw provides drawing capabilities.

**Features:**
- Read Excalidraw file content (text elements)
- Generate simple diagrams from descriptions
- Add text annotations to drawings
- Convert drawings to markdown descriptions

**Considerations:**
- Excalidraw files are complex JSON
- Drawing generation is challenging
- Focus on text content initially

#### Kanban Integration
**Plugin**: [Kanban](https://github.com/mgmeyers/obsidian-kanban)
**Status**: Idea
**Complexity**: Medium
**Impact**: Low

Kanban provides board-based task management.

**Features:**
- Read board structure
- Move cards between columns
- Create cards programmatically
- Summarize board status

**MCP Tool**: `kanban_operations`
```typescript
Input: {
  boardPath: string,
  action: 'read' | 'move_card' | 'create_card' | 'summarize',
  card?: { title: string, column: string }
}
```

#### Obsidian Publish Integration
**Plugin**: Obsidian Publish (core)
**Status**: Idea
**Complexity**: Medium
**Impact**: Low

Help with publishing workflows.

**Features:**
- Check publish status of notes
- Suggest notes for publishing
- Validate publish-readiness
- Generate publish summaries

#### Advanced Tables Integration
**Plugin**: [Advanced Tables](https://github.com/tgrosinger/advanced-tables-obsidian)
**Status**: Idea
**Complexity**: Low
**Impact**: Low

Enhance table editing.

**Features:**
- Generate tables from natural language
- Format existing tables
- Add/remove columns intelligently
- Convert CSV to markdown tables

---

## Detection Strategy

The plugin should gracefully detect which plugins are installed:

```typescript
function detectPlugins(): PluginStatus {
  const plugins = app.plugins.plugins;
  return {
    dataview: !!plugins['dataview'],
    templater: !!plugins['templater-obsidian'],
    tasks: !!plugins['obsidian-tasks-plugin'],
    calendar: !!plugins['calendar'],
    periodicNotes: !!plugins['periodic-notes'],
    smartConnections: !!plugins['smart-connections'],
    excalidraw: !!plugins['obsidian-excalidraw-plugin'],
    kanban: !!plugins['obsidian-kanban']
  };
}
```

**UI Considerations:**
- Show available integrations in settings
- Disable/hide tools for missing plugins
- Suggest plugin installation when relevant

---

## Integration Patterns

### Read-Only Integration
Safest approach - only read data from plugins.
- Query Dataview
- Read Smart Connections embeddings
- Get Calendar dates

### Action Integration
Trigger plugin actions programmatically.
- Run Templater template
- Navigate Calendar
- Execute plugin commands

### Deep Integration
Modify plugin data directly.
- Create Tasks tasks
- Move Kanban cards
- Update plugin settings

---

## Future Ecosystem Considerations

### Community Plugins to Watch
- **Omnisearch** - Unified search
- **QuickAdd** - Macro system
- **Metadata Menu** - Property management
- **Projects** - Project management
- **Database Folder** - Database-like folders
- **Breadcrumbs** - Hierarchical navigation

### Plugin API Standards
As the ecosystem matures, advocate for:
- Consistent API patterns across plugins
- Event systems for inter-plugin communication
- Shared data formats
- Plugin capability discovery

---

## Implementation Priorities

| Plugin | Read | Actions | Deep | Priority |
|--------|------|---------|------|----------|
| Dataview | ✓ | - | - | P1 |
| Templater | - | ✓ | - | P1 |
| Tasks | ✓ | ✓ | - | P2 |
| Calendar | ✓ | ✓ | - | P2 |
| Periodic Notes | ✓ | ✓ | - | P2 |
| Smart Connections | ✓ | - | - | P2 |
| Excalidraw | ✓ | - | - | P3 |
| Kanban | ✓ | ✓ | - | P3 |
