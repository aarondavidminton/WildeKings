import './style.css';
import './contact.css';

const toggle = document.querySelector('.nav-toggle');
const mobile = document.getElementById('nav-mobile');

function setMenuOpen(open) {
  if (!toggle || !mobile) return;
  mobile.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  mobile.setAttribute('aria-hidden', open ? 'false' : 'true');
  document.body.classList.toggle('menu-open', open);
}

if (toggle && mobile) {
  toggle.addEventListener('click', () => setMenuOpen(!mobile.classList.contains('open')));
  mobile.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenuOpen(false));
  });
}

const form = document.getElementById('contact-form');
const celebration = document.getElementById('submit-celebration');
const burst = document.getElementById('celebration-burst');
const closeBtn = document.getElementById('celebration-close');

function clearFieldErrors() {
  form.querySelectorAll('.field--error').forEach((el) => el.classList.remove('field--error'));
}

function validate() {
  clearFieldErrors();
  let ok = true;
  const name = form.querySelector('#name');
  const email = form.querySelector('#email');
  const message = form.querySelector('#message');

  if (!name.value.trim()) {
    name.closest('.field').classList.add('field--error');
    ok = false;
  }
  if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
    email.closest('.field').classList.add('field--error');
    ok = false;
  }
  if (!message.value.trim()) {
    message.closest('.field').classList.add('field--error');
    ok = false;
  }
  return ok;
}

function spawnBurstParticles() {
  burst.innerHTML = '';
  const count = 42;
  for (let i = 0; i < count; i += 1) {
    const p = document.createElement('span');
    p.className = 'burst-particle';
    const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
    const dist = 100 + Math.random() * 140;
    p.style.setProperty('--tx', `${Math.cos(angle) * dist}px`);
    p.style.setProperty('--ty', `${Math.sin(angle) * dist}px`);
    p.style.setProperty('--delay', `${i * 0.012}s`);
    p.style.setProperty('--rot', `${Math.random() * 720}deg`);
    const size = 4 + Math.random() * 5;
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    p.style.margin = `${-size / 2}px 0 0 ${-size / 2}px`;
    burst.appendChild(p);
  }
}

function openCelebration() {
  spawnBurstParticles();
  celebration.setAttribute('aria-hidden', 'false');
  requestAnimationFrame(() => {
    celebration.classList.add('is-visible');
  });
  document.body.classList.add('menu-open');
  closeBtn?.focus();
}

function closeCelebration() {
  celebration.classList.remove('is-visible');
  celebration.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('menu-open');
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!validate()) return;

  const btn = form.querySelector('.contact-submit');
  btn.disabled = true;

  setTimeout(() => {
    openCelebration();
    form.reset();
    btn.disabled = false;
  }, 380);
});

closeBtn?.addEventListener('click', closeCelebration);

celebration?.addEventListener('click', (e) => {
  if (e.target.classList.contains('submit-celebration__backdrop')) {
    closeCelebration();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  if (celebration.classList.contains('is-visible')) {
    closeCelebration();
    return;
  }
  if (mobile?.classList.contains('open')) setMenuOpen(false);
});
