import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import ClockWidget from "@/components/ClockWidget";
import DailyViewWidget from "@/components/DailyViewWidget";
import SiteAgeWidget from "@/components/SiteAgeWidget";
import TagCloud from "@/components/TagCloud";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function HomePage() {// 默认首页展示最新的一篇文章作为 Featured Entry，下面是最近发布的文章列表。你也可以在这里放置一些站点的统计信息、状态或其他你觉得有趣的内容。
  const posts = getAllPosts();
  const featuredPost = posts[0];
  const recentPosts = posts.slice(1);

  return (
    <>
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-8 md:py-10">
        <section className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.35fr)_320px] gap-6 items-start">
          <div className="space-y-6">
            <section className="relative overflow-hidden rounded-[34px] border border-white/70 bg-[rgba(255,255,255,0.82)] px-6 py-8 shadow-[0_24px_90px_rgba(45,74,73,0.15)] backdrop-blur-xl md:px-10 md:py-10">
              <div className="absolute -top-16 right-[-30px] h-40 w-40 rounded-full bg-[radial-gradient(circle,_rgba(94,196,193,0.28),_rgba(94,196,193,0))]" />
              <div className="absolute bottom-[-36px] left-[-20px] h-32 w-32 rounded-full bg-[radial-gradient(circle,_rgba(153,219,217,0.42),_rgba(153,219,217,0))]" />

              <div className="relative">
                <p className="text-xs uppercase tracking-[0.34em] text-stone-400 mb-4">
                  Personal Wiki
                </p>

                <h1 className="font-serif text-4xl md:text-4xl leading-[1.15] text-[var(--text-main)] mb-4">
                  把生活、想法和正在学习的东西，
                  <br />
                  一点点整理成我自己的博客档案。
                </h1>

                <p className="max-w-2xl text-[15px] leading-8 text-[var(--text-muted)] mb-8">
                  这里不是一个追求热闹的信息流，而更像一份持续整理中的个人索引。文章、标签、归档和日常记录会慢慢长成一套属于自己的知识地图。
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="rounded-[22px] border border-white/70 bg-white/65 px-4 py-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-stone-400 mb-2">Posts</p>
                    <p className="font-serif text-3xl text-[var(--teal-500)]">{posts.length}</p>
                  </div>

                  <div className="rounded-[22px] border border-white/70 bg-white/65 px-4 py-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-stone-400 mb-2">Status</p>
                    <p className="font-serif text-2xl text-[var(--teal-500)]">Local Build</p>
                  </div>

                  <div className="rounded-[22px] border border-white/70 bg-white/65 px-4 py-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-stone-400 mb-2">Theme</p>
                    <p className="font-serif text-2xl text-[var(--teal-500)]">Quiet Notes</p>
                  </div>
                </div>
              </div>
            </section>

            {featuredPost ? (
              <section className="rounded-[30px] border border-white/70 bg-[rgba(255,255,255,0.82)] shadow-[0_22px_80px_rgba(45,74,73,0.12)] backdrop-blur-xl overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr]">
                  <div className="px-6 py-7 md:px-8 md:py-8">
                    <p className="text-xs uppercase tracking-[0.3em] text-stone-400 mb-4">Featured Entry</p>
                    <h2 className="font-serif text-3xl leading-[1.25] text-[var(--text-main)] mb-4">
                      {featuredPost.title}
                    </h2>
                    <p className="text-sm leading-7 text-[var(--text-muted)] mb-6">
                      {featuredPost.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {featuredPost.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-teal-100 bg-teal-50 px-3 py-1 text-xs text-teal-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/posts/${featuredPost.slug}`}
                      className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white/80 px-5 py-2.5 text-sm text-teal-700 no-underline hover:bg-teal-50 transition-colors"
                    >
                      继续阅读
                    </Link>
                  </div>

                  <div className="border-t md:border-t-0 md:border-l border-white/70 bg-[linear-gradient(180deg,rgba(240,250,250,0.95),rgba(255,255,255,0.65))] px-6 py-7 md:px-8 md:py-8">
                    <p className="text-xs uppercase tracking-[0.3em] text-stone-400 mb-4">Meta</p>
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs text-stone-400 uppercase tracking-[0.18em] mb-1">Published</p>
                        <p className="text-base text-[var(--text-main)]">{featuredPost.date}</p>
                      </div>
                      <div>
                        <p className="text-xs text-stone-400 uppercase tracking-[0.18em] mb-1">Reading Time</p>
                        <p className="text-base text-[var(--text-main)]">约 {featuredPost.readingTime} 分钟</p>
                      </div>
                      <div>
                        <p className="text-xs text-stone-400 uppercase tracking-[0.18em] mb-1">Archive Note</p>
                        <p className="text-sm leading-7 text-[var(--text-muted)]">
                          这一栏会优先展示最近更新的一篇内容，方便把首页当成你自己的个人索引入口。
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            ) : null}

            <section className="rounded-[30px] border border-white/70 bg-[rgba(255,255,255,0.8)] px-5 py-6 shadow-[0_18px_70px_rgba(45,74,73,0.10)] backdrop-blur-xl md:px-6">
              <div className="flex items-center justify-between gap-4 mb-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-stone-400 mb-2">Latest Notes</p>
                  <h2 className="font-serif text-2xl text-[var(--text-main)]">最近发布</h2>
                </div>

                <Link
                  href="/archive"
                  className="text-sm text-[var(--text-muted)] no-underline hover:text-[var(--teal-500)] transition-colors"
                >
                  查看归档
                </Link>
              </div>

              {posts.length === 0 ? (
                <div className="rounded-[24px] border border-dashed border-white/70 bg-white/55 px-6 py-16 text-center text-stone-400">
                  还没有文章，去 content/posts 里写下第一篇吧。
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {(recentPosts.length > 0 ? recentPosts : posts).map((post) => (
                    <PostCard key={post.slug} post={post} />
                  ))}
                </div>
              )}
            </section>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-20">
            <div className="rounded-[28px] border border-white/70 bg-[rgba(255,255,255,0.82)] px-5 py-5 shadow-[0_18px_70px_rgba(45,74,73,0.12)] backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.3em] text-stone-400 mb-3">Quick Panel</p>
              <p className="text-sm leading-7 text-[var(--text-muted)] mb-4">
                这一列可以继续扩展成站点资料、项目状态、朋友链接或你的学习清单。
              </p>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <Link href="/tags" className="no-underline rounded-[18px] bg-white/70 px-4 py-3 text-[var(--text-main)] hover:bg-teal-50 transition-colors">
                  标签索引
                </Link>
                <Link href="/archive" className="no-underline rounded-[18px] bg-white/70 px-4 py-3 text-[var(--text-main)] hover:bg-teal-50 transition-colors">
                  时间归档
                </Link>
                <Link href="/about" className="no-underline rounded-[18px] bg-white/70 px-4 py-3 text-[var(--text-main)] hover:bg-teal-50 transition-colors">
                  关于这里
                </Link>
                <Link href="/search" className="no-underline rounded-[18px] bg-white/70 px-4 py-3 text-[var(--text-main)] hover:bg-teal-50 transition-colors">
                  站内搜索
                </Link>
              </div>
            </div>

            <ClockWidget />
            <DailyViewWidget />
            <SiteAgeWidget launchDate="2026-01-01" />
            <TagCloud />
          </aside>
        </section>
      </main>

      <Footer />
    </>
  );
}
