import fs from "fs";           // Node.js 内置：读取文件系统
import path from "path";       // Node.js 内置：处理文件路径
import matter from "gray-matter"; // 解析文章顶部的配置信息（标题、日期、标签）

// 文章文件夹的绝对路径
const postsDir = path.join(process.cwd(), "content/posts");

// 定义文章的数据结构（列表页用）
export interface PostMeta {
  slug: string;       // 文章的唯一标识，就是文件名（不含扩展名）
  title: string;      // 文章标题
  date: string;       // 发布日期
  excerpt: string;    // 摘要
  tags: string[];     // 标签数组
  readingTime: number;// 预计阅读时长（分钟）
}

// 定义完整文章结构（详情页用，比 PostMeta 多一个 content 字段）
export interface Post extends PostMeta {
  content: string; // 文章正文 Markdown 内容
}

// 计算阅读时长（按中文 300 字/分钟估算）
function calcReadingTime(content: string): number {
  const words = content.replace(/\s+/g, "").length;
  return Math.max(1, Math.ceil(words / 300));
}

// 获取所有文章的元信息（用于首页列表）
export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDir)) return []; // 文件夹不存在则返回空数组

  const files = fs
    .readdirSync(postsDir) // 读取文件夹内所有文件
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md")); // 只保留文章文件

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.(mdx|md)$/, ""); // 去掉扩展名作为 slug
    const raw = fs.readFileSync(path.join(postsDir, filename), "utf-8");
    const { data, content } = matter(raw); // data = 顶部配置，content = 正文

    return {
      slug,
      title: data.title ?? "无标题",
      date: String(data.date ?? new Date().toISOString().slice(0, 10)).slice(0, 10),
      excerpt: data.excerpt ?? content.slice(0, 100).replace(/[#*`]/g, "") + "…",
      tags: data.tags ?? [],
      readingTime: calcReadingTime(content),
    } as PostMeta;
  });

  // 按日期降序排列（最新的在最前面）
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

// 根据 slug 获取单篇文章完整内容（用于详情页）
export function getPostBySlug(slug: string): Post | null {
  const extensions = [".mdx", ".md"];
  for (const ext of extensions) {
    const filepath = path.join(postsDir, `${slug}${ext}`);
    if (fs.existsSync(filepath)) {
      const raw = fs.readFileSync(filepath, "utf-8");
      const { data, content } = matter(raw);
      return {
        slug,
        title: data.title ?? "无标题",
        date: String(data.date ?? new Date().toISOString().slice(0, 10)).slice(0, 10),
        excerpt: data.excerpt ?? "",
        tags: data.tags ?? [],
        readingTime: calcReadingTime(content),
        content, // 完整正文
      };
    }
  }
  return null; // 找不到则返回 null
}

// 获取所有标签及每个标签的文章数量（用于标签云）
export function getAllTags(): { tag: string; count: number }[] {
  const posts = getAllPosts();
  const map: Record<string, number> = {};
  posts.forEach((p) => p.tags.forEach((t) => (map[t] = (map[t] ?? 0) + 1)));
  return Object.entries(map)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count); // 按数量降序
}