export function genILIKEFilter(key: string, val: string | number) {
  return `(${key} ILIKE '${val}')`;
}

export function genEQUALSFilter(key, val) {
  return `(${key}=${val})`;
}
