const throttle = (fn, ms = 1000) => {
  let timer = null;
  let pre = 0;
  return function (arguments) {
    let args = arguments;
    let now = Date.now();
    if (pre === 0) {
      fn(args);
      pre = now;
    }
    else {
      if (now - pre >= ms) {
        fn(args);
        pre = now;
      } 
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(args);
    }, ms); 
  }
}


document.addEventListener("mousemove", throttle(e => {
  console.log('xxxx', e)
}, 1000))