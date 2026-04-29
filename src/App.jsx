import React, { useEffect, useMemo, useState } from "react";

/* =============================
   GOWTHAM B — FINAL PORTFOLIO
   Paste this entire file in src/App.jsx
   ============================= */

const RESUME_URL = "https://drive.google.com/"; // Replace with your real resume PDF link
const LINKEDIN_URL = "http://www.linkedin.com/in/gowtham-boothal-84b672266";
const EMAIL = "gowthamboothal22@gmail.com";
const PHONE = "+916379148128";

const IMAGE_URLS = {
  profile: "https://i.postimg.cc/X7Q2tJRf/profile-jpg.jpg",
  standing: "https://i.postimg.cc/YqZF4Bgb/IMG-20250824-WA0072-jpg.jpg",
  sunset: "https://i.postimg.cc/BQ65LCzq/sunset-jpg.jpg",
  avatar: "https://i.postimg.cc/gkSDN7hJ/avatar-jpg.jpg",
  wipro: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Wipro_Primary_Logo_Color_RGB.svg",
  unacademy: "https://upload.wikimedia.org/wikipedia/commons/8/8c/Unacademy_Logo.png",
  zero: "https://dummyimage.com/300x300/111827/ffffff&text=Zero+Schools",
  booking: [
    "https://i.postimg.cc/VktsLdjz/booking1-jpg.jpg",
    "https://i.postimg.cc/zGhDXVnv/booking2-jpg.jpg",
    "https://i.postimg.cc/6pZ65ydT/booking3-jpg.jpg",
    "https://i.postimg.cc/sgWfDvp2/booking4-jpg.jpg",
    "https://i.postimg.cc/NjXGf51M/booking5-jpg.jpg",
  ],
  neithal: [
    "https://i.postimg.cc/VNYyQ648/neithal1-png.png",
    "https://i.postimg.cc/cJTpsS5Z/neithal2-png.png",
    "https://i.postimg.cc/q7QPkTZT/neithal3-png.png",
    "https://i.postimg.cc/7LXFxkQv/neithal4-png.png",
    "https://i.postimg.cc/GpzWcCSb/neithal5-png.png",
  ],
  instagrocery: [
    "https://i.postimg.cc/Dzm9yDVg/insta1-png.png",
    "https://i.postimg.cc/PqNgrcGR/insta2-png.png",
    "https://i.postimg.cc/nL56skZK/insta3-png.png",
  ],
  urban: [
    "https://i.postimg.cc/SKXPpM8W/urban1-png.png",
    "https://i.postimg.cc/KYKWyMLJ/urban2-png.png",
    "https://i.postimg.cc/W4DyPkrS/urban3-png.png",
  ],
  graphicDesign:[
"https://i.postimg.cc/W1HPcjDM/1-1.png",
"https://i.postimg.cc/ht5qRgJJ/2-1.png",
"https://i.postimg.cc/fRrhQZ3v/2-2.png",
"https://i.postimg.cc/13jZ1PgJ/3-1.png",
"https://i.postimg.cc/qRfVgLxK/30-off-hair-botox-treatment-1.png",
"https://i.postimg.cc/d1MPDBjL/4-1.png",
"https://i.postimg.cc/kgpdP9Vw/4thwall-2-1.png",
"https://i.postimg.cc/y8bzCBJQ/4thwall-3-1.png",
"https://i.postimg.cc/nz8bMkGM/Annasie-01-1.png",
"https://i.postimg.cc/SsW09MgP/Annasie-02-1.png",
"https://i.postimg.cc/MHxCmpLd/Annasie-03-1.png",
"https://i.postimg.cc/MKtSt1qV/Annasie-04.png",
"https://i.postimg.cc/C5Y3sx2Q/Annasie-04-1.png",
"https://i.postimg.cc/wvhKNmwV/Annasie-1-1.png",
"https://i.postimg.cc/BbsrBnzm/Annasie-2-1.png",
"https://i.postimg.cc/3RM5WBFN/Annasie-2-1.png",
"https://i.postimg.cc/j2Kp4S1g/Annasie-3-1.png",
"https://i.postimg.cc/8cD2mzYx/Children-s-Day-1.png",
"https://i.postimg.cc/MHxCmpLN/final-poster-1.png",
"https://i.postimg.cc/8cD2mz3N/Hopes-college-1-1.png",
"https://i.postimg.cc/6qwkfpSX/Hopes-college-4-1.png",
"https://i.postimg.cc/wMHCQjPT/Hopes-college-5-1.png",
"https://i.postimg.cc/NFY3kjVM/Hopes-college-6.png",
"https://i.postimg.cc/yxPwQz4s/image-2.png",
"https://i.postimg.cc/T19Z7XM5/image-3.png",
"https://i.postimg.cc/mkw0XGfg/image-4.png",
"https://i.postimg.cc/90pv8j5t/image-5.png",
"https://i.postimg.cc/4y5rLTkP/image-6.png",
"https://i.postimg.cc/wMVSfd85/Leadsense-Media-poster-design-1.png",
"https://i.postimg.cc/y6y4Y0gz/Leo-Bake-s-1.png",
"https://i.postimg.cc/htjqYhGz/Mockup-1.png",
"https://i.postimg.cc/cLHNz6JJ/Mockup-2.png",
"https://i.postimg.cc/YC9wPjS4/Mockup-3.png",
"https://i.postimg.cc/rwmLHzpm/Mockup-4.png",
"https://i.postimg.cc/ryNXF50m/Next-Level-1.png",
"https://i.postimg.cc/3rF5J24x/RC-1-1.png",
"https://i.postimg.cc/bY9cN1Dd/RC-Poster-2-1.png",
"https://i.postimg.cc/jdqVWCPD/RC-Poster-3-1.png",
"https://i.postimg.cc/59SdN8YQ/Republic-(2)-1.png",
"https://i.postimg.cc/G3xwhv8s/Republic-(4)-1.png",
"https://i.postimg.cc/15Rxg4wN/Republic-Day-2-1.png",
"https://i.postimg.cc/3JrMyWmg/Republic-day-poster-1-1.png",
"https://i.postimg.cc/L64dqhLT/Republic-day-poster-2.png",
"https://i.postimg.cc/m2ZxchCz/Republic-Day-poster-2-1.png",
"https://i.postimg.cc/FsFtf13y/Republic-Day-poster-2-1.png",
"https://i.postimg.cc/L64dqhLV/Republic-Day-poster-3-1.png",
"https://i.postimg.cc/4NWDpZQ2/studio-11-poster-1-1.png",
"https://i.postimg.cc/SNgBcqfv/Studio-11-poster-3-1.png",
"https://i.postimg.cc/Hs6qbHtY/Valentine-S11-p2-1.png",
"https://i.postimg.cc/Z501cgft/Valentine-wish-1.png",
"https://i.postimg.cc/4xnr5M8T/Whats-App-Image-2026-01-24-at-11-43-16-PM-1.png",
]
};

const projects = [
  {
    id: "01",
    title: "Booking.com",
    type: "Payment Flow Optimization",
    desc: "Optimized travel booking screens to improve cost visibility, CTA clarity, and checkout confidence.",
    tags: ["Web UX", "Task Walkthrough", "Conversion UX"],
    accent: "#0071c2",
    images: IMAGE_URLS.booking,
    figma: "https://www.figma.com/proto/cWyEeTr2NMsnmVWUXHNWC2/Projects?node-id=482-4342&viewport=321%2C-11%2C0.04&t=yaWHkbWfEW8KwlfW-1&scaling=scale-down&content-scaling=fixed&page-id=478%3A987",
    problem: "Users were confused by lack of cost visibility and weak CTA hierarchy during booking.",
    solution: "Introduced clearer visual grouping, stronger CTA hierarchy, and persistent price summary thinking.",
    impact: "Improved booking completion clarity from 60% → 90%."
  },
  {
    id: "02",
    title: "Neithal",
    type: "Seafood Delivery App",
    desc: "A Tamil-inspired seafood delivery app focused on freshness, trust, ordering flow, tracking, and post-order support.",
    tags: ["Mobile App", "Design System", "Service UX"],
    accent: "#ff8a00",
    images: IMAGE_URLS.neithal,
    figma: "https://www.figma.com/design/cWyEeTr2NMsnmVWUXHNWC2/Projects?node-id=656-628&t=uwSFZzWE2rkL3bNG-1",
    problem: "Users struggle to trust seafood freshness, delivery reliability, and restaurant/product quality online.",
    solution: "Built browse, cart, tracking, driver communication, cancellation, and location management screens.",
    impact: "Created a complete end-to-end seafood ordering experience."
  },
  {
    id: "03",
    title: "InstaGrocery",
    type: "Social Commerce Grocery App",
    desc: "A grocery concept where users discover products through familiar social-media style interactions and buy faster.",
    tags: ["Social Commerce", "Mobile UX", "Product Discovery"],
    accent: "#ff304f",
    images: IMAGE_URLS.instagrocery,
    figma: "https://www.figma.com/design/cWyEeTr2NMsnmVWUXHNWC2/Projects?node-id=489-8191&t=uwSFZzWE2rkL3bNG-1",
    problem: "Deep category structures made grocery discovery slow and less engaging.",
    solution: "Simplified hierarchy from 4 levels to 2 levels and created feed-based product discovery.",
    impact: "Reduced product discovery time from 22s → 9s."
  },
  {
    id: "04",
    title: "Urban Company",
    type: "Checkout Redesign",
    desc: "A service checkout redesign focused on reducing friction, improving hierarchy, and simplifying completion.",
    tags: ["Heuristic Evaluation", "Checkout UX", "Usability Testing"],
    accent: "#7c5cff",
    images: IMAGE_URLS.urban,
    figma: "https://www.figma.com/design/cWyEeTr2NMsnmVWUXHNWC2/Projects?node-id=124-312&t=uwSFZzWE2rkL3bNG-1",
    problem: "Users dropped off because checkout had multiple steps and high cognitive load.",
    solution: "Merged shipping and payment into a cleaner single-flow checkout with better hierarchy.",
    impact: "Reduced checkout completion time by 35%."
  }
];

const skills = [
  'skill1',
  'skill2',
  'graphicDesign',
  'UX Research', 'UI Design', 'Product Design', 'Wireframing', 'Prototyping', 'Figma', 'Design Systems', 'Usability Testing', 'Interaction Design', 'Information Architecture', 'Adobe XD', 'Photoshop', 'Illustrator', 'Miro', 'Responsive Design', 'Accessibility'
];

const process = [
  ["01", "Discover", "Understand users, business goals, pain points, task flows, and friction before designing screens."],
  ["02", "Define", "Turn findings into problem statements, IA, journeys, user flows, and design goals."],
  ["03", "Design", "Create wireframes, high-fidelity screens, prototypes, and scalable components."],
  ["04", "Validate", "Test usability, refine interactions, reduce friction, and improve completion confidence."]
];

function SafeImage({ src, alt, className = "" }) {
  const fallback = "https://dummyimage.com/1000x700/111827/ffffff&text=Image+Not+Loaded";
  return <img src={src || fallback} alt={alt} className={className} onError={(e) => { e.currentTarget.src = fallback; }} />;
}

function ImageStack({ project }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    setActive(0);
  }, [project.title]);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((v) => (v + 1) % project.images.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [project]);

  return (
    <div className="imageStack">
      <div className="imageGlow" style={{ background: `radial-gradient(circle, ${project.accent}55, transparent 55%)` }} />
      <SafeImage src={project.images[active]} alt={`${project.title} preview`} className="previewImage" />
      <div className="dots">
        {project.images.map((_, i) => (
          <button key={i} onClick={() => setActive(i)} className={i === active ? "dot active" : "dot"} aria-label={`Show ${project.title} image ${i + 1}`} />
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [selected, setSelected] = useState(projects[0]);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const allImages = useMemo(() => IMAGE_URLS.graphicDesign, []);
  const [posterPreview, setPosterPreview] = useState(null);

  useEffect(() => {
    const move = (e) => {
      setMouse({ x: e.clientX, y: e.clientY });
      document.documentElement.style.setProperty("--mx", `${e.clientX}px`);
      document.documentElement.style.setProperty("--my", `${e.clientY}px`);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("show");
      });
    }, { threshold: 0.1 });

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    window.addEventListener("mousemove", move, { passive: true });

    return () => {
      window.removeEventListener("mousemove", move);
      observer.disconnect();
    };
  }, []);

  return (
    <main>
      <style>{`
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body {
          margin: 0;
          background: #05060a;
          color: #fff;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        a { color: inherit; text-decoration: none; }
        button { font: inherit; }
        img { display: block; }

        main {
          min-height: 100vh;
          overflow: hidden;
          background:
            radial-gradient(circle at var(--mx, 50%) var(--my, 20%), rgba(255, 209, 102, .12), transparent 18%),
            radial-gradient(circle at 15% 20%, rgba(0, 113, 194, .16), transparent 24%),
            radial-gradient(circle at 85% 25%, rgba(124, 92, 255, .18), transparent 22%),
            #05060a;
        }
        main::before {
          content: "";
          position: fixed;
          inset: 0;
          pointer-events: none;
          background-image:
            linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px);
          background-size: 44px 44px;
          mask-image: radial-gradient(circle at center, black 0%, transparent 78%);
          z-index: 0;
        }
          /* SECTION */
.glowSection {
  position: relative;
  padding: 100px 0;
  overflow: hidden;
}

/* HEADING */
.glowHeading {
  text-align: center;
  font-size: 48px;
  margin-bottom: 40px;
  font-weight: 700;
  background: linear-gradient(90deg, #fff, #8ab4ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* TRAIN */
.glowTrain {
  overflow: hidden;
}

.glowTrack {
  display: flex;
  gap: 30px;
  width: max-content;
  animation: glowScroll 25s linear infinite;
}

.glowTrain:hover .glowTrack {
  animation-play-state: paused;
}

@keyframes glowScroll {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

/* CARD */
.glowCard {
  width: 260px;
  height: 180px;
  padding: 20px;
  border-radius: 20px;
  backdrop-filter: blur(20px);
  background: linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02));
  border: 1px solid rgba(255,255,255,0.15);
  position: relative;
  overflow: hidden;
  transition: 0.4s;
}

/* GLOW EFFECT */
.glowCard::before {
  content: "";
  position: absolute;
  inset: -2px;
  background: radial-gradient(circle at bottom right, #8a2be2, #00bfff, transparent);
  filter: blur(40px);
  opacity: 0.5;
  z-index: 0;
}

.glowCard h3,
.glowCard p {
  position: relative;
  z-index: 2;
  color: white;
}

.glowCard h3 {
  font-size: 22px;
  margin-bottom: 10px;
}

.glowCard p {
  font-size: 14px;
  opacity: 0.8;
}

/* HOVER */
.glowCard:hover {
  transform: scale(1.08);
  box-shadow: 0 0 40px rgba(138,43,226,0.4);
}

/* STARS BACKGROUND */
.stars {
  position: absolute;
  width: 100%;
  height: 100%;
  background: transparent url("https://www.transparenttextures.com/patterns/stardust.png");
  opacity: 0.3;
  top: 0;
  left: 0;
}
        .cursorGlow {
          position: fixed;
          left: ${mouse.x}px;
          top: ${mouse.y}px;
          width: 110px;
          height: 110px;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          background: radial-gradient(circle, rgba(255,209,102,.28), rgba(0,113,194,.16) 45%, transparent 70%);
          pointer-events: none;
          filter: blur(4px);
          z-index: 2;
        }
        .cursorRing {
          position: fixed;
          left: ${mouse.x}px;
          top: ${mouse.y}px;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          border: 1px solid rgba(255,255,255,.75);
          pointer-events: none;
          z-index: 999;
        }

        .container { position: relative; z-index: 3; max-width: 1180px; margin: 0 auto; padding: 0 24px; }
        .glass { background: rgba(255,255,255,.065); border: 1px solid rgba(255,255,255,.14); backdrop-filter: blur(18px); }
        .headline { letter-spacing: -0.07em; color: #fff; }
        h1, h2, h3, h4, h5, h6 { color: #fff; }
        p { margin: 0; }
        .muted { color: rgba(255,255,255,.68); line-height: 1.75; }
        .kicker { color: #ffd166; font-size: 13px; font-weight: 900; text-transform: uppercase; letter-spacing: .35em; }

        .nav {
          position: fixed;
          z-index: 50;
          top: 18px;
          left: 50%;
          transform: translateX(-50%);
          width: min(1180px, calc(100% - 32px));
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
        }
        .brand, .navLinks {
          border-radius: 999px;
          padding: 12px 18px;
        }
        .brand { font-weight: 900; }
        .navLinks { display: flex; gap: 18px; color: rgba(255,255,255,.72); }
        .navLinks a {
  position: relative;
  padding: 8px 14px;
  border-radius: 999px;
  transition: all 0.3s ease;
  color: rgba(255,255,255,0.7);
}

.navLinks a:hover {
  color: #ffd166;
  border: 1px solid rgba(255, 209, 102, 0.6);
  background: rgba(255, 209, 102, 0.08);
  box-shadow: 0 0 12px rgba(255, 209, 102, 0.25);
}

        .hero {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1.05fr .95fr;
          gap: 48px;
          align-items: center;
          padding-top: 100px;
        }
        .pill {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          width: max-content;
          max-width: 100%;
          border: 1px solid rgba(255,209,102,.34);
          background: rgba(255,209,102,.10);
          color: #ffe7a3;
          padding: 9px 15px;
          border-radius: 999px;
          font-size: 14px;
          font-weight: 700;
        }
        .pillDot { width: 8px; height: 8px; border-radius: 999px; background: #ffd166; }
        h1 {
          margin: 28px 0 0;
          font-size: clamp(54px, 7vw, 110px);
          line-height: .88;
          font-weight: 950;
          color: #fff;
        }
        .lead {
          margin-top: 28px;
          max-width: 670px;
          color: rgba(255,255,255,.75);
          font-size: 20px;
          line-height: 1.7;
        }
        .actions {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          margin-top: 34px;
        }
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 14px 22px;
          min-height: 48px;
          border-radius: 999px;
          font-weight: 850;
          font-size: 14px;
          text-decoration: none;
          border: 1px solid rgba(255,255,255,.18);
          background: rgba(255,255,255,.08);
          color: #fff;
          transition: transform .22s ease, background .22s ease, border-color .22s ease;
          cursor: pointer;
        }
        .btn:hover { transform: translateY(-2px); background: rgba(255,255,255,.14); border-color: rgba(255,209,102,.45); }
        .btnPrimary { background: #fff; color: #05060a; border-color: #fff; }
        .btnPrimary:hover { background: #ffd166; border-color: #ffd166; }

        .profileCard {
          position: relative;
          min-height: 620px;
          overflow: hidden;
          border-radius: 34px;
          animation: float 5s ease-in-out infinite;
        }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        .profileImageWrap {
          position: absolute;
          inset: 16px;
          border-radius: 28px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,.14);
        }
        .profileImageWrap img { width: 100%; height: 100%; object-fit: cover; object-position: center top; }
        .profileImageWrap::after { content: ""; position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,.82), rgba(0,0,0,.06) 55%); }
        .snapshot {
          position: absolute;
          left: 24px;
          right: 24px;
          bottom: 24px;
          z-index: 3;
          border: 1px solid rgba(255,255,255,.16);
          background: rgba(0,0,0,.62);
          backdrop-filter: blur(18px);
          border-radius: 24px;
          padding: 22px;
        }
        .avatar { width: 72px; height: 72px; object-fit: cover; border-radius: 18px; border: 1px solid rgba(255,255,255,.15); }

        .marqueeWrap { position: relative; z-index: 3; overflow: hidden; border-block: 1px solid rgba(255,255,255,.1); background: rgba(255,255,255,.03); padding: 22px 0; }
        .marquee { display: flex; width: max-content; animation: marquee 30s linear infinite; font-size: clamp(32px, 5vw, 64px); font-weight: 950; text-transform: uppercase; color: rgba(255,255,255,.75); }
        .marquee span { margin: 0 26px; white-space: nowrap; }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }

        .section { padding: 110px 0; }
        .sectionHead { display: flex; justify-content: space-between; align-items: end; gap: 28px; margin-bottom: 46px; }
        h2 { margin: 12px 0 0; font-size: clamp(44px, 6vw, 76px); line-height: .92; font-weight: 950; }

        .projectGrid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px; }
        .projectCard { border-radius: 32px; padding: 20px; overflow: hidden; transition: .3s ease; }
        .projectCard:hover { border-color: rgba(255,209,102,.65); background: rgba(255,255,255,.09); box-shadow: 0 0 36px rgba(255,209,102,.14), 0 26px 70px rgba(0,0,0,.35); }
        .projectImg { position: relative; height: 320px; border-radius: 24px; overflow: hidden; background: #111827; border: 1px solid rgba(255,255,255,.1); }
        .projectImg img { width: 100%; height: 100%; object-fit: cover; transition: transform .5s ease; }
        .projectCard:hover .projectImg img { transform: scale(1.06); }
        .shade { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,.86), transparent); }
        .projectTitle { position: absolute; left: 22px; right: 22px; bottom: 22px; }
        .projectTitle h3 { margin: 10px 0 0; font-size: 42px; line-height: .95; font-weight: 950; }
        .tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 18px; }
        .tag { border-radius: 999px; background: rgba(255,255,255,.08); color: rgba(255,255,255,.76); padding: 8px 12px; font-size: 12px; }
        .three { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-top: 24px; }
        .miniTitle { font-size: 11px; font-weight: 900; text-transform: uppercase; letter-spacing: .2em; margin-bottom: 8px; }

        .screensGrid { display: grid; grid-template-columns: .9fr 1.1fr; gap: 32px; align-items: stretch; }
        .infoCard { border-radius: 32px; padding: 30px; }
        .imageStack { position: relative; min-height: 520px; border-radius: 32px; border: 1px solid rgba(255,255,255,.12); background: rgba(0,0,0,.4); overflow: hidden; display: grid; place-items: center; padding: 24px; }
        .imageGlow { position: absolute; inset: -20%; opacity: .28; filter: blur(12px); }
        .previewImage { position: relative; z-index: 2; width: 100%; height: 100%; max-height: 470px; object-fit: contain; border-radius: 20px; box-shadow: 0 22px 60px rgba(0,0,0,.55); }
        .dots { position: absolute; left: 50%; bottom: 18px; transform: translateX(-50%); display: flex; gap: 8px; z-index: 5; }
        .dot { width: 10px; height: 10px; border: 0; border-radius: 999px; background: rgba(255,255,255,.35); padding: 0; cursor: pointer; }
        .dot.active { width: 32px; background: #fff; }

        .trainWrap { position: relative; z-index: 3; overflow: hidden; border-block: 1px solid rgba(255,255,255,.1); padding: 38px 0; }
        .screenTrain { display: flex; width: max-content; gap: 20px; animation: train 26s linear infinite; }
        .trainImg { width: 210px; height: 285px; object-fit: cover; border-radius: 24px; border: 1px solid rgba(255,255,255,.1); background: #111827; }
        @keyframes train { from { transform: translateX(0); } to { transform: translateX(-50%); } }

        .processGrid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; margin-top: 54px; }
        .processCard, .expCard { border-radius: 30px; padding: 28px; }
        .aboutGrid, .experienceGrid { display: grid; grid-template-columns: .9fr 1.1fr; gap: 28px; }
        .portrait { width: 100%; height: 520px; object-fit: cover; border-radius: 24px; }
        .mood { width: 100%; height: 260px; object-fit: cover; border-radius: 24px; }
        .companyLogo { width: 48px; height: 48px; border-radius: 14px; object-fit: contain; background: #fff; padding: 7px; flex: 0 0 auto; }
        .expTop { display: flex; justify-content: space-between; align-items: center; gap: 18px; }
        .expName { display: flex; align-items: center; gap: 16px; }
        .expName h3 { margin: 0; font-size: 24px; font-weight: 950; }

        footer { position: relative; z-index: 3; text-align: center; border-top: 1px solid rgba(255,255,255,.1); padding: 100px 24px; }
        footer h2 { max-width: 900px; margin: 14px auto 0; }
        .reveal { opacity: 0; transform: translateY(34px); transition: .85s ease; }
        .reveal.show { opacity: 1; transform: translateY(0); }
        /* ===== Graphic Scroll ===== */
.posterTrain {
  margin-top: 40px;
  overflow-x: auto;
  cursor: grab;
}

.posterTrain::-webkit-scrollbar {
  display: none;
}

.posterTrack {
  display: flex;
  gap: 20px;
  width: max-content;
  animation: scroll 30s linear infinite;
}

.posterTrain:hover .posterTrack {
  animation-play-state: paused;
}

@keyframes scroll {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

.posterCard {
  width: 230px;
  height: 320px;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,.15);
  background: rgba(255,255,255,.05);
  cursor: pointer;
  transition: 0.3s;
}

.posterCard:hover {
  transform: scale(1.08);
  box-shadow: 0 0 30px rgba(255,209,102,.3);
}

.posterCard img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* MODAL */
.posterModal {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,.8);
  display: grid;
  place-items: center;
  z-index: 9999;
}

.previewBox {
  position: relative;
  width: min(500px, 90vw);
  height: min(700px, 85vh);
  border-radius: 30px;
  padding: 10px;
  background: #0b0f12;
  border: 2px solid #ffd166;
  box-shadow: 0 0 40px rgba(255,209,102,.3);
}

.previewBox img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 20px;
}

.closeBtn {
  position: absolute;
  top: -10px;
  right: -10px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #ffd166;
  border: none;
  font-size: 24px;
  cursor: pointer;
}
.graphic-card:hover {
  transform: scale(1.05);
}

        @media (max-width: 900px) {
          .cursorGlow, .cursorRing { display: none; }
          .navLinks { display: none; }
          .hero, .projectGrid, .screensGrid, .aboutGrid, .experienceGrid { grid-template-columns: 1fr; }
          .sectionHead { display: block; }
          .processGrid, .three { grid-template-columns: 1fr; }
          .profileCard { min-height: 520px; }
        }
          /* ===== Cursor Spotlight Text Effect ===== */
.hero-title {
  position: relative;
  font-weight: 800;
  font-size: clamp(32px, 6vw, 90px);
  line-height: 1.1;

  /* dim base */
  color: rgba(40, 44, 134, 0.41);

  /* spotlight gradient */
  background: radial-gradient(
    circle 120px at var(--x, 50%) var(--y, 50%),
    #ffffff 20%,
    #ffd166 40%,
    rgba(255,255,255,0.1) 70%
  );

  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;

  transition: background 0.1s ease;
  .hero-title {
  position: relative;
  font-weight: 800;
  font-size: clamp(32px, 6vw, 90px);
  line-height: 1.1;

  /* dim base */
  color: rgba(104, 91, 187, 0.42);

  /* spotlight */
  background: radial-gradient(
    circle 120px at var(--x, 50%) var(--y, 50%),
    #ffffff 0%,
    #ffd166 40%,
    rgba(210, 35, 35, 0.1) 70%
  );

  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;

  transition: background 0.1s ease;
}
}
      `}</style>

      <div className="cursorGlow" />
      <div className="cursorRing" />

      <nav className="nav">
        <a href="#home" className="glass brand">Gowtham B</a>
        <div className="glass navLinks">
          <a href="#work">Work</a>
          <a href="#screens">Screens</a>
          <a href="#process">Process</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <section id="home" className="container hero reveal">
        <div>
          <div className="pill"><span className="pillDot" /> UI/UX Designer • Product Designer • Conversion UX</div>
          <h1
  className="hero-title"
  onMouseMove={(e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    e.currentTarget.style.setProperty("--x", `${x}px`);
    e.currentTarget.style.setProperty("--y", `${y}px`);
  }}
>
  Designing product experiences that convert, guide & feel effortless.
</h1>
          <p className="lead">I’m Gowtham B, a UI/UX & Product Designer focused on improving product usability, user flows, and conversion through research-driven design decisions.</p>
          <div className="actions">
            <a href="#work" className="btn btnPrimary">View Case Studies</a>
            <a href={RESUME_URL} target="_blank" rel="noreferrer" className="btn">Download Resume</a>
            <a href={`mailto:${EMAIL}`} className="btn">Contact Me</a>
          </div>
        </div>

        <div className="glass profileCard">
          <div className="profileImageWrap">
            <SafeImage src={IMAGE_URLS.profile} alt="Gowtham B profile" />
          </div>
          <div className="snapshot">
            <div style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "center" }}>
              <div>
                <p className="kicker">Portfolio Snapshot</p>
                <p style={{ marginTop: 8, fontSize: 26, fontWeight: 950 }}>4 product case studies</p>
                <p className="muted" style={{ marginTop: 4 }}>Booking.com • Neithal • InstaGrocery • Urban Company</p>
              </div>
              <SafeImage src={IMAGE_URLS.avatar} alt="Creative avatar" className="avatar" />
            </div>
          </div>
        </div>
      </section>

      <div className="marqueeWrap">
        <div className="marquee">{[...skills, ...skills].map((skill, i) => <span key={`${skill}-${i}`}>{skill}</span>)}</div>
      </div>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet"></link>
      <section id="work" className="container section reveal">
        <div className="sectionHead">
          <div>
            <p className="kicker">Selected Work</p>
            <h2 className="headline">Real screens. Clear UX impact.</h2>
            <section className="glowSection">
  <div className="stars"></div>

  <h2 className="glowHeading">My Skills & Strengths</h2>

  <div className="glowTrain">
    <div className="glowTrack">

      {[
        "Design Systems",
        "Usability Testing",
        "UX Research",
        "Wireframing",
        "Prototyping",
        "Interaction Design",
        "Visual Design"
      ].map((text, i) => (
        <div key={i} className="glowCard">
          <h3>{text}</h3>
          <p>Crafting clean, modern, user-first experiences.</p>
        </div>
      ))}

      {[
        "Design Systems",
        "Usability Testing",
        "UX Research",
        "Wireframing",
        "Prototyping",
        "Interaction Design",
        "Visual Design"
      ].map((text, i) => (
        <div key={"dup"+i} className="glowCard">
          <h3>{text}</h3>
          <p>Crafting clean, modern, user-first experiences.</p>
        </div>
      ))}

    </div>
  </div>
</section>
          </div>
          <p className="muted" style={{ maxWidth: 420 }}>Projects are framed with problem, solution, impact, and live Figma links so recruiters can quickly judge UX depth.</p>
        </div>

        <div className="projectGrid">
          {projects.map((project) => (
            <article key={project.id} className="glass projectCard">
              <div className="projectImg">
                <SafeImage src={project.images[0]} alt={project.title} />
                <div className="shade" />
                <div className="projectTitle">
                  <div style={{ display: "flex", justifyContent: "space-between", color: "rgba(255,255,255,.7)", fontSize: 14 }}><span>{project.id}</span><span>{project.type}</span></div>
                  <h3>{project.title}</h3>
                </div>
              </div>
              <p className="muted" style={{ marginTop: 18 }}>{project.desc}</p>
              <div className="tags">{project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
              <div className="three">
                <div><p className="miniTitle" style={{ color: "#ff9a9a" }}>Problem</p><p className="muted">{project.problem}</p></div>
                <div><p className="miniTitle" style={{ color: "#ffd166" }}>Solution</p><p className="muted">{project.solution}</p></div>
                <div><p className="miniTitle" style={{ color: "#86efac" }}>Impact</p><p className="muted">{project.impact}</p></div>
              </div>
              <div className="actions">
                <button type="button" onClick={() => setSelected(project)} className="btn btnPrimary">Preview Screens</button>
                <a href={project.figma} target="_blank" rel="noreferrer" className="btn">Open Figma</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="screens" className="section reveal" style={{ background: "rgba(255,255,255,.03)" }}>
        <div className="container">
          <p className="kicker">Interactive Screens</p>
          <h2 className="headline">Hover. Switch. Explore.</h2>
          <div className="actions">
            {projects.map((p) => <button type="button" key={p.title} onClick={() => setSelected(p)} className={selected.title === p.title ? "btn btnPrimary" : "btn"}>{p.title}</button>)}
          </div>

          <div className="screensGrid" style={{ marginTop: 34 }}>
            <div className="glass infoCard">
              <p className="kicker">{selected.type}</p>
              <h2 className="headline">{selected.title}</h2>
              <p className="muted" style={{ marginTop: 12 }}>{selected.desc}</p>
              <div style={{ display: "grid", gap: 14, marginTop: 24 }}>
                <div className="glass" style={{ padding: 18, borderRadius: 20 }}><b style={{ color: "#ff9a9a" }}>Problem</b><p className="muted">{selected.problem}</p></div>
                <div className="glass" style={{ padding: 18, borderRadius: 20 }}><b style={{ color: "#ffd166" }}>Solution</b><p className="muted">{selected.solution}</p></div>
                <div className="glass" style={{ padding: 18, borderRadius: 20 }}><b style={{ color: "#86efac" }}>Impact</b><p className="muted">{selected.impact}</p></div>
              </div>
            </div>
            <ImageStack project={selected} />
          </div>
        </div>
      </section>

      <div className="container" style={{ marginTop:80}}>

</div>

<div className="trainWrap"></div>

      <section id="process" className="container section reveal">
        {/* ===== Graphic Design Projects ===== */}
<section className="container section reveal">
  <p className="kicker">Graphic Design Projects</p>
  <h2 className="headline">Posters & Visual Designs</h2>

  <div className="posterTrain">
    <div className="posterTrack">
      {[...IMAGE_URLS.graphicDesign, ...IMAGE_URLS.graphicDesign].map((img, i) => (
        <button
          key={i}
          className="posterCard"
          onClick={() => setPosterPreview(img)}
        >
          <img src={img} alt="Poster" />
        </button>
      ))}
    </div>
  </div>

  {posterPreview && (
    <div className="posterModal" onClick={() => setPosterPreview(null)}>
      <div className="previewBox" onClick={(e) => e.stopPropagation()}>
        <button className="closeBtn" onClick={() => setPosterPreview(null)}>×</button>
        <img src={posterPreview} />
      </div>
    </div>
  )}
</section>
        <p className="kicker">My Process</p>
        <h2 className="headline">I design with structure, not guesswork.</h2>
        <div className="processGrid">
          {process.map(([step, title, text]) => <div key={step} className="glass processCard"><p style={{ color: "#ffd166" }}>{step}</p><h3 style={{ fontSize: 30, marginTop: 28 }}>{title}</h3><p className="muted">{text}</p></div>)}
        </div>
      </section>

      <section id="about" className="container section reveal">
        <div className="aboutGrid">
          <div className="glass" style={{ padding: 16, borderRadius: 32 }}><SafeImage src={IMAGE_URLS.standing} alt="Gowtham standing portrait" className="portrait" /></div>
          <div style={{ display: "grid", gap: 24 }}>
            <div className="glass" style={{ padding: 34, borderRadius: 32 }}><p className="kicker">About Me</p><h2 className="headline">Designer with process discipline.</h2><p className="muted" style={{ marginTop: 12 }}>My background in operations helps me understand workflows, accuracy, documentation, and user friction. I bring that thinking into UI/UX design to create practical, usable, and business-friendly digital products.</p></div>
            <div className="glass" style={{ padding: 16, borderRadius: 32 }}><SafeImage src={IMAGE_URLS.sunset} alt="Creative personal mood" className="mood" /></div>
          </div>
        </div>
      </section>

      <section id="experience" className="section reveal" style={{ background: "rgba(255,255,255,.03)" }}>
        <div className="container experienceGrid">
          <div><p className="kicker">Experience</p><h2 className="headline">Product mindset with real workplace discipline.</h2></div>
          <div style={{ display: "grid", gap: 20 }}>
            <div className="glass expCard"><div className="expTop"><div className="expName"><SafeImage src={IMAGE_URLS.unacademy} alt="Unacademy" className="companyLogo" /><h3>UI/UX Design Intern — Unacademy</h3></div><p className="muted">2026 – Present</p></div><p className="muted" style={{ marginTop: 12 }}>Designed interfaces for web and mobile products, conducted usability testing, collaborated with product managers and developers, and worked on reusable design system components.</p></div>
            <div className="glass expCard"><div className="expTop"><div className="expName"><SafeImage src={IMAGE_URLS.wipro} alt="Wipro" className="companyLogo" /><h3>Process Associate — Wipro Technologies</h3></div><p className="muted">Jan 2024 – Dec 2025</p></div><p className="muted" style={{ marginTop: 12 }}>Analysed internal systems, identified usability issues, improved workflows, created task flows and UX recommendations, and reduced training queries by 30%.</p></div>
            <div className="glass expCard"><div className="expName"><SafeImage src={IMAGE_URLS.zero} alt="Zero Schools" className="companyLogo" /><h3>UI/UX Certification — Zero Schools</h3></div><p className="muted" style={{ marginTop: 12 }}>Focused on UI design, UX design, user research, prototyping, information architecture, accessibility, responsive design, and usability testing.</p></div>
          </div>
        </div>
      </section>

      <footer id="contact" className="reveal">
        <p className="kicker">Available for UI/UX roles</p>
        <h2 className="headline">Let’s build meaningful digital experiences together.</h2>
        <div className="actions" style={{ justifyContent: "center" }}>
          <a href={`mailto:${EMAIL}`} className="btn btnPrimary">{EMAIL}</a>
          <a href={`tel:${PHONE}`} className="btn">{PHONE}</a>
          <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="btn">LinkedIn</a>
          <a href={RESUME_URL} target="_blank" rel="noreferrer" className="btn">Download Resume</a>
        </div>
        <p className="muted" style={{ marginTop: 46 }}>© 2026 Gowtham B — UI/UX & Product Designer Portfolio</p>
      </footer>
    </main>
  );
}
