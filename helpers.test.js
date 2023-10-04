const { calculateRunningTime, parseSize } = require("./helpers");

test('expect run at hour 02:00 with now being 23:00 then delay should be 3 hours', () => {
  const now = new Date(2023, 11, 1, 23, 0, 0)
  const delay = calculateRunningTime(now, 2)
  expect(delay).toBe(60 * 60 * 1000 * 3)
})

test('expect run at hour 11:00 with now being 12:00 then delay should be next day', () => {
  const now = new Date(2023, 11, 1, 12, 0, 0)
  const delay = calculateRunningTime(now, 11)
  expect(delay).toBe(60 * 60 * 1000 * 23)
})

test('expect run at hour 25 to throw an exception', () => {
  const now = new Date(2023, 11, 1, 12, 0, 0)
  expect(() => calculateRunningTime(now, 25)).toThrow(Error)
})

test('expect run at hour -2 to throw an exception', () => {
  const now = new Date(2023, 11, 1, 12, 0, 0)
  expect(() => calculateRunningTime(now, -2)).toThrow(Error)
})

test('expect parse small to return small', () => {
  expect(parseSize('small')).toBe('small')
})

test('expect parse gibberish to return medium', () => {
  expect(parseSize('sdfsdfdsfnvp23456¤&%')).toBe('medium')
})
