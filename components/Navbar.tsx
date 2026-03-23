"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "首页" },
  { href: "/tags", label: "标签" },
  { href: "/archive", label: "归档" },
  { href: "/about", label: "关于" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [hovered, setHovered] = useState(false);

  return (
    <header style={{ position: "sticky", top: 0, zIndex: 99, padding: "12px 16px" }}>
      <div className="max-w-5xl mx-auto flex items-center justify-between">

        {/* 左侧：博客名 + 下拉面板，统一放在一个父容器里管理 hover */}
        <div
          style={{ position: "relative", display: "inline-block" }}
          onMouseEnter={() => setHovered(true)}  // 鼠标进入整个区域时展开
          onMouseLeave={() => setHovered(false)} // 鼠标离开整个区域时收起
        >
          {/* 博客名链接，单独一个干净的 Link */}
          <Link href="/" className="no-underline">
            <span style={{
              fontFamily: "'Lora', serif",
              fontSize: 20,
              fontWeight: 500,
              color: "var(--teal-400)",
              letterSpacing: "0.04em",
            }}>
              拾光记
            </span>
          </Link>

          {/* 下拉面板，绝对定位在博客名下方，左对齐 */}
          <div style={{
            position: "absolute",
            top: "100%",
            left: 0,       // 左对齐，不会被右侧元素遮住
            paddingTop: 8, // 用 padding 填充空隙，鼠标不会在空隙处丢失 hover
            visibility: hovered ? "visible" : "hidden",
            pointerEvents: hovered ? "auto" : "none",
            zIndex: 100,
          }}>
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
              background: "rgba(255,255,255,0.9)",
              backdropFilter: "blur(12px)",
              border: "1px solid var(--border)",
              borderRadius: 16,
              padding: hovered ? "8px" : "0 8px",
              overflow: "hidden",
              maxHeight: hovered ? "300px" : "0px",
              opacity: hovered ? 1 : 0,
              transition: "max-height 0.3s ease, opacity 0.2s ease, padding 0.2s ease",
              boxShadow: "0 8px 24px rgba(53,168,165,0.12)",
              minWidth: 100, // 确保面板不会太窄
              zIndex: 999,
            }}>
              {navLinks.map((link, i) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="no-underline"
                    style={{
                      fontSize: 13,
                      fontWeight: isActive ? 500 : 400,
                      padding: "8px 20px",
                      borderRadius: 999,
                      color: isActive ? "#fff" : "var(--text-muted)",
                      background: isActive ? "var(--teal-400)" : "transparent",
                      whiteSpace: "nowrap",
                      transform: hovered ? "translateY(0)" : "translateY(-8px)",
                      opacity: hovered ? 1 : 0,
                      transitionDelay: hovered ? `${i * 50}ms` : "0ms",
                      transition: "transform 0.25s ease, opacity 0.2s ease, background 0.2s",
                      display: "block",
                    }}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}