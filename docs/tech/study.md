[现代JavaScript教程](https://zh.javascript.info/) 阅读笔记

JavaScript在任意搭载了JavaScript引擎的设备中都可以执行，JS引擎对JS脚本进行解释执行，并在执行时做出一些优化  

同源：协议 + 域名 + 端口  

内置脚本：JavaScript程序可以在`<script>`标签的帮助下插入到HTML文档的任何地方，并且当浏览器遇到`<script>`时，会自动执行JS代码  
外部脚本：单独的JS脚本文件可以通过`<script>`标签的`src`属性添加到HTML文档中，如：`<script src="/path/to/script.js"></script>`，这里可以是绝对路径或相对路径  
> 简单脚本逻辑内置，复杂脚本逻辑外置，外部脚本会被浏览器下载并保存到浏览器的缓存中，其他页面请求同一外部脚本文件就会从缓存中获取，除非缓存失效，节省流量，并更快地加载页面  
> 如果`<script>`标签设置了src属性，则标签内的js内置脚本将被忽略（鱼与熊掌不可兼得）   

变量是数据的“命名存储”  

JS是动态类型（dynamically typed）编程语言  

JS中有8种基本的数据类型（7种原始类型，1种引用类型）  

number：整数、浮点数、Infinity、-Infinity、NaN  
bigInt：在整数后加 n  
string：单引号、双引号、反引号，可以包含一个或多个字符  
boolean：true、false
null：独立类型，只有null值，空或未知
undefined：独立类型，只有undefined，未被赋值，变量声明后未赋值
symbol：创建对象的唯一标识符
object：引用类型

通常情况下不应该给对象赋值 undefined。我们通常会用 null 来表示未知的或者空的值。

typeof：可以作为运算符或这函数，返回结果都一样
> 注意：typeof null返回object，这是一个官方承认的错误；另外，对函数名进行typeof运算返回function，这也是一个早期遗留的问题  

浏览器提供的交互：alert、prompt、confirm  
弹出的带信息窗口称为modal框（模态框），用户只有处理完模态框信息后才能继续与页面进行交互  

转换成number：null转为0，undefined转为NaN，true转为1，false转为false，字符串仅有空格和数字组成可转换成功，否则NaN

falsy值：空字符串""、数字0、null、undefined、NaN
truthy值：其他所有值，包括"0"、"false"、" "、空对象{}、空数组[]等  

||或链式运算：返回第一个真值，如果没有则返回最后一个值
&&与链式运算：返回第一个假值，如果没有则返回最后一个值
??空连运算：返回第一个已定义的值

```js
// 函数运行时间函数
const timingFunc = (funcName, ...funcParams) => {
  console.time(`[${funcName.name}] timing`);
  funcName(...funcParams);
  // funcName.call(null, ...funcParams);
  // funcName.apply(null, funcParams);
  console.timeEnd(`[${funcName.name}] timing`);
}

const add = (a, b) => console.log(a + b);
timingFunc(add, 1, 2);
// 3
// [add] timing: 0.544ms
```

求素数的两种方法：
```js
// 方法1：朴素方法求素数
// 遍历2～n的数，如果i可以被除1以外直到它的平方根之间的数整除，则不是素数
const getPrime1 = n => {
  let res = [];
  outer:
  for (let i = 2; i <= n; i++) {
    for (let j = 2; j <= Math.sqrt(i); j++) {
      if (i % j === 0) continue outer
    }
    res.push(i); // 输出素数
  }
  console.log(res);
  return res;
}
// getPrime1(20);
timingFunc(getPrime1, 200);
/* [
    2,   3,   5,   7,  11,  13,  17,  19,  23,  29,
   31,  37,  41,  43,  47,  53,  59,  61,  67,  71,
   73,  79,  83,  89,  97, 101, 103, 107, 109, 113,
  127, 131, 137, 139, 149, 151, 157, 163, 167, 173,
  179, 181, 191, 193, 197, 199
]
[getPrime1] timing: 1.665ms */

// 方法2：筛法求素数
// 从2到n进行从小到大排列，最小数2是素数，筛除掉数列中的2的倍数，将2放进素数数列，再对最小数进行同样操作
const getPrime2 = n => {
  let i = 2, arr = [], res = [], m = 0;
  while (i != n) arr.push(i++);
  while (arr.length) {
    m = arr.shift();
    res.push(m);
    arr = arr.filter(v => v % m !== 0);
  }
  console.log(res);
  return res;
}
// getPrime2(20);
timingFunc(getPrime2, 200);
/* [
    2,   3,   5,   7,  11,  13,  17,  19,  23,  29,
   31,  37,  41,  43,  47,  53,  59,  61,  67,  71,
   73,  79,  83,  89,  97, 101, 103, 107, 109, 113,
  127, 131, 137, 139, 149, 151, 157, 163, 167, 173,
  179, 181, 191, 193, 197, 199
]
[getPrime2] timing: 0.557ms */
```

switch使用严格比较

函数参数默认值：调用函数时，未传入参数，参数为undefined，此时，如果函数参数有默认值，则计算函数参数参数的默认值，赋值给参数变量，并且只会在缺少参数时才会计算
```js
function paramDefault(x = 1, y = getYDefault()) {
  console.log(x, y);
}

function getYDefault() {
  console.log("调用Y参数默认值函数");
  return 2;
}

paramDefault(10, 20); // 10 20
paramDefault(10); // 调用Y参数默认值函数 10 2
```
> 有时也会将参数的默认值设置放在函数体中，使用判断（与undefined）、||（或运算短路操作）、??（空连操作）

空值return或无return时函数返回值为undefined

将复杂函数进行拆分，可以实现函数的自描述，代码更清晰

JS中的一个函数是表示“行为”的一个值，字符串或数字等被视为常规值，函数被视为一个行为

函数表达式与函数声明：
- 函数声明是单独的代码块，后面不用跟分号。函数声明被定义之前，在同一作用域中就可以被调用
- 函数表达式是在一个表达式或另一个语法结构中创建的函数，比如赋值表达式。函数表达式在代码执行到时被创建，并且仅从此刻才可用
> JS准备运行脚本时（初始化阶段），首先在脚本中查找全局函数声明，并创建这些函数

位运算的骚操作[Bit Twiddling Hacks](http://graphics.stanford.edu/~seander/bithacks.html)
```js
// 基本二进制操作
let deNum = 54;
console.log(deNum.toString(2)); // 110110
let biStr = "10000101"
console.log(parseInt(biStr, 2)); // 133
let biNum = 0b011101;
console.log(biNum); // 29
```
```js
let deNum = -54;
console.log(deNum.toString(2)); // 110110

// 计算整数符号
console.log(Number(deNum > 0) * 2 - 1); // 1
// 或者二进制右移直至符号位

// 判断奇偶
console.log(deNum & 1); // 0

// 判断一个数是不是2的指数
console.log((deNum & (deNum - 1)) === 0) // false

// 计算一个数的二进制形式1的个数
deNum = 1773;
console.log(deNum.toString(2)); // 10001111

const countOneInBinary = n => {
  let res = 0;
  while (n) {
    res++;
    n &= (n - 1)
  }
  return res;
}
console.log(countOneInBinary(deNum)); // 5
timingFunc(countOneInBinary, deNum); // [countOneInBinary] timing: 0.098ms

const countOneInBinary2 = n => n.toString(2).split("").reduce((p, c, i, a) => p += Number(c == "1"), 0);
console.log(countOneInBinary2(deNum)); // 5
timingFunc(countOneInBinary2, deNum); // [countOneInBinary2] timing: 0.105ms
```

对象属性遍历顺序：整数属性会被排序，其他属性按照创建的顺序显示
> 这里的整数熟悉是说可以使用Number函数转为整数的属性

```js
// 对象深度复制
const deepCopy = (target, source) => {
  for (let key in source) {
    switch (typeof source[key]) {
      case "object":
        target[key] = deepCopy({}, source[key]);
        break;
      default:
        target[key] = source[key];
        break;
    }
  }
  return target;
}
let target = {};
let source = { name: 'tiger', hobbies: { sing: true, jump: true } }
target = deepCopy(target, source);
source.hobbies.sing = false;
console.log(source); // { name: 'tiger', hobbies: { sing: false, jump: true } }
console.log(target); // { name: 'tiger', hobbies: { sing: true, jump: true } }
```

this 的值是在代码运行时计算出来的，它取决于代码上下文。

在 JavaScript 中，this 是“自由”的，它的值是在调用时计算出来的，它的值并不取决于方法声明的位置，而是取决于在“点符号前”的是什么对象。

在运行时对 this 求值的这个概念既有优点也有缺点。一方面，函数可以被重用于不同的对象。另一方面，更大的灵活性造成了更大的出错的可能。

箭头函数有些特别：它们没有自己的 this。如果我们在这样的函数中引用 this，this 值取决于外部“正常的”函数。

构造函数在技术上是常规函数。不过有两个约定：它们的命名以大写字母开头、它们只能由 "new" 操作符来执行。

当一个函数被使用 new 操作符执行时，它按照以下步骤：  
一个新的空对象被创建并分配给 this；  
函数体执行。通常它会修改 this，为其添加新的属性；  
返回 this 的值。

通常，构造器没有 return 语句。它们的任务是将所有必要的东西写入 this，并自动转换为结果。但是，如果这有一个 return 语句，那么规则就简单了：
如果 return 返回的是一个对象，则返回这个对象，而不是 this。
如果 return 返回的是一个原始类型，则忽略。
换句话说，带有对象的 return 返回该对象，在所有其他情况下返回 this。

可选链接操作/预调用：?.如果存在则调用属性，只能调用不能赋值
?.()：预调用方法 ?.[]：预调用属性  

“Symbol” 值表示唯一的标识符。

如果我们要在对象字面量 {...} 中使用 Symbol，则需要使用方括号把它括起来。

Object.assign 会同时复制字符串和 symbol 属性

全局 Symbol 注册表:要从注册表中读取（不存在则创建）Symbol，请使用 Symbol.for(key)。

Symbol.keyFor 内部使用全局 Symbol 注册表来查找 Symbol 的键。所以它不适用于非全局 Symbol。如果 Symbol 不是全局的，它将无法找到它并返回 undefined。

Symbol的使用场景：
1）相对隐藏某些属性，但不是绝对隐藏
> for...in和Object.keys()获取不到，但使用Object.getOwnPropertySymbols()和Reflect.ownKeys()可以获取到
2）改变系统内置行为

当作对象的原始类型：
原始类型仍然是原始的。与预期相同，提供单个值  
JavaScript 允许访问字符串，数字，布尔值和 symbol 的方法和属性。  
为了使它们起作用，创建了提供额外功能的特殊“对象包装器”，使用后即被销毁。  

“对象包装器”对于每种原始类型都是不同的，它们被称为 String、Number、Boolean 和 Symbol  
不推荐使用new+对象包装器，但直接使用包装器函数是有用的  

数组也是一个对象，数组的元素也可以是一个函数，当这个函数中使用this，使用`arr[index]()`方式调用该函数，函数中的this指向这个数组对象  

```js
// 获取数组的连续子数组的最大和
function getMaxSumOfSubArr(arr) {
   return arr.reduce(({ partialSum, maxSum }, currValue, currIndex, currArr) => {
      partialSum += currValue;
      maxSum = Math.max(maxSum, partialSum);
      partialSum = partialSum > 0 ? partialSum : 0;
      return { partialSum, maxSum };
   }, { partialSum: 0, maxSum: 0 });
}

console.log(getMaxSumOfSubArr([100, 200, 300, -100])); // { partialSum: 500, maxSum: 600 }
console.log(getMaxSumOfSubArr([-1, 2, 3, -9])); // { partialSum: 0, maxSum: 5 }
console.log(getMaxSumOfSubArr([-1, 2, 3, -9, 11])); // { partialSum: 11, maxSum: 11 }
console.log(getMaxSumOfSubArr([-2, -1, 1, 2])); // { partialSum: 3, maxSum: 3 }
console.log(getMaxSumOfSubArr([100, -9, 2, -3, 5])); // { partialSum: 95, maxSum: 100 }
console.log(getMaxSumOfSubArr([1, 2, 3])); // { partialSum: 6, maxSum: 6 }
console.log(getMaxSumOfSubArr([-1, -2, -3])); // { partialSum: 0, maxSum: 0 }
```

```js
arr.splice(index[, deleteCount, elem1, ..., elemN])
```
从 index 开始：删除 deleteCount 个元素并在当前位置插入 elem1, ..., elemN。最后返回已删除元素的数组。

```js
// 随机打乱数组，有一个很棒的算法叫作 Fisher-Yates shuffle，思路是：逆向遍历数组，并将每个元素与其前面的随机的一个元素互换位置
// 细节注意：Math.floor(Math.random() * (i + 1))，(i + 1)的存在是因为当遍历到n时，加1保证了随机数结果也可以为n，也就是不与前面元素进行交换
function shuffle(arr) {
  let j = 0;
  for (let i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

let count = {
  '123': 0,
  '132': 0,
  '213': 0,
  '231': 0,
  '312': 0,
  '321': 0,
}
let arr = [1, 2, 3];
for (let i = 0; i < 10000; i++) {
  shuffle(arr);
  count[arr.join("")]++;
}

console.log(count);
// {
//   '123': 1639,
//   '132': 1689,
//   '213': 1654,
//   '231': 1683,
//   '312': 1677,
//   '321': 1658
// }
```

```js
// 迭代器实现1
let range = {
  from: 1,
  to: 5
}

range[Symbol.iterator] = function () {
  // 返回迭代器对象
  return {
    current: this.from,
    last: this.to,
    next() {
      if (this.current <= this.last) {
        return { done: false, value: this.current++ };
      } else {
        return { done: true, value: undefined };
      }
    }
  }
}

for (let v of range) {
  console.log(v);
}
```

```js
// 迭代器实现2
let range = {
  from: 1,
  to: 5,
  [Symbol.iterator]() {
    this.current = this.from;
    return this;
  },
  next() {
    if (this.current <= this.to) {
      return { done: false, value: this.current++ }
    } else {
      return { done: true, value: undefined };
    }
  }
}

for (let v of range) {
  console.log(v);
}
```

Map 是一个带键的数据项的集合，就像一个 Object 一样。 但是它们最大的差别是 Map 允许任何类型的键（key）。  
每一次 map.set 调用都会返回 map 本身，所以我们可以进行“链式”调用，map保留插入值的顺序  
可以使用内建方法 Object.entries(obj)，该返回对象的键/值对数组，该数组格式完全按照 Map 所需的格式

```js
// 任意数量的括号求和
function sum(a) {
  let currSum = a;
  function innerSum(b) {
    currSum += b;
    return innerSum;
  }
  innerSum.toString = function () {
    return currSum;
  }
  return innerSum;
}

console.log(sum(1).toString()); // 1
console.log(sum(1)(2) == 3); // true
console.log(sum(1)(2)(3) == 6); // true
```

```js
// 嵌套setTimeout实现周期性调度
setTimeout(function tick() {
  console.log('ok');
  setTimeout(tick, 1000);
}, 1000);

const loopFunction = (func, interval, ...args) => {
  func(...args);
  let tickId = setTimeout(function tick() {
    func(...args);
    tickId = setTimeout(tick, interval);
  }, interval, ...args);
};

loopFunction((a, b) => console.log(a + b), 2000, 1, 2);

const loopCounter = (func, interval) => {
  let count = 0;
  let tickId = setTimeout(function tick() {
    if (count++ < 5) {
      func();
    } else {
      clearTimeout(tickId);
    }
    tickId = setTimeout(tick, interval);
  }, interval);
}

loopCounter(() => console.log('ok'), 2000);

const loopCounter = (func, interval) => {
  let count = 0;
  let tickId = setTimeout(function tick() {
    func();
    tickId = count++ < 5 ? setTimeout(tick, interval) : null;
  }, interval);
}

loopCounter(() => console.log('ok'), 2000);

function printNumber(from, to) {
  let curr = from;
  let tickId = setTimeout(function tick() {
    console.log(curr);
    tickId = curr++ < to ? setTimeout(tick, 1000) : null;
  }, 0);
}

printNumber(1, 5);
```


```js
function slowFunc1(x) {
  console.log(`[${Date.now()}] computing... ${x}`);
  return x;
}

// slowFunc(1);

function cacheWrapper(func) {
  let cache = new Map();
  let key = ``;
  let res = null;
  return function (...args) {
    key = `${func.name}( ${args.join(", ")} )`;
    if (cache.has(key)) {
      console.log(`调用缓存数据...`)
      return cache.get(key);
    }
    res = func.call(this, ...args);
    cache.set(key, res);
    console.log(cache);
    console.log(`计算结果...`)
    return res;
  }
}

let slowFuncCW1 = cacheWrapper(slowFunc1);
slowFuncCW1(1123);
slowFuncCW1(1123);

/*
[1595149962939] computing... 1123
Map { 'slowFunc1( 1123 )' => 1123 }
计算结果...
调用缓存数据...
*/

const obj = {
  objFunc(a, b) {
    console.log(`[${Date.now()}] computing... ${a}, ${b}`);
    return a + b;
  }
}

const objFuncCW = cacheWrapper(obj.objFunc);
console.log(objFuncCW(1, 2));
console.log(objFuncCW(1, 2));
console.log(objFuncCW(2, 1));
/*
[1595150172436] computing... 1, 2
Map { 'objFunc( 1, 2 )' => 3 }
计算结果...
3
调用缓存数据...
3
[1595150172436] computing... 2, 1
Map { 'objFunc( 1, 2 )' => 3, 'objFunc( 2, 1 )' => 3 }
计算结果...
3
*/
```

```js
// debounce函数，防抖函数
function debounce(func, ms) {
  let tickId;
  return function (...args) {
    clearTimeout(tickId);
    tickId = setTimeout(func, ms, ...args);
  }
}
let i = 0;
let deFunc = debounce(x => console.log(x), 2000);
deFunc(i);
deFunc(i);
deFunc(i);
for (; i < 10; i++) {
  deFunc(i);
}
```

```js
// 不能二次bind
let tiger = { name: 'tiger' };
let cheng = { name: 'cheng' };
function sayName() {
  console.log(this.name);
}

let sayTiger = sayName.bind(tiger);
let sayCheng = sayName.bind(cheng);
sayTiger(); // tiger
sayCheng(); // cheng
sayTiger = sayTiger.bind(cheng);
sayTiger(); // tiger
```











