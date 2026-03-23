import Link from "next/link";
import { getAllTags } from "@/lib/posts";

export default function TagCloud() {
  const tags = getAllTags(); // 服务端直接读取所有标签

  return (
    <div style={{
      background: "rgba(255,255,255,0.75)",
      backdropFilter: "blur(8px)",
      border: "1px solid var(--border)",
      borderRadius: 20,
      padding: "1.25rem",
    }}>
      <div className="upchar"
        style={{
          textAlign: "center",
        }}>
        标签云
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {tags.map(({ tag, count }) => (
          <Link key={tag} href={`/tags/${encodeURIComponent(tag)}`} className="no-underline">
            <span style={{
              fontSize: 12,
              padding: "4px 14px",
              borderRadius: 999,             // 胶囊形
              background: "var(--teal-50)",
              color: "var(--teal-400)",
              border: "1px solid var(--teal-100)",
              cursor: "pointer",
              transition: "all 0.2s",
              display: "inline-block",
            }}>
              {tag}
              {/* 显示该标签下的文章数，透明度低一点作为次要信息 */}
              <span style={{ marginLeft: 4, opacity: 0.6 }}>·{count}</span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}