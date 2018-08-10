const { sum } = require('./app.js');

function sumMY(a, b) {
  return a + b;
}


test('Should sum works', () => {
  expect(sum(2, 3)).toBe(5);
});
