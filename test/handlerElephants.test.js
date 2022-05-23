const handlerElephants = require('../src/handlerElephants');

const isAnArrayOfStrings = (array) => array.every((item) => typeof item === 'string');

describe('Testes da função HandlerElephants', () => {
  it('Dicas do que testar', () => {
    // Para o argumento names deve retornar um array de nomes que possui o nome Jefferson
    expect(handlerElephants('names')).toEqual(expect.arrayContaining(['Jefferson']));

    // Para o argumento count deve retornar o número inteiro 4;
    expect(handlerElephants('count')).toBe(4);
    expect(Number.isInteger(handlerElephants('count'))).toBe(true);

    // Para o argumento averageAge deve retornar um número próximo a 10.5
    expect(handlerElephants('averageAge')).toBeCloseTo(10.5, 5);

    // Para o argumento location deve retornar a string NW
    expect(handlerElephants('location')).toBe('NW');

    // Para o argumento popularity deve retornar um número igual ou maior a 5
    expect(handlerElephants('popularity') >= 5).toBe(true);

    // Para o argumento availability deve retornar um array de dias da semana que não contém Monday
    expect(handlerElephants('availability')).toEqual(expect.not.arrayContaining(['Monday']));

    // Não passando argumentos a função deve retornar undefined
    expect(handlerElephants()).toBeUndefined();
  });

  it('Deveria retornar mensagem de inválido se paramêtro não for uma string', () => {
    const invalidParamError = 'Parâmetro inválido, é necessário uma string';
    expect(handlerElephants(5)).toBe(invalidParamError);
    expect(handlerElephants([])).toBe(invalidParamError);
    expect(handlerElephants({})).toBe(invalidParamError);
    expect(handlerElephants(true)).toBe(invalidParamError);
  });

  it('Deveria retornar informações corretas, com base no estado atual dos dados, para os parâmetros "names", "count", "averageAge".', () => {
    const currentElephantNames = ['Ilana', 'Orval', 'Bea', 'Jefferson'];
    const currentNumberOfElephants = 4;
    const currentAverageAge = 10.5;

    expect(handlerElephants('names')).toEqual(currentElephantNames);
    expect(handlerElephants('count')).toBe(currentNumberOfElephants);
    expect(handlerElephants('averageAge')).toBe(currentAverageAge);
  });

  it('Deveria retornar os tipos de dados corretos, para os parâmetros "names", "count", "averageAge".', () => {
    // Cheaca se é um Array e se é uma Array de strings
    expect(Array.isArray(handlerElephants('names'))).toBe(true);
    expect(isAnArrayOfStrings(handlerElephants('names'))).toBe(true);

    // Checa se é do tipo number e se é um número inteiro
    expect(typeof handlerElephants('count')).toBe('number');
    expect(Number.isInteger(handlerElephants('count'))).toBe(true);

    // Checa se é do tipo number
    expect(typeof handlerElephants('averageAge')).toBe('number');
  });

  it('Deveria retornar o valor da propriedade, se o parâmetro for o nome de uma propriedade válida.', () => {
    expect(handlerElephants('name')).toBe('elephants');
    expect(handlerElephants('location')).toBe('NW');
    expect(handlerElephants('popularity')).toBe(5);
    expect(handlerElephants('availability')).toEqual(['Friday', 'Saturday', 'Sunday', 'Tuesday']);
  });

  it('Deveria retornar null se o paramêtro não for passado todo com letras em minúsculo', () => {
    expect(handlerElephants('Name')).toBeNull();
    expect(handlerElephants('NAME')).toBeNull();
  });

  it('Deveria retornar null se o parâmetro não for o nome de uma propriedade válida.', () => {
    expect(handlerElephants('property_invalid')).toBeNull();
  });
});
