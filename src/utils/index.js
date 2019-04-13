
/**
 * input: [{name: 'def'}, {name: 'abc'}]
 * output: [{name: 'abc'}, {name: 'def'}]
 * @param {Array} arr
 * @param {String} key
 * @returns {Array}
 */
export function sortArrByObjectValue(arr, key) {
  const data = [];
  arr.map((item) => {
    data.push([item, item[key]]);
  });

  const sortedData = data.sort((a, b) => {
    if (typeof a[1] === 'number' && typeof b[1] === 'number') {
      return b[1] - a[1];
    } else {
      const strA = String(a[1]).toLowerCase();
      const strB = String(b[1]).toLowerCase();

      return strA.localeCompare(strB);
    }
  });

  return sortedData.map((item) => {
    return item[0];
  });
}

/**
 * 时间转数字，'15:20' --> 1520
 * @param {String} time 
 * @returns {Number}
 */
export function getNumberByTime(time = '') {
  const arr = time.split(':');
  let currentNumber = 0;

  arr.map((n, index) => {
    const scale = Math.pow(100, arr.length - index - 1);

    n = parseInt(n);
    currentNumber += n * scale;
  });

  return currentNumber;
}

export function rgbaToHex (rgba, ignoreAlpha = true) {
  function trim (str) {
    return str.replace(/^\s+|\s+$/gm,'');
  }

  var parts = rgba.substring(rgba.indexOf("(")).split(","),
      r = parseInt(trim(parts[0].substring(1)), 10),
      g = parseInt(trim(parts[1]), 10),
      b = parseInt(trim(parts[2]), 10),
      a = parseFloat(trim(parts[3].substring(0, parts[3].length - 1))).toFixed(2);
  var hex = '#' + r.toString(16) + g.toString(16) + b.toString(16);
  if (!ignoreAlpha) {
    hex += (a * 255).toString(16).substring(0,2);
  }

  return hex;
}