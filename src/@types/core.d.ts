type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;
/**
 * get typeof element in array
 * @example ValuesOf<Array<TypeOfElement>> = TypeOfElement
 */
type ValuesOf<T extends any[]>= T[number];
type Dictionary<T extends any>= Record<string, T>;
/**
 * Получить ключи подходящих по типу значений
 * @example AllowedNames<{ a: string; b: number }, string> = a
 * @example AllowedNames<{ a: string; b: number }, number> = b
 * @example AllowedNames<{ a: string; b: number }, object> = never
 */
type AllowedNames<Base, Condition> = {
  [Key in keyof Base]: Base[Key] extends Condition ? Key : never
}[keyof Base];
