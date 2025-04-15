import React, { ReactNode, useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import IntroAnimation from './IntroAnimation';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    setShowIntro(true);
    // 检查是否首次访问
    // const isFirstVisit = sessionStorage.getItem('isFirstVisit') !== 'true';
    // if (isFirstVisit) {
    //   setShowIntro(true);
    //   sessionStorage.setItem('isFirstVisit', 'true');
    // }
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
       {showIntro && <IntroAnimation />}
      <Header />
      {/* <main className="flex-grow container-blog py-8">
        {children}
      </main>
      <Footer /> */}
    </div>
  );
};

export default Layout;