const data = require('../data/zoo_data');

function countEntrants(entrants) {
  const result = entrants.reduce((acc, cur) => {
    if (cur.age < 18) {
      acc.child += 1;
    }
    if (cur.age >= 18 && cur.age < 50) {
      acc.adult += 1;
    }
    if (cur.age >= 50) {
      acc.senior += 1;
    }
    return acc;
  }, { child: 0, adult: 0, senior: 0 });

  return result;
}

function calculateEntry(entrants) {
  const paramNotExistOrEmpty = !entrants || Object.keys(entrants).length === 0;

  if (paramNotExistOrEmpty) {
    return 0;
  }

  const { prices } = data;
  const { child, adult, senior } = countEntrants(entrants);
  const valueOfEntries = (prices.child * child) + (prices.adult * adult) + (prices.senior * senior);

  return valueOfEntries;
}

module.exports = { calculateEntry, countEntrants };
