document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Typing animation for the role in the JSON card ---------- */
  const roles = [
    'Java Full Stack Developer',
    'Spring Boot Developer',
    'REST API Engineer',
    'Backend Developer'
  ];
  const typingEl = document.querySelector('.typing-animation');

  if (typingEl) {
    let roleIndex = 0, charIndex = 0, deleting = false;

    const tick = () => {
      const current = roles[roleIndex];
      if (!deleting) {
        charIndex++;
        typingEl.textContent = `"${current.slice(0, charIndex)}"`;
        if (charIndex === current.length) {
          deleting = true;
          setTimeout(tick, 1400);
          return;
        }
      } else {
        charIndex--;
        typingEl.textContent = `"${current.slice(0, charIndex)}"`;
        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
        }
      }
      setTimeout(tick, deleting ? 45 : 85);
    };
    tick();
  }

  /* ---------- Mobile nav toggle ---------- */
  const navbar = document.querySelector('.navbar');
  const toggle = document.querySelector('.nav-toggle');

  if (toggle && navbar) {
    toggle.addEventListener('click', () => {
      const open = navbar.classList.toggle('active');
      toggle.classList.toggle('active', open);
      toggle.setAttribute('aria-expanded', String(open));
    });

    navbar.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navbar.classList.remove('active');
        toggle.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Active route highlighting on scroll ---------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar a');

  const highlightNav = () => {
    let currentId = '';
    sections.forEach(section => {
      const top = section.offsetTop - 140;
      if (window.scrollY >= top) currentId = section.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
    });
  };
  window.addEventListener('scroll', highlightNav);
  highlightNav();

  /* ---------- Scroll reveal for cards ---------- */
  const revealTargets = document.querySelectorAll(
    '.edu-card, .exp-card, .cert-card, .project-card, .about-content, .about-image, .skills-container'
  );
  revealTargets.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealTargets.forEach(el => revealObserver.observe(el));

  /* ---------- Animate linear skill bars when visible ---------- */
  const bars = document.querySelectorAll('.progress-done');
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const done = bar.getAttribute('data-done') || '0';
        bar.style.width = `${done}%`;
        barObserver.unobserve(bar);
      }
    });
  }, { threshold: 0.4 });
  bars.forEach(bar => barObserver.observe(bar));

  /* ---------- Animate circular skill meters when visible ---------- */
  const circles = document.querySelectorAll('.circle');
  const circleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const circle = entry.target;
        const percent = circle.getAttribute('data-percent') || '0';
        circle.style.setProperty('--p', percent);
        circleObserver.unobserve(circle);
      }
    });
  }, { threshold: 0.4 });
  circles.forEach(c => circleObserver.observe(c));

  /* ---------- Contact form ---------- */
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');

  if (form && status) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = data.get('name');
      const email = data.get('email');
      const subject = data.get('subject');
      const message = data.get('message');

      const mailto = `mailto:rahul.dwivedi.aksu@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;

      status.textContent = '200 OK — opening your mail app to send this message...';
      window.location.href = mailto;
      form.reset();

      setTimeout(() => { status.textContent = ''; }, 6000);
    });
  }

  /* ---------- Header shadow on scroll ---------- */
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.style.boxShadow = window.scrollY > 10
        ? '0 8px 24px -12px rgba(0,0,0,0.55)'
        : 'none';
    });
  }

});