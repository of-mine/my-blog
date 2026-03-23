import { getPostBySlug, getAllPosts } from "@/lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc"; // 服务端版本的 MDX 渲染器
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

// 生成页面的 <title> 标签
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "文章不存在" };
  return { title: post.title, description: post.excerpt };
}

// 告诉 Next.js 提前生成哪些静态页面（所有文章的 slug）
export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound(); // slug 不存在时跳转 404

  return (
    <>
      <Navbar />

      <main className="max-w-2xl mx-auto px-4 py-10">

        {/* 返回首页 */}
        <Link
          href="/"
          className="text-sm text-stone-400 hover:text-amber-500 transition-colors no-underline mb-8 inline-block"
        >
          ← 返回首页
        </Link>

        {/* 文章头部 */}
        <header className="mb-10">
          {/* 标签 */}
          <div className="flex gap-2 flex-wrap mb-4">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/tags/${encodeURIComponent(tag)}`}
                className="no-underline"
              >
                <span className="text-xs px-3 py-1 rounded-full bg-amber-50 text-amber-600 border border-amber-200">
                  {tag}
                </span>
              </Link>
            ))}
          </div>

          {/* 标题 */}
          <h1 className="font-serif text-4xl font-medium text-stone-800 leading-snug mb-4">
            {post.title}
          </h1>

          {/* 日期 + 阅读时长 */}
          <div className="flex gap-4 text-sm text-stone-400">
            <span>{post.date}</span>
            <span>·</span>
            <span>阅读约 {post.readingTime} 分钟</span>
          </div>

          {/* 装饰线 */}
          <div className="h-0.5 mt-6 rounded bg-gradient-to-r from-amber-300 via-amber-100 to-transparent" />
        </header>

        {/* 文章正文，prose 是 Tailwind 提供的文章排版样式 */}
        <article className="prose prose-stone prose-a:text-amber-600 prose-headings:font-serif prose-headings:font-medium prose-blockquote:border-amber-300 prose-blockquote:text-amber-700 max-w-none">
          <MDXRemote source={post.content} />
        </article>

        {/* 底部返回按钮 */}
        <div className="mt-16 pt-8 border-t border-amber-100 text-center">
          <Link
            href="/"
            className="inline-block px-8 py-2.5 rounded-full border border-amber-300 text-amber-600 text-sm hover:bg-amber-50 transition-colors no-underline"
          >
            返回文章列表
          </Link>
        </div>

      </main>

      <Footer />
    </>
  );
}