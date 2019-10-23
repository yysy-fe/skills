/**
 * 实现无限相加
 * 例： 
 *  add() -> 0
 *  add(1)(2) -> 3
 */



const add = function add (num) {
  if (add.flag === undefined) add.flag = 0;
  if (num === undefined) return add.flag;
  add.flag += num;
  return add;
};

add.constructor.prototype.toString = function () {
  return this.flag;
}


console.log(add(1)(2)(5)); // 8
console.log(add(2)); // 10
console.log(add); // 10
