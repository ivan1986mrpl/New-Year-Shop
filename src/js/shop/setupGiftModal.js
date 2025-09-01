import getCategoryColor from './getCategoryColor';

/**
 * @param {Array} products - список подарков
 */
export default function setupGiftModal(products) {
  const modal = document.querySelector('.popup');
  const modalTitle = modal.querySelector('.popup-card__title');
  const modalSubtitle = modal.querySelector('.popup-card__subtitle');
  const modalDescription = modal.querySelector('.popup-card__description p');
  const modalImage = modal.querySelector('.popup-card__img');

  document.querySelectorAll('.popup-link').forEach((link, index) => {
    link.addEventListener('click', () => {
      const product = products[index];
      if (!product) {
        return;
      }

      // Обновляем заголовки и описание
      modalTitle.textContent = product.name;
      modalSubtitle.textContent = product.category;
      modalSubtitle.className = `popup-card__subtitle ${getCategoryColor(product.category)}`;
      modalDescription.textContent = product.description;

      // Обновляем картинку
      modalImage.src = `assets/img/third-best/${(index % 4) + 1}.png`;
    });
  });
}
