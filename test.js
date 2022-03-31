const throttle = function (func, delay) {
    let timer = null;
    return function (...args) {
        if (!timer) {
            timer = setTimeout(() => {
                func.apply(this, args);
                this.timer = null;
            }, delay)
        }
    }
}
throttle(()=>{
    console.log(123)},10000)
