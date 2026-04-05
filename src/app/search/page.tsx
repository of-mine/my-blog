import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PostCard from "@/components/PostCard";
import SearchBar from "@/components/SearchBar";
import { searchPosts } from "@/lib/posts";

interface Props {
  searchParams?: {
    q?: string;
  };
}

export const metadata: Metadata = {
  title: "搜索",
};

export default function SearchPage({ searchParams }: Props) {
  const query = searchParams?.q?.trim() ?? "";
  const results = query ? searchPosts(query) : [];

  return (
    <>
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-10">
        <section className="rounded-[28px] border border-white/70 bg-[rgba(255,255,255,0.84)] backdrop-blur-xl shadow-[0_24px_80px_rgba(45,74,73,0.14)] px-6 py-8 md:px-10 md:py-10">
          <p className="text-xs uppercase tracking-[0.28em] text-stone-400 mb-4">站内搜索</p>
          <SearchBar initialQuery={query} />

          {query ? (
            <p className="text-sm text-stone-500 mt-5 mb-0">
              关键词 “{query}” 共找到 {results.length} 篇相关文章
            </p>
          ) : (
            <p className="text-sm text-stone-400 mt-5 mb-0">
              输入标题、摘要或标签来搜索文章。
            </p>
          )}
        </section>

        <section className="mt-8">
          {!query ? null : results.length === 0 ? (
            <div className="rounded-[24px] border border-dashed border-white/70 bg-white/55 px-6 py-16 text-center text-stone-400">
              没有找到匹配结果，试试换个关键词。
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {results.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}
