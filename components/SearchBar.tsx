"use client"; // 需要监听输入事件，必须是客户端组件

import { useState, useEffect, useRef } from "react";
import Fuse from "fuse.js";        // 模糊搜索库
import Link from "next/link";
import type { PostMeta } from "../lib/posts";

interface Props {
  posts: PostMeta[]; // 从首页传入所有文章，搜索在前端完成，不需要请求接口
}

export default function SearchBar({ posts }: Props) {
  const [query, setQuery] = useState("");          // 搜索关键词
  const [results, setResults] = useState<PostMeta[]>([]); // 搜索结果
  const [open, setOpen] = useState(false);         // 控制下拉框显示
  const ref = useRef<HTMLDivElement>(null);         // 用于检测点击是否在组件外部

  // 初始化 Fuse 搜索实例
  const fuse = new Fuse(posts, {
    keys: ["title", "excerpt", "tags"], // 在这三个字段里搜索
    threshold: 0.4,                     // 匹配宽松度，0 = 精确，1 = 什么都匹配
  });

  // 每次输入变化时重新搜索
  useEffect(() => {
    if (!query.trim()) { setResults([]); return; }
    setResults(fuse.search(query).map((r) => r.item).slice(0, 6)); // 最多显示 6 条
  }, [query]);

  // 点击组件外部时关闭下拉框
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative mb-6">

      {/* 搜索输入框 */}
      <input
        type="text"
        placeholder="搜索文章、标签..."
        value={query}
        onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        className="w-full px-5 py-2.5 rounded-full border border-amber-100 bg-white text-sm text-stone-700 outline-none focus:border-amber-300 transition-colors"
      />

      {/* 搜索结果下拉框 */}
      {open && results.length > 0 && (
        <div className="absolute top-full mt-2 left-0 right-0 bg-white border border-amber-100 rounded-2xl shadow-lg shadow-amber-50 z-50 overflow-hidden">
          {results.map((post) => (
            <Link
              key={post.slug}
              href={`/posts/${post.slug}`}
              onClick={() => { setOpen(false); setQuery(""); }} // 点击后关闭并清空搜索框
              className="block no-underline"
            >
              <div className="px-4 py-3 border-b border-amber-50 hover:bg-amber-50 transition-colors">
                {/* 文章标题 */}
                <div className="text-sm font-medium text-stone-700">{post.title}</div>
                {/* 日期和标签 */}
                <div className="text-xs text-stone-400 mt-1">
                  {post.date} · {post.tags.join(", ")}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

    </div>
  );
}