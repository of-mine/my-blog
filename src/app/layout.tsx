import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "蝈蝈's Blog",
    template: "%s · 蝈蝈's Blog",
  },
  description: "这是蝈蝈的Blog,记录一些有趣的东西,还有我的思考和感悟。",
  icons: {
    // 这里写的是浏览器访问路径，不是电脑上的磁盘路径。
    // 只要文件在 public/icon.png，Next.js 就会把它映射成 /icon.png
    icon: "/cat.png",
    apple: "/cat.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
