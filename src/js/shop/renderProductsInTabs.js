import { createProductCart } from './createProductCart.js';

/**
 * Рендерит продукты по категориям в соответствующие вкладки табов
 * @param {Array} products - Массив всех продуктов
 */
function renderProductsInTabs(products) {
  const tabsContents = document.querySelectorAll('[data-js-tabs-content]');
  const allList = tabsContents[0]?.querySelector('.gifts__list');
  const workList = tabsContents[1]?.querySelector('.gifts__list');
  const healthList = tabsContents[2]?.querySelector('.gifts__list');
  const harmonyList = tabsContents[3]?.querySelector('.gifts__list');

  if (!allList || !workList || !healthList || !harmonyList) {
    return;
  }

  [allList, workList, healthList, harmonyList].forEach((list) => {
    list.innerHTML = '';
  });

  createProductCart(products, allList);

  createProductCart(
    products.filter((product) => product.category.toLowerCase() === 'for work'),
    workList,
  );

  createProductCart(
    products.filter(
      (product) => product.category.toLowerCase() === 'for health',
    ),
    healthList,
  );

  createProductCart(
    products.filter(
      (product) => product.category.toLowerCase() === 'for harmony',
    ),
    harmonyList,
  );
}

export default renderProductsInTabs;
