import {
  useSearchMergeNewState,
  makeObjFromMemoize,
  generatePathSearch,
  generatePathParams,
  generateHistoryPath,
} from '@next/utils/history_search';

describe('Проверка history_search', () => {

  describe('Проверка мержа старого состояни search с новым и форматирование всего в json', () => {
    test('Проверка простого мержа', () => {
      expect(useSearchMergeNewState({})).toEqual({});
      expect(useSearchMergeNewState({}, {})).toEqual({});
      expect(useSearchMergeNewState({ test_a: 1, test_b: 2 }, {})).toEqual({ test_a: '1', test_b: '2'});
      expect(useSearchMergeNewState({ test_a: '1', test_b: 2 }, {})).toEqual({ test_a: '"1"', test_b: '2' });
      expect(useSearchMergeNewState({ test_a: 1, test_b: 2 }, { test_a: 20 })).toEqual({ test_a: '20', test_b: '2' });
      expect(useSearchMergeNewState({ test_a: 1, test_b: 2 }, { test_a: '20' })).toEqual({ test_a: '"20"', test_b: '2' });
      expect(useSearchMergeNewState({ test_a: 1, test_b: 2 }, { test_a: 20, test_b: null })).toEqual({ test_a: '20' });
      expect(useSearchMergeNewState({ test_a: 1, test_b: 2 }, { test_a: 20, test_b: undefined })).toEqual({ test_a: '20' });
      expect(useSearchMergeNewState({ test_a: 1, test_b: 2 }, { test_a: 20, test_b: undefined, test_c: '33' })).toEqual({ test_a: '20', test_c: '"33"' });
      expect(useSearchMergeNewState({ test_a: 1, test_b: 2 }, { test_a: { test_aa: 1 }, test_b: undefined, test_c: '33' })).toEqual({ test_a: JSON.stringify({ test_aa: 1 }), test_c: '"33"' });

    });
  });

  describe('Парсинг location.search в объект ', () => {
    test('Проверка простого мержа', () => {
      expect(makeObjFromMemoize('')).toEqual({});
      expect(makeObjFromMemoize('test_a=1&test_b=2')).toEqual({ test_a: 1, test_b: 2 });
      expect(makeObjFromMemoize('test_a=%5B11%2C12%5D&test_b=2')).toEqual({ test_a: [11, 12], test_b: 2 });
    });
  });

  describe('Проверка генерации search string', () => {
    test('Проверка простого мержа', () => {
      expect(generatePathSearch({ test_a: 1, test_b: 2 }, '')).toBe('test_a=1&test_b=2');
      expect(generatePathSearch({ test_a: [11, 12], test_b: 2 }, '')).toBe('test_a=%5B11%2C12%5D&test_b=2');
      expect(generatePathSearch({ test_a: [11, 12], test_b: 3 }, 'test_b=2')).toBe('test_a=%5B11%2C12%5D&test_b=3');
      expect(generatePathSearch({ test_a: ['11', 12], test_b: 3 }, 'test_b=2')).toBe('test_a=%5B%2211%22%2C12%5D&test_b=3');
    });
  });

  describe('Проверка генерации match params', () => {
    test('Проверка простого мержа', () => {
      expect(generatePathParams('/dashboard', { test_a: '1' }, { test_a: '2' })).toBe('/dashboard');
      expect(generatePathParams('/dashboard/:id?', { id: 1 }, { id: 2 })).toBe('/dashboard/1');
      expect(generatePathParams('/dashboard/:id?/:test_c?', { id: 1 }, { id: 2, test_c: '222' })).toBe('/dashboard/1/222');
      expect(generatePathParams('/dashboard/:id?/:test_c?', { id: null }, { id: 2, test_c: '222' })).toBe('/dashboard');
      expect(generatePathParams('/dashboard/:id?/:test_c?', { id: 1, test_c: null }, { id: 2, test_c: '222' })).toBe('/dashboard/1');
      expect(generatePathParams('/dashboard/:id?/:test_c?', { id: 1, test_c: '11' }, { id: 2, test_c: '222' })).toBe('/dashboard/1/11');
    });
  });

  test('Проверка generateHistoryPath', () => {
    expect(generateHistoryPath('/dashboard/:test_a?', { test_a: '1' }, { test_a: 2 }, {}, '')).toBe('/dashboard/1?test_a=2');
  });
});

