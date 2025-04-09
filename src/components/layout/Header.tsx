import { useState } from 'react';
import { Link } from 'react-router-dom';

interface NavItem {
  name: string;
  path: string;
}

const navItems: NavItem[] = [
  { name: '首页', path: '/' },
  { name: '博客', path: '/blog' },
  { name: '分类', path: '/categories' },
  { name: '关于', path: '/about' },
];

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-dark shadow-sm sticky top-0 z-10">
      <div className="container-blog mx-auto py-4 px-4 sm:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary">个人博客</span>
          </Link>

          {/* 桌面导航 */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
              >
                {item.name}
              </Link>
            ))}
            <button
              className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
              aria-label="切换主题"
            >
              🌙
            </button>
          </nav>

          {/* 移动端菜单按钮 */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-600 dark:text-gray-300"
            aria-label="打开菜单"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* 移动端导航 */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 space-y-3 pb-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="block text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <button
              className="block text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
              aria-label="切换主题"
            >
              🌙
            </button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;