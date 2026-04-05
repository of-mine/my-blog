"use client";

import { useEffect, useState } from "react";

interface Props {
  launchDate: string;
  inline?: boolean;
}

export default function SiteAgeWidget({ launchDate, inline = false }: Props) {
  const [age, setAge] = useState({ days: 0 });

  useEffect(() => {
    function calc() {
      const diff = Date.now() - new Date(launchDate).getTime();
      const totalSec = Math.floor(diff / 1000);
      setAge({
        days: Math.floor(totalSec / 86400),
      });
    }

    calc();
    const timer = setInterval(calc, 1000 * 60 * 60);
    return () => clearInterval(timer);
  }, [launchDate]);

  if (inline) {
    return <span style={{ color: "var(--teal-400)", fontWeight: 500 }}>{age.days} 天</span>;
  }

  return (
    <div className="rounded-[26px] border border-white/70 bg-[rgba(255,255,255,0.82)] px-5 py-5 text-center shadow-[0_16px_55px_rgba(45,74,73,0.10)] backdrop-blur-xl">
      <div className="text-xs uppercase tracking-[0.28em] text-stone-400 mb-3">Site Age</div>
      <div className="font-serif text-3xl text-[var(--teal-500)]">{age.days} 天</div>
      <div className="text-xs text-[var(--text-muted)] mt-2">从建站起持续累计</div>
    </div>
  );
}
