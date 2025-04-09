import React from 'react';
import { BlogPost } from '../../types/blog';
import BlogCard from './BlogCard';
import Pagination from '../ui/Pagination';

interface BlogListProps {
  posts: BlogPost[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const BlogList: React.FC<BlogListProps> = ({ 
  posts, 
  currentPage, 
  totalPages,
  onPageChange 
}) => {
  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium text-gray-600 dark:text-gray-400">
          暂无博客文章
        </h3>
        <p className="mt-2 text-gray-500 dark:text-gray-500">
          请稍后再来查看
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
      
      {totalPages > 1 && (
        <div className="mt-12">
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
};

export default BlogList;