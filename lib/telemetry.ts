export type TelemetryEvent = "copy_install" | "github_open" | "search_no_results";

export function trackEvent(event: TelemetryEvent, source: string) {
  if (typeof window === "undefined") return;

  const endpoint = new URL("/events/collect.txt", window.location.origin);
  endpoint.searchParams.set("event", event);
  endpoint.searchParams.set("source", source);

  void fetch(endpoint, {
    cache: "no-store",
    credentials: "omit",
    keepalive: true,
    referrerPolicy: "no-referrer",
  }).catch(() => undefined);
}
