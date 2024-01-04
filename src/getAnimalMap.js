const data = require('../data/zoo_data');

/**
 * Requisito 14
 * Este conteúdo foi refatorado com ajuda das
 * dicas de como usar o 'reduce', para contruir as chaves e valores de objetos
 * de forma dinâmica, com conteúdo vindo de um array.
 * Conteúdo apresentado e explicado por: "Renato Mendes - Turma 22 - Tribo A"
 * durante sessão de dúvidas na sala de estudos dia 26/05/22
 * github: https://github.com/natomendes
 * Exemplo ensinado pelo Renato:
 * https://dev.to/_bigblind/quick-tip-transform-an-array-into-an-object-using-reduce-2gh6
 * Dia com ótimo conteúdo compartilhado, valeu Renatão, Renan, Valmir...E a todos presentes na sessão!!!
 */

function getResidentsName(residents, sex) {
  let residentsName = [];
  residentsName = residents.map((resident) => resident.name);
  if (sex) {
    residentsName = residents
      .filter((resident) => resident.sex === sex)
      .map((resident) => resident.name);
  }
  return residentsName;
}

function sortedResidentsName(residentsName, sorted) {
  return (sorted ? residentsName.sort() : residentsName);
}

function getAnimalMap(options) {
  const animalMap = data.species.reduce((acc, species) => {
    const { name, location, residents } = species;

    if (!options || !options.includeNames) {
      return { ...acc, [location]: [...(acc[location] || []), name] };
    }

    const { sorted, sex } = options;
    const residentsName = getResidentsName(residents, sex);
    const speciesAndResidentNames = { [name]: sortedResidentsName(residentsName, sorted) };

    return { ...acc, [location]: [...(acc[location] || []), speciesAndResidentNames] };
  }, {});

  return animalMap;
}

module.exports = getAnimalMap;
