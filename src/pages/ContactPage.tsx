import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { AnimatedVHS } from "../components/media";
import { FadeIn } from "../components/ui";

type Form = {
  name: string;
  email: string;
  phone: string;
  zipcode: string;
  tapeType: string;
  hasOriginalDevice: string; // "yes" | "no" | ""
  quantity: string;
  contactMethod: string; // "text" | "email" | "other"
  contactMethodOther: string;
  notes: string;
};

const initialForm: Form = {
  name: "",
  email: "",
  phone: "",
  zipcode: "",
  tapeType: "",
  hasOriginalDevice: "",
  quantity: "",
  contactMethod: "",
  contactMethodOther: "",
  notes: "",
};

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwWAafHUL8xiSdebl3WIceF3DBUCfpoxSvfXNTTBAgOGcYSLN-Zj8MpNX4wWFync1Iy/exec";

const TAPE_TYPES = ["VHS", "VHS-C", "8mm Camcorder", "Hi8", "Digital8", "MiniDVD", "DVD", "Mix of Multiple Formats"];
const DEVICE_CHECK_TYPES = ["8mm Camcorder", "Hi8", "Digital8", "MiniDVD"];

const ORIGIN_COORDS = { lat: 39.9067, lon: -86.1758 }; // 46260, Indianapolis, IN
const MAX_RADIUS_MILES = 40;

function milesBetween(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 3958.8; // earth radius in miles
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
  const [emailError, setEmailError] = useState("");
  const [zipTooFar, setZipTooFar] = useState(false);
  const [zipChecking, setZipChecking] = useState(false);

  function set(key: keyof Form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));
  }

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setForm((f) => ({ ...f, email: value }));
    if (emailError) setEmailError("");
  }

  function handleQuantityChange(e: React.ChangeEvent<HTMLInputElement>) {
    const digitsOnly = e.target.value.replace(/[^0-9]/g, "");
    setForm((f) => ({ ...f, quantity: digitsOnly }));
  }

  function handleZipChange(e: React.ChangeEvent<HTMLInputElement>) {
    const digitsOnly = e.target.value.replace(/[^0-9]/g, "").slice(0, 5);
    setForm((f) => ({ ...f, zipcode: digitsOnly }));
    setZipTooFar(false);
  }

  // Look up distance once a full 5-digit zip is entered
  useEffect(() => {
    if (form.zipcode.length !== 5) return;
    let cancelled = false;
    setZipChecking(true);
    fetch(`https://api.zippopotam.us/us/${form.zipcode}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (cancelled || !data?.places?.[0]) return;
        const lat = parseFloat(data.places[0].latitude);
        const lon = parseFloat(data.places[0].longitude);
        const dist = milesBetween(ORIGIN_COORDS.lat, ORIGIN_COORDS.lon, lat, lon);
        setZipTooFar(dist > MAX_RADIUS_MILES);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setZipChecking(false);
      });
    return () => { cancelled = true; };
  }, [form.zipcode]);

  function handleTapeTypeChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    setForm((f) => ({
      ...f,
      tapeType: value,
      hasOriginalDevice: DEVICE_CHECK_TYPES.includes(value) ? f.hasOriginalDevice : "",
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!EMAIL_REGEX.test(form.email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ ...form, zipTooFar }),
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    }
  }

  const showDeviceCheck = DEVICE_CHECK_TYPES.includes(form.tapeType);

  return (
    <>
      {/* Hero */}
      <section
        className="pt-40 pb-20 relative overflow-hidden"
        style={{ background: "linear-gradient(150deg, #113627 0%, #0A2A1F 55%, #071F16 100%)" }}
      >
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(201,163,78,0.14) 0%, transparent 65%)", transform: "translate(30%,-30%)" }} />
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
                <h2 className="font-display text-4xl font-bold mb-4">Your order has been received!</h2>
                <p className="text-xl text-foreground/60 mb-8 leading-relaxed">
                  If it didn't, email me directly at{" "}
                  <a href="mailto:indypastforward@gmail.com"
                    className="text-primary font-bold underline underline-offset-2 hover:text-accent transition-colors">
                    indypastforward@gmail.com
                  </a>
                </p>
                <button
                  onClick={() => { setForm(initialForm); setSubmitted(false); setEmailError(""); setZipTooFar(false); }}
                  className="bg-primary text-primary-foreground font-bold px-10 py-4 rounded-2xl hover:bg-[#D9B564] transition-colors text-lg"
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
                    <input
                      required
                      type="email"
                      placeholder="example@email.com"
                      value={form.email}
                      onChange={handleEmailChange}
                      onBlur={() => {
                        if (form.email && !EMAIL_REGEX.test(form.email)) {
                          setEmailError("Please enter a valid email address.");
                        }
                      }}
                      className={inputClass}
                    />
                    {emailError && (
                      <p className="text-accent text-sm mt-2 font-medium">{emailError}</p>
                    )}
                  </Field>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <Field label="Phone Number">
                    <input type="tel" placeholder="(317) 000-0000" value={form.phone} onChange={set("phone")} className={inputClass} />
                  </Field>
                  <Field label="Zip Code" required>
                    <input
                      required
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={5}
                      placeholder="46204"
                      value={form.zipcode}
                      onChange={handleZipChange}
                      className={inputClass}
                    />
                    {zipChecking && (
                      <p className="text-muted-foreground text-sm mt-2">Checking distance…</p>
                    )}
                    {!zipChecking && zipTooFar && (
                      <p className="text-accent text-sm mt-2 font-medium">
                        Heads up — this is more than {MAX_RADIUS_MILES} miles from Indianapolis (46260),
                        so pickup may be difficult. I'll reach out to sort out the details.
                      </p>
                    )}
                  </Field>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <Field label="Tape / DVD Type" required>
                    <select
                      required
                      value={form.tapeType}
                      onChange={handleTapeTypeChange}
                      className={inputClass}
                    >
                      <option value="" disabled>Select a type</option>
                      {TAPE_TYPES.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </Field>

                  <Field label="How Many?" required>
                    <input
                      required
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      placeholder="e.g. 8"
                      value={form.quantity}
                      onChange={handleQuantityChange}
                      className={inputClass}
                    />
                  </Field>
                </div>

                {showDeviceCheck && (
                  <div className="sticky-note relative flex items-start gap-4 p-5">
                    <span className="text-2xl shrink-0">📼</span>
                    <div className="w-full">
                      <div className="font-hand text-2xl font-bold text-[#2B1B0E] mb-2 leading-tight">
                        Do you still have the original recording device?
                      </div>
                      <div className="text-[#2B1B0E]/75 text-base mb-3">
                        For {form.tapeType}, having the original camcorder/player on hand can help if there are playback issues.
                      </div>
                      <div className="flex gap-6">
                        <label className="flex items-center gap-2 text-[#2B1B0E] font-semibold cursor-pointer">
                          <input
                            type="radio"
                            name="hasOriginalDevice"
                            value="yes"
                            checked={form.hasOriginalDevice === "yes"}
                            onChange={set("hasOriginalDevice")}
                          />
                          Yes
                        </label>
                        <label className="flex items-center gap-2 text-[#2B1B0E] font-semibold cursor-pointer">
                          <input
                            type="radio"
                            name="hasOriginalDevice"
                            value="no"
                            checked={form.hasOriginalDevice === "no"}
                            onChange={set("hasOriginalDevice")}
                          />
                          No
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                <Field label="Preferred Method of Communication" required>
                  <select
                    required
                    value={form.contactMethod}
                    onChange={set("contactMethod")}
                    className={inputClass}
                  >
                    <option value="" disabled>Select an option</option>
                    <option value="text">Text</option>
                    <option value="email">Email</option>
                    <option value="other">Other</option>
                  </select>
                  {form.contactMethod === "other" && (
                    <input
                      type="text"
                      placeholder="Please specify..."
                      value={form.contactMethodOther}
                      onChange={set("contactMethodOther")}
                      className={`${inputClass} mt-3`}
                    />
                  )}
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
                <div className="sticky-note relative flex items-start gap-4 p-5">
                  <span className="text-2xl shrink-0">⚡</span>
                  <div>
                    <div className="font-hand text-2xl font-bold text-[#2B1B0E] mb-1 leading-tight">Need it faster? Rush + Editing available.</div>
                    <div className="text-[#2B1B0E]/75 text-base">
                      Add $25 to your order for priority turnaround and optional basic video editing. Just mention it in your notes above.
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-accent text-accent-foreground text-xl font-bold py-5 rounded-2xl hover:bg-[#F0DA96] transition-colors shadow-xl shadow-accent/20 cursor-pointer"
                  >
                    Send My Order Request →
                  </motion.button>
                  <p className="text-center text-muted-foreground mt-5 text-lg">
                    Or email directly:{" "}
                    <a href="mailto:indypastforward@gmail.com"
                      className="text-primary font-semibold hover:underline underline-offset-2">
                      indypastforward@gmail.com
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
              { title: "100% Private", body: "Your videos are never shared or stored after delivery." },
              { title: "Fast Response", body: "I respond to every inquiry within 24 hours, usually much sooner." },
              { title: "Personal Service", body: "A real person handles your memories from start to finish." },
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
