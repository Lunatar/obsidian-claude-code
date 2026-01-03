# New MCP Tools Roadmap

31 new Obsidian-specific tools to expand Claude's capabilities within your vault.

## Current Tools

The plugin currently provides 10 tools via the Obsidian MCP server:
- `open_file` - Open file in editor
- `execute_command` - Run Obsidian commands
- `show_notice` - Display notifications
- `get_active_file` - Current file info
- `create_note` - Create new notes
- `reveal_in_explorer` - Show in file tree
- `list_commands` - Discover commands
- `get_vault_stats` - Vault statistics
- `get_recent_files` - Recently modified
- `rebuild_vault_index` - Trigger reindex

## Proposed New Tools

### Knowledge Graph (P1)

#### get_graph_connections
Retrieve bidirectional link graph for a note.

```typescript
Input: {
  path: string,           // Note path
  depth: 1 | 2 | 3,       // Traversal depth
  includeBacklinks: bool, // Include incoming links
  includeOutgoing: bool   // Include outgoing links
}

Output: {
  node: string,
  outgoing: Array<{ target: string, context: string }>,
  backlinks: Array<{ source: string, context: string }>,
  secondDegree?: Array<...>  // If depth > 1
}
```

**Use case:** "What notes are connected to this concept?"

#### find_orphaned_notes
Identify notes with no connections.

```typescript
Input: {
  folder?: string,        // Scope to folder
  minWords?: number,      // Filter by length
  createdBefore?: string  // Age filter
}

Output: Array<{
  path: string,
  reason: 'no_backlinks' | 'no_outgoing' | 'isolated',
  wordCount: number,
  created: string
}>
```

**Use case:** "Find forgotten notes that need integration."

#### suggest_backlinks
Analyze content and suggest link targets.

```typescript
Input: {
  path: string,
  maxSuggestions: number,
  minConfidence: number   // 0-1
}

Output: Array<{
  suggestedTarget: string,
  matchedPhrase: string,
  confidence: number,
  context: string
}>
```

**Use case:** "Where should I add links in this note?"

---

### Search & Discovery (P1)

#### search_notes
Full-featured vault search.

```typescript
Input: {
  query: string,
  mode: 'fulltext' | 'regex' | 'properties' | 'tags',
  folder?: string,
  fileTypes?: string[],
  limit: number
}

Output: Array<{
  path: string,
  score: number,
  snippet: string,
  matches: Array<{ line: number, text: string }>
}>
```

#### explore_tags
Get tag hierarchy and usage statistics.

```typescript
Input: {
  prefix?: string,        // Filter by prefix
  includeNested: bool,
  minUsage?: number
}

Output: {
  tags: Array<{
    name: string,
    count: number,
    children?: Array<...>
  }>,
  orphanTags: string[],   // Tags on no notes
  suggestions: string[]    // Potential merges
}
```

#### find_similar_notes
Semantic similarity search.

```typescript
Input: {
  path: string,           // Reference note
  limit: number,
  excludeTags?: string[],
  folder?: string
}

Output: Array<{
  path: string,
  similarity: number,     // 0-1
  sharedConcepts: string[]
}>
```

---

### Content & Metadata (P1)

#### read_note_metadata
Extract frontmatter and properties.

```typescript
Input: {
  path: string,
  includeContent: bool,
  contentLimit?: number
}

Output: {
  frontmatter: Record<string, any>,
  tags: string[],
  aliases: string[],
  links: string[],
  headings: Array<{ level: number, text: string }>,
  wordCount: number,
  content?: string
}
```

#### batch_update_properties
Update properties across multiple notes.

```typescript
Input: {
  paths: string[],
  properties: Record<string, any>,
  mode: 'add' | 'update' | 'remove'
}

Output: {
  updated: string[],
  skipped: string[],
  errors: Array<{ path: string, error: string }>
}
```

**Use case:** "Add 'reviewed: true' to all notes in this folder."

#### query_by_properties
Dataview-style property queries.

```typescript
Input: {
  filters: Array<{
    property: string,
    operator: 'eq' | 'ne' | 'gt' | 'lt' | 'contains' | 'exists',
    value: any
  }>,
  folder?: string,
  sort?: { property: string, direction: 'asc' | 'desc' },
  limit: number
}

Output: Array<{
  path: string,
  properties: Record<string, any>
}>
```

**Use case:** "Find notes with status: draft and priority: high."

---

### Templates & Daily Notes (P2)

#### use_template
Apply a template to create or populate notes.

```typescript
Input: {
  templatePath: string,
  targetPath?: string,    // Create new or populate current
  variables: Record<string, string>,
  createIfMissing: bool
}

Output: {
  path: string,
  appliedVariables: string[],
  content: string
}
```

#### get_daily_note_context
Get recent daily note information.

```typescript
Input: {
  daysBack: number,
  includeContent: bool,
  extractTasks: bool
}

Output: {
  today: { path: string, exists: bool },
  recent: Array<{
    date: string,
    path: string,
    summary?: string,
    tasks?: Array<{ text: string, completed: bool }>
  }>
}
```

#### create_periodic_review
Generate review notes with statistics.

```typescript
Input: {
  period: 'weekly' | 'monthly' | 'quarterly',
  folder?: string,
  includeStats: bool
}

Output: {
  path: string,           // Created review note
  stats: {
    notesCreated: number,
    notesModified: number,
    wordsWritten: number,
    topTags: string[],
    activeProjects: string[]
  }
}
```

---

### Canvas & Visualization (P2)

#### get_canvas_structure
Parse Obsidian Canvas files.

```typescript
Input: {
  path: string,
  includeNodeContent: bool
}

Output: {
  nodes: Array<{
    id: string,
    type: 'text' | 'file' | 'link' | 'group',
    content: string,
    position: { x: number, y: number },
    size: { width: number, height: number }
  }>,
  edges: Array<{
    from: string,
    to: string,
    label?: string
  }>,
  groups: Array<{ id: string, label: string, children: string[] }>
}
```

#### add_to_canvas
Add nodes or edges to a canvas.

```typescript
Input: {
  canvasPath: string,
  nodes?: Array<{ type: string, content: string, position?: {...} }>,
  edges?: Array<{ from: string, to: string }>,
  autoLayout: bool
}

Output: {
  addedNodes: string[],   // IDs
  addedEdges: number
}
```

#### suggest_canvas_layout
Generate layout suggestions for notes.

```typescript
Input: {
  paths: string[],        // Notes to visualize
  algorithm: 'hierarchical' | 'force' | 'circular' | 'tree',
  centerNode?: string
}

Output: {
  layout: Array<{
    path: string,
    position: { x: number, y: number },
    connections: string[]
  }>,
  canvasJson: string      // Ready to save
}
```

---

### Writing Workflows (P2)

#### compile_research
Gather notes into a structured document.

```typescript
Input: {
  query: string,          // Search query or paths
  folder?: string,
  format: 'outline' | 'prose' | 'annotated',
  groupBy: 'tag' | 'folder' | 'date' | 'none'
}

Output: {
  compiledContent: string,
  sources: Array<{ path: string, excerpts: string[] }>,
  wordCount: number
}
```

#### extract_highlights
Find highlighted text and annotations.

```typescript
Input: {
  paths: string[],        // Or folder
  types: ('highlights' | 'callouts' | 'comments' | 'todos')[],
  format: 'list' | 'grouped'
}

Output: Array<{
  source: string,
  type: string,
  content: string,
  context: string
}>
```

#### generate_outline
Extract document structure.

```typescript
Input: {
  path: string,
  maxDepth: number,
  includeContent: bool    // Include text under headings
}

Output: {
  outline: Array<{
    level: number,
    heading: string,
    line: number,
    children: Array<...>,
    content?: string
  }>
}
```

---

### Plugin Ecosystem (P2)

#### get_dataview_results
Execute Dataview queries (if installed).

```typescript
Input: {
  query: string,          // DQL or DataviewJS
  format: 'table' | 'list' | 'json'
}

Output: {
  results: any[],
  columns?: string[],
  error?: string
}
```

#### trigger_templater
Run Templater templates (if installed).

```typescript
Input: {
  templatePath: string,
  targetPath?: string,
  variables?: Record<string, string>
}

Output: {
  path: string,
  content: string
}
```

#### call_plugin_command
Execute commands from other plugins.

```typescript
Input: {
  pluginId: string,
  commandId: string,
  args?: any
}

Output: {
  success: bool,
  result?: any,
  error?: string
}
```

---

### Productivity (P2)

#### get_task_summary
Aggregate tasks across the vault.

```typescript
Input: {
  status: 'open' | 'completed' | 'all',
  folder?: string,
  tags?: string[],
  dueWithin?: string      // '7d', '1m', etc.
}

Output: {
  tasks: Array<{
    text: string,
    path: string,
    line: number,
    status: string,
    due?: string,
    priority?: string
  }>,
  summary: {
    total: number,
    byStatus: Record<string, number>,
    byPriority: Record<string, number>,
    overdue: number
  }
}
```

#### move_and_organize
Move files based on rules.

```typescript
Input: {
  paths: string[],
  targetFolder: string,
  // OR
  rules: Array<{
    condition: { property: string, operator: string, value: any },
    targetFolder: string
  }>,
  createFolders: bool
}

Output: {
  moved: Array<{ from: string, to: string }>,
  skipped: string[],
  created: string[]       // New folders
}
```

#### bulk_rename
Pattern-based file renaming.

```typescript
Input: {
  folder: string,
  pattern: string,        // Regex or glob
  template: string,       // New name template with {placeholders}
  dryRun: bool
}

Output: {
  renames: Array<{ from: string, to: string }>,
  conflicts: string[],
  applied: bool
}
```

---

### Vault Analysis (P3)

#### analyze_vault_structure
Comprehensive vault health report.

```typescript
Input: {
  includeStats: bool,
  includeRecommendations: bool,
  detailed: bool
}

Output: {
  stats: {
    totalNotes: number,
    totalWords: number,
    avgNoteLength: number,
    orphanedNotes: number,
    deadLinks: number
  },
  structure: {
    folders: Array<{ path: string, noteCount: number }>,
    topTags: Array<{ tag: string, count: number }>,
    fileTypes: Record<string, number>
  },
  recommendations: string[]
}
```

#### find_writing_patterns
Analyze writing activity and patterns.

```typescript
Input: {
  timeRange: string,      // '30d', '1y', etc.
  folder?: string
}

Output: {
  activity: Array<{ date: string, words: number, notes: number }>,
  patterns: {
    mostActiveDay: string,
    mostActiveTime: string,
    avgWordsPerDay: number
  },
  topTopics: Array<{ topic: string, noteCount: number }>
}
```

#### list_dead_links
Find broken internal links.

```typescript
Input: {
  folder?: string,
  includeAliases: bool
}

Output: Array<{
  source: string,
  deadLink: string,
  line: number,
  suggestion?: string     // Similar existing note
}>
```

---

## Implementation Priority Matrix

| Tool | Category | Complexity | Impact | Priority |
|------|----------|------------|--------|----------|
| get_graph_connections | Graph | Medium | High | P1 |
| search_notes | Search | Medium | High | P1 |
| read_note_metadata | Metadata | Low | High | P1 |
| find_orphaned_notes | Graph | Low | Medium | P1 |
| query_by_properties | Metadata | Medium | High | P1 |
| get_dataview_results | Ecosystem | Low | High | P1 |
| get_daily_note_context | Templates | Low | Medium | P2 |
| get_canvas_structure | Canvas | Medium | Medium | P2 |
| compile_research | Writing | High | High | P2 |
| get_task_summary | Productivity | Medium | Medium | P2 |
| analyze_vault_structure | Analysis | Medium | Medium | P3 |
