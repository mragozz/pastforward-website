import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { AnimatedDVD, AnimatedMiniDV } from "./media";

/* ─── Fade-in on scroll ────────────────────────────────────────── */
export function FadeIn({
  children,
  delay = 0,
  direction = "up",
  className = "",
  duration = 0.7,
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
  className?: string;
  duration?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        y: direction === "up" ? 44 : 0,
        x: direction === "left" ? -44 : direction === "right" ? 44 : 0,
      }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, amount: 0.15 }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Clip-path text reveal (line by line) ─────────────────────── */
export function RevealLine({
  children,
  delay = 0,
  className = "",
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className="overflow-hidden">
      <motion.div
        className={className}
        style={style}
        initial={{ y: "110%", opacity: 0 }}
        whileInView={{ y: "0%", opacity: 1 }}
        transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, amount: 0.8 }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ─── Count-up number ──────────────────────────────────────────── */
export function CountUp({
  target,
  suffix = "",
  prefix = "",
  duration = 2200,
  className = "",
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.6 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const start = performance.now();
    let raf: number;
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [started, target, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{count}{suffix}
    </span>
  );
}

/* ─── 3D Tilt Card ─────────────────────────────────────────────── */
export function TiltCard({
  children,
  className = "",
  maxTilt = 10,
  scale = 1.03,
}: {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, glareX: 50, glareY: 50, over: false });

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;
    setTilt({
      x: (ny - 0.5) * maxTilt * 2,
      y: -(nx - 0.5) * maxTilt * 2,
      glareX: nx * 100,
      glareY: ny * 100,
      over: true,
    });
  }

  function onLeave() {
    setTilt({ x: 0, y: 0, glareX: 50, glareY: 50, over: false });
  }

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        transform: tilt.over
          ? `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${scale})`
          : "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)",
        transition: tilt.over ? "transform 0.1s ease" : "transform 0.5s ease",
        transformStyle: "preserve-3d",
      }}
    >
      {children}
      {/* Glare layer */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{
          background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.14) 0%, transparent 65%)`,
          opacity: tilt.over ? 1 : 0,
          transition: "opacity 0.3s",
        }}
      />
    </div>
  );
}

/* ─── Horizontal marquee ───────────────────────────────────────── */
export function Marquee({
  items,
  speed = 28,
  reverse = false,
  className = "",
}: {
  items: React.ReactNode[];
  speed?: number;
  reverse?: boolean;
  className?: string;
}) {
  const doubled = [...items, ...items];
  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        className="flex gap-10 whitespace-nowrap"
        style={{
          animation: `${reverse ? "marquee-rev" : "marquee-fwd"} ${speed}s linear infinite`,
        }}
      >
        {doubled.map((item, i) => (
          <div key={i} className="shrink-0">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Section header ────────────────────────────────────────────── */
export function SectionHeader({
  tag,
  title,
  subtitle,
  center = true,
  tagColor = "accent",
}: {
  tag: string;
  title: React.ReactNode;
  subtitle?: string;
  center?: boolean;
  tagColor?: "accent" | "primary";
}) {
  const tagClass =
    tagColor === "accent"
      ? "bg-accent/10 text-accent"
      : "bg-primary/8 text-primary";

  return (
    <div className={`mb-16 ${center ? "text-center" : ""}`}>
      <FadeIn>
        <span className={`inline-block ${tagClass} font-bold text-sm px-5 py-2.5 rounded-full mb-6 tracking-widest uppercase`}>
          {tag}
        </span>
      </FadeIn>
      <RevealLine className={`font-display font-bold text-foreground leading-tight`}
        style={{ fontSize: "clamp(2rem, 4.5vw, 3.6rem)" } as React.CSSProperties}
      >
        {title}
      </RevealLine>
      {subtitle && (
        <FadeIn delay={0.2}>
          <p className={`mt-5 text-xl text-foreground/60 max-w-2xl leading-relaxed ${center ? "mx-auto" : ""}`}>
            {subtitle}
          </p>
        </FadeIn>
      )}
    </div>
  );
}

/* ─── Page hero banner (for inner pages) ───────────────────────── */
export function PageHero({
  tag,
  title,
  subtitle,
  children,
}: {
  tag: string;
  title: React.ReactNode;
  subtitle?: string;
  children?: React.ReactNode;
}) {
  return (
    <section
      className="pt-40 pb-24 relative overflow-hidden"
      style={{ background: "linear-gradient(150deg, #113627 0%, #0A2A1F 60%, #071F16 100%)" }}
    >
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(201,163,78,0.14) 0%, transparent 65%)",
          transform: "translate(30%, -30%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(47,107,79,0.18) 0%, transparent 65%)",
          transform: "translate(-30%, 30%)",
        }}
      />
      {/* Reusable physical-media depth layer for the interior pages. */}
      <motion.div
        className="absolute right-[9%] top-20 hidden lg:block opacity-80"
        animate={{ y: [0, -12, 0], rotate: [6, 10, 6] }}
        transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut" }}
        style={{ filter: "drop-shadow(0 22px 20px rgba(44,24,16,.18))" }}
        aria-hidden="true"
      >
        <AnimatedMiniDV width={155} />
      </motion.div>
      <motion.div
        className="absolute bottom-7 right-[20%] hidden lg:block opacity-70"
        animate={{ y: [0, 9, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: .6 }}
        aria-hidden="true"
      >
        <AnimatedDVD size={95} />
      </motion.div>
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <FadeIn>
          <span className="inline-block bg-accent/12 text-accent font-bold text-sm px-5 py-2.5 rounded-full mb-7 tracking-widest uppercase">
            {tag}
          </span>
        </FadeIn>
        <h1
          className="font-display font-bold text-foreground leading-[1.08] mb-6"
          style={{ fontSize: "clamp(2.6rem, 6vw, 5rem)" }}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="text-xl md:text-2xl text-foreground/60 leading-relaxed max-w-2xl">
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
