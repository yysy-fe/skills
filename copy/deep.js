const isDeep = {
  '[object Map]': true,
  '[object Set]': true,
  '[object Array]': true,
  '[object Object]': true,
  '[object Arguments]': true,
};

const mapTag = '[object Map]';
const setTag = '[object Set]';
const arrayTag = '[object Array]';
const objectTag = '[object Object]';
const argsTag = '[object Arguments]';

const boolTag = '[object Boolean]';
const dateTag = '[object Date]';
const numberTag = '[object Number]';
const stringTag = '[object String]';
const symbolTag = '[object Symbol]';
const errorTag = '[object Error]';
const regexpTag = '[object RegExp]';
const funcTag = '[object Function]';

const isShallow = target => {
  const type = typeof target;
  return (type !== 'object' && type !== 'function') || type === 'symbol';
};

const getType = target => {
  return Object.prototype.toString.call(target);
};

const getInit = target => {
  return new target.constructor();
};

const copyReg = target => {
  const { source, flags } = target;
  return new target.constructor(source, flags);
};

const copyFunction = target => {
  const funcStr = target.toString();
  let paramsRes = funcStr.match(/\((.*)\)/);
  let paramsStr = paramsRes && paramsRes[1] && paramsRes[1].replace(/ /g, '') || '';
  let paramArr = paramsStr.split(',');
  let contentRes = funcStr.match(/function.*\(.*\)\s*\{([\s\S]*)\}/);
  let contentStr = contentRes && contentRes[1] && contentRes[1].trim() || '';
  return new target.constructor(...paramArr, contentStr)
};

const cloneOtherType = (target, type) => {
  const Ctor = target.constructor;
  switch(type) {
    case boolTag:
    case numberTag:
    case stringTag:
    case errorTag: 
    case dateTag:
      return new Ctor(target);
    case regexpTag:
      return copyReg(target);
    case funcTag:
      return copyFunction(target);
    default:
      return new Ctor(target);
  }
};

let map = new WeakMap();

const clone = target => {
  // 一定要在clone前先把根对象缓存
  map.set(target, true);
  return realClone(target);
}

const realClone = (target) => {
  if (isShallow(target)) {
    return target;
  }

  const type = getType(target);
  let cloneNode;
  if (isDeep[type]) {
    cloneNode = getInit(target);
  }
  else {
    return cloneOtherType(target, type);
  }

  // map类型
  if (type === mapTag) {
    target.forEach((v, k) => {
      cloneNode.set(realClone(k), realClone(v));
    })
  }

  // set类型
  if (type === setTag) {
    target.forEach(v => {
      cloneNode.add(realClone(v));
    });
  }

  // 数组类型
  if (type === arrayTag) {
    target.forEach(v => {
      cloneNode.push(realClone(v));
    })
  }
 
  if (type === objectTag) {
    // 防止对象循环引用
    if (map.has(target)) {
      return target;
    }
    map.set(target, true)
    for (let key of Reflect.ownKeys(target)) {
      cloneNode[realClone(key)] = realClone(target[key]);
    }
  }

  return cloneNode;
};


// 用例demo
const sym = Symbol('testB');
let a = {
  a: function (a, b) {
    console.log(a,b);
  },
  b: 'b',
  c: [1, 2, {a: 1}],
};
a[sym] = "symbol";
a.d = a;

let c = clone(a);
console.log(a.d === a, a);
console.log(c.d === c, c);