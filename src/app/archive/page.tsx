import { getAllPosts } from "@/lib/posts";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "归档" };

export default function ArchivePage() {
  const posts = getAllPosts();

  // 按年份分组，结果类似 { "2024": [...], "2023": [...] }
  const grouped: Record<string, typeof posts> = {};
  posts.forEach((p) => {
    const year = p.date.slice(0, 4); // 取日期前四位作为年份
    if (!grouped[year]) grouped[year] = [];
    grouped[year].push(p);
  });

  // 年份降序排列
  const years = Object.keys(grouped).sort((a, b) => Number(b) - Number(a));

  return (
    <>
      <Navbar />

      <main className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="font-serif text-3xl font-medium text-stone-800 mb-10">
          归档 · {posts.length} 篇
        </h1>

        {years.length === 0 && (
          <p className="text-stone-400 italic">暂无文章</p>
        )}

        {years.map((year) => (
          <section key={year} className="mb-10">

            {/* 年份标题 */}
            <h2 className="font-serif text-xl font-medium text-amber-600 mb-4 pb-2 border-b border-amber-100">
              {year}
            </h2>

            {/* 该年份下的文章列表 */}
            <ul className="space-y-0">
              {grouped[year].map((post) => (
                <li
                  key={post.slug}
                  className="flex items-baseline gap-4 py-3 border-b border-dashed border-amber-50"
                >
                  {/* 月日 */}
                  <span className="text-sm text-stone-300 min-w-12">
                    {post.date.slice(5)} {/* 取 MM-DD 部分 */}
                  </span>

                  {/* 文章标题 */}
                  <Link
                    href={`/posts/${post.slug}`}
                    className="flex-1 text-stone-700 hover:text-amber-600 transition-colors no-underline"
                  >
                    {post.title}
                  </Link>

                  {/* 标签（最多显示两个） */}
                  <div className="flex gap-2">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded-full bg-amber-50 text-amber-500 border border-amber-100"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </li>
              ))}
            </ul>

          </section>
        ))}

      </main>

      <Footer />
    </>
  );
}