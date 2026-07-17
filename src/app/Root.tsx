import { Outlet, useLocation } from "react-router";
import { useEffect } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

export default function Root() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    document.body.scrollTop = 0; // body is the actual scroll container (html/body are height:100%)
  }, [pathname]);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Film-grain overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-[300] opacity-[0.022]"
        aria-hidden="true"
        style={{ mixBlendMode: "overlay" }}
      >
        <svg className="w-full h-full">
          <filter id="pfgrain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.7"
              numOctaves="4"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#pfgrain)" />
        </svg>
      </div>
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
