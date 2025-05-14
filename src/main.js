import { Random } from 'random-js';
const random = new Random();

import './js/shop';

const prizes = [
  { symbol: '🪙', weight: 3 },
  { symbol: '🍒', weight: 3 },
  { symbol: '🍋', weight: 3 },
  { symbol: '⭐', weight: 2 },
  { symbol: '💵', weight: 2 },
  { symbol: '7️⃣', weight: 1 },
  { symbol: '🔔', weight: 3 },
];

const numOfSpinsDisplay = document.querySelector('.number-of-spins');
let numberOfSpins = JSON.parse(localStorage.getItem('numberOfSpins')) || 0;
numOfSpinsDisplay.textContent = numberOfSpins;

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
  numberOfSpins++;
  numOfSpinsDisplay.textContent = numberOfSpins;
  localStorage.setItem('numberOfSpins', JSON.stringify(numberOfSpins));

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
    let lastMoney = money;

    setText();

    setMoneyText(lastMoney);

    if (numberOfSpins % 10 === 0) {
      text.textContent += '\n Bonus Spin! 🎁 +1';
      setTimeout(() => {
        spinButton.click();
      }, 100);
    }
  }, 210 * 3);
});

function setMoneyText(lastMoney) {
  let delta = money - lastMoney;
  if (delta > 0) {
    text.textContent += ` (+$${delta.toFixed(2)})`;
  } else if (delta === 0) {
    text.textContent += ` (No win)`;
  } else {
    text.textContent += ` (-$1.00 spin)`;
  }
}

function setText() {
  const s1 = slots.slot1.textContent;
  const s2 = slots.slot2.textContent;
  const s3 = slots.slot3.textContent;

  if (s1 === s2 && s2 === s3) {
    switch (s1) {
      case '🪙':
        money += 5;
        break;
      case '🍒':
        money += 3;
        break;
      case '🍋':
        money += 2;
        break;
      case '⭐':
        money += 4;
        break;
      case '💵':
        money += 25;
        break;
      case '7️⃣':
        money *= 3;
        break;
      case '🔔':
        money += 3;
        break;
    }
    text.textContent = 'You won!';
  } else if (s1 === s2 || s2 === s3 || s1 === s3) {
    let selectedSlot = s2 === s3 ? s2 : s1;
    switch (selectedSlot) {
      case '🪙':
        money += 2;
        break;
      case '🍒':
        money += 1.5;
        break;
      case '🍋':
        money += 1;
        break;
      case '⭐':
        money += 2;
        break;
      case '💵':
        money += 10;
        break;
      case '7️⃣':
        money *= 1.5;
        break;
      case '🔔':
        money += 1;
        break;
    }
    text.textContent = 'So close!';
  } else {
    money += 0.2;
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
