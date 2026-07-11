import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { FadeIn, TiltCard } from "../components/ui";

export default function AboutPage() {
  const photoRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: photoRef, offset: ["start end", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <>
      {/* Hero */}
      <section
        className="pt-40 pb-24 relative overflow-hidden"
        style={{ background: "linear-gradient(150deg, #FBF7F0 0%, #F5EDD8 60%, #EAE0CE 100%)" }}
      >
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(232,96,48,0.14) 0%, transparent 65%)", transform: "translate(30%,-30%)" }}
        />
        <div className="max-w-6xl mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <FadeIn>
              <span className="inline-block bg-accent/12 text-accent font-bold text-sm px-5 py-2.5 rounded-full mb-7 tracking-widest uppercase">
                About Me
              </span>
            </FadeIn>
            <div className="overflow-hidden mb-3">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="font-display font-bold text-foreground leading-[1.08]"
                style={{ fontSize: "clamp(2.8rem, 6vw, 4.6rem)" }}
              >
                Hi — I'm the person
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-8">
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.8, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="font-display font-bold leading-[1.08]"
                style={{ fontSize: "clamp(2.8rem, 6vw, 4.6rem)" }}
              >
                <em className="not-italic text-accent">behind</em>{" "}
                <span className="text-foreground">the tapes.</span>
              </motion.div>
            </div>
            <FadeIn delay={0.4}>
              <p className="text-xl text-foreground/62 leading-relaxed mb-8 max-w-lg">
                A Computer Science student at Purdue University who started this
                because he believes no family should lose their memories to a
                broken VHS deck.
              </p>
            </FadeIn>
            <FadeIn delay={0.55}>
              <div className="flex items-center gap-4 text-sm text-foreground/45 font-semibold">
                <div className="flex flex-col">
                  <span className="text-foreground font-bold text-lg">Purdue University</span>
                  <span className="text-muted-foreground">Computer Science · Boilermaker</span>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Photo */}
          <FadeIn direction="right" delay={0.2}>
            <div ref={photoRef} className="relative max-w-sm mx-auto">
              <motion.div
                className="aspect-[3/4] rounded-3xl overflow-hidden bg-muted relative shadow-2xl"
                style={{ y: photoY }}
              >
                <img
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&h=800&fit=crop&auto=format"
                  alt="Owner of Past Forward Indy — CS student at Purdue University"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(26,107,120,0.35) 0%, transparent 60%)" }} />
              </motion.div>
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6, type: "spring" }}
                className="absolute -bottom-5 -right-5 bg-accent text-white rounded-2xl px-6 py-4 shadow-xl shadow-accent/30"
              >
                <div className="font-display text-2xl font-bold leading-none">CS</div>
                <div className="text-sm font-semibold opacity-90 mt-1">Purdue</div>
              </motion.div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Story */}
      <section className="py-28 bg-background">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-20 items-start">
            <div>
              <FadeIn>
                <h2 className="font-display text-4xl font-bold mb-8 leading-tight">
                  How this all started.
                </h2>
              </FadeIn>
              <div className="space-y-6 text-lg text-foreground/65 leading-relaxed">
                <FadeIn delay={0.1}>
                  <p>
                    A few years ago, my family discovered a box of old VHS tapes
                    we hadn't touched in decades. Birthdays, Christmas mornings,
                    backyard barbecues — moments with relatives who are no longer
                    with us. The problem? Nobody had a VHS player anymore.
                  </p>
                </FadeIn>
                <FadeIn delay={0.2}>
                  <p>
                    I spent weeks figuring out how to get them digitized — the
                    equipment, the cables, the software. When we finally watched
                    those videos, my whole family was in tears. The sound of voices
                    we hadn't heard in years. The way my grandfather laughed.
                  </p>
                </FadeIn>
                <FadeIn delay={0.3}>
                  <p>
                    I realized other families had the same boxes sitting in their
                    basements, collecting dust, slowly losing the footage inside.
                    That's when Past Forward Indy was born.
                  </p>
                </FadeIn>
                <FadeIn delay={0.4}>
                  <p className="font-semibold text-foreground text-xl">
                    This isn't just how I pay for college. It's work I genuinely
                    love doing.
                  </p>
                </FadeIn>
              </div>
              <FadeIn delay={0.5}>
                <Link to="/contact">
                  <motion.span
                    whileHover={{ scale: 1.02, y: -1 }}
                    className="inline-flex items-center gap-2 mt-10 bg-primary text-white text-lg font-bold px-8 py-4 rounded-2xl hover:bg-[#135761] transition-colors shadow-lg shadow-primary/20 cursor-pointer"
                  >
                    Get in Touch <ArrowRight size={20} />
                  </motion.span>
                </Link>
              </FadeIn>
            </div>

            {/* Values */}
            <div className="space-y-5 pt-2">
              {[
                { emoji: "🎥", title: "Personally Handled — Always", body: "I pick up, I digitize, I return. No third parties, no shipping risk, no strangers handling your family heirlooms." },
                { emoji: "🔒", title: "Private & Secure", body: "Your footage is never shared or stored after the project is complete. Your memories stay yours." },
                { emoji: "❤️", title: "Treated Like My Own", body: "I handle every tape as if it held my own family's memories — because I know exactly what they're worth." },
                { emoji: "⚡", title: "Fast & Reliable", body: "Most orders are done in 3 days. I communicate clearly and return everything on time, every time." },
              ].map((v, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <TiltCard className="bg-card rounded-2xl p-6 border border-border">
                    <div className="flex items-start gap-5">
                      <span className="text-3xl mt-1">{v.emoji}</span>
                      <div>
                        <h3 className="font-display text-xl font-semibold mb-2">{v.title}</h3>
                        <p className="text-foreground/60 leading-relaxed">{v.body}</p>
                      </div>
                    </div>
                  </TiltCard>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
