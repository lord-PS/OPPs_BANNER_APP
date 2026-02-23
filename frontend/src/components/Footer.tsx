"use client";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left">
        <div>STEP<span style={{ color: "var(--color-accent)" }}>.</span> — © 2026</div>
        <div style={{ marginTop: "0.25rem", opacity: 0.5 }}>Built with Next.js, Three.js & GSAP</div>
      </div>
      <div className="footer-links">
        <a href="https://github.com" className="footer-link" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <a href="#about" className="footer-link">
          About
        </a>
        <a href="#tech" className="footer-link">
          Tech
        </a>
        <a href="#projects" className="footer-link">
          Projects
        </a>
      </div>
    </footer>
  );
}
