const moduleName = 'MMM-stoic-quotes'

beforeAll(() => {
  Module = {};
  config = {};
  Module.definitions = {};
  Module.register = function(name, moduleDefinition) {
    Module.definitions[name] = moduleDefinition;
  };
  require("./MMM-stoic-quotes");
  Module.definitions[moduleName].config = {};
})

test('expect run at hour 02:00 with now being 23:00 then delay should be 3 hours', () => {
  const now = new Date(2023, 11, 1, 23, 0, 0)
  const delay = Module.definitions[moduleName].calculateRunningTime(now, 2)
  expect(delay).toBe(60 * 60 * 1000 * 3)
})

test('expect run at hour 11:00 with now being 12:00 then delay should be next day', () => {
  const now = new Date(2023, 11, 1, 12, 0, 0)
  const delay = Module.definitions[moduleName].calculateRunningTime(now, 11)
  expect(delay).toBe(60 * 60 * 1000 * 23)
})

test('expect run at hour 25 to throw an exception', () => {
  const now = new Date(2023, 11, 1, 12, 0, 0)
  expect(() => Module.definitions[moduleName].calculateRunningTime(now, 25)).toThrow(Error)
})

test('expect run at hour -2 to throw an exception', () => {
  const now = new Date(2023, 11, 1, 12, 0, 0)
  expect(() => Module.definitions[moduleName].calculateRunningTime(now, -2)).toThrow(Error)
})

test('expect parse small to return small', () => {
  expect(Module.definitions[moduleName].parseSize('small')).toBe('small')
})

test('expect parse gibberish to return medium', () => {
  expect(Module.definitions[moduleName].parseSize('sdfsdfdsfnvp23456¤&%')).toBe('medium')
})
