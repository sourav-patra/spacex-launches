import * as camelCase from 'camelcase-keys-recursive';

export function stringCamelToSnake(str: string = ''): string {
  return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
}

export function camelToSnakeCase(object: any): any {
  const resultObj: any = {};
  Object.keys(object).forEach((key: string): void => {
    // recursive if it contains another layer of objects
    if (typeof object[key] === 'object' && !Array.isArray(object[key])) {
      resultObj[this.stringCamelToSnake(key)] = this.camelToSnakeCase(object[key]);
    } else if (typeof object === 'string') {
      resultObj[this.stringCamelToSnake(key)] = object[key];
    } else {
      resultObj[key] = object[key];
    }
  });
  return resultObj;
}

export function snakeToCamelCase(object: any): any {
  return camelCase(object, { deep: true } );
}
