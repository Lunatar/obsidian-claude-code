import { ChatMessage } from "../types";
import type ClaudeCodePlugin from "../main";
import { MessageRenderer } from "./MessageRenderer";

export class MessageList {
  private containerEl: HTMLElement;
  private plugin: ClaudeCodePlugin;
  private messageRenderers: Map<string, MessageRenderer> = new Map();

  constructor(containerEl: HTMLElement, plugin: ClaudeCodePlugin) {
    this.containerEl = containerEl;
    this.plugin = plugin;
  }

  render(messages: ChatMessage[]) {
    this.containerEl.empty();
    this.messageRenderers.clear();

    for (const message of messages) {
      const messageEl = this.containerEl.createDiv();
      const renderer = new MessageRenderer(messageEl, message, this.plugin);
      renderer.render();
      this.messageRenderers.set(message.id, renderer);
    }

    // Scroll to bottom.
    this.scrollToBottom();
  }

  updateMessage(messageId: string, updates: Partial<ChatMessage>) {
    const renderer = this.messageRenderers.get(messageId);
    if (renderer) {
      renderer.update(updates);
    }
  }

  appendToMessage(messageId: string, content: string) {
    const renderer = this.messageRenderers.get(messageId);
    if (renderer) {
      renderer.appendContent(content);
    }
  }

  private scrollToBottom() {
    this.containerEl.scrollTop = this.containerEl.scrollHeight;
  }
}
