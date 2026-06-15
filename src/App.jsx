import React, { useEffect, useRef, useState, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF } from "@react-three/drei";

/* ============================================================
   GOWTHAM B — ULTRA PORTFOLIO 2026
   Drop this in src/App.jsx and run:
     npm install three @react-three/fiber @react-three/drei
   ============================================================ */

/* ───── constants ───── */
const RESUME_URL = "https://drive.google.com/file/d/1vj1I6q04I_Om-QxgMgzbRx_Tzi9hEKRA/view?usp=drive_link";
const LINKEDIN_URL = "http://www.linkedin.com/in/gowtham-boothal-84b672266";
const EMAIL = "gowthamboothal22@gmail.com";
const PHONE = "+916379148128";
const PORTFOLIO = "gowtham.design";

const IMAGE_URLS = {
  profile: "https://i.postimg.cc/X7Q2tJRf/profile-jpg.jpg",
  standing: "https://i.postimg.cc/YqZF4Bgb/IMG-20250824-WA0072-jpg.jpg",
  sunset: "https://i.postimg.cc/BQ65LCzq/sunset-jpg.jpg",
  wipro: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Wipro_Primary_Logo_Color_RGB.svg",
  unacademy: "https://upload.wikimedia.org/wikipedia/commons/8/8c/Unacademy_Logo.png",
  booking: [
    "https://cdn.corenexis.com/f/yBWoTyHok8o.png",
    "https://cdn.corenexis.com/f/GYNLS0Io0RE.png",
    "https://cdn.corenexis.com/f/ezk42yI4NEU.png",
    "https://cdn.corenexis.com/f/Sp47GF6Zwk1.png",
  ],
  neithal: [
    "https://i.postimg.cc/NjWPHRrH/img-1.png",
    "https://i.postimg.cc/Gh4QxHRV/img-2.png",
    "https://i.postimg.cc/t4LmxFx0/img-3.png",
    "https://i.postimg.cc/HLXv4jwr/img-4.png",
    "https://i.postimg.cc/PqYVzNWr/img-5.png",
    "https://i.postimg.cc/QM1YkVQj/img-6.png"
  ],
  instagrocery: [
    "https://i.postimg.cc/sX9S3GWN/img-1.png",
    "https://i.postimg.cc/0jkSj5dR/img-2.png",
    "https://i.postimg.cc/brmttX3N/img-3.png",
    "https://i.postimg.cc/yxLZZqv6/img-4.png",
    "https://i.postimg.cc/prsFFNqr/img-5.png",
    "https://i.postimg.cc/1XvqqxJr/img-6.png",
  ],
  urban: [
    "https://i.postimg.cc/66bVqRSg/img-1.png",
    "https://i.postimg.cc/xjpG8HhQ/img-2.png",
    "https://i.postimg.cc/qBDcqnSJ/img-3.png",
    "https://i.postimg.cc/G3gPtYVw/img-4.png",
    "https://i.postimg.cc/QNYgC5w3/img-5.png",
    "https://i.postimg.cc/65DdLKBq/img-6.png",
    "https://i.postimg.cc/sDBYhxCp/img-7.png",
  ],
  graphicDesign: [
    "https://i.postimg.cc/W1HPcjDM/1-1.png",
    "https://i.postimg.cc/ht5qRgJJ/2-1.png",
    "https://i.postimg.cc/fRrhQZ3v/2-2.png",
    "https://i.postimg.cc/13jZ1PgJ/3-1.png",
    "https://i.postimg.cc/d1MPDBjL/4-1.png",
    "https://i.postimg.cc/kgpdP9Vw/4thwall-2-1.png",
    "https://i.postimg.cc/y8bzCBJQ/4thwall-3-1.png",
    "https://i.postimg.cc/nz8bMkGM/Annasie-01-1.png",
    "https://i.postimg.cc/SsW09MgP/Annasie-02-1.png",
    "https://i.postimg.cc/MHxCmpLd/Annasie-03-1.png",
    "https://i.postimg.cc/wvhKNmwV/Annasie-1-1.png",
    "https://i.postimg.cc/BbsrBnzm/Annasie-2-1.png",
    "https://i.postimg.cc/j2Kp4S1g/Annasie-3-1.png",
    "https://i.postimg.cc/8cD2mzYx/Children-s-Day-1.png",
    "https://i.postimg.cc/ryNXF50m/Next-Level-1.png",
    "https://i.postimg.cc/3rF5J24x/RC-1-1.png",
    "https://i.postimg.cc/bY9cN1Dd/RC-Poster-2-1.png",
    "https://i.postimg.cc/jdqVWCPD/RC-Poster-3-1.png",
    "https://i.postimg.cc/htjqYhGz/Mockup-1.png",
    "https://i.postimg.cc/cLHNz6JJ/Mockup-2.png",
    "https://i.postimg.cc/YC9wPjS4/Mockup-3.png",
    "https://i.postimg.cc/rwmLHzpm/Mockup-4.png",
  ],
  /* ─── PRODUCT DESIGN / URBAN GEAR images ─── */
  products: [
    { label: "Insulated Mug", img: "https://i.postimg.cc/X7Q2tJRf/profile-jpg.jpg", realImg: "Mug_package.png", thumb: "https://i.postimg.cc/htjqYhGz/Mockup-1.png" },
  ],
};

/* ─── HOW TO USE YOUR LOCAL PRODUCT IMAGES ──────────────────────
   1. Copy all uploaded product images into  src/assets/
   2. Then replace the fallback URLs below with:
        import mugImg from "./assets/Mug_package.png"; etc.
      or use dynamic import: new URL("./assets/Mug_package.png", import.meta.url).href
   For now they fall back gracefully to placeholder cards.
   ──────────────────────────────────────────────────────────── */
const PRODUCT_IMGS = {
  mug:         "/src/assets/Mug_package.png",
  flipper1:    "/src/assets/Flipper_Bottle_catalog.png",
  flipper2:    "/src/assets/Flipper_bottle_Blue_Package.png",
  lunch1:      "/src/assets/Lunch_box_package_2.png",
  lunch2:      "/src/assets/Lunck_BOX_package.png",
  speakerBlack:"/src/assets/Speaker_catalog_black.png",
  speakerWhite:"/src/assets/Speaker_catalog_White.png",
  bag:         "/src/assets/bag.png",
  bagCatalog:  "/src/assets/Bag_catalog.png",
  headphone:   "/src/assets/Headphone_catalog.png",
  bottle:      "/src/assets/bottle.jpg",
};

/* Projects */
const PROJECTS = [
  {
    id: "01", title: "Booking.com", type: "Payment Flow Optimization",
    desc: "Optimized travel booking screens to improve cost visibility, CTA clarity, and checkout confidence. Checkout completion lifted from 60% to 90%.",
    tags: ["Web UX", "Conversion UX", "Task Walkthrough"],
    accent: "#0071c2", accentRgb: "0,113,194",
    images: IMAGE_URLS.booking,
    figma: "https://www.figma.com/proto/cWyEeTr2NMsnmVWUXHNWC2/Projects?node-id=482-4342",
    problem: "Users abandoned checkout due to poor pricing visibility and unclear CTA hierarchy.",
    solution: "Persistent price summary panel + stronger visual hierarchy throughout payment journey.",
    impact: "Checkout completion rate lifted from 60 % → 90 %.",
  },
  {
    id: "02", title: "DOODH", type: "Milk Subscription App",
    desc: "End-to-end UX for a daily milk delivery platform — onboarding, subscription plans, schedule management, pause/resume, and transparent billing.",
    tags: ["Mobile App", "Design System", "Subscription UX"],
    accent: "#2f7d32", accentRgb: "47,125,50",
    images: [
      "https://i.postimg.cc/RhQtVxxV/img-1.png",
      "https://i.postimg.cc/7hy7kYdb/img-2.png",
      "https://i.postimg.cc/Gt1YChVd/img-3.png",
      "https://i.postimg.cc/WzPrvbCb/img-4.png",
      "https://i.postimg.cc/nrt7JcgH/img-5.png",
      "https://i.postimg.cc/PxDZ986R/img-6.png",
    ],
    figma: "#",
    problem: "Managing milk delivery schedules, pausing during holidays, and tracking payments was complicated in existing apps.",
    solution: "Designed clean onboarding, flexible subscription tiers, DhoodCoins rewards, and a one-tap pause/resume flow.",
    impact: "30+ screens covering all edge cases — a complete, trustworthy milk-delivery experience.",
  },
  {
    id: "03", title: "Neithal", type: "Seafood Delivery App",
    desc: "Tamil-inspired seafood delivery app focused on freshness trust, live order tracking, and post-order support.",
    tags: ["Mobile App", "Service UX", "Design System"],
    accent: "#ff8a00", accentRgb: "255,138,0",
    images: IMAGE_URLS.neithal,
    figma: "https://www.figma.com/design/cWyEeTr2NMsnmVWUXHNWC2/Projects?node-id=656-628",
    problem: "Users couldn't trust seafood freshness or delivery reliability when ordering online.",
    solution: "Built freshness indicators, delivery slot management, driver comms, and trust-building UI patterns.",
    impact: "Complete end-to-end seafood ordering experience shipped.",
  },
  {
    id: "04", title: "InstaGrocery", type: "Social Commerce Grocery App",
    desc: "Feed-style grocery discovery that collapses complex category hierarchies into intuitive social-media-like browsing.",
    tags: ["Social Commerce", "Mobile UX", "Product Discovery"],
    accent: "#ff304f", accentRgb: "255,48,79",
    images: IMAGE_URLS.instagrocery,
    figma: "https://www.figma.com/design/cWyEeTr2NMsnmVWUXHNWC2/Projects?node-id=489-8191",
    problem: "Deep 4-level category tree made grocery discovery slow and cognitively heavy.",
    solution: "Simplified to 2-level navigation + social feed-based product discovery.",
    impact: "Product discovery time cut from 22 s → 9 s.",
  },
  {
    id: "05", title: "Urban Company", type: "Checkout Redesign",
    desc: "Service checkout redesign that collapsed a multi-step flow into a single, confidence-building screen.",
    tags: ["Heuristic Evaluation", "Checkout UX", "Usability Testing"],
    accent: "#7c5cff", accentRgb: "124,92,255",
    images: IMAGE_URLS.urban,
    figma: "https://www.figma.com/design/cWyEeTr2NMsnmVWUXHNWC2/Projects?node-id=124-312",
    problem: "Multi-step checkout caused cognitive overload and high drop-off.",
    solution: "Merged shipping + payment into a unified checkout screen with clearer hierarchy.",
    impact: "Checkout completion time reduced by 35 %.",
  },
];

const SKILLS = [
  { cat: "Research", items: ["User Interviews", "Journey Mapping", "Persona Creation", "Card Sorting", "Usability Testing", "Heuristic Evaluation"] },
  { cat: "Design", items: ["Wireframing", "Prototyping", "Design Systems", "Interaction Design", "Accessibility (WCAG)", "Responsive Design"] },
  { cat: "Tools", items: ["Figma", "Adobe XD", "Photoshop", "Illustrator", "Miro", "Hotjar"] },
  { cat: "AI", items: ["ChatGPT", "Claude", "Midjourney", "Adobe Firefly", "Canva AI", "Cursor"] },
];

/* ╔══════════════════════════════════════════════════════╗
   ║  PARTICLE CANVAS  — hero background                 ║
   ╚══════════════════════════════════════════════════════╝ */
function ParticleCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let raf;
    const W = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    W();
    window.addEventListener("resize", W);

    const COUNT = 120;
    const pts = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.5 + 0.5,
    }));

    const COLORS = ["rgba(139,92,246,", "rgba(99,179,237,", "rgba(251,191,36,"];

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        const col = COLORS[i % COLORS.length];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = col + "0.7)";
        ctx.fill();
        pts.forEach((q, j) => {
          if (j <= i) return;
          const dx = p.x - q.x, dy = p.y - q.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = col + (0.08 * (1 - d / 110)) + ")";
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        });
      });
      raf = requestAnimationFrame(draw);
    }
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", W); };
  }, []);
  return <canvas ref={ref} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", opacity: 0.55 }} />;
}

/* ╔══════════════════════════════════════════════════════╗
   ║  3D PRODUCT VIEWER (pure canvas, no npm dep)        ║
   ╚══════════════════════════════════════════════════════╝ */
function Model({ path }) {
  const { scene } = useGLTF(path);

  return (
    <primitive
      object={scene}
      scale={1.5}
      position={[0, -1, 0]}
    />
  );
}

function Product3DViewer({ modelPath }) {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={2} />
        <directionalLight position={[5, 5, 5]} intensity={2} />

        <Model path={modelPath} />

        <OrbitControls
          enableZoom
          autoRotate
          autoRotateSpeed={2}
        />

        <Environment preset="city" />
      </Canvas>

      <p
        style={{
          textAlign: "center",
          marginTop: 8,
          fontSize: 12,
          color: "rgba(255,255,255,0.5)"
        }}
      >
        ↔ Drag to rotate
      </p>
    </div>
  );
}

/* ╔══════════════════════════════════════════════════════╗
   ║  SCROLL REVEAL WRAPPER                              ║
   ╚══════════════════════════════════════════════════════╝ */
function Reveal({ children, delay = 0, dir = "up" }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const translate = dir === "up" ? "translateY(36px)" : dir === "left" ? "translateX(-36px)" : "translateX(36px)";
  return (
    <div ref={ref} style={{ transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`, opacity: vis ? 1 : 0, transform: vis ? "none" : translate }}>
      {children}
    </div>
  );
}

/* ╔══════════════════════════════════════════════════════╗
   ║  IMAGE CAROUSEL                                     ║
   ╚══════════════════════════════════════════════════════╝ */
function ImageCarousel({ images, accent }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => { setIdx(0); }, [images]);
  useEffect(() => {
    const t = setInterval(() => setIdx(v => (v + 1) % images.length), 2200);
    return () => clearInterval(t);
  }, [images.length]);
  return (
    <div style={{ position: "relative", width: "100%", borderRadius: 20, overflow: "hidden", background: "#0a0b10", minHeight: 320 }}>
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 70% 30%, rgba(${accent ?? "139,92,246"},0.25), transparent 60%)` }} />
      <img
        src={images[idx]}
        alt="project"
        onError={e => e.currentTarget.src = "https://dummyimage.com/640x400/111/fff&text=Preview"}
        style={{ width: "100%", height: 320, objectFit: "contain", display: "block", transition: "opacity 0.4s", padding: 12 }}
      />
      <div style={{ position: "absolute", bottom: 12, left: 0, right: 0, display: "flex", gap: 6, justifyContent: "center" }}>
        {images.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)}
            style={{ width: i === idx ? 20 : 8, height: 8, borderRadius: 4, background: i === idx ? `#${accent ?? "8b5cf6"}` : "rgba(255,255,255,0.25)", border: "none", cursor: "pointer", padding: 0, transition: "width 0.3s" }} />
        ))}
      </div>
    </div>
  );
}

/* ╔══════════════════════════════════════════════════════╗
   ║  MAIN APP                                           ║
   ╚══════════════════════════════════════════════════════╝ */
export default function App() {
  const [activeProject, setActiveProject] = useState(PROJECTS[0]);
  const [posterPreview, setPosterPreview] = useState(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [navOpen, setNavOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState(0);
  const heroRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);

  /* Products for 3D viewer */
const PRODUCT_CARDS = [
  {
    label: "Insulated Mug",
    model: "/models/mug.glb",
    accent: "#c084fc",
    desc: "Premium Insulated Mug · Urban Gear"
  },
  {
    label: "Flipper Bottle",
    model: "/models/bottle.glb",
    accent: "#38bdf8",
    desc: "Tritan Sports Bottle · Urban Gear"
  },
  {
    label: "Meal Pro",
    model: "/models/mealpro.glb",
    accent: "#fbbf24",
    desc: "Lunch Box with Bottle · Urban Gear"
  },
  {
    label: "Tango Speaker",
    model: "/models/speaker.glb",
    accent: "#34d399",
    desc: "BT Speaker · Urban Gear"
  }
];;

  useEffect(() => {
    const onMouse = (e) => setMouse({ x: e.clientX, y: e.clientY });
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("mousemove", onMouse, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  /* ─── global styles ─── */
  const G = `
    *{box-sizing:border-box;margin:0;padding:0}
    html{scroll-behavior:smooth}
    body{background:#06070e;color:#fff;font-family:'Inter',ui-sans-serif,system-ui,sans-serif;overflow-x:hidden}
    a{color:inherit;text-decoration:none}
    button{font:inherit;cursor:pointer;border:none;background:none}
    img{display:block;max-width:100%}

    ::-webkit-scrollbar{width:5px}
    ::-webkit-scrollbar-track{background:#06070e}
    ::-webkit-scrollbar-thumb{background:linear-gradient(#8b5cf6,#3b82f6);border-radius:99px}

    /* reveal handled inline */

    /* Poster train */
    .pTrain{overflow:hidden;mask-image:linear-gradient(90deg,transparent,black 8%,black 92%,transparent)}
    .pTrack{display:flex;gap:12px;width:max-content;animation:trainScroll 38s linear infinite}
    .pTrain:hover .pTrack{animation-play-state:paused}
    @keyframes trainScroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}
    .pCard{flex-shrink:0;width:180px;height:240px;border-radius:14px;overflow:hidden;cursor:pointer;transition:transform 0.3s,box-shadow 0.3s}
    .pCard:hover{transform:translateY(-6px) scale(1.04);box-shadow:0 16px 40px rgba(139,92,246,0.4)}
    .pCard img{width:100%;height:100%;object-fit:cover}

    /* Skills pill */
    .skillPill{display:inline-block;padding:7px 16px;border-radius:999px;font-size:13px;background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.13);transition:all 0.25s;color:rgba(255,255,255,0.8)}
    .skillPill:hover{background:rgba(139,92,246,0.2);border-color:rgba(139,92,246,0.5);color:#fff;transform:translateY(-2px)}

    /* Nav link */
    .nLink{padding:7px 14px;border-radius:999px;font-size:14px;color:rgba(255,255,255,0.7);transition:all 0.25s}
    .nLink:hover{color:#ffd166;background:rgba(255,209,102,0.10);box-shadow:0 0 14px rgba(255,209,102,0.2)}

    /* Glass */
    .glass{background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.13);backdrop-filter:blur(18px)}

    /* Kicker */
    .kicker{color:#ffd166;font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:0.3em}

    /* Section pad */
    .sec{padding:120px 0}
    .con{max-width:1200px;margin:0 auto;padding:0 28px;position:relative;z-index:2}

    @media(max-width:768px){
      .heroGrid{grid-template-columns:1fr !important}
      .projGrid{grid-template-columns:1fr !important}
      .aboutGrid{grid-template-columns:1fr !important}
      .expGrid{grid-template-columns:1fr !important}
      .productGrid{grid-template-columns:1fr 1fr !important}
      .product3d{height:280px !important}
    }
  `;

  return (
    <>
      <style>{G}</style>
      <ParticleCanvas />

      {/* cursor glow */}
      <div style={{ position: "fixed", left: mouse.x, top: mouse.y, width: 200, height: 200, borderRadius: "50%", transform: "translate(-50%,-50%)", background: "radial-gradient(circle,rgba(139,92,246,0.18),rgba(59,130,246,0.12) 45%,transparent 70%)", pointerEvents: "none", filter: "blur(6px)", zIndex: 1, transition: "left 0.05s,top 0.05s" }} />
      <div style={{ position: "fixed", left: mouse.x, top: mouse.y, width: 20, height: 20, borderRadius: "50%", transform: "translate(-50%,-50%)", border: "1.5px solid rgba(255,255,255,0.7)", pointerEvents: "none", zIndex: 1000, mixBlendMode: "difference" }} />

      {/* ── NAV ── */}
      <nav style={{ position: "fixed", top: 16, left: "50%", transform: "translateX(-50%)", width: "min(1200px,calc(100% - 24px))", zIndex: 200, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 20px", borderRadius: 999, background: "rgba(6,7,14,0.75)", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(24px)" }}>
        <span style={{ fontWeight: 900, fontSize: 16, letterSpacing: "-0.03em" }}>
          <span style={{ background: "linear-gradient(135deg,#8b5cf6,#3b82f6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>G</span>owtham B
        </span>
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {[["#work", "Work"], ["#products", "Products"], ["#about", "About"], ["#contact", "Contact"]].map(([h, l]) => (
            <a key={h} href={h} className="nLink">{l}</a>
          ))}
          <a href={RESUME_URL} target="_blank" rel="noreferrer" style={{ marginLeft: 8, padding: "7px 18px", borderRadius: 999, background: "linear-gradient(135deg,#8b5cf6,#6366f1)", color: "#fff", fontSize: 14, fontWeight: 600, transition: "opacity 0.2s" }}>Resume ↗</a>
        </div>
      </nav>

      {/* ═══════════════════════════════ HERO ═══════════════════════════════ */}
      <section ref={heroRef} style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden" }}>
        {/* ambient orbs */}
        <div style={{ position: "absolute", top: "10%", left: "5%", width: 500, height: 500, background: "radial-gradient(circle,rgba(139,92,246,0.18),transparent 65%)", borderRadius: "50%", filter: "blur(60px)", pointerEvents: "none", transform: `translate(${scrollY * 0.04}px,${scrollY * 0.02}px)` }} />
        <div style={{ position: "absolute", top: "30%", right: "5%", width: 400, height: 400, background: "radial-gradient(circle,rgba(59,130,246,0.15),transparent 65%)", borderRadius: "50%", filter: "blur(60px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "10%", left: "40%", width: 300, height: 300, background: "radial-gradient(circle,rgba(251,191,36,0.12),transparent 65%)", borderRadius: "50%", filter: "blur(50px)", pointerEvents: "none" }} />

        <div className="con" style={{ width: "100%", paddingTop: 80 }}>
          <div className="heroGrid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center", minHeight: "85vh" }}>
            {/* left */}
            <div>
              <Reveal>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 16px", borderRadius: 999, background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.4)", marginBottom: 32 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px #22c55e", display: "inline-block" }} />
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,0.8)" }}>Available for new roles — Bengaluru, India</span>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <h1 style={{ fontSize: "clamp(2.4rem,6vw,5rem)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.05, marginBottom: 8 }}>
                  Gowtham B
                </h1>
                <h2 style={{ fontSize: "clamp(1.1rem,2.5vw,1.8rem)", fontWeight: 400, color: "rgba(255,255,255,0.55)", letterSpacing: "-0.02em", marginBottom: 24 }}>
                  AI Product Designer &nbsp;·&nbsp; UI/UX Designer
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p style={{ fontSize: 16, lineHeight: 1.8, color: "rgba(255,255,255,0.65)", maxWidth: 520, marginBottom: 40 }}>
                  Designing intelligent, user-centred digital products through UX research, product thinking, AI-powered experiences, and scalable design systems. Currently at <span style={{ color: "#fff" }}>Unacademy</span>.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                  <a href="#work" style={{ padding: "14px 28px", borderRadius: 999, background: "linear-gradient(135deg,#8b5cf6,#6366f1)", color: "#fff", fontWeight: 700, fontSize: 15, boxShadow: "0 8px 32px rgba(139,92,246,0.5)", transition: "transform 0.2s,box-shadow 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(139,92,246,0.65)"; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 8px 32px rgba(139,92,246,0.5)"; }}>
                    View My Work ↓
                  </a>
                  <a href={`mailto:${EMAIL}`} style={{ padding: "14px 28px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.85)", fontWeight: 600, fontSize: 15, transition: "border-color 0.2s,background 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "#8b5cf6"; e.currentTarget.style.background = "rgba(139,92,246,0.1)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; e.currentTarget.style.background = "transparent"; }}>
                    Let's Talk
                  </a>
                </div>
              </Reveal>
              <Reveal delay={0.45}>
                <div style={{ marginTop: 48, display: "flex", gap: 32 }}>
                  {[["60→90%", "Checkout lift"], ["22s→9s", "Discovery speed"], ["30%", "Support reduction"]].map(([v, l]) => (
                    <div key={l}>
                      <div style={{ fontSize: "1.5rem", fontWeight: 900, background: "linear-gradient(135deg,#fbbf24,#f59e0b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{v}</div>
                      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>{l}</div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* right — profile card */}
            <Reveal dir="right" delay={0.15}>
              <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
                <div style={{ position: "absolute", inset: -30, background: "radial-gradient(circle,rgba(139,92,246,0.2),transparent 70%)", borderRadius: "50%", filter: "blur(40px)" }} />
                <div className="glass" style={{ borderRadius: 28, overflow: "hidden", maxWidth: 380, width: "100%", position: "relative" }}>
                  <img src={IMAGE_URLS.profile} alt="Gowtham B" style={{ width: "100%", aspectRatio: "4/5", objectFit: "cover", objectPosition: "top" }} onError={e => { e.currentTarget.style.background = "#1a1b2e"; e.currentTarget.src = "https://dummyimage.com/380x475/1a1b2e/8b5cf6&text=Gowtham+B"; }} />
                  <div style={{ padding: "20px 24px 24px", background: "linear-gradient(0deg,rgba(6,7,14,0.95),rgba(6,7,14,0.6))" }}>
                    <div className="kicker" style={{ marginBottom: 6 }}>AI Product Designer</div>
                    <div style={{ fontSize: 18, fontWeight: 700 }}>Gowtham B</div>
                    <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {["Figma", "Claude", "Midjourney", "Hotjar"].map(t => (
                        <span key={t} style={{ fontSize: 11, padding: "4px 10px", borderRadius: 999, background: "rgba(139,92,246,0.2)", border: "1px solid rgba(139,92,246,0.4)", color: "#c4b5fd" }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
                {/* floating badge */}
                <div className="glass" style={{ position: "absolute", bottom: -8, left: -8, borderRadius: 16, padding: "12px 16px", display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 24 }}>🏆</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700 }}>5+ Case Studies</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>End-to-end UX delivered</div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* scroll indicator */}
        <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, opacity: 0.5 }}>
          <div style={{ width: 1, height: 48, background: "linear-gradient(#8b5cf6,transparent)", animation: "pulse 2s ease-in-out infinite" }} />
          <span style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase" }}>scroll</span>
        </div>
        <style>{`@keyframes pulse{0%,100%{opacity:0.5}50%{opacity:1}}`}</style>
      </section>

      {/* ═══════════════════════════ WORK / PROJECTS ═══════════════════════ */}
      <section id="work" className="sec" style={{ position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg,transparent,rgba(139,92,246,0.5),transparent)" }} />
        <div className="con">
          <Reveal>
            <p className="kicker" style={{ marginBottom: 12 }}>Case Studies</p>
            <h2 style={{ fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 900, letterSpacing: "-0.04em", marginBottom: 60 }}>
              Designing with intention,<br /><span style={{ color: "rgba(255,255,255,0.35)" }}>not just instinct.</span>
            </h2>
          </Reveal>

          {/* project tabs */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 40 }}>
            {PROJECTS.map(p => (
              <button key={p.id} onClick={() => setActiveProject(p)}
                style={{ padding: "10px 22px", borderRadius: 999, fontSize: 14, fontWeight: 600, transition: "all 0.3s", background: activeProject.id === p.id ? `rgba(${p.accentRgb},0.25)` : "rgba(255,255,255,0.06)", border: `1px solid ${activeProject.id === p.id ? `rgba(${p.accentRgb},0.7)` : "rgba(255,255,255,0.12)"}`, color: activeProject.id === p.id ? "#fff" : "rgba(255,255,255,0.6)" }}>
                {p.title}
              </button>
            ))}
          </div>

          {/* active project */}
          <div className="projGrid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "start" }}>
            <Reveal key={activeProject.id} delay={0}>
              <div>
                <div style={{ display: "inline-block", padding: "4px 14px", borderRadius: 999, fontSize: 12, background: `rgba(${activeProject.accentRgb},0.2)`, border: `1px solid rgba(${activeProject.accentRgb},0.4)`, color: "#fff", marginBottom: 20 }}>{activeProject.type}</div>
                <h3 style={{ fontSize: "clamp(1.8rem,3vw,2.8rem)", fontWeight: 900, letterSpacing: "-0.04em", marginBottom: 16 }}>{activeProject.title}</h3>
                <p style={{ fontSize: 16, lineHeight: 1.8, color: "rgba(255,255,255,0.65)", marginBottom: 28 }}>{activeProject.desc}</p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 32 }}>
                  {activeProject.tags.map(t => <span key={t} style={{ fontSize: 12, padding: "5px 12px", borderRadius: 999, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.7)" }}>{t}</span>)}
                </div>
                <div style={{ display: "grid", gap: 12, marginBottom: 32 }}>
                  {[["🎯 Problem", activeProject.problem, "#ff6b6b"], ["💡 Solution", activeProject.solution, "#ffd166"], ["✅ Impact", activeProject.impact, "#86efac"]].map(([label, text, col]) => (
                    <div key={label} className="glass" style={{ padding: "16px 20px", borderRadius: 16, borderLeft: `3px solid ${col}` }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: col, marginBottom: 6 }}>{label}</div>
                      <p style={{ fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,0.7)" }}>{text}</p>
                    </div>
                  ))}
                </div>
                {activeProject.figma !== "#" && (
                  <a href={activeProject.figma} target="_blank" rel="noreferrer"
                    style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px", borderRadius: 999, background: `rgba(${activeProject.accentRgb},0.2)`, border: `1px solid rgba(${activeProject.accentRgb},0.5)`, color: "#fff", fontWeight: 600, fontSize: 14 }}>
                    <svg width="18" height="18" viewBox="0 0 38 57" fill="none"><path d="M19 28.5A9.5 9.5 0 1 1 28.5 19H19v9.5z" fill="#1ABCFE"/><path d="M9.5 47.5a9.5 9.5 0 0 1 9.5-9.5v9.5a9.5 9.5 0 0 1-9.5 9.5 9.5 9.5 0 0 1 0-19z" fill="#0ACF83"/><path d="M19 0h-9.5a9.5 9.5 0 0 0 0 19H19V0z" fill="#FF7262"/><path d="M28.5 0H19v19h9.5a9.5 9.5 0 0 0 0-19z" fill="#F24E1E"/><path d="M19 19h9.5a9.5 9.5 0 0 1 0 19H19V19z" fill="#A259FF"/></svg>
                    View in Figma ↗
                  </a>
                )}
              </div>
            </Reveal>
            <Reveal delay={0.15} dir="right">
              <ImageCarousel images={activeProject.images} accent={activeProject.accentRgb} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ PRODUCT DESIGN (3D) ═══════════════════ */}
      <section id="products" className="sec" style={{ background: "rgba(255,255,255,0.02)", position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg,transparent,rgba(59,130,246,0.5),transparent)" }} />
        <div className="con">
          <Reveal>
            <p className="kicker" style={{ marginBottom: 12 }}>Product Design</p>
            <h2 style={{ fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 900, letterSpacing: "-0.04em", marginBottom: 12 }}>Urban Gear — Packaging & Catalog</h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.55)", maxWidth: 600, marginBottom: 48 }}>Full product packaging design for Urban Gear's lifestyle lineup — mug boxes, bottle catalogs, speaker sheets, and bag catalogs. Drag to rotate.</p>
          </Reveal>

          {/* product selector */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 36 }}>
            {PRODUCT_CARDS.map((p, i) => (
              <button key={p.label} onClick={() => setActiveProduct(i)}
                style={{ padding: "10px 20px", borderRadius: 999, fontSize: 13, fontWeight: 600, transition: "all 0.3s", background: activeProduct === i ? `rgba(139,92,246,0.25)` : "rgba(255,255,255,0.06)", border: `1px solid ${activeProduct === i ? "rgba(139,92,246,0.7)" : "rgba(255,255,255,0.12)"}`, color: activeProduct === i ? "#fff" : "rgba(255,255,255,0.6)" }}>
                {p.label}
              </button>
            ))}
          </div>

          <div className="productGrid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 28 }}>
            {/* 3D viewer — spans 2 cols */}
            <div style={{ gridColumn: "span 2" }}>
              <Reveal>
                <div className="glass product3d" style={{ borderRadius: 24, padding: 16, height: 420 }}>
                 <Product3DViewer
  modelPath={PRODUCT_CARDS[activeProduct].model}
/>
                </div>
              </Reveal>
            </div>
            {/* info panel */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <Reveal delay={0.1} dir="right">
                <div className="glass" style={{ borderRadius: 20, padding: 24, flexGrow: 1 }}>
                  <div className="kicker" style={{ marginBottom: 12 }}>Urban Gear®</div>
                  <h3 style={{ fontSize: "1.4rem", fontWeight: 800, marginBottom: 8 }}>{PRODUCT_CARDS[activeProduct].label}</h3>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, marginBottom: 20 }}>{PRODUCT_CARDS[activeProduct].desc}</p>
                  <div style={{ display: "grid", gap: 10 }}>
                    {[["300 GSM", "Premium Paper Board"], ["Matte", "Lamination"], ["CMYK", "4-Color Printing"], ["Spot UV", "Embossing Finish"]].map(([v, l]) => (
                      <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "8px 12px", borderRadius: 10, background: "rgba(255,255,255,0.06)" }}>
                        <span style={{ fontSize: 12, fontWeight: 700, color: "#c4b5fd" }}>{v}</span>
                        <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{l}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.2} dir="right">
                <div className="glass" style={{ borderRadius: 20, padding: 16, display: "flex", gap: 10, alignItems: "center" }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: "linear-gradient(135deg,#8b5cf6,#3b82f6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>📦</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700 }}>Full Dieline Delivered</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>Print-ready, all sides</div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* product thumbnails strip */}
          <Reveal delay={0.2}>
            <div style={{ marginTop: 40, display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))", gap: 14 }}>
              {[
                { label: "Mug Package", src: PRODUCT_CARDS[0].src },
                { label: "Flipper Catalog", src: PRODUCT_CARDS[1].src },
                { label: "Meal Pro", src: PRODUCT_CARDS[2].src },
                { label: "Tango Speaker", src: PRODUCT_CARDS[3].src },
              ].map(({ label, src }) => (
                <div key={label} className="glass" style={{ borderRadius: 14, overflow: "hidden", transition: "transform 0.3s,box-shadow 0.3s" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(139,92,246,0.3)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
                  <img src={src} alt={label} style={{ width: "100%", height: 110, objectFit: "cover" }} onError={e => { e.currentTarget.src = `https://dummyimage.com/320x220/111/fff&text=${encodeURIComponent(label)}`; }} />
                  <div style={{ padding: "10px 12px", fontSize: 12, color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>{label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════ GRAPHIC DESIGN ═════════════════════════ */}
      <section className="sec" style={{ paddingBottom: 80 }}>
        <div className="con">
          <Reveal>
            <p className="kicker" style={{ marginBottom: 12 }}>Graphic Design</p>
            <h2 style={{ fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 900, letterSpacing: "-0.04em", marginBottom: 40 }}>Posters & Visual Identity</h2>
          </Reveal>
        </div>
        <div className="pTrain">
          <div className="pTrack">
            {[...IMAGE_URLS.graphicDesign, ...IMAGE_URLS.graphicDesign].map((img, i) => (
              <button key={i} className="pCard" onClick={() => setPosterPreview(img)}>
                <img src={img} alt="Design" onError={e => { e.currentTarget.src = "https://dummyimage.com/180x240/1a1a2e/fff&text=Design"; }} />
              </button>
            ))}
          </div>
        </div>
      </section>

      {posterPreview && (
        <div onClick={() => setPosterPreview(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.88)", zIndex: 500, display: "flex", alignItems: "center", justifyContent: "center", padding: 24, backdropFilter: "blur(12px)" }}>
          <div onClick={e => e.stopPropagation()} style={{ position: "relative", maxWidth: 720, width: "100%", borderRadius: 20, overflow: "hidden", boxShadow: "0 0 80px rgba(139,92,246,0.4)" }}>
            <button onClick={() => setPosterPreview(null)} style={{ position: "absolute", top: 14, right: 14, width: 36, height: 36, borderRadius: "50%", background: "rgba(0,0,0,0.7)", color: "#fff", fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2 }}>×</button>
            <img src={posterPreview} alt="Preview" style={{ width: "100%", display: "block" }} />
          </div>
        </div>
      )}

      {/* ═══════════════════════════ SKILLS ════════════════════════════════ */}
      <section className="sec" style={{ background: "rgba(255,255,255,0.015)", position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg,transparent,rgba(251,191,36,0.4),transparent)" }} />
        <div className="con">
          <Reveal>
            <p className="kicker" style={{ marginBottom: 12 }}>Capabilities</p>
            <h2 style={{ fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 900, letterSpacing: "-0.04em", marginBottom: 48 }}>Built to think, research,<br /><span style={{ color: "rgba(255,255,255,0.35)" }}>and ship.</span></h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 20 }}>
            {SKILLS.map(({ cat, items }, ci) => (
              <Reveal key={cat} delay={ci * 0.08}>
                <div className="glass" style={{ borderRadius: 20, padding: "24px 22px", height: "100%" }}>
                  <div className="kicker" style={{ marginBottom: 16, color: ["#c4b5fd", "#93c5fd", "#6ee7b7", "#fde68a"][ci] }}>{cat}</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {items.map(s => <span key={s} className="skillPill">{s}</span>)}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* process strip */}
          <Reveal delay={0.1}>
            <div style={{ marginTop: 56 }}>
              <p className="kicker" style={{ marginBottom: 24 }}>My Process</p>
              <div style={{ display: "flex", gap: 0, overflowX: "auto", paddingBottom: 8 }}>
                {[["01 Discover", "Interviews, heuristics, and competitive research to surface real pain points."],
                  ["02 Define", "Personas, journey maps, and problem statements distilled from research."],
                  ["03 Ideate", "Sketches, concept exploration, and feature prioritisation."],
                  ["04 Prototype", "From lo-fi wireframes to high-fidelity Figma systems."],
                  ["05 Test", "Usability sessions, A/B tests, accessibility audits, and iteration."]].map(([title, desc], i, arr) => (
                    <div key={title} style={{ flex: "1 0 200px", padding: "24px 20px", background: `rgba(139,92,246,${0.04 + i * 0.03})`, borderTop: `3px solid rgba(139,92,246,${0.2 + i * 0.15})`, position: "relative" }}>
                      <div style={{ fontSize: 11, fontWeight: 800, color: "#8b5cf6", letterSpacing: "0.15em", marginBottom: 8 }}>{title}</div>
                      <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.65 }}>{desc}</p>
                      {i < arr.length - 1 && <span style={{ position: "absolute", right: -10, top: "50%", transform: "translateY(-50%)", fontSize: 18, color: "rgba(255,255,255,0.2)", zIndex: 1 }}>→</span>}
                    </div>
                  ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════ ABOUT ══════════════════════════════════ */}
      <section id="about" className="sec">
        <div className="con">
          <Reveal>
            <p className="kicker" style={{ marginBottom: 48 }}>About Me</p>
          </Reveal>
          <div className="aboutGrid" style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 40, alignItems: "start" }}>
            <Reveal dir="left">
              <div className="glass" style={{ borderRadius: 24, overflow: "hidden" }}>
                <img src={IMAGE_URLS.standing} alt="Gowtham B" style={{ width: "100%", aspectRatio: "3/4", objectFit: "cover", objectPosition: "top" }} onError={e => { e.currentTarget.src = "https://dummyimage.com/400x533/1a1b2e/8b5cf6&text=Gowtham"; }} />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div style={{ display: "grid", gap: 16 }}>
                <div className="glass" style={{ borderRadius: 20, padding: 28 }}>
                  <h3 style={{ fontSize: "1.6rem", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 16, lineHeight: 1.3 }}>Designing digital products that earn trust and reduce friction.</h3>
                  <p style={{ fontSize: 15, lineHeight: 1.85, color: "rgba(255,255,255,0.65)" }}>I'm an AI Product Designer and UI/UX Designer based in Bengaluru. My background spans design operations at Wipro — where I reduced training queries by 30% — to gamified learning experiences at Unacademy.</p>
                  <p style={{ fontSize: 15, lineHeight: 1.85, color: "rgba(255,255,255,0.65)", marginTop: 12 }}>I bring an operational lens to design: I think about workflows, edge cases, documentation, and the moment something breaks. That makes my products practical, not just pretty.</p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  {[["📍", "Bengaluru, India"], ["🎓", "M.UX — Zero Schools, 2025"], ["💼", "UI/UX Designer @ Unacademy"], ["🌐", PORTFOLIO]].map(([icon, text]) => (
                    <div key={text} className="glass" style={{ borderRadius: 16, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ fontSize: 20 }}>{icon}</span>
                      <span style={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>{text}</span>
                    </div>
                  ))}
                </div>
                <div className="glass" style={{ borderRadius: 20, overflow: "hidden" }}>
                  <img src={IMAGE_URLS.sunset} alt="mood" style={{ width: "100%", height: 180, objectFit: "cover" }} onError={e => { e.currentTarget.style.display = "none"; }} />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ EXPERIENCE ═════════════════════════════ */}
      <section id="experience" className="sec" style={{ background: "rgba(255,255,255,0.02)", position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg,transparent,rgba(139,92,246,0.4),transparent)" }} />
        <div className="con">
          <Reveal>
            <p className="kicker" style={{ marginBottom: 12 }}>Experience</p>
            <h2 style={{ fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 900, letterSpacing: "-0.04em", marginBottom: 48 }}>Product mindset with<br /><span style={{ color: "rgba(255,255,255,0.35)" }}>real workplace discipline.</span></h2>
          </Reveal>
          <div className="expGrid" style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 24 }}>
            <Reveal dir="left">
              <div style={{ display: "grid", gap: 14, position: "sticky", top: 100 }}>
                {[["Unacademy", "Jan 2025 – Present", "#f97316"], ["Wipro Technologies", "2024 – 2025", "#3b82f6"], ["Zero Schools", "2025", "#8b5cf6"]].map(([co, dates, col]) => (
                  <div key={co} className="glass" style={{ borderRadius: 16, padding: "16px 18px", borderLeft: `3px solid ${col}` }}>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{co}</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 4 }}>{dates}</div>
                  </div>
                ))}
              </div>
            </Reveal>
            <div style={{ display: "grid", gap: 20 }}>
              {[{
                logo: IMAGE_URLS.unacademy, co: "Unacademy", role: "UI/UX Designer", dates: "Jan 2025 – Present", accent: "#f97316",
                bullets: ["Designed gamified learning experiences for competitive exam prep platforms.", "Created onboarding flows, AI-assisted interfaces, quizzes, and activity-based learning modules.", "Developed user flows, wireframes, high-fidelity UI designs, and interactive Figma prototypes.", "Improved usability, accessibility, and learner engagement across app experiences.", "Collaborated with PMs, developers, and stakeholders to deliver user-centred solutions."],
              }, {
                logo: IMAGE_URLS.wipro, co: "Wipro Technologies", role: "UX / Design Operations Specialist", dates: "2024 – 2025", accent: "#3b82f6",
                bullets: ["Analysed workflow bottlenecks and usability issues across enterprise applications.", "Redesigned task flows to reduce operational friction and improve efficiency.", "Delivered UX recommendations based on workflow analysis and stakeholder feedback.", "Reduced training-related support queries by 30% through improved experience design."],
              }].map(({ logo, co, role, dates, accent, bullets }) => (
                <Reveal key={co}>
                  <div className="glass" style={{ borderRadius: 20, padding: 28, borderLeft: `3px solid ${accent}` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, marginBottom: 20 }}>
                      <div>
                        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", marginBottom: 4 }}>{dates}</div>
                        <div style={{ fontWeight: 800, fontSize: 18 }}>{role}</div>
                        <div style={{ fontSize: 14, color: accent, fontWeight: 600, marginTop: 2 }}>{co}</div>
                      </div>
                      <img src={logo} alt={co} style={{ height: 32, objectFit: "contain", filter: "brightness(1.2)" }} onError={e => { e.currentTarget.style.display = "none"; }} />
                    </div>
                    <ul style={{ paddingLeft: 18, display: "grid", gap: 8 }}>
                      {bullets.map(b => <li key={b} style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.7 }}>{b}</li>)}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ CONTACT ════════════════════════════════ */}
      <footer id="contact" className="sec" style={{ textAlign: "center", position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg,transparent,rgba(251,191,36,0.5),transparent)" }} />
        <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: 600, height: 400, background: "radial-gradient(ellipse,rgba(139,92,246,0.2),transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />
        <div className="con" style={{ position: "relative", zIndex: 2 }}>
          <Reveal>
            <p className="kicker" style={{ marginBottom: 20 }}>Available for UI/UX & Product roles</p>
            <h2 style={{ fontSize: "clamp(2rem,5vw,4rem)", fontWeight: 900, letterSpacing: "-0.05em", marginBottom: 20, lineHeight: 1.1 }}>
              Let's build intelligent,<br />user-centred products<br /><span style={{ background: "linear-gradient(135deg,#8b5cf6,#3b82f6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>together.</span>
            </h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.55)", maxWidth: 500, margin: "0 auto 48px" }}>Open to full-time opportunities, freelance projects, and design collaborations.</p>
          </Reveal>
          <Reveal delay={0.1}>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center", marginBottom: 56 }}>
              <a href={`mailto:${EMAIL}`} style={{ padding: "14px 28px", borderRadius: 999, background: "linear-gradient(135deg,#8b5cf6,#6366f1)", color: "#fff", fontWeight: 700, fontSize: 15, boxShadow: "0 8px 32px rgba(139,92,246,0.45)" }}>{EMAIL}</a>
              <a href={`tel:${PHONE}`} style={{ padding: "14px 24px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.85)", fontWeight: 600, fontSize: 15 }}>{PHONE}</a>
              <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" style={{ padding: "14px 24px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.85)", fontWeight: 600, fontSize: 15 }}>LinkedIn ↗</a>
              <a href={RESUME_URL} target="_blank" rel="noreferrer" style={{ padding: "14px 24px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.85)", fontWeight: 600, fontSize: 15 }}>Download Resume ↗</a>
            </div>
          </Reveal>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>© 2026 Gowtham B — AI Product Designer & UI/UX Designer · Bengaluru, India</p>
        </div>
      </footer>
    </>
  );
}
