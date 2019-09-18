const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

/**
 * 异步包装函数
 */
const asyncGenerator = fn => {
  return (...args) => {
    setTimeout(() => {
      fn(...args);
    }, 0);
  }
}

class MyPromise {
  constructor(fn) {
    this.state = PENDING;
    this.value = null;
    this.reason = null;
    this.resolveFnList = [];
    this.rejectFnList = [];
    const resolve = (param) => {
      this.state = FULFILLED;
      this.value = param;
      this.resolveFnList.forEach(resFn => {
        resFn(this.value);
      });
    }

    const reject = (param) => {
      this.state = REJECTED;
      this.reason = param;
      this.rejectFnList.forEach(rejFn => {
        rejFn(this.reason);
      });
    }
    fn(resolve, reject);
    return this;
  }

  then (resFn, rejFn) {
    if (typeof resFn !== 'function') {
      resFn = (value) => {
        return value;
      };
    }
    if (typeof rejFn !== 'function') {
      rejFn = (reason) => {
        throw reason;
      }
    }

    // then返回一个promise不是自身， 如果return this，就是一个promise那resolveFnList会有很多方法
    let returnPromise = new MyPromise((resolve, reject) => {
      if (this.state === FULFILLED) {
        setTimeout(() => {
          try {
            resolve(resFn(this.value))
          } catch (e) {
            //所有的异常都要走reject
            reject(e);
          }
        }, 0)
      } else if (this.state === REJECTED) {
        setTimeout(() => {
          try {
            reject(rejFn(this.reason))
          } catch (e) {
            reject(e);
          }
        }, 0)
      } else {
        // 把then传进来的第一个方法 放在returnPromise的resolve中，包装成异步函数放到resolveFnList中，等到原promise resolve时再触发
        this.resolveFnList.push(asyncGenerator(() => {
          try {
            resolve(resFn(this.value))
          } catch (e) {
            reject(e);
          }
        }));
  
        // 把then传进来的第二个方法 放在returnPromise的reject中
        this.rejectFnList.push(asyncGenerator(() => {
          try {
            reject(rejFn(this.reason))
          } catch (e) {
            reject(e);
          }
        }));
      }
    });

    return returnPromise;
  }

  catch (rejFn) {
    return this.then(null, rejFn);
  }
}

let a = new MyPromise((res, rej) => {
    console.log('now');
    res("xxx");
});

a.then().then().then(msg => {
  console.log('then', msg);
})
.catch(e => {
  console.log('catcherror', e)
});

console.log('应该在then前面');
