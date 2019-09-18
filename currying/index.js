const currying = (fn, ...args) => {
  if (args.length >= fn.length) {
    return fn(...args);
  } else {
    return (...args2) => currying(fn, ...args, ...args2);
  }
}

// let testFn = (a, b, c) => {
//   let res = a + b + c; 
//   return res;
// }

const getUrl = (protocol, domain, port, path) => {
  return `${protocol}://${domain}:${port}/${path}`;
}

const getBaiduUrl = currying(getUrl, "https", "www.baidu.com", "80")

console.log(getBaiduUrl("test.html"))
console.log(getBaiduUrl("test2.html"))
