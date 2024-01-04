const data = require('../data/zoo_data');

const { species } = data;

function getAllAnimalsAndQtyResidents() {
  const result = species.reduce((acc, cur) => {
    acc[cur.name] = cur.residents.length;
    return acc;
  }, {});
  return result;
}

function getQuantityBySpecie(specieName) {
  const result = species.find((specie) => specie.name === specieName);
  return result.residents.length;
}

function getQuantityBySpecieAndSex(specieName, sex) {
  const { residents } = species.find((specie) => specie.name === specieName);
  const result = residents.filter((resident) => resident.sex === sex);
  return result.length;
}

function countAnimals(animal) {
  if (animal && animal.sex) {
    return getQuantityBySpecieAndSex(animal.specie, animal.sex);
  }
  if (animal && animal.specie) {
    return getQuantityBySpecie(animal.specie);
  }
  return getAllAnimalsAndQtyResidents();
}

module.exports = countAnimals;
