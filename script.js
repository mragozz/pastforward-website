gsap.registerPlugin(ScrollTrigger);

/* ---------------- Nav panel ---------------- */
const menuToggle = document.getElementById('menuToggle');
const navPanel = document.getElementById('navPanel');
const navBackdrop = document.getElementById('navBackdrop');

function openMenu(){
  navPanel.classList.add('open');
  menuToggle.classList.add('open');
  navBackdrop.classList.add('open');
  menuToggle.setAttribute('aria-expanded', 'true');
}
function closeMenu(){
  navPanel.classList.remove('open');
  menuToggle.classList.remove('open');
  navBackdrop.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}
if (menuToggle){
  menuToggle.addEventListener('click', () => {
    navPanel.classList.contains('open') ? closeMenu() : openMenu();
  });
  navBackdrop.addEventListener('click', closeMenu);
  navPanel.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });
}

// Mark current page link active
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-panel a[href]').forEach(a => {
  const href = a.getAttribute('href').split('#')[0];
  if (href === currentPage || (href === 'index.html' && currentPage === '')) a.classList.add('active');
});

/* ---------------- Digital dot grid (format-pin visual) ---------------- */
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
      c.setAttribute('fill', '#e0a458');
      c.setAttribute('opacity', 0.5);
      dotGrid.appendChild(c);
    }
  }
}

/* ---------------- Hero parallax ---------------- */
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

/* ---------------- Statement scroll-lit lines ---------------- */
function litStatementUpdate(self){
  const lines = document.querySelectorAll(".statement .line");
  const seg = 1 / lines.length;
  lines.forEach((line, i) => {
    const p = Math.min(Math.max((self.progress - i * seg) / seg, 0), 1);
    line.style.color = i === lines.length - 1
      ? `rgba(90,168,255,${0.14 + p * 0.86})`
      : `rgba(255,255,255,${0.14 + p * 0.86})`;
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

/* ---------------- Format pin section (Services page) ---------------- */
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
  document.querySelectorAll('.format-dot').forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = Number(dot.dataset.dot);
      updateFormatState(idx / 3 + 0.05);
    });
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
  if (waveform && grid){
    waveform.style.opacity = Math.max(0, 1 - progress * 1.4);
    grid.style.opacity = Math.min(1, progress * 1.4);
  }
}

/* ---------------- Stat counters ---------------- */
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

/* ---------------- Process line fill ---------------- */
if (document.querySelector(".process-track")){
  gsap.to("#processFill", {
    height: "100%", ease: "none",
    scrollTrigger: { trigger: ".process-track", start: "top 60%", end: "bottom 70%", scrub: true }
  });
}

/* ---------------- Generic fade-up reveals ---------------- */
gsap.utils.toArray('.reveal').forEach(el => {
  gsap.to(el, {
    opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
    scrollTrigger: { trigger: el, start: "top 88%" }
  });
});

/* ---------------- FAQ accordion ---------------- */
document.querySelectorAll('.faq-item').forEach(item => {
  item.querySelector('.faq-q').addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

/* ---------------- Contact form: AJAX submit to Netlify Forms ---------------- */
const contactForm = document.getElementById('contactForm');
if (contactForm){
  const statusEl = document.getElementById('formStatus');
  const successPanel = document.getElementById('formSuccess');

  function encodeForm(data){
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  }

  contactForm.addEventListener('submit', function(e){
    e.preventDefault();

    // honeypot check — silently "succeed" for bots without sending
    const honeypot = contactForm.querySelector('input[name="bot-field"]');
    if (honeypot && honeypot.value){
      return;
    }

    const formData = new FormData(contactForm);
    const payload = {};
    formData.forEach((value, key) => { payload[key] = value; });

    contactForm.classList.add('submitting');
    if (statusEl){ statusEl.className = 'form-status'; statusEl.textContent = ''; }

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encodeForm(payload)
    })
      .then(() => {
        contactForm.classList.add('hidden-form');
        if (successPanel) successPanel.classList.add('show');
      })
      .catch(() => {
        if (statusEl){
          statusEl.textContent = "Something went wrong sending that — please email indypastforward@gmail.com directly.";
          statusEl.className = 'form-status show error';
        }
      })
      .finally(() => {
        contactForm.classList.remove('submitting');
      });
  });
}
