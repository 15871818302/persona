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
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const NavContainer = styled.div`
  display: flex;
  gap: 1vw;
  padding: 16px;
  /* 浅色模式的毛玻璃效果 */
  background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  
  @media (prefers-color-scheme: dark) {
    /* 深色模式的毛玻璃效果 */
    background-color: rgba(31, 41, 55, 0.7);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
  }
`;

const NavLink = styled(Link)`
  padding: 8px 16px;
  color: #1f2937;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s ease;
  
  &:hover {
    color: #3b82f6;
  }
  
  @media (prefers-color-scheme: dark) {
    color: #e5e7eb;
    
    &:hover {
      color: #60a5fa;
    }
  }
`;

export const Header = () => {
  return (
    <HeaderContainer>
      <NavContainer>
        {navItems.map((item) => (
          <NavLink key={item.name} to={item.path}>
            {item.name}
          </NavLink>
        ))}
      </NavContainer>
    </HeaderContainer>
  );
};

export default Header;