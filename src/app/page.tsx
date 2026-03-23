import { getAllPosts } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import SearchBar from "@/components/SearchBar";
import ClockWidget from "@/components/ClockWidget";
import DailyViewWidget from "@/components/DailyViewWidget";
import SiteAgeWidget from "@/components/SiteAgeWidget";
import TagCloud from "@/components/TagCloud";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <>
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 py-10" style={{ overflow: "visible" }}>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8 items-start">

          {/* 左栏 */}
          <section style={{ position: "relative", zIndex: 0 }}>
            <SearchBar posts={posts} />

            <p className="text-xs text-stone-400 uppercase tracking-widest mb-4">
              最近发布 · {posts.length} 篇
            </p>

            <div className="flex flex-col gap-4" z-0>
              {posts.length === 0 ? (
                <p className="text-center text-stone-400 py-20 italic">
                  还没有文章，去 content/posts/ 写第一篇吧 ✍️
                </p>
              ) : (
                posts.map((post) => <PostCard key={post.slug} post={post} />)
              )}
            </div>
          </section>

          {/* 右栏：小组件 *//*基准时间*/}
          <aside className="flex flex-col gap-4 sticky top-20">
            <ClockWidget />
            <DailyViewWidget />
            <SiteAgeWidget launchDate="2026-01-01" />
            <TagCloud />
          </aside>

        </div>
      </main>

      <Footer />
    </>
  );
}