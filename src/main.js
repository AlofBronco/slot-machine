import { Random } from 'random-js';
const random = new Random();

const prizes = [
  { symbol: '🪙', weight: 5 },
  { symbol: '🍒', weight: 4 },
  { symbol: '🍋', weight: 6 },
  { symbol: '⭐', weight: 5 },
  { symbol: '💵', weight: 3 },
  { symbol: '7️⃣', weight: 1 },
  { symbol: '🔔', weight: 7 },
];

const slots = {
  slot1: document.querySelector('.slot1'),
  slot2: document.querySelector('.slot2'),
  slot3: document.querySelector('.slot3'),
};
const spinButton = document.querySelector('.spin-button');
const text = document.querySelector('.text');

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

  console.log(ranges);
  console.log(totalWeight);
}

calcRanges();

spinButton.addEventListener('click', e => {
  spinButton.setAttribute('disabled', '');
  Object.keys(slots).forEach((slot, index) => {
    setTimeout(() => {
      slots[slot].textContent = getRandomSymbol();
    }, 200 * index);
  });

  setTimeout(() => {
    spinButton.removeAttribute('disabled', '');
  }, 210 * 3);
});

function getRandomSymbol() {
  const randomValue = random.integer(0, totalWeight - 1);
  return ranges.find(
    elem => elem.start <= randomValue && elem.end >= randomValue
  ).symbol;
}
