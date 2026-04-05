import Link from "next/link";
import { getAllTags } from "@/lib/posts";

export default function TagCloud() {
  const tags = getAllTags();

  return (
    <div className="rounded-[26px] border border-white/70 bg-[rgba(255,255,255,0.82)] px-5 py-5 shadow-[0_16px_55px_rgba(45,74,73,0.10)] backdrop-blur-xl">
      <Link
        href="/tags"
        className="block no-underline text-xs uppercase tracking-[0.28em] text-stone-400 mb-4 hover:text-[var(--teal-500)] transition-colors"
      >
        Tag Index
      </Link>

      <div className="flex flex-wrap gap-2">
        {tags.map(({ tag, count }) => (
          <Link key={tag} href={`/tags/${encodeURIComponent(tag)}`} className="no-underline">
            <span className="inline-flex items-center rounded-full border border-teal-100 bg-teal-50 px-3 py-1.5 text-xs text-teal-600 transition-colors hover:bg-teal-400 hover:text-white">
              {tag}
              <span className="ml-1 opacity-70">{count}</span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
