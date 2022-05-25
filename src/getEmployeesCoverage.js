const data = require('../data/zoo_data');

function getEmployeeByIdentifiers(identifiers) {
  const { id, name } = identifiers;

  const employeeData = data.employees.find((employee) => {
    const { id: employeeId, firstName, lastName } = employee;

    const result = firstName === name || lastName === name || employeeId === id;

    return result;
  });

  return employeeData;
}

function getSpecieNameAndLocationById(specieId) {
  const specieData = data.species.find((specie) => specie.id === specieId);

  return {
    name: specieData.name,
    location: specieData.location,
  };
}

function createArraysSpeciesAndLocations(specieIds) {
  const species = [];
  const locations = [];

  specieIds.forEach((specieId) => {
    const { name, location } = getSpecieNameAndLocationById(specieId);

    species.push(name);
    locations.push(location);
  });

  return {
    species,
    locations,
  };
}

function createEmployeeCoverage(employee) {
  const { id, firstName, lastName, responsibleFor } = employee;
  const { species, locations } = createArraysSpeciesAndLocations(responsibleFor);

  const coverage = {
    id,
    fullName: `${firstName} ${lastName}`,
    species,
    locations,
  };

  return coverage;
}

function createAllEmployeeCoverage(employees) {
  const allEmployeeCoverage = [];

  employees.forEach((employee) => {
    const employeeCoverage = createEmployeeCoverage(employee);
    allEmployeeCoverage.push(employeeCoverage);
  });

  return allEmployeeCoverage;
}

function getEmployeesCoverage(identifiers) {
  if (!identifiers) {
    const allEmployeeCoverage = createAllEmployeeCoverage(data.employees);
    return allEmployeeCoverage;
  }
  const employee = getEmployeeByIdentifiers(identifiers);

  if (!employee) {
    throw Error('Informações inválidas');
  }

  const employeeCoverage = createEmployeeCoverage(employee);

  return employeeCoverage;
}

module.exports = getEmployeesCoverage;
