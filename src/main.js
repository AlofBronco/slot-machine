import { Random } from 'random-js';
const random = new Random();

const prizes = [
  { symbol: '🪙', weight: 4 },
  { symbol: '🍒', weight: 4 },
  { symbol: '🍋', weight: 5 },
  { symbol: '⭐', weight: 5 },
  { symbol: '💵', weight: 3 },
  { symbol: '7️⃣', weight: 1 },
  { symbol: '🔔', weight: 6 },
];

const slots = {
  slot1: document.querySelector('.slot1'),
  slot2: document.querySelector('.slot2'),
  slot3: document.querySelector('.slot3'),
};
const spinButton = document.querySelector('.spin-button');
const text = document.querySelector('.text');
const moneyDisplay = document.querySelector('.money-display-number');
let money = parseFloat(JSON.parse(localStorage.getItem('money'))) || 100.0;
moneyDisplay.textContent = money.toFixed(2);

const ranges = [];
let totalWeight = 0;
function calcRanges() {
  ranges.length = 0;
  let acc = 0;

  prizes.forEach(curr => {
    const range = {
      symbol: curr.symbol,
      start: acc,
      end: acc + curr.weight - 1,
    };

    ranges.push(range);
    acc += curr.weight;
  });

  totalWeight = acc;
}

calcRanges();

spinButton.addEventListener('click', e => {
  if (money < 1) {
    text.textContent = 'Not enough money!';
    return;
  }
  spinButton.setAttribute('disabled', '');
  money -= 1;
  Object.keys(slots).forEach((slot, index) => {
    setTimeout(() => {
      slots[slot].textContent = getRandomSymbol();
    }, 200 * index);
  });

  setTimeout(() => {
    spinButton.removeAttribute('disabled', '');
    setText();
  }, 210 * 3);
});

function setText() {
  const s1 = slots.slot1.textContent;
  const s2 = slots.slot2.textContent;
  const s3 = slots.slot3.textContent;

  if (s1 === s2 && s2 === s3) {
    switch (s1) {
      case '🪙':
        money += 10;
        break;
      case '🍒':
        money *= 1.1;
        break;
      case '🍋':
        money *= 1.05;
        break;
      case '⭐':
        money += 5;
        break;
      case '💵':
        money += 100;
        break;
      case '7️⃣':
        money *= 10;
        break;
      case '🔔':
        money += 1;
        break;
    }
    text.textContent = 'You won!';
  } else if (s1 === s2 || s2 === s3 || s1 === s3) {
    let selectedSlot;
    if (s2 === s3) {
      selectedSlot = s2;
    } else {
      selectedSlot = s1;
    }
    switch (selectedSlot) {
      case '🪙':
        money += 5;
        break;
      case '🍒':
        money *= 1.05;
        break;
      case '🍋':
        money *= 1.025;
        break;
      case '⭐':
        money += 2.5;
        break;
      case '💵':
        money += 50;
        break;
      case '7️⃣':
        money *= 5;
        break;
      case '🔔':
        money += 0.5;
        break;
    }
    text.textContent = 'So close!';
  } else {
    text.textContent = 'Better luck next time!';
  }

  localStorage.setItem('money', JSON.stringify(money.toFixed(2)));
  moneyDisplay.textContent = money.toFixed(2);
}

function getRandomSymbol() {
  const randomValue = random.integer(0, totalWeight - 1);
  return ranges.find(
    elem => elem.start <= randomValue && elem.end >= randomValue
  ).symbol;
}

document.addEventListener('DOMContentLoaded', () => {
  const shopButton = document.querySelector('.shop-button');
  const shop = document.querySelector('.shop');

  shopButton.addEventListener('click', () => {
    shop.classList.toggle('open');
  });
});
