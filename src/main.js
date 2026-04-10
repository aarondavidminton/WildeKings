import './style.css';

const toggle = document.querySelector('.nav-toggle');
const mobile = document.getElementById('nav-mobile');

if (toggle && mobile) {
  toggle.addEventListener('click', () => {
    const open = mobile.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  mobile.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobile.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
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
