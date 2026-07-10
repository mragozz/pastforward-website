document.addEventListener('DOMContentLoaded', function () {
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  }

  /* ---------- Mobile menu ---------- */
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const navBackdrop = document.getElementById('navBackdrop');

  if (menuToggle && navLinks && navBackdrop) {
    const openMenu = () => {
      navLinks.classList.add('open');
      menuToggle.classList.add('open');
      navBackdrop.classList.add('open');
      menuToggle.setAttribute('aria-expanded', 'true');
      menuToggle.setAttribute('aria-label', 'Close menu');
    };
    const closeMenu = () => {
      navLinks.classList.remove('open');
      menuToggle.classList.remove('open');
      navBackdrop.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open menu');
    };
    menuToggle.addEventListener('click', () => {
      navLinks.classList.contains('open') ? closeMenu() : openMenu();
    });
    navBackdrop.addEventListener('click', closeMenu);
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });
  }

  if (!window.gsap) return; // everything below is progressive enhancement

  /* ---------- Dot grid (Services page format visual) ---------- */
  const dotGrid = document.getElementById('dotGrid');
  if (dotGrid) {
    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 6; col++) {
        const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        c.setAttribute('cx', 60 + col * 36);
        c.setAttribute('cy', 60 + row * 36);
        c.setAttribute('r', 2.5);
        c.setAttribute('fill', '#0a84ff');
        c.setAttribute('opacity', 0.5);
        dotGrid.appendChild(c);
      }
    }
  }

  /* ---------- Hero parallax (Home) ---------- */
  if (document.querySelector('.hero')) {
    if (document.getElementById('heroHeadline')) {
      gsap.to("#heroHeadline", {
        yPercent: -18, opacity: 0.15, ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
      });
    }
    gsap.to(".hero .lead, .hero-ctas", {
      yPercent: -8, opacity: 0, ease: "none",
      scrollTrigger: { trigger: ".hero", start: "top top", end: "70% top", scrub: true }
    });
    gsap.to(".hero-glow", {
      scale: 1.4, opacity: 0.4, ease: "none",
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
    });
  }

  /* ---------- Format pin carousel (Services page) ---------- */
  if (document.getElementById('services-pin')) {
    function updateFormatState(progress) {
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
      if (waveform) waveform.style.opacity = Math.max(0, 1 - progress * 1.4);
      if (grid) grid.style.opacity = Math.min(1, progress * 1.4);
    }
    ScrollTrigger.matchMedia({
      "(min-width: 861px)": function () {
        ScrollTrigger.create({
          trigger: "#services-pin", start: "top top", end: "+=200%", pin: true, scrub: true,
          onUpdate(self) { updateFormatState(self.progress); }
        });
      },
      "(max-width: 860px)": function () {
        ScrollTrigger.create({
          trigger: "#services-pin", start: "top 70%", end: "bottom 30%", scrub: true,
          onUpdate(self) { updateFormatState(self.progress); }
        });
      }
    });
  }

  /* ---------- Stat counters (Home) ---------- */
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = Number(el.dataset.count);
    ScrollTrigger.create({
      trigger: el, start: "top 85%", once: true,
      onEnter() {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target, duration: 1.4, ease: "power2.out",
          onUpdate() { el.textContent = Math.round(obj.val); }
        });
      }
    });
  });

  /* ---------- Process line fill (Services page) ---------- */
  if (document.getElementById('processFill')) {
    gsap.to("#processFill", {
      height: "100%", ease: "none",
      scrollTrigger: { trigger: ".process-track", start: "top 60%", end: "bottom 70%", scrub: true }
    });
  }

  /* ---------- Generic fade-up reveals (all pages) ---------- */
  gsap.utils.toArray('.reveal').forEach(el => {
    gsap.to(el, {
      opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 88%" }
    });
  });

  /* ---------- FAQ accordion (FAQ page) ---------- */
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    if (!q) return;
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  /* ---------- Contact form: submit via Netlify AJAX, show inline success ---------- */
  const contactForm = document.querySelector('form[name="contact"]');
  if (contactForm) {
    const statusBox = document.getElementById('formStatus');
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const data = new FormData(contactForm);
      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Sending...'; }

      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data).toString()
      })
        .then(() => {
          contactForm.style.display = 'none';
          if (statusBox) {
            statusBox.style.display = 'block';
            statusBox.className = 'form-status success';
            statusBox.innerHTML = '<strong>Thanks &mdash; message sent!</strong><br>We\'ll get back to you with a quote, usually within a day.';
          }
        })
        .catch(() => {
          if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Send & Get a Quote'; }
          if (statusBox) {
            statusBox.style.display = 'block';
            statusBox.className = 'form-status error';
            statusBox.innerHTML = 'Something went wrong. Please try again, or email us directly at <a href="mailto:indypastforward@gmail.com" style="color:inherit; text-decoration:underline;">indypastforward@gmail.com</a>.';
          }
        });
    });
  }
});
