import { Modal, App, setIcon } from "obsidian";
import { Conversation } from "../types";
import { ConversationManager } from "../agent/ConversationManager";

export class ConversationHistoryModal extends Modal {
  private conversationManager: ConversationManager;
  private onSelect: (id: string) => void;
  private onDelete: (id: string) => void;
  private conversations: Conversation[] = [];

  constructor(
    app: App,
    conversationManager: ConversationManager,
    onSelect: (id: string) => void,
    onDelete: (id: string) => void
  ) {
    super(app);
    this.conversationManager = conversationManager;
    this.onSelect = onSelect;
    this.onDelete = onDelete;
  }

  async onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.addClass("claude-code-history-modal");

    // Header.
    const headerEl = contentEl.createDiv({ cls: "claude-code-history-header" });
    headerEl.createEl("h2", { text: "Conversation History" });

    // Load conversations.
    this.conversations = await this.conversationManager.getConversations();

    if (this.conversations.length === 0) {
      const emptyEl = contentEl.createDiv({ cls: "claude-code-history-empty" });
      emptyEl.setText("No conversations yet. Start a new chat!");
      return;
    }

    // Conversation list.
    const listEl = contentEl.createDiv({ cls: "claude-code-history-list" });

    for (const conv of this.conversations) {
      this.renderConversationItem(listEl, conv);
    }
  }

  private renderConversationItem(container: HTMLElement, conv: Conversation) {
    const itemEl = container.createDiv({ cls: "claude-code-history-item" });

    // Main content (clickable).
    const contentEl = itemEl.createDiv({ cls: "claude-code-history-item-content" });
    contentEl.addEventListener("click", () => {
      this.onSelect(conv.id);
      this.close();
    });

    // Title.
    const titleEl = contentEl.createDiv({ cls: "claude-code-history-item-title" });
    titleEl.setText(conv.title);

    // Metadata.
    const metaEl = contentEl.createDiv({ cls: "claude-code-history-item-meta" });
    const date = new Date(conv.updatedAt);
    const dateStr = date.toLocaleDateString() + " " + date.toLocaleTimeString();
    metaEl.setText(`${conv.messageCount} messages · ${dateStr}`);

    // Delete button.
    const deleteBtn = itemEl.createEl("button", {
      cls: "claude-code-history-item-delete",
      attr: { "aria-label": "Delete conversation" },
    });
    setIcon(deleteBtn, "trash-2");
    deleteBtn.addEventListener("click", async (e) => {
      e.stopPropagation();
      if (confirm(`Delete "${conv.title}"?`)) {
        this.onDelete(conv.id);
        itemEl.remove();
      }
    });
  }

  onClose() {
    const { contentEl } = this;
    contentEl.empty();
  }
}
