/* eslint-disable no-undef */
import { random } from './utils.js';

const easing = BezierEasing(0.770, 0.125, 0.265, 1.040);

const homeTl = gsap.timeline({
  defaults:
  {
    ease: easing
  }
});

const headerTl = gsap.timeline({
  defaults:
  {
    ease: easing
  }
});

const headerAnim = headerTl
  .from('.user__post', {
    opacity: 0,
    y: -100,
    delay: 0.3
  })
  .from('.user__name', {
    opacity: 0,
    y: -50
  }, '-=0.1')
  .from('.user img', {
    opacity: 0,
    rotateX: 180,
    duration: 1
  }, '-=0.1')
  .from('.menu__link', {
    opacity: 0,
    x: -200,
    stagger: 0.2,
    duration: 0.4
  }, '-=0.6')
  .from('.lang', {
    opacity: 0,
    y: -30
  })
  .from('.social__link', {
    opacity: 0,
    y: -30,
    stagger: 0.2
  }, '-=0.6');

const homeAnim = homeTl
  .from('.home__title', {
    opacity: 0,
    y: -100,
    delay: 0.5
  })
  .from('.home__subtitle', {
    opacity: 0,
    y: -100
  }, '-=0.2')
  .from('.home__text', {
    opacity: 0
  })
  .from('.home__btn', {
    opacity: 0,
    y: 100
  });

const textAnim = () => {
  const text = document.querySelector('.home__text');

  const splitText = (el) => {
    el.innerHTML = el.textContent.replace(/(\S*)/g, m => {
      return '<div class="word">' +
        m.replace(/(-|#|@)?\S(-|#|@)?/g, "<div class='letter'>$&</div>") +
        '</div>';
    });
    return el;
  };

  const split = splitText(text);

  Array.from(split.querySelectorAll('.letter')).forEach((el, idx) => {
    TweenMax.from(el, 2.5, {
      opacity: 0,
      scale: 0.1,
      x: random(-500, 500),
      y: random(-500, 500),
      z: random(-500, 500),
      delay: idx * 0.02,
      repeat: 0
    });
  });
};

export { textAnim, headerAnim, homeAnim };
