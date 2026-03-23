import { getAllTags } from "@/lib/posts";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "标签" };

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <>
      <Navbar />

      <main className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="font-serif text-3xl font-medium text-stone-800 mb-8">
          所有标签
        </h1>

        <div className="flex flex-wrap gap-3">
          {tags.map(({ tag, count }) => (
            <Link
              key={tag}
              href={`/tags/${encodeURIComponent(tag)}`}
              className="no-underline"
            >
              <div className="bg-white border border-amber-100 rounded-2xl px-5 py-3 hover:-translate-y-0.5 hover:shadow-md hover:shadow-amber-50 transition-all flex items-center gap-2">
                <span className="text-stone-700">{tag}</span>
                {/* 文章数量徽标 */}
                <span className="text-xs bg-amber-50 text-amber-500 border border-amber-200 rounded-full px-2 py-0.5">
                  {count}
                </span>
              </div>
            </Link>
          ))}
        </div>

      </main>

      <Footer />
    </>
  );
}