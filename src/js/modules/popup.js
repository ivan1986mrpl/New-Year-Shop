import { bodyLock, bodyUnlock, bodyLockStatus } from '../function';

// Загрузка звука для открытия попапа
const popupOpenSound = new Audio('assets/audio/modal.mp3');

// Громкость звука от 0 до 1 (0 — без звука, 1 — максимальная громкость)
const volume = 0.4;

const playSound = (sound) => {
  sound.volume = volume;
  sound.currentTime = 0;
  sound.play().catch(() => {});
};

export default function popup() {
  document.body.addEventListener('click', (e) => {
    const popupLink = e.target.closest('.popup-link');
    if (popupLink) {
      e.preventDefault();
      const popupName = popupLink.getAttribute('href').replace('#', '');
      const currentPopup = document.getElementById(popupName);
      popupOpen(currentPopup);
      return;
    }

    const closeBtn = e.target.closest('.close-popup');
    if (closeBtn) {
      e.preventDefault();
      const popup = closeBtn.closest('.popup');
      popupClose(popup);
      return;
    }
  });

  document.body.addEventListener('click', (e) => {
    const openPopup = document.querySelector('.popup.open');
    if (
      openPopup &&
      !e.target.closest('.popup__content') &&
      e.target.closest('.popup')
    ) {
      popupClose(openPopup);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape') {
      const popupActive = document.querySelector('.popup.open');
      if (popupActive) {
        popupClose(popupActive);
      }
    }
  });

  function popupOpen(currentPopup) {
    if (currentPopup && bodyLockStatus) {
      const popupActive = document.querySelector('.popup.open');
      if (popupActive) {
        popupClose(popupActive, false);
      } else {
        bodyLock();
      }
      currentPopup.classList.add('open');
      playSound(popupOpenSound); // Воспроизведение звука при открытии
    }
  }

  function popupClose(popupActive, doUnlock = true) {
    if (popupActive && bodyLockStatus) {
      popupActive.classList.remove('open');
      if (doUnlock) {
        bodyUnlock();
      }
    }
  }
}
