import { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";
import { Link } from "react-router";
import { AnimatedVHS, AnimatedDVD } from "../components/media";
import { FadeIn, PageHero } from "../components/ui";

const steps = [
  { n: "01", emoji: "📱", title: "You Reach Out",
    body: "Fill out the order form or send a message. Tell me your tape types and quantities — I'll get back to you quickly to schedule a pickup time that works for you.", color: "#E86030" },
  { n: "02", emoji: "🚗", title: "I Pick Up Your Tapes",
    body: "I come to you — anywhere in the Indianapolis metro area. I carefully collect every original tape and disc, wrapped and protected for transport.", color: "#1A6B78" },
  { n: "03", emoji: "💻", title: "I Digitize Everything",
    body: "Using professional capture equipment, I convert each tape to a high-quality MP4 file. Every conversion gets a quality check — no guessing, no shortcuts.", color: "#E86030" },
  { n: "04", emoji: "☁️", title: "Your Files Are Ready",
    body: "You'll receive a private Google Drive link or files delivered on a USB/hard drive — organized, labeled, and ready to watch on any device.", color: "#1A6B78" },
  { n: "05", emoji: "🎁", title: "I Return Your Originals",
    body: "I personally return every original tape and disc. Nothing is kept, discarded, or damaged. You'll have both your originals and your new digital copies.", color: "#E86030" },
];

export default function ProcessPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.max(0, Math.min(1, (vh * 0.75 - rect.top) / (rect.height * 0.9)));
      setProgress(p);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const lineH = 900;

  return (
    <>
      <PageHero
        tag="How It Works"
        title={<>From dusty tape to<br /><em className="not-italic text-accent">digital memory.</em></>}
        subtitle="A simple, personal, five-step process — handled entirely by me, start to finish. No shipping risk. No strangers. Just careful, local service."
      >
        <FadeIn delay={0.35}>
          <div className="mt-9 flex max-w-2xl flex-wrap gap-3 text-sm font-bold text-foreground/70">
            {["Pickup confirmed", "Conversion underway", "Ready for return"].map((item, index) => (
              <span key={item} className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white/60 px-4 py-2.5 shadow-sm">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-white">{index + 1}</span>
                {item}
              </span>
            ))}
          </div>
        </FadeIn>
      </PageHero>

      {/* Step-by-step with animated path */}
      <section className="py-24 bg-background" ref={sectionRef}>
        <div className="max-w-4xl mx-auto px-6">
          <div className="relative">
            {/* Animated vertical line */}
            <div
              className="absolute left-8 top-10 w-0.5 overflow-hidden"
              style={{ height: lineH, zIndex: 0 }}
              aria-hidden
            >
              {/* Track */}
              <div className="absolute inset-0 bg-border" />
              {/* Progress fill */}
              <motion.div
                className="absolute top-0 left-0 w-full bg-accent"
                style={{ height: `${progress * 100}%`, transition: "height 0.08s linear" }}
              />
            </div>

            <div className="space-y-14 relative z-10">
              {steps.map((step, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="flex gap-8 items-start">
                    {/* Step bubble */}
                    <motion.div
                      className="shrink-0 w-16 h-16 rounded-full flex items-center justify-center font-display text-lg font-bold text-white shadow-lg relative z-10"
                      style={{
                        background: progress > (i / steps.length) ? step.color : "#EDE4D6",
                        color: progress > (i / steps.length) ? "white" : "#8B6E58",
                        transition: "background 0.4s ease, color 0.4s ease",
                        boxShadow: progress > (i / steps.length) ? `0 8px 24px ${step.color}40` : "none",
                      }}
                    >
                      {step.n}
                    </motion.div>

                    {/* Card */}
                    <div className="flex-1 bg-card rounded-2xl p-8 border border-border shadow-sm hover:shadow-md transition-shadow duration-300">
                      <div className="flex items-start gap-5">
                        <span className="text-4xl shrink-0">{step.emoji}</span>
                        <div>
                          <h3 className="font-display text-2xl font-bold mb-3">{step.title}</h3>
                          <p className="text-foreground/62 text-lg leading-relaxed">{step.body}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What sets us apart */}
      <section className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <h2 className="font-display text-4xl font-bold text-center mb-12">
              What makes this different
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-7">
            {[
              { emoji: "🤝", title: "100% Personal", body: "No drop boxes, no shipping, no strangers. I personally handle every tape from pickup to return." },
              { emoji: "📍", title: "Truly Local", body: "I serve only the Indianapolis area — which means faster turnaround, personal accountability, and a face behind the service." },
              { emoji: "🏠", title: "Free Pickup & Return", body: "I come to you — your home, your office, wherever works. No driving required on your end." },
            ].map((v, i) => (
              <FadeIn key={i} delay={i * 0.13}>
                <div className="bg-card rounded-2xl p-8 border border-border text-center">
                  <div className="text-5xl mb-5">{v.emoji}</div>
                  <h3 className="font-display text-xl font-bold mb-3">{v.title}</h3>
                  <p className="text-foreground/60 leading-relaxed">{v.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Media showcase with 3D */}
      <section className="py-20 bg-background overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1">
              <FadeIn direction="left">
                <span className="inline-block bg-accent/10 text-accent font-bold text-sm px-5 py-2.5 rounded-full mb-6 tracking-widest uppercase">
                  All Formats Welcome
                </span>
                <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  If it plays video,<br />I can digitize it.
                </h2>
                <p className="text-xl text-foreground/60 leading-relaxed mb-8">
                  VHS, Hi8, MiniDV, DVD — every major home video format from
                  the last 50 years. If you're unsure what you have, just bring
                  it and I'll identify it for free.
                </p>
                <Link to="/contact">
                  <motion.span
                    whileHover={{ scale: 1.03, y: -1 }}
                    className="inline-block bg-primary text-white font-bold text-lg px-8 py-4 rounded-2xl hover:bg-[#135761] transition-colors cursor-pointer shadow-lg shadow-primary/20"
                  >
                    Start an Order →
                  </motion.span>
                </Link>
              </FadeIn>
            </div>
            <div className="flex-1 flex items-center justify-center gap-8 flex-wrap">
              <FadeIn delay={0.1}>
                <motion.div
                  animate={{ y: [0, -16, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <AnimatedVHS width={300} />
                </motion.div>
              </FadeIn>
              <FadeIn delay={0.25}>
                <motion.div
                  animate={{ y: [0, -10, 0], rotate: [0, 8, 0] }}
                  transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
                >
                  <AnimatedDVD size={160} />
                </motion.div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
