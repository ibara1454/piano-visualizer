/**
 * Returns the intersection of given two arrays.
 * @param xs Any array.
 * @param ys Any array.
 * @return The intersection.
 */
// eslint-disable-next-line import/prefer-default-export
export function intersect<T>(xs: Array<T>, ys: Array<T>): Array<T> {
  return xs.filter((value) => ys.includes(value));
}
