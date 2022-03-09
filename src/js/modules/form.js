import { sendForm } from './api.js';
import { openSuccessMsg, openErrorMsg } from './utils.js';

const MIN_NAME_LENGTH = 3;
const MAX_NAME_LENGTH = 20;
const EMAIL_REG_EXP = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
const form = document.querySelector('.feedback');
const name = form.querySelector('[name="name"]');
const nameError = form.querySelector('[name="name"] + span.feedback__error');
const email = form.querySelector('[name="email"');
const emailError = form.querySelector('[name="email"] + span.feedback__error');

const nameHandler = () => {
  const currLang = document.querySelector('.lang__current').dataset.type;

  if (name.value.length === 0) {
    nameError.textContent = '';
    name.classList.remove('feedback__input_invalid');
    nameError.classList.remove('feedback__error_active');
  } else if (name.value.match(/[0-9]/)) {
    if (currLang === 'en') {
      nameError.textContent = 'The name must consist only of letters.';
    } else {
      nameError.textContent = 'Имя должно состоять только из букв.';
    }

    name.classList.add('feedback__input_invalid');
    nameError.classList.add('feedback__error_active');
  } else if (name.value.length < MIN_NAME_LENGTH) {
    if (currLang === 'en') {
      nameError.textContent = `The minimum number of characters in the name: ${MIN_NAME_LENGTH}. There's still ${MIN_NAME_LENGTH - name.value.length}`;
    } else {
      nameError.textContent = `Минимальное количество символов в имени: ${MIN_NAME_LENGTH}. Осталось ещё ${MIN_NAME_LENGTH - name.value.length}`;
    }

    name.classList.add('feedback__input_invalid');
    nameError.classList.add('feedback__error_active');
  } else {
    nameError.textContent = '';
    name.classList.remove('feedback__input_invalid');
    nameError.classList.remove('feedback__error_active');
  }
};

const emailHandler = () => {
  const currLang = document.querySelector('.lang__current').dataset.type;

  if (email.value.length === 0) {
    emailError.textContent = '';
    email.classList.remove('feedback__input_invalid');
    emailError.classList.remove('feedback__error_active');
  } else if (!EMAIL_REG_EXP.test(email.value.toLowerCase())) {
    if (currLang === 'en') {
      emailError.textContent = 'Entered value needs to be an e-mail address.';
    } else {
      emailError.textContent = 'Вводимое значение должно быть адресом электронной почты.';
    }
    email.classList.add('feedback__input_invalid');
    emailError.classList.add('feedback__error_active');
  } else {
    emailError.textContent = '';
    email.classList.remove('feedback__input_invalid');
    emailError.classList.remove('feedback__error_active');
  }
};

name.addEventListener('input', nameHandler);
email.addEventListener('input', emailHandler);

form.addEventListener('submit', (evt) => {
  const currLang = document.querySelector('.lang__current').dataset.type;
  evt.preventDefault();

  if (!name.value.length > 0) {
    if (currLang === 'en') {
      nameError.textContent = 'You need to enter the name.';
    } else {
      nameError.textContent = 'Необходимо ввести имя.';
    }

    name.classList.add('feedback__input_invalid');
    nameError.classList.add('feedback__error_active');
  }

  if (!email.value.length > 0) {
    if (currLang === 'en') {
      emailError.textContent = 'You need to enter an e-mail address.';
    } else {
      emailError.textContent = 'Необходимо ввести адрес электронной почты.';
    }

    email.classList.add('feedback__input_invalid');
    emailError.classList.add('feedback__error_active');
  } else if (!EMAIL_REG_EXP.test(email.value.toLowerCase())) {
    emailHandler();
  } else {
    sendForm(
      () => openSuccessMsg(),
      () => openErrorMsg(),
      new FormData(evt.target)
    );
  }
});
