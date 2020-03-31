export const plural = (count: number, one: string, two: string, five: string): string => {
  let n = Math.abs(count);
  n %= 100;
  if (n >= 5 && n <= 20) {
    return five;
  }
  n %= 10;
  if (n === 1) {
    return one;
  }
  if (n >= 2 && n <= 4) {
    return two;
  }
  return five;
};

/**
 * возвращает знак числа (+/-)
 * @param value {number} число
 */
export const plusOrMinus = (value: number) => {
  if (!value) {
    return '';
  }

  return value > 0 ? '+' : '-';
};

/**
 * возвращает число со знаком (+/-/''number)
 * @param value {number} число
 */
export const valueWithplusOrMinus = (value: number) => {
  const symbol = plusOrMinus(value);

  return `${symbol ? `${symbol} ` : ''}${Math.abs(value)}`;
};

/**
 * переименоывывает свойства объекта в `${name}_${field_name}`
 * @param name {string} начальное имя свойства
 * @param obj {object} объект, свойства которого переименовываются
 */
export const openObj = (name: string, obj: object) => {
  return Object.entries(obj).reduce(
    (newObj, [propName, value]) => {
      newObj[`${name}_${propName}`] = value;

      return newObj;
    },
    {},
  );
};

export const splitData = (str: string, char = '|', trimFirstAndLast?: boolean) => {
  if (str) {
    let sourceString = str;
    if (trimFirstAndLast) {
      sourceString = str.substr(1, str.length - 2);
    }
    return sourceString.split(char).filter((d) => d);
  }

  return [];
};

export const sumArr = (...arg: number[]) => (
  arg.reduce((newSum, a) => newSum + (a ?? 0), 0)
);

export const getPluralDays = (count) =>{
  if (count !== '') {
    return `${count} ${plural(count, 'день', 'дня', 'дней')}`;
  } else {
    return '';
  }
};

export const getRandomIntInclusive = (minOwn: number, maxOwn: number) => {
  const min = Math.ceil(minOwn);
  const max = Math.floor(maxOwn);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
};

export const getRandomCoordinates = (count: number, box: number[]) => {
  const [
    xmin,
    ymin,
    xmax,
    ymax,
  ] = box;

  return Array.from({ length: count }).fill(1).map(() => [
    getRandomIntInclusive(xmin, xmax),
    getRandomIntInclusive(ymin, ymax),
  ]);
};

export const sortAlphabet = (a: string, b: string) => a.localeCompare(b);
export const sortNumber = (a: number, b: number) => a - b;

export const zeroValuesFilter = <T extends { value?: number }> (array: T[]) => array?.filter(item => Boolean(item.value));

export const isEqualStringArray = (arrOne: string[], arrTwo: string[]) => {
  return arrOne.sort(sortAlphabet).toString() === arrTwo.sort(sortAlphabet).toString();
};

export const getFillPercent = (maxValue: number, minCount: number, count: number) => {
  return (maxValue / (minCount || 1)) * Math.min(minCount, (count ?? 0));
};

/**
 * функция для посчёта значения для минимальной видимости секции бублика
 * @param arr массив числовых значений
 * @param minDegVisible минимальный угол, которые должен отображаться
 */
export const getMaxAvailableValueByCircle = (arr: number[], minDegVisible: number) => {
  if (!minDegVisible) {
    throw new TypeError('minDegVisible must >= 0');
  }

  const sumValue = sumArr(...arr);
  const minValueToShow = sumValue / 360 * minDegVisible;

  return arr.map((rowNumber) => Math.max(rowNumber, minValueToShow));
};

export const checkQuotes = (str: string) => str[str.length - 1] !== '"' ? `${str}"` : str;

export const isValidField = (str: string) => str && str[0] !== '"';

export const trimFirstAndLast = (str: string) => str?.substring(1, str?.length -1);

export const asyncArrayMap = <T extends any, U extends any>(array: T[], callback: (d: T, index: number, array: T[]) => U) => {
  return Promise.all(
    array.map<Promise<U>>((...arg) => {
      return new Promise(
        (res) => {
          setTimeout(
            () => res(callback(...arg)),
            0,
          );
        }
      );
    })
  );
};
