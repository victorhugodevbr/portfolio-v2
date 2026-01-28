"use client";

import { useEffect, useRef, useState } from 'react';

export const PersonalImage = () => {
  const [scale, setScale] = useState(1);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      
      const scrollPosition = window.scrollY;
      const newScale = 1 + (scrollPosition * 0.0005);
      
      const limitedScale = Math.min(newScale, 1.3);
      
      setScale(limitedScale);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

return (
    <div
        ref={ref} 
        style={{ 
            transform: `scale(${scale})`,
            position: 'relative',
            bottom: '0',
            zIndex: 0,
            width: '25vw',
            aspectRatio: '1 / 1',
            overflow: 'hidden',
            backgroundImage: "url('/personal-image.png')",
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            transition: 'transform 0.3s ease-out',
        }}
    />
);
};