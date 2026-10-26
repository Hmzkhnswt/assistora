"use client";

import { useEffect } from "react";
import { track, type AnalyticsEvent, type AnalyticsParams } from "@/lib/analytics";

export function TrackEvent({ event, params }: { event: AnalyticsEvent; params?: AnalyticsParams }) {
  const key = JSON.stringify(params ?? {});
  useEffect(() => {
    track(event, JSON.parse(key) as AnalyticsParams);
  }, [event, key]);
  return null;
}
