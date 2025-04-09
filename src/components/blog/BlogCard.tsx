import React from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../../types/blog';

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]">
      {post.coverImage && (
        <Link to={`/blog/${post.slug}`} className="block h-48 overflow-hidden">
          <img 
            src={post.coverImage} 
            alt={post.title} 
            className="w-full h-full object-cover transition-transform hover:scale-110"
          />
        </Link>
      )}
      
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          {post.categories.map((category) => (
            <Link 
              key={category.id}
              to={`/categories/${category.slug}`} 
              className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
            >
              {category.name}
            </Link>
          ))}
        </div>
        
        <Link to={`/blog/${post.slug}`}>
          <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white hover:text-primary dark:hover:text-primary">
            {post.title}
          </h2>
        </Link>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            {post.author.avatar && (
              <img 
                src={post.author.avatar} 
                alt={post.author.name} 
                className="w-8 h-8 rounded-full"
              />
            )}
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {post.author.name}
            </span>
          </div>
          
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
            <span className="mx-1">•</span>
            <span>{post.readingTime} 分钟阅读</span>
          </div>
        </div>
        
        <Link 
          to={`/blog/${post.slug}`} 
          className="mt-4 inline-block text-primary font-medium hover:underline"
        >
          阅读更多 →
        </Link>
      </div>
    </article>
  );
};

export default BlogCard;