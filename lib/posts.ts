import fs from "fs";
import path from "path";
import matter from "gray-matter";

// 文章目录固定在 content/posts，后续你只需要往这个目录加 md/mdx 文件。
const postsDir = path.join(process.cwd(), "content/posts");

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  readingTime: number;
}

export interface PostHeading {
  id: string;
  text: string;
  level: 2 | 3;
}

export interface Post extends PostMeta {
  content: string;
  headings: PostHeading[];
}

function formatDatePart(value: number): string {
  return String(value).padStart(2, "0");
}

// 把 frontmatter 里的日期统一成 YYYY-MM-DD，避免 Date/string 混用导致显示和排序异常。
function formatPostDate(value: unknown): string {
  const fallback = new Date();

  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return `${value.getFullYear()}-${formatDatePart(value.getMonth() + 1)}-${formatDatePart(value.getDate())}`;
  }

  if (typeof value === "string") {
    const trimmed = value.trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return trimmed;

    const parsed = new Date(trimmed);
    if (!Number.isNaN(parsed.getTime())) {
      return `${parsed.getFullYear()}-${formatDatePart(parsed.getMonth() + 1)}-${formatDatePart(parsed.getDate())}`;
    }
  }

  return `${fallback.getFullYear()}-${formatDatePart(fallback.getMonth() + 1)}-${formatDatePart(fallback.getDate())}`;
}

function normalizeTags(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.map((tag) => String(tag));
}

// 目录和锚点需要“纯文本标题”，这里把 markdown 内联语法剥离掉。
function stripInlineMarkdown(value: string): string {
  return value
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/[*_~]/g, "")
    .trim();
}

export function slugifyHeading(text: string): string {
  return stripInlineMarkdown(text)
    .toLowerCase()
    // 只保留英文、数字、中文和空格/短横线，保证生成的 id 稳定可读。
    .replace(/[^a-z0-9\u4e00-\u9fa5\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

// 从 markdown 正文中提取 ## / ### 作为目录项。
function extractHeadings(content: string): PostHeading[] {
  const lines = content.split(/\r?\n/);
  const counts = new Map<string, number>();
  const headings: PostHeading[] = [];

  for (const line of lines) {
    const match = /^(##|###)\s+(.+?)\s*$/.exec(line);
    if (!match) continue;

    const level = match[1].length as 2 | 3;
    const text = stripInlineMarkdown(match[2]);
    const baseId = slugifyHeading(text) || `section-${headings.length + 1}`;
    // 同名标题会自动追加 -2/-3，避免锚点 id 冲突。
    const nextCount = (counts.get(baseId) ?? 0) + 1;
    counts.set(baseId, nextCount);

    headings.push({
      id: nextCount === 1 ? baseId : `${baseId}-${nextCount}`,
      text,
      level,
    });
  }

  return headings;
}

function calcReadingTime(content: string): number {
  const words = content.replace(/\s+/g, "").length;
  return Math.max(1, Math.ceil(words / 300));
}

// 列表页和详情页都共用这段元数据构建逻辑，避免两边规则不一致。
function buildPostMeta(slug: string, data: Record<string, unknown>, content: string): PostMeta {
  return {
    slug,
    title: typeof data.title === "string" && data.title.trim() ? data.title : "无标题",
    date: formatPostDate(data.date),
    excerpt:
      typeof data.excerpt === "string" && data.excerpt.trim()
        ? data.excerpt
        : content.slice(0, 100).replace(/[#*`]/g, "") + "…",
    tags: normalizeTags(data.tags),
    readingTime: calcReadingTime(content),
  };
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDir)) return [];

  const files = fs
    .readdirSync(postsDir)
    .filter((filename) => filename.endsWith(".mdx") || filename.endsWith(".md"));

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.(mdx|md)$/, "");
    const raw = fs.readFileSync(path.join(postsDir, filename), "utf-8");
    const { data, content } = matter(raw);
    return buildPostMeta(slug, data as Record<string, unknown>, content);
  });

  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

export function getPostBySlug(slug: string): Post | null {
  for (const ext of [".mdx", ".md"]) {
    const filepath = path.join(postsDir, `${slug}${ext}`);
    if (!fs.existsSync(filepath)) continue;

    const raw = fs.readFileSync(filepath, "utf-8");
    const { data, content } = matter(raw);
    const meta = buildPostMeta(slug, data as Record<string, unknown>, content);

    return {
      ...meta,
      content,
      // 详情页左侧目录直接使用这里提取出的 heading 数据。
      headings: extractHeadings(content),
    };
  }

  return null;
}

export function getAllTags(): { tag: string; count: number }[] {
  const posts = getAllPosts();
  const map: Record<string, number> = {};

  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      map[tag] = (map[tag] ?? 0) + 1;
    });
  });

  return Object.entries(map)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}
