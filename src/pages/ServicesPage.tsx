import { motion } from "motion/react";
import { Link } from "react-router";
import { AnimatedVHS, AnimatedDVD, AnimatedMiniDV } from "../components/media";
import { FadeIn, TiltCard, PageHero, Marquee } from "../components/ui";

const pricing = [
  { label: "VHS, Hi8, Camcorder & More", sub: "Tapes under 1 hour", price: 18, unit: "tape",
    visual: <AnimatedVHS width={160} />, highlight: false, badge: null },
  { label: "VHS, Hi8, Camcorder & More", sub: "Tapes over 1 hour", price: 20, unit: "tape",
    visual: <AnimatedVHS width={160} />, highlight: true, badge: "Most Common" },
  { label: "DVDs", sub: "Any length disc", price: 13, unit: "disc",
    visual: <AnimatedDVD size={130} />, highlight: false, badge: "Best Value" },
  { label: "Rush / Video Editing Add-On", sub: "Priority + editing", price: 25, unit: "add-on",
    visual: <AnimatedMiniDV width={130} />, highlight: false, badge: "Optional" },
];

const formats = ["VHS", "VHS-C", "Hi8", "8mm Camcorder", "Digital8", "MiniDV", "DVD"];

const formatMarquee = [...formats, ...formats].map((f, i) => (
  <span key={i} className="flex items-center gap-3 text-white/50 font-semibold text-sm uppercase tracking-widest">
    <span className="w-1 h-1 rounded-full bg-[#E3C878]" />
    {f}
  </span>
));

export default function ServicesPage() {
  return (
    <>
      <PageHero
        tag="Services & Pricing"
        title={<>Simple, honest<br /><em className="not-italic text-accent">pricing.</em></>}
        subtitle="No hidden fees. No fine print. Every format, clearly priced — because you deserve to know exactly what you're paying before you commit."
      />

      {/* Pricing cards */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-7 mb-14">
            {pricing.map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <TiltCard className="h-full">
                  <div
                    className={`relative rounded-2xl h-full flex flex-col border-2 overflow-hidden transition-all duration-300 ${
                      item.highlight
                        ? "bg-primary border-primary"
                        : "bg-card border-border hover:border-accent/45 hover:shadow-xl hover:shadow-accent/8"
                    }`}
                  >
                    {item.badge && (
                      <span className={`absolute top-4 right-4 text-xs font-bold px-3 py-1.5 rounded-full z-10 ${
                        item.highlight ? "bg-[#123222] text-[#E3C878]" : "bg-primary/12 text-primary"
                      }`}>
                        {item.badge}
                      </span>
                    )}
                    {/* Visual area */}
                    <div className={`flex items-center justify-center py-8 px-6 ${
                      item.highlight ? "bg-primary/80" : "bg-muted/40"
                    }`}>
                      {item.visual}
                    </div>
                    {/* Details */}
                    <div className={`flex flex-col flex-1 p-7 ${item.highlight ? "text-[#123222]" : ""}`}>
                      <h3 className={`font-display text-xl font-semibold mb-1 ${item.highlight ? "text-[#123222]" : "text-foreground"}`}>
                        {item.label}
                      </h3>
                      <p className={`text-sm mb-6 ${item.highlight ? "text-[#123222]/70" : "text-muted-foreground"}`}>
                        {item.sub}
                      </p>
                      <div className="mt-auto flex items-end gap-2">
                        <span className={`font-display text-5xl font-bold ${item.highlight ? "text-[#123222]" : "text-foreground"}`}>
                          ${item.price}
                        </span>
                        <span className={`mb-1.5 text-lg ${item.highlight ? "text-[#123222]/70" : "text-muted-foreground"}`}>
                          / {item.unit}
                        </span>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </FadeIn>
            ))}
          </div>

          {/* Accepted formats section */}
          <FadeIn>
            <div className="bg-[#051710] rounded-3xl overflow-hidden">
              <div className="px-10 pt-10 pb-6">
                <h2 className="font-display text-3xl font-bold text-white mb-2">Accepted Formats</h2>
                <p className="text-white/50 text-lg mb-8">Every major home video format from the last 50 years.</p>
                <div className="flex flex-wrap gap-3 mb-8">
                  {formats.map((f) => (
                    <span key={f} className="bg-white/8 text-white/80 font-semibold text-sm px-5 py-2.5 rounded-full border border-white/10">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
              <div className="border-t border-white/8 py-4">
                <Marquee items={formatMarquee} speed={20} />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Delivery options */}
      <section className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <h2 className="font-display text-4xl font-bold text-foreground text-center mb-12">
              Delivery Options
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-7">
            {[
              { title: "USB Flash Drive", body: "Your files on a physical USB drive — ready to plug into any TV, laptop, or computer. Great for sharing with family." },
              { title: "DVD", body: "Replace old or corrupted DVDs, or choose to preserve your VHS memories on new ones." },
            ].map((opt, i) => (
              <FadeIn key={i} delay={i * 0.13}>
                <TiltCard className="bg-card rounded-2xl p-8 border border-border h-full text-center">
                  <div className="text-5xl mb-5">{opt.emoji}</div>
                  <h3 className="font-display text-xl font-bold mb-3">{opt.title}</h3>
                  <p className="text-foreground/60 leading-relaxed">{opt.body}</p>
                </TiltCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-background">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <FadeIn>
            <h2 className="font-display text-5xl font-bold mb-6">Ready to get started?</h2>
            <p className="text-xl text-foreground/60 mb-10 leading-relaxed">
              Fill out a quick order form and I'll be in touch within 24 hours
              to schedule your free pickup.
            </p>
            <Link to="/contact">
              <motion.span
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-block bg-accent text-accent-foreground text-xl font-bold px-12 py-5 rounded-2xl shadow-xl shadow-accent/25 hover:bg-[#F0DA96] transition-colors cursor-pointer"
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
