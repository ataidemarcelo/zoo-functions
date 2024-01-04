const data = require('../data/zoo_data');

function getSpeciesByIds(...ids) {
  if (ids.length === 0) {
    return [];
  }

  const species = ids.map((id) => {
    const specie = data.species.find(
      (item) => item.id === id,
    );
    return specie;
  });

  return species;
}

module.exports = getSpeciesByIds;
