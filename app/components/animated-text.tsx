import { useEffect, useRef, useState, memo, useMemo } from "react";
import { gsap } from "gsap";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export const AnimatedText = memo(function AnimatedText({ text, className = "", delay = 0 }: AnimatedTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  const chars = useMemo(() => text.split(""), [text]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (isVisible && containerRef.current) {
      const charElements = containerRef.current.querySelectorAll(".char");
      
      gsap.fromTo(
        charElements,
        { opacity: 0, y: 40, willChange: 'transform, opacity' },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.05,
          onComplete: () => {
            // Remove will-change após animação
            gsap.set(charElements, { willChange: 'auto' });
            // Adiciona animação de brilho após a entrada
            gsap.to(charElements, {
              textShadow: "0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(216,210,255,0.6)",
              duration: 0.5,
              stagger: 0.05,
              yoyo: true,
              repeat: 1,
              ease: "power2.inOut"
            });
          }
        }
      );
    }
  }, [isVisible]);

  if (!isVisible) return <div className={className} style={{ opacity: 0 }}>{text}</div>;

  return (
    <div ref={containerRef} className={className} style={{ display: "inline-block" }}>
      {chars.map((char, index) => (
        <span key={index} className="char" style={{ display: "inline-block" }}>
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  );
});
