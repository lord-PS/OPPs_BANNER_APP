"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 15;
        return next >= 100 ? 100 : next;
      });
    }, 120);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (barRef.current) {
      barRef.current.style.width = `${progress}%`;
    }
    if (progress >= 100) {
      const tl = gsap.timeline({
        onComplete: onComplete,
      });
      tl.to(textRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.4,
        ease: "power2.in",
      });
      tl.to(
        preloaderRef.current,
        {
          yPercent: -100,
          duration: 1,
          ease: "power4.inOut",
          delay: 0.2,
        },
        "-=0.2"
      );
    }
  }, [progress, onComplete]);

  return (
    <div ref={preloaderRef} className="preloader">
      <div ref={textRef} className="flex flex-col items-center gap-6">
        <div className="preloader-text">Loading Experience</div>
        <div className="preloader-bar-track">
          <div ref={barRef} className="preloader-bar-fill" />
        </div>
        <div className="preloader-text" style={{ opacity: 0.4 }}>
          {Math.floor(progress)}%
        </div>
      </div>
    </div>
  );
}
