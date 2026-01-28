import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const progressRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(onComplete, 200);
      }
    });

    tl.to([progressRef.current, textRef.current], {
      width: "100%",
      duration: 3,
      ease: "power2.inOut"
    }, 0);

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      <div className="flex flex-col items-center gap-8">
        <div className="relative">
          <h1 className="font-bold text-gray-800 text-[clamp(60px,5vw,96px)]">
            VICTOR HUGO
          </h1>
          <h1 
            ref={textRef}
            className="font-bold text-white text-[clamp(60px,5vw,96px)] drop-shadow-[0_0_clamp(8px,1.5vw,16px)_white] absolute top-0 left-0 overflow-hidden whitespace-nowrap"
            style={{ width: "0%" }}
          >
            VICTOR HUGO
          </h1>
        </div>
        <div className="w-[clamp(300px,50vw,600px)] h-1 bg-gray-800 rounded-full overflow-hidden">
          <div
            ref={progressRef}
            className="h-full bg-white rounded-full"
            style={{ width: "0%" }}
          />
        </div>
      </div>
    </div>
  );
}
