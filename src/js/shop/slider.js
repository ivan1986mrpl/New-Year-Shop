const sliderCristmasShop = () => {
  const slider = document.querySelector('.slider');
  if (!slider) {
    return;
  }

  const sliderInner = slider.querySelector('.slider__inner');
  const slides = slider.querySelectorAll('.slider__slide');
  const btnPrev = slider.querySelector('.slider__button-prev');
  const btnNext = slider.querySelector('.slider__button-next');

  if (!sliderInner || slides.length === 0 || !btnPrev || !btnNext) {
    return;
  }

  let currentIndex = 0;
  let slideWidth;
  let maxIndex;

  let isDragging = false;
  let startPos = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let animationID = 0;

  function updateSliderSettings() {
    const gap = parseInt(getComputedStyle(sliderInner).gap) || 0;
    slideWidth = slides[0].offsetWidth + gap;
    maxIndex = slides.length - 1;

    currentIndex = 0;
    currentTranslate = 0;
    prevTranslate = 0;

    setSliderPosition();
    updateButtons();
  }

  function setSliderPosition() {
    sliderInner.style.transform = `translateX(${currentTranslate}px)`;
  }

  function updatePosition() {
    currentTranslate = -currentIndex * slideWidth;
    prevTranslate = currentTranslate;
    setSliderPosition();
  }

  function updateButtons() {
    btnPrev.classList.toggle('disabled', currentIndex === 0);
    btnNext.classList.toggle('disabled', currentIndex >= maxIndex);
    btnPrev.disabled = currentIndex === 0;
    btnNext.disabled = currentIndex >= maxIndex;
  }

  function animation() {
    setSliderPosition();
    if (isDragging) {
      requestAnimationFrame(animation);
    }
  }

  function touchStart(index) {
    return function (event) {
      isDragging = true;
      startPos = getPositionX(event);
      animationID = requestAnimationFrame(animation);
      sliderInner.classList.add('grabbing');
    };
  }

  function touchMove(event) {
    if (!isDragging) {
      return;
    }
    const currentPosition = getPositionX(event);
    const diff = currentPosition - startPos;
    currentTranslate = prevTranslate + diff;
  }

  function touchEnd() {
    cancelAnimationFrame(animationID);
    isDragging = false;
    sliderInner.classList.remove('grabbing');

    const movedBy = currentTranslate - prevTranslate;

    if (movedBy < -slideWidth / 4 && currentIndex < maxIndex) {
      currentIndex++;
    }
    if (movedBy > slideWidth / 4 && currentIndex > 0) {
      currentIndex--;
    }

    updatePosition();
    updateButtons();
  }

  function getPositionX(event) {
    return event.type.includes('mouse')
      ? event.pageX
      : event.touches[0].clientX;
  }

  btnPrev.addEventListener('click', () => {
    if (currentIndex > 0) {
      if (window.innerWidth <= 768) {
        currentIndex = Math.max(currentIndex - 0.5, 0);
      } else {
        currentIndex--;
      }
      updatePosition();
      updateButtons();
    }
  });

  btnNext.addEventListener('click', () => {
    if (currentIndex < maxIndex) {
      if (window.innerWidth <= 768) {
        currentIndex = Math.min(currentIndex + 0.5, maxIndex);
      } else {
        currentIndex++;
      }
      updatePosition();
      updateButtons();
    }
  });

  window.addEventListener('resize', updateSliderSettings);

  sliderInner.addEventListener('touchstart', touchStart(), { passive: true });
  sliderInner.addEventListener('touchmove', touchMove, { passive: true });
  sliderInner.addEventListener('touchend', touchEnd);

  sliderInner.addEventListener('mousedown', touchStart());
  sliderInner.addEventListener('mousemove', touchMove);
  sliderInner.addEventListener('mouseup', touchEnd);
  sliderInner.addEventListener('mouseleave', () => {
    if (isDragging) {
      touchEnd();
    }
  });

  updateSliderSettings();
};

export { sliderCristmasShop };
