import getCategoryColor from './getCategoryColor';

export default function setupGiftModal(products) {
  const modal = document.querySelector('.popup');
  if (!modal) {
    return;
  }

  const modalTitle = modal.querySelector('.popup-card__title');
  const modalSubtitle = modal.querySelector('.popup-card__subtitle');
  const modalDescription = modal.querySelector('.popup-card__description p');
  const modalImage = modal.querySelector('.popup-card__img');

  document.body.addEventListener('click', (e) => {
    const link = e.target.closest('.popup-link');
    if (!link) {
      return;
    }

    const productId = link.dataset.productId;
    const imgIndex = link.dataset.imgIndex;
    const product = products.find((p) => p.id === productId);
    if (!product) {
      return;
    }

    modalTitle.textContent = product.name;
    modalSubtitle.textContent = product.category;
    modalSubtitle.className = `popup-card__subtitle ${getCategoryColor(product.category)}`;
    modalDescription.textContent = product.description;

    modalImage.src = `assets/img/third-best/${imgIndex}.png`;
  });
}
