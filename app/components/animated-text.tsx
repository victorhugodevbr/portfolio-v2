import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export function AnimatedText({ text, className = "", delay = 0 }: AnimatedTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (isVisible && containerRef.current) {
      const chars = containerRef.current.querySelectorAll(".char");
      
      gsap.fromTo(
        chars,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.05,
          onComplete: () => {
            // Adiciona animação de brilho após a entrada
            gsap.to(chars, {
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
      {text.split("").map((char, index) => (
        <span key={index} className="char" style={{ display: "inline-block" }}>
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  );
}
