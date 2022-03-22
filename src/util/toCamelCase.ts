/**
 * Converts a mixed-cased string to Camel Case
 * 
 * @param text - the kabab, snake
 * @returns 
 */
export default function toCamelCase(text: string) {
  return `${text}`.trim()
    // remove special character,
    // and switch letter to upper case
    .replace(/[-_]+\w/, (matched) => {
      return matched.replace(/[-_]+/,'').toUpperCase();
    })
    .replace(/^([A-Z])/,(m) => m.toLowerCase());
}