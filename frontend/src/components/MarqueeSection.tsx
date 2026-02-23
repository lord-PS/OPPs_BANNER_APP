"use client";

export default function MarqueeSection() {
  const items = [
    "Java", "Spring Boot", "C++", "C", "Next.js", "Three.js", "GSAP",
    "OOP", "DSA", "System Design",
  ];

  return (
    <div style={{ padding: "4rem 0" }}>
      <div className="marquee-wrapper">
        <div className="marquee-content">
          {[...items, ...items].map((item, i) => (
            <span
              key={i}
              className={`marquee-item ${i % 3 === 0 ? "filled" : ""}`}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
