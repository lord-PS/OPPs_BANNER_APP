"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title reveal - each line word by word
      const lines = titleRef.current?.querySelectorAll(".line span");
      if (lines) {
        gsap.fromTo(
          lines,
          { yPercent: 110, rotateX: -40 },
          {
            yPercent: 0,
            rotateX: 0,
            duration: 1.4,
            ease: "power4.out",
            stagger: 0.12,
            delay: 0.3,
          }
        );
      }

      // Subtitle fade in
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          delay: 1.2,
        }
      );

      // Scroll indicator fade in
      gsap.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          delay: 2,
        }
      );

      // Parallax fade on scroll
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          if (titleRef.current) {
            gsap.set(titleRef.current, {
              opacity: 1 - progress * 2,
              y: progress * -100,
              scale: 1 - progress * 0.15,
            });
          }
          if (subtitleRef.current) {
            gsap.set(subtitleRef.current, {
              opacity: 1 - progress * 3,
              y: progress * -50,
            });
          }
          if (scrollIndicatorRef.current) {
            gsap.set(scrollIndicatorRef.current, {
              opacity: 1 - progress * 5,
            });
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="hero">
      <div className="hero-sticky">
        <div className="flex flex-col items-center justify-center">
          <h1 ref={titleRef} className="hero-title">
            <span className="line">
              <span>Build</span>
            </span>
            <span className="line">
              <span>The</span>
            </span>
            <span className="line">
              <span style={{ color: "var(--color-accent)" }}>Future</span>
            </span>
          </h1>
          <div ref={subtitleRef} className="hero-subtitle" style={{ opacity: 0 }}>
            A 4+ Year Journey Through Code, Creativity, and Innovation
          </div>
        </div>
        <div ref={scrollIndicatorRef} className="scroll-indicator" style={{ opacity: 0 }}>
          <span className="scroll-indicator-text">Scroll to discover</span>
          <div className="scroll-indicator-line" />
        </div>
      </div>
    </div>
  );
}
