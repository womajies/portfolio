import { isWebp } from './modules/utils.js';
import './modules/lazyload.js';
import './modules/parallax.js';
import { changeLang } from './modules/change-lang.js';
import { closeMenu } from './modules/menu.js';
import { headerAnim, homeAnim } from './modules/animations.js';
import './modules/mouse.js';
import './modules/smooth-scroll.js';
import './modules/view-projects.js';
import './modules/change-color-letter.js';
import './modules/form.js';

isWebp();

window.addEventListener('scroll', closeMenu);
window.addEventListener('load', () => {
  const preloader = document.querySelector('.preloader');
  preloader.classList.add('preloader-animation');

  setTimeout(() => {
    preloader.classList.remove('preloader-animation');
    preloader.classList.add('preloader-hidden');
  }, 3000);

  setTimeout(() => {
    closeMenu();
    headerAnim.restart();
    homeAnim.restart();
    preloader.classList.add('preloader-none');
    if (!(localStorage.getItem('myLang') === null)) {
      changeLang(localStorage.getItem('myLang'));
    }
  }, 3200);
});
