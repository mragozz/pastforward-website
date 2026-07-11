import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Home", to: "/" },
  { label: "About Me", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Process", to: "/process" },
  { label: "FAQs", to: "/faqs" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-400"
        style={{
          background: scrolled
            ? "rgba(251, 247, 240, 0.88)"
            : "transparent",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          boxShadow: scrolled ? "0 1px 0 rgba(44,24,16,0.08)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="group flex flex-col leading-none">
            <span className="font-display text-2xl font-bold text-primary transition-colors group-hover:text-accent">
              Past Forward
            </span>
            <span className="text-[10px] font-bold tracking-[0.22em] text-accent uppercase">
              Indianapolis
            </span>
          </Link>

          <button
            onClick={() => setOpen(true)}
            className="p-2.5 rounded-xl hover:bg-muted transition-colors"
            aria-label="Open navigation"
          >
            <Menu size={28} strokeWidth={2} className="text-foreground" />
          </button>
        </div>
      </header>

      {/* Full-screen menu overlay */}
      <div
        className="fixed inset-0 z-[200] flex flex-col"
        style={{
          background: "#1A0F0A",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "all" : "none",
          transition: "opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/* Decorative tape reel in corner */}
        <div
          className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-[0.06]"
          style={{
            background: "radial-gradient(circle, #E86030 0%, transparent 70%)",
            transform: "translate(30%, -30%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-[0.05]"
          style={{
            background: "radial-gradient(circle, #1A6B78 0%, transparent 70%)",
            transform: "translate(-40%, 40%)",
          }}
        />

        <div className="flex items-center justify-between px-8 py-5 border-b border-white/10">
          <Link to="/" className="font-display text-2xl font-bold text-white">
            Past Forward Indy
          </Link>
          <button
            onClick={() => setOpen(false)}
            className="p-2.5 rounded-xl hover:bg-white/10 transition-colors"
            aria-label="Close navigation"
          >
            <X size={32} className="text-white" />
          </button>
        </div>

        <nav className="flex-1 flex flex-col justify-center px-10 md:px-16 gap-1 overflow-auto">
          {links.map((item, i) => (
            <Link
              key={item.to}
              to={item.to}
              className="group flex items-center gap-5 py-4 border-b border-white/10 overflow-hidden"
              style={{
                transition: `transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94) ${i * 55}ms, opacity 0.5s ease ${i * 55}ms`,
                transform: open ? "translateX(0)" : "translateX(-48px)",
                opacity: open ? 1 : 0,
              }}
            >
              <span className="text-white/25 font-mono text-sm tabular-nums">
                0{i + 1}
              </span>
              <span className="font-display font-bold text-white group-hover:text-[#E86030] transition-colors"
                style={{ fontSize: "clamp(2.4rem, 6vw, 5rem)" }}>
                {item.label}
              </span>
            </Link>
          ))}
          <Link
            to="/contact"
            className="mt-10 self-start"
            style={{
              transition: `transform 0.55s ease ${links.length * 55 + 60}ms, opacity 0.55s ease ${links.length * 55 + 60}ms`,
              transform: open ? "translateY(0)" : "translateY(20px)",
              opacity: open ? 1 : 0,
            }}
          >
            <span className="inline-block bg-[#E86030] text-white text-xl font-bold px-9 py-4 rounded-2xl hover:bg-[#d05525] transition-colors">
              Start My Order →
            </span>
          </Link>
        </nav>

        <div className="px-10 py-6 border-t border-white/10 flex flex-wrap gap-6 text-white/30 text-sm">
          <span>Indianapolis, Indiana</span>
          <a href="mailto:orders@pastforwardindy.com" className="hover:text-white/60 transition-colors">
            orders@pastforwardindy.com
          </a>
        </div>
      </div>
    </>
  );
}
