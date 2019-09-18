Function.prototype.myCall = function (context = window, ...param) {
  let key = Symbol("temp");
  context[key] = this;
  let result;
  if (param.length === 0) {
    result = context[key]();
  } else {
    result = context[key](...param);
  }
  delete context[key];
  return result;
}