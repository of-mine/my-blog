"use client";

import { useEffect, useState } from "react";

export default function ClockWidget() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!now) return null;

  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  const weeks = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
  const dateStr = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日 ${weeks[now.getDay()]}`;

  return (
    <div className="rounded-[26px] border border-white/70 bg-[rgba(255,255,255,0.82)] px-5 py-5 text-center shadow-[0_16px_55px_rgba(45,74,73,0.10)] backdrop-blur-xl">
      <div className="text-xs uppercase tracking-[0.28em] text-stone-400 mb-3">Current Time</div>
      <div className="font-serif text-4xl text-[var(--teal-500)] tracking-[0.08em]">
        {hh}:{mm}
      </div>
      <div className="text-xs text-[var(--text-muted)] mt-2">{dateStr}</div>
    </div>
  );
}
