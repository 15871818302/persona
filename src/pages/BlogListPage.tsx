import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import BlogList from '../components/blog/BlogList';
import { BlogPost } from '../types/blog';
import { BlogApi } from '../utils/api';

const BlogListPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [searchQuery, setSearchQuery] = useState('');

  // 获取博客文章数据
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setLoading(true);
        const result = await BlogApi.getBlogPosts(currentPage, 6, selectedCategory);
        setPosts(result.posts);
        setTotalPages(result.totalPages);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch blog posts:', err);
        setError('获取博客文章失败，请稍后再试');
      } finally {
        setLoading(false);
        // 滚动到顶部
        window.scrollTo(0, 0);
      }
    };

    fetchBlogPosts();
  }, [currentPage, selectedCategory]);

  // 处理分类变更
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1); // 重置为第一页
  };

  // 处理排序方式变更
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
    // 在实际应用中，这里可以根据排序方式重新获取数据
  };

  // 处理搜索
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 在实际应用中，这里可以根据搜索关键词重新获取数据
    console.log('Searching for:', searchQuery);
  };

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">博客文章</h1>
        <p className="text-gray-600 dark:text-gray-400">
          探索最新的技术文章和教程
        </p>
      </div>

      {/* 过滤器区域 */}
      <div className="mb-8 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
        <div className="flex flex-wrap gap-4 items-end">
          <div>
            <label htmlFor="category" className="block text-sm font-medium mb-1">分类</label>
            <select
              id="category"
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1 text-sm"
            >
              <option value="">全部分类</option>
              <option value="frontend">前端</option>
              <option value="tools">工具</option>
              <option value="backend">后端</option>
              <option value="architecture">架构</option>
              <option value="mobile">移动开发</option>
            </select>
          </div>

          <div>
            <label htmlFor="sort" className="block text-sm font-medium mb-1">排序方式</label>
            <select
              id="sort"
              value={sortBy}
              onChange={handleSortChange}
              className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1 text-sm"
            >
              <option value="latest">最新发布</option>
              <option value="oldest">最早发布</option>
              <option value="popular">最受欢迎</option>
            </select>
          </div>

          <div className="ml-auto">
            <form onSubmit={handleSearch} className="flex gap-2">
              <div>
                <label htmlFor="search" className="block text-sm font-medium mb-1">搜索</label>
                <input
                  type="text"
                  id="search"
                  placeholder="搜索文章..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1 text-sm"
                />
              </div>
              <button 
                type="submit" 
                className="mt-auto bg-primary text-white px-3 py-1 rounded-md text-sm hover:bg-primary/90"
              >
                搜索
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* 博客列表 */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-500">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-primary text-white rounded-md"
          >
            重试
          </button>
        </div>
      ) : (
        <BlogList 
          posts={posts} 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={setCurrentPage}
        />
      )}
    </Layout>
  );
};

export default BlogListPage;