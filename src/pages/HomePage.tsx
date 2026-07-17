import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "motion/react";
import { Star, ArrowRight, Clock, Shield, Heart } from "lucide-react";
import { AnimatedVHS, AnimatedDVD, AnimatedMiniDV, CinematicTapeStack, MemoryTransferJourney } from "../components/media";
import { FadeIn, RevealLine, CountUp, TiltCard, Marquee } from "../components/ui";

/* ── Formats marquee items ────────────────────────────────────── */
const formatItems = ["VHS", "Hi8", "MiniDV", "Camcorder", "Digital8", "DVD", "VHS-C", "8mm"].map((f) => (
  <span key={f} className="flex items-center gap-4 text-foreground/40 font-semibold text-lg uppercase tracking-widest">
    <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
    {f}
  </span>
));

/* ── Testimonials ─────────────────────────────────────────────── */
const testimonials = [
  { name: "Amy D.", rating: 5,
    quote: "Megan converted quite a few videotapes of our old home movies for us. One of them included a very meaningful discussion with my grandmother that was very important to us. She is trustworthy, did a great job and finished quickly." },
  { name: "Judy S.", rating: 5,
    quote: "Best thing I ever did! I had Megan convert all of my family videos, VHS and DVDs, and am so thrilled with the result! She took care of everything and even organized them for me. We went from having no way to access and watch these precious memories to laughing and reminiscing about them at holiday gatherings. Now my videos are at the click of a button with everything digital! Megan has given us the greatest gift! She is super easy to work with and great at what she does! I would HIGHLY recommend!" },
  { name: "Greg V.", rating: 5,
    quote: "Megan converted our two VHS tape wedding videos to digital format. The tapes were over 20 years old, and she handled them with great care of professionalism. Very pleased with the results, and now we can be assured that these memories will be around and easy for us to access and share with our family for many years to come!" },
  { name: "Heather G.", rating: 5,
    quote: "Megan did a great job digitizing several videos for me. She was communicative and was done so fast! I’d recommend her without reservation." },
];

/* ── Preview cards ────────────────────────────────────────────── */
const previews = [
  {
    to: "/about",
    tag: "About Me",
    title: "The person behind\nevery tape.",
    body: "A Purdue CS student who started this because a box of old family tapes changed everything.",
    visual: <AnimatedMiniDV width={110} />,
    accent: "#E3C878",
  },
  {
    to: "/services",
    tag: "Services & Pricing",
    title: "Simple, honest\npricing.",
    body: "VHS from $18, DVDs from $13. No hidden fees, no fine print — just straightforward rates for every format.",
    visual: (
      <div className="flex items-end gap-1">
        <span className="font-display text-4xl font-bold text-foreground">$18</span>
        <span className="text-muted-foreground mb-1">/ tape</span>
      </div>
    ),
    accent: "#8FB89E",
  },
  {
    to: "/process",
    tag: "How It Works",
    title: "Pickup, digitize,\ndeliver.",
    body: "I personally pick up your tapes anywhere in Indy, convert them with care, and return every original.",
    visual: (
      <div className="flex items-center gap-2">
        {["01", "02", "03", "04", "05"].map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-accent/15 flex items-center justify-center text-accent text-xs font-bold">{s}</div>
            {i < 4 && <div className="w-4 h-px bg-border" />}
          </div>
        ))}
      </div>
    ),
    accent: "#E3C878",
  },
  {
    to: "/faqs",
    tag: "FAQs",
    title: "Got questions?\nWe have answers.",
    body: "Turnaround times, accepted formats, pickup details, payment — everything you need to know before getting started.",
    visual: (
      <div className="space-y-2 text-left">
        {["How long does it take?", "What formats work?"].map((q) => (
          <div key={q} className="bg-muted rounded-lg px-3 py-2 text-sm font-medium text-foreground/70">{q}</div>
        ))}
      </div>
    ),
    accent: "#8FB89E",
  },
];

export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });

  const textY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const tapeY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Mouse tracking for 3D VHS tilt
  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);
  const mouseX = useSpring(rawMouseX, { stiffness: 55, damping: 28 });
  const mouseY = useSpring(rawMouseY, { stiffness: 55, damping: 28 });
  const [mxVal, setMxVal] = useState(0);
  const [myVal, setMyVal] = useState(0);

  useEffect(() => {
    return mouseX.on("change", setMxVal);
  }, [mouseX]);
  useEffect(() => {
    return mouseY.on("change", setMyVal);
  }, [mouseY]);

  function onMouseMove(e: React.MouseEvent<HTMLElement>) {
    rawMouseX.set(e.clientX / window.innerWidth - 0.5);
    rawMouseY.set(e.clientY / window.innerHeight - 0.5);
  }

  return (
    <>
      {/* ══ HERO ══════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        onMouseMove={onMouseMove}
        className="min-h-screen flex items-center relative overflow-hidden"
        style={{ background: "linear-gradient(150deg, #113627 0%, #0A2A1F 50%, #071F16 100%)" }}
      >
        {/* Background gradient blobs */}
        <motion.div
          className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(201,163,78,0.14) 0%, transparent 65%)", transform: "translate(30%,-30%)", y: tapeY }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(47,107,79,0.2) 0%, transparent 65%)", transform: "translate(-30%,30%)", y: tapeY }}
        />

        <div className="max-w-7xl mx-auto px-6 pt-28 pb-16 grid md:grid-cols-2 gap-8 items-center relative z-10 w-full">
          {/* Left: copy */}
          <motion.div style={{ y: textY, opacity: heroOpacity }}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="inline-flex items-center gap-2 bg-accent/12 text-accent font-bold text-sm px-5 py-2.5 rounded-full mb-8 tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                Indianapolis Memory Preservation
              </span>
            </motion.div>

            <div className="overflow-hidden mb-2">
              <motion.h1
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="font-display font-bold text-foreground leading-[1.06]"
                style={{ fontSize: "clamp(3rem, 7vw, 5.2rem)" }}
              >
                Your Old Tapes
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-2">
              <motion.div
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.8, delay: 0.33, ease: [0.22, 1, 0.36, 1] }}
                className="font-display font-bold leading-[1.06]"
                style={{ fontSize: "clamp(3rem, 7vw, 5.2rem)" }}
              >
                <em className="not-italic text-accent">Deserve</em>{" "}
                <span className="text-foreground">to</span>
              </motion.div>
            </div>
            <div className="overflow-hidden mb-8">
              <motion.div
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.8, delay: 0.46, ease: [0.22, 1, 0.36, 1] }}
                className="font-display font-bold text-foreground leading-[1.06]"
                style={{ fontSize: "clamp(3rem, 7vw, 5.2rem)" }}
              >
                Live Again.
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="text-xl md:text-2xl text-foreground/62 leading-relaxed mb-10 max-w-lg"
            >
              VHS, Hi8, MiniDV, DVDs — converted into crisp digital files
              your family can watch, share, and keep forever.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.75 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <Link to="/contact">
                <motion.span
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-block bg-accent text-accent-foreground text-xl font-bold px-10 py-5 rounded-2xl shadow-lg shadow-accent/25 hover:bg-[#F0DA96] transition-colors cursor-pointer"
                >
                  Start My Order →
                </motion.span>
              </Link>
              <Link to="/process">
                <motion.span
                  whileHover={{ scale: 1.02 }}
                  className="inline-block bg-foreground/8 text-foreground text-xl font-semibold px-10 py-5 rounded-2xl border border-foreground/14 hover:bg-foreground/12 transition-colors cursor-pointer"
                >
                  See How It Works
                </motion.span>
              </Link>
            </motion.div>

            {/* Quick trust row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.9 }}
              className="flex flex-wrap gap-6 text-sm text-foreground/50 font-semibold"
            >
              <span className="flex items-center gap-2"><span className="text-accent text-base">✓</span> 260+ tapes converted</span>
              <span className="flex items-center gap-2"><span className="text-accent text-base">✓</span> 3-day avg turnaround</span>
              <span className="flex items-center gap-2"><span className="text-accent text-base">✓</span> 100% originals returned</span>
            </motion.div>
          </motion.div>

          {/* Right: cinematic 3D tape stack */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={{ y: tapeY }}
            className="hidden md:block relative"
          >
            <div className="relative" style={{ height: 520 }}>
              <CinematicTapeStack mouseX={mxVal} mouseY={myVal} />
            </div>
          </motion.div>
        </div>

        {/* Scroll arrow */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-foreground/30"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ opacity: heroOpacity }}
        >
          <span className="text-xs font-bold tracking-[0.2em] uppercase">Scroll</span>
          <div className="w-px h-8 bg-foreground/20 rounded" />
        </motion.div>
      </section>

      {/* ══ THE TRANSFER JOURNEY ══════════════════════════════════ */}
      <section className="bg-background px-6 py-8 md:py-12">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="mb-8 text-center">
              <span className="inline-block rounded-full bg-accent/10 px-5 py-2.5 text-sm font-bold tracking-widest text-accent uppercase">The memory transfer</span>
              <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-foreground/60">Watch the journey your memories take—from a treasured tape to a digital file your whole family can enjoy.</p>
            </div>
          </FadeIn>
          <MemoryTransferJourney />
        </div>
      </section>

      {/* ══ FORMAT MARQUEE ════════════════════════════════════════ */}
      <div className="bg-background overflow-hidden">
        <div className="rainbow-stripe" />
        <div className="py-5">
          <Marquee items={formatItems} speed={22} />
        </div>
        <div className="rainbow-stripe" />
      </div>

      {/* ══ WHY IT MATTERS ════════════════════════════════════════ */}
      <section className="py-28 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block bg-primary/8 text-primary font-bold text-sm px-5 py-2.5 rounded-full mb-6 tracking-widest uppercase">
                Why It Matters
              </span>
              <h2 className="font-display font-bold text-foreground leading-tight mb-5"
                style={{ fontSize: "clamp(2rem, 4.5vw, 3.8rem)" }}>
                Your Memories Are Running Out of Time
              </h2>
              <p className="text-xl text-foreground/55 max-w-2xl mx-auto leading-relaxed">
                Magnetic tape degrades every decade — color fades, audio warps,
                and tape grows brittle. The longer you wait, the more you risk.
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-7">
            {[
              { Icon: Clock, color: "text-accent", bg: "bg-accent/8", title: "Tapes Don't Last Forever",
                body: "VHS and camcorder tapes lose quality year after year. Once tape snaps or the player disappears, irreplaceable moments are gone." },
              { Icon: Heart, color: "text-primary", bg: "bg-primary/8", title: "These Are Family Treasures",
                body: "Birthdays, holidays, first steps, voices of loved ones who are no longer here. They deserve more than a dusty shelf." },
              { Icon: Shield, color: "text-accent", bg: "bg-accent/8", title: "Digital Lasts Forever",
                body: "A properly saved file can be backed up, shared anywhere in the world, and played on any device — for generations." },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.13}>
                <TiltCard className="bg-card rounded-2xl p-8 border border-border h-full">
                  <div className={`${item.bg} rounded-xl w-14 h-14 flex items-center justify-center mb-6`}>
                    <item.Icon size={28} className={item.color} strokeWidth={1.75} />
                  </div>
                  <h3 className="font-display text-2xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-foreground/60 text-lg leading-relaxed">{item.body}</p>
                </TiltCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══ STATS COUNT-UP ════════════════════════════════════════ */}
      <section className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #14402F 0%, #071F16 100%)" }}>
        {/* Background tape reel decoration */}
        <motion.div
          className="absolute right-[-80px] top-1/2 -translate-y-1/2 opacity-[0.06]"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          <svg viewBox="0 0 300 300" width="360" height="360" fill="none">
            <circle cx="150" cy="150" r="140" stroke="white" strokeWidth="4" />
            <circle cx="150" cy="150" r="95" stroke="white" strokeWidth="3" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
              <line key={a}
                x1={150 + 95 * Math.cos((a * Math.PI) / 180)}
                y1={150 + 95 * Math.sin((a * Math.PI) / 180)}
                x2={150 + 135 * Math.cos((a * Math.PI) / 180)}
                y2={150 + 135 * Math.sin((a * Math.PI) / 180)}
                stroke="white" strokeWidth="4" strokeLinecap="round"
              />
            ))}
            <circle cx="150" cy="150" r="30" fill="white" opacity="0.4" />
          </svg>
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-white">
            {[
              { target: 260, suffix: "+", label: "Tapes Converted" },
              { target: 3, suffix: " Days", label: "Average Turnaround" },
              { target: 2, prefix: "≤", suffix: " Weeks", label: "Most Orders Done" },
              { target: 100, suffix: "%", label: "Originals Returned" },
            ].map((stat, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="text-center">
                  <div className="font-display font-bold text-white leading-none mb-3"
                    style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}>
                    <CountUp target={stat.target} suffix={stat.suffix} prefix={stat.prefix ?? ""} />
                  </div>
                  <div className="text-white/60 font-semibold uppercase tracking-widest text-sm">
                    {stat.label}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION PREVIEW CARDS ═════════════════════════════════ */}
      <section className="py-28 bg-secondary">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block bg-accent/10 text-accent font-bold text-sm px-5 py-2.5 rounded-full mb-6 tracking-widest uppercase">
                Explore
              </span>
              <h2 className="font-display font-bold text-foreground leading-tight"
                style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}>
                Everything You Need to Know
              </h2>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {previews.map((card, i) => (
              <FadeIn key={card.to} delay={i * 0.1}>
                <TiltCard scale={1.02} className="h-full">
                  <Link to={card.to} className="block h-full bg-card rounded-2xl border border-border overflow-hidden group hover:border-accent/40 transition-all duration-300 hover:shadow-xl hover:shadow-accent/10">
                    {/* Visual area */}
                    <div className="h-48 bg-muted/50 flex items-center justify-center p-6 overflow-hidden relative">
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: `radial-gradient(circle at 50% 50%, ${card.accent}18 0%, transparent 70%)` }}
                      />
                      <div className="relative z-10">
                        {card.visual}
                      </div>
                    </div>
                    {/* Text */}
                    <div className="p-7">
                      <div className="text-xs font-bold tracking-widest uppercase mb-3"
                        style={{ color: card.accent }}>
                        {card.tag}
                      </div>
                      <h3 className="font-display text-xl font-bold mb-3 whitespace-pre-line leading-snug">
                        {card.title}
                      </h3>
                      <p className="text-foreground/60 leading-relaxed mb-5 text-base">
                        {card.body}
                      </p>
                      <span className="inline-flex items-center gap-2 font-bold text-sm"
                        style={{ color: card.accent }}>
                        Explore <ArrowRight size={15} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </Link>
                </TiltCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ══════════════════════════════════════════ */}
      <section className="py-28 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block bg-accent/10 text-accent font-bold text-sm px-5 py-2.5 rounded-full mb-6 tracking-widest uppercase">
                Customer Stories
              </span>
              <h2 className="font-display font-bold text-foreground leading-tight"
                style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}>
                Real Families, Real Memories
              </h2>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-7">
            {testimonials.map((t, i) => (
              <FadeIn key={i} delay={i * 0.13}>
                <TiltCard className="bg-card rounded-2xl p-8 border border-border flex flex-col gap-5 h-full">
                  <div className="flex gap-1">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} size={18} className="text-accent fill-accent" />
                    ))}
                  </div>
                  <p className="text-foreground/75 text-lg leading-relaxed flex-1 italic">
                    "{t.quote}"
                  </p>
                  <div className="border-t border-border pt-5">
                    <div className="font-semibold text-foreground text-lg">{t.name}</div>
                    <div className="text-muted-foreground">{t.location}</div>
                  </div>
                </TiltCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FILM STRIP DIVIDER ════════════════════════════════════ */}
      <div className="bg-[#051710] py-5 overflow-hidden relative">
        {/* Top perforations */}
        <div className="absolute top-0 left-0 right-0 h-[18px] flex items-center px-3 gap-3">
          {Array.from({ length: 80 }).map((_, i) => (
            <div key={i} className="w-5 h-3 rounded-sm bg-white/15 shrink-0" />
          ))}
        </div>
        <div className="py-2 overflow-hidden">
          <Marquee
            items={[
              "Preserve Before They Fade",
              "VHS · Hi8 · MiniDV · DVD",
              "Indianapolis, Indiana",
              "Personal Pickup & Delivery",
              "3-Day Average Turnaround",
              "100% Private & Secure",
            ].map((s, i) => (
              <span key={i} className="text-white/50 font-semibold tracking-wider text-sm uppercase px-8">{s}</span>
            ))}
            speed={35}
          />
        </div>
        {/* Bottom perforations */}
        <div className="absolute bottom-0 left-0 right-0 h-[18px] flex items-center px-3 gap-3">
          {Array.from({ length: 80 }).map((_, i) => (
            <div key={i} className="w-5 h-3 rounded-sm bg-white/15 shrink-0" />
          ))}
        </div>
      </div>

      {/* ══ FINAL CTA ═════════════════════════════════════════════ */}
      <section className="py-20 md:py-24 bg-secondary relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(201,163,78,0.12) 0%, transparent 65%)" }}
        />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <FadeIn>
            <div className="mb-7">
              <AnimatedDVD size={94} />
            </div>
          </FadeIn>
          <RevealLine className="font-display font-bold text-foreground leading-tight mb-6"
            style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.4rem)" } as React.CSSProperties}>
            Don't let another decade pass.
          </RevealLine>
          <FadeIn delay={0.2}>
            <p className="text-xl md:text-2xl text-foreground/60 mb-7 leading-relaxed max-w-2xl mx-auto">
              Every year you wait, your tapes degrade a little more.
            </p>
          </FadeIn>
          <FadeIn delay={0.28}>
            <div className="mx-auto mb-8 flex max-w-2xl flex-wrap justify-center gap-3 text-sm font-semibold text-foreground/70">
              {["Free local pickup", "Personal updates", "Every original returned"].map((item) => (
                <span key={item} className="rounded-full border border-primary/25 bg-white/8 px-4 py-2.5 shadow-sm">{item}</span>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={0.38}>
            <Link to="/contact">
              <motion.span
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.97 }}
                className="inline-block bg-accent text-accent-foreground text-xl md:text-2xl font-bold px-11 py-5 rounded-2xl shadow-2xl shadow-accent/30 hover:bg-[#F0DA96] transition-colors cursor-pointer"
              >
                Start My Order →
              </motion.span>
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
