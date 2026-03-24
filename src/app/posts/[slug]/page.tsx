import { getPostBySlug, getAllPosts, slugifyHeading } from "@/lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

interface Props {
  params: { slug: string };
}

// MDX 的标题 children 可能是 string、数组或 React 元素，这里统一提取成纯文本。
function getNodeText(children: ReactNode): string {
  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }

  if (Array.isArray(children)) {
    return children.map((child) => getNodeText(child)).join("");
  }

  if (children && typeof children === "object" && "props" in children) {
    return getNodeText((children as { props?: { children?: ReactNode } }).props?.children);
  }

  return "";
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "文章不存在" };
  return { title: post.title, description: post.excerpt };
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default function PostPage({ params }: Props) {
  const { slug } = params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  // 用于处理“同名标题”的去重计数（例如两个“总结”标题）。
  const headingCounts = new Map<string, number>();

  function getHeadingId(children: ReactNode): string {
    const text = getNodeText(children);
    const baseId = slugifyHeading(text) || `section-${headingCounts.size + 1}`;
    const nextCount = (headingCounts.get(baseId) ?? 0) + 1;
    headingCounts.set(baseId, nextCount);
    return nextCount === 1 ? baseId : `${baseId}-${nextCount}`;
  }

  // 覆盖 MDX 的 h2/h3 渲染：给标题加 id，目录才能跳转到对应位置。
  const mdxComponents = {
    h2: ({ children, ...props }: ComponentPropsWithoutRef<"h2">) => {
      const id = getHeadingId(children);
      return (
        <h2 {...props} id={id} className="scroll-mt-24">
          <a href={`#${id}`} className="no-underline">
            {children}
          </a>
        </h2>
      );
    },
    h3: ({ children, ...props }: ComponentPropsWithoutRef<"h3">) => {
      const id = getHeadingId(children);
      return (
        <h3 {...props} id={id} className="scroll-mt-24">
          <a href={`#${id}`} className="no-underline">
            {children}
          </a>
        </h3>
      );
    },
  };

  return (
    <>
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-10">
        <Link
          href="/"
          className="text-sm text-stone-500 hover:text-amber-600 transition-colors no-underline mb-8 inline-flex items-center gap-2"
        >
          <span>←</span>
          <span>返回首页</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[220px_minmax(0,1fr)] gap-8 items-start">
          {/* 左侧目录：桌面端 sticky，移动端会自然排到正文上方。 */}
          <aside className="lg:sticky lg:top-24">
            <div className="rounded-[26px] border border-white/60 bg-[rgba(255,255,255,0.68)] backdrop-blur-xl shadow-[0_20px_60px_rgba(45,74,73,0.10)] p-5">
              <div className="text-xs uppercase tracking-[0.28em] text-stone-400 mb-4">
                文章目录
              </div>

              {post.headings.length === 0 ? (
                <p className="text-sm text-stone-400 leading-6 m-0">
                  这篇文章还没有二级或三级标题。
                </p>
              ) : (
                <nav aria-label="文章目录">
                  <ul className="m-0 p-0 list-none space-y-2">
                    {post.headings.map((heading) => (
                      <li key={heading.id} className={heading.level === 3 ? "ml-4" : ""}>
                        <a
                          href={`#${heading.id}`}
                          className="block rounded-2xl px-3 py-2 text-sm leading-6 text-stone-500 hover:text-teal-600 hover:bg-white/70 transition-colors no-underline"
                        >
                          {heading.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
            </div>
          </aside>

          <section className="relative">
            {/* 两层浅色背景做“叠层卡片”效果，强化正文和页面背景的层级。 */}
            <div className="absolute inset-x-6 inset-y-5 rounded-[32px] bg-white/25 border border-white/30" />
            <div className="absolute inset-x-3 inset-y-2 rounded-[30px] bg-[rgba(255,255,255,0.42)] border border-white/40" />

            <div className="relative rounded-[28px] border border-white/70 bg-[rgba(255,255,255,0.84)] backdrop-blur-xl shadow-[0_28px_80px_rgba(45,74,73,0.16)] overflow-hidden">
              <header className="px-6 py-8 md:px-10 md:py-10 border-b border-emerald-100/80 bg-gradient-to-br from-white/80 via-white/65 to-emerald-50/50">
                <div className="flex gap-2 flex-wrap mb-4">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/tags/${encodeURIComponent(tag)}`}
                      className="no-underline"
                    >
                      <span className="inline-flex items-center rounded-full border border-emerald-100 bg-white/80 px-3 py-1 text-xs text-teal-700">
                        {tag}
                      </span>
                    </Link>
                  ))}
                </div>

                <h1 className="font-serif text-4xl md:text-[2.7rem] font-medium text-stone-800 leading-[1.25] mb-5">
                  {post.title}
                </h1>

                <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-stone-500">
                  <span>{post.date}</span>
                  <span className="text-stone-300">·</span>
                  <span>阅读约 {post.readingTime} 分钟</span>
                </div>

                <div className="h-px mt-6 bg-gradient-to-r from-teal-300 via-emerald-100 to-transparent" />
              </header>

              <article className="article-prose prose prose-stone max-w-none px-6 py-8 md:px-10 md:py-10">
                {/* 正文仍然来自 markdown，不需要你手写 html 结构。 */}
                <MDXRemote source={post.content} components={mdxComponents} />
              </article>

              <div className="px-6 pb-8 md:px-10 md:pb-10">
                <div className="pt-8 border-t border-emerald-100/80 text-center">
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/75 px-8 py-3 text-sm text-teal-700 hover:bg-emerald-50 transition-colors no-underline"
                  >
                    <span>回到文章列表</span>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
