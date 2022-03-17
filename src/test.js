/**
 * @param {number} n - a positive integer
 * @return {number} - a positive integer
 */
var reverseBits = function(n) {

    console.log(n.toString(8))
    return parseInt(n.toString().split('').reverse().join())
};

reverseBits(000110)
