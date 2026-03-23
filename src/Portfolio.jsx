import { useState, useEffect, useRef } from "react";

// SHA-256 hash of the access password (plaintext never stored in source)
const PASSWORD_HASH = "a9e5996f0f6ae9d148e5e2b9624c18ce7f7096532d990bf14c96210531c4dfce";

async function sha256(message) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(message));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

const experiences = [
  {
    id: 1, num: "01", title: "FORM",
    tags: ["Web Team Lead", "Full Stack"], year: "2021–Present",
    desc: "Led the web team through a retention turnaround — churn dropped from 13% to 6% in a single year. Shipped Streaks from hackathon to A/B production, built the Web-Driven UI framework, and migrated infrastructure off AWS OpsWorks with zero downtime.",
    accent: "#E6FF00", bg: "#0a1a00", visual: "terrain",
    siteUrl: "https://www.formswim.com",
    workNote: "Churn cut in half. Streaks shipped in 4 weeks. Zero downtime on the migration.",
    images: [
      { src: "https://www.formswim.com/cdn/shop/files/SS2_PDPHero_Desktop.jpg", caption: "FORM Smart Swim 2 — real-time metrics in the goggle display" },
      { src: "https://www.formswim.com/cdn/shop/files/SS2_Lifestyle_Pool.jpg", caption: "In-pool session with Streaks active" },
      { src: "https://www.formswim.com/cdn/shop/files/WebDrivenUI_Dashboard.jpg", caption: "Web-Driven UI — shipped without a mobile app release" },
    ],
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
    projects: [
      {
        id: "onboarding-redesign",
        label: "Onboarding Redesign",
        tags: ["Next.js", "Feature Flags", "UX"],
        year: "2024",
        role: "Lead Engineer",
        desc: "Rebuilt the activation flow from swim survey to first in-goggle tutorial. +1\u20132pp conversion impact.",
        detail: {
          problem: "Trial-to-paid conversion was sitting at 69%. The core issue wasn\u2019t the product \u2014 it was that users weren\u2019t reaching it. New subscribers were completing account setup but not finishing device pairing, not discovering HeadCoach, and not completing a first coached swim. Users who swam once churned at 40%. Users who swam five times churned at 9%. The activation flow was leaving most new users on the wrong side of that curve.",
          process: "Mapped every step from account creation to first in-goggle workout and identified the specific drop-off points: a swim survey disconnected from any visible outcome, a device pairing flow with too little guidance, and a first workout tutorial that wasn\u2019t surfaced to new users at all. Redesigned the swim survey to visibly feed into HeadCoach plan personalisation so users understood why it mattered. Built and shipped the First Swim Tutorial \u2014 an in-goggle guided experience triggered on first device connection. Coordinated delivery across web, mobile, and firmware teams across four sprint tickets. Used LaunchDarkly for staged rollout and Amplitude to instrument the funnel at each step.",
          outcome: "The group with the First Swim Tutorial showed 60.5% workout swim retention vs. 55.6% without it \u2014 a +4.9pp lift at the highest-risk moment in the lifecycle. The redesigned activation flow contributed 1\u20132pp of the overall trial-to-paid conversion improvement, raising conversion from 69% to 72% as part of a coordinated set of engineering initiatives. Better-activated users went on to complete more workouts, compounding downstream retention across cohorts.",
          metrics: [
            { label: "WO swim retention (w/ tutorial)", value: "60.5%" },
            { label: "WO swim retention (control)", value: "55.6%" },
            { label: "Lift", value: "+4.9pp" },
            { label: "Conversion contribution", value: "+1\u20132pp" },
          ],
          stack: ["Next.js", "LaunchDarkly", "Amplitude", "React", "Figma"],
        },
      },
      {
        id: "streaks",
        label: "Streaks",
        tags: ["React", "Push Notifications", "A/B Testing"],
        year: "2024",
        role: "Lead Engineer",
        desc: "Hackathon concept shipped to A/B production. Statistically significant \u221212% churn reduction.",
        detail: {
          problem: "Users who were swimming regularly were still churning \u2014 not because the product had failed them, but because nothing in the experience acknowledged their consistency. Each swim ended without carrying anything forward. There was no signal that made the habit feel visible or worth protecting, and no nudge timed to the moment when a streak was at risk of breaking.",
          process: "Built initially as a hackathon project, which was intentional \u2014 the goal was to validate the concept fast before investing in a polished implementation. Wrote the streak calculation logic against the Redshift data warehouse: queried weekly swim activity per user, calculated consecutive active weeks, and classified each user\u2019s streak state (new streak, extended streak, broken streak, at risk). Built a Node.js script to generate personalised push notification copy based on streak state and batch-send to variant B users at scale, using windowed async calls to respect rate limits. Assigned variants deterministically using SHA256 hash of userId + experiment key \u2014 no flag service required, reproducible and auditable. Ran as a 50/50 split against a control group.",
          outcome: "Users exposed to streaks messaging showed a statistically significant 12% reduction in churn rate. The result held up to significance checks and the feature graduated to a permanent part of FORM\u2019s engagement layer. It\u2019s a concrete example of a low-cost, high-signal intervention: no new UI, no infrastructure spend \u2014 just making the user\u2019s own behaviour visible at the right moment. Contributed to the broader \u22121.4pp absolute churn reduction (7.2% \u2192 5.8%) alongside the other engagement and lifecycle initiatives.",
          metrics: [
            { label: "Churn reduction", value: "\u221212%" },
            { label: "Statistical sig.", value: "\u2713" },
            { label: "Split", value: "50 / 50 A/B" },
            { label: "Time to production", value: "Hackathon \u2192 weeks" },
          ],
          stack: ["Node.js", "Redshift", "MySQL", "Push Notifications", "SHA256 variant assignment"],
        },
      },
      {
        id: "web-driven-ui",
        label: "Web-Driven UI",
        tags: ["React Native", "Architecture", "Mobile"],
        year: "2023",
        role: "Lead Engineer",
        desc: "Eliminated the mobile release cycle as a bottleneck. Unlocked mobile A/B testing at web speed.",
        detail: {
          problem: "Every change to the FORM mobile app UI required a full native release \u2014 App Store review, approval, staged rollout \u2014 which took days to weeks per change. This made A/B testing on mobile practically impossible and meant the team couldn\u2019t respond to data quickly. The experimentation work that would eventually drive +3pp conversion and \u221219% churn had a hard dependency on solving this first. Without it, every experiment was a slow, expensive bet.",
          process: "Researched server-driven UI patterns and evaluated approaches: pure WebView rendering, React Native Web, and a hybrid model where key surfaces pull their layout and content from a backend response at runtime. Led the technical scoping, drove alignment with the mobile team on the integration contract between web and native layers, and documented the architecture for handoff. The implementation decoupled UI rendering from the native binary \u2014 changes to instrumented surfaces could now be deployed and toggled at web speed, with no App Store submission required.",
          outcome: "Mobile release cycle dependency was eliminated for the surfaces in scope. The team could ship, test, and iterate on mobile UI at the same cadence as web \u2014 which meant A/B tests that previously took weeks to run could now turn around in days. This was a direct architectural prerequisite for the experimentation work that contributed 0.5\u20131pp to trial-to-paid conversion. It also changed how the team thought about mobile development: web became the fast path for iterating on product surfaces, native became the stable foundation underneath.",
          metrics: [
            { label: "Release dependency", value: "Eliminated" },
            { label: "Iteration speed", value: "Weeks \u2192 Days" },
            { label: "Unlocked", value: "Mobile A/B testing" },
            { label: "Conversion impact", value: "Foundation for +3pp" },
          ],
          stack: ["React Native", "Web", "Node.js", "Server-Driven UI", "Architecture"],
        },
      },
      {
        id: "subscriptions-infrastructure",
        label: "Subscriptions Infrastructure",
        tags: ["Node.js", "Stripe", "Google Play", "App Store"],
        year: "2021\u20132023",
        role: "Lead Engineer",
        desc: "Prepaid, Try Before You Buy, variable trials \u2014 built for flexibility. Reduced involuntary churn.",
        detail: {
          problem: "FORM\u2019s subscription backend was built for a single model: monthly or annual, billed immediately on purchase. The business needed to test acquisition offers that didn\u2019t fit that shape \u2014 a 30-day Try Before You Buy, prepaid plans, and variable trial lengths tied to hardware bundles. None of these could be supported without significant rework. At the same time, involuntary churn from payment failures and missed renewals was a quiet but steady drag on retention that wasn\u2019t being actively recovered.",
          process: "Built and extended the subscription backend across all three platforms: Google Play (receipt verification, RTDN webhook handling for the full subscription lifecycle \u2014 renewals, cancellations, account hold, grace periods, pauses), App Store (server-to-server notifications, restore flows), and Stripe. Designed a source-agnostic subscription state model so that Apple, Google, and Stripe subscriptions all resolved through the same access-check path \u2014 no platform-specific branching in the core entitlement logic. Implemented the Try Before You Buy flow using ReCharge\u2019s charge_delay mechanism, coordinating with the MAF system for checkout. Added grace period handling and renewal recovery to reduce payment-failure churn.",
          outcome: "FORM could launch new subscription offers \u2014 TBYB, prepaid, campaign-specific trial lengths \u2014 without engineering rework for each one. The infrastructure absorbed the Stripe migration without requiring changes to the entitlement layer. Involuntary churn from payment failures dropped as grace period and account hold handling caught renewals that previously fell through. The \u22120.1pp churn contribution from infrastructure improvements represents a small but structurally important floor: fixing the leaks that no engagement feature can recover.",
          metrics: [
            { label: "Platforms unified", value: "3" },
            { label: "Offers unlocked", value: "TBYB \u00b7 Prepaid \u00b7 Variable trials" },
            { label: "Involuntary churn", value: "Reduced" },
            { label: "Churn contribution", value: "\u22120.1pp" },
          ],
          stack: ["Node.js", "TypeScript", "Stripe", "Google Play API", "App Store", "ReCharge"],
        },
      },
    ],
  },
  {
    id: 2, num: "02", title: "Sea Around Us",
    tags: ["Full Stack Dev", "PostgreSQL", "AWS"], year: "2015–2020",
    desc: "Stepped in as Full Stack Developer when the previous dev left mid-transition. Rebuilt the data pipeline, introduced PostGIS spatial dimensions, deployed via AWS and Jenkins, and led a 3-week training in the Philippines. Co-authored 6 peer-reviewed journal articles.",
    accent: "#00C2FF", bg: "#000d1a", visual: "dots",
    siteUrl: "https://www.seaaroundus.org",
    workNote: "Spatial data at the scale of the world's oceans. 6 papers. One pipeline rebuilt mid-flight.",
    images: [
      { src: "https://www.seaaroundus.org/wp-content/uploads/2019/01/sau-social-2.jpg", caption: "Global catch allocation — 180,000 half-degree ocean cells" },
      { src: "https://www.seaaroundus.org/wp-content/uploads/2015/12/sea-around-us-map.jpg", caption: "PostGIS spatial layer — new geographic dimensions" },
      { src: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=1600", caption: "Manila workshop — 3 weeks of hands-on data pipeline training" },
    ],
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
    siteUrl: null,
    workNote: "Instant. Compostable. Unapologetically Asian. Built for the gap nobody else was filling.",
    images: [
      { src: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=1600", caption: "Compostable packaging — no plastic, no compromise" },
      { src: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=1600", caption: "Instant dried Asian camping meals" },
      { src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600", caption: "Vancouver and Ottawa — outdoor market distribution" },
    ],
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

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function ScrambleTitle({ text, active, className, style }) {
  const [display, setDisplay] = useState(text);
  const timerRef = useRef(null);
  const activeRef = useRef(active);
  const textRef = useRef(text);

  useEffect(() => { activeRef.current = active; }, [active]);
  useEffect(() => { textRef.current = text; }, [text]);

  useEffect(() => {
    clearInterval(timerRef.current);
    if (!active) {
      setDisplay(text);
      return;
    }
    const start = Date.now();
    const duration = 550;
    timerRef.current = setInterval(() => {
      const progress = Math.min((Date.now() - start) / duration, 1);
      const resolved = Math.floor(progress * text.length);
      if (progress >= 1) {
        setDisplay(text);
        clearInterval(timerRef.current);
        return;
      }
      setDisplay(
        text.split("").map((ch, i) => {
          if (i < resolved || ch === " " || ch === "-") return ch;
          const rand = SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          return ch === ch.toUpperCase() ? rand : rand.toLowerCase();
        }).join("")
      );
    }, 55);
    return () => clearInterval(timerRef.current);
  }, [active, text]);

  return <span className={className} style={style}>{display}</span>;
}

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
        color: `rgba(${rgb.r},${rgb.g},${rgb.b},0.6)`, textAlign: "left",
      }}>
        <TypewriterLine text={sub.label} speed={labelSpeed} delay={staggerDelay} onDone={() => setLabelDone(true)} />
      </span>
      <span style={{ fontSize: "10px", color: "rgba(240,237,230,0.33)", lineHeight: 1.7 }}>
        {/* Only mount once the label column is done — cursor moves left→right into this column */}
        {labelDone && <TypewriterLine text={`→ ${sub.detail}`} speed={detailSpeed} delay={0} onDone={onDone} />}
      </span>
    </div>
  );
}

// Full entry row + expandable section. Trailing prompt waits for ALL detail
// columns to finish typing (not just the labels).
function ProjectRow({ project, accent, isActive, onClick, blink }) {
  const [hov, setHov] = useState(false);
  const rgb = hexRgb(accent);
  const lit = hov || isActive;

  return (
    <div
      className="mc-project-row"
      role="button"
      tabIndex={0}
      aria-expanded={isActive}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); e.stopPropagation(); onClick(); }
        if (e.key === "Escape" && isActive) { e.stopPropagation(); onClick(); }
      }}
    >
      <div style={{
        display: "flex", alignItems: "baseline", gap: "10px",
        paddingLeft: lit ? "6px" : "0px",
        transition: "padding-left 0.2s ease",
      }}>
        <span style={{
          fontSize: "9px",
          color: `rgba(${rgb.r},${rgb.g},${rgb.b},${lit ? 0.8 : 0.6})`,
          transition: "color 0.2s",
          flexShrink: 0,
        }}>▶</span>
        <span style={{
          fontSize: "10px",
          color: `rgba(240,237,230,${lit ? 0.9 : 0.65})`,
          letterSpacing: "0.04em",
          transition: "color 0.2s",
          flex: 1,
        }}>{project.label}</span>
        <span style={{ fontSize: "9px", color: "rgba(240,237,230,0.18)", letterSpacing: "0.1em", flexShrink: 0 }}>
          {project.year}
        </span>
        <div style={{ display: "flex", gap: "6px", flexShrink: 0 }}>
          {project.tags.map((tag) => (
            <span key={tag} style={{
              fontSize: "8px", letterSpacing: "0.12em", textTransform: "uppercase",
              color: `rgba(${rgb.r},${rgb.g},${rgb.b},0.28)`,
            }}>{tag}</span>
          ))}
        </div>
      </div>
      {!isActive && (
        <div style={{
          fontSize: "9px", color: "rgba(240,237,230,0.25)",
          marginTop: "4px", paddingLeft: "19px",
          letterSpacing: "0.03em", lineHeight: 1.5,
        }}>
          {project.desc}
        </div>
      )}
    </div>
  );
}

function ProjectDetail({ project, accent, blink }) {
  const rgb = hexRgb(accent);
  const d = project.detail;

  return (
    <div className="mc-project-detail" style={{ borderLeft: `1px solid rgba(${rgb.r},${rgb.g},${rgb.b},0.12)` }}>
      {/* Header comment */}
      <div style={{
        fontSize: "9px", fontStyle: "italic",
        color: `rgba(${rgb.r},${rgb.g},${rgb.b},0.35)`,
        letterSpacing: "0.06em", marginBottom: "20px",
      }}>
        // {project.id}
      </div>

      {/* 3-column grid */}
      <div className="mc-detail-grid">
        {[
          { heading: "THE PROBLEM", text: d.problem },
          { heading: "THE PROCESS", text: d.process },
          { heading: "THE OUTCOME", text: d.outcome },
        ].map(({ heading, text }) => (
          <div key={heading}>
            <div style={{
              fontSize: "8px", letterSpacing: "0.16em", textTransform: "uppercase",
              color: `rgba(${rgb.r},${rgb.g},${rgb.b},0.5)`, marginBottom: "8px",
            }}>{heading}</div>
            <div style={{
              fontSize: "9px", color: "rgba(240,237,230,0.38)",
              lineHeight: 1.85, fontWeight: 300,
            }}>{text}</div>
          </div>
        ))}
      </div>

      {/* Metrics row */}
      {d.metrics?.length > 0 && (
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "20px", marginBottom: "20px" }}>
          {d.metrics.map((m) => (
            <div key={m.label} className="mc-metric" style={{ border: `1px solid rgba(${rgb.r},${rgb.g},${rgb.b},0.15)` }}>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif", fontSize: "22px",
                fontWeight: 600, fontStyle: "italic",
                color: `rgba(${rgb.r},${rgb.g},${rgb.b},0.75)`,
                lineHeight: 1, letterSpacing: "-0.02em",
              }}>{m.value}</div>
              <div style={{
                fontSize: "8px", letterSpacing: "0.14em", textTransform: "uppercase",
                color: "rgba(240,237,230,0.25)", marginTop: "6px",
              }}>{m.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Stack row */}
      {d.stack?.length > 0 && (
        <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap", marginBottom: "14px" }}>
          <span style={{ fontSize: "8px", letterSpacing: "0.13em", color: "rgba(240,237,230,0.18)", textTransform: "uppercase" }}>stack:</span>
          {d.stack.map((s) => (
            <span key={s} style={{
              fontSize: "8px", letterSpacing: "0.1em", textTransform: "uppercase",
              color: `rgba(${rgb.r},${rgb.g},${rgb.b},0.4)`,
              border: `1px solid rgba(${rgb.r},${rgb.g},${rgb.b},0.15)`,
              padding: "3px 7px",
            }}>{s}</span>
          ))}
        </div>
      )}

      {/* Closing prompt */}
      <div style={{ fontSize: "9px", color: `rgba(${rgb.r},${rgb.g},${rgb.b},0.38)` }}>
        $<span style={{ opacity: blink ? 1 : 0, transition: "opacity 0.05s", marginLeft: "4px" }}>▮</span>
      </div>
    </div>
  );
}

function TerminalEntry({ p, isOpen, onToggle, isHovered, onHoverEnter, onHoverLeave, blink }) {
  const [allDone, setAllDone] = useState(false);
  const [openProject, setOpenProject] = useState(null);
  const [cdTypingDone, setCdTypingDone] = useState(false);
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
      setOpenProject(null);
      setCdTypingDone(false);
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
      role="button"
      tabIndex={0}
      aria-expanded={isOpen}
      onMouseEnter={onHoverEnter}
      onMouseLeave={onHoverLeave}
      onClick={onToggle}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onToggle(); } }}
    >
      {/* ── Main row ── */}
      <div className="mc-row" style={!isOpen && p.workNote ? { paddingBottom: "8px" } : undefined}>
        <span style={{ fontSize: "11px", color: isHovered || isOpen ? p.accent : "rgba(240,237,230,0.18)", transition: "color 0.22s", flexShrink: 0, width: "14px", lineHeight: 1 }}>
          ▶
        </span>
        <span style={{ fontSize: "9px", color: isHovered ? p.accent : "rgba(240,237,230,0.17)", letterSpacing: "0.06em", flexShrink: 0, transition: "color 0.22s", lineHeight: 1 }}>{p.num}</span>
        <h2 className="mc-title" style={{ flex: 1, color: isHovered ? p.accent : "rgba(240,237,230,0.82)" }}>
          <ScrambleTitle text={p.title} active={isHovered} />
          {(isHovered || isOpen) && (
            <span aria-hidden="true" style={{ opacity: blink ? 1 : 0, fontSize: "0.55em", verticalAlign: "middle", marginLeft: "5px", transition: "opacity 0.05s" }}>▮</span>
          )}
        </h2>
        <div className="mc-meta" style={{ textAlign: "right", flexShrink: 0 }}>
          <div className="mc-year" style={{ fontSize: "10px", color: "rgba(240,237,230,0.28)", letterSpacing: "0.08em", marginBottom: "5px" }}>{p.year}</div>
          <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end", flexWrap: "wrap" }}>
            {p.tags.map((tag) => (
              <span key={tag} style={{ fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: `rgba(${rgb.r},${rgb.g},${rgb.b},${isHovered ? 0.65 : 0.28})`, transition: "color 0.22s" }}>{tag}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Collapsed teaser ── */}
      {!isOpen && p.workNote && (
        <div className="mc-teaser">{p.workNote}</div>
      )}

      {/* ── Expanded section ── */}
      {isOpen && (
        <div className="mc-sub">
          {/* Desc fades in immediately — too long to type comfortably */}
          <div style={{ fontSize: "10px", color: "rgba(240,237,230,0.36)", lineHeight: 1.8, maxWidth: "580px", animation: "mcIn 0.3s cubic-bezier(0.16,1,0.3,1) both" }}>
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

          {/* ── Project drill-down (only for entries with projects) ── */}
          {p.projects?.length > 0 && allDone && (
            <div className="mc-project-list" style={{ animation: "mcIn 0.3s cubic-bezier(0.16,1,0.3,1) both" }}>
              <div style={{
                fontSize: "9px", letterSpacing: "0.1em",
                color: `rgba(${rgb.r},${rgb.g},${rgb.b},0.38)`,
                marginTop: "20px", marginBottom: "8px",
              }}>$ ls projects/</div>

              {p.projects.map((proj) => (
                <div key={proj.id}>
                  <ProjectRow
                    project={proj}
                    accent={p.accent}
                    isActive={openProject === proj.id}
                    onClick={() => {
                      if (openProject === proj.id) {
                        setOpenProject(null);
                        setCdTypingDone(false);
                      } else {
                        setOpenProject(proj.id);
                        setCdTypingDone(false);
                      }
                    }}
                    blink={blink}
                  />

                  {openProject === proj.id && (
                    <div className="mc-cmd-line" style={{
                      fontSize: "9px",
                      color: `rgba(${rgb.r},${rgb.g},${rgb.b},0.55)`,
                      marginTop: "6px", marginBottom: "4px", paddingLeft: "19px",
                    }}>
                      {!cdTypingDone ? (
                        <TypewriterLine
                          text={`$ cd ${p.title.toLowerCase()}/${proj.id}`}
                          speed={28}
                          delay={80}
                          onDone={() => setCdTypingDone(true)}
                        />
                      ) : (
                        <span>{`$ cd ${p.title.toLowerCase()}/${proj.id}`}</span>
                      )}
                    </div>
                  )}

                  {openProject === proj.id && cdTypingDone && (
                    <div className="mc-project-detail-wrapper">
                      <ProjectDetail project={proj} accent={p.accent} blink={blink} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

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

export default function Portfolio() {
  const [expanded, setExpanded] = useState(null);
  const [hovered, setHovered] = useState(null);
  const [blink, setBlink] = useState(true);
  const [nameDone, setNameDone] = useState(false);
  const [subtitleDone, setSubtitleDone] = useState(false);
  const [stackDone, setStackDone] = useState(false);

  // Password gate
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem("pw_ok") === "1");
  const [pwInput, setPwInput] = useState("");
  const [pwError, setPwError] = useState(false);
  const [pwShake, setPwShake] = useState(false);
  const [termPhase, setTermPhase] = useState(0);
  const pwInputRef = useRef(null);

  async function handleUnlock(e) {
    e.preventDefault();
    const hash = await sha256(pwInput);
    if (hash === PASSWORD_HASH) {
      sessionStorage.setItem("pw_ok", "1");
      setUnlocked(true);
    } else {
      setPwError(true);
      setPwShake(true);
      setPwInput("");
      setTimeout(() => setPwShake(false), 500);
    }
  }

  const hovEntry = experiences.find((p) => p.id === hovered);
  const bgColor = hovEntry ? hovEntry.bg : "#060808";

  useEffect(() => {
    const interval = setInterval(() => setBlink((b) => !b), 530);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (unlocked) return;
    const t1 = setTimeout(() => setTermPhase(1), 200);
    const t2 = setTimeout(() => setTermPhase(2), 600);
    const t3 = setTimeout(() => setTermPhase(3), 950);
    const t4 = setTimeout(() => setTermPhase(4), 1250);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [unlocked]);

  if (!unlocked) return (
    <div
      style={{
        minHeight: "100vh", backgroundColor: "#060808",
        fontFamily: "'DM Mono', monospace",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "default",
      }}
      onClick={() => pwInputRef.current?.focus()}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { margin: 0; }
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20%,60% { transform: translateX(-8px); }
          40%,80% { transform: translateX(8px); }
        }
        @keyframes termIn {
          from { opacity: 0; transform: translateY(3px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .tl { animation: termIn 0.18s ease forwards; }
      `}</style>
      <div style={{ width: "min(420px, 88vw)", padding: "0 20px" }}>
        <div style={{ fontSize: "13px", letterSpacing: "0.07em", lineHeight: "1.95" }}>
          {termPhase >= 1 && (
            <div className="tl" style={{ color: "rgba(240,237,230,0.5)" }}>
              <span style={{ color: "rgba(240,237,230,0.2)", marginRight: "10px" }}>$</span>
              ssh gordon@gordontsui.ca
            </div>
          )}
          {termPhase >= 2 && (
            <div className="tl" style={{ color: "rgba(240,237,230,0.28)" }}>
              Connected to gordontsui.ca.
            </div>
          )}
          {termPhase >= 3 && (
            <div className="tl" style={{ color: "rgba(240,237,230,0.28)" }}>
              Authentication required.
            </div>
          )}
          {pwError && (
            <div className="tl" style={{ color: "rgba(255,65,65,0.8)" }}>
              Access denied.
            </div>
          )}
          {termPhase >= 4 && (
            <form
              onSubmit={handleUnlock}
              style={{ display: "flex", alignItems: "center", animation: pwShake ? "shake 0.45s cubic-bezier(0.36,0.07,0.19,0.97)" : "none" }}
            >
              <span style={{ color: "rgba(240,237,230,0.28)", marginRight: "10px", userSelect: "none" }}>
                Password:
              </span>
              <span
                style={{ position: "relative", display: "inline-flex", alignItems: "center" }}
                onClick={(e) => { e.stopPropagation(); pwInputRef.current?.focus(); }}
              >
                <span style={{ color: "rgba(240,237,230,0.65)", letterSpacing: "0.18em", fontSize: "11px" }}>
                  {"•".repeat(pwInput.length)}
                </span>
                <span style={{
                  display: "inline-block", width: "7px", height: "13px", marginLeft: "1px",
                  backgroundColor: blink ? "rgba(240,237,230,0.6)" : "transparent",
                  verticalAlign: "middle",
                }} />
                <input
                  ref={pwInputRef}
                  autoFocus
                  type="password"
                  autoComplete="current-password"
                  value={pwInput}
                  onChange={(e) => { setPwInput(e.target.value); setPwError(false); }}
                  style={{
                    position: "absolute", opacity: 0,
                    left: 0, top: 0, width: "100%", height: "100%",
                    border: "none", outline: "none", background: "transparent", cursor: "default",
                  }}
                />
              </span>
            </form>
          )}
        </div>
      </div>
    </div>
  );

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
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { margin: 0; }
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
        .mc-meta { text-align: right; flex-shrink: 0; }
        .mc-teaser {
          font-size: 8px;
          color: rgba(240,237,230,0.1);
          letter-spacing: 0.06em;
          padding: 0 0 18px 32px;
          font-style: italic;
          line-height: 1.6;
          transition: color 0.22s;
        }
        .mc-entry:hover .mc-teaser { color: rgba(240,237,230,0.22); }
        @keyframes mcIn {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .mc-entry:focus-visible { outline: 1px solid rgba(240,237,230,0.4); outline-offset: -2px; }
        .mc-project-row {
          cursor: pointer;
          padding: 10px 0;
          border-top: 1px solid rgba(240,237,230,0.05);
        }
        .mc-project-row:focus-visible {
          outline: 1px solid rgba(240,237,230,0.3);
          outline-offset: 2px;
        }
        .mc-cmd-line {
          animation: mcIn 0.15s ease both;
        }
        .mc-project-detail-wrapper {
          overflow: hidden;
          animation: mcDetailOpen 0.55s cubic-bezier(0.16,1,0.3,1) forwards;
        }
        .mc-project-detail {
          margin-left: 19px;
          padding: 14px 0 14px 16px;
        }
        .mc-detail-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 28px;
          margin-bottom: 24px;
        }
        .mc-metric {
          padding: 12px 16px;
        }
        @keyframes mcDetailOpen {
          from { max-height: 0; opacity: 0; }
          to { max-height: 800px; opacity: 1; }
        }
        @keyframes headerIn {
          from { opacity: 0; transform: translateY(-5px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes entryIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .sr-skip {
          position: absolute; left: -9999px; top: auto; width: 1px; height: 1px; overflow: hidden;
        }
        .sr-skip:focus-visible {
          position: fixed; top: 16px; left: 16px; width: auto; height: auto;
          padding: 8px 16px; background: #060808; border: 1px solid rgba(240,237,230,0.4);
          color: rgba(240,237,230,0.88); font-size: 11px; letter-spacing: 0.08em;
          text-decoration: none; z-index: 999;
        }
        @media (max-width: 768px) {
          .mc-row {
            flex-wrap: wrap;
            align-items: flex-start;
            gap: 10px;
            padding: 20px 0;
          }
          .mc-title { font-size: clamp(30px, 9vw, 52px) !important; }
          .mc-entry:hover .mc-row { padding-left: 0; }
          .mc-sub { margin-left: 0; padding-left: 16px; }
          .mc-meta { display: flex; flex-direction: row; align-items: baseline; gap: 10px; width: 100%; text-align: left !important; }
          .mc-meta > div:last-child { justify-content: flex-start !important; }
          .mc-year { margin-bottom: 0 !important; }
          .mc-teaser { padding-left: 0; }
          .mc-detail-grid { grid-template-columns: 1fr; gap: 16px; }
          .mc-project-detail { margin-left: 0; padding-left: 12px; }
          .bg-canvas { display: none !important; }
        }
      `}</style>

      <a className="sr-skip" href="#main-content">Skip to content</a>

      {/* Background canvas — very subtle, just a hint */}
      <div className="bg-canvas" aria-hidden="true" style={{ position: "fixed", inset: 0, opacity: hovEntry ? 0.11 : 0, transition: "opacity 0.6s ease", pointerEvents: "none", zIndex: 0 }}>
        {hovEntry && <ProjectVisual visual={hovEntry.visual} color={hovEntry.accent} />}
      </div>
      <div style={{ position: "fixed", inset: 0, backgroundImage: GRAIN_URL, backgroundSize: "180px", opacity: 0.04, zIndex: 1, pointerEvents: "none" }} />

      <main id="main-content" style={{ position: "relative", zIndex: 2, maxWidth: "880px", margin: "0 auto", padding: "0 48px" }}>

        {/* Terminal header */}
        <div style={{ paddingTop: "72px", paddingBottom: "52px" }}>
          {/* Prompt — fades in immediately as terminal chrome */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "24px", animation: "headerIn 0.35s ease both" }}>
            <span style={{ fontSize: "10px", color: "rgba(240,237,230,0.18)" }}>gordon@tsui</span>
            <span style={{ fontSize: "10px", color: "rgba(240,237,230,0.08)" }}>:</span>
            <span style={{ fontSize: "10px", color: hovEntry ? hovEntry.accent : "rgba(240,237,230,0.32)", transition: "color 0.4s ease" }}>~/experience</span>
            <span style={{ fontSize: "10px", color: "rgba(240,237,230,0.14)" }}>$</span>
            <span style={{ fontSize: "10px", color: "rgba(240,237,230,0.45)" }}>ls</span>
          </div>

          {/* Large name — types in first, highest priority */}
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(56px, 8.5vw, 104px)", fontStyle: "italic", fontWeight: 300, color: hovEntry ? hovEntry.accent : "rgba(240,237,230,0.88)", lineHeight: 0.95, letterSpacing: "-0.03em", transition: "color 0.55s ease", minHeight: "1em" }}>
            <TypewriterLine text="Gordon Tsui" speed={22} delay={80} onDone={() => setNameDone(true)} />
          </h1>
          <div style={{ marginTop: "14px", display: "flex", flexDirection: "column", gap: "10px" }}>
            {/* Subtitle — starts once name finishes */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px", minHeight: "1.4em" }}>
              <span style={{ fontSize: "11px", color: "rgba(240,237,230,0.35)", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                {nameDone && (
                  <TypewriterLine text="Web Team Lead · Full-Stack Engineer · Vancouver, BC" speed={11} delay={0} onDone={() => setSubtitleDone(true)} />
                )}
              </span>
              {/* Cursor stays visible between subtitle and stack typing */}
              {nameDone && !stackDone && (
                <span aria-hidden="true" style={{ opacity: blink ? 1 : 0, color: "rgba(240,237,230,0.4)", fontSize: "12px", transition: "opacity 0.05s", lineHeight: 1 }}>▮</span>
              )}
            </div>
            {/* Tech stack — starts once subtitle finishes */}
            <div style={{ fontSize: "11px", color: "rgba(240,237,230,0.28)", letterSpacing: "0.18em", textTransform: "uppercase", minHeight: "1.4em" }}>
              {subtitleDone && (
                <TypewriterLine text="Node.js · React · PostgreSQL · AWS · Jenkins · Shopify" speed={8} delay={0} onDone={() => setStackDone(true)} />
              )}
            </div>
            {/* Comment — fades in once stack finishes */}
            <div style={{ fontSize: "10px", color: "rgba(240,237,230,0.30)", letterSpacing: "0.04em", opacity: stackDone ? 1 : 0, transform: stackDone ? "none" : "translateY(5px)", transition: "opacity 0.45s ease, transform 0.45s ease" }}>// Full-stack engineer and team lead. Retention-focused product development, cloud infrastructure, and shipping velocity.</div>
          </div>
        </div>

        {/* Command line before list — fades in after header sequence */}
        <div style={{ fontSize: "9px", color: "rgba(240,237,230,0.1)", letterSpacing: "0.1em", marginBottom: "6px", opacity: stackDone ? 1 : 0, transition: "opacity 0.3s ease 0.1s" }}>$ cat experience/*</div>

        {/* Entries — stagger in after name is typed */}
        <div>
          {experiences.map((p, i) => (
            <div
              key={p.id}
              style={{
                opacity: 0,
                animation: nameDone ? `entryIn 0.55s cubic-bezier(0.16,1,0.3,1) ${i * 65}ms both` : "none",
              }}
            >
              <TerminalEntry
                p={p}
                isOpen={expanded === p.id}
                onToggle={() => setExpanded(expanded === p.id ? null : p.id)}
                isHovered={hovered === p.id}
                onHoverEnter={() => setHovered(p.id)}
                onHoverLeave={() => setHovered(null)}
                blink={blink}
              />
            </div>
          ))}
        </div>

        {/* Footer */}
        <footer style={{ paddingTop: "64px", paddingBottom: "52px", borderTop: "1px solid rgba(240,237,230,0.05)", marginTop: "12px" }}>
          <div style={{ fontSize: "9px", color: "rgba(240,237,230,0.09)", letterSpacing: "0.08em", marginBottom: "16px" }}>$ echo $CONTACT</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "9px", color: "rgba(240,237,230,0.1)", letterSpacing: "0.1em" }}>{new Date().getFullYear()} — Vancouver, BC</span>
            <nav aria-label="Social links" style={{ display: "flex", gap: "24px" }}>
              {[
                { label: "GitHub",   href: "https://github.com/gtsui091", external: true },
                { label: "LinkedIn", href: "https://www.linkedin.com/in/gordontsui/", external: true },
                { label: "Email",    href: "mailto:tsui.gordon.9@gmail.com", external: false },
                { label: "Resume",   href: "#", external: false },
              ].map(({ label, href, external }) => (
                <a key={label} href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(240,237,230,0.28)", textDecoration: "none" }}
                  onMouseEnter={(e) => e.currentTarget.style.color = "rgba(240,237,230,0.7)"}
                  onMouseLeave={(e) => e.currentTarget.style.color = "rgba(240,237,230,0.28)"}
                >{label}</a>
              ))}
            </nav>
          </div>
        </footer>
      </main>
    </div>
  );
}
