
/**
 * input: [{name: 'def'}, {name: 'abc'}]
 * output: [{name: 'abc'}, {name: 'def'}]
 * @param {*} arr
 * @param {*} key
 */
export function sortObjectArrByValue(arr, key) {
  const data = [];
  arr.map((item) => {
    data.push([item, item[key]]);
  });

  const sortedData = data.sort((a, b) => {
    return String(a[1]).charCodeAt(0) - String(b[1]).charCodeAt(0);
  });

  return sortedData.map((item) => {
    return item[0];
  });
}