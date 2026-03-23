
// Next.js 约定：not-found.tsx 会在调用 notFound() 或访问不存在的路径时自动显示
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function NotFound() {
  return (
    <>
      <Navbar />

      <main className="max-w-2xl mx-auto px-4 py-10 text-center">

        <div className="font-serif text-8xl font-medium text-amber-100 leading-none mb-4">
          404
        </div>

        <h2 className="font-serif text-2xl font-medium text-stone-500 mb-8 italic">
          这个页面好像迷路了…
        </h2>

        <Link
          href="/"
          className="inline-block px-8 py-2.5 rounded-full border border-amber-300 text-amber-600 text-sm hover:bg-amber-50 transition-colors no-underline"
        >
          回到首页
        </Link>

      </main>
    </>
  );
}