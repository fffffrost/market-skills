import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CopyButton } from "@/components/copy-button";

describe("CopyButton", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("copies the command with the Clipboard API", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText } });
    render(<CopyButton value="npx skills add owner/repo" />);

    await userEvent.click(screen.getByRole("button", { name: "复制命令" }));

    expect(writeText).toHaveBeenCalledWith("npx skills add owner/repo");
    expect(screen.getByRole("button", { name: "已复制 ✓" })).toBeInTheDocument();
  });

  it("falls back to document.execCommand when Clipboard API fails", async () => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: vi.fn().mockRejectedValue(new Error("blocked")) },
    });
    const execCommand = vi.fn().mockReturnValue(true);
    Object.defineProperty(document, "execCommand", { configurable: true, value: execCommand });
    render(<CopyButton value="fallback command" />);

    await userEvent.click(screen.getByRole("button", { name: "复制命令" }));

    expect(execCommand).toHaveBeenCalledWith("copy");
    expect(screen.getByRole("button", { name: "已复制 ✓" })).toBeInTheDocument();
  });
});

