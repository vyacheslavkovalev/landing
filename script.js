/* ============================================================
   CJM 2026 — Landing script
   ============================================================ */

'use strict';

const TELEGRAM_BOT_URL = 'https://t.me/bureausuchkov_bot'; // ← замените на реальную ссылку

/* ---- Smooth scroll for anchor links ---- */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const navH = document.querySelector('.nav')?.offsetHeight ?? 60;
    const top  = target.getBoundingClientRect().top + window.scrollY - navH - 16;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ---- Form validation & submit ---- */
const form     = document.getElementById('reg-form');
const formCard = form?.closest('.registration__form-card');

if (form) {
  form.addEventListener('submit', handleSubmit);
}

function handleSubmit(e) {
  e.preventDefault();
  if (!validateForm()) return;

  const btn = form.querySelector('.btn-submit');
  btn.textContent = 'Отправка…';
  btn.disabled = true;

  // Simulate async send (replace with real API call if needed)
  setTimeout(() => {
    showSuccess();
    window.location.href = TELEGRAM_BOT_URL;
  }, 800);
}

function validateForm() {
  let valid = true;

  // Clear previous errors
  form.querySelectorAll('.form-error').forEach(el => { el.textContent = ''; });
  form.querySelectorAll('.form-input').forEach(el => el.classList.remove('form-input--error'));

  const name  = form.querySelector('[name="name"]');
  const email = form.querySelector('[name="email"]');

  if (!name.value.trim()) {
    setError(name, 'Пожалуйста, введите ваше имя');
    valid = false;
  }

  if (!email.value.trim()) {
    setError(email, 'Пожалуйста, введите email');
    valid = false;
  } else if (!isValidEmail(email.value.trim())) {
    setError(email, 'Введите корректный email');
    valid = false;
  }

  return valid;
}

function setError(input, message) {
  input.classList.add('form-input--error');
  const errorEl = input.parentElement.querySelector('.form-error');
  if (errorEl) errorEl.textContent = message;
}

function isValidEmail(val) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
}

function showSuccess() {
  if (!formCard) return;

  const successHtml = `
    <div class="form-success" style="display:flex;">
      <div class="form-success__icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M5 12.5l4.5 4.5L19 8" stroke="#fff" stroke-width="2.5"
                stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <p class="form-success__title">Заявка принята!</p>
      <p class="form-success__text">
        Переходим в Telegram-бот для завершения регистрации…
      </p>
    </div>
  `;
  formCard.innerHTML = successHtml;
}

/* ---- Lightweight input highlight on error focus ---- */
document.addEventListener('input', e => {
  if (e.target.classList.contains('form-input--error')) {
    e.target.classList.remove('form-input--error');
    const errorEl = e.target.parentElement.querySelector('.form-error');
    if (errorEl) errorEl.textContent = '';
  }
}, true);

/* ---- Add error style to CSS dynamically ---- */
(function injectErrorStyle() {
  const style = document.createElement('style');
  style.textContent = `.form-input--error { box-shadow: inset 0 0 0 1.5px #D92D20 !important; }`;
  document.head.appendChild(style);
})();
