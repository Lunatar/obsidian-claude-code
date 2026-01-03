import { Modal, App, setIcon } from "obsidian";
import { PermissionRequest } from "../types";

export type PermissionChoice = "once" | "session" | "always";

export class PermissionModal extends Modal {
  private request: PermissionRequest;
  private onApprove: (choice: PermissionChoice) => void;
  private onDeny: () => void;
  private selectedChoice: PermissionChoice = "once";

  constructor(
    app: App,
    request: PermissionRequest,
    onApprove: (choice: PermissionChoice) => void,
    onDeny: () => void
  ) {
    super(app);
    this.request = request;
    this.onApprove = onApprove;
    this.onDeny = onDeny;
  }

  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.addClass("claude-code-permission-modal");

    // Header with icon.
    const headerEl = contentEl.createDiv({ cls: "claude-code-permission-header" });
    const iconEl = headerEl.createSpan({ cls: "claude-code-permission-icon" });
    setIcon(iconEl, this.getRiskIcon());
    iconEl.addClass(`risk-${this.request.risk}`);
    headerEl.createEl("h2", { text: "Permission Required" });

    // Description.
    const descEl = contentEl.createDiv({ cls: "claude-code-permission-desc" });
    descEl.setText(this.request.description);

    // Risk level badge.
    const riskEl = contentEl.createDiv({ cls: "claude-code-permission-risk" });
    const riskBadge = riskEl.createSpan({
      cls: `claude-code-permission-risk-badge risk-${this.request.risk}`,
      text: `${this.request.risk.toUpperCase()} RISK`,
    });

    // Tool details.
    const detailsEl = contentEl.createDiv({ cls: "claude-code-permission-details" });
    detailsEl.createEl("strong", { text: "Tool: " });
    detailsEl.createSpan({ text: this.request.toolName });

    // Input preview.
    if (Object.keys(this.request.toolInput).length > 0) {
      const inputEl = contentEl.createDiv({ cls: "claude-code-permission-input" });
      inputEl.createEl("strong", { text: "Input:" });
      const preEl = inputEl.createEl("pre");
      preEl.setText(JSON.stringify(this.request.toolInput, null, 2));
    }

    // Remember options as radio buttons.
    const rememberEl = contentEl.createDiv({ cls: "claude-code-permission-remember" });

    // Option 1: Just this once.
    const onceLabel = rememberEl.createEl("label", { cls: "claude-code-permission-option" });
    const onceRadio = onceLabel.createEl("input", { type: "radio", attr: { name: "remember", value: "once" } });
    onceRadio.checked = true;
    onceLabel.createSpan({ text: " Just this once" });
    onceRadio.addEventListener("change", () => { this.selectedChoice = "once"; });

    // Option 2: Remember for session.
    const sessionLabel = rememberEl.createEl("label", { cls: "claude-code-permission-option" });
    const sessionRadio = sessionLabel.createEl("input", { type: "radio", attr: { name: "remember", value: "session" } });
    sessionLabel.createSpan({ text: " Remember for this session" });
    sessionRadio.addEventListener("change", () => { this.selectedChoice = "session"; });

    // Option 3: Always allow.
    const alwaysLabel = rememberEl.createEl("label", { cls: "claude-code-permission-option" });
    const alwaysRadio = alwaysLabel.createEl("input", { type: "radio", attr: { name: "remember", value: "always" } });
    alwaysLabel.createSpan({ text: " Always allow (saved to settings)" });
    alwaysRadio.addEventListener("change", () => { this.selectedChoice = "always"; });

    // Buttons.
    const buttonsEl = contentEl.createDiv({ cls: "claude-code-permission-buttons" });

    const denyBtn = buttonsEl.createEl("button", { cls: "claude-code-permission-deny" });
    denyBtn.setText("Deny");
    denyBtn.addEventListener("click", () => {
      this.onDeny();
      this.close();
    });

    const approveBtn = buttonsEl.createEl("button", {
      cls: "claude-code-permission-approve mod-cta",
    });
    approveBtn.setText("Approve");
    approveBtn.addEventListener("click", () => {
      this.onApprove(this.selectedChoice);
      this.close();
    });

    // Focus deny button for safety.
    denyBtn.focus();
  }

  private getRiskIcon(): string {
    switch (this.request.risk) {
      case "high":
        return "alert-triangle";
      case "medium":
        return "alert-circle";
      case "low":
        return "info";
    }
  }

  onClose() {
    const { contentEl } = this;
    contentEl.empty();
  }
}
