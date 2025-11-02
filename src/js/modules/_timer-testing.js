export default function initCountdown(
  parentSelector,
  to,
  timerEndMessage,
  lang,
) {
  const decCache = [];
  const decCases = [2, 0, 1, 1, 1, 2];

  const languageMap = {
    ru: {
      day: ['день', 'дня', 'дней'],
      hour: ['час', 'часа', 'часов'],
      minute: ['минута', 'минуты', 'минут'],
      second: ['секунда', 'секунды', 'секунд'],
    },
    ua: {
      day: ['день', 'дні', 'днів'],
      hour: ['година', 'години', 'годин'],
      minute: ['хвилина', 'хвилини', 'хвилин'],
      second: ['секунда', 'секунди', 'секунд'],
    },
    en: {
      day: ['day', 'days', 'days'],
      hour: ['hour', 'hours', 'hours'],
      minute: ['minute', 'minutes', 'minutes'],
      second: ['second', 'seconds', 'seconds'],
    },
  };

  if (!lang) {
    const htmlLang = document.documentElement.lang.toLowerCase();
    lang = Object.keys(languageMap).includes(htmlLang) ? htmlLang : 'en';
  }

  const dictionary = languageMap[lang] || languageMap.en;

  function decOfNum(number, titles) {
    if (!decCache[number]) {
      decCache[number] =
        number % 100 > 4 && number % 100 < 20
          ? 2
          : decCases[Math.min(number % 10, 5)];
    }
    return titles[decCache[number]];
  }

  function addLeadingZero(num) {
    return num; // Или: return num < 10 ? '0' + num : num;
  }

  if (!parentSelector || !to) {
    // console.error('[Countdown] Не передан селектор или конечное время.');
    return;
  }

  const rootElements = document.querySelectorAll(parentSelector);
  if (rootElements.length === 0) {
    //   console.warn(
    //     `[Countdown] Элементы по селектору не найдены: ${parentSelector}`,
    //   );
    return;
  }

  let toCountDate;
  if (typeof to === 'string') {
    toCountDate = new Date(to);
    if (isNaN(toCountDate)) {
      // console.error(`[Countdown] Неверная дата: ${to}`);
      return;
    }
  } else if (typeof to === 'number') {
    toCountDate = new Date(Date.now() + to * 1000);
  } else {
    // console.error('[Countdown] Аргумент "to" должен быть строкой или числом.');
    return;
  }

  let timer = setInterval(countdown, 1000);

  function countdown() {
    const now = new Date();
    const totalSeconds = Math.floor((toCountDate - now) / 1000);

    if (totalSeconds <= 0) {
      clearInterval(timer);
      rootElements.forEach((root) => {
        root.textContent = timerEndMessage;
      });
      return;
    }

    const timeData = {
      days: Math.floor(totalSeconds / 86400),
      hours: Math.floor((totalSeconds / 3600) % 24),
      minutes: Math.floor((totalSeconds / 60) % 60),
      seconds: totalSeconds % 60,
    };

    const timeUnits = [
      { key: 'days', titles: dictionary.day, hideIfZero: true },
      { key: 'hours', titles: dictionary.hour },
      { key: 'minutes', titles: dictionary.minute },
      { key: 'seconds', titles: dictionary.second },
    ];

    rootElements.forEach((root) => {
      timeUnits.forEach(({ key, titles, hideIfZero }) => {
        const value = timeData[key];
        const block = root.querySelector(`.${key}`);
        if (!block) {
          return;
        }

        if (hideIfZero && value <= 0) {
          block.style.display = 'none';
          return;
        }

        const numEl = block.querySelector('.num');
        const nameEl = block.querySelector('.name');

        if (numEl) {
          numEl.textContent = addLeadingZero(value);
        }
        if (nameEl) {
          nameEl.textContent = decOfNum(value, titles);
        }
      });
    });
  }

  countdown();
}
