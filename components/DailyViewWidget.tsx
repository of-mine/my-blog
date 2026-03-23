"use client"; // 需要访问 localStorage，必须是客户端组件

import { useEffect, useState } from "react";

export default function DailyViewWidget() {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    // 以今天日期为 key，如 "pv_2024-11-20"，每天自动重置
    const todayKey = `pv_${new Date().toISOString().slice(0, 10)}`;
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
        今日浏览
      </div>
      {/* views 为 null 时显示省略号，数据加载后显示数字 */}
      <div className="bodychar">
        {views ?? "…"}次
      </div>
    </div>
  );
}