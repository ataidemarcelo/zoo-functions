const data = require('../data/zoo_data');

const { employees, species } = data;

function getEmployeeById(employeeId) {
  return employees.find((employee) => employee.id === employeeId);
}

function getFirstSpecieDataById(firstSpecieId) {
  return species.find((specie) => specie.id === firstSpecieId);
}

function getOldestResident(residentsFirstspecieData) {
  let currentResident = residentsFirstspecieData[0];

  residentsFirstspecieData.forEach((resident) => {
    const isResidentAgeBiggerThanCurrentAge = resident.age > currentResident.age;
    if (isResidentAgeBiggerThanCurrentAge) {
      currentResident = resident;
    }
  });
  const oldestResident = currentResident;

  return oldestResident;
}

function getOldestFromFirstSpecies(employeeId) {
  const employee = getEmployeeById(employeeId);

  const firstSpecieId = employee.responsibleFor[0];
  const firstSpecieData = getFirstSpecieDataById(firstSpecieId);
  const firstSpecieResidents = firstSpecieData.residents;

  const oldestResident = getOldestResident(firstSpecieResidents);
  const oldestFromFirstSpecies = Object.values(oldestResident);

  return oldestFromFirstSpecies;
}

module.exports = getOldestFromFirstSpecies;
