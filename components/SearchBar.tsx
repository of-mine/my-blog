"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  initialQuery?: string;
  compact?: boolean;
}

//拿到外部传参
export default function SearchBar({ initialQuery = "", compact = false }: Props) {
  //得到路由对象,例如router.push('/search?q=xxx')可以跳转到搜索页并传参
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);

  //处理表单提交事件
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {//event是表单事件对象
    //阻止表单默认提交行为，防止页面刷新,注销掉发现提交表单会直接刷新本页面而不是完成想要的跳转功能
    event.preventDefault();

    //query.trim()去掉前后空格，如果trim后是空字符串就跳转到/search页，否则跳转到/search?q=xxx页
    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      router.push("/search");
      return;
    }

    // 统一跳到独立搜索页，后续所有搜索结果都在同一个页面查看。
    router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`);
  }

  return (
    <form onSubmit={handleSubmit} className={compact ? "w-full max-w-xl" : "w-full"}>
      <input
        type="text"
        placeholder="搜索文章、标签..."
        //
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
