import { langArr } from './data-lang.js';
/* eslint-disable func-names */
/* Проверка поддержки webp, добавление класса webp или no-webp для HTML */
function isWebp() {
  // Проверка поддержки webp
  function testWebP(callback) {
    let webP = new Image();
    // eslint-disable-next-line no-multi-assign
    webP.onload = webP.onerror = function () {
      callback(webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  }
  // Добавление класса _webp или _no-webp для HTML
  testWebP(function (support) {
    let className = support === true ? 'webp' : 'no-webp';
    document.documentElement.classList.add(className);
  });
}

const random = (min, max) => {
  return (Math.random() * (max - min)) + min;
};

const disableForm = (seconds = 30) => {
  const form = document.querySelector('.feedback');
  const formBtn = form.querySelector('.feedback__btn');
  const timer = form.querySelector('.feedback__timer');
  const timerValue = timer.querySelector('.feedback__timer-value');

  formBtn.disabled = true;
  setTimeout(() => { formBtn.disabled = false; }, seconds * 1000);
  timer.classList.add('feedback__timer_active');

  for (let i = seconds, j = 0; i >= 0; i--) {
    setTimeout(() => {
      timerValue.textContent = i;
      if (i === 0) {
        timer.classList.remove('feedback__timer_active');
      }
    }, 1000 * j++);
  }
};

const onSuccessMsgClick = (evt) => {
  if (evt.target.closest('.success__inner') === null) {
    // eslint-disable-next-line no-use-before-define
    closeSuccessMsg();
  }
};

const onSuccessMsgEscKeydown = (evt) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    // eslint-disable-next-line no-use-before-define
    closeSuccessMsg();
  }
};

function closeSuccessMsg() {
  document.body.querySelector('.success').remove();
  document.removeEventListener('click', onSuccessMsgClick);
  document.removeEventListener('keydown', onSuccessMsgEscKeydown);
}

const openSuccessMsg = () => {
  const successTemplate = document.querySelector('#success').content.querySelector('.success');
  const successElement = successTemplate.cloneNode(true);
  document.body.appendChild(successElement);

  document.addEventListener('keydown', onSuccessMsgEscKeydown);

  successElement.querySelector('.success__button').addEventListener('click', closeSuccessMsg);

  document.addEventListener('click', onSuccessMsgClick);

  const langTexts = document.querySelector('.success').querySelectorAll('[data-text]');
  const currLang = document.querySelector('.lang__current').dataset.type;

  langTexts.forEach((elem) => {
    // eslint-disable-next-line no-param-reassign
    elem.innerHTML = langArr[`${currLang}`][elem.dataset.text];
  });

  disableForm(30);
};

const onErrorMsgClick = (evt) => {
  if (evt.target.closest('.error__inner') === null) {
    // eslint-disable-next-line no-use-before-define
    closeErrorMsg();
  }
};

const onErrorMsgEscKeydown = (evt) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    // eslint-disable-next-line no-use-before-define
    closeErrorMsg();
  }
};

function closeErrorMsg() {
  document.body.querySelector('.error').remove();
  document.removeEventListener('click', onErrorMsgClick);
  document.removeEventListener('keydown', onErrorMsgEscKeydown);
}

const openErrorMsg = () => {
  const errorTemplate = document.querySelector('#error').content.querySelector('.error');
  const errorElement = errorTemplate.cloneNode(true);
  document.body.appendChild(errorElement);

  document.addEventListener('keydown', onErrorMsgEscKeydown);

  errorElement.querySelector('.error__button').addEventListener('click', closeErrorMsg);

  document.addEventListener('click', onErrorMsgClick);
  const langTexts = document.querySelector('.error').querySelectorAll('[data-text]');
  const currLang = document.querySelector('.lang__current').dataset.type;

  langTexts.forEach((elem) => {
    // eslint-disable-next-line no-param-reassign
    elem.innerHTML = langArr[`${currLang}`][elem.dataset.text];
  });
};

export { isWebp, random, openSuccessMsg, openErrorMsg, disableForm };
