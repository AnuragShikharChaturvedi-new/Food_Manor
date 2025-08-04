// sum.test.js
import { sum } from '../sum'; // assuming you have a sum.js file

test('adds 1 + 2 to equal 3', () => {
  //assertion called as
  expect(sum(1, 2)).toBe(3);
});
