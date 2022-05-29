const data = require('../data/zoo_data');

function getLocations(speciesCollection) {
  const locationsUnique = [];

  speciesCollection.forEach((species) => {
    const hasLocationInLocationsUnique = locationsUnique.includes(species.location);
    if (!hasLocationInLocationsUnique) {
      locationsUnique.push(species.location);
    }
  });

  return locationsUnique;
}

function getResidentsNameOfASpecies(species, sex) {
  if (sex) {
    const residents = species.residents.filter((resident) => resident.sex === sex);
    const residentsName = residents.map((resident) => resident.name);
    return residentsName;
  }
  const residentsName = species.residents.map((resident) => resident.name);
  return residentsName;
}

function getSpeciesNameByLocation(location) {
  const spesiesNameByLocation = [];
  data.species.forEach((species) => {
    if (species.location === location) {
      spesiesNameByLocation.push(species.name);
    }
  });
  return spesiesNameByLocation;
}

function getSpeciesNameAndResidentsByLocation(location, sorted, sex) {
  const speciesNameAndResidentsName = [];

  data.species.forEach((species) => {
    if (species.location === location) {
      const result = getResidentsNameOfASpecies(species, sex);
      const residentsName = sorted ? result.sort() : result;
      speciesNameAndResidentsName.push({ [species.name]: residentsName });
    }
  });
  return speciesNameAndResidentsName;
}

function getAnimalMap(options) {
  const locations = getLocations(data.species);
  const objAnimalMap = {};

  locations.forEach((location) => {
    const speciesNameByLocation = getSpeciesNameByLocation(location);
    if (!options) {
      objAnimalMap[location] = speciesNameByLocation;
      return objAnimalMap;
    }
    const { includeNames, sorted, sex } = options;
    const spesiesNameAndResidentsByLocation = getSpeciesNameAndResidentsByLocation(
      location, sorted, sex,
    );
    objAnimalMap[location] = includeNames
      ? spesiesNameAndResidentsByLocation
      : speciesNameByLocation;
  });
  return objAnimalMap;
}

module.exports = getAnimalMap;
