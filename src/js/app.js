'use strict';

import scrollUp from './modules/scrollUp';
import popup from './modules/popup';
import initCountdown from './modules/timer-countdown';
import menuBurger from './modules/menu-burger';
import TabsCollection from './modules/Tabs';
import { sliderCristmasShop } from './shop/slider';
import products from './shop/products.json';
import { renderBestGifts } from './shop/renderBestGifts.js';
import renderProductsInTabs from './shop/renderProductsInTabs.js';
import setupGiftModal from './shop/setupGiftModal.js';

window.addEventListener('DOMContentLoaded', () => {
  initCountdown('.countdown', '1 January 2026 00:00', 'The timer is over');
  popup();
  scrollUp({
    offset: 300,
    maxWidth: 768,
  });
  menuBurger();
  new TabsCollection();
  sliderCristmasShop();
  renderBestGifts(products);
  renderProductsInTabs(products);
  setupGiftModal(products);
});
