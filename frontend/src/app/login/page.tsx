"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import gsap from "gsap";
import Link from "next/link";
import CustomCursor from "@/components/CustomCursor";

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, register, isLoading, error, clearError, isAuthenticated } = useAuthStore();
  const router = useRouter();
  const formRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.fromTo(labelRef.current, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" });
      tl.fromTo(titleRef.current, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1.2, ease: "power4.out" }, "-=0.5");
      tl.fromTo(formRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.6");
    });
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    let success;
    if (isRegister) {
      success = await register(username, email, password);
    } else {
      success = await login(username, password);
    }
    if (success) {
      gsap.to(formRef.current, {
        opacity: 0, y: -30, duration: 0.5, ease: "power2.in",
        onComplete: () => router.push("/dashboard"),
      });
    }
  };

  return (
    <div className="login-page">
      <CustomCursor />

      {/* Grid pattern background */}
      <div className="login-grid-bg" />

      {/* Glow border */}
      <div className="glow-border" />

      {/* Back link */}
      <Link href="/" className="login-back-link">
        ← Back to VELOCITA
      </Link>

      <div className="login-container">
        {/* Label */}
        <div ref={labelRef} className="section-label" style={{ opacity: 0 }}>
          // {isRegister ? "006 — New Recruit" : "006 — Authentication"}
        </div>

        {/* Title */}
        <h1 ref={titleRef} className="login-title" style={{ opacity: 0 }}>
          {isRegister ? (
            <>Register<br /><span style={{ color: "var(--color-accent)" }}>New Pilot</span></>
          ) : (
            <>Enter the<br /><span style={{ color: "var(--color-accent)" }}>Cockpit</span></>
          )}
        </h1>

        {/* Form card */}
        <div ref={formRef} className="login-card" style={{ opacity: 0 }}>
          <form onSubmit={handleSubmit}>
            {/* Callsign */}
            <div className="login-field">
              <label className="login-field-label">CALLSIGN</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="commander"
                required
                className="login-input"
              />
            </div>

            {/* Email (register only) */}
            {isRegister && (
              <div className="login-field">
                <label className="login-field-label">COMMS_CHANNEL</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="pilot@velocita.space"
                  required
                  className="login-input"
                />
              </div>
            )}

            {/* Password */}
            <div className="login-field">
              <label className="login-field-label">ACCESS_CODE</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="login-input"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="login-error">⚠ {error}</div>
            )}

            {/* Submit */}
            <button type="submit" disabled={isLoading} className="cta-button login-submit">
              <span>{isLoading ? "INITIATING..." : isRegister ? "REGISTER PILOT" : "AUTHENTICATE"}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </button>
          </form>

          {/* Toggle */}
          <button
            onClick={() => { setIsRegister(!isRegister); clearError(); }}
            className="login-toggle"
          >
            {isRegister ? "← Existing pilot? Authenticate" : "New recruit? → Register"}
          </button>

          {/* Demo credentials */}
          <div className="login-demo">
            <div className="login-field-label" style={{ marginBottom: "0.75rem" }}>// DEMO CREDENTIALS</div>
            <div className="login-demo-grid">
              <button
                type="button"
                onClick={() => { setUsername("commander"); setPassword("launchcode"); setIsRegister(false); }}
                className="login-demo-btn"
              >
                <span style={{ color: "var(--color-accent)" }}>commander</span> / launchcode
              </button>
              <button
                type="button"
                onClick={() => { setUsername("pilot"); setPassword("jetfuel"); setIsRegister(false); }}
                className="login-demo-btn"
              >
                <span style={{ color: "var(--color-accent)" }}>pilot</span> / jetfuel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
