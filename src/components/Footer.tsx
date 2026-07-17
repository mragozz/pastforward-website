import { Link } from "react-router";

const links = [
  { label: "Home", to: "/" },
  { label: "About Me", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Process", to: "/process" },
  { label: "FAQs", to: "/faqs" },
  { label: "Contact", to: "/contact" },
];

const formats = ["VHS", "VHS-C", "Hi8", "8mm Camcorder", "Digital8", "MiniDV", "Betamax", "DVD"];

export default function Footer() {
  return (
    <footer style={{ background: "#071F16" }} className="text-white">
      <div className="rainbow-stripe" />
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-10">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <div className="font-display text-4xl font-bold mb-1">Past Forward</div>
            <div className="text-[11px] font-bold tracking-[0.2em] text-[#E3C878] uppercase mb-6">Indianapolis, Indiana</div>
            <p className="text-white/50 text-lg leading-relaxed max-w-sm">
              Preserving Indianapolis family memories through careful, personal
              video digitization — one tape at a time.
            </p>
            <a
              href="mailto:orders@pastforwardindy.com"
              className="inline-block mt-6 text-white/50 hover:text-white transition-colors text-sm"
            >
              orders@pastforwardindy.com
            </a>
          </div>

          <div>
            <div className="text-white/30 text-xs font-bold tracking-widest uppercase mb-6">
              Pages
            </div>
            <div className="space-y-3">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="block text-white/55 hover:text-white transition-colors text-lg"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="text-white/30 text-xs font-bold tracking-widest uppercase mb-6">
              Formats We Accept
            </div>
            <div className="space-y-3">
              {formats.map((f) => (
                <div key={f} className="text-white/55 text-lg">{f}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Tape reel decorative divider */}
        <div className="flex items-center gap-4 mb-8 opacity-20">
          <div className="flex-1 h-px bg-white/20" />
          <svg viewBox="0 0 40 40" className="w-8 h-8 shrink-0" fill="none">
            <circle cx="20" cy="20" r="18" stroke="white" strokeWidth="1.5" />
            <circle cx="20" cy="20" r="12" stroke="white" strokeWidth="1" />
            {[0, 60, 120, 180, 240, 300].map((a) => (
              <line
                key={a}
                x1={20 + 12 * Math.cos((a * Math.PI) / 180)}
                y1={20 + 12 * Math.sin((a * Math.PI) / 180)}
                x2={20 + 17 * Math.cos((a * Math.PI) / 180)}
                y2={20 + 17 * Math.sin((a * Math.PI) / 180)}
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            ))}
            <circle cx="20" cy="20" r="4" fill="white" opacity="0.5" />
          </svg>
          <div className="flex-1 h-px bg-white/20" />
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-3 text-white/25 text-sm">
          <div>© 2025 Past Forward Indy. All rights reserved.</div>
          <div>Made with care in Indianapolis, Indiana.</div>
        </div>
      </div>
    </footer>
  );
}
