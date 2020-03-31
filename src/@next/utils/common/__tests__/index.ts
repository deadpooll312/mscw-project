import {
  sumArr,
  getFillPercent,
  getMaxAvailableValueByCircle,
} from '@next/utils/common';

describe('Проверка getFillPercent', () => {
  test('Проверка на null', () => {
    expect(getFillPercent(100, 15, null)).toBe(0);
  });

  test('Проверка на 0', () => {
    expect(getFillPercent(100, 15, 0)).toBe(0);
    expect(getFillPercent(100, 0, 15)).toBe(100 / 1 * 0);
  });

  test('Проверка на меньшие значения', () => {
    expect(getFillPercent(100, 15, 1)).toBe(100 / 15 * 1);
    expect(getFillPercent(100, 15, 10)).toBe(100 / 15 * 10);
    expect(getFillPercent(100, 15, 14)).toBe(100 / 15 * 14);
    expect(getFillPercent(100, 15, 15)).toBe(100 / 15 * 15);
  });

  test('Проверка на большие значения', () => {
    expect(getFillPercent(100, 15, 16)).toBe(100 / 15 * 15);
    expect(getFillPercent(100, 15, 17)).toBe(100 / 15 * 15);
    expect(getFillPercent(100, 15, 200)).toBe(100 / 15 * 15);
  });
});

describe('Проверка getMaxAvailableValueByCircle', () => {
  test('Проверка на null, 0', () => {
    expect(() => getMaxAvailableValueByCircle([], null)).toThrow(TypeError);
    expect(() => getMaxAvailableValueByCircle([], 0)).toThrow(TypeError);
    expect(() => getMaxAvailableValueByCircle([1, 2, 3], null)).toThrow(TypeError);
    expect(() => getMaxAvailableValueByCircle([1, 2, 3], 0)).toThrow(TypeError);

    expect(getMaxAvailableValueByCircle([0, 0, 0], 120)).toEqual([0, 0, 0]);
  });

  test('Проверка на значение, не превышающее минимальный радиус', () => {
    expect(getMaxAvailableValueByCircle([2, 2, 2], 10)).toEqual([2, 2, 2]);
    expect(getMaxAvailableValueByCircle([1, 2, 3], 10)).toEqual([1, 2, 3]);
    expect(getMaxAvailableValueByCircle([3, 2, 1], 10)).toEqual([3, 2, 1]);
  });

  test('Проверка на значение, превышающее минимальный радиус', () => {
    expect(getMaxAvailableValueByCircle([1, 2, 3], 120)).not.toEqual([1, 2, 3]);
    expect(getMaxAvailableValueByCircle([1, 2, 3], 120)).toEqual([2, 2, 3]);

    expect(getMaxAvailableValueByCircle([3, 2, 0], 120)).not.toEqual([3, 2, 0]);
    expect(getMaxAvailableValueByCircle([3, 3, 0], 120)).toEqual([3, 3, 2]);
  });
});

describe('Проверка sumArr', () => {
  test('Проверка на null, 0', () => {
    expect(sumArr()).toBe(0);

    expect(sumArr(...[0, null, 0])).toBe(0);
    expect(sumArr(...[0, null, 1])).toBe(1);
  });

  test('Проверка на валидность', () => {
    expect(sumArr(...[1, 2, 3])).toBe(6);
    expect(sumArr(1, 2, 3)).toBe(6);
  });
});
