import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { Link } from 'react-router-dom';
import { BlogPost } from '../types/blog';
import BlogCard from '../components/blog/BlogCard';
import { BlogApi } from '../utils/api';

const HomePage: React.FC = () => {
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedPosts = async () => {
      try {
        setLoading(true);
        const posts = await BlogApi.getFeaturedPosts();
        setFeaturedPosts(posts);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch featured posts:', err);
        setError('获取精选文章失败，请稍后再试');
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedPosts();
  }, []);

  return (
    <Layout>
      {/* 英雄区域 */}
      <section className="bg-gradient-to-r from-primary to-purple-600 text-white py-20 mb-12 -mt-8 rounded-b-3xl">
        <div className="container-blog text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">欢迎来到我的博客</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            分享编程知识、技术见解和个人成长经历
          </p>
          <Link 
            to="/blog" 
            className="btn bg-white text-primary hover:bg-gray-100 px-6 py-3 rounded-lg font-medium shadow-md"
          >
            浏览全部文章
          </Link>
        </div>
      </section>

      {/* 精选文章 */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">精选文章</h2>
          <Link to="/blog" className="text-primary hover:underline">
            查看全部
          </Link>
        </div>

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPosts.map(post => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>

      {/* 分类展示 */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8">分类浏览</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { name: '前端开发', slug: 'frontend', count: 12, icon: '💻' },
            { name: '后端开发', slug: 'backend', count: 8, icon: '🖥️' },
            { name: '移动开发', slug: 'mobile', count: 5, icon: '📱' },
            { name: '开发工具', slug: 'tools', count: 7, icon: '🔧' },
            { name: '用户体验', slug: 'ux', count: 4, icon: '🎨' },
            { name: '数据科学', slug: 'data-science', count: 3, icon: '📊' },
          ].map(category => (
            <Link 
              key={category.slug}
              to={`/categories/${category.slug}`}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 flex items-center hover:shadow-md transition-shadow"
            >
              <span className="text-2xl mr-3">{category.icon}</span>
              <div>
                <h3 className="font-medium">{category.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {category.count} 篇文章
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 邮件订阅 */}
      <section className="bg-gray-100 dark:bg-gray-800 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-2">订阅我的博客</h2>
        <p className="mb-6 text-gray-600 dark:text-gray-300 max-w-lg mx-auto">
          订阅以获取最新的博客文章和技术资讯，我不会向您发送垃圾邮件。
        </p>
        <div className="flex max-w-md mx-auto flex-col sm:flex-row gap-2">
          <input 
            type="email" 
            placeholder="您的电子邮箱" 
            className="flex-grow px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-700"
          />
          <button className="btn btn-primary whitespace-nowrap">
            立即订阅
          </button>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;