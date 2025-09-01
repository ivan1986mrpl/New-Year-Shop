import getCategoryColor from './getCategoryColor';

function getRandomProducts(products, count = 4) {
  const shuffled = [...products].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function renderBestGifts(products) {
  const bestList = document.querySelector('.best__list');
  if (!bestList) return;

  bestList.innerHTML = ''; // очищаем текущие карточки

  const selected = getRandomProducts(products);

  selected.forEach((product, index) => {
    const li = document.createElement('li');
    li.classList.add('best__item');

    const categoryColor = getCategoryColor(product.category);

    li.innerHTML = `
      <a href="#popup" class="popup-link">
        <article class="card">
          <div class="card__image">
            <img 
              src="assets/img/third-best/${(index % 4) + 1}.png"
              width="310"
              height="230"
              alt="gift"
              loading="lazy"
              class="card__img"
            />
          </div>
          <div class="card__inner">
            <div class="card__subtitle ${categoryColor}">${product.category}</div>
            <h3 class="card__title">${product.name}</h3>
          </div>
        </article>
      </a>
    `;

    bestList.appendChild(li);
  });
}

export { renderBestGifts };
