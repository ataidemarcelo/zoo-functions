const data = require('../data/zoo_data');

const { employees } = data;

function getManagersIds(dataEmployees) {
  const managersIds = [];

  dataEmployees.forEach((employee) => {
    for (let index = 0; index < employee.managers.length; index += 1) {
      const managerId = employee.managers[index];
      const doesNotContainManagerId = !managersIds.includes(managerId);

      if (doesNotContainManagerId) {
        managersIds.push(managerId);
      }
    }
  });
  return managersIds;
}

function isManager(id) {
  const managersIds = getManagersIds(employees);

  if (managersIds.includes(id)) {
    return true;
  }

  return false;
}

function getRelatedEmployees(managerId) {
  const isManagerId = isManager(managerId);

  if (!isManagerId) {
    throw new Error(('O id inserido não é de uma pessoa colaboradora gerente!'));
  }

  const relatedEmployees = employees.reduce((acc, cur) => {
    if (cur.managers.includes(managerId)) {
      acc.push(`${cur.firstName} ${cur.lastName}`);
    }
    return acc;
  }, []);

  return relatedEmployees;
}

module.exports = { isManager, getRelatedEmployees };
