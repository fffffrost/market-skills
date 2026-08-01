"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { trackEvent } from "@/lib/telemetry";

type TrackedGithubLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  eventSource: string;
};

export function TrackedGithubLink({ children, eventSource, onClick, ...props }: TrackedGithubLinkProps) {
  return (
    <a
      {...props}
      onClick={(event) => {
        trackEvent("github_open", eventSource);
        onClick?.(event);
      }}
    >
      {children}
    </a>
  );
}
