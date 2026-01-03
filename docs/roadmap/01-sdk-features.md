# SDK Features Roadmap

Unused Claude Agent SDK capabilities that could significantly enhance the plugin.

## Currently Used

The plugin already leverages these SDK features:
- `query()` function with streaming
- MCP server integration
- Tool presets (claude_code)
- Session resumption
- Custom `canUseTool` permission callback
- Model selection
- Budget limits
- Skill loading via `settingSources`

## Planned Enhancements

### P0 - Critical

#### Hooks System
**Status**: Planned
**Complexity**: Medium
**Impact**: High

The SDK provides a comprehensive hooks system that we're not using. Hooks enable reactive UI updates and fine-grained control over the agent lifecycle.

**Available hooks:**
- `PreToolUse` - Inspect tool calls before execution, show preview UI
- `PostToolUse` - React to successful tool execution
- `PostToolUseFailure` - Handle tool failures gracefully
- `Notification` - Display SDK notifications in Obsidian
- `SessionStart` / `SessionEnd` - Track session lifecycle
- `SubagentStart` / `SubagentStop` - Monitor subagent activity
- `PreCompact` - Prepare for context compaction
- `PermissionRequest` - Fine-grained permission control

**Use cases:**
- Show tool preview cards before execution
- Display progress notifications during long operations
- Track token usage per session
- Implement custom permission UI with more context

**Implementation hint:**
```typescript
query({
  prompt,
  options: {
    hooks: {
      PreToolUse: [(event) => {
        // Show tool preview in UI
        this.showToolPreview(event.toolName, event.toolInput);
      }],
      PostToolUse: [(event) => {
        // Update UI with result
        this.updateToolResult(event.toolCallId, event.result);
      }]
    }
  }
})
```

---

### P1 - High Priority

#### Structured Output
**Status**: Planned
**Complexity**: Low
**Impact**: Medium

Define JSON schemas for predictable, parseable responses. Useful for specific query types where you want structured data rather than prose.

**Use cases:**
- "List all tasks in this note" → JSON array of tasks
- "Extract metadata from this file" → Structured frontmatter object
- "Summarize this folder" → Structured summary with counts

**Implementation hint:**
```typescript
query({
  prompt: "Extract all tasks from this note",
  options: {
    outputFormat: {
      type: "json",
      schema: {
        type: "object",
        properties: {
          tasks: { type: "array", items: { type: "string" } },
          completedCount: { type: "number" }
        }
      }
    }
  }
})
```

#### Custom Subagent Definitions
**Status**: Partially used
**Complexity**: Medium
**Impact**: Medium

The SDK supports programmatic subagent definitions via the `agents` option. While Task spawning works, we could define Obsidian-specific agent types.

**Potential custom agents:**
- `vault-researcher` - Specialized for searching and analyzing vault content
- `note-editor` - Focused on content creation and formatting
- `organizer` - Specialized in file organization and tagging
- `reviewer` - Analyzes and suggests improvements to notes

**Implementation hint:**
```typescript
query({
  prompt,
  options: {
    agents: {
      'vault-researcher': {
        tools: ['Grep', 'Glob', 'Read', 'mcp__obsidian__*'],
        systemPrompt: 'You are a vault research specialist...'
      }
    }
  }
})
```

---

### P2 - Medium Priority

#### File Checkpointing
**Status**: Planned
**Complexity**: Medium
**Impact**: Medium

Enable `enableFileCheckpointing` to track file changes during a session. This allows rewinding to previous states if something goes wrong.

**Use cases:**
- Undo a series of file edits
- Preview changes before committing
- Recovery from accidental modifications

**Implementation hint:**
```typescript
const q = query({
  prompt,
  options: { enableFileCheckpointing: true }
});

// Later, if needed:
q.rewindFiles(); // Restore all files to checkpoint
```

#### Dynamic Model Switching
**Status**: Planned
**Complexity**: Low
**Impact**: Low

Use `setModel()` to change models mid-conversation. Useful for switching to a faster model for simple tasks or a more capable model for complex reasoning.

**Use cases:**
- Start with Haiku for quick questions, switch to Opus for deep analysis
- Automatic fallback if primary model is unavailable

#### Account Info Display
**Status**: Planned
**Complexity**: Low
**Impact**: Low

Use `accountInfo()` to display subscription status and limits in the settings UI.

**Use cases:**
- Show remaining API credits
- Display subscription tier
- Warn when approaching limits

#### Permission Modes
**Status**: Planned
**Complexity**: Low
**Impact**: Medium

The SDK supports different permission modes:
- `default` - Current behavior, ask for each tool
- `acceptEdits` - Auto-approve file edits, ask for others
- `plan` - Planning mode, no execution
- `bypassPermissions` - Trust all (dangerous)

**Use cases:**
- "Accept all edits" mode for trusted batch operations
- "Plan only" mode for reviewing what Claude would do

---

### P3 - Low Priority

#### Interrupt Method
**Status**: Idea
**Complexity**: Low
**Impact**: Low

Use `interrupt()` for cleaner cancellation instead of AbortController. Allows graceful shutdown with partial results.

#### Custom System Prompts
**Status**: Idea
**Complexity**: Low
**Impact**: Medium

Allow users to provide custom system prompts in settings, appended to the default Claude Code prompt.

**Use cases:**
- Add vault-specific context ("This vault contains...")
- Define personal preferences ("Always use bullet points...")
- Set domain expertise ("You are helping with academic research...")

#### Fallback Model
**Status**: Idea
**Complexity**: Low
**Impact**: Low

Configure `fallbackModel` to automatically retry with a different model if the primary fails.

---

## SDK Methods Reference

Methods available on the query object that we could expose:

| Method | Purpose | Status |
|--------|---------|--------|
| `interrupt()` | Graceful cancellation | Not used |
| `rewindFiles()` | Restore file checkpoint | Not used |
| `setPermissionMode()` | Change permission mode | Not used |
| `setModel()` | Switch models | Not used |
| `setMaxThinkingTokens()` | Adjust thinking budget | Not used |
| `supportedCommands()` | Get available commands | Not used |
| `supportedModels()` | Get available models | Not used |
| `mcpServerStatus()` | Check MCP health | Not used |
| `accountInfo()` | Get account details | Not used |
