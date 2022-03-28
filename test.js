console.log('script start');
setTimeout(function() {
    console.log('setTimeout');
}, 0);
new Promise((resolve) => {
    console.log('Promise')
    resolve()
}).then(function() {
    console.log('promise1');
}).then(function() {
    console.log('promise2');
});
console.log('script end');
// script start => Promise => script end => promise1 => promise2 => setTimeout
