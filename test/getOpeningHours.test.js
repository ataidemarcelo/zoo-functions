const getOpeningHours = require('../src/getOpeningHours');
const { hours } = require('../data/zoo_data');

describe('Testes da função getOpeningHours', () => {
  const messageClosed = 'The zoo is closed';
  const messageOpen = 'The zoo is open';

  test('Se receber os argumentos Monday e 09:00-AM deve retornar a string "The zoo is closed"', () => {
    const result = getOpeningHours('Monday', '09:00-AM');
    expect(result).toBe(messageClosed);
  });

  test('Se receber os argumentos Tuesday e 09:00-AM deve retornar a string "The zoo is open"', () => {
    const result = getOpeningHours('Tuesday', '09:00-AM');
    expect(result).toBe(messageOpen);
  });

  test('Se receber os argumentos Wednesday e 09:00-PM deve retornar a string "The zoo is closed"', () => {
    const result = getOpeningHours('Wednesday', '09:00-PM');
    expect(result).toBe(messageClosed);
  });

  it('Deveria retornar object "hours" caso nenhum parâmetro seja passado', () => {
    const result = getOpeningHours();
    expect(result).toBe(hours);
  });

  it('Deveria lançar um error, caso o dia passado não exista', () => {
    expect(() => getOpeningHours('invalid_day', '09:00-PM')).toThrow(/^The day must be valid. Example: Monday$/);
  });

  it('Deveria lançar um error, caso a hora passada não represente um número', () => {
    expect(() => getOpeningHours('Monday', 'ANY_NOT_NUMBER:00-PM')).toThrow(/^The hour should represent a number$/);
  });

  it('Deveria lançar um error, caso os minutos passados não representem números', () => {
    expect(() => getOpeningHours('Monday', '09:ANY_NOT_NUMBER-PM')).toThrow(/^The minutes should represent a number$/);
  });

  it('Deveria lançar um error, caso as abreviações passadas não sejam AM ou PM', () => {
    expect(() => getOpeningHours('Monday', '09:00-ANY_NOT_ABBREVIATION_AM_or_PM')).toThrow(/^The abbreviation must be 'AM' or 'PM'$/);
  });

  it('Deveria lançar um error, caso a hora passada não esteja entre 0 e 12', () => {
    expect(() => getOpeningHours('Monday', '13:00-PM')).toThrow(/^The hour must be between 0 and 12$/);
  });

  it('Deveria lançar um error, caso os minutos passados não estejam entre 0 e 59', () => {
    expect(() => getOpeningHours('Monday', '12:60-PM')).toThrow(/^The minutes must be between 0 and 59$/);
  });
});
