export const getTitleObjectByCount = (count: number) => {
  if (count % 10 === 0) {
    return 'объектов';
  }
  if (count % 10 === 1) {
    if (count % 100 === 11) {
      return 'объектов';
    }

    return 'объект';
  }
  if (count % 10 === 2) {
    if (count % 100 === 12) {
      return 'объектов';
    }

    return 'объекта';
  }
  if (count % 10 === 3) {
    if (count % 100 === 13) {
      return 'объектов';
    }

    return 'объекта';
  }
  if (count % 10 === 4) {
    if (count % 100 === 14) {
      return 'объектов';
    }

    return 'объекта';
  }

  return 'объектов';
};

export const capitalize = (str: string) => {
  if (str) {
    return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
  }

  return str;
};