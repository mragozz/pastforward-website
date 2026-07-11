import { useState } from "react";
import { motion } from "motion/react";
import { AnimatedVHS } from "../components/media";
import { FadeIn } from "../components/ui";

type Form = {
  name: string; email: string; phone: string;
  address: string; tapeTypes: string; quantity: string; notes: string;
};

const initialForm: Form = { name: "", email: "", phone: "", address: "", tapeTypes: "", quantity: "", notes: "" };

function Field({
  label, required, children,
}: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-lg font-semibold text-foreground mb-2">
        {label} {required && <span className="text-accent">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full bg-input-background border border-border rounded-xl px-5 py-4 text-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all";

export default function ContactPage() {
  const [form, setForm] = useState<Form>(initialForm);
  const [submitted, setSubmitted] = useState(false);

  function set(key: keyof Form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent("Past Forward Indy — Order Request");
    const body = encodeURIComponent(
      `Name: ${form.name}
Email: ${form.email}
Phone: ${form.phone}
Pickup Address: ${form.address}
Tape/DVD Types: ${form.tapeTypes}
Quantity: ${form.quantity}
Additional Notes: ${form.notes}`
    );
    window.open(`mailto:orders@pastforwardindy.com?subject=${subject}&body=${body}`);
    setSubmitted(true);
  }

  return (
    <>
      {/* Hero */}
      <section
        className="pt-40 pb-20 relative overflow-hidden"
        style={{ background: "linear-gradient(150deg, #FBF7F0 0%, #F5EDD8 55%, #EAE0CE 100%)" }}
      >
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(232,96,48,0.14) 0%, transparent 65%)", transform: "translate(30%,-30%)" }} />
        <div className="max-w-6xl mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <FadeIn>
              <span className="inline-block bg-accent/12 text-accent font-bold text-sm px-5 py-2.5 rounded-full mb-7 tracking-widest uppercase">
                Get Started
              </span>
            </FadeIn>
            <div className="overflow-hidden mb-2">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="font-display font-bold text-foreground leading-[1.08]"
                style={{ fontSize: "clamp(2.6rem, 5.5vw, 4.4rem)" }}
              >
                Ready to preserve
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-8">
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.8, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="font-display font-bold leading-[1.08]"
                style={{ fontSize: "clamp(2.6rem, 5.5vw, 4.4rem)" }}
              >
                <em className="not-italic text-accent">your memories?</em>
              </motion.div>
            </div>
            <FadeIn delay={0.45}>
              <p className="text-xl text-foreground/60 leading-relaxed mb-8 max-w-lg">
                Fill out the form and I'll get back to you within 24 hours to
                schedule your free, personal pickup anywhere in the Indianapolis area.
              </p>
            </FadeIn>
            <FadeIn delay={0.6}>
              <div className="flex flex-col gap-4 text-base text-foreground/55">
                <div className="flex items-center gap-3"><span className="text-accent font-bold text-lg">✓</span> Free pickup anywhere in Indianapolis</div>
                <div className="flex items-center gap-3"><span className="text-accent font-bold text-lg">✓</span> Response within 24 hours</div>
                <div className="flex items-center gap-3"><span className="text-accent font-bold text-lg">✓</span> 100% originals returned</div>
              </div>
            </FadeIn>
          </div>

          <FadeIn direction="right" delay={0.2}>
            <motion.div
              animate={{ y: [0, -16, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <AnimatedVHS width={400} />
            </motion.div>
          </FadeIn>
        </div>
      </section>

      {/* Form */}
      <section className="py-24 bg-background">
        <div className="max-w-3xl mx-auto px-6">
          {submitted ? (
            <FadeIn>
              <div className="bg-primary/6 border border-primary/20 rounded-3xl p-16 text-center">
                <div className="text-7xl mb-6">🎉</div>
                <h2 className="font-display text-4xl font-bold mb-4">Your email client opened!</h2>
                <p className="text-xl text-foreground/60 mb-8 leading-relaxed">
                  If it didn't, email me directly at{" "}
                  <a href="mailto:orders@pastforwardindy.com"
                    className="text-primary font-bold underline underline-offset-2 hover:text-accent transition-colors">
                    orders@pastforwardindy.com
                  </a>
                </p>
                <button
                  onClick={() => { setForm(initialForm); setSubmitted(false); }}
                  className="bg-primary text-white font-bold px-10 py-4 rounded-2xl hover:bg-[#135761] transition-colors text-lg"
                >
                  Submit Another Request
                </button>
              </div>
            </FadeIn>
          ) : (
            <FadeIn>
              <form onSubmit={handleSubmit} className="bg-card rounded-3xl p-8 md:p-12 border border-border shadow-sm space-y-7">
                <div className="grid sm:grid-cols-2 gap-6">
                  <Field label="Your Name" required>
                    <input required type="text" placeholder="Jane Smith" value={form.name} onChange={set("name")} className={inputClass} />
                  </Field>
                  <Field label="Email Address" required>
                    <input required type="email" placeholder="jane@email.com" value={form.email} onChange={set("email")} className={inputClass} />
                  </Field>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <Field label="Phone Number">
                    <input type="tel" placeholder="(317) 555-0100" value={form.phone} onChange={set("phone")} className={inputClass} />
                  </Field>
                  <Field label="Pickup Address" required>
                    <input required type="text" placeholder="123 Main St, Indianapolis, IN" value={form.address} onChange={set("address")} className={inputClass} />
                  </Field>
                </div>

                <Field label="Tape / DVD Types" required>
                  <input required type="text" placeholder="e.g. VHS, Hi8, MiniDV, DVD..." value={form.tapeTypes} onChange={set("tapeTypes")} className={inputClass} />
                </Field>

                <Field label="How Many Tapes / Discs?" required>
                  <input required type="text" placeholder="e.g. 8 VHS tapes, 3 DVDs" value={form.quantity} onChange={set("quantity")} className={inputClass} />
                </Field>

                <Field label="Additional Notes">
                  <textarea
                    rows={4}
                    placeholder="Rush order? Special requests? Questions about your tapes? Anything else I should know..."
                    value={form.notes}
                    onChange={set("notes")}
                    className={`${inputClass} resize-none`}
                  />
                </Field>

                {/* Rush toggle */}
                <div className="flex items-start gap-4 bg-accent/6 rounded-xl p-5 border border-accent/15">
                  <span className="text-2xl shrink-0">⚡</span>
                  <div>
                    <div className="font-semibold text-foreground mb-1">Need it faster? Rush + Editing available.</div>
                    <div className="text-foreground/60 text-base">
                      Add $25 to your order for priority turnaround and optional basic video editing. Just mention it in your notes above.
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-accent text-white text-xl font-bold py-5 rounded-2xl hover:bg-[#d05525] transition-colors shadow-xl shadow-accent/20 cursor-pointer"
                  >
                    Send My Order Request →
                  </motion.button>
                  <p className="text-center text-muted-foreground mt-5 text-lg">
                    Or email directly:{" "}
                    <a href="mailto:orders@pastforwardindy.com"
                      className="text-primary font-semibold hover:underline underline-offset-2">
                      orders@pastforwardindy.com
                    </a>
                  </p>
                </div>
              </form>
            </FadeIn>
          )}
        </div>
      </section>

      {/* Trust badges */}
      <section className="py-16 bg-secondary">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { emoji: "🔒", title: "100% Private", body: "Your videos are never shared or stored after delivery." },
              { emoji: "📞", title: "Fast Response", body: "I respond to every inquiry within 24 hours, usually much sooner." },
              { emoji: "🤝", title: "Personal Service", body: "A real person — not a company — handles your memories from start to finish." },
            ].map((t, i) => (
              <FadeIn key={i} delay={i * 0.12}>
                <div className="bg-card rounded-2xl p-7 border border-border text-center">
                  <div className="text-4xl mb-4">{t.emoji}</div>
                  <h3 className="font-display text-xl font-bold mb-2">{t.title}</h3>
                  <p className="text-foreground/60 leading-relaxed">{t.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
