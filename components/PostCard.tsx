import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

export default function PostCard({ post }: { post: PostMeta }) {
  return (
    <Link href={`/posts/${post.slug}`} className="group block no-underline">
      <article className="rounded-[26px] border border-white/70 bg-[rgba(255,255,255,0.74)] px-5 py-5 shadow-[0_16px_55px_rgba(45,74,73,0.08)] backdrop-blur-xl transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_22px_70px_rgba(45,74,73,0.12)]">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-teal-100 bg-teal-50 px-3 py-1 text-[11px] text-teal-600"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_140px] gap-5 items-start">
          <div>
            <h2 className="font-serif text-[22px] leading-[1.35] text-[var(--text-main)] mb-3 transition-colors group-hover:text-[var(--teal-500)]">
              {post.title}
            </h2>
            <p className="text-sm leading-7 text-[var(--text-muted)] m-0">
              {post.excerpt}
            </p>
          </div>

          <div className="rounded-[20px] border border-white/70 bg-white/60 px-4 py-4">
            <p className="text-[11px] uppercase tracking-[0.22em] text-stone-400 mb-2">Entry Meta</p>
            <p className="text-sm text-[var(--text-main)] mb-2">{post.date}</p>
            <p className="text-sm text-[var(--text-muted)]">约 {post.readingTime} 分钟</p>
          </div>
        </div>

        <div className="mt-5 h-px bg-gradient-to-r from-teal-300 via-teal-100 to-transparent" />
      </article>
    </Link>
  );
}
