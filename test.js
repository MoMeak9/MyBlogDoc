/**
 * @param {number} x
 * @return {number}
 */
var reverse = function (x) {
    const arr = x.toString().split('');
    let flag = arr[0]==='-'
    if (flag) {
        arr.shift();
    }
    const ans = Number(arr.reverse().join(''))
    if (ans > 2 ** 31 - 1 || ans < -(2 ** 31)) {
        return 0
    }
    return flag ? -ans : ans
};

console.log(reverse(-123450))
