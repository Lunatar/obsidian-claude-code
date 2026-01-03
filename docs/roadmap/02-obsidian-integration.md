# Obsidian Integration Roadmap

Native Obsidian APIs and patterns that could deepen the plugin's integration.

## Currently Used

The plugin already leverages:
- `ItemView` for the chat sidebar
- Ribbon icon for quick access
- Commands (toggle, open, new conversation)
- `PluginSettingTab` for settings
- Workspace leaf management
- `Notice` API for notifications
- File operations (read, create, reveal)
- Command execution

## Planned Enhancements

### P0 - Critical

#### Editor Integration (CodeMirror)
**Status**: Planned
**Complexity**: Medium
**Impact**: High

Let Claude interact directly with the currently open editor, enabling inline edits without copy-paste.

**Capabilities:**
- Insert text at cursor position
- Get and replace selected text
- Navigate to specific lines
- Execute find/replace operations
- Syntax-aware edits

**New MCP tools:**
```typescript
insert_at_cursor(text: string, line?: number, char?: number)
get_selected_text() -> string
replace_selection(text: string)
get_cursor_context(linesBefore: number, linesAfter: number)
```

**Use cases:**
- "Fix this paragraph" → Claude edits inline
- "Add a code block here" → Inserts at cursor
- "Refactor selected function" → Replaces selection

**Implementation:**
```typescript
const editor = app.workspace.activeEditor?.editor;
if (editor) {
  const selection = editor.getSelection();
  editor.replaceSelection(newText);
}
```

#### Context Menu Integration
**Status**: Planned
**Complexity**: Medium
**Impact**: High

Add Claude actions to right-click menus throughout Obsidian.

**File menu actions:**
- "Ask Claude about this file"
- "Summarize with Claude"
- "Generate tags with Claude"
- "Find related notes"

**Editor context menu:**
- "Explain selection"
- "Improve writing"
- "Translate selection"
- "Add to chat context"

**Implementation:**
```typescript
this.registerEvent(
  app.workspace.on('file-menu', (menu, file) => {
    menu.addItem((item) => {
      item.setTitle('Ask Claude about this file')
        .setIcon('message-square')
        .onClick(() => this.askAboutFile(file));
    });
  })
);
```

---

### P1 - High Priority

#### Active File Tracking
**Status**: Planned
**Complexity**: Low
**Impact**: High

Automatically track which file the user is viewing and offer contextual assistance.

**Features:**
- Display current file in chat header
- "Ask about current file" quick action
- Auto-suggest including current file in context
- Track file switches for context continuity

**Implementation:**
```typescript
this.registerEvent(
  app.workspace.on('active-leaf-change', (leaf) => {
    const file = app.workspace.getActiveFile();
    this.chatView.setActiveFileContext(file);
  })
);
```

#### Status Bar Integration
**Status**: Planned
**Complexity**: Low
**Impact**: Medium

Show plugin status in Obsidian's status bar.

**Indicators:**
- Connection status (API key valid/invalid)
- Current model
- Streaming indicator during responses
- Token/cost counter (if available)
- Click to open chat

**Implementation:**
```typescript
const statusBarItem = this.addStatusBarItem();
statusBarItem.setText('Claude: Ready');
statusBarItem.onClickEvent(() => this.activateChatView());
```

---

### P2 - Medium Priority

#### Drag & Drop Files
**Status**: Planned
**Complexity**: Medium
**Impact**: Medium

Allow dragging files from the file explorer into the chat input.

**Features:**
- Drop zone visual feedback
- Insert file reference on drop
- Support multiple files
- Preview of what will be added

**Implementation:**
```typescript
inputEl.addEventListener('dragover', (e) => {
  e.preventDefault();
  inputEl.addClass('drag-over');
});

inputEl.addEventListener('drop', (e) => {
  const files = e.dataTransfer?.files;
  // Insert file references
});
```

#### Canvas Integration
**Status**: Planned
**Complexity**: High
**Impact**: Medium

Enable Claude to understand and interact with Obsidian Canvas files.

**Capabilities:**
- Read canvas structure (nodes, edges, groups)
- Add nodes to canvas
- Connect existing notes
- Suggest layouts based on content relationships

**Use cases:**
- "Create a mind map of this topic"
- "Visualize connections between these notes"
- "Add this note to my project canvas"

**Note:** Canvas files are JSON, can be read/written like regular files.

#### Link & Backlink Awareness
**Status**: Planned
**Complexity**: Low
**Impact**: Medium

Make Claude aware of the vault's link structure.

**Features:**
- Get outgoing links from current file
- Get backlinks (files linking to current file)
- Suggest new links based on content
- Navigate link chains

**Implementation:**
```typescript
const cache = app.metadataCache.getFileCache(file);
const outgoingLinks = cache?.links || [];
const backlinks = app.metadataCache.getBacklinksForFile(file);
```

#### Workspace Events
**Status**: Planned
**Complexity**: Medium
**Impact**: Low

Track workspace state for context-aware suggestions.

**Features:**
- Know what panes are open
- Suggest "open in split view"
- Track recently viewed files
- Multi-pane context awareness

---

### P3 - Low Priority

#### Theme Integration
**Status**: Idea
**Complexity**: Low
**Impact**: Low

Ensure chat UI respects user's theme settings perfectly.

**Features:**
- Auto-detect dark/light mode
- Use theme's accent colors
- Match code block styling to theme
- Support custom CSS snippets

#### Mobile Detection
**Status**: Idea
**Complexity**: Low
**Impact**: Low

Gracefully handle mobile Obsidian where the plugin can't run.

**Features:**
- Detect mobile platform
- Show friendly "desktop only" message
- Suggest alternatives (web Claude)
- Disable plugin features cleanly

#### Sync Status Awareness
**Status**: Idea
**Complexity**: Medium
**Impact**: Low

Be aware of Obsidian Sync status to prevent conflicts.

**Features:**
- Detect if file is syncing
- Warn before editing syncing files
- Handle sync conflicts gracefully
- Pause edits during sync

---

## Obsidian API Quick Reference

Key APIs we could leverage:

| API | Purpose | Status |
|-----|---------|--------|
| `workspace.activeEditor` | Current editor access | Not used |
| `workspace.on('file-menu')` | Context menu hooks | Not used |
| `workspace.on('active-leaf-change')` | File change tracking | Not used |
| `addStatusBarItem()` | Status bar display | Not used |
| `metadataCache.getFileCache()` | Link/metadata access | Partially used |
| `metadataCache.getBacklinksForFile()` | Backlink access | Not used |
| `workspace.getActiveViewOfType()` | View type checking | Not used |
| Drag/drop events | File drag & drop | Not used |
