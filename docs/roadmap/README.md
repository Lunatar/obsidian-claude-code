# Obsidian Claude Code Roadmap

> Transform Obsidian into an AI-native knowledge environment

This roadmap outlines enhancement opportunities for obsidian-claude-code, organized by category and priority. The goal is to make Claude an indispensable part of your knowledge workflow, deeply integrated with Obsidian's unique capabilities.

## Priority Levels

| Priority | Definition | Timeline |
|----------|------------|----------|
| **P0** | Critical - High impact, foundational features | Next release |
| **P1** | High - Significant user value, moderate complexity | Near-term |
| **P2** | Medium - Nice-to-have, adds polish or niche value | Mid-term |
| **P3** | Low - Experimental or low-demand features | Long-term |

## Categories

### [01 - SDK Features](./01-sdk-features.md)
Unused Claude Agent SDK capabilities that could enhance the plugin's power.
- Hooks system for UI integration
- Structured output for predictable responses
- File checkpointing and rewinding
- Dynamic model switching

### [02 - Obsidian Integration](./02-obsidian-integration.md)
Native Obsidian APIs and patterns not yet leveraged.
- Editor integration (cursor, selection, inline edits)
- Context menus and file actions
- Status bar indicators
- Canvas support

### [03 - New MCP Tools](./03-new-mcp-tools.md)
31 new Obsidian-specific tools for Claude, organized by workflow.
- Knowledge graph navigation
- Advanced search and discovery
- Template and daily note automation
- Vault analysis and maintenance

### [04 - UX Improvements](./04-ux-improvements.md)
Interface and experience enhancements.
- Inline editing mode
- Conversation branching
- Quick actions bar
- Voice input

### [05 - Ecosystem Integration](./05-ecosystem-integration.md)
Integrations with popular Obsidian plugins.
- Dataview query bridge
- Templater automation
- Tasks plugin support
- Calendar awareness

## Implementation Status

| Feature | Category | Priority | Status |
|---------|----------|----------|--------|
| Hooks for permission UI | SDK | P0 | Planned |
| Editor cursor integration | Obsidian | P0 | Planned |
| Context menu actions | Obsidian | P0 | Planned |
| get_graph_connections tool | Tools | P1 | Planned |
| Status bar indicator | Obsidian | P1 | Planned |
| Dataview integration | Ecosystem | P1 | Planned |
| Structured output | SDK | P1 | Planned |
| Canvas tools | Tools | P2 | Planned |
| Voice input | UX | P3 | Idea |

## Contributing Ideas

Have a feature idea? The best enhancements come from real workflows. Consider:
- What repetitive tasks could Claude automate?
- What Obsidian features would benefit from AI assistance?
- What's missing from your current PKM workflow?

## Design Principles

1. **Native feel** - Features should feel like natural Obsidian extensions
2. **Non-destructive** - Always preserve user data, offer undo/rewind
3. **Progressive disclosure** - Simple by default, powerful when needed
4. **Offline-friendly** - Degrade gracefully without API access
5. **Privacy-first** - Vault data stays local unless explicitly shared
