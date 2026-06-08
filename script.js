document.addEventListener('DOMContentLoaded', () => {
 
  /* ── 1. NAVBAR SCROLL EFFECT ── */
  const navbar      = document.getElementById('navbar');
  const scrollTopBtn = document.getElementById('scrollTop');
 
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
  });
 
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
 
 
  /* ── 2. HAMBURGER MENU ── */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
 
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
 
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
 
 
  /* ── 3. ACTIVE NAV HIGHLIGHT ── */
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-item');
 
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navItems.forEach(item => {
          item.classList.toggle('active', item.dataset.section === id);
        });
      }
    });
  }, { rootMargin: '-40% 0px -40% 0px', threshold: 0 });
 
  sections.forEach(sec => sectionObserver.observe(sec));
 
 
  /* ── 4. REVEAL ON SCROLL ── */
  const revealEls = document.querySelectorAll(
    '.method-item, .insight-card, .persona-card, .hmw-item, ' +
    '.idea-card, .proto-stage, .screen-card, .test-metric, ' +
    '.findings-col, .process-step, .em-quad, .pd-item'
  );
 
  revealEls.forEach(el => el.classList.add('reveal'));
 
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const siblings = [...entry.target.parentElement.children];
      const idx = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = `${idx * 70}ms`;
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
 
  revealEls.forEach(el => revealObserver.observe(el));
 
 
  /* ── 5. SMOOTH ANCHOR SCROLL ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navH = navbar.offsetHeight + 12;
      const top  = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
 
 
  /* ── 6. ANIMATED PROGRESS CIRCLES (Test section) ── */
  const circleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.querySelectorAll('.progress-circle').forEach(circle => {
        const finalOffset = parseFloat(circle.getAttribute('stroke-dashoffset') || '0');
        circle.style.strokeDashoffset = '263.9';
        setTimeout(() => { circle.style.strokeDashoffset = finalOffset; }, 100);
      });
      circleObserver.unobserve(entry.target);
    });
  }, { threshold: 0.3 });
 
  const testSection = document.getElementById('test');
  if (testSection) circleObserver.observe(testSection);
 
 
  /* ── 7. PROCESS STEPS HOVER GLOW ── */
  document.querySelectorAll('.process-step').forEach(step => {
    step.addEventListener('mouseenter', () => {
      step.style.borderColor = 'rgba(255,210,51,0.8)';
      step.style.boxShadow   = '0 0 32px rgba(255,210,51,0.25)';
    });
    step.addEventListener('mouseleave', () => {
      step.style.borderColor = '';
      step.style.boxShadow   = '';
    });
  });
 
 
  /* ── 8. IDEA CARDS TILT EFFECT ── */
  document.querySelectorAll('.idea-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 8;
      const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 8;
      card.style.transform = `perspective(600px) rotateX(${-y}deg) rotateY(${x}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
 
 
  /* ── 9. FLOATING CARDS PARALLAX ── */
  const floatingCards = document.querySelectorAll('.floating-card');
  if (floatingCards.length) {
    window.addEventListener('mousemove', (e) => {
      const cx = window.innerWidth  / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;
      floatingCards.forEach((card, i) => {
        const depth = (i + 1) * 6;
        card.style.transform = `translate(${dx * depth}px, ${dy * depth}px)`;
      });
    });
  }
 
 
  /* ── 10. SCREEN CARDS CLICK → open Figma ── */
  document.querySelectorAll('.screen-preview').forEach(card => {
    card.addEventListener('click', () => window.open('https://figma.com', '_blank'));
  });
 
 
  /* ── 11. COUNTER ANIMATION (Insight cards) ── */
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el    = entry.target;
      const text  = el.textContent.trim();
      const value = parseInt(text, 10);
      if (isNaN(value)) return;
 
      const hasPct = text.includes('%');
      let start = 0;
      const step = Math.ceil(value / (1400 / 16));
      const ticker = setInterval(() => {
        start += step;
        if (start >= value) { start = value; clearInterval(ticker); }
        el.textContent = start + (hasPct ? '%' : '');
      }, 16);
 
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });
 
  document.querySelectorAll('.ic-pct').forEach(el => counterObserver.observe(el));
 
 
  /* ── 12. SECTION HEADER ENTRANCE ── */
  const headerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInUp .7s ease both';
        headerObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
 
  document.querySelectorAll('.section-header').forEach(h => headerObserver.observe(h));
 
 
  /* ── 13. PHONE MOCKUP SUBTLE ENTRANCE ── */
  const phoneMockup = document.querySelector('.phone-mockup');
  if (phoneMockup) {
    phoneMockup.addEventListener('mouseenter', () => {
      phoneMockup.style.transform = 'scale(1.02) translateY(-4px)';
      phoneMockup.style.transition = 'transform .4s cubic-bezier(.4,0,.2,1)';
      phoneMockup.style.boxShadow = '0 32px 80px rgba(10,25,47,.25)';
    });
    phoneMockup.addEventListener('mouseleave', () => {
      phoneMockup.style.transform = '';
      phoneMockup.style.boxShadow = '';
    });
  }
 
  console.log('%c📦 MuatIn Portfolio loaded!', 'color:#FF8C00;font-size:1.1rem;font-weight:700;');
});