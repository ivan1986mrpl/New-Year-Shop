import getCategoryColor from './getCategoryColor';

function createProductCart(products, containerElement) {
  if (!containerElement) {
    return;
  }

  products.forEach((product, index) => {
    const li = document.createElement('li');
    li.classList.add('gifts__item');

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

    containerElement.appendChild(li);
  });
}

export { createProductCart };
