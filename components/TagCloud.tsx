import Link from "next/link";
import { getAllTags } from "@/lib/posts";

export default function TagCloud() {
  const tags = getAllTags(); // 直接读取所有标签，用来渲染标签云。

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.75)",
        backdropFilter: "blur(8px)",
        border: "1px solid var(--border)",
        borderRadius: 20,
        padding: "1.25rem",
      }}
    >
      {/* 标题单独跳到标签总页，避免和下面每个标签的链接发生嵌套冲突。 */}
      <Link
        href="/tags"
        // Tailwind 的 hover: 前缀表示“鼠标移上去时才生效”。
        // 这里默认文字颜色是 text-stone-400，悬停后会切换成 hover:text-amber-500。
        // transition-colors 让颜色变化更柔和，不会一下子突变。
        className="upchar no-underline block mb-4 text-center hover:text-amber-500 transition-colors"
      >
        标签云
      </Link>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {tags.map(({ tag, count }) => (
          <Link key={tag} href={`/tags/${encodeURIComponent(tag)}`} className="no-underline">
            <span
              style={{
                fontSize: 12,
                padding: "4px 14px",
                borderRadius: 999,
                background: "var(--teal-50)",
                color: "var(--teal-400)",
                border: "1px solid var(--teal-100)",
                cursor: "pointer",
                transition: "all 0.2s",
                display: "inline-block",
              }}
            >
              {/* 这里是标签名本体。
                  如果你以后想给每个标签也做“鼠标悬停变色”，更推荐改成 className 写法，例如：
                  className="inline-block rounded-full border border-teal-100 bg-teal-50 px-3 py-1 text-teal-400 hover:bg-teal-400 hover:text-white transition-colors"
                  这样默认和悬停状态会更直观。 */}
              {tag}
              <span style={{ marginLeft: 4, opacity: 0.6 }}>·{count}</span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
