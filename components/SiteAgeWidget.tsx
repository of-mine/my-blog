"use client";

import { useEffect, useState } from "react";

interface Props {
  launchDate: string; // 建站日期，格式 "YYYY-MM-DD"，在调用时传入
  inline?: boolean;   // 可选，true = 行内文字模式（用于页脚），false = 卡片模式（用于侧边栏）
}

export default function SiteAgeWidget({ launchDate, inline = false }: Props) {
  const [age, setAge] = useState({ days: 0});

  useEffect(() => {
    function calc() {
      const diff = Date.now() - new Date(launchDate).getTime(); // 毫秒差
      const totalSec = Math.floor(diff / 1000); // 转换为总秒数
      setAge({
        days:    Math.floor(totalSec / 86400),          // 86400 = 一天的秒数
      });
    }
    calc();
    const timer = setInterval(calc, 1000*60*60); // 每小时重新计算节省性能
    return () => clearInterval(timer);
  }, [launchDate]);

  // 行内模式：只输出一句话，嵌入页脚文字中
  if (inline) {
    return (
      <span style={{ color: "var(--teal-400)", fontWeight: 500 }}>
        {age.days} 天
      </span>
    );
  }

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
        网站运营时长
      </div>

      {/* 时间单位卡片 */}
    {/* 数字和"天"在同一行 */}
    <div className="bodychar">
      {age.days} 天
    </div>
    </div>
  );
}