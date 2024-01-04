const data = require('../data/zoo_data');

function createObjSchedule(hours) {
  const days = Object.keys(hours);
  const objSchedule = {};
  days.forEach((day) => {
    objSchedule[day] = {
      officeHour: `Open from ${hours[day].open}am until ${hours[day].close}pm`,
      exhibition: [],
    };
  });
  return objSchedule;
}

function createSchedule(hours, species) {
  const days = Object.keys(hours);
  const objSchedule = createObjSchedule(hours);

  days.forEach((day) => species.forEach((specie) => {
    const isSpecieAvailable = specie.availability.includes(day);

    if (isSpecieAvailable) {
      objSchedule[day].exhibition.push(specie.name);
    }

    if (day === 'Monday') {
      objSchedule[day].officeHour = 'CLOSED';
      objSchedule[day].exhibition = 'The zoo will be closed!';
    }
  }));

  return objSchedule;
}

function getSchedule(scheduleTarget) {
  let schedule = createSchedule(data.hours, data.species);

  if (!scheduleTarget) {
    return schedule;
  }

  if (schedule[scheduleTarget]) {
    return { [scheduleTarget]: schedule[scheduleTarget] };
  }

  data.species.forEach((specie) => {
    if (specie.name === scheduleTarget) {
      schedule = specie.availability;
    }
  });

  return schedule;
}

module.exports = getSchedule;
