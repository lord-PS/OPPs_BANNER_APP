"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const timeline = [
  {
    year: "Year 1 — Foundation",
    title: "Core Programming & OOP",
    desc: "Master C, C++, Java fundamentals. Deep dive into data structures, algorithms, and object-oriented design patterns.",
  },
  {
    year: "Year 2 — Backend Mastery",
    title: "Spring Boot & Systems",
    desc: "Build enterprise applications with Spring Boot. Learn database design, REST APIs, microservices, and deployment.",
  },
  {
    year: "Year 3 — Full Stack",
    title: "Frontend & 3D Web",
    desc: "Create stunning interactive frontends with React, Next.js, Three.js, and GSAP. Bridge the frontend-backend gap.",
  },
  {
    year: "Year 4+ — Innovation",
    title: "Architecture & Beyond",
    desc: "System design at scale, distributed systems, cloud architecture, and building real-world products that matter.",
  },
];

export default function TimelineSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".timeline-section-label",
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
        ".timeline-section-heading",
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
        ".timeline-item",
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: { trigger: ".timeline", start: "top 80%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="journey" className="section" style={{ flexDirection: "column", gap: "3rem" }}>
      <div style={{ maxWidth: "800px", width: "100%", marginBottom: "1rem" }}>
        <div className="section-label timeline-section-label">// 003 — The Roadmap</div>
        <h2 className="section-heading timeline-section-heading">
          A journey of <span style={{ color: "var(--color-accent)" }}>4+ years</span>.
        </h2>
      </div>
      <div className="timeline">
        {timeline.map((item, i) => (
          <div className="timeline-item" key={i}>
            <div className="timeline-year">{item.year}</div>
            <div className="timeline-title">{item.title}</div>
            <div className="timeline-desc">{item.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
