// smooth scrolling
const anchors = document.querySelectorAll('a[href*="#"]');

anchors.forEach((anchor) => {
  anchor.addEventListener('click', (event) => {
    event.preventDefault();
    const blockID = anchor.getAttribute('href');
    document.querySelector('' + blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
});
