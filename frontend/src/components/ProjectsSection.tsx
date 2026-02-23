"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    num: "01",
    title: "OOP Banner System",
    desc: "Java-based modular banner system using object-oriented design principles.",
  },
  {
    num: "02",
    title: "Data Structures Engine",
    desc: "Custom implementations of core data structures in C++ with visualization.",
  },
  {
    num: "03",
    title: "REST API Platform",
    desc: "Spring Boot microservice architecture with JWT auth and database integration.",
  },
  {
    num: "04",
    title: "Interactive 3D Portfolio",
    desc: "This very website — built with Next.js, Three.js, and GSAP for maximum immersion.",
  },
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".projects-label",
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
        ".projects-heading",
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
        ".project-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: ".project-grid", start: "top 80%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="section" style={{ flexDirection: "column", gap: "3rem" }}>
      <div style={{ maxWidth: "1100px", width: "100%", marginBottom: "1rem" }}>
        <div className="section-label projects-label">// 004 — Projects</div>
        <h2 className="section-heading projects-heading">
          What we&apos;re <span style={{ color: "var(--color-accent)" }}>building</span>.
        </h2>
      </div>
      <div className="project-grid">
        {projects.map((project, i) => (
          <div className="project-card" key={i}>
            <div className="project-card-bg" style={{
              background: i % 2 === 0
                ? "linear-gradient(135deg, rgba(0,229,255,0.08), rgba(123,97,255,0.04))"
                : "linear-gradient(135deg, rgba(123,97,255,0.08), rgba(0,229,255,0.04))",
            }} />
            {/* Grid pattern overlay */}
            <div style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
              `,
              backgroundSize: "30px 30px",
            }} />
            <div className="project-card-content">
              <div className="project-card-num">// Project {project.num}</div>
              <div className="project-card-title">{project.title}</div>
              <div className="project-card-desc">{project.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
