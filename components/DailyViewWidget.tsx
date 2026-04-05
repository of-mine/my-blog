"use client";

import { useEffect, useState } from "react";

function getLocalDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function DailyViewWidget() {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    const todayKey = `pv_${getLocalDateKey(new Date())}`;
    const stored = parseInt(localStorage.getItem(todayKey) ?? "0", 10);
    const updated = stored + 1;
    localStorage.setItem(todayKey, String(updated));
    setViews(updated);
  }, []);

  return (
    <div className="rounded-[26px] border border-white/70 bg-[rgba(255,255,255,0.82)] px-5 py-5 text-center shadow-[0_16px_55px_rgba(45,74,73,0.10)] backdrop-blur-xl">
      <div className="text-xs uppercase tracking-[0.28em] text-stone-400 mb-3">Visit Counter</div>
      <div className="font-serif text-3xl text-[var(--teal-500)]">{views ?? "…"}</div>
      <div className="text-xs text-[var(--text-muted)] mt-2">仅统计当前浏览器</div>
    </div>
  );
}
