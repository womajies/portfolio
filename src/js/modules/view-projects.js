const boxes = document.querySelectorAll('.portfolio .box');
const showMore = document.querySelector('.portfolio__btn');
const MAX_SHOW_BOX = 6;

boxes.forEach((box, index) => {
  if (index >= MAX_SHOW_BOX) {
    box.style.display = 'none';
  }
});

showMore.addEventListener('click', (evt) => {
  const showMoreDiv = showMore.querySelector('div');
  const showMoreIsShowed = showMore.classList.contains('showed');

  if (localStorage.getItem('myLang') === 'en' && !(showMoreIsShowed)) {
    showMoreDiv.textContent = 'Hide';
  } else if (localStorage.getItem('myLang') === 'ru' && !(showMoreIsShowed)) {
    showMoreDiv.textContent = 'Скрыть';
  } else if (localStorage.getItem('myLang') === 'en' && showMoreIsShowed) {
    showMoreDiv.textContent = 'Show more';
  } else if (localStorage.getItem('myLang') === 'ru' && showMoreIsShowed) {
    showMoreDiv.textContent = 'Показать ещё';
  }

  showMore.classList.toggle('showed');

  if (showMore.classList.contains('showed')) {
    boxes.forEach((box) => {
      box.style.display = 'block';
    });
  } else {
    boxes.forEach((box, index) => {
      if (index >= MAX_SHOW_BOX) {
        box.style.display = 'none';
      }
    });
  }
});
