"use client";

import { useState } from "react";

type CopyButtonProps = {
  value: string;
  label?: string;
  className?: string;
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

export function CopyButton({ value, label = "复制命令", className = "" }: CopyButtonProps) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  async function handleCopy() {
    try {
      await copyText(value);
      setState("copied");
    } catch {
      setState("failed");
    }
    window.setTimeout(() => setState("idle"), 1800);
  }

  const text = state === "copied" ? "已复制 ✓" : state === "failed" ? "请手动复制" : label;

  return (
    <button className={`copy-button ${className}`.trim()} type="button" onClick={handleCopy}>
      {text}
    </button>
  );
}

