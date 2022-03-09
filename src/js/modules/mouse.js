const mouse = document.querySelector('.mouse');

const moveMouse = (evt) => {
  // the difference between the size of the before element and the mouse
  const mouseDiff = 5;

  if (
    evt.clientX < mouseDiff ||
    evt.clientY < mouseDiff ||
    evt.clientY > (window.innerHeight - mouseDiff) ||
    evt.clientX > (window.innerWidth - mouseDiff)
  ) {
    mouse.style.opacity = 0;
  } else {
    mouse.style.opacity = 1;
    mouse.style.transform = `translate(${evt.clientX - 15}px, ${evt.clientY - 15}px)`;
  }
};

if (window.innerWidth >= 768) {
  document.addEventListener('mousemove', moveMouse);

  const links = document.querySelectorAll('a, button');
  const portfolioItems = document.querySelectorAll('.box a');

  links.forEach(link => {
    link.addEventListener('mouseover', () => {
      mouse.classList.add('link-visible');
    });
    link.addEventListener('mouseleave', () => {
      mouse.classList.remove('link-visible');
    });
  });

  portfolioItems.forEach(item => {
    item.addEventListener('mouseover', () => {
      mouse.classList.add('view-visible');
    });
    item.addEventListener('mouseleave', () => {
      mouse.classList.remove('view-visible');
    });
  });
}
