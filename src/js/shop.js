const shopList = document.querySelector('.shop-list');

const items = [
  {
    id: 1,
    name: 'Skip animation',
    description: 'Skips slots animation',
    price: 50,
    // effect: skipAnimation,
  },
];

function itemTemplate({ name, description, price }) {
  return `
              <li class="shop-item">
            <h2 class="item-title">${name}</h2>
            <p class="item-desc">${description}</p>
            <p class="item-price">$${price}</p>
            <button type="button">Buy</button>
          </li>
    `;
}

function itemsTemplate(items) {
  return items.map(itemTemplate).join('');
}

function renderItems(items) {
  const markup = itemsTemplate(items);
  shopList.innerHTML = markup;
}

renderItems(items);
