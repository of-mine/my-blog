import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

// post 是从父组件（首页）传入的单篇文章数据
export default function PostCard({ post }: { post: PostMeta }) {
  return (
    // 整张卡片是一个链接，点击跳转文章详情页
    // group：父元素加 group 后，子元素可以用 group-hover: 响应父元素的 hover 状态
    <Link href={`/posts/${post.slug}`} className="block no-underline group">
      <article style={{
        background: "rgba(255,255,255,0.75)", // 半透明白色，透出背景渐变
        backdropFilter: "blur(8px)",          // 毛玻璃效果
        border: "1px solid var(--border)",
        borderRadius: 20,                     // 圆润卡片
        padding: "1.5rem",
        transition: "all 0.2s",
      }}
        // hover 时卡片上浮 + 出现阴影
        className="hover:-translate-y-1 hover:shadow-lg hover:shadow-teal-100"
      >

        {/* 标签列表 */}
        <div className="flex gap-2 flex-wrap mb-3">
          {post.tags.map((tag) => (
            <span key={tag} style={{
              fontSize: 11,
              padding: "3px 12px",
              borderRadius: 999,             // 胶囊形标签
              background: "var(--teal-50)",
              color: "var(--teal-400)",
              border: "1px solid var(--teal-100)",
            }}>
              {tag}
            </span>
          ))}
        </div>

        {/* 文章标题，hover 时颜色变深 */}
        <h2 style={{
          fontFamily: "'Lora', serif",
          fontSize: 20,
          fontWeight: 500,
          color: "var(--text-main)",
          margin: "0 0 8px",
          lineHeight: 1.4,
          transition: "color 0.2s",
        }}
          // group-hover：鼠标悬停在父元素（整张卡片）时触发
          className="group-hover:text-teal-500"
        >
          {post.title}
        </h2>

        {/* 文章摘要 */}
        <p style={{
          fontSize: 14,
          color: "var(--text-muted)",
          lineHeight: 1.7,
          margin: "0 0 14px",
        }}>
          {post.excerpt}
        </p>

        {/* 底部：日期和阅读时长 */}
        <div className="flex justify-between items-center"
          style={{ fontSize: 12, color: "var(--text-muted)" }}>
          <span>{post.date}</span>
          <span>阅读约 {post.readingTime} 分钟</span>
        </div>

        {/* 底部装饰渐变线 */}
        <div style={{
          height: 2,
          borderRadius: 1,
          marginTop: 14,
          // 从青绿色渐变到透明
          background: "linear-gradient(to right, var(--teal-300), var(--teal-100), transparent)",
          opacity: 0.6,
        }} />

      </article>
    </Link>
  );
}