import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "关于" };

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="max-w-2xl mx-auto px-4 py-10">

        <h1 className="font-serif text-3xl font-medium text-stone-800 mb-2">
          关于这里
        </h1>

        {/* 装饰线 */}
        <div className="w-12 h-0.5 bg-amber-300 rounded mb-8" />

        <div className="prose prose-stone prose-a:text-amber-600 prose-headings:font-serif prose-headings:font-medium max-w-none">
          <p>你好，欢迎来到<strong>拾光记</strong>。</p>
          <p>这里是我记录生活、整理思绪的地方。文字是我与世界对话的方式，也是留住时光的容器。</p>

          <blockquote>
            生命中那些细小的瞬间，值得被认真对待。
          </blockquote>

          <h2>联系我</h2>
          <p>如果你有任何想法或建议，欢迎通过以下方式找到我：</p>
          <ul>
            <li>Email：hello@example.com</li>
            <li>GitHub：github.com/yourname</li>
          </ul>
        </div>

      </main>

      <Footer />
    </>
  );
}