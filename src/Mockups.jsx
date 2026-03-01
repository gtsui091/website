import { useState, useEffect, useRef } from "react";
import Portfolio from "./Portfolio";

// ─── Shared data (mirrors Portfolio.jsx) ─────────────────────────────────────

const experiences = [
  {
    id: 1, num: "01", title: "FORM",
    tags: ["Web Team Lead", "Full Stack"], year: "2021–Present",
    desc: "Led the web team through a retention turnaround — churn dropped from 13% to 6% in a single year. Shipped Streaks from hackathon to A/B production, built the Web-Driven UI framework, and migrated infrastructure off AWS OpsWorks with zero downtime.",
    accent: "#E6FF00", bg: "#0a1a00", visual: "terrain",
    subitems: [
      { label: "Streaks", detail: "Hackathon concept → A/B production in weeks. A direct driver of the churn improvement." },
      { label: "Web-Driven UI", detail: "Eliminated mobile release cycle dependency. Enabled rapid iteration and A/B testing." },
      { label: "Infrastructure", detail: "Zero-downtime AWS OpsWorks migration + Intel-to-Arm server transition." },
      { label: "Subscriptions", detail: "Prepaid, Try Before You Buy, variable trials — architected for long-term flexibility." },
    ],
    story: {
      headline: "A retention turnaround built on shipping velocity.",
      body: "When I joined FORM as Web Team Lead, the web product was leaking subscribers — churn sat at 13%. Over the next year I led a focused effort to close the gap between development speed and user retention. The breakthrough was Streaks: a gamification feature taken from internal hackathon to A/B production in weeks, which drove measurable improvement on its own. Alongside it, I built the Web-Driven UI framework — a system that let us ship UI changes through the web layer, breaking free from the mobile release cycle and enabling tight iteration loops.\n\nOn the infrastructure side, I led a zero-downtime migration off AWS OpsWorks during an Intel-to-Arm server transition, and redesigned the subscription architecture to support prepaid plans, Try Before You Buy, and variable trials. By the end of the year, churn had dropped to 6%.",
      stats: [
        { value: "13→6%", label: "Churn rate" },
        { value: "4 wks", label: "Hackathon to prod" },
        { value: "0", label: "Downtime incidents" },
      ],
    },
  },
  {
    id: 2, num: "02", title: "Sea Around Us",
    tags: ["Full Stack Dev", "PostgreSQL", "AWS"], year: "2015–2020",
    desc: "Stepped in as Full Stack Developer when the previous dev left mid-transition. Rebuilt the data pipeline, introduced PostGIS spatial dimensions, deployed via AWS and Jenkins, and led a 3-week training in the Philippines. Co-authored 6 peer-reviewed journal articles.",
    accent: "#00C2FF", bg: "#000d1a", visual: "dots",
    subitems: [
      { label: "Spatial Data", detail: "Integrated PostGIS into PostgreSQL — new geographic dimensions across the global fisheries dataset." },
      { label: "Pipeline", detail: "Rebuilt the production data pipeline and processing code during a full tech stack transition." },
      { label: "Manila Workshop", detail: "Led a 3-week training at Q-Quatics, Philippines for ongoing data maintenance partnership." },
      { label: "Research", detail: "Co-authored 6 articles in peer-reviewed scientific journals." },
    ],
    story: {
      headline: "Spatial data at the scale of the world's oceans.",
      body: "I stepped into the Sea Around Us project mid-transition — the previous developer had left, and the codebase was in flux. My first task was to stabilise the production data pipeline and rebuild the processing layer during a full stack migration. Over time I went deeper, integrating PostGIS spatial dimensions into the PostgreSQL database, opening up new geographic queries across one of the world's largest open fisheries datasets.\n\nThe work extended beyond the codebase. I deployed the stack via AWS and Jenkins, set up a data maintenance partnership through a 3-week hands-on training in Manila at Q-Quatics, and collaborated with marine researchers across the team — contributing to 6 peer-reviewed journal articles on global fisheries science.",
      stats: [
        { value: "6", label: "Journal articles" },
        { value: "3 wks", label: "Manila workshop" },
        { value: "PostGIS", label: "Spatial layer" },
      ],
    },
  },
  {
    id: 3, num: "03", title: "Backcountry Wok",
    tags: ["Co-Founder", "CPG", "Sustainability"], year: "2017–2019",
    desc: "Co-founded a line of instant Asian camping meals in 100% compostable packaging — addressing a real gap in outdoor food and tackling plastic waste. Scaled from Vancouver to Ottawa. Featured in Edible Ottawa, March 2019.",
    accent: "#FF8C42", bg: "#1a0800", visual: "fluid",
    subitems: [
      { label: "Product", detail: "Instant, dried Asian meals in heat-resistant, 100% compostable bags." },
      { label: "Mission", detail: "Tackled the lack of Asian outdoor foods and plastic waste in consumer-packaged goods." },
      { label: "Press", detail: "Featured in Edible Ottawa, March 2019 edition." },
    ],
    story: {
      headline: "Instant, compostable, and unapologetically Asian.",
      body: "Backcountry Wok started from a real frustration: the outdoor food market was full of pasta and granola but had almost nothing for the Asian diaspora, and nearly everything came in single-use plastic. We co-founded the company to address both gaps at once — instant, dried Asian meals in heat-resistant, 100% compostable bags, designed for backcountry trips and day hikes.\n\nWe scaled from a Vancouver launch to distribution in Ottawa, built relationships with outdoor retailers, and earned editorial coverage in the March 2019 edition of Edible Ottawa. The brand proved that sustainability and cultural specificity weren't trade-offs — they were the product.",
      stats: [
        { value: "100%", label: "Compostable" },
        { value: "2", label: "Cities" },
        { value: "2019", label: "Edible Ottawa" },
      ],
    },
  },
];

function hexRgb(hex) {
  return {
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  };
}

function ProjectVisual({ visual, color }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const tRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth || 1200;
    canvas.height = canvas.offsetHeight || 800;
    const w = canvas.width, h = canvas.height;
    const rgb = hexRgb(color);

    const draw = () => {
      tRef.current += 0.012;
      const t = tRef.current;
      ctx.clearRect(0, 0, w, h);

      if (visual === "terrain") {
        ctx.lineWidth = 1;
        for (let y = 0; y < 10; y++) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},0.45)`;
          for (let x = 0; x <= 40; x++) {
            const px = (x / 40) * w;
            const noise = Math.sin(x * 0.4 + t + y * 0.7) * 25 + Math.sin(x * 0.2 - t * 0.5 + y) * 15;
            const py = (y / 9) * h + noise;
            x === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
          }
          ctx.stroke();
        }
      } else if (visual === "dots") {
        const cols = 14, rows = 9;
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const x = (c / (cols - 1)) * w;
            const y2 = (r / (rows - 1)) * h;
            const dist = Math.sqrt(Math.pow(c - cols / 2, 2) + Math.pow(r - rows / 2, 2));
            const s = Math.max(0.3, Math.sin(dist * 0.5 - t * 1.5) * 4 + 3);
            ctx.beginPath();
            ctx.arc(x, y2, s, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${0.35 + s * 0.08})`;
            ctx.fill();
          }
        }
      } else if (visual === "fluid") {
        for (let i = 0; i < 7; i++) {
          const cx = w / 2 + Math.sin(t * 0.7 + i * 1.1) * w * 0.32;
          const cy = h / 2 + Math.cos(t * 0.5 + i * 0.8) * h * 0.32;
          const r2 = 50 + Math.sin(t + i) * 25;
          const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r2);
          grad.addColorStop(0, `rgba(${rgb.r},${rgb.g},${rgb.b},0.28)`);
          grad.addColorStop(1, `rgba(${rgb.r},${rgb.g},${rgb.b},0)`);
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(cx, cy, r2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [visual, color]);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />;
}

const GRAIN_URL = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

// ─── Shared detail overlay ────────────────────────────────────────────────────

function SubItem({ item, color, index }) {
  const rgb = hexRgb(color);
  return (
    <div style={{ display: "flex", gap: "14px", alignItems: "flex-start", animation: `sharedDetailUp 0.4s cubic-bezier(0.16,1,0.3,1) ${0.05 + index * 0.06}s both` }}>
      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase", color: `rgba(${rgb.r},${rgb.g},${rgb.b},0.65)`, whiteSpace: "nowrap", paddingTop: "1px", width: "90px", textAlign: "right", flexShrink: 0 }}>{item.label}</span>
      <span style={{ width: "1px", minHeight: "14px", alignSelf: "stretch", background: `rgba(${rgb.r},${rgb.g},${rgb.b},0.2)`, flexShrink: 0 }} />
      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px", color: "rgba(240,237,230,0.38)", lineHeight: 1.75, fontWeight: 300 }}>{item.detail}</span>
    </div>
  );
}

function DetailOverlay({ entry, onClose, closing }) {
  const rgb = hexRgb(entry.accent);
  return (
    <div
      style={{ position: "fixed", inset: 0, zIndex: 1000, overflowY: "auto", overflowX: "hidden", backgroundColor: entry.bg, animation: `${closing ? "sharedDetailOut 0.35s" : "sharedDetailIn 0.5s"} cubic-bezier(0.16,1,0.3,1) both` }}
      onClick={onClose}
    >
      <style>{`
        @keyframes sharedDetailIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes sharedDetailOut { from { opacity: 1; } to { opacity: 0; } }
        @keyframes sharedDetailUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        .sdo-close:hover { color: rgba(240,237,230,0.9) !important; }
      `}</style>
      <div style={{ position: "fixed", inset: 0, opacity: 0.45, pointerEvents: "none", zIndex: 0 }}>
        <ProjectVisual visual={entry.visual} color={entry.accent} />
      </div>
      <div style={{ position: "fixed", inset: 0, background: "linear-gradient(to bottom, transparent 0%, rgba(8,8,8,0.5) 40%, rgba(8,8,8,0.92) 80%)", pointerEvents: "none", zIndex: 1 }} />
      <div style={{ position: "fixed", inset: 0, backgroundImage: GRAIN_URL, backgroundSize: "180px", opacity: 0.035, zIndex: 2, pointerEvents: "none" }} />
      <button className="sdo-close" style={{ position: "fixed", top: "40px", right: "48px", zIndex: 200, fontFamily: "'DM Mono', monospace", fontSize: "20px", color: "rgba(240,237,230,0.3)", background: "none", border: "none", cursor: "pointer", padding: "8px", lineHeight: 1, transition: "color 0.2s" }} onClick={onClose}>×</button>
      <div style={{ position: "relative", zIndex: 10, maxWidth: "1100px", margin: "0 auto", padding: "120px 48px 100px" }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "'DM Mono', monospace", fontSize: "9px", letterSpacing: "0.16em", color: "rgba(240,237,230,0.2)", textTransform: "uppercase", marginBottom: "24px", animation: "sharedDetailUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.10s both" }}>
          <span>{entry.num}</span><span>{entry.year}</span>
        </div>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(64px, 10vw, 130px)", fontWeight: 300, fontStyle: "italic", letterSpacing: "-0.03em", lineHeight: 0.95, marginBottom: "20px", color: entry.accent, animation: "sharedDetailUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.18s both" }}>{entry.title}</h2>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "60px", animation: "sharedDetailUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.26s both" }}>
          {entry.tags.map((t) => <span key={t} style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px", letterSpacing: "0.14em", textTransform: "uppercase", color: `rgba(${rgb.r},${rgb.g},${rgb.b},0.55)` }}>{t}</span>)}
        </div>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(22px, 3vw, 36px)", fontWeight: 300, fontStyle: "italic", color: "rgba(240,237,230,0.75)", lineHeight: 1.3, maxWidth: "680px", marginBottom: "32px", animation: "sharedDetailUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.32s both" }}>{entry.story.headline}</p>
        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", fontWeight: 300, color: "rgba(240,237,230,0.45)", lineHeight: 2, maxWidth: "620px", marginBottom: "64px", whiteSpace: "pre-line", animation: "sharedDetailUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.38s both" }}>{entry.story.body}</p>
        {entry.story.stats && (
          <div style={{ display: "flex", gap: "48px", flexWrap: "wrap", marginBottom: "56px", animation: "sharedDetailUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.44s both" }}>
            {entry.story.stats.map((s) => (
              <div key={s.label}>
                <span style={{ display: "block", fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 300, fontStyle: "italic", lineHeight: 1, letterSpacing: "-0.02em", color: entry.accent }}>{s.value}</span>
                <span style={{ display: "block", fontFamily: "'DM Mono', monospace", fontSize: "8px", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(240,237,230,0.22)", marginTop: "6px" }}>{s.label}</span>
              </div>
            ))}
          </div>
        )}
        <div style={{ height: "1px", background: `rgba(${rgb.r},${rgb.g},${rgb.b},0.12)`, marginBottom: "40px", animation: "sharedDetailUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.48s both" }} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px 48px", marginBottom: "56px" }}>
          {entry.subitems.map((sub, i) => <SubItem key={sub.label} item={sub} color={entry.accent} index={i} />)}
        </div>
      </div>
    </div>
  );
}

function useDetailOverlay() {
  const [detailed, setDetailed] = useState(null);
  const [detailClosing, setDetailClosing] = useState(false);
  const closeTimer = useRef(null);

  const openDetail = (id) => setDetailed(id);
  const closeDetail = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setDetailClosing(true);
    closeTimer.current = setTimeout(() => { setDetailed(null); setDetailClosing(false); }, 350);
  };

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape" && detailed) closeDetail(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [detailed]);

  useEffect(() => {
    document.body.style.overflow = detailed ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [detailed]);

  return { detailed, detailClosing, openDetail, closeDetail };
}

// ─── MOCKUP A: Editorial Split ────────────────────────────────────────────────
//
// Two-column layout. The LEFT PANEL is a sticky context pane — its background,
// canvas animation, and description all react to whatever you hover on the right.
// The RIGHT PANEL is a clean, typography-first list. The company description and
// canvas live in the left panel, so the list itself stays minimal and legible.
//
// Hiring signal: editorial maturity, product thinking, UX sensibility.

function MockupA() {
  const [hovered, setHovered] = useState(null);
  const { detailed, detailClosing, openDetail, closeDetail } = useDetailOverlay();

  const hovEntry = experiences.find((p) => p.id === hovered);

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#0b0b0b", fontFamily: "'DM Mono', monospace" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400&family=Cormorant+Garamond:ital,wght@0,300;1,300;1,600&display=swap');
        .ma-entry {
          border-top: 1px solid rgba(240,237,230,0.06);
          padding: 30px 0 30px 36px;
          border-left: 2px solid transparent;
          transition: border-left-color 0.3s ease;
          cursor: pointer;
        }
        .ma-entry:last-child { border-bottom: 1px solid rgba(240,237,230,0.06); }
        .ma-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(44px, 5.2vw, 78px);
          font-weight: 300;
          font-style: italic;
          color: rgba(240,237,230,0.82);
          letter-spacing: -0.025em;
          line-height: 1;
          transition: color 0.3s ease, transform 0.45s cubic-bezier(0.16,1,0.3,1);
          transform-origin: left center;
        }
        .ma-entry:hover .ma-title { transform: translateX(14px); }
      `}</style>

      {/* ── Left panel: sticky context ── */}
      <div style={{
        width: "380px",
        flexShrink: 0,
        position: "sticky",
        top: "40px",
        height: "calc(100vh - 40px)",
        overflow: "hidden",
        borderRight: "1px solid rgba(240,237,230,0.06)",
        backgroundColor: hovEntry ? hovEntry.bg : "#0b0b0b",
        transition: "background-color 0.65s cubic-bezier(0.16,1,0.3,1)",
        alignSelf: "flex-start",
      }}>
        {/* Canvas */}
        <div style={{ position: "absolute", inset: 0, opacity: hovEntry ? 0.38 : 0, transition: "opacity 0.6s ease", zIndex: 0 }}>
          {hovEntry && <ProjectVisual visual={hovEntry.visual} color={hovEntry.accent} />}
        </div>
        {/* Grain */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: GRAIN_URL, backgroundSize: "180px", opacity: 0.04, zIndex: 1, pointerEvents: "none" }} />
        {/* Gradient scrim */}
        <div style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none", background: "linear-gradient(to bottom, rgba(8,8,8,0.6) 0%, transparent 30%, rgba(8,8,8,0.8) 100%)" }} />

        {/* Content */}
        <div style={{ position: "relative", zIndex: 2, padding: "48px 40px", display: "flex", flexDirection: "column", height: "100%" }}>
          {/* Name */}
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", fontWeight: 300, color: "rgba(240,237,230,0.88)" }}>Gordon Tsui</div>
            <div style={{ fontSize: "8px", color: "rgba(240,237,230,0.2)", letterSpacing: "0.18em", textTransform: "uppercase", marginTop: "6px" }}>Software Engineer · Vancouver</div>
          </div>

          {/* Nav */}
          <nav style={{ marginTop: "52px", display: "flex", flexDirection: "column", gap: "16px" }}>
            {["About", "Work", "Contact"].map((item) => (
              <span key={item} style={{ fontSize: "9px", letterSpacing: "0.13em", textTransform: "uppercase", color: "rgba(240,237,230,0.22)", cursor: "pointer" }}>{item}</span>
            ))}
          </nav>

          {/* Dynamic context block — one per entry, absolutely stacked, fade in/out */}
          <div style={{ marginTop: "auto", position: "relative", minHeight: "220px" }}>
            {experiences.map((p) => {
              const rgb = hexRgb(p.accent);
              const isHov = hovered === p.id;
              return (
                <div key={p.id} style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  opacity: isHov ? 1 : 0,
                  transform: isHov ? "translateY(0)" : "translateY(18px)",
                  transition: "opacity 0.45s ease, transform 0.5s cubic-bezier(0.16,1,0.3,1)",
                  pointerEvents: "none",
                }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "32px", fontStyle: "italic", fontWeight: 300, color: p.accent, lineHeight: 1, marginBottom: "14px", letterSpacing: "-0.02em" }}>{p.title}</div>
                  <p style={{ fontSize: "9.5px", color: "rgba(240,237,230,0.4)", lineHeight: 1.8 }}>{p.desc}</p>
                  <div style={{ marginTop: "18px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
                    {p.tags.map((tag) => <span key={tag} style={{ fontSize: "8px", letterSpacing: "0.14em", textTransform: "uppercase", color: `rgba(${rgb.r},${rgb.g},${rgb.b},0.5)` }}>{tag}</span>)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Right panel: experience list ── */}
      <div style={{ flex: 1, padding: "0 60px" }}>
        <div style={{ paddingTop: "80px", paddingBottom: "56px" }}>
          <div style={{ fontSize: "8px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(240,237,230,0.1)" }}>Selected Experience</div>
        </div>

        {experiences.map((p) => {
          const isHov = hovered === p.id;
          return (
            <div
              key={p.id}
              className="ma-entry"
              style={{ borderLeftColor: isHov ? p.accent : "transparent" }}
              onMouseEnter={() => setHovered(p.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => openDetail(p.id)}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: "20px" }}>
                <span style={{ fontSize: "9px", color: isHov ? p.accent : "rgba(240,237,230,0.16)", letterSpacing: "0.06em", paddingTop: "10px", width: "28px", flexShrink: 0, transition: "color 0.3s" }}>{p.num}</span>
                <div className="ma-title" style={{ flex: 1, color: isHov ? p.accent : undefined }}>{p.title}</div>
                <div style={{ textAlign: "right", paddingTop: "10px", flexShrink: 0 }}>
                  <div style={{ fontSize: "9px", color: "rgba(240,237,230,0.13)", letterSpacing: "0.1em" }}>{p.year}</div>
                </div>
              </div>
            </div>
          );
        })}

        <footer style={{ borderTop: "1px solid rgba(240,237,230,0.05)", marginTop: "48px", paddingTop: "40px", paddingBottom: "60px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "9px", color: "rgba(240,237,230,0.1)", letterSpacing: "0.1em" }}>2026 — Vancouver, BC</span>
          <div style={{ display: "flex", gap: "24px" }}>
            {["GitHub", "LinkedIn", "Email"].map((l) => (
              <span key={l} style={{ fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(240,237,230,0.16)" }}>{l}</span>
            ))}
          </div>
        </footer>
      </div>

      {detailed && <DetailOverlay entry={experiences.find((p) => p.id === detailed)} onClose={closeDetail} closing={detailClosing} />}
    </div>
  );
}

// ─── MOCKUP B: Full-Bleed Cards ───────────────────────────────────────────────
//
// Each company gets its own full-viewport card. The canvas animation FILLS the
// card background. Scrolling down is a journey through three distinct visual
// worlds. On hover, the canvas brightens, the title picks up the accent color,
// and a short description fades in. Clicking opens the same DetailView overlay.
//
// Hiring signal: strong visual presence, product confidence, stands out in a
// recruiter's browser tab stack.

function MockupB() {
  const [hovered, setHovered] = useState(null);
  const { detailed, detailClosing, openDetail, closeDetail } = useDetailOverlay();

  return (
    <div style={{ backgroundColor: "#080808", fontFamily: "'DM Mono', monospace" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400&family=Cormorant+Garamond:ital,wght@0,300;1,300;1,600&display=swap');
        .mb-card {
          position: relative;
          overflow: hidden;
          cursor: pointer;
        }
        .mb-canvas-wrap {
          position: absolute;
          inset: 0;
          transition: opacity 0.55s ease;
        }
        .mb-title {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-weight: 300;
          letter-spacing: -0.03em;
          line-height: 0.92;
          transition: color 0.4s ease;
        }
        .mb-desc {
          font-size: 10.5px;
          line-height: 1.8;
          color: rgba(240,237,230,0.5);
          max-width: 500px;
          margin-bottom: 24px;
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 0.45s ease, transform 0.5s cubic-bezier(0.16,1,0.3,1);
        }
        .mb-card:hover .mb-desc { opacity: 1; transform: translateY(0); }
        .mb-cta {
          opacity: 0;
          transition: opacity 0.4s ease 0.08s;
          font-size: 9px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }
        .mb-card:hover .mb-cta { opacity: 1; }
        .mb-border {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 2px;
          transition: opacity 0.4s ease;
        }
      `}</style>

      {/* Fixed name/nav — floats above cards */}
      <div style={{ position: "fixed", top: "40px", left: 0, right: 0, padding: "22px 56px", zIndex: 50, display: "flex", justifyContent: "space-between", alignItems: "flex-start", pointerEvents: "none" }}>
        <div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", fontWeight: 300, color: "rgba(240,237,230,0.88)" }}>Gordon Tsui</div>
          <div style={{ fontSize: "8px", color: "rgba(240,237,230,0.18)", letterSpacing: "0.18em", textTransform: "uppercase", marginTop: "4px" }}>Software Engineer</div>
        </div>
        <div style={{ display: "flex", gap: "28px", pointerEvents: "auto" }}>
          {["About", "Contact"].map((item) => (
            <span key={item} style={{ fontSize: "9px", letterSpacing: "0.13em", textTransform: "uppercase", color: "rgba(240,237,230,0.22)", cursor: "pointer" }}>{item}</span>
          ))}
        </div>
      </div>

      {/* Cards */}
      {experiences.map((p) => {
        const rgb = hexRgb(p.accent);
        const isHov = hovered === p.id;
        return (
          <div
            key={p.id}
            className="mb-card"
            style={{ height: "88vh", backgroundColor: p.bg }}
            onMouseEnter={() => setHovered(p.id)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => openDetail(p.id)}
          >
            {/* Canvas */}
            <div className="mb-canvas-wrap" style={{ opacity: isHov ? 0.65 : 0.38 }}>
              <ProjectVisual visual={p.visual} color={p.accent} />
            </div>

            {/* Top-left dark vignette */}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(0,0,0,0.72) 0%, transparent 55%)", zIndex: 1, pointerEvents: "none" }} />
            {/* Bottom dark gradient for text */}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 50%)", zIndex: 1, pointerEvents: "none" }} />
            {/* Grain */}
            <div style={{ position: "absolute", inset: 0, backgroundImage: GRAIN_URL, backgroundSize: "180px", opacity: 0.035, zIndex: 2, pointerEvents: "none" }} />

            {/* Accent bottom border */}
            <div className="mb-border" style={{ background: p.accent, opacity: isHov ? 0.55 : 0.12, zIndex: 3 }} />

            {/* Content */}
            <div style={{ position: "absolute", inset: 0, zIndex: 4, padding: "40px 56px", display: "flex", flexDirection: "column" }}>
              {/* Top row */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <span style={{ fontSize: "10px", color: `rgba(${rgb.r},${rgb.g},${rgb.b},0.6)`, letterSpacing: "0.06em" }}>{p.num}</span>
                <span style={{ fontSize: "9px", color: "rgba(240,237,230,0.2)", letterSpacing: "0.1em" }}>{p.year}</span>
              </div>

              {/* Bottom content */}
              <div style={{ marginTop: "auto" }}>
                {/* Description — hover reveal */}
                <p className="mb-desc">{p.desc}</p>

                {/* Title */}
                <div className="mb-title" style={{ fontSize: "clamp(60px, 9.5vw, 124px)", color: isHov ? p.accent : "rgba(240,237,230,0.9)", marginBottom: "18px" }}>
                  {p.title}
                </div>

                {/* Tags + CTA */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                    {p.tags.map((tag) => (
                      <span key={tag} style={{ fontSize: "8px", letterSpacing: "0.15em", textTransform: "uppercase", color: `rgba(${rgb.r},${rgb.g},${rgb.b},0.5)` }}>{tag}</span>
                    ))}
                  </div>
                  <span className="mb-cta" style={{ color: `rgba(${rgb.r},${rgb.g},${rgb.b},0.65)` }}>Read More →</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Footer */}
      <footer style={{ padding: "48px 56px", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(240,237,230,0.05)" }}>
        <span style={{ fontSize: "9px", color: "rgba(240,237,230,0.1)", letterSpacing: "0.1em" }}>2026 — Vancouver, BC</span>
        <div style={{ display: "flex", gap: "24px" }}>
          {["GitHub", "LinkedIn", "Email"].map((l) => (
            <span key={l} style={{ fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(240,237,230,0.16)" }}>{l}</span>
          ))}
        </div>
      </footer>

      {detailed && <DetailOverlay entry={experiences.find((p) => p.id === detailed)} onClose={closeDetail} closing={detailClosing} />}
    </div>
  );
}

// ─── Terminal helpers ─────────────────────────────────────────────────────────

// Types `text` character by character. Shows a solid ▮ cursor while in progress.
// Calls onDone() once the last character has been printed.
function TypewriterLine({ text, speed = 16, delay = 0, onDone }) {
  const [chars, setChars] = useState(0);
  const refs = useRef({ to: null, iv: null, notified: false });

  useEffect(() => {
    const r = refs.current;
    r.notified = false;
    setChars(0);
    r.to = setTimeout(() => {
      let c = 0;
      r.iv = setInterval(() => {
        c++;
        setChars(c);
        if (c >= text.length) {
          clearInterval(r.iv);
          if (!r.notified) { r.notified = true; onDone?.(); }
        }
      }, speed);
    }, delay);
    return () => { clearTimeout(r.to); clearInterval(r.iv); };
  }, [text, speed, delay]);

  const done = chars >= text.length;
  return <>{text.slice(0, chars)}{!done && <span style={{ opacity: 0.55 }}>▮</span>}</>;
}

// Label types left→right; the moment it finishes, detail text starts typing
// left→right in the next column — one continuous motion per row.
// onDone is called when the DETAIL finishes (full row complete).
function TerminalSubItem({ sub, color, staggerDelay, labelSpeed, detailSpeed, onDone }) {
  const [labelDone, setLabelDone] = useState(false);
  const rgb = hexRgb(color);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "100px 1fr", gap: "14px", alignItems: "baseline" }}>
      <span style={{
        fontSize: "8px", letterSpacing: "0.12em", textTransform: "uppercase",
        color: `rgba(${rgb.r},${rgb.g},${rgb.b},0.6)`, textAlign: "right",
      }}>
        <TypewriterLine text={sub.label} speed={labelSpeed} delay={staggerDelay} onDone={() => setLabelDone(true)} />
      </span>
      <span style={{ fontSize: "9.5px", color: "rgba(240,237,230,0.33)", lineHeight: 1.7 }}>
        {/* Only mount once the label column is done — cursor moves left→right into this column */}
        {labelDone && <TypewriterLine text={`→ ${sub.detail}`} speed={detailSpeed} delay={0} onDone={onDone} />}
      </span>
    </div>
  );
}

// Full entry row + expandable section. Trailing prompt waits for ALL detail
// columns to finish typing (not just the labels).
function TerminalEntry({ p, isOpen, onToggle, isHovered, onHoverEnter, onHoverLeave, blink }) {
  const [allDone, setAllDone] = useState(false);
  const doneCount = useRef(0);
  const trailingTimer = useRef(null);
  const rgb = hexRgb(p.accent);
  const STAGGER = 220;     // ms between row label starts
  const LABEL_SPEED = 16;  // ms per char — labels are short so this feels fast
  const DETAIL_SPEED = 5;  // ms per char — details are longer, keep it snappy

  useEffect(() => {
    if (!isOpen) {
      clearTimeout(trailingTimer.current);
      setAllDone(false);
      doneCount.current = 0;
    }
  }, [isOpen]);

  const handleRowDone = () => {
    doneCount.current++;
    if (doneCount.current >= p.subitems.length) {
      trailingTimer.current = setTimeout(() => setAllDone(true), 120);
    }
  };

  return (
    <div
      className="mc-entry"
      onMouseEnter={onHoverEnter}
      onMouseLeave={onHoverLeave}
      onClick={onToggle}
    >
      {/* ── Main row ── */}
      <div className="mc-row">
        <span style={{ fontSize: "11px", color: isHovered || isOpen ? p.accent : "rgba(240,237,230,0.1)", transition: "color 0.22s", flexShrink: 0, width: "14px", lineHeight: 1 }}>
          {isHovered || isOpen ? "▶" : "·"}
        </span>
        <span style={{ fontSize: "9px", color: isHovered ? p.accent : "rgba(240,237,230,0.17)", letterSpacing: "0.06em", flexShrink: 0, transition: "color 0.22s", lineHeight: 1 }}>{p.num}</span>
        <div className="mc-title" style={{ flex: 1, color: isHovered ? p.accent : "rgba(240,237,230,0.82)" }}>
          {p.title}
          {(isHovered || isOpen) && (
            <span style={{ opacity: blink ? 1 : 0, fontSize: "0.55em", verticalAlign: "middle", marginLeft: "5px", transition: "opacity 0.05s" }}>▮</span>
          )}
        </div>
        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <div style={{ fontSize: "9px", color: "rgba(240,237,230,0.13)", letterSpacing: "0.08em", marginBottom: "5px" }}>{p.year}</div>
          <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end", flexWrap: "wrap" }}>
            {p.tags.map((tag) => (
              <span key={tag} style={{ fontSize: "8px", letterSpacing: "0.12em", textTransform: "uppercase", color: `rgba(${rgb.r},${rgb.g},${rgb.b},${isHovered ? 0.58 : 0.18})`, transition: "color 0.22s" }}>{tag}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Expanded section ── */}
      {isOpen && (
        <div className="mc-sub">
          {/* Desc fades in immediately — too long to type comfortably */}
          <div style={{ fontSize: "9.5px", color: "rgba(240,237,230,0.36)", lineHeight: 1.8, maxWidth: "580px", animation: "mcIn 0.3s cubic-bezier(0.16,1,0.3,1) both" }}>
            {p.desc}
          </div>

          {/* Divider types out — gives the "terminal printing" feeling before subitems */}
          <div style={{ fontSize: "9px", color: "rgba(240,237,230,0.08)", animation: "mcIn 0.2s ease 0.06s both" }}>
            <TypewriterLine text="──────────────────────────────" speed={8} delay={80} />
          </div>

          {/* Each row: label types left→right, then detail continues left→right */}
          {p.subitems.map((sub, i) => (
            <TerminalSubItem
              key={sub.label}
              sub={sub}
              color={p.accent}
              staggerDelay={i * STAGGER + 180}
              labelSpeed={LABEL_SPEED}
              detailSpeed={DETAIL_SPEED}
              onDone={handleRowDone}
            />
          ))}

          {/* Trailing prompt — appears only once all labels have finished */}
          <div style={{
            fontSize: "9px", color: `rgba(${rgb.r},${rgb.g},${rgb.b},0.38)`,
            marginTop: "4px",
            opacity: allDone ? 1 : 0,
            transform: allDone ? "none" : "translateX(-6px)",
            transition: "opacity 0.22s ease, transform 0.28s ease",
          }}>
            $<span style={{ opacity: blink ? 1 : 0, transition: "opacity 0.05s", marginLeft: "4px" }}>▮</span>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── MOCKUP C: Terminal ───────────────────────────────────────────────────────
//
// Command-line aesthetic — everything monospaced, entries formatted like terminal
// output. The background still transitions per hovered entry (preserved from
// current design). Hovering shows an accent "▶" prompt and blinking cursor.
// Clicking expands subitems as indented terminal "output." Name is displayed
// in large italic Cormorant — a deliberate contrast: dev precision meets craft.
//
// Hiring signal: developer culture, personality, technical confidence.

function MockupC() {
  const [expanded, setExpanded] = useState(null);
  const [hovered, setHovered] = useState(null);
  const [blink, setBlink] = useState(true);

  const hovEntry = experiences.find((p) => p.id === hovered);
  const bgColor = hovEntry ? hovEntry.bg : "#060808";

  useEffect(() => {
    const interval = setInterval(() => setBlink((b) => !b), 530);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: bgColor,
      transition: "background-color 0.65s cubic-bezier(0.16,1,0.3,1)",
      fontFamily: "'DM Mono', monospace",
      position: "relative",
      overflowX: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400&family=Cormorant+Garamond:ital,wght@0,300;1,300;1,600&display=swap');
        .mc-entry {
          border-top: 1px solid rgba(240,237,230,0.05);
          cursor: pointer;
        }
        .mc-entry:last-of-type { border-bottom: 1px solid rgba(240,237,230,0.05); }
        .mc-row {
          display: flex;
          align-items: baseline;
          gap: 18px;
          padding: 26px 0;
          transition: padding-left 0.3s cubic-bezier(0.16,1,0.3,1);
        }
        .mc-entry:hover .mc-row { padding-left: 10px; }
        .mc-title {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-weight: 300;
          font-size: clamp(38px, 5.2vw, 70px);
          letter-spacing: -0.025em;
          line-height: 1;
          transition: color 0.25s ease;
        }
        .mc-sub {
          border-left: 1px solid rgba(240,237,230,0.07);
          margin-left: 46px;
          padding-left: 24px;
          padding-bottom: 28px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        @keyframes mcIn {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>

      {/* Background canvas — very subtle, just a hint */}
      <div style={{ position: "fixed", inset: 0, opacity: hovEntry ? 0.11 : 0, transition: "opacity 0.6s ease", pointerEvents: "none", zIndex: 0 }}>
        {hovEntry && <ProjectVisual visual={hovEntry.visual} color={hovEntry.accent} />}
      </div>
      <div style={{ position: "fixed", inset: 0, backgroundImage: GRAIN_URL, backgroundSize: "180px", opacity: 0.04, zIndex: 1, pointerEvents: "none" }} />

      <div style={{ position: "relative", zIndex: 2, maxWidth: "880px", margin: "0 auto", padding: "0 48px" }}>

        {/* Terminal header */}
        <div style={{ paddingTop: "72px", paddingBottom: "52px" }}>
          {/* Prompt */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "24px" }}>
            <span style={{ fontSize: "10px", color: "rgba(240,237,230,0.18)" }}>gordon@tsui</span>
            <span style={{ fontSize: "10px", color: "rgba(240,237,230,0.08)" }}>:</span>
            <span style={{ fontSize: "10px", color: hovEntry ? hovEntry.accent : "rgba(240,237,230,0.32)", transition: "color 0.4s ease" }}>~/experience</span>
            <span style={{ fontSize: "10px", color: "rgba(240,237,230,0.14)" }}>$</span>
            <span style={{ fontSize: "10px", color: "rgba(240,237,230,0.45)" }}>ls</span>
          </div>

          {/* Large name — Cormorant as deliberate contrast */}
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(56px, 8.5vw, 104px)", fontStyle: "italic", fontWeight: 300, color: hovEntry ? hovEntry.accent : "rgba(240,237,230,0.88)", lineHeight: 0.95, letterSpacing: "-0.03em", transition: "color 0.55s ease" }}>
            Gordon Tsui
          </div>
          <div style={{ marginTop: "14px", display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ fontSize: "8px", color: "rgba(240,237,230,0.16)", letterSpacing: "0.2em", textTransform: "uppercase" }}>Software Engineer · Vancouver, BC</span>
            <span style={{ opacity: blink ? 1 : 0, color: "rgba(240,237,230,0.4)", fontSize: "12px", transition: "opacity 0.05s", lineHeight: 1 }}>▮</span>
          </div>
        </div>

        {/* Command line before list */}
        <div style={{ fontSize: "9px", color: "rgba(240,237,230,0.1)", letterSpacing: "0.1em", marginBottom: "6px" }}>$ cat experience/*</div>

        {/* Entries */}
        <div>
          {experiences.map((p) => (
            <TerminalEntry
              key={p.id}
              p={p}
              isOpen={expanded === p.id}
              onToggle={() => setExpanded(expanded === p.id ? null : p.id)}
              isHovered={hovered === p.id}
              onHoverEnter={() => setHovered(p.id)}
              onHoverLeave={() => setHovered(null)}
              blink={blink}
            />
          ))}
        </div>

        {/* Footer */}
        <footer style={{ paddingTop: "64px", paddingBottom: "52px", borderTop: "1px solid rgba(240,237,230,0.05)", marginTop: "12px" }}>
          <div style={{ fontSize: "9px", color: "rgba(240,237,230,0.09)", letterSpacing: "0.08em", marginBottom: "16px" }}>$ echo $CONTACT</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "9px", color: "rgba(240,237,230,0.1)", letterSpacing: "0.1em" }}>2026 — Vancouver, BC</span>
            <div style={{ display: "flex", gap: "24px" }}>
              {["GitHub", "LinkedIn", "Email"].map((l) => (
                <span key={l} style={{ fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(240,237,230,0.16)" }}>{l}</span>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export { MockupC };

// ─── Mockup selector ──────────────────────────────────────────────────────────

const TABS = [
  { id: "current", label: "Current" },
  { id: "A", label: "A · Editorial Split" },
  { id: "B", label: "B · Full-Bleed Cards" },
  { id: "C", label: "C · Terminal" },
];

export default function MockupSelector() {
  const [view, setView] = useState("A");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400&display=swap');
        .ms-tab {
          background: none;
          border: none;
          padding: 7px 14px;
          border-radius: 4px;
          cursor: pointer;
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          transition: color 0.18s, background 0.18s;
        }
        .ms-tab:hover { color: rgba(255,255,255,0.7) !important; }
      `}</style>

      {/* Switcher bar */}
      <div style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        height: "40px",
        backgroundColor: "rgba(10,10,10,0.94)",
        backdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        display: "flex",
        alignItems: "center",
        gap: "2px",
        padding: "0 16px",
        zIndex: 9999,
      }}>
        <span style={{ fontSize: "8px", letterSpacing: "0.18em", color: "rgba(255,255,255,0.12)", marginRight: "14px", fontFamily: "'DM Mono', monospace", textTransform: "uppercase" }}>Mockups</span>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className="ms-tab"
            onClick={() => setView(tab.id)}
            style={{
              color: view === tab.id ? "rgba(255,255,255,0.88)" : "rgba(255,255,255,0.28)",
              background: view === tab.id ? "rgba(255,255,255,0.08)" : "none",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content pushed below bar */}
      <div style={{ paddingTop: "40px" }}>
        {view === "current" && <Portfolio />}
        {view === "A" && <MockupA />}
        {view === "B" && <MockupB />}
        {view === "C" && <MockupC />}
      </div>
    </>
  );
}
