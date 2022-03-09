// parallax
const parallax = (evt) => {
  document.querySelectorAll('.parallax__img').forEach(el => {
    const speed = el.getAttribute('data-speed');
    const x = (window.screen.width - evt.clientX * speed) / 100;
    const y = (window.screen.height - evt.clientY * speed) / 100;
    // eslint-disable-next-line no-param-reassign
    el.style.transform = `translateX(${x}px) translateY(${y}px)`;
  });
};

if (window.matchMedia('(min-width: 768px)').matches) {
  document.addEventListener('mousemove', parallax);
} else {
  document.removeEventListener('mousemove', parallax);
}
