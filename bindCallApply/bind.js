Function.prototype.myBind = function (context, ...args) {
  return (...args2) => {
    let param = [...args, ...args2];
    if (param.length === 0) {
      return this.apply(context);
    } else {
      return this.apply(context, param);
    }
  }
}