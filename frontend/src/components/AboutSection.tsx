"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section label
      gsap.fromTo(
        ".about-label",
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      // Animate heading
      gsap.fromTo(
        ".about-heading",
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );

      // Animate description
      gsap.fromTo(
        ".about-desc",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
          },
        }
      );

      // Animate stats
      gsap.fromTo(
        ".stat-item",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".stats-grid",
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="section" style={{ flexDirection: "column", gap: "4rem" }}>
      <div style={{ maxWidth: "900px", width: "100%" }}>
        <div className="section-label about-label">// 001 — About the Journey</div>
        <h2 className="section-heading about-heading" style={{ marginBottom: "1.5rem" }}>
          We don&apos;t just write code.<br />
          We <span style={{ color: "var(--color-accent)" }}>engineer</span> the future.
        </h2>
        <p className="section-subheading about-desc">
          This is a 4+ year immersive journey through the deepest layers of software engineering.
          From low-level C and C++ to enterprise-grade Spring Boot applications, we master the
          full spectrum — building systems that are fast, scalable, and beautiful.
        </p>
      </div>

      <div className="stats-grid">
        <div className="stat-item">
          <div className="stat-number">4+</div>
          <div className="stat-label">Years of Journey</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">5</div>
          <div className="stat-label">Core Languages</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">∞</div>
          <div className="stat-label">Possibilities</div>
        </div>
      </div>
    </section>
  );
}
