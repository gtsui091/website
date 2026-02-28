import { useState, useEffect, useRef } from "react";

const experiences = [
  {
    id: 1, num: "01", title: "FORM",
    tags: ["Web Team Lead", "Full Stack"], year: "2021–Present",
    desc: "Led the web team through a retention turnaround — churn dropped from 13% to 6% in a single year. Shipped Streaks from hackathon to A/B production, built the Web-Driven UI framework, and migrated infrastructure off AWS OpsWorks with zero downtime.",
    accent: "#C8FF00", bg: "#0a1a00", visual: "terrain",
    subitems: [
      { label: "Streaks", detail: "Hackathon concept → A/B production in weeks. A direct driver of the churn improvement." },
      { label: "Web-Driven UI", detail: "Eliminated mobile release cycle dependency. Enabled rapid iteration and A/B testing." },
      { label: "Infrastructure", detail: "Zero-downtime AWS OpsWorks migration + Intel-to-Arm server transition." },
      { label: "Subscriptions", detail: "Prepaid, Try Before You Buy, variable trials — architected for long-term flexibility." },
    ],
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
        width: "110px",
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

export default function Portfolio() {
  const [hovered, setHovered] = useState(null);
  const [cursor, setCursor] = useState({ x: -100, y: -100 });
  const [cursorVisible, setCursorVisible] = useState(false);
  const [entered, setEntered] = useState(false);

  const active = experiences.find((p) => p.id === hovered);

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 80);
    return () => clearTimeout(t);
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

  const bgColor = active ? active.bg : "#0c0c0c";
  const accentColor = active ? active.accent : "#f0ede6";

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: bgColor,
      transition: "background-color 0.65s cubic-bezier(0.16, 1, 0.3, 1)",
      fontFamily: "'DM Mono', monospace",
      cursor: "none",
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
          align-items: center;
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
        }

        .ptitle {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(38px, 5.8vw, 76px);
          font-weight: 300;
          font-style: italic;
          color: rgba(240,237,230,0.82);
          letter-spacing: -0.025em;
          line-height: 1;
          flex: 1;
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

        .ptags { display: flex; gap: 8px; flex-wrap: wrap; justify-content: flex-end; }
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

        .subitems-wrap {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.55s cubic-bezier(0.16,1,0.3,1), padding-bottom 0.4s ease;
          padding-left: 48px;
          padding-bottom: 0;
        }
        .subitems-wrap.open {
          max-height: 500px;
          padding-bottom: 24px;
        }

        .subitems-inner {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

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
      `}</style>

      {/* Custom cursor */}
      <div style={{
        position: "fixed",
        left: cursor.x,
        top: cursor.y,
        pointerEvents: "none",
        zIndex: 9999,
        mixBlendMode: "difference",
        transform: `translate(-50%, -50%) scale(${hovered ? 2.2 : 1})`,
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
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: "180px 180px",
      }} />

      {/* Page content */}
      <div style={{
        position: "relative", zIndex: 2,
        maxWidth: "1100px", margin: "0 auto", padding: "0 48px",
      }}>
        {/* Header */}
        <header className="hin" style={{
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
          <nav style={{ display: "flex", gap: "32px", paddingTop: "4px" }}>
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
            return (
              <div
                key={p.id}
                className="pr"
                onMouseEnter={() => setHovered(p.id)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Main row */}
                <div className="pr-main">
                  <span className="pnum" style={{ color: isHov ? p.accent : undefined }}>{p.num}</span>
                  <span className="ptitle" style={{ color: isHov ? p.accent : undefined }}>{p.title}</span>
                  <div className="pmeta">
                    <span className="pyear">{p.year}</span>
                    <div className="ptags">
                      {p.tags.map((tag) => (
                        <span key={tag} className="ptag" style={{
                          color: isHov ? `rgba(${rgb.r},${rgb.g},${rgb.b},0.55)` : undefined,
                        }}>{tag}</span>
                      ))}
                    </div>
                    <p className={`pdesc${isHov ? " vis" : ""}`}>{p.desc}</p>
                  </div>
                </div>

                {/* Expandable sub-items */}
                {p.subitems && (
                  <div className={`subitems-wrap${isHov ? " open" : ""}`}>
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
                  </div>
                )}
              </div>
            );
          })}
        </main>

        {/* Footer */}
        <footer className="fin" style={{
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
                color: "rgba(240,237,230,0.2)", cursor: "none",
                fontFamily: "'DM Mono', monospace",
              }}>{l}</span>
            ))}
          </div>
        </footer>
      </div>
    </div>
  );
}
