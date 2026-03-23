import { getAllPosts, getAllTags } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

interface Props {
  params: { tag: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tag = decodeURIComponent(params.tag); // 解码中文标签
  return { title: `#${tag}` };
}

// 提前生成所有标签页的静态页面
export async function generateStaticParams() {
  return getAllTags().map(({ tag }) => ({ tag: encodeURIComponent(tag) }));
}

export default function TagPage({ params }: Props) {
  const tag = decodeURIComponent(params.tag); // URL 里的中文是编码过的，这里解码还原
  const posts = getAllPosts().filter((p) => p.tags.includes(tag)); // 筛选包含该标签的文章

  if (posts.length === 0) notFound();

  return (
    <>
      <Navbar />

      <main className="max-w-2xl mx-auto px-4 py-10">

        {/* 返回标签列表 */}
        <Link
          href="/tags"
          className="text-sm text-stone-400 hover:text-amber-500 transition-colors no-underline mb-8 inline-block"
        >
          ← 所有标签
        </Link>

        {/* 标签标题 */}
        <h1 className="font-serif text-3xl font-medium text-stone-800 mb-2">
          #{tag}
        </h1>
        <p className="text-sm text-stone-400 mb-8">共 {posts.length} 篇文章</p>

        {/* 文章列表 */}
        <div className="flex flex-col gap-4">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>

      </main>

      <Footer />
    </>
  );
}