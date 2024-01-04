const data = require('../data/zoo_data');

function getEmployeeByName(employeeName) {
  if (!employeeName) {
    return {};
  }
  const result = data.employees.find(
    (employee) => employee.firstName === employeeName || employee.lastName === employeeName,
  );
  return result;
}

module.exports = getEmployeeByName;
