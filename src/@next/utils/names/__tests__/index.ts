import { getTitleObjectByCount, capitalize } from '@next/utils/names/index';

describe('Проверка getTitleObjectByCount', () => {
  test('Проверка на окончание с остатком 0', () => {
    expect(getTitleObjectByCount(0)).toBe('объектов');
  });
  test('Проверка на окончание с остатком 1', () => {
    expect(getTitleObjectByCount(1)).toBe('объект');
    expect(getTitleObjectByCount(11)).toBe('объектов');
    expect(getTitleObjectByCount(111)).toBe('объектов');
    expect(getTitleObjectByCount(1111)).toBe('объектов');
    expect(getTitleObjectByCount(21)).toBe('объект');
    expect(getTitleObjectByCount(91)).toBe('объект');
  });
  test('Проверка на окончание с остатком 2', () => {
    expect(getTitleObjectByCount(2)).toBe('объекта');
    expect(getTitleObjectByCount(12)).toBe('объектов');
    expect(getTitleObjectByCount(112)).toBe('объектов');
    expect(getTitleObjectByCount(1112)).toBe('объектов');
    expect(getTitleObjectByCount(22)).toBe('объекта');
    expect(getTitleObjectByCount(92)).toBe('объекта');
  });
  test('Проверка на окончание с остатком 3', () => {
    expect(getTitleObjectByCount(3)).toBe('объекта');
    expect(getTitleObjectByCount(13)).toBe('объектов');
    expect(getTitleObjectByCount(113)).toBe('объектов');
    expect(getTitleObjectByCount(1113)).toBe('объектов');
    expect(getTitleObjectByCount(23)).toBe('объекта');
    expect(getTitleObjectByCount(93)).toBe('объекта');
  });
  test('Проверка на окончание с остатком 4', () => {
    expect(getTitleObjectByCount(4)).toBe('объекта');
    expect(getTitleObjectByCount(14)).toBe('объектов');
    expect(getTitleObjectByCount(114)).toBe('объектов');
    expect(getTitleObjectByCount(1114)).toBe('объектов');
    expect(getTitleObjectByCount(24)).toBe('объекта');
    expect(getTitleObjectByCount(94)).toBe('объекта');
  });
  test('Проверка на окончание с остатком 5-9', () => {
    expect(getTitleObjectByCount(5)).toBe('объектов');
    expect(getTitleObjectByCount(16)).toBe('объектов');
    expect(getTitleObjectByCount(117)).toBe('объектов');
    expect(getTitleObjectByCount(1118)).toBe('объектов');
    expect(getTitleObjectByCount(29)).toBe('объектов');
    expect(getTitleObjectByCount(95)).toBe('объектов');
  });
});

describe('Проверка capitalize', () => {
  test('Проверка null', () => {
    expect(capitalize(null)).toBe(null);
    expect(capitalize(undefined)).toBe(undefined);
  });
  test('Проверка со значением', () => {
    expect(capitalize('')).toBe('');
    expect(capitalize('a')).toBe('A');
    expect(capitalize('ab')).toBe('Ab');
  });
});

