"use client";

import { sendGTMEvent } from "@next/third-parties/google";
import { useCallback } from "react";

type GTMEventMap =
  | { event: "story_click"; story_slug: string; story_city: string; total_cost: number }
  | { event: "form_submit_success"; city: string; total_cost: number; guest_count: number }
  | { event: "share_click"; method: "copy" | "twitter" | "facebook"; story_slug: string }
  | { event: "search"; search_term: string }
  | { event: "filter_change"; filter_type: "city" | "sort" | "budget" | "guests"; filter_value: string };

export function useGTM() {
  const trackEvent = useCallback((data: GTMEventMap) => {
    sendGTMEvent(data);
  }, []);

  return { trackEvent };
}
