import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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

const HeaderContainer = styled.header`
  background-color: transparent;
`

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <HeaderContainer>
      <div>
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className="text-gray-800 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 px-4 py-2"
          >
            {item.name}
          </Link>
        ))}
      </div>
    </HeaderContainer>
  );
};

export default Header;