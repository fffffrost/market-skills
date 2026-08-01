import { CopyButton } from "@/components/copy-button";
import type { Locale } from "@/lib/site-content";

type InstallCommandProps = {
  command: string;
  label?: string;
  compact?: boolean;
  eventSource?: string;
  locale?: Locale;
};

export function InstallCommand({ command, label = "TERMINAL", compact = false, eventSource, locale = "en" }: InstallCommandProps) {
  return (
    <div className={`install-command ${compact ? "is-compact" : ""}`}>
      <div className="command-label">
        <span>{label}</span>
        <span>READY</span>
      </div>
      <div className="command-row">
        <span className="prompt-mark" aria-hidden="true">$</span>
        <code>{command}</code>
        <CopyButton value={command} eventSource={eventSource} locale={locale} />
      </div>
    </div>
  );
}
