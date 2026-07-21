import { CopyButton } from "@/components/copy-button";

type InstallCommandProps = {
  command: string;
  label?: string;
  compact?: boolean;
};

export function InstallCommand({ command, label = "TERMINAL", compact = false }: InstallCommandProps) {
  return (
    <div className={`install-command ${compact ? "is-compact" : ""}`}>
      <div className="command-label">
        <span>{label}</span>
        <span>READY</span>
      </div>
      <div className="command-row">
        <span className="prompt-mark" aria-hidden="true">$</span>
        <code>{command}</code>
        <CopyButton value={command} />
      </div>
    </div>
  );
}

