"use client";

import { useEffect, useCallback } from "react";

export function useLocalStorageDraft<T>(
  key: string,
  value: T,
  onLoad: (saved: T) => void,
): () => void {
  // Load saved draft on mount (load effect runs before save effect on first render,
  // but state update is async — practical impact of overwrite is nil)
  useEffect(() => {
    try {
      const item = localStorage.getItem(key);
      if (item) onLoad(JSON.parse(item) as T);
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  // Auto-save on every change
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  }, [key, value]);

  return useCallback(() => {
    try { localStorage.removeItem(key); } catch {}
  }, [key]);
}
