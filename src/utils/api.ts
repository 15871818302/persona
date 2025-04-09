import {
  BlogPost,
  BlogListResponse,
  Author,
  Category,
  Tag,
} from "../types/blog";

// 模拟博客数据
const AUTHORS: Author[] = [
  {
    id: "1",
    name: "小明",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    bio: "前端开发工程师，热爱React和TypeScript",
  },
  {
    id: "2",
    name: "小红",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    bio: "全栈开发者，专注于用户体验和性能优化",
  },
];

const CATEGORIES: Category[] = [
  { id: "1", name: "前端", slug: "frontend" },
  { id: "2", name: "工具", slug: "tools" },
  { id: "3", name: "后端", slug: "backend" },
  { id: "4", name: "架构", slug: "architecture" },
  { id: "5", name: "移动开发", slug: "mobile" },
];

const TAGS: Tag[] = [
  { id: "1", name: "React", slug: "react" },
  { id: "2", name: "TypeScript", slug: "typescript" },
  { id: "3", name: "CSS", slug: "css" },
  { id: "4", name: "Tailwind", slug: "tailwind" },
  { id: "5", name: "Vite", slug: "vite" },
  { id: "6", name: "构建工具", slug: "build-tools" },
  { id: "7", name: "Vitest", slug: "vitest" },
  { id: "8", name: "测试", slug: "testing" },
  { id: "9", name: "Hooks", slug: "hooks" },
];

const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "开始使用 React 和 TypeScript",
    slug: "getting-started-with-react-and-typescript",
    excerpt:
      "React 和 TypeScript 一起使用的最佳实践，以及如何设置一个优雅的开发环境。",
    content: "这是一篇关于 React 和 TypeScript 结合使用的详细教程...",
    author: AUTHORS[0],
    categories: [CATEGORIES[0]],
    tags: [TAGS[0], TAGS[1]],
    publishedAt: "2025-03-15",
    readingTime: 5,
    featured: true,
  },
  {
    id: "2",
    title: "Tailwind CSS 响应式布局技巧",
    slug: "tailwind-css-responsive-layout-tips",
    excerpt:
      "学习如何使用 Tailwind CSS 快速构建响应式网站，并且保持代码干净整洁。",
    content: "在本文中，我们将探讨 Tailwind CSS 的响应式设计功能...",
    coverImage:
      "https://images.unsplash.com/photo-1618788372246-79faff0c3742?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    author: AUTHORS[1],
    categories: [CATEGORIES[0]],
    tags: [TAGS[2], TAGS[3]],
    publishedAt: "2025-03-10",
    readingTime: 7,
    featured: true,
  },
  {
    id: "3",
    title: "Vite 构建工具深度解析",
    slug: "vite-build-tool-in-depth",
    excerpt:
      "深入了解 Vite 构建工具的工作原理，以及为什么它比传统构建工具更快。",
    content: "Vite 是一个由尤雨溪创建的新型前端构建工具...",
    coverImage:
      "https://images.unsplash.com/photo-1607798748738-b15847c4b0bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    author: AUTHORS[0],
    categories: [CATEGORIES[1]],
    tags: [TAGS[4], TAGS[5]],
    publishedAt: "2025-02-28",
    readingTime: 10,
    featured: true,
  },
  {
    id: "4",
    title: "TypeScript 高级类型技巧",
    slug: "typescript-advanced-types",
    excerpt: "探索 TypeScript 的高级类型特性，让你的代码更加健壮和类型安全。",
    content: "在这篇文章中，我们将深入研究TypeScript的高级类型系统...",
    coverImage:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    author: AUTHORS[0],
    categories: [CATEGORIES[0]],
    tags: [TAGS[1]],
    publishedAt: "2025-02-15",
    readingTime: 12,
    featured: false,
  },
  {
    id: "5",
    title: "如何使用 Vitest 进行单元测试",
    slug: "how-to-use-vitest-for-unit-testing",
    excerpt: "了解如何使用 Vitest 为你的 React 应用编写高效的单元测试。",
    content: "Vitest 是一个由 Vite 支持的极速单元测试框架...",
    coverImage:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    author: AUTHORS[1],
    categories: [CATEGORIES[1]],
    tags: [TAGS[6], TAGS[7]],
    publishedAt: "2025-01-20",
    readingTime: 8,
    featured: false,
  },
  {
    id: "6",
    title: "React Hooks 最佳实践",
    slug: "react-hooks-best-practices",
    excerpt: "学习使用 React Hooks 的最佳实践和常见陷阱，提高你的组件质量。",
    content:
      "React Hooks 是 React 16.8 引入的新特性，它让你在不编写类的情况下使用状态和其他 React 特性...",
    coverImage:
      "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    author: AUTHORS[0],
    categories: [CATEGORIES[0]],
    tags: [TAGS[0], TAGS[8]],
    publishedAt: "2025-01-05",
    readingTime: 10,
    featured: false,
  },
];

// 模拟API请求延迟
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// 博客API服务
export const BlogApi = {
  // 获取博客文章列表
  async getBlogPosts(
    page = 1,
    limit = 6,
    category?: string
  ): Promise<BlogListResponse> {
    await delay(500); // 模拟网络延迟

    let filteredPosts = [...BLOG_POSTS];

    // 如果指定了分类，则过滤文章
    if (category) {
      filteredPosts = filteredPosts.filter((post) =>
        post.categories.some((cat) => cat.slug === category)
      );
    }

    // 计算分页
    const totalPosts = filteredPosts.length;
    const totalPages = Math.ceil(totalPosts / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const posts = filteredPosts.slice(startIndex, endIndex);

    return {
      posts,
      totalPosts,
      currentPage: page,
      totalPages,
    };
  },

  // 获取精选博客文章
  async getFeaturedPosts(): Promise<BlogPost[]> {
    await delay(300); // 模拟网络延迟
    return BLOG_POSTS.filter((post) => post.featured);
  },

  // 获取单个博客文章详情
  async getBlogPost(slug: string): Promise<BlogPost | null> {
    await delay(400); // 模拟网络延迟
    const post = BLOG_POSTS.find((post) => post.slug === slug);
    return post || null;
  },

  // 获取所有分类
  async getCategories(): Promise<Category[]> {
    await delay(200);
    return CATEGORIES;
  },

  // 获取所有标签
  async getTags(): Promise<Tag[]> {
    await delay(200);
    return TAGS;
  },
};
