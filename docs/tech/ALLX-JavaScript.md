# JavaScript

---

## 1 JS编程风格是函数式编程和面向对象编程的混合体

## 2 在HTML中使用JavaScript

### 2.1 \<script\>元素

### 2.2 async：异步脚本
可选属性，不阻塞页面渲染，立即下载脚本，下载完毕执行脚本，执行顺序无法控制

### 2.3 defer：延时脚本
可选属性，脚本可以延迟到文档完全被解析和显示之后再执行。立即下载，延时执行，顺序执行

> **注意：带有src属性的script元素，不能再在标签里有js代码**

> 如果不存在async和defer属性，那么就是按照在html中出现的顺序解析

### 2.4 DOMContentLoaded事件监听器
监听浏览器的 "DOMContentLoaded" 事件，即 HTML 文档体加载、解释完毕事件

### 2.5 脚本调用策略
如果脚本无需等待页面解析，且无依赖独立运行，那么应使用 async；
如果脚本无需等待页面解析，且依赖于其它脚本，调用这些脚本时应使用 defer，将关联的脚本按所需顺序置于 HTML 中。

## 3 基本概念

### 3.1 松散的动态类型
js变量是松散的动态类型，每个变量仅仅是一个保存值的占位符，所以未初始化就是一个undefined，且可以随时切换类型

### 3.2 引用错误（ReferenceError）异常
如果只是声明变量而没有赋值，则该变量的值是undefined，访问一个未声明的变量会导致抛出一个引用错误（ReferenceError）异常

### 可以使用 undefined 来判断一个变量是否已赋值（a===undefined）

### 变量提升hoisting

- JS引擎工作方式是先解析代码获取所有被声明的变量语句，再按行运行，所以所有变量声明语句都被提升到代码头部
```js
console.log(a);
var a=1;
=>
undefine
```
```js
var a=1;
==>
var a;
a=1;
```
	- 在创建变量时会被分为两步：变量的声明和赋值，变量声明命令通知解释引擎，要创建一个变量

### null表示一个空对象指针，所以typeof null == object

### 转为false的值：空字符串、0、NaN、null（与之相对的是任何对象）、undefined

- Boolean({}) == true

### 相等和不相等：转换后再比较
全等和不全等：不转换就比较

### 对于var而言，区块{}不构成作用域

## 4 变量

### 4.1 声明

- var

	- 没有块作用域、声明提升

- let

	- 所声明的变量，只在let命令所在的代码块内有效
	- 不存在变量提升（let、const）
	- 暂时性死区
temporal dead zone
简称 TDZ

		- 在代码块内，使用let命令声明变量之前，该变量都是不可用的
		- 1）TDZ意味着typeof不再是一个百分之百安全的操作（此前即使变量不存在，也是返回undefined）

			- typeof x; // ReferenceError
let x;

		- 2）函数参数也是声明

			- function bar(x = y, y = 2) {
  return [x, y];
}

bar(); // 报错

		- 3）声明前使用（赋值时先计算等号右边，再将计算结果赋值给左边变量）
	
			- // 报错
let x = x;
// ReferenceError: x is not defined

		- 本质：只要一进入当前作用域，所要使用的变量就已经存在了，但是不可获取，只有等到声明变量的那一行代码出现，才可以获取和使用该变量
	
	- let不允许在相同作用域内，重复声明同一个变量
	- let实际上为 JavaScript 新增了块级作用域
	
		- ES5 只有全局作用域和函数作用域，没有块级作用域。ES5 规定，函数只能在顶层作用域和函数作用域之中声明，不能在块级作用域声明
		- ES6 明确允许在块级作用域之中声明函数，块级作用域之中，函数声明语句的行为类似于let，在块级作用域之外不可引用
		- 块级作用域的出现，实际上使得获得广泛应用的匿名立即执行函数表达式（匿名 IIFE）不再必要
		- 但是，浏览器并不一定遵守约定，导致：
1）允许在块级作用域内声明函数。
2）函数声明类似于var，即会提升到全局作用域或函数作用域的头部。
3）函数声明还会提升到所在的块级作用域的头部。
		- 考虑到环境导致的行为差异太大，应该避免在块级作用域内声明函数。如果确实需要，也应该写成函数表达式，而不是函数声明语句

	- for循环的计数器，就很合适使用let命令。设置循环变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域

- const

	- const声明一个只读的常量。一旦声明，常量的值就不能改变，所以，const一旦声明变量，就必须立即初始化
	- const命令声明的常量不提升
同样存在暂时性死区
只能在声明的位置后面使用
不可重复声明
只在声明的块中有效
	- 本质：常量标识符指向的那个内存地址所保存的数据不得改动

		- 原始类型的值就存放在该块内存区域，等同于常量
		- 引用类型：标识符存放的是内存地址，即指向实际数据的指针，这个指针是固定的，至于它指向的数据结构是不是可变的，就完全不能控制了

- （ES6）如果区块中存在let和const命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错
- ES6 一共有 6 种声明变量的方法：var、let、const、function、import、class

### 4.2 顶层对象

- 在浏览器环境指的是window对象，在 Node 指的是global对象。ES5 之中，顶层对象的属性与全局变量是等价的
- 顶层对象的属性与全局变量挂钩，被认为是 JavaScript 语言最大的设计败笔之一
- ES6 做出改变，规定

	- 1）为了保持兼容性，var命令和function命令声明的全局变量，依旧是顶层对象的属性
	- 2）let命令、const命令、class命令声明的全局变量，不属于顶层对象的属性
	- 也就是说，从 ES6 开始，全局变量将逐步与顶层对象的属性脱钩

- 各种实现里面是不统一的

	- 1）浏览器里面，顶层对象是window，但 Node 和 Web Worker 没有window。
2）浏览器和 Web Worker 里面，self也指向顶层对象，但是 Node 没有self。
3）Node 里面，顶层对象是global，但其他环境都不支持。

- ES2020 在语言标准的层面，引入globalThis作为顶层对象。也就是说，任何环境下，globalThis都是存在的，都可以从它拿到顶层对象，指向全局环境下的this

---

## 5 控制语句

### 5.1 if 判断
`if(条件) {...};`
> `if`后括号内的条件可以为表达式或布尔值，表达式的运算结果需为布尔值

### 5.2 if...else 判断
`if(条件) {...} else {...};`

### 5.3 if...else if...else 判断
`if(条件1) {...} else if(条件2) {...} else {...};`

### 5.4 for循环
```
for(初始化表达式; 循环条件; 递增表达式) ...
或者
for (初始化表达式; 循环条件; 递增表达式) {...}
```

1) 初始化表达式（initialize）：确定循环变量的初始值，只在循环开始时执行一次。
2) 条件表达式（test）：每轮循环开始时，都要执行这个条件表达式，只有值为真，才继续进行循环。
3) 递增表达式（increment）：每轮循环的最后一个操作，通常用来递增循环变量。
4) for语句的三个部分（initialize、test、increment），可以省略任何一个，也可以全部省略。
5) for循环**特别之处**，就是设置循环变量的部分是一个父作用域，而循环体内部是一个单独的子作用域

  ```js
    for (let i = 0; i < 3; i++) {
      let i = 'abc';
      console.log(i);
    }
    // abc
    // abc
    // abc
  ```

### 5.5 while 循环
```
while (条件) 语句;
// 或者
while (条件) 语句;
```

### 5.6 do while 循环
```
do 语句
while (条件);
// 或者
do {
  语句
} while (条件);
```

- 与while循环类似，唯一的区别就是先运行一次循环体，然后判断循环条件。
- 不管条件是否为真，do...while循环至少运行一次，这是这种结构最大的特点

### 5.7 for in 键循环

用以枚举对象的所有属性，属性没有顺序，所以循环顺序不可预测

### 5.8 for of 值循环

### 5.9 switch case 选择判断

- switch使用全等，传入true，会依次判断case
- `switch(表达式) {case 表达式:....}`
  
  > **判断`switch`与`case`后的表达式是否相等，相等则执行`case`后的语句块**
- case语句块中的break不能少
- 建议switch...case结构可以用对象结构代替
```js
function doAction(action) {
  switch (action) {
    case 'hack':
      return 'hack';
    case 'slash':
      return 'slash';
    case 'run':
      return 'run';
    default:
      throw new Error('Invalid action.');
  }
}

// 使用对象改进：
function doAction(action) {
  var actions = {
    'hack': function () {
      return 'hack';
    },
    'slash': function () {
      return 'slash';
    },
    'run': function () {
      return 'run';
    }
  };

  if (typeof actions[action] !== 'function') {
    throw new Error('Invalid action.');
  }

  return actions[action]();
}
```

### 5.10 三元运算符
`(条件) ? 表达式1 : 表达式2`

### 5.11 break与continue 命令
break语句和continue语句都具有跳转作用，可以让代码不按既有的顺序执行  
- break语句用于跳出代码块或循环。
- continue语句用于立即终止本轮循环，返回循环结构的头部，开始下一轮循环

### 5.12 label 标签
  `label: 语句`
语句的前面有标签（label），相当于定位符，用于跳转到程序的任意位置。常与break语句和continue语句配合使用，跳出特定的循环或代码块

---

## 6 数据类型

### 6.1 JavaScript 语言的每一个值，都属于某一种数据类型

### 6.2 原始类型/基础类型
#### 6.2.1 基本类型：
   简单的数据段，undefined、null、boolean、number、string，按值访问，可以操作保存在变量中实际的值，栈内存

#### 6.2.2 undefined: undefined是一个表示"此处无定义"的原始值，转为数值时为NaN
      ```js
      // 1）变量声明了，但没有赋值
      var i;
      i // undefined

      // 2）调用函数时，应该提供的参数没有提供，该参数等于 undefined
      function f(x) {
         return x;
      }
      f() // undefined

      // 3）对象没有赋值的属性
      var  o = new Object();
      o.p // undefined

      // 4）函数没有返回值时，默认返回 undefined
      function f() {}
      f() // undefined
      ```
#### 6.2.3 null: null是一个表示“空”的对象，转为数值时为0  
#### 6.2.4 boolean: 布尔类型  
      下列运算符会返回布尔值：  
      1. 前置逻辑运算符： ! (Not)
      2. 相等运算符：===，!==，==，!=
      3. 比较运算符：>，>=，<，<=  
      > 如果 JavaScript 预期某个位置应该是布尔值（参与**逻辑运算**或**作为条件表达式**），会将该位置上现有的值自动转为布尔值，undefined、null、0、NaN、""或''（空字符串）五个值会转为false。  
      > **注意：空数组（[]）和空对象（{}）对应的布尔值，都是true**
#### 6.2.5 number: 数值类型  
   1. JS内部，**所有数字都是以64位浮点数形式储存**，即使整数也是如此，底层根本没有整数，所有数字都是小数，浮点数不精确，涉及小数的计算和比较需要注意。`1 === 1.0 // true`  
   2. 数值精度: (-1)^符号位 * 1.xx...xx * 2^指数部分  
   3. 数值范围  
   4. 数值进制   
         - 使用字面量（literal）直接表示一个数值时，JS对整数提供四种进制的表示方法：十进制、十六进制、八进制、二进制：
         - 1）十进制（Decimal）：没有前导0的数值。
         2）八进制（Octal）：有前缀0o或0O的数值，且只用到0-7的八个阿拉伯数字的数值。
         - 3）十六进制（Hex）：有前缀0x或0X的数值。
         - 4）二进制（Binary）：有前缀0b或0B的数值。  
         > 前导0表示八进制，处理时很容易造成混乱。ES5 的严格模式和 ES6，已经废除了这种表示法。  
         > 默认情况下，JS内部会自动将八进制、十六进制、二进制转为十进制
   5. 特殊数值
      - 正零和负零: 除当做分母外不同（得到正负Infinity），其余时刻都等于正常0
      - NaN（Not a Number）: 表示一个本要返回数值的操作数未返回数值的情况，避免抛出错误。出现在将字符串解析成数字、数学函数的运算结果出错的场合。
            ```js
            5 - 'x' // NaN
            Math.acos(2) // NaN
            Math.log(-1) // NaN
            Math.sqrt(-1) // NaN
            0 / 0 // NaN
            ```
            > 注意，NaN不是独立的数据类型，而是一个特殊数值，它的数据类型依然属于number，使用typeof运算符可以看得很清楚。`typeof NaN // 'number'`  

            NaN与任何数（包括它自己）的运算，得到的都是NaN，NaN不等于任何值，包括它本身  
            涉及NaN的操作都返回NaN。  
            NaN不与任何值相等，包括NaN，只能使用 `Number.isNaN(...)` 或 `Object.is(..., NaN)` 判断一个值是否为NaN。  
      - Infinity: 表示“无穷”，表示两种场景。一种是一个正的数值太大，或一个负的数值太小，无法表示；另一种是非0数值除以0，得到Infinity
   6. 全局方法（window对象的方法）
      - parseInt()  
         用于将字符串转为整数；` parseInt('123') // 123`  
         如果字符串头部有空格，空格会被自动去除；`parseInt('   81') // 81`  
         如果parseInt的参数不是字符串，则会先转为字符串再转换；
         ```js
         parseInt(1.23) // 1
         // 等同于
         parseInt('1.23') // 1

         parseInt(0x11, 36) // 43
         parseInt(0x11, 2) // 1
         // 等同于
         parseInt(String(0x11), 36)
         parseInt(String(0x11), 2)
         // 等同于
         parseInt('17', 36)
         parseInt('17', 2)
         // 0x11先默认转为十进制17，再转为字符串
         ```  
         字符串转为整数的时候，是一个个字符依次转换，如果遇到不能转为数字的字符，就不再进行下去，返回已经转好的部分；（Number函数是有非数字就NaN）
         ```js
         parseInt('8a') // 8
         parseInt('12**') // 12
         parseInt('12.34') // 12
         parseInt('15e2') // 15
         parseInt('15px') // 15
         ```  
         如果字符串的第一个字符不能转化为数字（后面跟着数字的正负号除外），返回NaN  
         ```js
         parseInt('abc') // NaN
         parseInt('.3') // NaN
         parseInt('') // NaN
         parseInt('+') // NaN
         parseInt('+1') // 1
         ```  
         返回值只有两种可能，要么是一个十进制整数，要么是NaN  
         如果字符串以0x或0X开头，parseInt会将其按照十六进制数解析；如果字符串以0开头，将其按照10进制解析  
         进制转换：接受第二个参数（2到36之间），表示被解析的值的进制，返回该值对应的十进制数  
         ```js
         parseInt('1000', 10) // 1000
         parseInt('1000', 2) // 8
         parseInt('1000', 6) // 216
         parseInt('1000', 8) // 512
         ```  
      - parseFloat()  
         用于将一个字符串转为浮点数  
         如果字符串包含不能转为浮点数的字符，则不再进行往后转换，返回已经转好的部分  
         自动过滤字符串前导的空格  
         如果参数不是字符串，或者字符串的第一个字符不能转化为浮点数，则返回NaN
         ```js
         parseFloat([]) // NaN
         parseFloat('FF2') // NaN
         parseFloat('') // NaN
         ```
      - isNaN(): 用来判断一个值是否为NaN
         ```js
         isNaN(NaN) // true
         isNaN(123) // false
         ```
         isNaN只对数值有效，如果传入其他值，会被先转成数值
         ```js
         isNaN('Hello') // true
         // 相当于
         isNaN(Number('Hello')) // true
         ```
         但是，对于空数组和只有一个数值成员的数组，isNaN返回false
      - isFinite(): 返回一个布尔值，表示某个值是否为正常的数值
#### 6.2.6 string: 字符串类型
   1. 字符串就是零个或多个排在一起的字符，放在单引号、双引号或反引号之中
   2. 反斜杠（\）在字符串内有特殊含义，用来表示一些特殊字符，所以又称为转义符
   3. 字符串可以被视为字符数组
      - 可以使用数组的方括号运算符，用来返回某个位置的字符（位置编号从0开始）
      - 如果方括号中的数字超过字符串的长度，或者方括号中根本不是数字，则返回undefined
      - 实际上，无法改变字符串之中的单个字符
   4. length属性: 返回字符串的长度，该属性也是无法改变的
   5. 每个字符在 JavaScript 内部都是以16位（即2个字节）的 UTF-16 格式储存。也就是说，JS的单位字符长度固定为16位长度，即2个字节
   6. Base64 转码
      - 文本里面包含一些不可打印的符号，比如 ASCII 码 0 到 31 的符号都无法打印出来，这时可以使用 Base64 编码，将它们转成可以打印的字符。另一个场景是，有时需要以文本格式传递二进制数据，那么也可以使用 Base64 编码
      - Base64 就是一种编码方法，可以将任意值转成 0～9、A～Z、a-z、+和/这64个字符组成的可打印字符。使用它的主要目的，不是为了加密，而是为了不出现特殊字符，简化程序的处理
      - 原生方法
         - btoa()：任意值转为 Base64 编码（原生）
         - atob()：Base64 编码转为原来的值（原生）
         > 注意，这两个方法不适合非 ASCII 码的字符，会报错。要将非 ASCII 码字符转为 Base64 编码，**必须中间插入一个转码环节**，再使用这两个方法
            ```js
            function b64Encode(str) {
               return btoa(encodeURIComponent(str));
            }

            function b64Decode(str) {
               return decodeURIComponent(atob(str));
            }

            b64Encode('你好') // "JUU0JUJEJUEwJUU1JUE1JUJE"
            b64Decode('JUU0JUJEJUEwJUU1JUE1JUJE') // "你好"
            ```
   7. 遍历器接口
      - ES6 为字符串添加了遍历器接口，使得字符串可以被for...of循环遍历 
         ```js
         for (let codePoint of 'foo') {
         console.log(codePoint)
         }
         // "f"
         // "o"
         // "o"
         ```
      - 优点：**可以识别大于0xFFFF的码点**，传统的for循环无法识别这样的码点
   8. 模板字符串
      - 模板字符串（template string）是增强版的字符串，用反引号（`）标识。它可以当作普通字符串使用，也可以用来定义多行字符串，或者在字符串中嵌入变量
      - 如果使用模板字符串表示多行字符串，所有的空格和缩进都会被保留在输出之中
      - 模板字符串中嵌入JS表达式，需要将表达式写在 `${}` 之中，如果大括号中的表达式值不是字符串，将按照一般的规则转为字符串
   9. 标签模板
      - 过滤 HTML 字符串，防止用户输入恶意内容
      - 多语言转换（国际化处理）
         ```js
         let name = `tiger`;
         let year = `1997`;

         console.log(`name: ${name}, year: ${year}`); // name: tiger, year: 1997
         console.log(tag `name: ${name}, year: ${year}`); //undefined

         function tag(strings, ...vars) {
            console.log(strings); // [ 'name: ', ', year: ', '' ]
            console.log(vars); // [ 'tiger', '1997' ]
         }
         ```
         > 标签函数的第一个参数是模板字符串的字符串部分，后面参数依次是模板字符串中的变量，也可以使用剩余参数合并成一个数组
   1. 常用函数：toUpperCase、toLowerCase、trim、charAt、repeat、replace
   2. 字符串截取: slice、substring、substr
         ```js
         let name = 'tigercheng';

         // 一个参数：起始位置（左闭右开）
         console.log(name.slice(2)); // gercheng
         console.log(name.substring(2)); // gercheng
         console.log(name.substr(2)); // gercheng

         // 两个参数：起始位置 + 结束位置/截取数量（左闭右开）
         console.log(name.slice(2, 3)); // g，[2, 3)
         console.log(name.substring(2, 3)); // g，[2, 3)
         console.log(name.substr(2, 3)); // ger，[2, 5)，截取三个

         // 负数：两个参数：起始位置 + 结束位置/截取数量（左闭右开）
         console.log(name.slice(-3, -1)); // en
         console.log(name.substring(-3, -1)); // 无意义，负数转为 [0, 0)
         console.log(name.substr(-3, 2)); // en

         // 身份证号码安全处理
         let ID = 212998099163358509;
         let secureFunc = (id, len) =>
           `${id.toString().slice(0,6)}${'*'.repeat(id.toString().length-len)}`;
         console.log(secureFunc(ID, 6)); // 212998************
         ```
   1. 字符串检索: indexOf、includes、lastIndexOf、startsWith、endsWith
      -  indexOf、lastIndexOf 可以传入第二个参数，表示其实查找位置
      -  includes、startsWith、endsWith 返回结果是布尔值
      > 可以先统一转为大小写，再进行检索
   2. 字符串替换: replace
      - 第一个参数：被替换的字符串
      - 第二个参数：替换字符串

#### 6.2.7 Symbol类型
   1. 使用
      ```js
      let s1 = Symbol();
      let s2 = Symbol();
      console.log(s1 === s2); // false

      s1 = Symbol("symbol 1");
      console.log(s1.toString()); // Symbol(symbol 1)
      console.log(s1.description); // symbol 1

      s1 = Symbol.for('symbol for');
      s2 = Symbol.for('symbol for');
      console.log(s1 === s1); // true
      console.log(s1.description) // symbol for

      let s3 = Symbol("123");
      let s4 = Symbol.for("123");
      console.log(Symbol.keyFor(s3)); // undefined
      console.log(Symbol.keyFor(s4)); // 123
      ```
      > 使用`Symbol.for()`定义`Symbol`变量时，内存会记录相应的`description`，再次以`Symbol.for()`定义相同`description`的`Symbol`变量时，会直接使用上一次创建好的`Symbol`变量  

      > `Symbol.keyFor()`可以获取到使用`Symbol.for()`定义的`Symbol`变量对应的描述（`Symbol`中可能称为`key`）
   2. 用途  
      所有的Symbol变量都是不同，用以区别变量，使其成为独一无二的变量 
      > 例如：一个班级重名的同学，使用`symbol`对名字进行唯一化处理；缓存中数据唯一化处理，避免数据覆盖，可以使用symbol做为对象的key，再用这个key来避免覆盖
      ```js
      class Cache {
         static cache = {}
         static set(key, value) {
            this.cache[key] = value;
         }
         static get(key) {
            return this.cache[key];
         }
      }

      let user1 = {
         key: Symbol("cheng"),
         name: "cheng",
         age: 23
      };

      let user2 = {
         key: Symbol("cheng"),
         name: "cheng",
         age: 73
      };

      Cache.set(user1.key, user1);
      Cache.set(user2.key, user2);

      console.log(Cache.get(user2.key)); 
      // { key: Symbol(cheng), name: 'cheng', age: 73 }
      ```
   3. 对象的`Symbol`属性不能使用`for key in obj`和`for key of Object.keys(obj)`遍历到，使用`for key of Object.getOwnPropertySymbols(obj)`可以只遍历到对象的`Symbol`属性，使用`for key of Reflect.ownKeys(obj)`可以遍历到包含`Symbol`属性的所有属性，所以一般情况下使用`for in`遍历的时候，就可以做到相对简单的属性私有化。

### 6.3 引用类型/合成类型

#### 6.3.1 引用类型
   1. object、array、function，多个值构成的对象，js不允许直接访问内存地址，只能操作对象的引用，按引用访问，堆内存  
   2. 引用类型描述一类对象所具有的属性和方法
   3. 引用类型的值（对象）是引用类型的一个实例
#### 6.3.2 Object 对象类型
   1. 简单说，对象就是一组“键值对”（key-value）的集合，是一种无序的复合数据集合
      ```js
      var obj = {
         foo: 'Hello',
         bar: 'World'
      };
      ```
   2. **对象的所有键名都是字符串**（数值会被自动转为字符串，其他类型会报错）
   3. 如果键名是数值，会被自动转为字符串，注意js中其他进制会被自动转为十进制
      ```js
      var obj = {
      1: 'a',
      3.2: 'b',
      1e2: true,
      1e-2: true,
      .234: true,
      0xFF: true
      };

      obj
      // Object {
      //   1: "a",
      //   3.2: "b",
      //   100: true,
      //   0.01: true,
      //   0.234: true,
      //   255: true
      // }
      ```
   4. 对象的每一个键名又称为 “属性” （property），它的 “键值” 可以是任何数据类型。如果一个属性的值为函数，通常把这个属性称为 “方法” ，它可以像函数那样调用
         
      > 属性可以动态创建，不必在对象声明时就指定
         
   5. **1）不同的变量名指向同一个对象，则都是这个对象的引用，即指向同一个内存地址。修改其中一个变量，会影响到其他所有变量。  
      2）两个变量指向同一个原始类型的值。那么，变量这时都是值的拷贝**
   6. 无法确定是对象还是代码块，一律解释为代码块。如果要解释为对象，最好在大括号前加上圆括号。圆括号的里面，只能是表达式，所以确保大括号只能解释为对象
      ```js
      ({ foo: 123 }) // 正确
      ({ console.log(123) }) // 报错
      ```
   7. 属性操作
      1. 读取
         - 1）点运算符 或 2）方括号运算符
            ```js
            var obj = {
            p: 'Hello World'
            }; 
            obj.p // "Hello World"
            obj['p'] // "Hello World"
            ```
         - 方括号运算符内部使用表达式  
            键名必须放在引号里面，否则会被当作变量处理。数字键可以不加引号，会自动转成字符串。先运算表达式，再用表达式结果作为要读取的属性。
            ```js
            obj['hello' + ' world']
            obj[3 + 3]
            ```
         - 数值键名不能使用点运算符（会被当成小数点），只能使用方括号运算符 （数组也是对象）
            ```js
            var obj = {
            123: 'hello world'
            };
            obj.123 // 报错
            obj[123] // "hello world"
            ```
      2. 赋值
         - 点运算符和方括号运算符，不仅可以用来读取值，还可以用来赋值
            ```js
            var obj = {};
            obj.foo = 'Hello';
            obj['bar'] = 'World';
            ```
         - JS允许属性的“后绑定”，也就是说，你可以在任意时刻新增属性
      3. 查看
         - 查看一个对象本身的所有属性，可以使用Object.keys方法
            ```js
            var obj = {
            key1: 1,
            key2: 2
            };
            Object.keys(obj); // ['key1', 'key2']
            ```
      4. 删除
         - delete命令用于删除对象的属性，删除成功后返回true
            ```js
            var obj = { p: 1 };
            Object.keys(obj) // ["p"]
            delete obj.p // true
            obj.p // undefined
            Object.keys(obj) // []
            ```
         - 删除一个不存在的属性，delete不报错，而且返回true
         - 只有一种情况，delete命令会返回false，那就是该属性存在，且不得删除
            ```js
            var obj = Object.defineProperty({}, 'p', {
               value: 123,
               configurable: false
            });

            obj.p // 123
            delete obj.p // false
            ```
         - delete命令只能删除对象本身的属性，无法删除继承的属性
      5. 是否存在
         - in运算符用于检查对象是否包含某个属性（注意，检查的是键名，不是键值）
            ```js
            var obj = { p: 1 };
            'p' in obj // true
            'toString' in obj // true
            ```
         - in运算符不能识别哪些属性是对象自身的，哪些属性是继承得来
         - 使用对象的hasOwnProperty方法判断是否为对象自身的属性
            ```js
            var obj = {};
            if ('toString' in obj) {
               console.log(obj.hasOwnProperty('toString')) // false
            }
            ```
      6. 遍历
         - for...in循环用来遍历一个对象的全部属性：
            - 1）遍历对象所有可遍历（enumerable）属性，跳过不可遍历的属性
            - 2）遍历对象自身的属性和继承的属性
         - 遍历对象自身的属性，使用for...in的时候，应该结合hasOwnProperty方法，在循环内部判断某个属性是否为对象自身的属性
#### 6.3.3 Function 函数类型
   1. 函数是一段可以反复调用的代码块，每个函数都是Function引用类型的实例（值、对象），函数也是对象/引用类型值，具有属性和方法，函数名实际上是指向函数对象的指针，因而没有函数重载。
   2. 函数声明
      1. function 命令声明的代码区块，就是一个函数。函数提升，整个函数体会像变量声明一样，被提升到代码头部。
      2. 函数表达式：将一个匿名函数赋值给变量。这个匿名函数又称函数表达式（Function Expression），因为赋值语句的等号右侧只能放表达式。function命令后面不带有函数名。如果加上函数名，该函数名只在函数体内部有效，在函数体外部无效。函数表达式只在运行到的时候才解释执行。
         > 使用var的函数表达式，声明会提升但赋值不会提升，报错`TypeError: f is not a function`。  
         ```js
         f(); // ok
         function f() { console.log('ok'); }

         f(); // TypeError: f is not a function
         var f = function (){};
         // 等同于
         var f;
         f(); // TypeError: f is not a function
         f = function () {};
         ```
      3. 如果同一个函数被多次声明，后面的声明就会覆盖前面的声明，由于函数名的提升，前一次声明在任何时候都是无效的。
         ```js
         // 例1
         var f = function () { console.log('函数表达式'); }
         function f() { console.log('函数命令式') }
         f(); // 函数表达式
         ```
         ```js
         // 例2
         var f;
         f(); // 2

         f = 97;
         // f(); // TypeError: f is not a function
         console.log(typeof f); // number

         f = () => console.log(1);
         console.log(typeof f); // function
         f(); // 1

         function f() { console.log(2); }
         console.log(typeof f); // function
         f(); // 1
         ```
   3. 圆括号运算符：函数名后面紧跟一对圆括号，就会调用/执行这个函数
   4. return语句，表示返回。return语句不是必需的，如果没有的话，该函数就不返回任何值，或者说返回undefined
   5. **一等公民：JS语言将函数看作一种值，与其它值（数值、字符串、布尔值等等）地位相同**。凡是可以使用值的地方，就能使用函数。函数只是一个可以执行的值，此外并无特殊之处。
   6. 属性/方法
      1. name属性 返回函数的名字
         > 通过变量赋值定义的函数，那么name属性返回变量名；

         > 如果变量的值是一个具名函数，那么name属性返回function关键字之后的那个函数名
      2. length属性 返回函数预期传入的参数个数，即函数定义之中的参数个数，不管调用时输入了多少个参数，函数声明时确定
      3. toString方法 返回一个字符串，内容是函数的源码
      4. 原生函数toString()方法返回 `function (){[native code]}`
   7. 函数作用域
      1. 作用域（scope）指的是变量存在的范围
         > 对于var命令来说，只用全局作用域和函数作用域，局部变量只能在函数内部声明，在其他区块中声明，一律都是全局变量
      2. 函数作用域内部也会产生 **“变量提升”** 现象
      3. **函数本身也是一个值（函数类型的实例），也有自己的作用域。它的作用域与变量一样，就是其声明时所在的作用域，与其运行时所在的作用域无关。函数执行时所在的作用域，是定义时的作用域，而不是调用时所在的作用域。**
      4. 函数体内部声明的函数，作用域绑定函数体内部
         ```js
         var a = 1;
         var x = function () { console.log(a); };
         function f() {
            var a = 2;
            x();
         }
         f() // 1
         ```
      5. **执行环境、变量对象、作用域链**
         - 执行环境（excutiosn context）定义变量或函数有权访问的其他数据，每个函数都有自己的执行环境
         - 变量对象（variable object）每个执行环境都有一个与之关联的变量对象，保存执行环境中的变量和函数
         - 当执行流进入一个函数的时候，函数的执行环境就会被压进一个环境栈，函数执行结束，栈弹出其环境，将控制权交给之前的执行环境
         - 作用域链（scope chain）保证对执行环境有权访问的变量和函数的有序访问，其前端始终是当前执行环境的变量对象，下一个变量对象来自包含环境（外部），直到全局执行环境（作用域链的最后一个对象
         - 标识符的解析是沿着作用域链一级级的解析，从前端开始，直到全局执行环境
   8. 函数参数
      1. 函数参数不是必需的，JS允许省略参数，省略的参数值变为undefined，函数的length属性与实际传入的参数个数无关，只反映函数预期传入的参数个数  
         > 没有办法只省略靠前的参数，而保留靠后的参数。如果一定要省略靠前的参数，只有显式传入undefined
      2. 传递方式
         - 原始类型的值（数值、字符串、布尔值），传递方式是传值传递（passes by value），函数体内修改参数值，不会影响到函数外部  
         - 复合类型的值（数组、对象、其他函数），传递方式是传址传递（pass by reference）。传入函数的原始值的地址，在函数内部修改参数，会影响到原始值  
            > 如果函数内部修改的，不是参数对象的某个属性，而是替换掉整个参数，这时不会影响到原始值。因为这时是重新赋值，函数参数在函数括号中时声明
      3. 如果有同名的参数，则取最后出现的那个值
   9. arguments 属性对象
      1. JavaScript 允许函数有不定数目的参数，所以需要一种机制，可以在函数体内部读取所有参数
      2. arguments对象包含了函数运行时的所有参数
      3. 这个对象只有在函数体内部，才可以使用
      4. 正常模式下，arguments对象可以在运行时修改；严格模式下，arguments对象与函数参数不具有联动关系
      5. length属性，可以判断函数调用时到底带几个参数，因为arguments对象在运行时才会创建，函数运行时确定
      6. 像数组，但它是一个对象，可以将arguments转为真正的数组
         ```js
         var args = Array.prototype.slice.call(arguments);
         // 或者
         var args = [];
         for (var i = 0; i < arguments.length; i++) {
            args.push(arguments[i]);
         }
         ```
      7. callee属性是一个指向拥有该arguments对象的函数的指针，返回它所对应的原函数，严格模式下禁用。在编写递归函数时，使用arguments.callee（拥有该arguments对象的函数）更保险
   0. this 属性对象  
      1. 引用该函数据以执行的执行环境对象，即以该函数为方法的环境对象，运行时确定
      2. 函数名仅仅是指针，复制函数就是复制指针，在堆内存中还是同一个函数，所以 this 是在函数运行时确定的，指向调用该函数的环境对象（谁调用该函数，this就指向谁）
   1. caller 属性对象  
      指向调用当前函数的函数
      ```js
      function f1() {
         console.log('f1');

         function f2() {
            console.log('f2');
            console.log(f2.caller);
         }

         f2();
         return f2;
      }
      let f2 = f1();
      f2();

      // f1
      // f2
      // [Function: f1]
      // f2
      // [Function]
      ```
   3. call、apply、bind
      1. apply方法的参数：运行函数的作用域（执行环境所关联的变量对象）、参数数组（Array的实例，也可以是arguments）
      2. call仅仅第二个参数不同，需要列出所有参数
      3. bind：返回一个新函数，新函数的this绑定到bind方法的参数
   4. 闭包（Closure）  
      1. 有权读取另一个函数作用域内部变量的函数，简单理解成“定义在一个函数内部的函数”。
      2. 最大的特点：可以“记住”诞生的环境，本质上，闭包就是将函数内部和函数外部连接起来的一座桥梁
      3. 注意，外层函数每次运行，都会生成一个新的闭包，而这个闭包又会保留外层函数的内部变量，所以内存消耗很大
      4. 函数第一次被调用的时候，会创建一个执行环境（excution environment）及相应的作用域链，将作用域链赋值给特殊的属性[[Scope]]，再使用this、arguments、其他命名参数的值初始化函数的活动对象（active object），在作用域链中，外部函数的活动对象处于下一层，直至作用域终点的全局执行环境。
      5. 作用域链的本质：指向变量对象的指针列表，指向本地活动对象、下一层变量对象、直至全局变量对象。
      6. 函数执行完毕，局部活动对象就会被销毁，内存中仅保存全局作用域（全局执行环境的变量对象）。
      7. 闭包存在的时候，外部函数执行完毕，执行环境的作用域链被销毁，其活动对象不会被销毁，因为匿名函数的作用域链仍在引用这个活动对象，所以外部函数的活动对象仍存在于内存中，直至内部函数被销毁。
      8. 闭包的this：this是运行时基于函数的执行环境绑定的，当函数被当做某个对象的方法被调用时，this就等于那个对象，匿名函数的执行具有全局性。
      9. 每个函数在调用时，都会自动取得this和arguments，所以在内部函数中无法直接访问外部函数的this和arguments变量，只能间接访问到。
   5. 立即调用的函数表达式（IIFE）:Immediately-Invoked Function Expression， JavaScript 引擎规定，如果function关键字出现在行首，一律解释成语句。
#### 6.3.4 Array 数组类型
   1. 数组是按次序排列的一组任何类型数据，每个值的位置都有编号（从0开始），整个数组用方括号表示。本质上，数组属于一种特殊的对象（特殊之处在于键都是数字，而数字会自动转为字符串）。typeof运算符会返回数组的类型是object。数组会自动扩容，当一个值放在超过数组长度的位置上，数组会重新计算长度，用空位填充新增位置，length属性可以设置（清空数组）。 
      >数组的创建：1） Array 是 JavaScript 的原生对象，同时也是一个构造函数，可以用它生成新的数组；2）数组字面量；3）扩展运算符；4）Array.of()；5）Array.from()  
      ```js
      // 创建数组
      console.log(new Array(2));// [ <2 empty items> ]
      console.log(Array(2));// [ <2 empty items> ]
      console.log(new Array(1, 2));// [ 1, 2 ]
      console.log([1, 2]);// [ 1, 2 ]

      function f(a, b, c) {
         console.log([...arguments]);// [ 1, 2, 3 ]
         console.log(Array.from(arguments));// [ 1, 2, 3 ]
      }
      f(1, 2, 3);

      console.log(Array.of(2));// [ 2 ]
      console.log(Array.of(1, 2));// [ 1, 2 ]
      ```
      ```js
      // 查看数组
      let arr = ['tiger', 97, 'male'];
      console.table(arr); // 查看效果更佳
      ```
   2. 数组空位
      1. 当数组的某个位置是空元素，即两个逗号之间没有任何值，我们称该数组存在空位（hole）。空位不影响length属性，可以读取的，返回undefined。使用delete命令删除一个数组成员，会形成空位，并且不会影响length属性。
         ```js
         var a = [1, 2, 3];
         delete a[1];
         a[1] // undefined
         a.length // 3
         a // [ 1, <1 empty item>, 3 ]
         ```
      2. 某个位置是空位，与某个位置是undefined，是不一样的  
         - 如果是空位，使用数组的forEach方法、for...in结构、以及Object.keys方法进行遍历，空位都会被跳过。  
         - 如果某个位置是undefined，遍历的时候就不会被跳过。
   3. 数组属性和方法
      > 可以为数组添加属性，不影响length属性的值
      1. length属性  
         数组的length属性返回数组的成员数量，可写。数组是一种动态的数据结构，可以随时增减数组的成员，所以 length 属性是一个动态的值。作为引用类型/对象，数组的数字键不需要连续，length 属性的值总是等于最大的整数键加1。
         - 如果设置一个小于当前成员个数的值，数组成员会自动减少到length设置的值。清空数组的一个有效方法，就是将length属性设为0。
         - 如果length属性设为大于数组个数时，新增位置填充空位，读取空位会返回undefined（相当于声明了，但未赋值）。
      2. 静态方法
         - Array.isArray()：判断参数是否为数组,返回一个布尔值，表示参数是否为数组，弥补typeof运算符的不足。
         - Array.from()：将一个类数组转为数组，如：NodeList等，同时可以传入第二个函数参数，该函数参数以转换后的数组元素作为参数进行遍历（类似数组的map方法）。
      3. 实例方法
         - Array.prototype.valueOf()：数组的valueOf方法返回数组本身。是一个所有对象都拥有的方法，表示对该对象求值，不同对象的valueOf方法不尽一致，也可以自定义。
         - Array.prototype.toString()：数组的toString方法返回返回以“,”（默认值）连接的字符串，也是对象的通用方法，可以自定义。
            >  String(arr) 调用的即是 Array.prototype.toString()方法。
         - **插入、删除系列**
            - **push** 方法（尾入）：用于在数组的末端添加一个或多个元素，并返回添加新元素后的数组长度，改变原数组。
            - **pop** 方法（尾出）：用于删除数组的最后一个元素，并返回该元素，改变原数组。对空数组使用pop方法，不会报错，而是返回undefined。
               > push和pop结合使用，就构成了“后进先出”的**栈结构**（stack）
            - **shift** 方法（头出）：用于删除数组的第一个元素，并返回该元素，改变原数组。shift() 方法可以遍历并清空一个数组。
               > push()和shift()结合使用，就构成了“先进先出”的**队列结构**（queue）
            - **unshift** 方法（头入）：用于在数组的第一个位置添加元素，并返回添加新元素后的数组长度，改变原数组。
            - **splice** 方法（万能）：用于删除原数组的一部分成员，并在删除的位置添加新的数组成员，返回值是被删除的元素组成的数组，改变原数组，可以实现：**删除、插入、替换、截取**。  
               第一个参数是删除的起始位置（从0开始），第二个参数是被删除的元素个数，如果后面还有更多的参数，则表示这些就是要被插入数组的新元素。
               > 1）如果起始位置是负数，就表示从倒数位置开始删除  
               > 2）如果只是单纯地插入元素，第二个参数可以设为0  
               > 3）如果只提供第一个参数，等同于将原数组在指定位置拆分成两个数组（删除到最后一个元素）
               ```js
               let arr = [1, 2, 3, 4, 5];

               function move(arr, from, to) {
                  let resArr = [...arr],
                     {
                        length
                     } = arr;
                  from = (from + length) % length;
                  to = (to + length) % length;
                  if (from < 0 || to < 0) {
                     throw new Error('参数错误');
                  }
                  let [opitem] = resArr.splice(from, 1);
                  resArr.splice(to, 0, opitem);
                  return resArr;
               }

               let newArr = move(arr, -1, -5);
               console.log(arr, newArr); // [ 1, 2, 3, 4, 5 ] [ 5, 1, 2, 3, 4 ]
               ```
            - **fill** 方法（局部覆盖）：用于使用新值覆盖原数组的一部分成员，修改原数组，返回值就是原数组。第一个参数是覆盖新值，第二个参数是覆盖起始位置，第三个参数是覆盖结束位置。
         - **合并系列**
            - **join** 方法（数组内）：以指定参数作为分隔符，将所有数组成员连接为一个字符串返回。如果不提供参数，默认用逗号分隔。如果数组成员是 undefined、null 或 空位，会被转成空字符串。（通过call方法，这个方法也可以用于字符串或类似数组的对象）
               ```js
               Array.prototype.join.call('hello', '-')
               // "h-e-l-l-o"
               ```
            - **concat** 方法（数组间）：用于多个数组的合并。它将新数组的成员，添加到原数组成员的后部，然后返回一个新数组，原数组不变。concat 也接受其他类型的值作为参数，添加到目标数组尾部。如果数组成员包括对象，concat方法返回当前数组的一个浅拷贝。
            ```js
            ['hello'].concat(['world'], ['!'])
            // ["hello", "world", "!"]

            [].concat({a: 1}, {b: 2})
            // [{ a: 1 }, { b: 2 }]
            ```
            > **使用扩展运算符更加清晰简洁**
         - **排序系列**
            - **reverse** 方法：用于颠倒排列数组元素，返回改变后的数组，改变原数组。
            - **sort** 方法：对数组成员（包括对象类型）进行排序，默认是按照字典顺序排序，改变原数组。可以传入一个函数作为参数，按照自定义方式排序，该参数函数接受两个参数，表示进行比较的两个数组成员，如果该参数函数的返回值小于0，则是从小到大排序，反之从大到小（自定义的排序函数最好返回数值）。
            ```js
            let arr = [1, 2, 3, 4, 5];
            arr = arr.sort((a, b) => a - b); // 小于0，从小到大
            console.log(arr); // [ 1, 2, 3, 4, 5 ]
            ``` 
            ```js
            let arr = [
               {name:'tiger',age:73},
               {name:'huang',age:37},
               {name:'cheng',age:23},
            ];
            arr = arr.sort((a, b) => a.age - b.age); // 小于0，从小到大
            console.log(arr); 
            /*[
               { name: 'cheng', age: 23 },
               { name: 'huang', age: 37 },
               { name: 'tiger', age: 73 }
            ]*/
            ```
         - **提取系列**
            - **slice** 方法：用于提取目标数组的一部分，返回一个新数组，原数组不变。第一个参数为起始位置（从0开始，会包括在返回的新数组之中），第二个参数为终止位置（但该位置的元素本身不包括在内），遵循“左闭右开”原则。
               > 1）如果省略第二个参数，则一直返回到原数组的最后一个成员  
               > 2）如果 slice 方法的参数是负数，则表示倒数计算的位置  
               > 3）slice 没有参数，实际上等于返回一个原数组的拷贝，可以将类似数组的对象转为真正的数组
         - **迭代遍历系列**
            - 参数1：在每一项元素上运行的函数，参数2：运行该函数的作用域对象（可选），都不修改原数组 
            - **map** 方法：返回函数返回值组成的数组。1）接受一个函数作为第一个参数。该函数调用时，map方法向它传入三个参数：当前成员、当前位置和数组本身；2）还可以接受第二个参数，用来绑定回调函数内部的this变量。
               > 如果数组有空位，map方法的回调函数在这个位置不会执行，会跳过数组的空位
            - **forEach** 方法：对每个元素运行函数，没有返回值。用法与map方法一致，第一个参数是参数函数，该参数函数同样接受三个参数：当前值、当前位置、整个数组；第二个参数接收绑定参数函数的this变量，也会跳过数组的空位。
            - **filter** 方法：返回参数函数返回值为true组成的数组，用法与map方法一致，参数是一个函数，该函数同样接受三个参数：当前值、当前位置、整个数组；接受第二个参数，绑定参数函数的this变量。
            - **every** 方法：参数函数返回值都为true，就为true。
            - **some** 方法：参数函数返回值任一为true，就为true
            - keys()、values()、entries() 方法返回迭代器，其中`entries`方法每次迭代的value值是一个数组`[索引, 值]`。
         - **累积系列（reduce、reduceRight）**
            - 依次处理数组的每个成员，最终累计为一个值，并返回该累积变量
            - 参数函数的四个参数：1）累积变量，默认为数组的第一个成员；2）当前变量，默认为数组的第二个成员；3）当前位置（从0开始）索引；4）原数组对象。前两个参数是必须的，后两个参数则是可选的。
            - 如果要对累积变量指定初值，可以把它放在reduce方法和reduceRight方法的第二个参数，第二个参数相当于设定了默认值，处理空数组时尤其有用。如果指定了累积变量的初始值，即给定了`Array.prototype.reduce`方法的第二个参数，则累积过程从数组第一个元素开始，否则就是以数组第一个元素为累积变量初始值，累积过程从数组第二个元素开始。
            ```js
            // 找出字符长度最长的数组成员
            function findLongest(entries) {
               return entries.reduce(function (longest, entry) {
                  return entry.length > longest.length ? entry : longest;
               }, '');
            }
            findLongest(['aaa', 'bb', 'c']) // "aaa"
            ```
            ```js
            // 统计数组元素出现次数
            let arr = [1, 2, 3, 1, 2, 4, 1, 3, 4, 1, 2];
            let res = {};

            res = arr.reduce((pre, curr, currIndex, array) => {
               res[curr] ? res[curr]++ : res[curr] = 1;
               return res;
            }, -1);

            console.log(res); // { '1': 4, '2': 3, '3': 2, '4': 2 }

            let noRepeatArr = arr.reduce((norepeatarr, curr) => {
               if (!norepeatarr.includes(curr)) norepeatarr.push(curr);
               return norepeatarr;
            }, []);

            console.log(noRepeatArr); // [ 1, 2, 3, 4 ]
            ```
         - **查找系列**
            - **indexOf** 方法：返回给定元素在数组中第一次出现的位置，如果没有出现则返回-1。还可以接受第二个参数，表示搜索的开始位置。
            - **lastIndexOf** 方法：返回给定元素在数组中最后一次出现的位置，如果没有出现则返回-1。还可以接受第二个参数，表示搜索的开始位置。
            - **includes** 方法：返回指定参数是否存在在数组中的布尔值。
            ```js
            // 查验从数组arr的位置from起始从左向右是否存在目标target
            let arr = [0, 1, 2, 3, 4, 5];

            function includesFrom(arr, from, target) {
               // from = from > 0 ? from : from + arr.length;
               from = (from + arr.length) % arr.length;
               if (from < 0 || from >= arr.length) throw new Error("起始参数错误");
               return arr.slice(from).includes(target); // slice不改变原数组
            }

            console.log(includesFrom(arr, 2, 1)); // false
            console.log(includesFrom(arr, 2, 2)); // true
            ``` 
            ```js
            // 查验从数组arr的位置from（不包含在查找范围内）起始从右向左是否存在目标target
            // 将方法写到数组原型上，不要使用箭头函数，以免不能使用this获取到调用方法的数组对象
            let arr = [0, 1, 2, 3, 4, 5];

            Array.prototype.lastIncludesFrom = function (from, target) {
               // 这里需要注意边界值：this.length，会使得 from = 0
               // from = from == this.length ? from : (from + this.length) % this.length;

               from = from > 0 ? from : from + arr.length;
               if (from < 0 || from > this.length) throw new Error("起始参数错误");
               return this.slice(0, from).includes(target);
            };

            console.log(arr.lastIncludesFrom(arr.length, 5)); // true
            console.log(arr.lastIncludesFrom(arr.length - 1, 5)); // false
            console.log(arr.lastIncludesFrom(-1, 4)); // true
            ```
            - **find** 方法：传入一个函数作为参数，参数函数以数组元素为参数依序遍历，如果该参数函数的返回值为`true`，则`find`方法的返回值就是该数组元素，否则返回值为`undefined`。
            ```js
            let arr = [1, 2, 3, 4, 5];
            let findRes = arr.find(item => item == 2);
            console.log(findRes); // 2
            ```
         - 链式调用：上面这些数组方法之中，有不少返回的还是数组，所以可以链式使用
   4. 类数组对象 array-like object  
      1. 如果一个对象的所有键名都是正整数或零，并且有length属性，那么这个对象就很像数组，属于类数组对象。“类似数组的对象”并不是数组，因为它们不具备数组特有的方法。类数组对象的根本特征，是具有length属性，只要有length属性，就可以认为这个对象类似于数组，但是这个length不是动态的。典型的“类似数组的对象”是函数的arguments对象，以及大多数 DOM 元素集，还有字符串。
      2. 转变成真正的数组
         ```js
         var arr = Array.prototype.slice.call(arrayLike);
         ```
   5. 扩展/展开运算符 ...
      1. rest 参数的逆运算，将一个数组转为用逗号分隔的参数序列。只有函数调用时，扩展运算符才可以放在圆括号中。扩展运算符可以展开数组，所以不再需要apply方法，将数组转为函数的参数了。常将字符串、类数组转为真正的数组，再调用数组独有的函数，或是将不重要的参数收集到一个数组中。
         > 展开：出现在赋值号右边  
         > 收集：出现在赋值号左边 
         ```js	
         // ES5 的写法
         function f(x, y, z) {
            // ...
         }
         var args = [0, 1, 2];
         f.apply(null, args);

         // ES6的写法
         function f(x, y, z) {
            // ...
         }
         let args = [0, 1, 2];
         f(...args);
         ```
         ```js
         // ES5 的写法
         Math.max.apply(null, [14, 3, 77])

         // ES6 的写法
         Math.max(...[14, 3, 77])

         // 等同于
         Math.max(14, 3, 77);
         ```
      2. 复制数组  
         数组是复合数据类型/引用类型，直接复制的话，只是复制了指向底层数据结构的指针，而不是克隆一个全新的数组
         ```js
         const a1 = [1, 2];
         // 写法一
         const a2 = [...a1];
         // 写法二
         const [...a2] = a1;
         ```
      3. 合并数组
         ```js
         const arr1 = ['a', 'b'];
         const arr2 = ['c'];
         const arr3 = ['d', 'e'];

         // ES5 的合并数组
         arr1.concat(arr2, arr3);
         // [ 'a', 'b', 'c', 'd', 'e' ]

         // ES6 的合并数组
         [...arr1, ...arr2, ...arr3]
         // [ 'a', 'b', 'c', 'd', 'e' ]
         ```
      4. 与解构赋值结合
         ```js
         let name = 'tiger';
         let [...chars] = name;
         console.log(chars); // [ 't', 'i', 'g', 'e', 'r' ]

         let [firstChar, ...restChars] = chars;
         console.log(firstChar); // t
         console.log(restChars); // [ 'i', 'g', 'e', 'r' ]

         let [fChar, ...rChars] = name;
         console.log(fChar); // t
         console.log(rChars); // [ 'i', 'g', 'e', 'r' ]
         ```
   6. 清空数组  
         `let arr = [1, 2, 3];`
      1. 直接赋值为空数组，`arr = []`
      2. 设置数组长度为0，`arr.length = 0`
      3. 使用`splice`函数，`arr.splice(0)`或`arr.splice(0, arr.length)`
      4. 循环使用`pop`或`shift`，`while(arr.pop()){}`

### 6.4 类型判断
   1. typeof运算符
      ```js
      typeof 123 // "number"
      typeof '123' // "string"
      typeof false // "boolean"
      function f() {}
      typeof f // "function"
      typeof undefined // "undefined"
      typeof window // "object"
      typeof {} // "object"
      typeof [] // "object"
      typeof null // "object"
      ```
      > 可以用来检查一个没有声明的变量，而不报错，在判断语句中使用
   2. instanceof运算符
      - 判断一个构造函数的prototype属性所指向的对象是否存在另外一个要检测对象的原型链上
      ```js
      let str = 'str';
      let strString = new String(str);
      console.log(str instanceof String); // false 
      console.log(strString instanceof String); // true
      console.log(String instanceof Object); // true
      ```
   3. Object.prototype.toString方法
      ```js
      // 定义判断类型的函数
      const TYPE = {};
      for (let i = 0, type; type = ["Boolean", "String", "Number", "Array", "Function", "Object"][i++];) {
         TYPE[`is${type}`] = obj => Object.prototype.toString.call(obj) === `[object ${type}]`;
      }
      TYPE.isNumber(1) // true
      ```
   4. 确定基本类型使用typeof，确定引用类型使用instanceof（不精确）

### 6.5 类型转换
   1. JavaScript 是一种动态类型语言，变量没有类型限制，可以随时赋予任意值
   2. 变量的数据类型是不确定的，但是各种运算符对数据类型是有要求的。如果运算符发现，运算子的类型与预期不符，就会自动转换类型。
   3. 强制转换
      1. Number()
         - 将任意类型的值转化成数值（转换成原始类型）
         - 原始类型  
            1）数值：转换后还是原来的值 `Number(324) // 324`  
            2）字符串：如果可以被解析为数值，则转换为相应的数值 `Number('324') // 324`  
            3）字符串：如果不可以被解析为数值，返回 NaN `Number('324abc') // NaN`  
            4）空字符串转为0 `Number('') // 0`  
            5）布尔值：true 转成 1，false 转成 0  
               ```js
               Number(true); // 1  
               Number(false); // 0
               ```
            6）undefined：转成 NaN `Number(undefined) // NaN`  
            7）null：转成0 `Number(null) // 0`
            - Number 函数将字符串转为数值，要比 parseInt 函数严格很多。基本上，只要有一个字符无法转成数值，整个字符串就会被转为 NaN。
            - parseInt 逐个解析字符，而 Number 函数整体转换字符串的类型
            - parseInt 和 Number 函数都会自动过滤一个字符串前导和后缀的空格
         - 引用类型  
            简单的规则是，Number 方法的参数是对象时，将返回 NaN ，除非是包含单个数值的数组  

            1）第一步，调用对象自身的 valueOf 方法。如果返回原始类型的值，则直接对该值使用 Number 函数，不再进行后续步骤。  
            2）第二步，如果 valueOf 方法返回的还是对象，则改为调用对象自身的 toString 方法。如果 toString 方法返回原始类型的值，则对该值使用Number函数，不再进行后续步骤。  
            3）第三步，如果 toString 方法返回的是对象，就报错。  
            > valueOf() ==> toString()
            ```js
            let arr = [];
            console.log(Number(arr)); // 0
            arr = [1];
            console.log(Number(arr)); // 1，单个数值的数组转为该数值
            arr = [1, 2, 3];
            console.log(Number(arr)); // NaN

            let obj = {};
            console.log(Number(obj)); // NaN
            obj = {
               valueOf: () => '97'
            };
            console.log(Number(obj)); // 97
            ```
      2. String()
         - 将任意类型的值转化成字符串
         - 原始类型  
            1）数值：转为相应的字符串。  
            2）字符串：转换后还是原来的值。  
            3）布尔值：true转为字符串"true"，false转为字符串"false"。  
            4）undefined：转为字符串"undefined"。  
            5）null：转为字符串"null"。
         - 引用类型  
            参数如果是对象，返回一个类型字符串；如果是数组，返回该数组的字符串形式  
            ```js
            String({a: 1}) // "[object Object]"
            String([1, 2, 3]) // "1,2,3"
            ```
            1）先调用对象自身的toString方法。如果返回原始类型的值，则对该值使用String函数，不再进行以下步骤。  
            2）如果toString方法返回的是对象，再调用原对象的valueOf方法。如果valueOf方法返回原始类型的值，则对该值使用String函数，不再进行以下步骤。  
            3）如果valueOf方法返回的是对象，就报错。  
            > toString() ==> valueOf()
      3. Boolean()
         - 将任意类型的值转为布尔值
         - 除了 `undefined、null、+0或-0、NaN、''（空字符串）` 五个值的转换结果为false，其他的值全部为true。  
         - 注意，所有对象（包括空对象）的转换结果都是true，甚至连 false 对应的布尔对象 new Boolean(false) 也是 true（所有对象的布尔值都是true）
            > **Boolean() 传入引用类型数据参数结果都为真，引用类型数据存放的是内存地址**
   4. 自动转换  
      1. **预期**什么类型的值，就自动调用该类型的强制转换函数
      2. 比较运算和逻辑判断的自动转换
         1. 在参与比较运算时会自动进行**转为数值**的类型转换（调用Number函数）
         2. 在作为逻辑运算/条件表达式时会自动进行**转为布尔值**的类型转换（调用Boolean函数）
      3. 场景：  
         1）不同类型的数据互相运算  
         2）对非布尔值类型的数据求布尔值  
         3）对非数值类型的值使用一元运算符（即+和-）  
         4）调用基础类型所对应的包装类型的一些属性和方法  
         ```js
         let name = 'tigercheng';
         console.log(typeof name); // string
         // TypeError: Cannot use 'in' operator to search for 'length' in tigercheng
         // console.log('length' in name); 
         console.log(name.length); // 10

         let nameObj = new String("tigercheng");
         console.log(typeof nameObj); // object
         console.log('length' in nameObj); // true
         console.log(nameObj.length); // 10
         ```
      4. 自动转为布尔值  
		   除了 `undefined、null、+0或-0、NaN、''（空字符串）` 五个值，其他都是自动转为true。
         ```js
         let flag = false; // 布尔字面量
         console.log(typeof flag); // boolean
         if (flag) console.log(1); // 无输出
         let flagObj = new Boolean(false); // 布尔对象
         if (flagObj) console.log(2); // 2 有输出
         if (flagObj.valueOf()) console.log(3); // 无输出
         ```
         > **注意：值为 false 的布尔对象自动转为 true 布尔类型**  
      5. 自动转换字符串
         - 遇到预期为字符串的地方，就会将非字符串的值自动转为字符串。具体规则是，先将复合类型的值转为原始类型的值，再将原始类型的值转为字符串
         - 字符串的自动转换，主要发生在字符串的加法运算时。当一个值为字符串，另一个值为非字符串，则后者转为字符串。
            ```js
            '5' + 1 // '51'
            '5' + true // "5true"
            '5' + false // "5false"
            '5' + {} // "5[object Object]"
            '5' + [] // "5"
            '5' + function (){} // "5function (){}"
            '5' + undefined // "5undefined"
            '5' + null // "5null"
            ```
      6. 自动转为数值
         - 自动调用Number函数
         - 除了加法运算符（+）有可能把运算子转为字符串，其他运算符都会把运算子自动转成数值
            ```js
            let age = '97';
            console.log(typeof age); // string
            console.log(age + 10); // '9710'
            console.log(age * 1 + 10); // 107 乘法自动转换
            console.log(Number(age) + 10); // 107 强制转换
            ```
            > **注意：比较运算符会把运算子自动转成数值，再进行数值的比较**  
            ```js
            // 布尔类型 true ==> 1, false ==> 0
            let age = 97;
            console.log(age == true); // false 97==1
            age = 1;
            console.log(age == true); // true 1==1
            age = 0;
            console.log(age == true); // false 0==1
            ``` 
            ```js
            // 字符串类型
            let age = '0';
            if (age) console.log(1); // 1 
            console.log(age == false); // true 0==0
            age = '1';
            console.log(age == 1); // true 1==1
            age = '97';
            console.log(age == false); // false 97==0
            ```  
         - null转为数值时为0，而undefined转为数值时为NaN
   5. 字符串数组与字符串的转换
      1. 字符串数组转字符串：join  
         > 参数是连接字符串数组各项的字符或字符串
      2. 字符串转字符串数组：split  
         > 参数是分割字符串的字符或字符串
      ```js
      let name = 'tiger11cheng';
      let nameArr = name.split('11');
      console.log(nameArr); // [ 'tiger', 'cheng' ]
      let newName = nameArr.join(""); // 使用空字符串连接
      console.log(newName); // 'tigercheng'
      let charArr = newName.split(""); // 使用空字符串分割
      console.log(charArr) // ['t', 'i', 'g', 'e', 'r', 'c', 'h', 'e', 'n', 'g']
      ```
---

## 7 运算

### 7.1 算术运算符

#### 7.1.1 加法
   1. JavaScript 允许非数值的相加，加法运算符存在重载
   2. 布尔值都会自动转成数值，然后再相加
      ```js
      true + true // 2
      1 + true // 2
      ```
   3. 两个字符串相加，这时加法运算符会变成连接运算符，返回一个新的字符串，将两个原字符串连接在一起
      ```js
      'a' + 'bc' // "abc"
      ```
   4. 如果一个运算子是字符串，另一个运算子是非字符串，这时非字符串会转成字符串，再连接在一起
      ```js
      1 + 'a' // "1a"
      false + 'a' // "falsea"
      ```
   5. 其他算术运算符（比如减法、除法和乘法）都不会发生重载。它们的规则是：所有运算子一律转为数值，再进行相应的数学运算，注意NaN
   6. 对象的相加：如果运算子是对象，必须先转成原始类型的值，然后再相加
   7. 对象转成原始类型的值：  
      1）首先，自动调用对象的valueOf方法  
      2）再自动调用对象的toString方法，将其转为字符串

#### 7.1.2 求余
   1. 返回前一个运算子被后一个运算子除，所得的余数
   2. 运算结果的正负号由第一个运算子的正负号决定，为了得到负数的正确余数值，可以先使用绝对值函数
      ```js
      -1 % 2 // -1
      1 % -2 // 1
      ```
#### 7.1.3 指数
   1. 指数运算符（**）完成指数运算，前一个运算子是底数，后一个运算子是指数
   2. 指数运算符是右结合，而不是左结合

### 7.2 比较运算符

#### 7.2.1 非相等运算符
   1. 字符串：按照字典顺序进行比较，比较字符的 Unicode 码点
      ```js
      'cat' > 'Cat' // true'
      ```
   2. 原始类型值  
		两个运算子都是原始类型的值，则是先转成数值再比较
      ```js
      5 > '4' // true
      // 等同于 5 > Number('4')
      // 即 5 > 4
      ```
		> 任何值（包括NaN本身）与NaN比较，返回的都是false
   3. 对象
      1. 如果运算子是对象，会转为原始类型的值，再进行比较
      2. 先调用valueOf方法；如果返回的还是对象，再接着调用toString方法
#### 7.2.2 相等运算符
   1. 相等运算符（==）比较两个值是否相等
   2. 原始类型的值会转换成数值再进行比较
      ```js
      'true' == true // false
      // 等同于 Number('true') === Number(true)
      // 等同于 NaN === 1
      ```
   3. 对象（这里指广义的对象，包括数组和函数）与原始类型的值比较时，对象转换成原始类型的值，再进行比较
   4. undefined 和 null 与其他类型的值比较时，结果都为false，它们互相比较时结果为true
   5. 相等运算符隐藏的类型转换，会带来一些违反直觉的结果
      ```js
      0 == '' // true
      0 == '0' // true
      ```
#### 7.2.3 严格相等运算符/全等运算符
   1. 严格相等运算符（===）比较它们是否为“同一个值”
   2. 同一类型的原始类型的值（数值、字符串、布尔值）比较时，值相同就返回true，值不同就返回false
   3. 两个复合类型（对象、数组、函数）的数据比较时，不是比较它们的值是否相等，而是比较它们是否指向同一个地址
      ```js
      {} === {} // false
      [] === [] // false
      (function () {} === function () {}) // false
      ```
      > 空对象、空数组、空函数的值，都存放在不同的内存地址，结果当然是false
   4. 对于两个对象的比较，严格相等运算符比较的是地址，而大于或小于运算符比较的是值
   5. undefined 和 null 与自身严格相等
      ```js
      undefined === undefined // true
      null === null // true

      var v1;
      var v2;
      v1 === v2 // true
      ```

### 7.3 布尔/逻辑运算符

#### 7.3.1 逻辑非 !
   1. 非布尔值，取反运算符会将其转为布尔值
      > 以下六个值取反后为true，其他值都为false：  
         `undefined、null、false、0、NaN、空字符串（''）`
   2. 对一个值连续做两次取反运算，等于将其转为对应的布尔值，与Boolean函数的作用相同
      ```js
      !!x
      // 等同于
      Boolean(x)
      ```
- &&

	- 用于多个表达式的求值
	- 运算规则是：如果第一个运算子的布尔值为true，则返回第二个运算子的值（注意是值，不是布尔值）；如果第一个运算子的布尔值为false，则直接返回第一个运算子的值，且不再对第二个运算子求值

		- if (i) {
  doSomething();
}

// 等价于

i && doSomething();

	- 跳过第二个运算子的机制，被称为“短路”
	- 多个连用时返回第一个布尔值为false的表达式的值。如果所有表达式的布尔值都为true，则返回最后一个表达式的值
	
		- 因为与表达式由第一个false决定

- ||

	- 用于多个表达式的求值
	- 运算规则是：如果第一个运算子的布尔值为true，则返回第一个运算子的值，且不再对第二个运算子求值；如果第一个运算子的布尔值为false，则返回第二个运算子的值
	- 跳过第二个运算子的机制，被称为“短路”
	- 多个连用时返回第一个布尔值为true的表达式的值。如果所有表达式都为false，则返回最后一个表达式的值

		- 或表达式有第一个true决定

- ?:

	- 三元条件运算符由问号（?）和冒号（:）组成，分隔三个表达式

### 7.4 二进制位运算符

- 二进制位运算符用于直接对二进制位进行计算
- 直接处理每一个比特位（bit），非常底层的运算，好处是速度极快
- 位运算符只对整数起作用，如果一个运算子不是整数，会自动转为整数后再执行
- 在 JavaScript 内部，数值都是以64位浮点数的形式储存，但是做位运算的时候，是以32位带符号的整数进行运算的，并且返回值也是一个32位带符号的整数

	- i = i | 0; //将i（不管是整数或小数）转为32位整数

- |

	- 或运算符（|）逐位比较两个运算子，两个二进制位之中只要有一个为1，就返回1，否则返回0

- &

	- 与运算符（&）逐位比较两个运算子，两个二进制位之中只要有一个位为0，就返回0，否则返回1

- ~

	- 否运算符（~）将每个二进制位都变为相反值（0变为1，1变为0）
	- 对一个整数连续两次二进制否运算，得到它自身;对一个小数连续进行两次二进制否运算，能达到取整效果（取整方法中最快的一种）
	- 对其他类型进行二进制否运算，JavaScript 引擎会先调用Number函数，将字符串转为数值

- ^

	- 异或运算（^）在两个二进制位不同时返回1，相同时返回0（相异则或）
	- 连续对两个数a和b进行三次异或运算，a^=b; b^=a; a^=b;，可以互换它们的值（最快方法）
	- 异或运算也可以用来取整

		- 12.9 ^ 0 // 12

- <<

	- 左移运算符（<<）表示将一个数的二进制值向左移动指定的位数，尾部补0，即乘以2的指定次方
	- 向左移动的时候，最高位的符号位是一起移动的
	- 如果左移0位，就相当于将该数值转为32位整数，等同于取整，对于正数和负数都有效

- \>>

	- 右移运算符（>>）表示将一个数的二进制值向右移动指定的位数。如果是正数，头部全部补0；如果是负数，头部全部补1。右移运算符基本上相当于除以2的指定次方（最高位即符号位参与移动）。

- \>>>

	- 头部补零的右移运算符（>>>）与右移运算符（>>）只有一个差别，就是一个数的二进制形式向右移动时，头部一律补零，而不考虑符号位
	- 总是得到正值

- 开关作用

### 7.5 逗号运算符

- 逗号运算符用于对两个表达式求值，并返回后一个表达式的值
- 一个用途是，在返回一个值之前，进行一些辅助操作

	- var value = (console.log('Hi!'), true);
// Hi!

### 7.6 解构赋值运算

#### 7.6.1 解构赋值 
   1. ES6 允许按照一定模式，从等号右边的对象中提取值，提取被称为解构（Destructuring），再对变量进行赋值，形成解构赋值运算。如果解构失败，赋值时变量的值等于undefined。  

      本质上，解构赋值属于“模式匹配”，只要等号两边的“模式”相同，左边的变量就会被赋予对应的值，这种“模式”可以认为是对象的属性，在对象中就是属性，在数组中就是索引（js中，数组也是对象，数字索引会转为字符串属性），基础类型会转为对应的包装对象。不完全解构，即等号左边的模式，只匹配等号右边对象的一部分。

   2. 解构赋值允许指定默认值，ES6 内部使用严格相等运算符（===）来判断一个“模式”所对应的值是否为`undefined`，如果值为 undefined，则默认值生效。默认值可以引用解构赋值的其他变量，但该变量必须已经声明（TDZ）。
      > undefined 和 null 与其他类型的值比较时，结果都为false，自我比较时结果为true  
      ```js
      let arr = [1, 2, 3];
      delete arr[1];
      console.log(arr); // [ 1, <1 empty item>, 3 ]
      console.log(arr[1] === undefined); // true
      let [a = 10, b = 20, c = 30] = arr;
      console.log(a, b, c); // 1 20 3
      arr[2] = null;
      [a = 10, b = 20, c = 30] = arr;
      console.log(a, b, c); // 1 20 null
      arr[2] = undefined;
      [a = 10, b = 20, c = 30] = arr;
      console.log(a, b, c); // 1 20 30
      function f() {}
      arr[2] = f(); // 函数无返回值时，返回结果为undefined
      [a = 10, b = 20, c = 30] = arr;
      console.log(a, b, c); // 1 20 30

      console.log(undefined == undefined); // true
      console.log(undefined === undefined); // true
      ```
      > 如果默认值是一个表达式，那么这个表达式是惰性求值的，即只有在用到的时候，才会求值，所以能取到值时根本不会执行函数。（这句话有问题，需要查证）
      ```js
      function f1() {
         console.log(new Date());
         return 10;
      }
      function f2() {
         console.log(new Date());
         return 20;
      }
      let arr = [1, 2]
      let [a = f1(), b = f2()] = arr;
      console.log(a, b); // 1 2
      delete arr[1]; // 形成空位，值为undefined
      console.log(arr); // [ 1, <1 empty item> ]
      console.log(new Date()); // 2020-06-21T02:51:17.983Z
      [a = 1 + f1(), b = 2 + f2()] = arr; // 2020-06-21T02:51:17.983Z
      ```

#### 7.6.2 解构赋值运算内部机制
   解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量。真正被赋值的是后者，而不是前者。前者是键是模式，后者是值是变量名。数组的元素是按次序排列的，变量的取值由它的位置决定；对象的属性没有次序，变量必须与属性同名，才能取到正确的值。解构也可以用于嵌套结构的对象，能够取到继承的属性。
      > 数组也是对象，索引就是属性名，数字键会自动转为字符串
      ```js
      let { foo: baz,'bar':bar } = { foo: 'aaa', bar: 'bbb' };
      console.log(baz); // aaa
      console.log(bar); // bbb
      ```

#### 7.6.3 常见的解构赋值
   1. 对象的解构赋值的花括号不要写在行首，避免 JavaScript 将其解释为代码块，放在一个圆括号里面，就可以正确执行。 
   2. 数组本质是特殊的对象，因此可以对数组进行对象属性的解构。事实上，只要某种数据结构具有 Iterator 接口，都可以采用数组形式的解构赋值。如果等号右边是不可遍历的结构，就会报错。
      ```js
      let arr = [1, 2, 3];
      let {0 : first, [arr.length - 1] : last} = arr;
      first // 1
      last // 3
      ```
   3. 字符串也可以解构赋值，这是因为此时，字符串被转换成了一个类似数组的对象
   4. 数值、布尔值解构赋值时，则会先转为对象
   5. 函数参数：函数的参数也可以使用解构赋值，解构赋值时也可以有默认值，注意与函数参数默认值的区分。
      ```js
      function move({x, y} = { x: 0, y: 0 }) {
      return [x, y];
      }

      move({x: 3, y: 8}); // [3, 8]
      move({x: 3}); // [3, undefined]
      move({}); // [undefined, undefined]
      move(); // [0, 0]
      ```
      > 1）函数参数不为undefined，所以不使用函数参数默认值，x=3，y=8；  
      > 2）函数参数不为undefined，所以不使用函数参数默认值，x=3，y=undefined；  
      > 3）函数参数不为undefined，所以不使用函数参数默认值，x=undefined，y=undefined；  
      > 4）函数参数为undefined，所以使用函数参数默认值，x=0，y=0；

#### 7.6.4 解构赋值用途
   1. 交换变量的值
   2. 从函数返回多个值。函数只能返回一个值，如果要返回多个值，只能将它们放在数组或对象里返回。有了解构赋值，取出这些值就非常方便
   3. 函数参数的定义。解构赋值可以方便地将一组参数与变量名对应起来
   4. 提取 JSON 数据。解构赋值对提取 JSON 对象中的数据（尤其有用）。
      ```js
      let jsonData = {
         id: 42,
         status: "OK",
         data: [867, 5309]
      };
      let { id, status, data: number } = jsonData;
      console.log(id, status, number); // 42, "OK", [867, 5309]
      ```
   5. 设置函数参数的默认值，避免了在函数体内部再写`var foo = config.foo || 'default foo';`这样的语句。
   6. 遍历 Map 结构，部署了 Iterator 接口的对象，都可以用for...of循环遍历
      ```js
      const map = new Map();
      map.set('first', 'hello');
      map.set('second', 'world');

      for (let [key, value] of map) {
      console.log(key + " is " + value);
      }
      // first is hello
      // second is world
      ```
   7. 输入模块的指定方法，解构赋值使得输入语句非常清晰
      ```js
      const { SourceMapConsumer, SourceNode } = require("source-map");
      ```
   8. 可以很方便地将现有对象的方法，赋值到某个变量
      ```js
      // 例二
      const { log } = console;
      log('hello') // hello
      ```

---

## 8 错误处理机制

## 9 变量、作用域、内存
作用域、
内存

### js松散类型的本质，决定了js变量只是特定时间用于保存特定值的名字

### 复制、函数参数的传递（复制给命名参数，函数参数就是局部变量）

- 基本类型：创建新值，再赋值
- 引用类型：赋值堆内存地址

### 所有引用类型都是Object的实例

### 执行环境和作用域

- 执行环境中的代码执行完毕，环境就销毁，变量、函数也随之销毁，全局执行环境在应用程序退出时销毁
- 每个函数都有自己的执行环境
- 函数被当做变量对待，所以访问规则与环境中其他变量相同
- 没有使用声明标识符声明的变量会被添加到全局环境（严格模式下，初始化未声明的变量会报错）

### 垃圾收集（GC）

- 自动垃圾收集机制
- 找出不再继续使用的变量，释放其占用的变量
- 标记清除mark-and-sweep

	- 进入环境就标记为“进入环境”，离开环境标记为“离开环境”

- 引用计数reference counting

	- 跟踪值被引用的计数，被引用加一，引用变量赋新值减一，为0就清除
	- 循环引用问题
	- 解除引用（dereferencing）：手动切断变量与之前引用的连接，赋新值为null，本质是使变量脱离执行环境，使其在下一次垃圾回收时被回收


## 10 面向对象编程
   > JS中的对象基于引用类型创建

### 10.1 属性类型：数据属性、访问器属性
#### 10.1.1 数据属性  
   - Configurable 
   - Enumerable：能否通过for in遍历
   - Writeable
   - Value
   - 修改属性的特性，使用Object.defineProperty，参数为：属性所在的对象、属性名、描述符对象

#### 10.2.2 访问器属性
   - Configurable
   - Enumerable：能否通过for in遍历
   - Get：读取属性时调用的函数
   - Set：设置属性时调用的函数
   - 不包含数据值，包含一对getter和setter函数（getter：返回值，setter：设置新值）
   - 不能直接定义，必须使用Object.defineProperty

### 10.3 创建对象八式
#### 10.3.1 第一式：工厂模式
   > 工厂函数返回构造好的对象  
   ```js
   function createPerson1(name, age) {
      var obj = new Object();
      obj.name = name;
      obj.age = age;
      obj.sayHello=function(){
         console.log(`name: ${this.name}`);
      }
      return obj;
   }

   var p11 = createPerson1("allx", 12);
   ```

#### 10.3.2 第二式：构造函数模式
   ```js
   function Person2(name, age) {
      this.name = name;
      this.age = age;
      this.sayHello = function () {
         console.log(`name: ${this.name}`);
      }
   }

   let p21 = new Person2("allx", 12);
   ```
   - 步骤：  
      1）创建一个新对象  
      2）将构造函数的作用域（执行环境对象）赋值给新对象（this也就指向这个对象）  
      3）执行构造函数中的代码，为新对象添加属性  
      4）返回新对象  
   - 把构造函数当做普通函数使用？this会绑定到全局变量上，因为函数中的this在运行时确定，哪个执行环境对象调用该函数，this就指向谁
   - 函数也是对象，所以与属性无二，因此使用构造函数创建的实例对象的函数属性都是新创建的，不同实例上的同名函数时不相等的（不是指向同一内存地址）

#### 10.3.3 第三式：原型模式
   ```js
   function Person3() {} // 构造函数
   Person3.prototype.name = "allx";
   Person3.prototype.age = 12;
   Person3.prototype.sayHello = function () {
      console.log(`name: ${this.name}`);
   };

   let p31 = new Person3();
   ```
   - 每个构造函数都有prototype属性（指针，函数也是引用类型），指向函数对象的原型对象，也是调用构造函数创建的对象实例的原型对象，可以让所有对象实例共享它的属性和方法。**构造函数的prototype属性指向原型对象，原型对象的constructor属性指向该构造函数，使用该构造函数创建的对象实例的__proto__属性指向构造函数的原型对象（Object.getPrototypeOf(p)也可返回对象实例p对应的构造函数的原型对象）**。构造函数与其创建的对象实例并无直接关系。
      ```js
      function Person() {}
      Person.prototype.showType = () => 
         console.log("Person prototype's function showType");
      let p1 = new Person();
      let p2 = new Person();
      console.log(Person.prototype); // Person { showType: [Function] }
      console.log(Person.prototype.constructor); // [Function: Person]
      console.log(p1.prototype); // undefined
      console.log(p2.prototype); // undefined
      console.log(p2.__proto__); // Person { showType: [Function] }
      console.log(p2.__proto__); // Person { showType: [Function] }
      p1.showType(); // Person prototype's function showType
      ```
   - 虽然可以通过对象实例访问原型中的值，但不能修改该值，给对象实例设置与原型属性同名的属性，会在对象实例上新创建属性，屏蔽掉原型上的属性，除非使用delete操作删除实例对象的属性，才能继续访问原型上的属性，Object.prototype.hasOwnProperty方法判断一个属性是实例上的还是原型上的（实例上的属性则返回true）。原型是动态的，每次查找属性都是一次原型链上的搜索，任何原型的修改都会立即反应
   - 重写原型对象：将构造函数的原型对象指针指向一个新对象，此时需要重写原型对象的constructor属性。对象实例中的`__proto__`指针仅指向构造函数的原型对象，不指向构造函数，重写原型对象会切断现有原型对象与之前任何已存在的对象实例的联系。
      ```js
      function Person32() {}
      Person32.prototype = {
         name: "allx",
         age: 18,
         sayHello: function () {
            console.log(`name: ${this.name}`);
         }
      }
      Object.defineProperty(Person32.prototype, "constructor", {
         enumerable: false,
         value: Person32
      });

      let p32 = new Person32();
      ```

#### 10.3.4 第四式：混成模式（组合构造函数和原型模式）
   > 构造函数定义实例属性和方法，原型模式定义静态共享方法和属性
   ```js
   function Person4(name, age) {
      this.name = name;
      this.age = age;
   }
   Person4.prototype.sayHello = function () {
      console.log(`name: ${this.name}`);
   }

   let p41 = new Person4("allx", 21);
   ```

#### 10.3.5 第五式：动态原型模式
   > 封装实例属性/方法和静态方法/属性，第一次创建对象时初始化原型对象，这时不能重写原型对象，避免切断联系
      ```js
      function Person5(name, age) {
         this.name = name;
         this.age = age;
         if (typeof this.sayHello != "function") { 
            // 避免每次调用Person5构造对象都执行
            Person5.prototype.sayHello = function () {
               console.log(`name: ${this.name}`);
            }
         }
      }

      let p51 = new Person5("allx", 21);
      ```

#### 10.3.6 第六式：寄生构造函数模式
   > 封装创建对象的代码，再返回该对象，与工厂模式类似，只是是使用new。返回的对象与构造函数或者与构造函数的原型属性之间没有关系，构造函数返回的对象与在构造函数外创建的对象没有什么不同
      ```js
      function Person6(name, age) {
         var obj = new Object();
         obj.name = name;
         obj.age = age;
         obj.sayHello = function () {
            console.log(`name: ${this.name}`);
         }
         return obj;
      }

      let p61 = new Person6("allx", 23);
      ```

#### 10.3.7 第七式：稳妥构造函数模式
   - 稳妥对象：没有公共属性，方法也不需要引用this。与寄生构造函数类似，但不引用this，不使用new。返回的对象与构造函数或者与构造函数的原型属性之间没有关系
   ```js
   function Person7(name, age) {
      var obj = new Object();

      obj.sayName = function () {
         console.log(`name: ${name}`);
      }
      
      obj.sayAge = function () {
         console.log(`age: ${age}`);
      }
      return obj;
   }

   let p71 = new Person7("allx", 23);
   ```

#### 10.3.8 第八式：class类模式（ES6语法糖）
   1. 接近传统语言的写法，让对象原型的写法更加清晰、更像面向对象编程的语法，类必须使用new调用，否则会报错。class中的constructor方法就是构造方法，this指向实例对象，方法之间不需要逗号分割，使用时也是使用new命令（与构造函数相同）。
      ```js
      class Person8 {
         constructor(name, age) {
            this.name = name;
            this.age = age;
            this.hobbies = ["jump", "rap"];
         }

         sayHello() {
            console.log(`name: ${this.name}`);
         }
      }

      p41 = new Person8("allx", 12);
      ```
   2. 类的数据类型就是函数，类本身就指向构造函数。构造函数的prototype属性，在 ES6 的“类”上面继续存在，类的所有方法都定义在类的prototype属性上面，在类的实例上面调用方法，其实就是调用原型上的方法，由于类的方法都定义在prototype对象上面，所以类的新方法可以添加在prototype对象上面。类的内部所有定义的方法，都是不可枚举的（non-enumerable）。
   ```js
   class ClassTest {
      constructor(name) {
         this.name = name;
      }

      showName() {
         console.log(this.name);
      }
   }

   ClassTest.prototype['showClass']=function(){
      console.log('ClassTest');
   }

   let classTest = new ClassTest('tiger');
   console.log(ClassTest); // [Function: ClassTest]
   console.log(typeof ClassTest); // function
   console.log(ClassTest.prototype); // ClassTest { showClass: [Function] }
   console.log(Object.getPrototypeOf(classTest)); // ClassTest { showClass: [Function] }
   console.log(ClassTest.prototype.constructor === ClassTest); // true
   console.log('showName' in ClassTest.prototype); // true
   console.log('showClass' in ClassTest.prototype); // true
   ```
   3. constructor方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法，一个类必须有constructor方法，如果没有显式定义，一个空的constructor方法会被默认添加，默认返回实例对象（即this），但也完全可以指定返回另外一个对象。
   4. 类的实例。实例的属性除非显式定义在其本身（即定义在this对象上），否则都是定义在原型上（即定义在class上）。类的所有实例共享一个原型对象。
   5. 存值函数和取值函数是设置在属性的 Descriptor 对象上的
   6. class表达式：采用 Class 表达式，可以写出立即执行的 Class
   7. 注意：
      - 类和模块都是默认严格模式
      - 类中不存在变量提升
      - name属性返回紧跟在class后的类名
      - 方法名前加*表示生成函数
      - 类中this默认指向类的实例
         - 如果将这个方法提取出来单独使用，this会指向该方法运行时所在的环境（由于 class 内部是严格模式，所以 this 实际指向的是undefined）
         - 解决方法：  
            1）在构造方法中绑定this，这样就不会找不到print方法了，  
            2）使用箭头函数（箭头函数内部的this总是指向定义时所在的对象），  
            3）使用Proxy，获取方法的时候，自动绑定this  
   8. 静态方法
      - 如果在一个方法前，加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”
      - 如果静态方法包含this关键字，这个this指的是类，而不是实例
      - 父类的静态方法，可以被子类继承
      - 静态方法也可以从super对象上调用的
   9. 实例属性
      - 实例属性除了定义在constructor()方法里面的this上面，也可以定义在类的最顶层
      - 所有实例对象自身的属性都定义在类的头部，看上去简洁
   1. 静态属性  
      - Class 本身的属性，即Class.propName，而不是定义在实例对象（this）上的属性
         `Person8.staticProp=“ppppp”；`
      - 一个提案提供了类的静态属性，写法是在实例属性的前面，加上static关键字
   2. 私有方法、私有属性  
      - 只能在类的内部访问的方法和属性，外部不能访问，有利于代码的封装，但 ES6 不提供，只能通过变通方法模拟实现
      - 模拟	
         - 命名区别
         - 将私有方法移出模块，因为模块内部的所有方法都是对外可见的
         - 利用Symbol值的唯一性，将私有方法的名字命名为一个Symbol值
      - 一个提案，为class加了私有属性。方法是在属性名或方法之前，使用#表示  
   3. new.target  
      - ES6 为new命令引入了一个new.target属性，该属性一般用在构造函数之中，返回new命令作用于的那个构造函数
      - 如果构造函数不是通过new命令或Reflect.construct()调用的，new.target会返回undefined，因此这个属性可以用来确定构造函数是怎么调用的
      - Class 内部调用new.target，返回当前 Class
      - 子类继承父类时，new.target会返回子类
         - 可以写出不能独立使用、必须继承后才能使用的类

### 10.4 继承八招

#### 10.4.1 第一招：原型链继承
   1. js仅支持实现继承，不支持接口继承，实现继承依靠原型链实现。构造函数、原型、实例的关系：构造函数有一个原型对象，原型对象有一个指向构造函数的指针，实例有一个指向原型对象的指针。让一个原型对象PA等于另一个构造函数B的实例b：PA有一个__proto__指针指向PB，PB有一个constrcutor指针指向B，a可以访问b能访问的所有原型属性和方法，`A.prototype=new B();`，需要注意PA的重写，导致了PA没有指向A的constructor指针属性，所以给原型添加方法的语句一定要放在原型对象重写的语句之后，且不能使用字面量对象，字面量重新复制会切断联系。
      ```js
      function Super() {
         this.name = "name: super";
      }
      Super.prototype.getSuperName = function () {
         console.log(this.name);
      };

      function Sub() {
         this.name = "name: sub";
      }
      Sub.prototype = new Super();
      Sub.prototype.getSubName = function () {
         console.log(this.name);
      }

      let subInstance = new Sub();
      subInstance.getSubName();
      ```
   2. 确定实例和原型的关系:
      - isinstanceof：测试实例与原型链中出现过的构造函数
      - isPrototypeOf
   3. 存在的问题
      - 1）包含引用类型值的原型属性会被所有实例共享
      - 2）在创建子类型实例的时候，不能向超类型的构造函数传递参数（没有办法在不影响所有对象实例的情况下，给超类型的构造函数传递参数）
#### 10.4.2 借用构造函数继承
   - 在子类型的构造函数中调用超类型的构造函数（可以向超类型构造函数传递参数）
      ```js
      function Super2(name) {
         this.name = name;
      }

      function Sub2() {
         Super2.call(this, "super name");
         this.subname = "sub name";
      }
      Sub2.prototype.getSubName = function () {
         console.log(this.subname);
      }

      subInstance = new Sub2();
      subInstance.getSubName();
      ```
   - 超类型的方法只能在构造函数内定义，因为在超类原型对象上定义的函数在子类中并不可见

#### 10.4.3 组合继承（原型链+借用构造函数）
   ```js
   function Super3(supername) {
      this.supername = supername;
      this.hobbies = ["jump", "rap"];
   }
   Super3.prototype.getSuperName = function () {
      console.log(this.supername);
   }

   function Sub3() {
      Super3.call(this, "super name");
      this.subname = "sub name";
   }
   Sub3.prototype = new Super3();
   Sub3.prototype.getSubName = function () {
      console.log(this.subname);
   }

   subInstance = new Sub3();
   subInstance.getSubName();
   subInstance.hobbies.unshift("sing");
   console.log(subInstance.hobbies);
   console.log(subInstance.supername);

   let subInstance2 = new Sub3();
   console.log(subInstance2.hobbies);
   ```
- 原型式继承

	- Object.create()

		- function object(o) {
  function F() {}
  F.prototype = o;
  return new F();
}

	- 第一个参数作为新函数的原型对象
第二个参数作为新对象的额外属性

		- let POO = {
  name: "allx",
  hobbies: ["jump", "rap"]
}
let subInstance1 = Object.create(POO);
subInstance1.name = "tiger";
subInstance1.hobbies.unshift("sing");
console.log(subInstance1.name);
console.log(subInstance1.hobbies);

subInstance2 = Object.create(POO);
console.log(subInstance2.name);
console.log(subInstance2.hobbies);

	- 包含引用类型的属性始终都会共享相应的内存空间，就像使用原型模式

- 寄生式继承

	- 创建一个封装继承过程的函数，在其中增强新对象，再返回该对象

		- function SubFactory(origin) {
  let obj = Object.create(origin);
  obj.getName = function () {
    console.log("name:", this.name);
  }
  return obj;
}

POO = {
  name: "tigercheng",
  hobbies: ["jump", "rap"]
}

subInstance1 = SubFactory(POO);
subInstance1.name = "huangcheng";
console.log(subInstance1.name);
subInstance1.hobbies.unshift("sing");
console .log(subInstance1.hobbies);

- 寄生组合式继承

	- 组合继承会调用两次超类型构造函数（创建子类型原型、子类型构造函数调用）
	- 通过借用构造函数继承属性，通过原型链混成形式继承方法（最理想的方式）

		- function inheritPrototype(subtype, supertype) {
  let prototype = Object.create(supertype);
  prototype.constructor = subtype;
  subtype.prototype = prototype;
}

function SuperType() {
  this.supername = "super name";
  this.hobbies = ["jump", "rap"];
}

SuperType.prototype.getSuperName = function () {
  console.log("name:", this.supername);
}

function SubType() {
  SuperType.call(this);
  this.subname = "sub name";
}

inheritPrototype(SubType, SuperType);
SubType.prototype.getSubName = function () {
  console.log("name:", this.subname);
}

subInstance1 = new SubType();
console.log(subInstance1);

	- 1）创建超类型原型的副本
2）为副本添加constructor属性为子类型
3）将副本赋值给子类型的原型

- extends类继承

	- super方法

		- 子类必须在constructor方法中调用super方法，否则新建实例时会报错。子类自己的this对象，必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，然后再对其进行加工，加上子类自己的实例属性和方法。如果不调用super方法，子类就得不到this对象。
		- 在子类的构造函数中，只有调用super之后，才可以使用this关键字，否则会报错。因为子类实例的构建，基于父类实例，只有super方法才能调用父类实例

	- 实质

		- ES5 的继承实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面（Parent.apply(this)）
		- ES6 的继承实质是先将父类实例对象的属性和方法，加到this上面（所以必须先调用super方法），然后再用子类的构造函数修改this


## 11 BOM

### window

- 浏览器窗口的实例
- 在全局作用域中声明的所有变量和函数，都会变成window对象的成员
- 大小：window.innerWidth、window.innerHeight（页面视图容器）、window.outerWidth、window.outerHeight（浏览器窗口）
- 页面视口大小：document.documentElement.clientWidth(Height)、document.body.clientWidth(Height)
- open方法：第一个参数url、第二个参数是新窗口命名或[_self, _parent, _top, _blank]其中一个、第三个参数是新窗口的设置属性字符串，返回新窗口的window实例对象，新window有一个opener指针指向调用open方法的window
- open方法只能通过用户点击来调用，不然会被拦截（拦截弹出式窗口），settimeout也会被拦截

	- let btn = document.getElementById("btn");
    btn.addEventListener("click", () => {
      let baidu = window.open("https://www.baidu.com", "_blank");
    });
    btn = null;

- close方法：关闭窗口
- setTimeout、clearTimeout、setInterval、clearInterval

	- 使用setTimeout模拟setInterval是一种最佳模式
	- interval方式是设置两次开始时间间隔，模拟方式是上次结束和下次开始的间隔，更合理

- 系统对话框：alert、confirm、prompt

### location

- 提供与当前窗口中加载的文档相关信息，以及一些导航功能
- 既是window对象的属性，也是document对象的属性（引用的是同一个）
- 属性

	- hash：#及其后的内容
	- host：服务器名（或IP）和端口号
	- hostname：服务器名（或IP）
	- href：完整url，直接修改也行
	- pathname：路径名
	- port：端口
	- search：查询字符串（？及其后）

- url操作

	- location.assign(url);
window.lovation=url;
location.href=url;
	- 每次修改url（hash除外），页面都会以新url重新加载
	- 每次修改url之后都会在历史记录中生成一条新记录，可以前进或后退来操作历史记录
	- location.replace(url)方法改变url不会生成记录，且不能回到前一个页面
	- location.reload(bool)方法重载当前页面，若true则从服务器端重载，不传则可能从浏览器缓存中重载

### navigator

- 浏览器实例
- 属性

	- onLine：是否连接了互联网
	- appName：完整的浏览器名字
	- userAgent

### screen

- 显式器的信息

### history

- 记录上网历史记录，是window对象的属性，所以与相对应的window所关联
- go(n)：前进或后退n个页面

	- go(1) = forward()
	- go(-1) = back()

- length属性：记录历史记录的数量

## 12 DOM

### 文档对象模型：针对HTML、XML文档的API（应用程序编程接口）

### js中所有节点都继承自Node，nodeType属性表明节点类型

- 元素节点（element）：1，对应常量Node.ELEMENT_NODE
- 属性节点（attr）：2，对应常量Node.ATTRIBUTE_NODE
- 文本节点（text）：3，对应常量Node.TEXT_NODE
- 注释节点（Comment）：8，对应常量Node.COMMENT_NODE
- 文档节点（document）：9，对应常量Node.DOCUMENT_NODE
- 文档类型节点（DocumentType）：10，对应常量Node.DOCUMENT_TYPE_NODE
- 文档片断节点（DocumentFragment）：11，对应常量Node.DOCUMENT_FRAGMENT_NODE

### childNodes：一个NodeList类数组对象

- NodeList：基于DOM结构动态执行查询，DOM结构的变化会自动反映在NodeList对象中

### parentNode：父节点

### firstChild、lastChild

### previousSibling、nextSibling：前后节点

### 操作节点

- appendChild(node)：向childNodes列表尾端添加一个节点
- insertBefore(node, nextnode)：在某个节点之前插入，如果第二个参数为null，则是在尾端插入
- replaceChild(newNode, oldNode)：替换节点

	- 被替换节点的所有关系指针会被复制给新节点，被替换的节点仍是文档所有，但在文档中没有位置，考虑手动回收

- removeChild(node)：移除节点

	- 仍是文档所有，但在文档中没有位置，考虑手动回收

- cloneChild：复制节点，是否深浅
- normalize：删除空文本节点，合并相邻文本节点

### Document类型：
document

- 文档
- 属性

	- title：标题，能设置
	- URL：完整的URL
	- domain：包含页面的文档，能设置，但只能设置为更大的域
	- referrer：来源页面的URL

- 查找元素

	- getElementById：单个元素
	- getElementsByTagName：HTMLCollection，动态集合类似数组

### Element类型

- 所有HTML元素都是HTMLElement类型，HTMLElement类型继承自Element类型
- 属性

	- id：元素在文档中的唯一标识符
	- title：附加说明信息，工具提示条
	- className：元素指定的CSS类

- 取特性

	- getAttribute：id、title、class
	- 不区分大小写，
	- 自定义特性需要加上data-前缀，还只能通过getAttribute来取

- 设置特性

	- setAtribute
	- 不区分大小写，统一被设为小写

- 删除特性

	- removeAttribute

- attributes属性

	- NamedNodeMap，动态集合，类似数组

- 创建元素

	- document.createElement()：参数为要创建的元素的标签（不区分大小写），创建后的元素节点还在内存中，尚未添加到文档树中
	- 一旦将元素添加到文档树中，浏览器就会立即显式这个元素，对其的修改会实时反映

- 元素的子节点：不同浏览器会有差别（空白符）

### Text类型

- 文本中的HTML会被自动转义
- 创建：document.createTextNode，传入文本内容（HTML会自动转义）
- normalize：规范化文本节点

### Comment类型

- 注释节点

### DocumentFragment类型

- 文档片段，“轻量级”的文档，可以包含和控制节点，但不像文档那样占据额外的资源，不能直接添加进文档，做为仓库，保存将要添加进文档的节点
- 创建：document.createDocumentFragment()
- 如果将文档中的节点添加到文档片段中，那么文档树就移除该节点，浏览器就看不见该节点。添加到文档片段的节点不属于文档树。使用appendChild、insertBefore方法将文档片段中内容添加到文档树中时，将文档片段作为参数，其实是将文档片段的所有子节点移除再添加到文档树相应位置上。文档片段永远不会成为文档树的一部分。
- 使用文档片段一次性添加多个元素，可以避免浏览器反复渲染

### script动态脚本

### link动态样式

### 选择符API

- querySelector、querySelectorAll：css解析，性能更好，后者返回NodeList

### 元素遍历

- childElementCount、firstElementChild、lastelementChild、previousElementSibling、nextElementSibling

### 类的扩充

- getElementsByClassName：依据类名选择
- classList

	- DOMTokenList类型的实例
	- add：添加css

		- div.classList.add("newcss")

	- contains：是否包含
	- remove：移除
	- toggle：存在就删除，没有就添加

### 焦点管理

- document.activeElement：始终引用文档中当前焦点元素
- document.hasFocus：元素是否获得了焦点

### readyState

- document的属性
- loading：正在加载文档
- complete：文档已经加载完成

### 自定义数据属性

- 前缀data-
- 可以通过元素的dataset属性访问，访问时点运算符去掉前缀

### 插入标记

- innerHTML：返回或设置元素的所有子孙节点对应的HTML标记；返回的字符串是根据原字符串创建DOM树经序列化的结果
- outerHTML：在innerHTML的基础上还有调用元素的HTML标记，设置时会完全替换调用元素
- insertAdjentHTML

### 内存性能

- 元素与其绑定事件一直留在内存中会对性能有影响，在使用上面三种插入标记方法时需要先手动删除原元素的所有事件个对象属性
- innerHTML与原始的创建再设置关系方法相比，效率高得多，因为设置innerHTML时会创建一个HTML解析器（c++编写），但是频繁地创建和销毁HTML解析器也会带来性能问题，最好是先设置HTML标记字符串，再一次性设置innerHTML

### 滚动

- scrollIntoView

	- true：调用元素与视口顶部对齐；
false：底部对齐
为元素设置焦点也可以使得浏览器滚动显示元素

- scrollIntoViewIfNeeded

	- 不可见时调用可以选择是否居中显示元素

- scrollByLines

	- 按行向前或后滚动n行

- scrollByPages

	- 按页面高度向前或后滚动n页

### 元素样式

- HTML元素在js中都有一个对应的style属性，是CSSStyleDeclaration的实例，包含元素style特性指定的样式，不包含外部样式表或嵌入样式表层叠的属性，点运算短线转驼峰或方括号
- 获取层叠计算来的样式：getComputedStyle()，接收两个参数：要计算的元素、伪元素字符串（没有就是null）。计算属性只读

	- let style=document.getComputedStyle(div,null);
style.backgroundColor;

- 样式表

	- CSSStyleSheet类型表示样式表，
link元素和style元素中的样式，
只读

		- disable：可设置，是否禁用样式表
		- href：link样式表的url
		- parentStyleSheet：@import导入的指针
		- CSSRules：样式表中包含的样式规则集合

	- CSS规则CSSRule

- 度量

	- 偏移量offset

		- 包括元素在屏幕上占用的所有可见空间。高度、宽度、内边距（没有外边距）、边框、滚动条
		- offsetHeight：垂直方向占用空间（像素）
		- offsetWidth：水平方向占用空间（像素）
		- offsetTop：元素上外边框与包含元素的上内边框的像素距离
		- offsetLeft：元素左外边框与包含元素的左内边框的像素距离
		- offsetParent：包含元素，与parentNode相同
		- 想知道在页面上的偏移量可以层层递归
		- 偏移量属性只读，每次访问都会重新计算，保存到变量中可以优化性能

	- 客户区client

		- 元素内容及其内边距所占据的空间
		- clientHeight：客户区高度
		- clientWidth：客户区宽度

	- 滚动区scroll

		- 包含滚动内容的元素的大小
		- scrollHeight：没有滚动条时，元素内容总高度
		- scrollWidth：没有滚动条时，元素内容总宽度
		- scrollTop：隐藏在元素内容区域上方的像素数，上内边框之上，即不可见，可设置以滚动
		- scrollLeft：隐藏在元素内容区域左方的像素数，左内边框之左，即不可见，可设置以滚动
		- 在确定文档总高度时，取scrollHeight、clientHeight中大者才精确

	- 元素大小

		- getBoundingClientRect方法返回一个矩形对象，left、top、right、bottom，给出了元素在页面中相对于视口的位置

### 元素遍历

- NodeIterator
- TreeWalker

### 范围

- 选择DOM结构中特定部分进行操作

## 13 事件

### JS与HTML的交互是通过事件来完成的

### 观察者模式：使用侦听器预订事件，事件发生就执行相应代码

### 事件流：
描述从页面中接收事件的顺序

- 事件冒泡流

	- 由嵌套最深的元素先接收再层层向上传播，微观到宏观

- 事件捕获流

	- 在事件到达预定目标前捕获，不具体到具体，宏观到微观

### 事件流三阶段：
事件捕获阶段、
处于目标阶段、
事件冒泡阶段

### 事件处理程序

- HTML事件处理

	- on开头的元素特性
	- HTML与JS紧密耦合，不适合

- DOM0级事件处理

	- div.onclick=function(){};
	- this引用当前元素
	- 在事件冒泡阶段被处理
	- 设为null即可删除

- DOM2级事件处理

	- addEventListener：添加，可多次添加
	- removeEventListener：移除指定函数名的函数，无法移除匿名
	- 三个参数：事件名、事件处理函数、是捕获否冒泡

### 事件对象event

- 触发DOM事件时，产生事件对象，可以传入事件处理程序，包含所有与事件有关的信息，事件的元素、事件的类型、其他信息
- 属性/方法
只读

	- eventPhase：事件所处阶段，1捕获，2目标，3冒泡
	- cancelable：是否可以取消默认行为
	- preventDefault()：取消事件默认行为，cancelable为true时可用
	- stopImmediatePropagation()：取消事件的进一步捕获或冒泡，同时组织任何事件处理程序调用
	- stopPropagation()：取消进一步的捕获或冒泡
	- target：事件目标元素，具体微观的元素
	- currentTarget：当前正在处理事件的元素，this

- 只存在于事件处理期间，执行完毕就被销毁

### 事件类型

- UI事件

	- 用户与页面元素交互
	- load：页面完全加载后触发（图片、JS、CSS）
	- unload：文档被完全卸载后触发，常用于清除引用，避免内存泄漏
	- resize：浏览器窗口大小被调整时触发，重复触发
	- scroll：属于window对象，但是实际是表示相应元素，重复触发

- 焦点事件

	- 获得或失去焦点
	- blur：失去焦点触发，不冒泡
	- focus：获得焦点触发，不冒泡

- 鼠标、滚轮事件

	- 鼠标或滚轮操作
	- click：左键单击或回车触发
	- dblclick：双击鼠标左键
	- mousedown：按下任意鼠标按钮触发
	- mouseenter：鼠标首次移入元素范围时触发，不冒泡
	- mouseleave：鼠标移出元素范围，不冒泡
	- mousemove：鼠标在元素范围内移动，重复触发
	- mouseout：鼠标移出元素，移入另一个元素（父或子元素）
	- mouseover：鼠标从外部首次移入另一个元素边界时触发
	- mouseup：释放鼠标按钮时触发
	- mousewheel：鼠标滚轮事件，wheelData属性前滚是120的倍数，后滚是-120的倍数
	- 在一个元素上相机触发mousedown和mouseup才会触发click，任一取消都不会触发click，阻止两次click触发就不会触发dblclick
	- 客户区坐标位置：clientX、clientY，鼠标的水平和垂直坐标
	- 页面坐标位置：pageX、pageY，在页面中的什么位置，没有滚动时，与客户区坐标相等
	- 屏幕坐标位置：screenX、screenY，显示器屏幕的位置坐标
	- 修改键：bool值，shiftKey、ctrlKey、altKey、metaKey（windows下是windows键），检测以上值就可以知道是否同时按下了
	- 相关元素relatedTarget：mouseover、mouseout事件发生时，另一个与事件有关的元素
	- 鼠标按钮：0主鼠标按钮、1中间滚轮按钮、2右边鼠标按钮，mousedown、mouseup

- 键盘、文本事件

	- 键盘操作、在文档中输入文本
	- keydown：按下键盘按键触发，按住不放会重复触发
	- keypress：按下键盘按键触发，按住不放会重复触发
	- keyup：释放键盘按键时触发
	- textInput：keyPress的补充，在文本显式之前拦截文本，只在可编辑区域触发，事件的data属性就是用户输入的字符串，inputMethod属性表示文本输入到输入框中的方式
	- keyCode属性：键码，keydown、keyup时

- 合成事件
仅IE支持

	- 为IME（Input Method Editor，输入法编辑器）输入字符时触发
	- compositionstart：打开IME输入开始，data表示正在编辑的文本（被选中要替换的文本）
	- compositionupdate：插入新字符，data：正插入的字符
	- compositionend：关闭IME输入结束，此次插入的所有字符

- 变动事件

	- DOM结构发生变化时触发

- HTML事件

	- contextmenu事件：右键调出上下文菜单，可取消默认行为，冒泡
	- beforeunload事件：浏览器卸载页面前触发，返回bool
	- hashchange事件：url的hash改变时触发

- 设备事件

	- orientationchange事件：屏幕的横纵模式改变
	- deviceorientation事件：三维模式

- 触摸、手势事件
- 拖放事件

	- 拖放时，依次触发：dragstart、drag、dragend
	- dragstart：鼠标按下开始移动
	- drag：dragstart事件触发之后触发，类似mousemove，重复触发，mousemove也会触发
	- dragend：鼠标停止移动触发
	- 拖放到有效目标上时，依次触发：dragenter、dragover、dragleave或drop
	- 重写dragenter和dragover方法就可以将一个元素转为一个放置目标
	- dataTransform：拖放事件对象的属性，setData、getData

### 内存性能

- 添加到页面上的事件处理程序数量直接关系到页面的整体运行性能。1）函数都会对象，会占用内存；2）先指定所有事件处理程序会延迟页面的交互就绪时间
- 事件委托：利用事件冒泡，只指定一个事件处理程序，就可以管理某一类型的所有事件，如给ul添加点击事件，再通过检测target.id确定点击的是哪一个子li

	- 给document添加事件委托，如：click、mousedown、mouseup、keypress、keydown、keyup

- 在不需要的时候移除事件处理程序，因为事件与元素之间的连接越多，页面执行越慢
- 卸载页面时，没有清理干净事件处理程序，也会导致空事件处理程序，其滞留在内存中，影响性能，页面卸载前，移除所有事件处理程序

### 模拟事件

## 14 表单脚本

### HTMLFormElement类型

### 基础

- submit事件：提交表单，只要有type=submit的控件，回车就能提交，但作为默认行为能被阻止，避免重复提交：禁用按钮、取消submit事件
- reset事件：重置表单，type=reset，控件恢复默认值或空
- elements：表单字段，通过位置或name特性寻找相应的表单元素
- 表单元素属性：disabled、form、name、readOnly、tabIndex、type、value
- 最好是在submit事件中防止用户重复提交表单
- 方法：focus、blur
- 事件：focus、change、blur

	- 输入框元素只有失去焦点且value值改变才触发change

### 文本框

- 选择文本：select()；选择所有文本；方便在focus时选择所有文本再替换
- 选择事件：选择文本后触发
- 取得选择的文本：先创建范围，再提取文本
- 过滤输入

	- 屏蔽字符：检测输入的字符再阻止keypress事件默认行为（禁止复制粘贴的键位）
	- 操作剪贴板

		- beforecopy：发生复制操作前触发
		- copy：复制操作时触发
		- beforecut：剪切前触发
		- cut：剪切时触发
		- beforepaste：粘贴前触发
		- paste：粘贴时触发
		- clipboardData：剪贴板数据对象，最好是在剪切板事件触发时使用，getData（数据类型）、setData（数据类型、数据）、clearData方法

- 自动切换焦点
- HTML5约束验证

	- 必填字段、输入类型、数值范围、输入模式、检测有效性、禁用验证

### 选择框

- 选择选项
- 添加选项
- 移除选项
- 移动和重排选项

### 表单序列化

### 富文本编辑
WYSIWYG
（what you see is what you get）

- designMode：on使得HTML页面可编辑，off
- contenteditable：true打开，false关闭，inherit继承，任何元素
- 操作富文本：document.execCommand方法：命令、是否提供用户界面、值，
- 富文本选区
- 富文本的内容在提交至服务器之前最好复制到表单字段中

## 15 canvas绘图

### 基本

- 使用前先设置width和height，指定可绘图区域大小；绘图需要取得绘图上下文（2d）;toDataURL导出canvas的指定MIME图像

### 2D上下文

- 坐标：原点00位于canvas的左上角
- 填充和描边

	- fillStyle、strokeStyle

- 绘制矩形

	- fillRect、clearRect
	- lineWidth、lineCap、lineJoin

- 绘制路径

	- beginPath：开始绘制新路径
	- arc：绘制弧线，x、y、半径、开始弧度、结束弧度、是否逆时针
	- arcTo：从上一点开始绘制弧线，经过点x、y、终点x、y、半径
	- bezierCurveTo：从上一点开始绘制二次曲线，控制点1x、y、控制点2x、y、终点x、y
	- lineTo：从上一点开始绘制直线，终点x、y
	- moveTo：移动绘图点，不画线，终点x、y
	- quadraticCurveTo：绘制一条二次曲线，控制点x、y、终点x、y
	- rect：左上角x、y、宽、高
	- closePath：关闭路径的绘制
	- fill：填充绘制的路径
	- stroke：对路径描边
	- clip：剪切路径

- 绘制文本

	- fillText、strokeText
	- font、textAlign、textBaseline
	- measureText：文本的测量

- 变换

	- rotate：绕原点旋转图像
	- scale：缩放
	- translate：移动
	- transform：修改变换矩阵，与原来的相乘
	- setTransform：设置变换矩阵值
	- save：保存变换，栈结构
	- restore：回退变换，栈结构

- 绘制图像

	- drawImage：需要同源
	- 保存绘制的图像：toDataURL，canvas对象的方法

- 阴影
- 渐变

	- 作为Style
	- 线性渐变、放射渐变

- 模式

	- 作为Style

- 使用图像数据

	- getImageData：取得原始图像数据，需要同源
	- 图像过滤器

- 合成

	- globalAlpha、globalCompositionOperation

## 18 webgl

## 19 媒体元素

### video、audio

### 自定义媒体播放器

## 20 历史状态管理

### 通过状态管理API，可以做到加载新页面的情况下改变浏览器的URL，history对象

### pushState、replaceState：改变url，但不会像服务器发送请求

### state的URL需要有一个实际URL与其对应，避免点击刷新页面出现错误

## 21 JSON

### JavaScript Object Notation

### JSON对象

- stringify：JS对象序列化为JSON字符串
- parse：JSON字符串反序列化为JS对象

### 序列化选项

- js对象、过滤器（数组或函数）、缩进选项（空格数或缩进字符）

### toJSON方法

- 在js对象上实现此方法

### 序列化的顺序

- 1）有toJSON就调用该方法，否则，按默认顺序序列化
- 2）有过滤器，则调用过滤器
- 3）对第2）步结果序列化
- 4）有缩进选项就执行缩进

### 解析选项

- 还原函数

## 22 AJAX和Comet

### AJAX技术的核心是XMLHttpRequest（XHR），无须刷新即可从服务器取得数据

## 高级技巧

### 安全的类型检测

### 作用域安全的构造函数

### 惰性载入函数

- 函数执行的分支仅会发生一次
- 1）在函数被调用时再处理函数，在第一次调用的时候，将该函数覆盖成另外一个按合适方式执行的函数，这样再执行就不会在经过分支（函数名就是变量名，可以重新赋值）

	- const fn=()=>{
  if(...){
    fn=()=>{...}
  }else{
    fn=()=>{...}
  }
}

- 2）在声明函数时就指定适当的函数，在1）的基础上，实现为立即执行函数，将新函数返回，第一次调用不再损失性能，声明时损失

	- const fn=(()=>{
  if(...){
    return ()=>{...}
  }else{
    return ()=>{...}
  }
})()

### 函数绑定

### 函数柯里化

- 用于创建已经设置好了一个或多个参数的函数
- 使用一个闭包返回一个函数
- 常动态创建：调用一个函数传入要柯里化的函数和必要的参数

### 对象防篡改

- Object.preventExtensions：不可扩展
- Object.seal：密封
- Object.freeze：冻结

### 高级定时器

- js单线程，定时器只是计划代码在未来某个时间执行，浏览器负责排序，指派某段代码在某个时间点运行的优先级
- 处JS执行进程外，还有一个需要在进程下一次空闲时执行的代码队列
- 定时器是在给定时间间隔后将代码加入到队列中，如果队列为空，就执行，否则等待，所以给定时间后并不是一定立即执行

### 数组分块

- 使用定时器将一系列步骤分开操作

### 函数节流
throttle

- 某些代码不可以在没有间断的情况下连续重复执行（resize、mousemove之类中操作dom元素，占用太多内存和CPU时间，可能会让浏览器崩溃）
- 第一次调用函数，创建一个定时器，在指定时间间隔后将代码插入队列执行；第二次调用的时候，先清除定时器，再设置一个新的定时器
- 只要代码是周期性执行的都应该节流

### 自定义事件

- 观察者模式：主体发布事件，观察者订阅事件来观察主体，DOM中，元素是主体，事件处理程序是观察者
- 一个存储事件处理程序的数组对象

### 拖放事件

## 23 最佳实践

### 可维护性

- 代码约定：变量类型透明（初始化、匈牙利命名）
- 代码解耦：HTML与JS（如：显式元素而不是插入元素）、CSS与JS（如：修改className）、应用逻辑与事件处理（如：只传输事件的数据）
- 编程实践：尊重对象所有权、避免全局变量、使用常量、避免与null比较（typeof、isinstanceof）

### 性能

- 作用域：避免全局查找（document）
- 正确方法

	- 避免不必要的属性查找（对象的属性）
	- 优化循环：减值迭代、简化终止条件、简化循环体、使用后测试循环（do...while）
	- 展开循环：如果循环次数一定，直接展开循环，函数调用会更快；Duff装置，减少循环次数，一次循环中处理多次（大数据情况下更快）

- 优先原生、switch、位运算
- 最小化语句数

	- 合并变量声明
	- 插入迭代值（++、--）
	- 使用数组和对象字面量

- 优化DOM交互

	- 最小化现场更新：如果要更新的DOM已经显示在文档中，就是现场更新。使用文档片段构建好再插入文档
	- 使用innerHTML：利用后台的HTML解析器，构建好字符串，一次替换
	- 使用事件代理：在祖先节点上处理事件，如果可能，就在文档上添加事件处理
	- 避免使用HTMLCollection

## 24 未分类

### requestAnimationFrame

- 确定何时绘制下一帧是保证动画平滑的关键，但浏览器的计时器并非精确到毫秒级
- CSS动画又是在于浏览器知道何时开始动画，再计算出准确的循环间隔

### geolocation

### file

- filereader

### performance

### web worker

- 运行JS异步代码，避免阻塞用户界面
- 后台运行另一个拥有不同全局作用域的js代码文件，与当前代码不共享作用域，其全局作用域为worker
- postMessage

## 25 异步编程

### Generator函数

- ES6 提供的一种异步编程解决方案

	- 语法上，首先可以把它理解成，Generator 函数是一个状态机，封装了多个内部状态
	- 执行 Generator 函数会返回一个遍历器对象，所以，Generator 函数除了状态机，还是一个遍历器对象生成函数，返回的遍历器对象，可以依次遍历 Generator 函数内部的每一个状态
	- 两个特征：
一是，function关键字与函数名之间有一个星号；
二是，函数体内部使用yield表达式，定义不同的内部状态

- 调用 Generator 函数后，该函数并不执行，返回的也不是函数运行结果，而是一个指向内部状态的指针对象（遍历器对象）

	- Generator 函数是分段执行的，yield表达式是暂停执行的标记，而next方法可以恢复执行
	- 每次调用遍历器对象的next方法，就会返回一个有着value和done两个属性的对象。
value属性表示当前的内部状态的值，是yield表达式后面那个表达式的值；
done属性是一个布尔值，表示是否遍历结束

- Generator 函数从上次yield表达式停下的地方，一直执行到下一个yield表达式
- yield表达式

	- yield表达式就是暂停标志
	- next方法的运行逻辑

		- 1）遇到yield表达式，就暂停执行后面的操作，并将紧跟在yield后面的那个表达式的值，作为返回的对象的value属性值
		- 2）下一次调用next方法时，再继续往下执行，直到遇到下一个yield表达式
		- 3）如果没有再遇到新的yield表达式，就一直运行到函数结束，直到return语句为止，并将return语句后面的表达式的值，作为返回的对象的value属性值
		- 4）如果该函数没有return语句，则返回的对象的value属性值为undefined
		- 注意，yield表达式后面的表达式，只有当调用next方法、内部指针指向该语句时才会执行，因此等于为 JavaScript 提供了手动的“惰性求值”（Lazy Evaluation）的语法功能

	- 与return对比

		- 都能返回紧跟在语句后面的那个表达式的值
		- 每次遇到yield，函数暂停执行，下一次再从该位置继续向后执行，而return语句不具备位置记忆的功能
		- 一个函数里面，只能执行一次（或者说一个）return语句，但是可以执行多次（或者说多个）yield表达式
		- 正常函数只能返回一个值，因为只能执行一次return；Generator 函数可以返回一系列的值，因为可以有任意多个yield

	- 不用yield表达式，这时就变成了一个单纯的暂缓执行函数
	- 注意，yield表达式只能用在 Generator 函数里面，用在其他地方都会报错
	- yield表达式如果用在另一个表达式之中，必须放在圆括号里面

- 与Iterator接口关系

	- Generator 函数就是遍历器生成函数，因此可以把 Generator 赋值给对象的Symbol.iterator属性，从而使得该对象具有 Iterator 接口
	- Generator 函数执行后，返回一个遍历器对象。该对象本身也具有Symbol.iterator属性，执行后返回自身

- next方法参数

	- yield表达式本身没有返回值，或者说总是返回undefined。next方法可以带一个参数，该参数就会被当作上一个yield表达式的返回值
	- 意义：Generator 函数从暂停状态到恢复运行，它的上下文状态（context）是不变的。通过next方法的参数，就有办法在 Generator 函数开始运行之后，继续向函数体内部注入值。也就是说，可以在 Generator 函数运行的不同阶段，从外部向内部注入不同的值，从而调整函数行为

- for...of循环

	- 可以自动遍历 Generator 函数运行时生成的Iterator对象，且此时不再需要调用next方法
	- 一旦next方法的返回对象的done属性为true，for...of循环就会中止，且不包含该返回对象

- 实例方法

	- throw()

		- Generator 函数返回的遍历器对象，都有一个throw方法，可以在函数体外抛出错误，然后在 Generator 函数体内捕获
		- throw方法可以接受一个参数，该参数会被catch语句接收，建议抛出Error对象的实例
		- 注意，不要混淆遍历器对象的throw方法和全局的throw命令，两者无关，互不影响
		- throw方法抛出的错误要被内部捕获，前提是必须至少执行过一次next方法
		- throw方法被捕获以后，会附带执行下一条yield表达式。也就是说，会附带执行一次next方法
		- 多个yield表达式，可以只用一个try...catch代码块来捕获错误
		- Generator 函数体外抛出的错误，可以在函数体内捕获；反过来，Generator 函数体内抛出的错误，也可以被函数体外的catch捕获
		- 一旦 Generator 执行过程中抛出错误，且没有被内部捕获，就不会再执行下去了。如果此后还调用next方法，将返回一个value属性等于undefined、done属性等于true的对象，即 JavaScript 引擎认为这个 Generator 已经运行结束了

	- return()

		- 可以返回给定的值，并且终结遍历 Generator 函数
		- 如果return方法调用时，不提供参数，则返回值的value属性为undefined
		- 如果 Generator 函数内部有try...finally代码块，且正在执行try代码块，那么return方法会导致立刻进入finally代码块，执行完以后，整个函数才会结束

	- next、throw、return的共同点

		- next()是将yield表达式替换成一个值
		- throw()是将yield表达式替换成一个throw语句
		- return()是将yield表达式替换成一个return语句

- yield*表达式

	- 用来在一个 Generator 函数里面执行另一个 Generator 函数
	- 如果yield表达式后面跟的是一个遍历器对象，需要在yield表达式后面加上星号，表明它返回的是一个遍历器对象
	- yield*后面的 Generator 函数（没有return语句时），等同于在 Generator 函数内部，部署一个for...of循环
	- yield*命令可以很方便地取出嵌套数组的所有成员

- 用作对象属性
- this

	- Generator 函数总是返回一个遍历器，ES6 规定这个遍历器是 Generator 函数的实例，也继承了 Generator 函数的prototype对象上的方法

- 状态机
- 协程

	- 协程（coroutine）是一种程序运行的方式，可以理解成“协作的线程”或“协作的函数”。协程既可以用单线程实现，也可以用多线程实现。前者是一种特殊的子例程，后者是一种特殊的线程
	- Generator 函数是 ES6 对协程的实现，但属于不完全实现

- 上下文

### async函数

- Generator 函数的语法糖，async函数将 Generator 函数的星号（*）替换成async，将yield替换成await
- 改进

	- 内置执行器
	- 更好的语义
	- 更广的适用性
	- 返回值是 Promise

- 基本用法
- 语法

## 26 控制台
console

### console对象是 JavaScript 的原生对象

### 用途

- 调试程序，显示网页代码运行时的错误信息。
- 提供了一个命令行接口，用来与网页代码互动

### 静态方法

- log接受一个或多个参数，将它们连接起来输出

	- console.log('Hello World')
// Hello World
console.log('a', 'b', 'c')
// a b c

- info是console.log方法的别名，用法完全一样。只不过console.info方法会在输出信息的前面，加上一个蓝色图标
- debug与log类似，在控制台输出调试信息。默认情况下，debug输出的信息不会显示，只有在打开显示级别在verbose的情况下，才会显示
- console对象的所有方法，都可以被覆盖

	- ['log', 'info', 'warn', 'error'].forEach(function(method) {
  console[method] = console[method].bind(
    console,
    new Date().toISOString()
  );
});

console.log("出错了！");
// 2014-05-18T09:00.000Z 出错了！

- warn和error也是在控制台输出信息
warn输出信息时，在最前面加一个黄色三角，表示警告
error输出信息时，在最前面加一个红色的叉，表示出错
同时，还会高亮显示输出文字和错误发生的堆栈
- table方法可以将复合类型转为表格显示
- count方法用于计数，输出它被调用了多少次
- dir方法用来对一个对象进行检查（inspect），并以易于阅读和打印的格式显示

	- 对于输出 DOM 对象非常有用，因为会显示 DOM 对象的所有属性
	- Node 环境之中，还可以指定以代码高亮的形式输出

- dirxml方法主要用于以目录树的形式，显示 DOM 节点
- assert方法主要用于程序运行过程中，进行条件判断，如果不满足条件，就显示一个错误，但不会中断程序执行

	- 接受两个参数，第一个参数是表达式，第二个参数是字符串。只有当第一个参数为false，才会提示有错误，在控制台输出第二个参数，否则不会有任何结果

- time、timeEnd方法用于计时，可以算出一个操作所花费的准确时间

	- time方法表示计时开始，timeEnd方法表示计时结束。它们的参数是计时器的名称。

- trace方法显示当前执行的代码在堆栈中的调用路径
- clear方法用于清除当前控制台的所有输出，将光标回置到第一行

### debugger语句主要用于除错，作用是设置断点

- Chrome 浏览器中，当代码运行到debugger语句时，就会暂停运行，自动打开脚本源码界面

---
## 27 标准库
### 27.1 Object对象  
   1. Object对象的原生方法分成两类：Object本身的方法与Object的实例方法
      > 访问属性或方法：点运算符、方括号运算符（其中传入字符串，即可以使用变量）
   2. Object本身是一个函数，可以当作工具方法使用，将任意值转为对象。这个方法常用于保证某个值一定是对象。  
      1. 如果参数为空（或者为undefined和null），Object()返回一个空对象
         ```js
         var obj = Object();
         // 等同于
         var obj = Object(undefined);
         var obj = Object(null);

         obj instanceof Object // true
         ```
      2. 如果参数是原始类型的值，Object方法将其转为对应的包装对象的实例
      3. 如果Object方法的参数是一个对象，它总是返回该对象，即不用转换
   3. Object不仅可以当作工具函数使用，还可以当作构造函数使用，即前面可以使用new命令  
      1. 首要用途，是直接通过它来生成新对象
      2. 注意，通过`var obj = new Object()`的写法生成新对象，与字面量的写法`var obj = {}`是等价的。或者说，后者只是前者的一种简便写法
      3. 可以接受一个参数，如果该参数是一个对象，则直接返回这个对象；如果是一个原始类型的值，则返回该值对应的包装对象
         ```js
         var o1 = {a: 1};
         var o2 = new Object(o1);
         console.log(o1 === o2); // true
         ```
   4. 静态方法  
      1. 所谓“静态方法”，是指部署在Object对象自身的方法
      2. keys方法  
         参数是一个对象，返回一个数组。该数组的成员都是该对象自身的（而不是继承的）所有属性名，只返回可枚举的属性
      3. getOwnPropertyNames方法  
         与Object.keys类似，也是接受一个对象作为参数，返回一个数组，包含了该对象自身的所有属性名，还返回不可枚举的属性名
      4. getOwnPropertyDescriptor()：获取某个属性的描述对象
      5. defineProperty()：通过描述对象，定义某个属性 
      6. defineProperties()：通过描述对象，定义多个属性
      7. Object.preventExtensions()：防止对象扩展。
      8. Object.isExtensible()：判断对象是否可扩展。
      9. Object.seal()：禁止对象配置。
      1. Object.isSealed()：判断一个对象是否可配置。
      2. Object.freeze()：冻结一个对象。
      3. Object.isFrozen()：判断一个对象是否被冻结。
      4. Object.create()：该方法可以指定原型对象和属性，返回一个新的对象
      5. Object.getPrototypeOf()：获取对象的Prototype对象
   5. 实例方法  
      1. 定义在Object.prototype对象上的方法，称为实例方法，所有Object的实例对象都继承了这些方法
      2. Object.prototype.valueOf()：返回当前对象对应的值。
         - 默认情况下返回对象本身
         - 自动类型转换时会默认调用这个方法
      3. Object.prototype.toString()：返回当前对象对应的字符串形式。
         - 返回一个对象的字符串形式，默认情况下返回类型字符串
         - 由于实例对象可能会自定义toString方法，覆盖掉Object.prototype.toString方法，所以为了得到类型字符串，最好直接使用Object.prototype.toString方法。通过函数的call方法，可以在任意值上调用这个方法，帮助我们判断这个值的类型
            > 数值：返回[object Number]  
            > 字符串：返回[object String]  
            > 布尔值：返回[object Boolean]  
            > undefined：返回[object Undefined]  
            > null：返回[object Null]  
            > 数组：返回[object Array]  
            > arguments 对象：返回[object Arguments]  
            > 函数：返回[object Function]  
            > Error 对象：返回[object Error]  
            > Date 对象：返回[object Date]  
            > RegExp 对象：返回[object RegExp]  
            > 其他对象：返回[object Object]  
      4. Object.prototype.toLocaleString()：返回当前对象对应的本地字符串形式
      5. Object.prototype.hasOwnProperty()：判断某个属性是否为当前对象自身的属性，还是继承自原型
         ```js
         let obj = { name: 'tiger' };
         console.log('toString' in obj); // true
         console.log(obj.hasOwnProperty('toString')); // false
         console.log(obj.hasOwnProperty('name')); // true
         ```
      6. Object.prototype.isPrototypeOf()：判断当前对象是否为另一个对象的原型
      7. Object.prototype.propertyIsEnumerable()：判断某个属性是否可枚举
### 27.2 属性描述符
   1. JavaScript 提供了一个内部数据结构，用来描述对象的属性，控制它的行为。这个内部数据结构称为“属性描述对象”（attributes object）。每个属性都有自己对应的属性描述对象，保存该属性的一些元信息
   2. 元属性
      1. value：该属性的属性值
      2. writable
         - 一个布尔值，表示属性值（value）是否可改变（即是否可写），默认为true
         - 注意，正常模式下，对writable为false的属性赋值不会报错，只会默默失败。但是，严格模式下会报错，即使对a属性重新赋予一个同样的值
         - 如果原型对象的某个属性的writable为false，那么子对象将无法自定义这个属性，但是，通过覆盖属性描述对象，绕过这个限制，原型链会被完全忽视
      3. enumerable
         - 一个布尔值，表示该属性是否可遍历，默认为true
         - 如果一个属性的enumerable为false，下面三个操作不会取到该属性。
            > for..in循环、Object.keys方法、JSON.stringify方法
         - 如果需要获取对象自身的所有属性，不管是否可遍历，可以使用Object.getOwnPropertyNames方法
      4. configurable
         - 是一个布尔值，表示可配置性，默认为true
         - configurable为false时，value、writable、enumerable和configurable都不能被修改了
         - 注意，writable只有在false改为true会报错，true改为false是允许的
         - 至于value，只要writable和configurable有一个为true，就允许改动
         - 可配置性决定了目标属性是否可以被删除（delete）
      5. get
         - 一个方法函数，表示该属性的取值函数（getter），默认为undefined
         - 取值函数get不能接受参数
      6. set
         - 一个方法函数，表示该属性的存值函数（setter），默认为undefined
         - 存值函数set只能接受一个参数（即属性的值）
   3. Object.getOwnPropertyDescriptor()方法
      1. 可以获取属性描述对象
      2. 只能用于对象自身的属性，不能用于继承的属性
      3. 第一个参数是目标对象，
      4. 第二个参数是一个字符串，对应目标对象的某个属性名
   4. Object.getOwnPropertyNames方法
      1. 返回一个数组，成员是参数对象自身的全部属性的属性名，不管该属性是否可遍历
      2. 跟Object.keys的行为不同，Object.keys只返回对象自身的可遍历属性的全部属性名
      3. 也返回继承属性
   5. Object.defineProperty()方法
      1. 允许通过属性描述对象，定义或修改一个属性，然后返回修改后的对象，接受三个参数
      2. object：属性所在的对象
      3. propertyName：字符串，表示属性名
      4. attributesObject：属性描述对象
      ```js
      var obj = Object.defineProperty({}, 'p', {
         value: 123,
         writable: false,
         enumerable: true,
         configurable: false
      });
      ```
   6. Object.defineProperties()方法：可以一次性定义或修改多个属性
      ```js
      var obj = Object.defineProperties({}, {
         p1: { value: 123, enumerable: true },
         p2: { value: 'abc', enumerable: true },
         p3: { get: function () { return this.p1 + this.p2 },
            enumerable:true,
            configurable:true
      }
      });
      ```
      > Object.defineProperty()和Object.defineProperties()参数里面的属性描述对象，writable、configurable、enumerable这三个属性的默认值都为false
   7. 一旦定义了取值函数get（或存值函数set），就不能将writable属性设为true，也不能同时定义value属性，否则会报错
   8. 实例对象的 `propertyIsEnumerable()` 方法返回一个布尔值，用来判断某个属性是否可遍历。注意，这个方法只能用于判断对象自身的属性，对于继承的属性一律返回false
   9. 拷贝对象  
      > 注意：如果遇到存取器定义的属性，会只拷贝值，可以通过Object.defineProperty方法来拷贝属性
      ```js
      var extend = function (to, from) {
         for (var property in from) {
            if (!from.hasOwnProperty(property)) continue;
            Object.defineProperty(
               to,
               property,
               Object.getOwnPropertyDescriptor(from, property)
            );
         }
         return to;
      }
      extend({}, { get a(){ return 1 } })
      // { get a(){ return 1 } })
      ```
   1. 控制状态  
      1. JavaScript 提供了三种对象冻结方法，最弱的一种是`Object.preventExtensions`，其次是`Object.seal`，最强的是`Object.freeze`
      2. Object.preventExtensions方法可以使得一个对象无法再添加新的属性
         > Object.isExtensible方法用于检查一个对象是否使用了Object.preventExtensions方法
      3. Object.seal方法使得一个对象既无法添加新属性，也无法删除旧属性  
         只是禁止新增或删除属性，并不影响修改某个属性的值  
         > Object.isSealed方法用于检查一个对象是否使用了Object.seal方法，这时，Object.isExtensible方法也返回false
      4. Object.freeze方法可以使得一个对象无法添加新属性、无法删除旧属性、也无法改变属性的值，使得这个对象实际上变成了常量
         > Object.isFrozen方法用于检查一个对象是否使用了Object.freeze方法  
         > 使用Object.freeze方法以后，Object.isSealed将会返回true，Object.isExtensible返回false
         ```js
         let obj = { name: 'tiger' };
         obj.age = 97;
         console.log(obj); // { name: 'tiger', age: 97 }

         Object.freeze(obj); 
         obj.school = ['ncepu', 'seu'];
         console.log(obj); // { name: 'tiger', age: 97 }

         console.log(Object.isFrozen(obj)); // true
         console.log(Object.isSealed(obj)); // true
         console.log(Object.isExtensible(obj)); // false
         ```
      5. 漏洞：可以通过改变原型对象，来为对象增加属性
      6. 局限：如果属性值是对象，上面这些方法只能冻结属性指向的对象，而不能冻结对象本身的内容。


### 27.4 包装对象

- 三种原始类型的值——数值、字符串、布尔值——在一定条件下，也会自动转为对象，也就是原始类型的“包装对象”（wrapper）

	- var v1 = new Number(123);
var v2 = new String('abc');
var v3 = new Boolean(true);

typeof v1 // "object"
typeof v2 // "object"
typeof v3 // "object"

v1 === 123 // false
v2 === 'abc' // false
v3 === true // false

- “包装对象”，指的是与数值、字符串、布尔值分别相对应的Number、String、Boolean三个原生对象
- 设计目的，首先是使得“对象”这种类型可以覆盖 JavaScript 所有的值，整门语言有一个通用的数据模型，其次是使得原始类型的值也有办法调用自己的方法
- Number、String和Boolean这三个原生对象，如果不作为构造函数调用（即调用时不加new），而是作为普通函数调用，常常用于将任意类型的值转为数值、字符串和布尔值

	- // 字符串转为数值
Number('123') // 123

// 数值转为字符串
String(123) // "123"

// 数值转为布尔值
Boolean(123) // true

- 实例方法

	- valueOf()方法

		- 返回包装对象实例对应的原始类型的值

			- new Number(123).valueOf()  // 123
new String('abc').valueOf() // "abc"
new Boolean(true).valueOf() // true

	- toString()方法

		- 返回对应的字符串形式

			- new Number(123).toString() // "123"
new String('abc').toString() // "abc"
new Boolean(true).toString() // "true"

- 原始类型与实例对象
的自动转换

	- 某些场合，原始类型的值会自动当作包装对象调用，即调用包装对象的属性和方法。这时，JavaScript 引擎会自动将原始类型的值转为包装对象实例，并在使用后立刻销毁实例
	- 自动转换生成的包装对象是只读的，无法修改
	- 调用结束后，包装对象实例会自动销毁

- 自定义方法

	- 在它的原型对象String.prototype上定义方法和属性，供原始类型的值直接调用

		- Number.prototype.double = function () {
  return this.valueOf() + this.valueOf();
};

(123).double() // 246

- Boolean对象

	- 作为构造函数，它主要用于生成布尔值的包装对象实例
	- 注意，false对应的包装对象实例，布尔运算结果也是true

		- new Boolean(false);// true
new Boolean(false).valueOf();// false

	- 作为类型转换函数

		- 可以单独使用，将任意值转为布尔值。这时Boolean就是一个单纯的工具方法
		- Boolean(undefined) // false
Boolean(null) // false
Boolean(0) // false
Boolean('') // false
Boolean(NaN) // false
		- Boolean(1) // true
Boolean('false') // true
Boolean([]) // true
Boolean({}) // true
Boolean(function () {}) // true
Boolean(/foo/) // true
		- 使用双重的否运算符（!）也可以将任意值转为对应的布尔值

	- 对于一些特殊值，Boolean对象前面加不加new，会得到完全相反的结果，必须小心

- Number对象

	- Number对象是数值对应的包装对象，可以作为构造函数使用，也可以作为工具函数使用

		- 作为构造函数时，它用于生成值为数值的对象
		- 作为工具函数时，它可以将任何类型的值转为数值

	- 静态属性

		- Number.POSITIVE_INFINITY

			- 正的无限，指向Infinity

		- Number.NEGATIVE_INFINITY

			- 负的无限，指向-Infinity

		- Number.NaN

			- 表示非数值，指向NaN

		- Number.MIN_VALUE

			- 表示最小的正数（即最接近0的正数，在64位浮点数体系中为5e-324），相应的，最接近0的负数为-Number.MIN_VALUE

		- Number.MAX_SAFE_INTEGER

			- 表示能够精确表示的最大整数，即9007199254740991

		- Number.MIN_SAFE_INTEGER

			- 表示能够精确表示的最小整数，即-9007199254740991

	- 实例方法

		- toString方法

			- 用来将一个数值转为字符串形式
			- 可以接受一个参数，表示输出的进制。如果省略这个参数，默认将数值先转为十进制，再输出字符串；否则，就根据参数指定的进制，将一个数字转化成某个进制的字符串

		- toFixed()方法

			- 先将一个数转为指定位数的小数，然后返回这个小数对应的字符串
			- 由于浮点数的原因，小数5的四舍五入是不确定的，使用的时候必须小心

		- toExponential方法

			- 用于将一个数转为科学计数法形式

		- toPrecision()方法

			- 用于将一个数转为指定位数的有效数字
			- 该方法用于四舍五入时不太可靠，跟浮点数不是精确储存有关

		- toLocaleString()方法

			- 接受一个地区码作为参数，返回一个字符串，表示当前数字在该地区的当地书写形式

				- (123).toLocaleString('zh-Hans-CN-u-nu-hanidec')
// "一二三"

			- 如果style属性的值为currency，则可以搭配currency属性，输出指定格式的货币字符串形式

				- (123).toLocaleString('zh-Hans-CN', { style: 'currency', currency: 'CNY' })
// "￥123.00"

			- 省略了参数，则由浏览器自行决定如何处理，通常会使用操作系统的地区设定

		- 自定义方法

			- Number.prototype对象上面可以自定义方法，被Number的实例继承

- String对象

	- 字符串对象是一个类似数组的对象（很像数组，但不是数组）
	- 除了用作构造函数，String对象还可以当作工具方法使用，将任意类型的值转为字符串
	- 静态方法

		- fromCharCode()方法

			- 参数是一个或多个数值，代表 Unicode 码点，返回值是这些码点组成的字符串
			- 不支持 Unicode 码点大于0xFFFF的字符
			- 根本原因在于，码点大于0xFFFF的字符占用四个字节，而 JavaScript 默认支持两个字节的字符

	- 实例属性

		- length属性返回字符串的长度

	- 实例方法

		- 字符

			- charAt方法

				- 返回指定位置的字符，参数是从0开始编号的位置
				- 完全可以用数组下标替代
				- 如果参数为负数，或大于等于字符串的长度，charAt返回空字符串

			- charCodeAt方法

				- 返回字符串指定位置的 Unicode 码点（十进制表示），相当于String.fromCharCode()的逆操作
				- 只返回两个字节的字符的码点
				- 如果遇到码点大于 65536 的字符（四个字节的字符），必需连续使用两次charCodeAt，不仅读入charCodeAt(i)，还要读入charCodeAt(i+1)，将两个值放在一起，才能得到准确的字符

		- 连接
分割

			- concat方法

				- 用于连接两个字符串，返回一个新字符串，不改变原字符串
				- 如果参数不是字符串，concat方法会将其先转为字符串，然后再连接

			- split方法

				- 按照给定规则分割字符串，返回一个由分割出来的子字符串组成的数组
				- 如果分割规则为空字符串，则返回数组的成员是原字符串的每一个字符
				- 如果满足分割规则的两个部分紧邻着（即两个分割符中间没有其他字符），则返回数组之中会有一个空字符串
				- 如果满足分割规则的部分处于字符串的开头或结尾（即它的前面或后面没有其他字符），则返回数组的第一个或最后一个成员是一个空字符串
				- 还可以接受第二个参数，限定返回数组的最大成员数

		- 提取

			- slice方法

				- 用于从原字符串取出子字符串并返回，不改变原字符串。
				- 第一个参数是子字符串的开始位置
第二个参数是子字符串的结束位置（不含该位置）
左闭右开
				- 如果省略第二个参数，则表示子字符串一直到原字符串结束
				- 如果参数是负值，表示从结尾开始倒数计算的位置，即该负值加上字符串长度
				- 如果第一个参数大于第二个参数，slice方法返回一个空字符串

			- substring方法

				- 用于从原字符串取出子字符串并返回，不改变原字符串，跟slice方法很相像
				- 第一个参数是子字符串的开始位置
第二个参数是子字符串的结束位置（不含该位置）
左闭右开
				- 如果省略第二个参数，则表示子字符串一直到原字符串的结束
				- 如果第一个参数大于第二个参数，substring方法会自动更换两个参数的位置
				- 如果参数是负数，substring方法会自动将负数转为0
				- 不建议使用substring方法，应该优先使用slice

			- substr方法

				- 用于从原字符串取出子字符串并返回，不改变原字符串，跟slice和substring方法的作用相同
				- 第一个参数是子字符串的开始位置（从0开始计算）
第二个参数是子字符串的长度
				- 如果省略第二个参数，则表示子字符串一直到原字符串的结束
				- 如果第一个参数是负数，表示倒数计算的字符位置。如果第二个参数是负数，将被自动转为0，因此会返回空字符串

		- 索引

			- indexOf方法

				- 用于确定一个字符串在另一个字符串中第一次出现的位置，返回结果是匹配开始的位置。如果返回-1，就表示不匹配
				- 还可以接受第二个参数，表示从该位置开始向后匹配

			- lastIndexOf方法

				- 用法跟indexOf方法一致，主要的区别是lastIndexOf从尾部开始匹配，indexOf则是从头部开始匹配
				- 第二个参数表示从该位置起向前匹配

		- 转换

			- trim方法

				- 用于去除字符串两端的空格，返回一个新字符串，不改变原字符串
				- 去除的不仅是空格，还包括制表符（\t、\v）、换行符（\n）和回车符（\r）

			- toLowerCase方法

				- 用于将一个字符串全部转为小写
				- 返回一个新字符串，不改变原字符串

			- toUpperCase方法

				- 全部转为大写
				- 返回一个新字符串，不改变原字符串

		- 正则

			- match方法

				- 用于确定原字符串是否匹配某个子字符串，返回一个数组，成员为匹配的第一个字符串。如果没有找到匹配，则返回null
				- 返回的数组还有index属性和input属性，分别表示匹配字符串开始的位置和原始字符串

			- search方法

				- 用法基本等同于match，但是返回值为匹配的第一个位置。如果没有找到匹配，则返回-1

			- replace方法

				- 用于替换匹配的子字符串，一般情况下只替换第一个匹配（除非使用带有g修饰符的正则表达式）

		- 比较

			- localeCompare方法

				- 用于比较两个字符串，返回一个整数，
如果小于0，表示第一个字符串小于第二个字符串；
如果等于0，表示两者相等；
如果大于0，表示第一个字符串大于第二个字符串

### 27.5 Math对象
   1. 常用静态函数  
      max、min、ceil、floor、toFixed、round
   2. 随机数函数
      Math.random()：[0, 1)
      ```js
      const randomArrVal = (arr, start = 0, end) => {
      let {
         floor,
         random
      } = Math;
      end = end ? end : arr.length;
      return arr[start + floor(random() * (end - start))];
      }; //[start, end) 
      // start + [0, 1) * (end - start) ==> [start, end)

      let chars = ['a', 'b', 'c', 'd', 'e', 'f'];
      console.log(randomArrVal(chars, 4, 6));

      console.log(Math.ceil(0)); // 0，所以使用Math.floor()函数
      ```
### 27.6 Date对象
   1. Date() 函数既是一个构造函数，也是一个工具函数
      1. 作为构造函数时，返回一个Date对象
      2. 作为工具函数时，返回一个当前时间的string字符串
      ```js
      let nowObj = new Date(); // 构造函数
      console.log(typeof nowObj); // object
      console.log(nowObj); // 2020-06-18T09:27:43.710Z
      console.log(nowObj * 1); // 1592472511364

      let nowStr = Date(); // 工具函数
      console.log(typeof nowStr); // string
      console.log(nowStr); // Thu Jun 18 2020 17:27:43 GMT+0800 (GMT+08:00)
      console.log(nowStr * 1); // NaN
      ```
   2. 静态方法
      1. now函数：返回一个当前时间对应的毫秒时间戳
         > 计算脚本执行时间，或使用`console.time('label')`和`console.timeEnd('label')`
   3. 实例方法
      getFullYear()、getMonth()、getDate()、getHours()、getMinutes()、getSeconds()
   4. ISO时间对象与timestamp时间戳的相互转换
      ```js
      let birthObj = new Date('1997-01-12 03:45:12');
      console.log(birthObj.getTime()); // 853011912000
      console.log(birthObj * 1); // 853011912000
      console.log(birthObj.valueOf()); // 853011912000
      console.log(Number(birthObj)); // 853011912000

      let birthMs = 853011912000;
      // 格林威治时间
      console.log(new Date(birthMs)); // 1997-01-11T19:45:12.000Z
      ```  
   5. 时间格式化
      ```js
      let date = new Date("1997-01-12 03:45:12");
      const formatDate = (date, format = 'YYYY-MM-DD HH:mm:ss') => {
         const config = {
            YYYY: date.getFullYear(),
            MM: date.getMonth(),
            DD: date.getDate(),
            HH: date.getHours(),
            mm: date.getMinutes(),
            ss: date.getSeconds()
         };
         for (let key in config) format = format.replace(key, config[key]);
         return format;
      }
      console.log(formatDate(date)); // 1997-0-12 3:45:12
      console.log(formatDate(date, 'YYYY年MM月DD日 HH时mm分ss秒')) // 1997年0月12日 3时45分12秒
      ```   
### 27.7 RegExp对象

### 27.8 JSON对象

### 27.9 Proxy对象

- 用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”（meta programming），即对编程语言进行编程
- Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写
- ES6 原生提供 Proxy 构造函数，用来生成 Proxy 实例

	- var proxy = new Proxy(target, handler);
target参数表示所要拦截的目标对象
handler参数也是一个对象，用来定制拦截行为

- 注意，要使得Proxy起作用，必须针对Proxy实例进行操作，而不是针对目标对象进行操作

	- var proxy = new Proxy({}, {
  get: function(target, propKey) {
    return 35;
  }
});

proxy.time // 35
proxy.name // 35
proxy.title // 35

- 如果handler没有设置任何拦截，那就等同于直接通向原对象
- 一个技巧是将 Proxy 对象，设置到object.proxy属性，从而可以在object对象上调用

	- var object = { proxy: new Proxy(target, handler) };

- Proxy 实例也可以作为其他对象的原型对象
- 拦截操作

	- get(target, propKey, receiver)

		- 拦截对象属性的读取，比如proxy.foo和proxy['foo']
		- 接受三个参数，依次为目标对象、属性名和 proxy 实例本身（严格地说，是操作行为所针对的对象），其中最后一个参数可选
		- get方法可以继承
		- 利用 Proxy，可以将读取属性的操作（get），转变为执行某个函数，从而实现属性的链式操作

	- set(target, propKey, value, receiver)

		- 拦截对象属性的设置，比如proxy.foo = v或proxy['foo'] = v，返回一个布尔值

	- has(target, propKey)

		- 拦截propKey in proxy的操作，返回一个布尔值

	- deleteProperty(target, propKey)

		- 拦截delete proxy[propKey]的操作，返回一个布尔值

	- ownKeys(target)

		- 拦截Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)、for...in循环，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而Object.keys()的返回结果仅包括目标对象自身的可遍历属性

	- getOwnPropertyDescriptor(target, propKey)

		- 拦截Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象

	- defineProperty(target, propKey, propDesc)

		- 拦截Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)，返回一个布尔值

	- preventExtensions(target)

		- 拦截Object.preventExtensions(proxy)，返回一个布尔值

	- getPrototypeOf(target)

		- 拦截Object.getPrototypeOf(proxy)，返回一个对象

	- isExtensible(target)

		- 拦截Object.isExtensible(proxy)，返回一个布尔值

	- setPrototypeOf(target, proto)

		- 拦截Object.setPrototypeOf(proxy, proto)，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截

	- apply(target, object, args)

		- 拦截 Proxy 实例作为函数调用的操作，比如proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)

	- construct(target, args)

		- 拦截 Proxy 实例作为构造函数调用的操作，比如new proxy(...args)

### Reflect对象

- 设计目的：
1） 将Object对象的一些明显属于语言内部的方法，放到Reflect对象上（包括未来的新方法）
2） 修改某些Object方法的返回结果，让其变得更合理
3） 让Object操作都变成函数行为
4）Reflect对象的方法与Proxy对象的方法一一对应，只要是Proxy对象的方法，就能在Reflect对象上找到对应的方法。让Proxy对象可以方便地调用对应的Reflect方法，完成默认行为，作为修改行为的基础。也就是说，不管Proxy怎么修改默认行为，你总可以在Reflect上获取默认行为
- 13个静态方法
与Proxy对应

	- Reflect.apply(target, thisArg, args)
	- Reflect.construct(target, args)
	- Reflect.get(target, name, receiver)
	- Reflect.set(target, name, value, receiver)
	- Reflect.defineProperty(target, name, desc)
	- Reflect.deleteProperty(target, name)
	- Reflect.has(target, name)
	- Reflect.ownKeys(target)
	- Reflect.isExtensible(target)
	- Reflect.preventExtensions(target)
	- Reflect.getOwnPropertyDescriptor(target, name)
	- Reflect.getPrototypeOf(target)
	- Reflect.setPrototypeOf(target, prototype)

### Promise对象

- 异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大
- Promise，就是一个容器，保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理
- 两个特点

	- 1）对象的状态不受外界影响。Promise对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态
	- 2）一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise对象的状态改变，只有两种可能：从pending变为fulfilled和从pending变为rejected。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。如果改变已经发生了，你再对Promise对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的

- 三个缺点

	- 首先，无法取消Promise，一旦新建它就会立即执行，无法中途取消
	- 其次，如果不设置回调函数，Promise内部抛出的错误，不会反应到外部
	- 第三，当处于pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）

- 基本用法

	- Promise对象是一个构造函数，用来生成Promise实例
	- 接受一个函数作为参数，该函数的两个参数分别是resolve和reject

		- resolve函数的作用是，将Promise对象的状态从“未完成”变为“成功”（即从 pending 变为 resolved），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去
		- reject函数的作用是，将Promise对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去

	- Promise实例生成以后，可以用then方法分别指定resolved状态和rejected（可选）状态的回调函数

		- promise.then(function(value) {
  // success
}, function(error) {
  // failure
});
		- 如果调用resolve函数和reject函数时带有参数，那么它们的参数会被传递给回调函数
		- resolve函数的参数除了正常的值以外，还可能是另一个 Promise 实例
		- reject函数的参数通常是Error对象的实例，表示抛出的错误

	- Promise 新建后就会立即执行
	- 注意，调用resolve或reject并不会终结 Promise 的参数函数的执行

		- 调用resolve或reject以后，Promise 的使命就完成了，后继操作应该放到then方法里面，而不应该直接写在resolve或reject的后面
		- 最好在它们前面加上return语句

- 实例方法

	- then()

		- 作用是为 Promise 实例添加状态改变时的回调函数
		- then方法的第一个参数是resolved状态的回调函数，第二个参数（可选）是rejected状态的回调函数
		- 返回的是一个新的Promise实例（注意，不是原来那个Promise实例），可以采用链式写法，即then方法后面再调用另一个then方法
		- 链式调用：第一个回调函数完成以后，会将返回结果作为参数，传入第二个回调函数
		- 链式调用：第一个then方法指定的回调函数，返回的是另一个Promise对象。这时，第二个then方法指定的回调函数，就会等待这个新的Promise对象状态发生变化。如果变为resolved，就调用第一个回调函数，如果状态变为rejected，就调用第二个回调函数

	- catch()

		- 是.then(null, rejection)或.then(undefined, rejection)的别名，用于指定发生错误时的回调函数
		- 返回一个 Promise 对象，如果该对象状态变为resolved，则会调用then方法指定的回调函数；如果异步操作抛出错误，状态就会变为rejected，就会调用catch方法指定的回调函数，处理这个错误
		- then方法指定的回调函数，如果运行中抛出错误，也会被catch方法捕获
		- 如果 Promise 状态已经变成resolved，再抛出错误是无效的
		- Promise 对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获为止，即错误总是会被下一个catch语句捕获
		- 一般来说，不要在then方法里面定义 Reject 状态的回调函数（即then的第二个参数），总是使用catch方法
		- Promise 会吃掉错误：跟传统的try/catch代码块不同的是，如果没有使用catch方法指定错误处理的回调函数，Promise 对象抛出的错误不会传递到外层代码
		- catch方法返回的还是一个 Promise 对象，因此后面还可以接着调用then方法
		- catch方法之中，还能再抛出错误

	- finally()

		- 用于指定不管 Promise 对象最后状态如何，都会执行的操作
		- finally方法的回调函数不接受任何参数，所以没有办法知道，前面的 Promise 状态到底是fulfilled还是rejected。因此finally方法里面的操作，应该是与状态无关的，不依赖于 Promise 的执行结果
		- 本质上是then方法的特例

- 静态方法

	- all()

		- 用于将多个 Promise 实例，包装成一个新的 Promise 实例
		- 接受一个数组作为参数，数组元素都是 Promise 实例，如果不是，就会先调用Promise.resolve方法，将参数转为 Promise 实例，再进一步处理
		- Promise.all()方法的参数可以不是数组，但必须具有 Iterator 接口，且返回的每个成员都是 Promise 实例
		- 状态：如果数组中所有Promise都转为fulfilled，才为fulfilled；如果任一Promise为rejected，则为rejected
		- 注意，如果作为参数的 Promise 实例，自己定义了catch方法，那么它一旦被rejected，并不会触发Promise.all()的catch方法；如果数组Promise元素没有自己的catch方法，就会调用Promise.all()的catch方法

	- race()

		- 同样是将多个 Promise 实例，包装成一个新的 Promise 实例
		- 只要Promise数组之中有一个实例率先改变状态，总体状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给包装Promise的回调函数
		- 如果数组中不是 Promise 实例，就会先调用Promise.resolve()方法，将参数转为 Promise 实例

	- allSettled()

		- 接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例。只有等到所有这些参数实例都返回结果，不管是fulfilled还是rejected，包装实例才会结束
		- 不关心异步操作的结果，只关心这些操作有没有结束。这时，Promise.allSettled()方法就很有用

	- any()

		- 接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例。只要参数实例有一个变成fulfilled状态，包装实例就会变成fulfilled状态；如果所有参数实例都变成rejected状态，包装实例就会变成rejected状态
		- Promise.any()抛出的错误，不是一个一般的错误，而是一个 AggregateError 实例。它相当于一个数组，每个成员对应一个被rejected的操作所抛出的错误

	- resolve()

		- 将现有对象转为 Promise 对象，Promise.resolve()方法就起到这个作用

	- reject()

		- Promise.reject(reason)方法也会返回一个新的 Promise 实例，该实例的状态为rejected

## 28 Iterator遍历器

### 一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署 Iterator 接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）

- function getIterator(arr) {
  let index = 0;
  return {
    next() {
      return index < arr.length ? {
        value: arr[index++],
        done: false
      } : {
        value: undefined,
        done: true
      };
    }
  };
}

let it = getIterator(["1", 2, "3"]);
console.log(it);
console.log(it.next());

### 作用

- 一是为各种数据结构，提供一个统一的、简便的访问接口；
- 二是使得数据结构的成员能够按某种次序排列；
- 三是 ES6 创造了一种新的遍历命令for...of循环，Iterator 接口主要供for...of消费

### 遍历过程

- （1）创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象。
- （2）第一次调用指针对象的next方法，可以将指针指向数据结构的第一个成员。
- （3）第二次调用指针对象的next方法，指针就指向数据结构的第二个成员。
- （4）不断调用指针对象的next方法，直到它指向数据结构的结束位置。

###  Iterator 只是把接口规格加到数据结构之上，所以，遍历器与它所遍历的那个数据结构，实际上是分开的，完全可以写出没有对应数据结构的遍历器对象，或者说用遍历器对象模拟出数据结构

### 一种数据结构只要部署了 Iterator 接口，我们就称这种数据结构是“可遍历的”（iterable）

### 默认的 Iterator 接口部署在数据结构的Symbol.iterator属性，或者说，一个数据结构只要具有Symbol.iterator属性，就可以认为是“可遍历的”（iterable）

### 本质上，遍历器是一种线性处理，对于任何非线性的数据结构，部署遍历器接口，就等于部署一种线性转换

### 一个对象如果要具备可被for...of循环调用的 Iterator 接口，就必须在Symbol.iterator的属性上部署遍历器生成方法（原型链上的对象具有该方法也可）

### 调用场合

- 解构赋值

	- 对数组和 Set 结构进行解构赋值时，会默认调用Symbol.iterator方法

- 扩展运算符

	- 可以将任何部署了 Iterator 接口的数据结构，转为数组

- yield*

	- yield*后面跟的是一个可遍历的结构，它会调用该结构的遍历器接口

- for...of

	- 一个数据结构只要部署了Symbol.iterator属性，就被视为具有 iterator 接口，就可以用for...of循环遍历它的成员
	- for...of循环内部调用的是数据结构的Symbol.iterator方法
	- 数组、Set 和 Map 结构、某些类似数组的对象（比如arguments对象、DOM NodeList 对象）、 Generator 对象，以及字符串

- Array.from()
- Map(), Set(), WeakMap(), WeakSet()（比如new Map([['a',1],['b',2]])）
- Promise.all()
- Promise.race()

### 遍历对比

- for循环

	- 写法比较麻烦

- forEach循环

	- 数组内置
	- 无法中途跳出forEach循环，break命令或return命令都不能奏效

- for...in循环

	- 可以遍历数组的键名
	- 数组的键名是数字，但是for...in循环是以字符串作为键名“0”、“1”、“2”等等
	- 不仅遍历数字键名，还会遍历手动添加的其他键，甚至包括原型链上的键
	- 某些情况下，for...in循环会以任意顺序遍历键名
	- 本质：in操作符，主要是为遍历对象而设计的，不适用于遍历数组

- for...of循环

	- 有着同for...in一样的简洁语法，但是没有for...in那些缺点。
	- 不同于forEach方法，它可以与break、continue和return配合使用。
	- 提供了遍历所有数据结构的统一操作接口
	- 本质：Iterator接口
