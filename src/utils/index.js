
/**
 * input: [{name: 'def'}, {name: 'abc'}]
 * output: [{name: 'abc'}, {name: 'def'}]
 * @param {*} arr
 * @param {*} key
 */
export function sortArrByObjectValue(arr, key) {
  const data = [];
  arr.map((item) => {
    data.push([item, item[key]]);
  });

  const sortedData = data.sort((a, b) => {
    const strA = String(a[1]).toLowerCase();
    const strB = String(b[1]).toLowerCase();

    return strA.localeCompare(strB);
  });

  return sortedData.map((item) => {
    return item[0];
  });
}