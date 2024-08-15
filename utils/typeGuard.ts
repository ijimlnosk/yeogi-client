// input is null이라는 반환 타입을 명시하여, 이 함수가 true를 반환할 때 input이 null 타입임을 TypeScript가 인식할 수 있게 하는 함수.
/**
 * @function
 * @param  {unknown} input 확인할 값
 * @returns {boolean} 입력값이 `null`이면 `true`, 그렇지 않으면 `false`를 반환
 * @descriptions 
 * 타입 가드로서, 주어진 입력값이 `null`인지 `undefined` 인지 확인하는 함수
 * @example
 * if (isUndefined(value)) {
  console.log('Value is undefined');
}
 */
export const isNull = (input: unknown): input is null => input === null
export const isUndefined = (input: unknown): input is undefined => typeof input === undefined
export const isDate = (input: unknown): input is Date => input instanceof Date
