"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const techStack = [
  {
    icon: "☕",
    title: "Java & Spring Boot",
    desc: "Enterprise-grade backend development with RESTful APIs, microservices, and production-ready systems.",
    tag: "Backend",
  },
  {
    icon: "⚡",
    title: "C / C++",
    desc: "Low-level systems programming, memory management, data structures, and high-performance computing.",
    tag: "Systems",
  },
  {
    icon: "🌐",
    title: "Next.js & React",
    desc: "Modern frontend development with server-side rendering, static generation, and interactive UI.",
    tag: "Frontend",
  },
  {
    icon: "🎨",
    title: "Three.js & WebGL",
    desc: "Immersive 3D experiences, particle systems, shaders, and real-time graphics for the web.",
    tag: "3D / Graphics",
  },
  {
    icon: "🚀",
    title: "GSAP Animation",
    desc: "High-performance scroll-driven animations, timeline sequencing, and buttery-smooth transitions.",
    tag: "Animation",
  },
  {
    icon: "🧠",
    title: "OOP & Design Patterns",
    desc: "Deep understanding of object-oriented principles, SOLID, and industry-standard design patterns.",
    tag: "Architecture",
  },
];

export default function TechSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".tech-section-label",
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );

      gsap.fromTo(
        ".tech-section-heading",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        }
      );

      gsap.fromTo(
        ".tech-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".tech-grid", start: "top 80%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="tech" className="section" style={{ flexDirection: "column", gap: "3rem" }}>
      <div style={{ maxWidth: "1200px", width: "100%", marginBottom: "1rem" }}>
        <div className="section-label tech-section-label">// 002 — Tech Stack</div>
        <h2 className="section-heading tech-section-heading">
          The tools we <span style={{ color: "var(--color-accent)" }}>master</span>.
        </h2>
      </div>
      <div className="tech-grid">
        {techStack.map((tech, i) => (
          <div className="tech-card" key={i}>
            <div className="tech-card-icon">{tech.icon}</div>
            <div className="tech-card-title">{tech.title}</div>
            <div className="tech-card-desc">{tech.desc}</div>
            <div className="tech-card-tag">{tech.tag}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
