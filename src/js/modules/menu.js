import { headerAnim } from './animations.js';

// burger menu
const burger = document.querySelector('.burger');
const header = document.querySelector('.header');

burger.addEventListener('click', () => {
  burger.classList.toggle('burger--toggle');
  header.classList.toggle('header--toggle');

  if (header.classList.contains('header--toggle')) {
    headerAnim.restart();
  }
});

export const closeMenu = () => {
  burger.classList.remove('burger--toggle');
  header.classList.remove('header--toggle');

  const about = document.querySelector('.about');
  const scrollTop = document.querySelector('.scroll__top');

  if (window.pageYOffset >= about.offsetTop) {
    scrollTop.classList.add('scroll__top--active');
  } else {
    scrollTop.classList.remove('scroll__top--active');
  }
};
