"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  initialQuery?: string;
  compact?: boolean;
}

export default function SearchBar({ initialQuery = "", compact = false }: Props) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      router.push("/search");
      return;
    }

    // 统一跳到独立搜索页，后续所有搜索结果都在同一个页面查看。
    router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`);
  }

  return (
    <form onSubmit={handleSubmit} className={compact ? "w-full max-w-xs" : "w-full"}>
      <input
        type="text"
        placeholder="搜索文章、标签..."
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        className={
          compact
            ? "w-full rounded-full border border-white/60 bg-white/80 px-4 py-2 text-sm text-stone-700 outline-none shadow-sm backdrop-blur focus:border-amber-300 transition-colors"
            : "w-full rounded-full border border-amber-100 bg-white px-5 py-3 text-sm text-stone-700 outline-none focus:border-amber-300 transition-colors"
        }
      />
    </form>
  );
}
