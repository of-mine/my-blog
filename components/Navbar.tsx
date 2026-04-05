"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import SearchBar from "@/components/SearchBar";

const navLinks = [
  { href: "/", label: "首页" },
  { href: "/tags", label: "标签" },
  { href: "/archive", label: "归档" },
  { href: "/about", label: "关于" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-[99] px-4 pt-4">
      <div className="max-w-6xl mx-auto rounded-[26px] border border-white/70 bg-[rgba(255,255,255,0.82)] px-4 py-3 shadow-[0_16px_55px_rgba(45,74,73,0.12)] backdrop-blur-xl md:px-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <Link href="/" className="no-underline">
              <span
                style={{
                  fontFamily: "'Lora', serif",
                  fontSize: 22,
                  fontWeight: 500,
                  color: "var(--teal-500)",
                  letterSpacing: "0.04em",
                }}
              >
                蝈蝈&apos;s Blog
              </span>
            </Link>

            <nav className="flex flex-wrap items-center gap-2" aria-label="主导航">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`no-underline rounded-full px-4 py-2 text-sm transition-colors ${
                      isActive
                        ? "bg-[var(--teal-400)] text-white"
                        : "text-[var(--text-muted)] hover:bg-white/80 hover:text-[var(--teal-500)]"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <SearchBar compact />
        </div>
      </div>
    </header>
  );
}
