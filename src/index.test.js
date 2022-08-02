const { csvStringToObject, findDuplicates } = require('./index');

test('validates invalid CSV', async () => {
  await expect(csvStringToObject('a,b,c\na,b')).rejects.toThrow('Invalid Record Length: expect 3, got 2 on line 2');
});

test('parses valid CSV', async () => {
  expect(await csvStringToObject('a,b,c\n')).toStrictEqual([['a', 'b', 'c']]);
  expect(await csvStringToObject('a,b,c\na,b,c')).toStrictEqual([['a', 'b', 'c'], ['a', 'b', 'c']]);
  expect(await csvStringToObject(`a,b,c
a,b,c`)).toStrictEqual([['a', 'b', 'c'], ['a', 'b', 'c']]);
})

test('find duplicates', () => {
  expect(findDuplicates([['a', 'b', 'b'], ['a', 'b', 'c']])).toStrictEqual(["a"]);
  expect(findDuplicates([['a1', 'b', 'b'], ['a2', 'b', 'c'], ['a1', 'b', 'b'], ['a2', 'b', 'c']])).toStrictEqual(["a1", "a2"]);
});
