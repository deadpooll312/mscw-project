import keyBy from 'lodash-es/keyBy';
import { sumArr } from '@next/utils/common';
import type { Coefficient } from 'app/store/modules/analytics/types';

// позволяет выполнить цепочку асинхронных запросов, не теряя данные если один или более потерпели неудачу
// или https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled
export const loadPromises = async <F extends any>(promiseArray: Promise<F>[], strick?: boolean) => {
  const response = await Promise.all(
    promiseArray.map(
      async (promise) => {
        try {
          const response = await promise;                               // только тут может выпасть исключение
          return response;
        } catch (error) {
          console.error('some errors exist !', error);                  // можно сказать, что оно обработно
          return null;                                                  // @todo что-то существенное
        }
      }
    ),
  );

  if (!strick) {
    return response.filter((response) => Boolean(response));              // тк будет массив [ans, ans, null, ans]
  }
  return response;
};

export const summAllProperties = <F extends Record<string, any>>(objOne: F, objTwo: F) => {
  return Object.keys(objOne).reduce<F>(
    (newObj, key: keyof F) => {
      return {
        ...newObj,
        [key]: Number(objOne?.[key] ?? 0) + Number(objTwo?.[key] ?? 0),
      };
    },
    null,
  );
};

export const customMemoize = (func, timeout=60000, serialize = (x) => x) => {
  let cache = new Map();
  let timer;
  return (...args) => {
    let key = serialize.call(func, ...args);
    if (cache.has(key) && timer) {
      return cache.get(key);
    }
    const result = func(...args);
    cache.set(key, result);
    timer = setTimeout(() => timer = null, timeout);
    return result;
  };
};

export const checkPercentValue = (value: string | number, isCritical?: boolean) =>
  `${ !isCritical && Number.isInteger(+value) ? value : Number(value).toFixed(2)} %`;

export const prepareTiNao = (array: any[]) => {
  let tao, nao, coefficients  = null;
  const newArray = array.filter(item => {
    if (item.name === 'ТАО') {
      tao = item;
      return false;
    }
    if (item.name === 'НАО') {
      nao = item;
      return false;
    }

    return true;
  });

  if (tao?.coefficients && nao?.coefficients){
    coefficients = [] as Coefficient[];
    const naoCoefficients = keyBy(
      nao.coefficients as Coefficient[],
      (object) => object.name
    );
    (tao.coefficients as Coefficient[]).forEach((coefficient) => {
      const naoCoefficient = naoCoefficients[coefficient.name];
      coefficients.push({
        ...coefficient,
        percent: sumArr(Number(naoCoefficient?.percent), Number(coefficient.percent)).toFixed(2).toString(),
        value: sumArr(naoCoefficient?.value, coefficient.value),
      });
    });
  }

  if (tao && nao) {
    const {
      name: nameTao,
      coefficients: coefficientsTao,
      ...omitTao
    } = tao;

    const {
      name: nameNao,
      coefficients: coefficientsNao,
      ...omitNao
    } = nao;

    newArray.push({
      name: 'ТиНАО',
      ...summAllProperties(omitTao, omitNao),
      ...(coefficients ? { coefficients } : {}),
    });
  }

  return newArray;
};

export const checkFieldInObject = <T extends {}>(obj: Dictionary<T>, type: string) =>
  typeof obj[type] !== 'undefined';
