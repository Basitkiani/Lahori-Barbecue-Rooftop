const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('#nav');
toggle.addEventListener('click', () => { const open = nav.classList.toggle('open'); toggle.setAttribute('aria-expanded', String(open)); });
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }));
document.querySelectorAll('[data-detail]').forEach(el => { el.textContent = window.RESTAURANT[el.dataset.detail]; });
document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-filter]').forEach(b => { const active = b === button; b.classList.toggle('active', active); b.setAttribute('aria-pressed', String(active)); });
  document.querySelectorAll('.dish').forEach(dish => { dish.hidden = button.dataset.filter !== 'all' && dish.dataset.category !== button.dataset.filter; });
}));
// All categories are visible by default, including the refreshing option.
document.querySelectorAll('.dish').forEach(dish => dish.hidden = false);
const lightbox = document.querySelector('#lightbox');
document.querySelectorAll('.gallery-item').forEach(button => button.addEventListener('click', () => { const img = button.querySelector('img'); lightbox.querySelector('img').src = img.src; lightbox.querySelector('img').alt = img.alt; lightbox.querySelector('p').textContent = button.dataset.caption + ' · Illustrative mood-board photography'; lightbox.showModal(); }));
lightbox.querySelector('.close').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', e => { if (e.target === lightbox) lightbox.close(); });
const form = document.querySelector('#reservation');
const today = new Date();
const minDate = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
form.elements.date.min = minDate;
form.addEventListener('submit', e => {
  e.preventDefault();
  if (form.elements.date.value < minDate) { form.elements.date.setCustomValidity('Please choose today or a future date.'); form.elements.date.reportValidity(); return; }
  const data = new FormData(form);
  const request = `Reservation request — Lahori Barbecue Rooftop\nName: ${data.get('name').trim()}\nDate: ${data.get('date')}\nParty: ${data.get('guests')}\nNote: ${data.get('note').trim() || 'None'}`;
  const result = document.querySelector('#request-result');
  result.hidden = false;
  result.textContent = request + '\n\nDraft only. Nothing has been sent. Contact the restaurant once verified booking details are available.';
  const download = document.createElement('button'); download.type = 'button'; download.textContent = 'Download your request';
  download.addEventListener('click', () => { const url = URL.createObjectURL(new Blob([request + '\n\nDraft only — not a confirmed reservation.'], {type:'text/plain'})); const a = document.createElement('a'); a.href = url; a.download = 'lahori-reservation-request.txt'; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000); });
  result.append(download);
});
form.elements.date.addEventListener('input', () => form.elements.date.setCustomValidity(''));
