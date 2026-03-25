import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "拾光记",
    template: "%s · 拾光记",
  },
  description: "一个温暖的文字角落",
  icons: {
    // 这里写的是浏览器访问路径，不是电脑上的磁盘路径。
    // 只要文件在 public/icon.png，Next.js 就会把它映射成 /icon.png
    icon: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
