import React, { useEffect, useRef, type ReactNode, memo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  scrollStart?: string;
  scrollEnd?: string;
  y?: number;
  opacity?: number;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 1,
  ease = 'back.out(1.7)',
  scrollStart = 'top bottom-=100',
  scrollEnd = 'top center',
  y = 100,
  opacity = 0
}) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    gsap.fromTo(
      el,
      {
        willChange: 'opacity, transform',
        opacity: opacity,
        y: y
      },
      {
        duration: duration,
        ease: ease,
        opacity: 1,
        y: 0,
        delay: delay,
        scrollTrigger: {
          trigger: el,
          start: scrollStart,
          end: scrollEnd,
          scrub: true,
          onLeave: () => gsap.set(el, { willChange: 'auto' }),
          onEnterBack: () => gsap.set(el, { willChange: 'opacity, transform' })
        },
        onComplete: () => {
          gsap.set(el, { willChange: 'auto' });
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === el) {
          trigger.kill();
        }
      });
    };
  }, [delay, duration, ease, scrollStart, scrollEnd, y, opacity]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
};

export default memo(ScrollReveal);
