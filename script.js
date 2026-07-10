gsap.registerPlugin(ScrollTrigger);

// Mobile menu
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const navBackdrop = document.getElementById('navBackdrop');

function openMenu(){
  navLinks.classList.add('open');
  menuToggle.classList.add('open');
  navBackdrop.classList.add('open');
  menuToggle.setAttribute('aria-expanded', 'true');
  menuToggle.setAttribute('aria-label', 'Close menu');
}
function closeMenu(){
  navLinks.classList.remove('open');
  menuToggle.classList.remove('open');
  navBackdrop.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open menu');
}
menuToggle.addEventListener('click', () => {
  navLinks.classList.contains('open') ? closeMenu() : openMenu();
});
navBackdrop.addEventListener('click', closeMenu);
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMenu();
});

// Build the digital dot grid used in the format-pin visual
const dotGrid = document.getElementById('dotGrid');
if (dotGrid){
  for (let row = 0; row < 6; row++){
    for (let col = 0; col < 6; col++){
      const cx = 60 + col * 36;
      const cy = 60 + row * 36;
      const c = document.createElementNS('http://www.w3.org/2000/svg','circle');
      c.setAttribute('cx', cx);
      c.setAttribute('cy', cy);
      c.setAttribute('r', 2.5);
      c.setAttribute('fill', '#0a84ff');
      c.setAttribute('opacity', 0.5);
      dotGrid.appendChild(c);
    }
  }
}

// Hero parallax fade
if (document.querySelector(".hero")){
  gsap.to("#heroHeadline", {
    yPercent: -18, opacity: 0.15, ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
  });
  gsap.to(".hero .lead, .hero-ctas", {
    yPercent: -8, opacity: 0, ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "70% top", scrub: true }
  });
  gsap.to(".hero-glow", {
    scale: 1.4, opacity: 0.4, ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
  });
}

// Statement scroll-lit lines (pinned on desktop; gentle reveal on mobile so scrolling stays natural)
function litStatementUpdate(self){
  const lines = document.querySelectorAll(".statement .line");
  const seg = 1 / lines.length;
  lines.forEach((line, i) => {
    const p = Math.min(Math.max((self.progress - i * seg) / seg, 0), 1);
    line.style.color = i === lines.length - 1
      ? `rgba(10,132,255,${0.16 + p * 0.84})`
      : `rgba(29,29,31,${0.16 + p * 0.84})`;
  });
}
if (document.querySelector(".statement")){
  ScrollTrigger.matchMedia({
    "(min-width: 861px)": function(){
      ScrollTrigger.create({
        trigger: ".statement", start: "top top", end: "+=120%", pin: true, scrub: true,
        onUpdate: litStatementUpdate
      });
    },
    "(max-width: 860px)": function(){
      ScrollTrigger.create({
        trigger: ".statement", start: "top 75%", end: "bottom 60%", scrub: true,
        onUpdate: litStatementUpdate
      });
    }
  });
}

// Format pin section: crossfade icon/text/visual layers as user scrolls
if (document.getElementById("services-pin")){
  ScrollTrigger.matchMedia({
    "(min-width: 861px)": function(){
      ScrollTrigger.create({
        trigger: "#services-pin", start: "top top", end: "+=200%", pin: true, scrub: true,
        onUpdate(self){ updateFormatState(self.progress); }
      });
    },
    "(max-width: 860px)": function(){
      ScrollTrigger.create({
        trigger: "#services-pin", start: "top 70%", end: "bottom 30%", scrub: true,
        onUpdate(self){ updateFormatState(self.progress); }
      });
    }
  });
}

function updateFormatState(progress){
  const index = Math.min(2, Math.floor(progress * 3));
  document.querySelectorAll('.format-slide').forEach(el => {
    el.classList.toggle('active', Number(el.dataset.slide) === index);
  });
  document.querySelectorAll('.format-icon').forEach(el => {
    el.classList.toggle('active', Number(el.dataset.format) === index);
  });
  document.querySelectorAll('.format-dot').forEach(el => {
    el.classList.toggle('active', Number(el.dataset.dot) === index);
  });
  const waveform = document.getElementById('waveformLayer');
  const grid = document.getElementById('gridLayer');
  waveform.style.opacity = Math.max(0, 1 - progress * 1.4);
  grid.style.opacity = Math.min(1, progress * 1.4);
}

// Stat counters, once on view
document.querySelectorAll('.stat-num').forEach(el => {
  const target = Number(el.dataset.count);
  ScrollTrigger.create({
    trigger: el, start: "top 85%", once: true,
    onEnter(){
      const obj = { val: 0 };
      gsap.to(obj, {
        val: target, duration: 1.4, ease: "power2.out",
        onUpdate(){ el.textContent = Math.round(obj.val); }
      });
    }
  });
});

// Process line fill, scrubbed
if (document.querySelector(".process-track")){
  gsap.to("#processFill", {
    height: "100%", ease: "none",
    scrollTrigger: { trigger: ".process-track", start: "top 60%", end: "bottom 70%", scrub: true }
  });
}

// Generic fade-up reveals
gsap.utils.toArray('.reveal').forEach(el => {
  gsap.to(el, {
    opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
    scrollTrigger: { trigger: el, start: "top 88%" }
  });
});

// FAQ accordion
document.querySelectorAll('.faq-item').forEach(item => {
  item.querySelector('.faq-q').addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});
