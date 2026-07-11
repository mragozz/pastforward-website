import { motion } from "motion/react";

/* ─── Reel helper ──────────────────────────────────────────────── */
function Reel({
  cx, cy, r, speed = 3, dir = 1,
}: { cx: number; cy: number; r: number; speed?: number; dir?: 1 | -1 }) {
  const spokes = [0, 60, 120, 180, 240, 300];
  return (
    <g>
      {/* Outer rim */}
      <circle cx={cx} cy={cy} r={r + 5} fill="#141414" stroke="#282828" strokeWidth="1.5" />
      {/* Spinning group */}
      <motion.g
        style={{ transformOrigin: "center center", transformBox: "fill-box" } as React.CSSProperties}
        animate={{ rotate: dir === 1 ? 360 : -360 }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {spokes.map((a) => (
          <line
            key={a}
            x1={cx + 11 * Math.cos((a * Math.PI) / 180)}
            y1={cy + 11 * Math.sin((a * Math.PI) / 180)}
            x2={cx + (r - 1) * Math.cos((a * Math.PI) / 180)}
            y2={cy + (r - 1) * Math.sin((a * Math.PI) / 180)}
            stroke="#3A3A3A"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        ))}
      </motion.g>
      {/* Hub */}
      <circle cx={cx} cy={cy} r={11} fill="#1E1010" stroke="#383838" strokeWidth="1" />
      <circle cx={cx} cy={cy} r={5} fill="#2A1A10" />
    </g>
  );
}

/* ─── VHS Tape ─────────────────────────────────────────────────── */
export function AnimatedVHS({ width = 460, slow = false, archiveLabel = "FAMILY HOME VIDEOS" }: { width?: number; slow?: number | boolean; archiveLabel?: string }) {
  const speed = slow ? 6 : 3;
  const w = 460; const h = 290;

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      style={{ width, height: (h / w) * width }}
      fill="none"
    >
      <defs>
        <linearGradient id="vhs-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2A1810" />
          <stop offset="100%" stopColor="#170E09" />
        </linearGradient>
        <linearGradient id="vhs-label-shine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="white" stopOpacity="0" />
          <stop offset="50%" stopColor="white" stopOpacity="0.06" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="vhs-top-bevel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="white" stopOpacity="0.08" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <filter id="vhs-shadow" x="-5%" y="-5%" width="110%" height="115%">
          <feDropShadow dx="0" dy="8" stdDeviation="14" floodColor="#000" floodOpacity="0.45" />
        </filter>
        <clipPath id="vhs-window-clip">
          <rect x="24" y="182" width="412" height="100" rx="8" />
        </clipPath>
      </defs>

      {/* Main casing */}
      <rect x="0" y="0" width={w} height={h} rx="18" fill="url(#vhs-body)" filter="url(#vhs-shadow)" />
      <rect x="6" y="6" width={w - 12} height={h - 12} rx="14" fill="#231410" />

      {/* Top bevel highlight */}
      <rect x="18" y="7" width={w - 36} height="8" rx="4" fill="url(#vhs-top-bevel)" />

      {/* Label area */}
      <rect x="22" y="20" width={w - 44} height="152" rx="11" fill="#F5EDD8" />
      {/* Label top accent stripe */}
      <rect x="22" y="20" width={w - 44} height="8" rx="11" fill="#E86030" opacity="0.7" />
      <rect x="22" y="24" width={w - 44} height="4" fill="#E86030" opacity="0.7" />
      {/* Label content */}
      <text x={w / 2} y="78" textAnchor="middle" fontSize="18" fontWeight="700" fill="#2C1810" fontFamily="Georgia, serif">
        Past Forward Indy
      </text>
      <text x={w / 2} y="102" textAnchor="middle" fontSize={archiveLabel.length > 14 ? "9.5" : "12"} fontWeight="600" fill="#1A6B78" fontFamily="system-ui, sans-serif" letterSpacing="0.08em">
        {archiveLabel}
      </text>
      <rect x="56" y="118" width={w - 112} height="2.5" rx="1.25" fill="#E86030" opacity="0.4" />
      <text x={w / 2} y="146" textAnchor="middle" fontSize="10.5" fill="#8B6E58" fontFamily="system-ui, sans-serif" letterSpacing="0.06em">
        Indianapolis, Indiana
      </text>
      {/* Label shine overlay */}
      <rect x="22" y="20" width={w - 44} height="152" rx="11" fill="url(#vhs-label-shine)" />

      {/* Window recess - dark area showing reels */}
      <rect x="20" y="183" width={w - 40} height="98" rx="10" fill="#060606" />
      <rect x="24" y="187" width={w - 48} height="90" rx="8" fill="#0C0C0C" />

      {/* Scanlines in window */}
      {Array.from({ length: 22 }).map((_, i) => (
        <rect
          key={i}
          x="24"
          y={187 + i * 4}
          width={w - 48}
          height="1"
          fill="white"
          opacity="0.018"
        />
      ))}

      {/* Left reel (supply - larger) */}
      <Reel cx={128} cy={232} r={30} speed={speed} dir={1} />

      {/* Right reel (take-up - slightly smaller) */}
      <Reel cx={332} cy={232} r={24} speed={speed * 1.15} dir={1} />

      {/* Tape strip through window */}
      <motion.path
        animate={{
          d: [
            "M 98 232 Q 128 216 230 222 Q 306 227 362 232",
            "M 98 232 Q 128 220 230 225 Q 306 224 362 232",
            "M 98 232 Q 128 216 230 222 Q 306 227 362 232",
          ],
        }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        stroke="#6B4020"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Tape sheen line */}
      <motion.path
        animate={{
          d: [
            "M 98 229 Q 128 213 230 219 Q 306 224 362 229",
            "M 98 229 Q 128 217 230 222 Q 306 221 362 229",
            "M 98 229 Q 128 213 230 219 Q 306 224 362 229",
          ],
        }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.12"
        fill="none"
      />

      {/* Window top reflection */}
      <rect x="28" y="189" width="90" height="2" rx="1" fill="white" opacity="0.05" />

      {/* Bottom grip/indent */}
      <rect x="160" y="272" width="140" height="8" rx="4" fill="#120C08" />

      {/* Side ribs */}
      <rect x="6" y="90" width="6" height="8" rx="3" fill="#170E09" />
      <rect x="6" y="106" width="6" height="8" rx="3" fill="#170E09" />
      <rect x={w - 12} y="90" width="6" height="8" rx="3" fill="#170E09" />
      <rect x={w - 12} y="106" width="6" height="8" rx="3" fill="#170E09" />

      {/* Edge highlight (top-left corner glint) */}
      <path d="M 18 18 Q 18 8 28 8" stroke="white" strokeWidth="1" opacity="0.12" fill="none" />
    </svg>
  );
}

/* ─── MiniDV / Hi8 Cassette ────────────────────────────────────── */
export function AnimatedMiniDV({ width = 200 }: { width?: number }) {
  const w = 220; const h = 150;
  const speed = 4;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width, height: (h / w) * width }} fill="none">
      <defs>
        <linearGradient id="mdv-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#252020" />
          <stop offset="100%" stopColor="#141010" />
        </linearGradient>
        <filter id="mdv-shadow">
          <feDropShadow dx="0" dy="5" stdDeviation="8" floodColor="#000" floodOpacity="0.4" />
        </filter>
      </defs>

      {/* Body */}
      <rect x="0" y="0" width={w} height={h} rx="12" fill="url(#mdv-body)" filter="url(#mdv-shadow)" />
      <rect x="4" y="4" width={w - 8} height={h - 8} rx="9" fill="#1E1A1A" />

      {/* Label */}
      <rect x="12" y="12" width={w - 24} height="70" rx="7" fill="#F5EDD8" />
      <rect x="12" y="12" width={w - 24} height="5" rx="7" fill="#1A6B78" opacity="0.8" />
      <text x={w / 2} y="42" textAnchor="middle" fontSize="10" fontWeight="700" fill="#2C1810" fontFamily="Georgia, serif">Past Forward</text>
      <text x={w / 2} y="57" textAnchor="middle" fontSize="7.5" fontWeight="600" fill="#E86030" fontFamily="system-ui" letterSpacing="0.1em">MINIDV · HI8</text>
      <text x={w / 2} y="72" textAnchor="middle" fontSize="7" fill="#8B6E58" fontFamily="system-ui">Indianapolis, IN</text>

      {/* Window */}
      <rect x="10" y="92" width={w - 20} height="48" rx="7" fill="#080808" />
      <rect x="13" y="95" width={w - 26} height="42" rx="5" fill="#0E0E0E" />

      {/* Single large reel */}
      <Reel cx={w / 2} cy={116} r={16} speed={speed} dir={1} />

      {/* Tape strips each side */}
      <rect x="24" y="116" width="34" height="4" rx="2" fill="#5C3D1E" opacity="0.9" />
      <rect x={w - 58} y="116" width="34" height="4" rx="2" fill="#5C3D1E" opacity="0.9" />

      {/* Window reflection */}
      <rect x="15" y="97" width="45" height="1.5" rx="1" fill="white" opacity="0.05" />
    </svg>
  );
}

/* ─── DVD Disc ─────────────────────────────────────────────────── */
export function AnimatedDVD({ size = 180, spinning = true }: { size?: number; spinning?: boolean }) {
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      {/* Brushed archival disc — muted and physical, rather than a rainbow novelty disc. */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={spinning ? { rotate: 360 } : {}}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{
          background:
            "conic-gradient(from 22deg, #5c6f72, #d7c6a1 10%, #42686c 20%, #e6dcc6 31%, #6d5d50 43%, #d8c7a6 53%, #3f686d 66%, #d8cfba 78%, #6a5c51 90%, #5c6f72)",
          boxShadow: "inset 0 0 0 2px rgba(255,255,255,.38), inset 0 0 13px rgba(20,14,10,.46), 0 19px 35px rgba(44,24,16,.26)",
        }}
      />
      {/* Fine circular grooves and a restrained lens sheen. */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "repeating-radial-gradient(circle at center, transparent 0 4px, rgba(34,28,24,.12) 4px 5px, transparent 5px 8px), radial-gradient(circle at 32% 24%, rgba(255,255,255,.58), transparent 28%)",
        }}
      />
      <div
        className="absolute rounded-full border border-[#2c1810]/30"
        style={{
          width: "70%", height: "70%", top: "15%", left: "15%",
          boxShadow: "inset 0 0 0 1px rgba(255,255,255,.28)",
        }}
      />
      <div
        className="absolute rounded-full border border-white/50 bg-[#f4ead6] flex flex-col items-center justify-center"
        style={{
          width: "45%",
          height: "45%",
          top: "27.5%",
          left: "27.5%",
          boxShadow: "0 2px 5px rgba(44,24,16,.24)",
        }}
      >
        <span className="font-display text-[8px] font-bold text-foreground leading-none">PAST FORWARD</span>
        <span style={{ fontSize: 5.5 }} className="mt-1 font-bold tracking-[.16em] text-primary">INDIANAPOLIS</span>
        <div
          className="absolute rounded-full bg-[#111]"
          style={{ width: "23%", height: "23%", top: "38.5%", left: "38.5%", boxShadow: "inset 0 0 4px #000, 0 0 0 2px rgba(255,255,255,.35)" }}
        />
      </div>
    </div>
  );
}

/* ─── Digital delivery flash drive ─────────────────────────────── */
export function AnimatedFlashDrive({ width = 220 }: { width?: number }) {
  const height = Math.round(width * 0.48);
  return (
    <motion.div
      className="relative"
      style={{ width, height, perspective: "900px" }}
      animate={{ y: [0, -8, 0], rotateZ: [-3, 2, -3] }}
      transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut" }}
    >
      <motion.div
        className="absolute inset-0"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateX: [7, 0, 7], rotateY: [-11, 8, -11] }}
        transition={{ duration: 6.4, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Metal USB plug */}
        <div className="absolute left-0 top-[28%] h-[45%] w-[29%] rounded-l-md border border-[#8e9b9a]" style={{ background: "linear-gradient(135deg, #e3e6df, #929d9b 45%, #e3e5dd)", boxShadow: "inset 0 1px rgba(255,255,255,.7), 0 9px 13px rgba(44,24,16,.23)" }}>
          <div className="absolute left-[15%] top-[18%] h-[64%] w-[64%] rounded-sm border border-[#5b6665]/60 bg-[#d7dad2]" />
          <div className="absolute left-[29%] top-[34%] h-[7%] w-[34%] rounded-full bg-[#617979]" />
          <div className="absolute left-[29%] bottom-[34%] h-[7%] w-[34%] rounded-full bg-[#617979]" />
        </div>
        {/* Dark, tactile body */}
        <div className="absolute right-0 top-[8%] h-[84%] w-[77%] rounded-[20%] border border-[#321e17]" style={{ background: "linear-gradient(140deg, #5e3e2c 0%, #291813 42%, #1a6b78 100%)", boxShadow: "inset 2px 2px 2px rgba(255,255,255,.16), inset -5px -6px 10px rgba(0,0,0,.28), 0 20px 23px rgba(44,24,16,.28)" }}>
          <div className="absolute inset-x-[11%] top-[18%] h-[48%] rounded-xl border border-white/25 bg-[#f5edd8] shadow-inner">
            <div className="absolute left-0 right-0 top-0 h-1.5 rounded-t-xl bg-[#e86030]" />
            <p className="mt-[17%] text-center font-display text-[9px] font-bold tracking-[.08em] text-[#2c1810]">PAST FORWARD</p>
            <p className="mt-1 text-center text-[5px] font-bold tracking-[.18em] text-[#1a6b78]">YOUR MEMORIES</p>
          </div>
          <div className="absolute bottom-[12%] right-[13%] h-2.5 w-2.5 rounded-full bg-[#b7e082] shadow-[0_0_11px_#b7e082]" />
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Transfer journey / animated signal path ──────────────────── */
export function MemoryTransferJourney() {
  const stations = [
    { number: "01", label: "Your tape" },
    { number: "02", label: "Careful capture" },
    { number: "03", label: "A file to keep" },
  ];

  return (
    <div className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#160f0c] px-5 py-9 shadow-2xl shadow-[#2c1810]/20 sm:px-10 sm:py-12">
      <div className="absolute inset-0 opacity-70" style={{ background: "radial-gradient(circle at 15% 10%, rgba(232,96,48,.28), transparent 28%), radial-gradient(circle at 85% 95%, rgba(26,107,120,.32), transparent 34%)" }} />
      <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

      <svg viewBox="0 0 1000 250" className="absolute left-0 top-1/2 hidden w-full -translate-y-1/2 md:block" aria-hidden="true">
        <path d="M 108 130 C 245 32, 332 220, 502 130 S 752 34, 900 122" fill="none" stroke="rgba(255,255,255,.16)" strokeWidth="2" />
        <motion.path
          d="M 108 130 C 245 32, 332 220, 502 130 S 752 34, 900 122"
          fill="none"
          stroke="#ef875f"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="10 18"
          animate={{ strokeDashoffset: [0, -112] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
        />
        <motion.circle r="7" fill="#f9d78a" filter="url(#signalGlow)">
          <animateMotion dur="4.8s" repeatCount="indefinite" path="M 108 130 C 245 32, 332 220, 502 130 S 752 34, 900 122" />
        </motion.circle>
        <defs><filter id="signalGlow"><feGaussianBlur stdDeviation="4" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter></defs>
      </svg>

      <div className="relative z-10 grid gap-9 md:grid-cols-3 md:gap-12">
        {stations.map((station, index) => (
          <motion.div
            key={station.number}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: .55, delay: index * .14, ease: [0.22, 1, 0.36, 1] }}
            className="relative text-center"
          >
            <motion.div
              animate={{ y: [0, -7, 0], rotateX: [0, 6, 0], rotateY: [0, index === 1 ? -8 : 8, 0] }}
              transition={{ duration: 4.5 + index * .7, delay: index * .35, repeat: Infinity, ease: "easeInOut" }}
              className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl border border-white/15 bg-white/[.08] text-2xl font-bold text-[#f9d78a] shadow-xl backdrop-blur-sm"
              style={{ transformStyle: "preserve-3d" }}
            >
              {station.number}
            </motion.div>
            <p className="font-display text-2xl font-bold text-white">{station.label}</p>
            <p className="mx-auto mt-2 max-w-[13rem] text-base leading-relaxed text-white/60">
              {index === 0 ? "Picked up by a real person, right here in Indy." : index === 1 ? "Digitized slowly and attentively, never rushed." : "Simple digital memories ready to share."}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─── Cinematic 3D VHS stack ───────────────────────────────────── */
export function CinematicTapeStack({ mouseX = 0, mouseY = 0 }: { mouseX?: number; mouseY?: number }) {
  const tapes = [
    { label: "SUMMER '94", color: "#1a6b78", x: -38, y: 186, rotate: -8, width: 330, delay: .2 },
    { label: "CHRISTMAS", color: "#e86030", x: 22, y: 108, rotate: 5, width: 358, delay: .42 },
    { label: "FAMILY ARCHIVE", color: "#d39a36", x: -12, y: 21, rotate: -3, width: 392, delay: .64 },
  ];

  return (
    <div className="relative h-[520px] w-full select-none" style={{ perspective: "1600px" }} aria-label="A dimensional stack of family video tapes">
      <div className="absolute inset-x-[12%] bottom-[6%] h-24 rounded-[100%] bg-[#2c1810]/25 blur-3xl" />
      <motion.div
        className="absolute inset-0"
        style={{ rotateX: -mouseY * 8, rotateY: mouseX * 12, transformStyle: "preserve-3d" }}
        transition={{ type: "spring", stiffness: 70, damping: 22 }}
      >
        {tapes.map((tape, index) => (
          <motion.div
            key={tape.label}
            className="absolute"
            initial={{ opacity: 0, y: -190, rotate: tape.rotate - 17, scale: .92 }}
            animate={{ opacity: 1, y: tape.y, x: tape.x, rotate: tape.rotate, scale: 1 }}
            transition={{ type: "spring", stiffness: 72, damping: 13, delay: tape.delay, mass: 1.15 }}
            style={{ left: "7%", zIndex: index + 2, transformStyle: "preserve-3d" }}
          >
            <motion.div
              animate={{ y: [0, index === 2 ? -8 : -4, 0], rotateZ: [tape.rotate, tape.rotate + (index === 1 ? 1.4 : -.8), tape.rotate] }}
              transition={{ duration: 5 + index, repeat: Infinity, ease: "easeInOut", delay: index * .45 }}
              className="relative"
              style={{ filter: `drop-shadow(0 ${20 + index * 7}px ${16 + index * 5}px rgba(44,24,16,.32))` }}
            >
              <AnimatedVHS width={tape.width} slow archiveLabel={tape.label} />
              <div className="pointer-events-none absolute inset-x-[10%] top-[8%] h-[2px] rounded-full bg-white/30 blur-[1px]" />
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* A loose tape ribbon gives the stack a physical, in-motion quality. */}
      <motion.svg className="pointer-events-none absolute -right-7 bottom-4 z-20 h-44 w-64" viewBox="0 0 260 170" fill="none" aria-hidden="true">
        <motion.path
          d="M 5 124 C 66 36, 120 184, 184 82 S 232 24, 257 46"
          stroke="#4d2c19"
          strokeWidth="11"
          strokeLinecap="round"
          animate={{ d: ["M 5 124 C 66 36, 120 184, 184 82 S 232 24, 257 46", "M 5 124 C 72 56, 120 156, 184 95 S 232 34, 257 46", "M 5 124 C 66 36, 120 184, 184 82 S 232 24, 257 46"] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M 5 121 C 66 33, 120 181, 184 79 S 232 21, 257 43"
          stroke="rgba(255,255,255,.24)"
          strokeWidth="2"
          strokeLinecap="round"
          animate={{ opacity: [.15, .45, .15] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.svg>

      <motion.div className="absolute right-2 top-3 z-30" animate={{ y: [0, -10, 0], rotate: [0, 8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
        <AnimatedDVD size={120} />
      </motion.div>
      <motion.div className="absolute -left-8 top-10 z-0 opacity-60" initial={{ opacity: 0, y: -100, rotate: -24 }} animate={{ opacity: .6, y: [0, 10, 0], rotate: [-24, -17, -24] }} transition={{ opacity: { duration: .7, delay: 1.1 }, y: { duration: 6, repeat: Infinity, ease: "easeInOut" }, rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" } }}>
        <AnimatedMiniDV width={120} />
      </motion.div>
      {Array.from({ length: 12 }).map((_, index) => (
        <motion.span
          key={index}
          className="absolute h-1 w-1 rounded-full bg-white/70"
          style={{ left: `${7 + (index * 17) % 86}%`, top: `${6 + (index * 29) % 78}%` }}
          animate={{ opacity: [.05, .7, .05], y: [0, -14 - (index % 4) * 5, 0] }}
          transition={{ duration: 2.8 + (index % 3), delay: index * .18, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/* ─── Floating hero cluster ────────────────────────────────────── */
export function FloatingMediaCluster({ mouseX = 0, mouseY = 0 }: { mouseX?: number; mouseY?: number }) {
  return (
    <div className="relative w-full h-full select-none" style={{ minHeight: 420 }}>
      {/* Main VHS tape */}
      <motion.div
        className="absolute"
        style={{ top: "10%", left: "0%", zIndex: 10 }}
        animate={{ y: [0, -22, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          style={{
            perspective: "1200px",
            rotateX: -mouseY * 6,
            rotateY: mouseX * 14,
            filter: "drop-shadow(0 30px 50px rgba(0,0,0,0.3))",
          }}
        >
          <AnimatedVHS width={420} />
        </motion.div>
      </motion.div>

      {/* DVD – top right */}
      <motion.div
        className="absolute"
        style={{ top: "0%", right: "2%", zIndex: 15 }}
        animate={{ y: [0, -14, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
      >
        <AnimatedDVD size={140} />
      </motion.div>

      {/* MiniDV – bottom left */}
      <motion.div
        className="absolute"
        style={{ bottom: "0%", left: "12%", zIndex: 8 }}
        animate={{ y: [0, -10, 0], rotate: [0, -6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      >
        <motion.div
          style={{ rotateX: mouseY * 4, rotateY: -mouseX * 8, perspective: "600px" }}
        >
          <AnimatedMiniDV width={160} />
        </motion.div>
      </motion.div>

      {/* Small ghost DVD – bottom right corner */}
      <motion.div
        className="absolute opacity-50"
        style={{ bottom: "6%", right: "0%", zIndex: 6 }}
        animate={{ y: [0, -8, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2.4 }}
      >
        <AnimatedDVD size={80} />
      </motion.div>

      {/* Floating tape reel decoration */}
      <motion.div
        className="absolute opacity-20"
        style={{ top: "55%", right: "3%", zIndex: 5 }}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      >
        <svg viewBox="0 0 80 80" width="70" height="70" fill="none">
          <circle cx="40" cy="40" r="36" stroke="#2C1810" strokeWidth="3" />
          <circle cx="40" cy="40" r="24" stroke="#2C1810" strokeWidth="2" />
          {[0, 60, 120, 180, 240, 300].map((a) => (
            <line key={a}
              x1={40 + 24 * Math.cos((a * Math.PI) / 180)}
              y1={40 + 24 * Math.sin((a * Math.PI) / 180)}
              x2={40 + 34 * Math.cos((a * Math.PI) / 180)}
              y2={40 + 34 * Math.sin((a * Math.PI) / 180)}
              stroke="#2C1810" strokeWidth="2.5" strokeLinecap="round"
            />
          ))}
          <circle cx="40" cy="40" r="8" fill="#2C1810" />
        </svg>
      </motion.div>
    </div>
  );
}
