const data = require('../data/zoo_data');

function getAnimalsOlderThan(animal, age) {
  const animalResult = data.species.find((specie) => specie.name === animal);
  const result = animalResult.residents.every((resident) => resident.age >= age);
  return result;
}

module.exports = getAnimalsOlderThan;
