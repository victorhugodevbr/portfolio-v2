import React, { useRef, useState, memo, useCallback } from 'react';

interface Position {
  x: number;
  y: number;
}

interface SpotlightCardProps extends React.PropsWithChildren {
  className?: string;
  spotlightColor?: `rgba(${number}, ${number}, ${number}, ${number})`;
}

const SpotlightCard: React.FC<SpotlightCardProps> = memo(({
  children,
  className = '',
  spotlightColor = '#ffffff40'
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState<number>(0);
  const rafRef = useRef<number | null>(null);

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = useCallback((e) => {
    if (!divRef.current || isFocused) return;

    // Throttle usando RAF
    if (rafRef.current !== null) return;
    
    rafRef.current = requestAnimationFrame(() => {
      if (!divRef.current) return;
      const rect = divRef.current.getBoundingClientRect();
      setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      rafRef.current = null;
    });
  }, [isFocused]);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
    setOpacity(0.6);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    setOpacity(0);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setOpacity(0.6);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setOpacity(0);
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-3xl overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 rounded-3xl" style={{ padding: '2px' }}>
        <div 
          className="absolute inset-0 rounded-3xl led-border"
          style={{
            background: 'conic-gradient(from var(--angle), #2000E6 0deg, #2000E6 90deg, #b7047e 180deg, #b7047e 270deg, #2000E6 360deg)',
          }}
        />
        <div className="relative w-full h-full rounded-3xl bg-neutral-900" />
      </div>
      <div className="relative z-10">
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out"
          style={{
            opacity,
            background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`,
            willChange: opacity > 0 ? 'opacity' : 'auto'
          }}
        />
        {children}
      </div>

      <style>{`
        @property --angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }

        @keyframes rotateGradient {
          0% {
            --angle: 0deg;
          }
          100% {
            --angle: 360deg;
          }
        }

        .led-border {
          animation: rotateGradient 10s linear infinite;
        }
      `}</style>
    </div>
  );
});

export default SpotlightCard;
