"use client"; // 需要访问 localStorage，必须是客户端组件

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
    // 用本地日期做 key，避免 UTC 零点导致国内时区提前“跨天”
    const todayKey = `pv_${getLocalDateKey(new Date())}`;
    // 读取今天已有的浏览次数，没有则默认 0
    const stored = parseInt(localStorage.getItem(todayKey) ?? "0", 10);
    const updated = stored + 1; // 每次访问页面 +1
    localStorage.setItem(todayKey, String(updated)); // 存回去
    setViews(updated);
  }, []); // 只在组件挂载时执行一次

  return (
    <div style={{
      background: "rgba(255,255,255,0.75)",
      backdropFilter: "blur(8px)",
      border: "1px solid var(--border)",
      borderRadius: 20,
      padding: "1.25rem",
      textAlign: "center",
    }}>
      <div className="upchar">
        本地今日访问
      </div>
      {/* views 为 null 时显示省略号，数据加载后显示数字 */}
      <div className="bodychar">
        {views ?? "…"}次
      </div>
    </div>
  );
}
