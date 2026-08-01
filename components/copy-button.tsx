"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/telemetry";

type CopyButtonProps = {
  value: string;
  label?: string;
  className?: string;
  eventSource?: string;
  locale?: "en" | "zh";
};

async function copyText(value: string) {
  try {
    await navigator.clipboard.writeText(value);
    return;
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = value;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    const copied = document.execCommand("copy");
    textarea.remove();
    if (!copied) throw new Error("copy failed");
  }
}

export function CopyButton({ value, label, className = "", eventSource, locale = "en" }: CopyButtonProps) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  async function handleCopy() {
    try {
      await copyText(value);
      setState("copied");
      if (eventSource) trackEvent("copy_install", eventSource);
    } catch {
      setState("failed");
    }
    window.setTimeout(() => setState("idle"), 1800);
  }

  const idleLabel = label ?? (locale === "en" ? "Copy command" : "复制命令");
  const text = state === "copied"
    ? locale === "en" ? "Copied ✓" : "已复制 ✓"
    : state === "failed"
      ? locale === "en" ? "Copy manually" : "请手动复制"
      : idleLabel;

  return (
    <button className={`copy-button ${className}`.trim()} type="button" onClick={handleCopy}>
      {text}
    </button>
  );
}
