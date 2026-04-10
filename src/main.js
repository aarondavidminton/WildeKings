import './style.css';

const toggle = document.querySelector('.nav-toggle');
const mobile = document.getElementById('nav-mobile');

function setMenuOpen(open) {
  mobile.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  mobile.setAttribute('aria-hidden', open ? 'false' : 'true');
  document.body.classList.toggle('menu-open', open);
}

if (toggle && mobile) {
  toggle.addEventListener('click', () => {
    setMenuOpen(!mobile.classList.contains('open'));
  });

  mobile.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenuOpen(false));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setMenuOpen(false);
  });
}

const tabs = document.querySelectorAll('.gallery-tabs .tab');
const items = document.querySelectorAll('.gallery-item');

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const filter = tab.getAttribute('data-filter');
    tabs.forEach((t) => {
      t.classList.toggle('active', t === tab);
      t.setAttribute('aria-selected', t === tab ? 'true' : 'false');
    });
    items.forEach((fig) => {
      const cat = fig.getAttribute('data-cat');
      const show = filter === 'all' || cat === filter;
      fig.classList.toggle('hidden', !show);
    });
  });
});
