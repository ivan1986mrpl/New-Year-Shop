const sliderCristmasShop = () => {
  const slider = document.querySelector('.slider');
  if (!slider) {
    return;
  }

  const sliderInner = slider.querySelector('.slider__inner');
  const slides = slider.querySelectorAll('.slider__slide');
  const btnPrev = slider.querySelector('.slider__button-prew');
  const btnNext = slider.querySelector('.slider__button-next');

  let currentIndex = 0;
  let slideWidth;
  let maxIndex;

  // Обновление настроек слайдера (при изменении размера экрана)
  function updateSliderSettings() {
    const gap = parseInt(getComputedStyle(sliderInner).gap) || 0;
    slideWidth = slides[0].offsetWidth + gap; // Ширина одного слайда

    // Максимальный индекс слайда (когда все слайды прокручены)
    maxIndex = slides.length - 1;

    currentIndex = 0;

    updatePosition();
    updateButtons();
  }

  // Обновление позиции слайдера
  function updatePosition() {
    sliderInner.style.transform = `translateX(${-currentIndex * slideWidth}px)`;
  }

  // Обновление состояния кнопок (активные/неактивные)
  function updateButtons() {
    currentIndex === 0
      ? btnPrev.classList.add('disabled')
      : btnPrev.classList.remove('disabled');

    currentIndex >= maxIndex
      ? btnNext.classList.add('disabled')
      : btnNext.classList.remove('disabled');
  }

  // Обработчик для кнопки "Предыдущий"
  btnPrev.addEventListener('click', () => {
    if (currentIndex > 0) {
      if (window.innerWidth <= 768) {
        currentIndex = Math.max(currentIndex - 0.5, 0); // Прокручиваем на половину слайда для экранов <= 768px
      } else {
        currentIndex--; // Прокручиваем на 1 слайд для экранов > 768px
      }
      updatePosition();
      updateButtons();
    }
  });

  // Обработчик для кнопки "Следующий"
  btnNext.addEventListener('click', () => {
    if (currentIndex < maxIndex) {
      if (window.innerWidth <= 768) {
        currentIndex = Math.min(currentIndex + 0.5, maxIndex); // Прокручиваем на половину слайда для экранов <= 768px
      } else {
        currentIndex++; // Прокручиваем на 1 слайд для экранов > 768px
      }
      updatePosition();
      updateButtons();
    }
  });

  // Обработчик изменения размера окна
  window.addEventListener('resize', () => {
    updateSliderSettings(); // Пересчитываем настройки слайдера при изменении ширины экрана
  });

  // Инициализация слайдера
  updateSliderSettings();
};

export { sliderCristmasShop };
