"use client"; // 需要定时器和状态，必须是客户端组件

import { useEffect, useState } from "react";

export default function ClockWidget() {
  // useState<Date | null>：初始值为 null，避免服务端渲染时时间和客户端不一致报错
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date()); // 组件加载后立即设置当前时间
    // setInterval 每 1000ms（1秒）更新一次时间
    const timer = setInterval(() => setNow(new Date()), 1000);
    // 返回清理函数：组件销毁时清除定时器，防止内存泄漏
    return () => clearInterval(timer);
  }, []); // 空数组：只在组件挂载时执行一次

  // 时间还没初始化时不渲染任何内容
  if (!now) return null;

  // padStart(2, "0")：不足两位时补零，如 9 → "09"
  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");

  const weeks = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
  const dateStr = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日 ${weeks[now.getDay()]}`;

  return (
    <div style={{
      background: "rgba(255,255,255,0.75)",
      backdropFilter: "blur(8px)",
      border: "1px solid var(--border)",
      borderRadius: 20,
      padding: "1.25rem",
      textAlign: "center",
    }}>
      {/* 时间：用 Lora 衬线字体增加质感 */}
      <div style={{
        fontFamily: "'Lora', serif",
        fontSize: 30,
        fontWeight: 500,
        color: "var(--teal-400)",
        letterSpacing: "0.08em", // 数字之间留点间距更好看
      }}>
        {hh}:{mm}
      </div>
      {/* 日期 */}
      <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>
        {dateStr}
      </div>
    </div>
  );
}