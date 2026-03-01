import { useState, useEffect, useRef } from "react";

const experiences = [
  {
    id: 1, num: "01", title: "FORM",
    tags: ["Web Team Lead", "Full Stack"], year: "2021–Present",
    desc: "Led the web team through a retention turnaround — churn dropped from 13% to 6% in a single year. Shipped Streaks from hackathon to A/B production, built the Web-Driven UI framework, and migrated infrastructure off AWS OpsWorks with zero downtime.",
    accent: "#E6FF00", bg: "#0a1a00", visual: "terrain",
    logo: (
      <svg viewBox="0 0 96 38" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="FORM">
        <rect x="1.25" y="1.25" width="40" height="35.5" rx="12" stroke="currentColor" strokeWidth="2.5"/>
        <rect x="54.75" y="1.25" width="40" height="35.5" rx="12" stroke="currentColor" strokeWidth="2.5"/>
        <line x1="41.25" y1="19" x2="54.75" y2="19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="21.25" cy="19" r="8" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
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
    logo: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Sea Around Us">
        {/* Three puzzle segments — fish (UBC gold), mammals + plants (marine blue) */}
        <path d="M24 24 L24.94 6.02 A18 18 0 0 1 40.04 32.17 Z" fill="#C4952A"/>
        <path d="M24 24 L39.10 33.81 A18 18 0 0 1 8.90 33.81 Z" fill="#3AAFC8"/>
        <path d="M24 24 L7.96 32.17 A18 18 0 0 1 23.06 6.02 Z" fill="#3AAFC8"/>
      </svg>
    ),
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
    logo: (
      <svg viewBox="0 0 80 62" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Backcountry Wok">
        {/* Mountain peaks above the rim */}
        <path d="M14 36 L24 18 L34 28 L42 10 L52 26 L60 16 L66 36" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        {/* Wok rim */}
        <line x1="10" y1="36" x2="70" y2="36" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        {/* Wok bowl */}
        <path d="M10 36 Q40 64 70 36" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
        {/* Handles */}
        <line x1="10" y1="36" x2="2" y2="31" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="70" y1="36" x2="78" y2="31" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
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

function SubItem({ item, color, index, visible }) {
  const rgb = hexRgb(color);
  return (
    <div style={{
      display: "flex",
      gap: "14px",
      alignItems: "flex-start",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(8px)",
      transition: `opacity 0.35s ease ${0.08 + index * 0.07}s, transform 0.4s cubic-bezier(0.16,1,0.3,1) ${0.08 + index * 0.07}s`,
    }}>
      <span style={{
        fontFamily: "'DM Mono', monospace",
        fontSize: "9px",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: `rgba(${rgb.r},${rgb.g},${rgb.b},0.65)`,
        whiteSpace: "nowrap",
        paddingTop: "1px",
        width: "90px",
        textAlign: "right",
        flexShrink: 0,
      }}>{item.label}</span>
      <span style={{
        width: "1px",
        minHeight: "14px",
        alignSelf: "stretch",
        background: `rgba(${rgb.r},${rgb.g},${rgb.b},0.2)`,
        flexShrink: 0,
      }} />
      <span style={{
        fontFamily: "'DM Mono', monospace",
        fontSize: "9px",
        color: "rgba(240,237,230,0.38)",
        lineHeight: 1.75,
        fontWeight: 300,
      }}>{item.detail}</span>
    </div>
  );
}

const GRAIN_URL = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

function DetailView({ entry, onClose, closing }) {
  const rgb = hexRgb(entry.accent);
  return (
    <div
      className={`detail-overlay${closing ? " closing" : ""}`}
      style={{ backgroundColor: entry.bg }}
      onClick={onClose}
    >
      {/* Canvas hero — full viewport at higher opacity than main page */}
      <div className="detail-canvas-wrap">
        <ProjectVisual visual={entry.visual} color={entry.accent} />
      </div>

      {/* Gradient scrim for text readability */}
      <div className="detail-gradient" />

      {/* Grain texture */}
      <div className="detail-grain" />

      {/* Close button */}
      <button className="detail-close" onClick={onClose} aria-label="Close">×</button>

      {/* Scrollable content */}
      <div className="detail-content" onClick={(e) => e.stopPropagation()}>

        <div className="detail-eyebrow">
          <span>{entry.num}</span>
          <span>{entry.year}</span>
        </div>

        <h2 className="detail-title" style={{ color: entry.accent }}>{entry.title}</h2>

        <div className="detail-tags">
          {entry.tags.map((tag) => (
            <span key={tag} className="detail-tag" style={{ color: `rgba(${rgb.r},${rgb.g},${rgb.b},0.55)` }}>
              {tag}
            </span>
          ))}
        </div>

        <p className="detail-headline">{entry.story.headline}</p>

        <p className="detail-body">{entry.story.body}</p>

        {entry.story.stats && (
          <div className="detail-stats">
            {entry.story.stats.map((stat) => (
              <div key={stat.label} className="detail-stat">
                <span className="detail-stat-value" style={{ color: entry.accent }}>{stat.value}</span>
                <span className="detail-stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        )}

        <div className="detail-rule" style={{ background: `rgba(${rgb.r},${rgb.g},${rgb.b},0.12)` }} />

        <div className="detail-subitems">
          {entry.subitems.map((sub, i) => (
            <SubItem key={sub.label} item={sub} color={entry.accent} index={i} visible={true} />
          ))}
        </div>

        {entry.story.link && (
          <a
            className="detail-link"
            href={entry.story.link.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: `rgba(${rgb.r},${rgb.g},${rgb.b},0.55)` }}
          >
            {entry.story.link.label} ↗
          </a>
        )}
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [hovered, setHovered] = useState(null);
  const [cursor, setCursor] = useState({ x: -100, y: -100 });
  const [cursorVisible, setCursorVisible] = useState(false);
  const [entered, setEntered] = useState(false);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" && window.innerWidth <= 768
  );
  const [detailed, setDetailed] = useState(null);
  const [detailClosing, setDetailClosing] = useState(false);
  const detailCloseTimer = useRef(null);

  const active = experiences.find((p) => p.id === hovered);

  const handleDetailClose = () => {
    if (detailCloseTimer.current) clearTimeout(detailCloseTimer.current);
    setDetailClosing(true);
    detailCloseTimer.current = setTimeout(() => {
      setDetailed(null);
      setDetailClosing(false);
    }, 350);
  };

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const move = (e) => setCursor({ x: e.clientX, y: e.clientY });
    const show = () => setCursorVisible(true);
    const hide = () => setCursorVisible(false);
    window.addEventListener("mousemove", move);
    document.addEventListener("mouseenter", show);
    document.addEventListener("mouseleave", hide);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseenter", show);
      document.removeEventListener("mouseleave", hide);
    };
  }, []);

  // Esc key dismisses detail overlay
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape" && detailed) handleDetailClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [detailed]);

  // Scroll lock while detail overlay is open
  useEffect(() => {
    document.body.style.overflow = detailed ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [detailed]);

  const bgColor = active ? active.bg : "#0c0c0c";
  const accentColor = active ? active.accent : "#f0ede6";

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: bgColor,
      transition: "background-color 0.65s cubic-bezier(0.16, 1, 0.3, 1)",
      fontFamily: "'DM Mono', monospace",
      cursor: isMobile ? "default" : "none",
      overflowX: "hidden",
      position: "relative",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400&family=Cormorant+Garamond:ital,wght@0,300;1,300;1,600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .pr {
          border-top: 1px solid rgba(240,237,230,0.07);
          cursor: none;
          position: relative;
        }
        .pr:last-child { border-bottom: 1px solid rgba(240,237,230,0.07); }

        .pr-main {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 18px 0;
        }

        .pnum {
          font-size: 10px;
          color: rgba(240,237,230,0.2);
          width: 36px;
          flex-shrink: 0;
          letter-spacing: 0.06em;
          transition: color 0.35s ease;
          font-family: 'DM Mono', monospace;
          font-weight: 300;
          align-self: center;
        }

        .ptitle-group {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .ptitle {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(38px, 5.8vw, 76px);
          font-weight: 300;
          font-style: italic;
          color: rgba(240,237,230,0.82);
          letter-spacing: -0.025em;
          line-height: 1;
          transition: color 0.3s ease, transform 0.45s cubic-bezier(0.16,1,0.3,1);
          transform-origin: left center;
        }
        .pr:hover .ptitle { transform: translateX(10px); }

        .pmeta {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 5px;
          min-width: 280px;
        }

        .pyear {
          font-size: 9px;
          color: rgba(240,237,230,0.18);
          letter-spacing: 0.1em;
          font-family: 'DM Mono', monospace;
        }

        .ptags { display: flex; gap: 8px; flex-wrap: wrap; justify-content: flex-start; }
        .ptag {
          font-size: 9px;
          letter-spacing: 0.13em;
          color: rgba(240,237,230,0.18);
          text-transform: uppercase;
          font-family: 'DM Mono', monospace;
          transition: color 0.3s ease;
        }

        .pdesc {
          font-size: 10px;
          font-family: 'DM Mono', monospace;
          font-weight: 300;
          color: rgba(240,237,230,0);
          line-height: 1.75;
          text-align: right;
          max-width: 280px;
          transition: color 0.45s ease;
        }
        .pdesc.vis { color: rgba(240,237,230,0.5); }

        .logo-wrap { padding-bottom: 20px; }
        .logo-wrap svg { height: 32px; width: auto; opacity: 0.85; }

        .subitems-wrap {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.55s cubic-bezier(0.16,1,0.3,1), padding-bottom 0.4s ease;
          padding-left: 48px;
          padding-bottom: 0;
        }
        .subitems-wrap.open {
          max-height: 600px;
          padding-bottom: 24px;
        }

        .subitems-inner {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .detail-trigger {
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          background: none;
          border: none;
          padding: 0;
          margin-top: 20px;
          cursor: none;
          display: block;
          transition: color 0.2s ease, opacity 0.4s ease;
        }
        .detail-trigger:hover { opacity: 1 !important; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .entered .pr { animation: fadeUp 0.75s cubic-bezier(0.16,1,0.3,1) both; }
        .entered .pr:nth-child(1) { animation-delay: 0.12s; }
        .entered .pr:nth-child(2) { animation-delay: 0.26s; }
        .entered .pr:nth-child(3) { animation-delay: 0.40s; }

        @keyframes hIn {
          from { opacity: 0; transform: translateY(-14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .hin { animation: hIn 0.9s cubic-bezier(0.16,1,0.3,1) 0.04s both; }

        @keyframes fIn { from { opacity: 0; } to { opacity: 1; } }
        .fin { animation: fIn 1s ease 0.85s both; }

        .pchevron { display: none; }

        /* ── Detail Overlay ── */
        @keyframes detailIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes detailOut {
          from { opacity: 1; }
          to   { opacity: 0; }
        }
        @keyframes detailUp {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .detail-overlay {
          position: fixed;
          inset: 0;
          z-index: 100;
          overflow-y: auto;
          overflow-x: hidden;
          animation: detailIn 0.5s cubic-bezier(0.16,1,0.3,1) both;
        }
        .detail-overlay.closing {
          animation: detailOut 0.35s cubic-bezier(0.16,1,0.3,1) both;
        }

        .detail-canvas-wrap {
          position: fixed;
          inset: 0;
          opacity: 0.45;
          pointer-events: none;
          z-index: 0;
        }

        .detail-gradient {
          position: fixed;
          inset: 0;
          background: linear-gradient(to bottom, transparent 0%, rgba(8,8,8,0.5) 40%, rgba(8,8,8,0.92) 80%);
          pointer-events: none;
          z-index: 1;
        }

        .detail-grain {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 2;
          opacity: 0.035;
          background-image: ${GRAIN_URL};
          background-size: 180px 180px;
        }

        .detail-close {
          position: fixed;
          top: 40px;
          right: 48px;
          z-index: 200;
          font-family: 'DM Mono', monospace;
          font-size: 20px;
          color: rgba(240,237,230,0.3);
          background: none;
          border: none;
          cursor: none;
          padding: 8px;
          line-height: 1;
          transition: color 0.2s ease;
        }
        .detail-close:hover { color: rgba(240,237,230,0.9); }

        .detail-content {
          position: relative;
          z-index: 10;
          max-width: 1100px;
          margin: 0 auto;
          padding: 120px 48px 100px;
        }

        .detail-eyebrow {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.16em;
          color: rgba(240,237,230,0.2);
          text-transform: uppercase;
          margin-bottom: 24px;
          animation: detailUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.10s both;
        }

        .detail-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(64px, 10vw, 130px);
          font-weight: 300;
          font-style: italic;
          letter-spacing: -0.03em;
          line-height: 0.95;
          margin-bottom: 20px;
          animation: detailUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.18s both;
        }

        .detail-tags {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          margin-bottom: 60px;
          animation: detailUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.26s both;
        }

        .detail-tag {
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .detail-headline {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(22px, 3vw, 36px);
          font-weight: 300;
          font-style: italic;
          color: rgba(240,237,230,0.75);
          line-height: 1.3;
          max-width: 680px;
          margin-bottom: 32px;
          animation: detailUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.32s both;
        }

        .detail-body {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          font-weight: 300;
          color: rgba(240,237,230,0.45);
          line-height: 2;
          max-width: 620px;
          margin-bottom: 64px;
          white-space: pre-line;
          animation: detailUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.38s both;
        }

        .detail-stats {
          display: flex;
          gap: 48px;
          flex-wrap: wrap;
          margin-bottom: 56px;
          animation: detailUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.44s both;
        }

        .detail-stat-value {
          display: block;
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(36px, 5vw, 56px);
          font-weight: 300;
          font-style: italic;
          line-height: 1;
          letter-spacing: -0.02em;
        }

        .detail-stat-label {
          display: block;
          font-family: 'DM Mono', monospace;
          font-size: 8px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(240,237,230,0.22);
          margin-top: 6px;
        }

        .detail-rule {
          height: 1px;
          margin-bottom: 40px;
          animation: detailUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.48s both;
        }

        .detail-subitems {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px 48px;
          margin-bottom: 56px;
          animation: detailUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.52s both;
        }

        .detail-link {
          display: inline-block;
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          text-decoration: none;
          transition: color 0.2s ease;
          animation: detailUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.58s both;
        }

        /* ── Mobile ── */
        @media (max-width: 768px) {
          .site-wrap { padding: 0 20px !important; }

          .site-header {
            flex-direction: column !important;
            gap: 16px;
            padding-top: 28px !important;
            padding-bottom: 48px !important;
          }

          .site-nav { display: none; }

          .pr {
            cursor: default;
            touch-action: manipulation;
          }

          .pr-main {
            flex-wrap: wrap;
            align-items: flex-start;
            gap: 2px;
            padding: 20px 0;
          }

          .ptitle { font-size: clamp(28px, 9vw, 52px) !important; }

          .pr:hover .ptitle { transform: none; }

          .pchevron {
            display: flex;
            align-items: center;
            font-size: 14px;
            color: rgba(240,237,230,0.18);
            transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), color 0.3s ease;
            flex-shrink: 0;
            align-self: center;
            padding: 0 2px;
            font-style: normal;
          }
          .pchevron.open { transform: rotate(90deg); }

          .pmeta {
            width: 100%;
            min-width: unset !important;
            align-items: flex-start !important;
            padding-top: 6px;
          }

          .pdesc {
            text-align: left !important;
            max-width: 100% !important;
          }

          .subitems-wrap { padding-left: 0 !important; }

          .detail-close {
            top: 20px;
            right: 20px;
            cursor: pointer;
          }

          .detail-content {
            padding: 80px 20px 60px;
          }

          .detail-subitems {
            grid-template-columns: 1fr;
          }

          .detail-canvas-wrap {
            opacity: 0.3;
          }

          .detail-trigger {
            cursor: pointer;
          }

          .site-footer {
            flex-direction: column !important;
            gap: 16px;
            align-items: flex-start !important;
            padding-top: 40px !important;
            padding-bottom: 36px !important;
          }
        }

        /* Hide custom cursor on touch devices */
        @media (pointer: coarse) {
          .custom-cursor { display: none !important; }
          * { cursor: default !important; }
          .detail-close, .detail-trigger { cursor: pointer !important; }
        }
      `}</style>

      {/* Custom cursor */}
      <div className="custom-cursor" style={{
        position: "fixed",
        left: cursor.x,
        top: cursor.y,
        pointerEvents: "none",
        zIndex: 9999,
        mixBlendMode: "difference",
        transform: `translate(-50%, -50%) scale(${hovered && !detailed ? 2.2 : 1})`,
        transition: "transform 0.18s ease, opacity 0.2s ease",
        opacity: cursorVisible ? 1 : 0,
      }}>
        <svg width="18" height="18" viewBox="0 0 18 18">
          <circle cx="9" cy="9" r="3.5" fill={hovered ? accentColor : "#f0ede6"} />
        </svg>
      </div>

      {/* Background canvas visual */}
      <div style={{
        position: "fixed",
        inset: 0,
        opacity: hovered ? 0.22 : 0,
        transition: "opacity 0.7s ease",
        pointerEvents: "none",
        zIndex: 0,
      }}>
        {active && <ProjectVisual visual={active.visual} color={active.accent} />}
      </div>

      {/* Grain overlay */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 1, opacity: 0.035,
        backgroundImage: GRAIN_URL,
        backgroundSize: "180px 180px",
      }} />

      {/* Page content */}
      <div className="site-wrap" style={{
        position: "relative", zIndex: 2,
        maxWidth: "1100px", margin: "0 auto", padding: "0 48px",
      }}>
        {/* Header */}
        <header className="site-header hin" style={{
          display: "flex", justifyContent: "space-between", alignItems: "flex-start",
          paddingTop: "48px", paddingBottom: "88px",
        }}>
          <div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "22px", fontWeight: 300,
              color: "rgba(240,237,230,0.88)",
            }}>Gordon Tsui</div>
            <div style={{
              fontSize: "9px", color: "rgba(240,237,230,0.22)",
              letterSpacing: "0.16em", textTransform: "uppercase", marginTop: "5px",
              fontFamily: "'DM Mono', monospace",
            }}>Software Engineer &amp; Technical Leader</div>
          </div>
          <nav className="site-nav" style={{ display: "flex", gap: "32px", paddingTop: "4px" }}>
            {["About", "Contact"].map((item) => (
              <span key={item} style={{
                fontSize: "9px", letterSpacing: "0.13em", textTransform: "uppercase",
                color: "rgba(240,237,230,0.28)", cursor: "none",
                fontFamily: "'DM Mono', monospace",
              }}>{item}</span>
            ))}
          </nav>
        </header>

        {/* Experience list */}
        <main className={entered ? "entered" : ""}>
          {experiences.map((p) => {
            const isHov = hovered === p.id;
            const rgb = hexRgb(p.accent);
            const triggerDelay = 0.08 + p.subitems.length * 0.07 + 0.15;
            return (
              <div
                key={p.id}
                className="pr"
                onMouseEnter={!isMobile ? () => setHovered(p.id) : undefined}
                onMouseLeave={!isMobile ? () => setHovered(null) : undefined}
                onClick={isMobile ? () => setHovered(hovered === p.id ? null : p.id) : undefined}
              >
                {/* Main row */}
                <div className="pr-main">
                  <span className="pnum" style={{ color: isHov ? p.accent : undefined }}>{p.num}</span>
                  <div className="ptitle-group">
                    <span className="ptitle" style={{ color: isHov ? p.accent : undefined }}>{p.title}</span>
                    <div className="ptags">
                      {p.tags.map((tag) => (
                        <span key={tag} className="ptag" style={{
                          color: isHov ? `rgba(${rgb.r},${rgb.g},${rgb.b},0.65)` : undefined,
                        }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                  <span
                    className={`pchevron${isHov ? " open" : ""}`}
                    style={{ color: isHov ? `rgba(${rgb.r},${rgb.g},${rgb.b},0.5)` : undefined }}
                    aria-hidden="true"
                  >›</span>
                  <div className="pmeta">
                    <span className="pyear">{p.year}</span>
                    <p className={`pdesc${isHov ? " vis" : ""}`}>{p.desc}</p>
                  </div>
                </div>

                {/* Expandable sub-items + logo + full story trigger */}
                {(p.subitems || p.logo) && (
                  <div className={`subitems-wrap${isHov ? " open" : ""}`}>
                    {p.logo && (
                      <div className="logo-wrap" style={{ color: p.accent }}>
                        {p.logo}
                      </div>
                    )}
                    {p.subitems && (
                      <div className="subitems-inner">
                        {p.subitems.map((sub, i) => (
                          <SubItem
                            key={sub.label}
                            item={sub}
                            color={p.accent}
                            index={i}
                            visible={isHov}
                          />
                        ))}
                      </div>
                    )}
                    {/* Full story trigger — fades in after subitems settle */}
                    <button
                      className="detail-trigger"
                      style={{
                        color: `rgba(${rgb.r},${rgb.g},${rgb.b},0.45)`,
                        opacity: isHov ? 0.7 : 0,
                        transition: `opacity 0.4s ease ${isHov ? triggerDelay : 0}s, color 0.2s ease`,
                        pointerEvents: isHov ? "auto" : "none",
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setHovered(null);
                        setDetailed(p.id);
                      }}
                    >
                      full story →
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </main>

        {/* Footer */}
        <footer className="site-footer fin" style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          paddingTop: "64px", paddingBottom: "48px",
          borderTop: "1px solid rgba(240,237,230,0.05)", marginTop: "12px",
        }}>
          <span style={{
            fontSize: "9px", color: "rgba(240,237,230,0.15)",
            letterSpacing: "0.1em", fontFamily: "'DM Mono', monospace",
          }}>
            {new Date().getFullYear()} — Vancouver, BC
          </span>
          <div style={{ display: "flex", gap: "24px" }}>
            {["GitHub", "LinkedIn", "Email"].map((l) => (
              <span key={l} style={{
                fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase",
                color: "rgba(240,237,230,0.2)",
                fontFamily: "'DM Mono', monospace",
              }}>{l}</span>
            ))}
          </div>
        </footer>
      </div>

      {/* Detail view overlay */}
      {detailed && (
        <DetailView
          entry={experiences.find((p) => p.id === detailed)}
          onClose={handleDetailClose}
          closing={detailClosing}
        />
      )}
    </div>
  );
}
