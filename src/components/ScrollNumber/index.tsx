import { type FC, useEffect, useRef } from 'react';
import styles from './style.module.scss';

interface ScrollNumberProps {
  value: string;
  duration?: number;
}

const ScrollNumber: FC<ScrollNumberProps> = ({ value = '0', duration = 1000 }) => {
  const numberRef = useRef<HTMLDivElement>(null);
  const currentValue = useRef(value);
  const targetValue = useRef(value);

  useEffect(() => {
    if (value === currentValue.current) return;
    
    targetValue.current = value;
    const start = parseFloat(currentValue.current);
    const end = parseFloat(value);
    const startTime = performance.now();

    const animate = () => {
      const now = performance.now();
      const progress = Math.min((now - startTime) / duration, 1);
      // 使用 easeOutExpo 缓动函数使动画更平滑
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = start + (end - start) * easeProgress;
      
      if (numberRef.current) {
        currentValue.current = current.toFixed(2);
        numberRef.current.textContent = current.toFixed(2);
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value, duration]);

  return <div ref={numberRef} className={styles.scrollNumber}>{value}</div>;
};

export default ScrollNumber;