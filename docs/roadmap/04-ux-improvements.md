# UX Improvements Roadmap

Interface and experience enhancements to make the plugin more powerful and delightful.

## Current UX

The plugin provides:
- Right sidebar chat interface (Cursor-style)
- Streaming message display with markdown
- Collapsible tool call blocks
- Slash command autocomplete
- File mention autocomplete (@)
- Permission approval modal
- Conversation history browser
- Settings tab with model selection

## Proposed Enhancements

### P1 - High Priority

#### Inline Edit Mode
**Status**: Planned
**Complexity**: High
**Impact**: High

Enable editing directly in the editor view instead of just through chat.

**Features:**
- Select text → "Edit with Claude" floating button
- Inline diff preview (like GitHub suggestions)
- Accept/reject individual changes
- Multi-cursor support for batch edits
- Keyboard shortcut (Cmd+I) for quick access

**UX Flow:**
1. Select text in editor
2. Press Cmd+I or click floating button
3. Type instruction ("make this more concise")
4. See inline diff preview
5. Accept or reject changes

**Implementation considerations:**
- Use CodeMirror decorations for diff display
- Preserve undo history
- Handle partial selections gracefully

#### Quick Actions Bar
**Status**: Planned
**Complexity**: Medium
**Impact**: Medium

Add a bar of common actions above the chat input.

**Actions:**
- 📎 Add current file to context
- 🔍 Search vault
- 📝 Summarize selection
- ✨ Improve writing
- 🏷️ Suggest tags
- 📊 Analyze note

**Features:**
- Customizable action set in settings
- Keyboard shortcuts for each action
- Context-aware visibility (some actions only when file is open)

#### Context Chips Enhancement
**Status**: Planned
**Complexity**: Low
**Impact**: Medium

Improve the file context chip display.

**Enhancements:**
- Show file preview on hover
- Click to open file
- Drag to reorder context
- Clear all button
- Context size indicator (token estimate)
- Warn when context is large

---

### P2 - Medium Priority

#### Conversation Branching
**Status**: Planned
**Complexity**: High
**Impact**: Medium

Allow forking conversations to explore different directions.

**Features:**
- "Branch from here" button on any message
- Visual branch indicator in history
- Switch between branches
- Merge branches (bring context from one to another)
- Compare branches side by side

**Use cases:**
- Try different approaches without losing original
- Explore "what if" scenarios
- Keep multiple threads of thought

#### Enhanced Markdown Preview
**Status**: Planned
**Complexity**: Medium
**Impact**: Medium

Improve message rendering quality.

**Enhancements:**
- Syntax highlighting for all languages (not just common ones)
- Mermaid diagram rendering
- Math equation support (LaTeX)
- Collapsible sections for long content
- Copy code button on all code blocks
- Line numbers option for code

#### Message Actions
**Status**: Planned
**Complexity**: Low
**Impact**: Medium

Add action buttons to messages.

**Actions:**
- Copy message
- Copy code blocks only
- Regenerate response
- Edit and resubmit (for user messages)
- Branch from here
- Add to note

#### Response Streaming Improvements
**Status**: Planned
**Complexity**: Medium
**Impact**: Medium

Enhance the streaming experience.

**Features:**
- Typing indicator shows which tool is running
- Progress bar for long operations
- Estimated time remaining
- Partial results display
- Better cancellation (show what was generated)

#### Keyboard Navigation
**Status**: Planned
**Complexity**: Medium
**Impact**: Medium

Full keyboard control of the interface.

**Shortcuts:**
- `Cmd+K` - New conversation
- `Cmd+/` - Focus chat input
- `Cmd+Up/Down` - Navigate messages
- `Cmd+Enter` - Send with current file context
- `Cmd+Shift+Enter` - Send and execute (skip confirmations)
- `Esc` - Cancel streaming / close popups
- `Tab` - Cycle through suggestions

---

### P3 - Low Priority

#### Voice Input
**Status**: Idea
**Complexity**: High
**Impact**: Low

Speech-to-text for hands-free interaction.

**Features:**
- Push-to-talk button
- Voice activity detection
- Transcription display before send
- Voice feedback option (read responses aloud)

**Considerations:**
- Requires browser Speech API or external service
- Privacy implications
- Background noise handling

#### Split View Mode
**Status**: Idea
**Complexity**: High
**Impact**: Medium

Chat alongside editor in configurable layouts.

**Layouts:**
- Side by side (current)
- Chat below editor
- Floating chat window
- Full-screen chat mode
- Pop-out to separate window

#### Themes & Customization
**Status**: Idea
**Complexity**: Low
**Impact**: Low

Visual customization options.

**Options:**
- Chat bubble style (bubbles vs flat)
- Message density (compact vs comfortable)
- Font size independent of Obsidian
- Custom accent colors
- Avatar customization

#### Smart Suggestions
**Status**: Idea
**Complexity**: High
**Impact**: Medium

Proactive suggestions based on context.

**Features:**
- Suggest questions based on current file
- Auto-complete common queries
- Recent query history
- Suggested follow-ups after responses

#### Pinned Messages
**Status**: Idea
**Complexity**: Low
**Impact**: Low

Pin important messages for reference.

**Features:**
- Pin any message to top of chat
- Pinned section above conversation
- Unpin to return to normal flow
- Export pinned messages

#### Notification Integration
**Status**: Idea
**Complexity**: Low
**Impact**: Low

Better notification handling.

**Features:**
- Desktop notifications for completed responses
- Badge on ribbon icon when response ready
- Sound effects (optional)
- Do Not Disturb mode

---

## Interaction Patterns to Consider

### Current Patterns
| Action | Current Method |
|--------|----------------|
| Send message | Enter key |
| New line | Shift+Enter |
| Cancel | Escape / Stop button |
| Add file | @ mention |
| Commands | / prefix |

### Proposed Additional Patterns
| Action | Proposed Method |
|--------|-----------------|
| Quick edit | Cmd+I on selection |
| Include current file | Cmd+Enter to send |
| Regenerate | Click on message |
| Branch | Right-click message |
| Navigate history | Cmd+Up/Down |

---

## Accessibility Considerations

Future enhancements should consider:
- Screen reader compatibility
- High contrast mode support
- Keyboard-only navigation
- Reduced motion option
- Font size scaling
- Focus indicators

---

## Performance Considerations

UX improvements should not impact:
- Initial load time
- Message rendering speed
- Streaming responsiveness
- Memory usage with long conversations
- Responsiveness during tool execution
