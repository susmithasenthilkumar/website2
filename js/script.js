document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const body = document.body;

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      body.classList.toggle('menu-open', isOpen);
    });

    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        body.classList.remove('menu-open');
      });
    });
  }

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === currentPage);
  });

  const revealItems = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => revealObserver.observe(item));

  const scrollTop = document.querySelector('.scroll-top');
  if (scrollTop) {
    window.addEventListener('scroll', () => {
      scrollTop.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });
    scrollTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    const status = contactForm.querySelector('.form-status');
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const requiredFields = contactForm.querySelectorAll('[required]');
      let isValid = true;
      requiredFields.forEach((field) => {
        field.removeAttribute('aria-invalid');
        if (!field.value.trim() || (field.type === 'email' && !field.validity.valid)) {
          field.setAttribute('aria-invalid', 'true');
          isValid = false;
        }
      });
      if (!isValid) {
        status.textContent = 'Please fill in the required details so we can get back to you.';
        status.classList.remove('success');
        return;
      }
      status.textContent = 'Thanks for reaching out. We will be in touch shortly.';
      status.classList.add('success');
      contactForm.reset();
    });
  }
});
