/**
 * Constra Construction Website - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initBackToTop();
  initCounters();
  initProjectFilter();
  initContactForm();
  initMobileNav();
});

/* Sticky Header on Scroll */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  });
}

/* Back to Top Button */
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* Animated Counters */
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  if (!counters.length) return;

  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const update = () => {
      current += step;
      if (current < target) {
        el.textContent = Math.floor(current);
        requestAnimationFrame(update);
      } else {
        el.textContent = target;
      }
    };
    update();
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => observer.observe(counter));
}

/* Project Filter */
function initProjectFilter() {
  const filters = document.querySelectorAll('.project-filters button');
  const projects = document.querySelectorAll('.project-item');

  if (!filters.length || !projects.length) return;

  filters.forEach((btn) => {
    btn.addEventListener('click', () => {
      filters.forEach((f) => f.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-filter');

      projects.forEach((project) => {
        if (category === 'all' || project.getAttribute('data-category') === category) {
          project.style.display = 'block';
          project.style.animation = 'fadeIn 0.4s ease';
        } else {
          project.style.display = 'none';
        }
      });
    });
  });
}

/* Contact Form Validation */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('[name="name"]');
    const email = form.querySelector('[name="email"]');
    const subject = form.querySelector('[name="subject"]');
    const message = form.querySelector('[name="message"]');
    const msgBox = form.querySelector('.form-message');

    let valid = true;

    [name, email, subject, message].forEach((field) => {
      field.style.borderColor = '';
      if (!field.value.trim()) {
        field.style.borderColor = '#dc3545';
        valid = false;
      }
    });

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.value.trim() && !emailPattern.test(email.value)) {
      email.style.borderColor = '#dc3545';
      valid = false;
    }

    if (!valid) {
      msgBox.className = 'form-message error';
      msgBox.textContent = 'Please fill in all required fields correctly.';
      return;
    }

    msgBox.className = 'form-message success';
    msgBox.textContent = 'Thank you! Your message has been sent successfully. We will get back to you soon.';
    form.reset();
  });
}

/* Mobile Navigation Close on Link Click */
function initMobileNav() {
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  const navbarCollapse = document.querySelector('.navbar-collapse');

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        const toggler = document.querySelector('.navbar-toggler');
        if (toggler) toggler.click();
      }
    });
  });
}

/* Fade-in animation for project filter */
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);
