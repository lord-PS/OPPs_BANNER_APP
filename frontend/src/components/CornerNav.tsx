"use client";

import Link from "next/link";

export default function CornerNav() {
  return (
    <>
      {/* Glow border */}
      <div className="glow-border" />

      {/* Top Left - Logo */}
      <div className="corner-nav corner-nav-tl">
        <div className="corner-label" style={{ fontSize: "1.1rem", fontWeight: 700, letterSpacing: "0.05em", opacity: 1 }}>
          VELOCITA<span style={{ color: "var(--color-accent)" }}>.</span>
        </div>
        <div className="corner-label">// Mission Control</div>
      </div>

      {/* Top Right - Links */}
      <div className="corner-nav corner-nav-tr">
        <div className="corner-label">
          <a href="#about">////// About</a>
        </div>
        <div className="corner-label">
          <a href="#tech">////// Tech Stack</a>
        </div>
        <div className="corner-label">
          <a href="#projects">////// Projects</a>
        </div>
        <div className="corner-label">
          <Link href="/login">////// Enter Cockpit</Link>
        </div>
      </div>

      {/* Bottom Left - Copyright */}
      <div className="corner-nav corner-nav-bl">
        <div className="corner-label">// Copyright © 2026</div>
        <div className="corner-label">Velocita Program</div>
      </div>

      {/* Bottom Right - Scroll hint */}
      <div className="corner-nav corner-nav-br">
        <div className="corner-label">// Scroll to discover</div>
      </div>
    </>
  );
}
