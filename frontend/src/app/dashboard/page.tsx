"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import Link from "next/link";
import gsap from "gsap";
import CustomCursor from "@/components/CustomCursor";
import { journeyService, dashboardService, aiService } from "@/services/api";

interface Assignment {
  id: number;
  title: string;
  description: string;
  status: string;
  score: string;
  element: string;
  artifactType: string;
  submittedAt: string;
}

interface Stats {
  totalAssignments: number;
  gradedAssignments: number;
  uploadedAssignments: number;
  xp: number;
  nextLevelXp: number;
  rank: string;
  role: string;
}

interface DashboardItem {
  id: number;
  name: string;
  slug: string;
  description: string;
  icon: string;
}

export default function DashboardPage() {
  const { user, isAuthenticated, checkAuth, logout } = useAuthStore();
  const router = useRouter();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [dashboards, setDashboards] = useState<DashboardItem[]>([]);
  const [activeDash, setActiveDash] = useState<string>("overview");
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<Array<{ role: string; content: string }>>([]);
  const [chatLoading, setChatLoading] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { checkAuth(); }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    loadData();
  }, [isAuthenticated]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  // Animate content on dash switch
  useEffect(() => {
    if (mainRef.current) {
      gsap.fromTo(
        mainRef.current.querySelectorAll(".dash-animate"),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power3.out" }
      );
    }
  }, [activeDash, stats]);

  const loadData = async () => {
    try {
      const [assignData, statsData, dashData, historyData] = await Promise.all([
        journeyService.getAssignments(),
        journeyService.getStats(),
        dashboardService.getDashboards(),
        aiService.getHistory(),
      ]);
      setAssignments(assignData);
      setStats(statsData);
      setDashboards(dashData);
      setChatMessages(historyData);
    } catch (err) {
      console.error("Failed to load data:", err);
    }
  };

  const sendMessage = async () => {
    if (!chatInput.trim() || chatLoading) return;
    const msg = chatInput.trim();
    setChatInput("");
    setChatMessages((prev) => [...prev, { role: "user", content: msg }]);
    setChatLoading(true);
    try {
      const res = await aiService.chat(msg);
      setChatMessages((prev) => [...prev, { role: "assistant", content: res.response }]);
    } catch {
      setChatMessages((prev) => [...prev, { role: "assistant", content: "Connection to AI co-pilot lost." }]);
    }
    setChatLoading(false);
  };

  if (!isAuthenticated || !stats) {
    return (
      <div className="dash-loading">
        <div className="preloader-text" style={{ animation: "scrollPulse 2s ease-in-out infinite" }}>
          INITIALIZING SYSTEMS...
        </div>
      </div>
    );
  }

  const xpPercent = Math.min((stats.xp / stats.nextLevelXp) * 100, 100);

  const elementColor = (el: string) => {
    const map: Record<string, string> = {
      FIRE: "#ff6b35", WATER: "#00b4d8", AIR: "#e0e0e0", VOID: "#7b61ff", EARTH: "#2dc653"
    };
    return map[el] || "var(--color-accent)";
  };

  const statusStyle = (s: string) => {
    if (s === "GRADED") return { color: "#2dc653", borderColor: "rgba(45,198,83,0.3)" };
    if (s === "UPLOADED") return { color: "var(--color-accent)", borderColor: "rgba(0,229,255,0.3)" };
    return { color: "#ffb347", borderColor: "rgba(255,179,71,0.3)" };
  };

  return (
    <div className="dash-page">
      <CustomCursor />

      {/* Header */}
      <header className="dash-header">
        <Link href="/" className="dash-logo">
          VELOCITA<span style={{ color: "var(--color-accent)" }}>.</span>
        </Link>
        <div className="dash-header-right">
          <div className="dash-user-info">
            <span className="dash-user-name">{user?.displayName || user?.username}</span>
            <span className="dash-user-rank">{stats.rank} · {stats.role}</span>
          </div>
          <button onClick={logout} className="dash-disconnect">DISCONNECT</button>
        </div>
      </header>

      <div className="dash-layout">
        {/* Sidebar */}
        <nav className="dash-sidebar">
          <div className="login-field-label" style={{ marginBottom: "1rem" }}>// NAVIGATION</div>

          <button
            onClick={() => setActiveDash("overview")}
            className={`dash-nav-item ${activeDash === "overview" ? "active" : ""}`}
          >
            ◉ OVERVIEW
          </button>

          {dashboards.map((d) => (
            <button
              key={d.slug}
              onClick={() => setActiveDash(d.slug)}
              className={`dash-nav-item ${activeDash === d.slug ? "active" : ""}`}
            >
              {d.icon} {d.name.toUpperCase()}
            </button>
          ))}

          {/* XP Bar */}
          <div className="dash-xp-card">
            <div className="login-field-label">// PROGRESS</div>
            <div className="dash-xp-track">
              <div className="dash-xp-fill" style={{ width: `${xpPercent}%` }} />
            </div>
            <div className="dash-xp-text">{stats.xp} / {stats.nextLevelXp} XP</div>
          </div>
        </nav>

        {/* Main Content */}
        <main ref={mainRef} className="dash-main">

          {/* ── OVERVIEW ── */}
          {activeDash === "overview" && (
            <div>
              <div className="section-label dash-animate">// Command Center</div>
              <h2 className="dash-page-title dash-animate">
                Welcome back,<br />
                <span style={{ color: "var(--color-accent)" }}>
                  {user?.displayName || "Commander"}
                </span>.
              </h2>

              {/* Stats Grid */}
              <div className="dash-stats-grid">
                {[
                  { label: "RANK", value: stats.rank, accent: true },
                  { label: "XP", value: stats.xp.toLocaleString() },
                  { label: "MISSIONS", value: stats.totalAssignments },
                  { label: "GRADED", value: stats.gradedAssignments },
                ].map((s) => (
                  <div key={s.label} className="tech-card dash-animate" style={{ opacity: 1, transform: "none" }}>
                    <div className="tech-card-tag" style={{ marginTop: 0, marginBottom: "0.75rem" }}>{s.label}</div>
                    <div className={`stat-number ${s.accent ? "" : ""}`} style={{ fontSize: "2rem" }}>
                      {s.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent Assignments */}
              <div className="section-label dash-animate" style={{ marginTop: "3rem" }}>// Recent Missions</div>
              <div className="dash-assignments-list">
                {assignments.slice(0, 5).map((a) => (
                  <div key={a.id} className="dash-assignment-card dash-animate">
                    <div>
                      <div className="dash-assignment-title">{a.title}</div>
                      <div className="dash-assignment-meta">
                        <span style={{ color: elementColor(a.element) }}>●</span> {a.element} · {a.artifactType}
                      </div>
                    </div>
                    <div className="dash-assignment-right">
                      <span className="dash-status-badge" style={statusStyle(a.status)}>{a.status}</span>
                      <span className="dash-assignment-score">{a.score}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── ARSENAL ── */}
          {activeDash === "arsenal" && (
            <div>
              <div className="section-label dash-animate">// Arsenal</div>
              <h2 className="dash-page-title dash-animate">
                Your <span style={{ color: "var(--color-accent)" }}>weapons</span> cache.
              </h2>
              <div className="dash-arsenal-grid">
                {assignments.map((a) => (
                  <div key={a.id} className="project-card dash-animate" style={{ opacity: 1, transform: "none", aspectRatio: "auto" }}>
                    <div className="dash-element-bar" style={{ background: `linear-gradient(90deg, ${elementColor(a.element)}, transparent)` }} />
                    <div className="project-card-bg" />
                    <div style={{ position: "relative", padding: "2rem" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                        <span className="tech-card-tag" style={{ marginTop: 0 }}>{a.artifactType}</span>
                        <span className="dash-status-badge" style={statusStyle(a.status)}>{a.status}</span>
                      </div>
                      <div className="project-card-title" style={{ marginBottom: "0.5rem" }}>{a.title}</div>
                      <div className="project-card-desc">{a.description}</div>
                      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1.5rem" }}>
                        <span className="project-card-num">Score: {a.score}</span>
                        <span className="project-card-num" style={{ color: elementColor(a.element) }}>{a.element}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── FLIGHT LOG ── */}
          {activeDash === "flight-log" && (
            <div>
              <div className="section-label dash-animate">// Flight Log</div>
              <h2 className="dash-page-title dash-animate">
                Mission <span style={{ color: "var(--color-accent)" }}>history</span>.
              </h2>
              <div className="timeline dash-animate" style={{ marginTop: "2rem" }}>
                {assignments.map((a) => (
                  <div key={a.id} className="timeline-item" style={{ opacity: 1, transform: "none" }}>
                    <div className="timeline-year">
                      {new Date(a.submittedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                    </div>
                    <div className="timeline-title">{a.title}</div>
                    <div className="timeline-desc">{a.description}</div>
                    <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
                      <span className="dash-status-badge" style={statusStyle(a.status)}>{a.status}</span>
                      <span className="project-card-num">{a.score}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── SPELL BOOK ── */}
          {activeDash === "spell-book" && (
            <div>
              <div className="section-label dash-animate">// Spell Book</div>
              <h2 className="dash-page-title dash-animate">
                Your <span style={{ color: "var(--color-accent)" }}>artifacts</span>.
              </h2>
              <div className="dash-spell-grid">
                {assignments.map((a) => (
                  <div key={a.id} className="tech-card dash-animate" style={{ opacity: 1, transform: "none", textAlign: "center", padding: "2rem 1.5rem" }}>
                    <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>
                      {a.artifactType === "SPELL_BOOK" ? "📖" : a.artifactType === "SCROLL" ? "📜" : a.artifactType === "CRYSTAL" ? "💎" : "🔮"}
                    </div>
                    <div className="tech-card-title" style={{ fontSize: "1rem" }}>{a.title.split(":")[0]}</div>
                    <div className="tech-card-tag" style={{ color: elementColor(a.element) }}>{a.element}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── TIMELINE (RANKS) ── */}
          {activeDash === "timeline" && (
            <div>
              <div className="section-label dash-animate">// Timeline</div>
              <h2 className="dash-page-title dash-animate">
                Your <span style={{ color: "var(--color-accent)" }}>rank</span> journey.
              </h2>
              <div className="dash-ranks" style={{ marginTop: "2rem" }}>
                {[
                  { rank: "Rookie Pilot", xp: "0 XP", unlocked: true },
                  { rank: "Cadet Commander", xp: "1,000 XP", unlocked: stats.xp >= 1000 },
                  { rank: "Star Navigator", xp: "3,000 XP", unlocked: stats.xp >= 3000 },
                  { rank: "Orbital Vanguard", xp: "5,000 XP", unlocked: stats.xp >= 5000 },
                  { rank: "Legend", xp: "10,000 XP", unlocked: stats.xp >= 10000 },
                ].map((r, i) => (
                  <div key={i} className={`dash-rank-card dash-animate ${r.unlocked ? "unlocked" : ""}`}>
                    <div className="dash-rank-icon">{r.unlocked ? "✓" : "?"}</div>
                    <div>
                      <div className="tech-card-title" style={{ fontSize: "1rem" }}>{r.rank}</div>
                      <div className="project-card-num">{r.xp} required</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── COMMUNICATIONS (AI CHAT) ── */}
          {activeDash === "comms" && (
            <div className="dash-chat-container">
              <div>
                <div className="section-label dash-animate">// Communications</div>
                <h2 className="dash-page-title dash-animate" style={{ marginBottom: "1.5rem" }}>
                  Velocita <span style={{ color: "var(--color-accent)" }}>AI</span>.
                </h2>
              </div>

              {/* Chat messages */}
              <div className="dash-chat-messages">
                {chatMessages.length === 0 && (
                  <div className="dash-chat-empty">
                    <div className="stat-number" style={{ fontSize: "2rem" }}>◎</div>
                    <p>No transmissions yet.</p>
                    <p style={{ opacity: 0.4, marginTop: "0.5rem" }}>Send a message to initiate contact with Velocita AI.</p>
                  </div>
                )}
                {chatMessages.map((msg, i) => (
                  <div key={i} className={`dash-chat-bubble ${msg.role === "user" ? "user" : "ai"}`}>
                    <div className="project-card-num" style={{ marginBottom: "0.5rem" }}>
                      {msg.role === "user" ? "// YOU" : "// VELOCITA_AI"}
                    </div>
                    {msg.content}
                  </div>
                ))}
                {chatLoading && (
                  <div className="dash-chat-bubble ai" style={{ opacity: 0.5 }}>
                    Processing transmission...
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Input */}
              <div className="dash-chat-input-row">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Type your message..."
                  className="login-input dash-chat-input"
                />
                <button onClick={sendMessage} disabled={chatLoading} className="cta-button dash-chat-send">
                  <span>TRANSMIT</span>
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
