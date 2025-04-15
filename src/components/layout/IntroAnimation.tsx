import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const curtainDown = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(0); }
`;

const curtainUp = keyframes`
  0% { transform: translateY(0); }
  100% { transform: translateY(-100%); }
`;

const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const fadeOut = keyframes`
  0% { opacity: 1; }
  100% { opacity: 0; }
`;

const AnimationContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease;
`;

const Curtain = styled.div<{ stage: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #3490dc; /* 使用 tailwind 配置中的主色 */
  animation: ${props => props.stage === 1 ? curtainDown : props.stage === 3 ? curtainUp : 'none'} 
             1s ${props => props.stage === 3 ? 'ease-out' : 'ease-in'} forwards;
`;

const WelcomeMessage = styled.div<{ stage: number }>`
  color: #1a202c;
  font-size: 2.5rem;
  font-weight: bold;
  z-index: 1001;
  opacity: 0;
  background-color: white;
  padding: 2rem 3rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: ${props => props.stage === 2 ? fadeIn : props.stage === 3 ? fadeOut : 'none'} 
             1s ease forwards;
`;

const IntroAnimation = () => {
  const [stage, setStage] = useState(1);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // 动画时间线控制
    const timeline = [
      { stage: 1, delay: 0 },     // 幕布下拉
      { stage: 2, delay: 1000 },  // 显示欢迎文字
      { stage: 3, delay: 3000 },  // 幕布上拉和文字淡出
      { stage: 4, delay: 6000 }   // 完全隐藏动画
    ];

    let timeouts: number[] = [];
    
    timeline.forEach(item => {
      const timeout = setTimeout(() => {
        setStage(item.stage);
        if (item.stage === 4) setVisible(false);
      }, item.delay);
      
      timeouts.push(timeout);
    });

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, []);

  if (!visible) return null;

  return (
    <AnimationContainer>
      <Curtain stage={stage} />
      <WelcomeMessage stage={stage}>欢迎来到我的博客</WelcomeMessage>
    </AnimationContainer>
  );
};

export default IntroAnimation;