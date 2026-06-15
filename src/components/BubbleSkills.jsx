import { useEffect, useRef, useState } from "react";
import "./bubble.css";
const skills = [
  "UX Research",
  "Wireframing",
  "Prototyping",
  "Interaction",
  "Visual Design",
  "Design Systems",
];

export default function BubbleSkills() {
  const [popped, setPopped] = useState([]);
  const bubbleRefs = useRef([]);

  useEffect(() => {
    const handleMove = (e) => {
      bubbleRefs.current.forEach((bubble) => {
        if (!bubble) return;

        const rect = bubble.getBoundingClientRect();
        const bx = rect.left + rect.width / 2;
        const by = rect.top + rect.height / 2;

        const dx = e.clientX - bx;
        const dy = e.clientY - by;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 170) {
          const strength = (170 - distance) / 170;
          const moveX = -dx * strength * 0.9;
          const moveY = -dy * strength * 0.9;

          bubble.style.setProperty("--pushX", `${moveX}px`);
          bubble.style.setProperty("--pushY", `${moveY}px`);
        } else {
          bubble.style.setProperty("--pushX", "0px");
          bubble.style.setProperty("--pushY", "0px");
        }
      });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const popBubble = (index) => {
    setPopped((prev) => [...prev, index]);

    setTimeout(() => {
      setPopped((prev) => prev.filter((i) => i !== index));
    }, 1200);
  };

  return (
    <section className="bubbleSection">

      <div className="blueMarquee">
        <div className="blueTrack">
          <span>UX DESIGN • ADOBE XD • PHOTOSHOP • ILLUSTRATOR • FIGMA • PROTOTYPING • UI DESIGN • </span>
        </div>
      </div>

      <div className="realBubbleArea">
        {skills.map((skill, i) => (
          <button
            key={skill}
            ref={(el) => (bubbleRefs.current[i] = el)}
            className={`realBubble bubblePos${i + 1} ${popped.includes(i) ? "pop" : ""}`}
            onClick={() => popBubble(i)}
            onMouseEnter={() => popBubble(i)}
            type="button"
          >
            <span>{skill}</span>

          </button>
        ))}
      </div>
    </section>
  );
}