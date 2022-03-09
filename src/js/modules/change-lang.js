import { langArr } from './data-lang.js';
import { disableForm } from './utils.js';
import { textAnim } from './animations.js';

// select lang input
const selectHeader = document.querySelector('.lang__header');
const selectItems = document.querySelectorAll('.lang__item');
const langTexts = document.querySelectorAll('[data-text]');
const langPlaceholders = document.querySelectorAll('.feedback__input');
const select = document.querySelector('.lang');
const currentValue = select.querySelector('.lang__current');

export const changeLang = (lang) => {
  currentValue.dataset.type = lang;
  currentValue.querySelector('span').textContent = lang;
  langTexts.forEach((elem) => {
    elem.innerHTML = langArr[`${lang}`][elem.dataset.text];
  });

  langPlaceholders.forEach((elem) => {
    elem.placeholder = langArr[`${lang}`][elem.dataset.placeholder];
  });

  textAnim();
};

// select lang options
selectItems.forEach((option) => {
  option.addEventListener('click', (evt) => {
    const value = evt.currentTarget.textContent;
    const langType = evt.currentTarget.dataset.type;

    currentValue.dataset.type = langType;
    currentValue.querySelector('span').textContent = value;
    select.classList.remove('lang_active');

    localStorage.setItem('myLang', langType);

    changeLang(langType);

    if (langType === currentValue.dataset.type) {
      const selects = select.querySelectorAll('.lang__item');

      selects.forEach((el) => {
        el.classList.remove('active');
      });

      evt.currentTarget.classList.add('active');
    }

    if (document.querySelector('.feedback__timer').classList.contains('feedback__timer_active')) {
      disableForm(30);
    }
  });
});

selectHeader.addEventListener('click', (evt) => {
  evt.currentTarget.closest('.lang').classList.toggle('lang_active');
});
