## 1 CSS

### 1.1 选择器
基本选择器：标签选择器、类选择器、ID选择器

结构选择器：后代选择器、子元素选择器、紧邻兄弟选择器、后面兄弟选择器

属性选择器

伪类选择器：超链接（LVHA）、结构伪类、表单伪类、字符伪类

### 1.2 元素权重

没有权重：继承规则
0000：通配符选择器
0001：标签选择器、伪元素选择器
0010：类选择器、类属性选择器
0100：ID选择器
1000：行内样式
!important：强制优先级

### 盒子模型

纵向外边距会合并

box-sizing：设置高度、宽度是否包括内边距与边框，border-box就包括

### 浮动布局
float属性定义元素向那个方向浮动，浮动是对后面元素的影响，浮动元素会丢失其原占有的空间，浮动元素边界不会超过父元素的padding，浮动转块

overflow属性可以清除浮动，使得父元素产生BFC机制，即父元素的高度计算会包括浮动元素的高度

### 定位布局

默认定位、相对定位、绝对定位、固定定位、粘性定位

### 弹性布局

在弹性不居中使用margin-right:auto可以撑满空间

### 栅格布局

## 2 JS

```js
// 1
function promisefy (fn) {
    return function (...args) {
        return new Promise((resolve, reject) => {
            fn(...args, (err, data) => {
                if (err)
                    reject(err)
                else
                    resolve(data);
            });
        });
    }
}

// 2
fn = fn.bind(obj);
fn();

fn.call(obj);
fn.apply(obj);

// 3
Array.prototype._map = function (fn) {
    return this.reduce((result, curr) => {
        result.push(fn(curr));
        return result;
    }, []);
}

// 4
function maxSumOfContinentSubArray (arr) {
    const sumObj = arr.reduce(({maxSum, currSum}, curr) => {
        currSum += curr;
        currSum = Math.max(curr, currSum + curr);
        maxSum = Math.max(maxSum, currSum);
        return {
            maxSum,
            currSum
       };
    }, {
        maxSum: 0,
        currSum: 0
    });
    return sumObj.maxSum;
}
```

```js
js运行作用域分析

描述信息

请根据下面这段代码说出运行结果，并解释原因

[new Foo() >  Foo() > new Foo]

2411233

function Foo () {

  getName = function () {

    console.log(1)

  }

  console.log('this is' + this)

  return this

}


Foo.getName = function () {

  console.log(2)

}

Foo.prototype.getName = function () {

  console.log(3)

}

var getName = function () {

  console.log(4)

}

function getName () {

  console.log(5)

}

// 请写出一下的输出结果

Foo.getName()

getName()

Foo().getName()

getName()

new Foo.getName()

new Foo().getName()

new new Foo().getName()
```

## 3 前端安全

### 3.1 XSS跨站脚本攻击
Cross Site Scripting：攻击者往web页面插入恶意Script脚本，致使页面渲染的数据中包含可运行的脚本

#### 3.1.1 分类
   - 反射型XSS：非持久化，XSS代码出现在URL中，作为输入提交到服务器端，服务器端解析后响应，XSS代码随响应内容一起传回给浏览器，最后浏览器解析执行XSS代码（过程像一次反射，故叫反射型XSS）。
   - 存储型XSS：持久化，XSS代码存储到服务器中，如个人信息，当有用户访问个人页面即触发代码执行
   - DOM型XSS：DOM允许脚本动态地访问和更新文档内容、结构和样式，从客户端获得DOM中的数据在本地执行，如果DOM中的数据没有经过严格确认，就会产生DOM XSS漏洞，不需要经过服务端

#### 3.1.2 防范
   - 浏览器自带防御机制针对HTML内容和属性，http响应头中自动添加x-xss-protection，0关闭，1打开（默认值）
   - 对特定字符做转义
   - CSP（Content Security Policy）内容安全策略，指定哪些内容可执行，白名单模式，限定网页可请求的URL

### 3.2 CSRF跨站请求伪造

### 3.3 点击劫持

## 4 登录

### 4.1 单系统登录机制
   - HTTP无状态协议，服务器对每一次请求都是独立地处理后返回响应

### 4.2 会话机制
   - 使得服务器和客户端共同维护一个状态，即会话Session
   - 服务端将会话的Id作为响应的一部分发送给客户端，客户端存储会话Id，服务端在内存中保存会话Id，浏览器使用cookie保存会话Id（进行Session跟踪），客户端发送的请求包含cookie对象，也就附带上了cookie信息，可以解决单系统登录问题

### 4.3 多系统登录机制
   - 浏览器发送请求仅携带与该域匹配的cookie，早期多系统登录可以使用将多个子系统域名置于同一个顶级域名下，再将cookie域设为该顶级域名，但有所局限：1）顶级域名需要统一；2）web服务器和后端语言需要相同，否则无法维持会话；3）cookie本身并不安全

### 4.4 单点登录
   - SSO：single sign on，独立的认证中心，认证中心接收账号及密码，创建授权令牌及全局会话，跳转至子系统时带上令牌创建局部会话，
   - 单点注销：任何一个子系统注销，全局注销

### 4.5 扫码登录
   - 

## 5 运行时的页面构建过程

### 5.1 页面构建阶段
   - 解析HTMl代码并构建DOM（文档对象模型，浏览器会静默修复错误）
   - 执行script脚本代码（浏览器解析到脚本元素即停止从HTMl构建DOM，开始执行JS代码）
      > 全局window对象存在于整个页面的生存期之间  
      > 只要还有HTMl元素和JS代码，上述两个步骤就将交替执行

### 5.2 事件处理阶段
   - 页面构建阶段的JS代码，设置全局应用状态、修改DOM，并注册事件处理器/监听器
   - 浏览器是单线程执行模型，使用事件队列，队列不空则取出事件执行，一直循环到web页面关闭    
   - 事件种类：浏览器事件、网络事件、用户事件、计时器事件  
   - 注册事件的三种方式：HTML属性、DOM对象属性、DOM对象添加处理器方法，注册的事件就放置到事件队列尾
      > 前两者只能注册一个事件处理器，后注册会覆盖前注册  
      > 后一者可以注册多个，按注册顺序执行

## 6 JS函数
   - 函数也是对象，特殊处在于是可调用的
      > 通过字面量创建；赋值给变量、数组项或其他对象的属性；作为函数参数来传递；作为函数返回值；具有动态创建和分配的属性  
      > 使用函数属性可以记忆前一个计算结果，为之后的计算节省时间
   - 函数定义方式：函数声明和函数表达式、箭头函数、函数构造函数、生成器函数
   - 剩余参数、默认参数
   - 隐含参数：arguments、this，arguments表示函数调用的实参，**this表示函数被调用时的上下文对象**
      > arguments是函数参数的别名，来回改动会互相影响，严格模式下arguments不再是参数别名   
      > this参数受函数调用方式影响
   - 作为函数调用：this指向window（顶级对象，非严格模式）或undefined（非严格模式），通常被称为函数上下文
      ```js
      function foo () {
         return this;
      }
      console.log(foo() === globalThis); // true，非严格模式，顶层对象

      function bar () {
         'use strict';
         return this;
      }
      console.log(bar() === undefined); // true，严格模式，undefined
      ```
   - 作为对象方法调用：该对象成为函数的上下文，this指向对象，实现面向对象的主要方式之一
     ```js
      let Foo = {
         name: 'Foo',
         baz: function () {
            return this;
         }
      }
      console.log(Foo.baz() === Foo); // true
     ``` 
   - 作为构造函数调用：关键字new
      > 创建一个新的空对象  
      > 将空对象作为this参数传递给构造函数，成为构造函数的上下文并构造  
      > 将新创建的对象即this返回（返回的原始类型会被忽略，返回对象将丢弃新创建的对象）
      ```js
      function Foo (name) {
         this.name = name;
         this.bar = function () {
            return this;
         }
         return this;
      }

      let foo = new Foo('foo');
      console.log(foo); // Foo { name: 'foo', bar: [Function] }
      console.log(foo.bar() === foo); // true

      console.log(Foo() === globalThis); // true，非严格模式，顶层对象，name属性、bar方法被定义到顶层对象上
      console.log(bar() === globalThis); // true
      ```
   - 使用apply、call调用：显示地指定函数上下文
      > apply--数组，call--参数列表   
      - 函数式编程方法，如对数组只对单个元素进行回调
      ```js
      // 实现forEach
      function forEach(list, callback) {
         let i = 0, len = list.length;
         while (i < len) {
            callback.call(list, list[i]);
            i++;
         }
      }

      let arr = [1, 2, 3];
      forEach(arr, function (item) {
         console.log(this); // [ 1, 2, 3 ] [ 1, 2, 3 ] [ 1, 2, 3 ]
         console.log(item); // 1 2 3
      });
      ```
   - 箭头函数没有单独的this值，其this与声明所在的上下文相同
      > In arrow functions, this retains the value of the enclosing lexical context's this.  
      > 调用箭头函数时，不会隐式地传入this参数，而是从定义时的函数继承上下文  
      ```js
      let foo = () => this;
      console.log(foo() === this); // true
      ```
      ```js
      function Bar () {
         this.name = 'Bar',
         this.der = function () {
            return this;
         },
         this.foo = () => this
      }

      let bar = new Bar(); // 使用new关键字会新建一个空对象，将this指向新对象，作为隐含参数传入构造函数，最后以this作为返回值
      console.log(bar.der() === bar); // true，函数作为方法调用时，函数上下文为调用对象，this指向上下对象，作为隐含参数传入构造函数
      console.log(bar.foo() === bar); // true，箭头函数上下文对象继承函数声明时的上下文对象

      let der = bar.der;
      let foo = bar.foo;

      console.log(der() === globalThis); // true，运行时绑定
      console.log(foo() === bar); // true，声明时绑定
      ```
      ```js
      let foo = {
         der: function () {
            let bar = () => this; // *
            return bar;
         }
      };

      // 调用der函数，*行执行箭头函数声明，this继承der函数内上下文环境，
      // der函数作为对象方法调用，其上下文环境为foo对象，this即指向foo对象
      // ，der函数返回bar函数指向的箭头函数，赋值给der变量
      let der = foo.der(); 
      console.log(der() === foo); // true，der变量调用der函数即箭头函数，返回this

      // der2变量指向der函数
      let der2 = foo.der;
      // der2变量调用der函数，*行执行箭头函数声明，this继承der函数内上下文环境，
      // der函数直接调用，其上下文环境为全局环境对象，this即指向globalThis对象，
      // der函数调用后返回bar变量指向的箭头函数，箭头函数调用后返回this
      console.log(der2()() === globalThis); // true
      ```
      > 对象字面量中使用箭头函数作为方法，箭头函数中的this指向全局对象  
   - 使用bind绑定上下文对象并创建新函数返回




## 7 闭包和作用域

### 7.1 闭包
   - (MDN) A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). In other words, a closure gives you access to an outer function’s scope from an inner function. In JavaScript, closures are created every time a function is created, at function creation time.
   - 使用闭包：封装私有变量、回调函数
   - 闭包是函数内部和外部词法环境的状态封装，不是创建时刻的状态快照（当闭包内部函数执行时，依然能够更新变量的值）

### 7.2 通过执行上下文跟踪函数执行
   - JS中，代码执行的基础单元是函数，JS代码有两种类型：全局代码（在所有函数外部定义）、函数代码（在函数内部定义），从而出现两种执行上下文：全局执行上下文、函数执行上下文
      > 全局执行上下文只有一个，在JS程序开始执行时创建  
      > 函数执行上下文在每次函数调用时创建一个新的执行上下文（区别于函数上下文）
   - 发生函数调用时，停止当前执行上下文，创建新的函数执行上下文执行函数，调用完成后，销毁函数执行上下文，回到发生函数调用时的执行上下文，使用执行上下文栈/调用栈跟踪执行上下文（正在执行的上下文、正在等待的上下文）
   - 通过执行上下文可以准确定位标识符实际指向的变量

### 7.3 使用词法环境跟踪变量作用域
   - 词法环境是JS引擎内部用来跟踪标识符与特定变量之间的映射关系，常称为作用域
   - 每个执行上下文（全局执行上下文、函数执行上下文）都有一个与之关联的词法环境，**词法环境中包含了在上下文中定义的标识符映射表**
   - 函数创建时，会创建一个与之关联的词法环境，存储于[[Environment]]（无法直接访问或操作）的内部属性上

### 7.4 JS的变量类型
   - 定义变量：var、let、const，差异在于：可变性和与词法环境的关系
   - 可变性
      - const变量：不可变，var、let变量：可变
      - const变量值或变量所指向的内存地址不可变，只能在声明时初始化一次
      - const变量指向的引用类型数据可以改变属性
   - var变量是在距离最近的函数词法环境或在全局词法环境中定义，忽略块级作用域
   - let、const变量可以是块级、函数级和全局级

### 7.5 在词法环境中注册标识符
   - JS代码分两阶段执行，创建词法环境后，执行第一阶段，第一阶段不执行代码，JS引擎访问并注册在当前词法环境中所声明的变量和函数，第二阶段的执行取决于变量类型（var、let、const和函数声明）和环境类型（块级），
      - 创建函数环境，则创建形参及参数默认值否则跳过
      - 扫描代码进行函数声明，如果是全局或函数环境下找到函数声明（除去函数表达式和箭头函数），则创建函数，并绑定到单签环境中与函数名相同的标识符上，如果该标识符已存在则重写，块级作用域则跳过
      - 扫描代码进行变量声明，在函数或全局环境中，找到函数外var变量与函数和代码块外的let、const变量，若标识符不存在，进行注册并初始化为undefined，已存在则保留（let、const注册后并不能使用，必须在声明之后才能使用）
      > 注册标识符的第一阶段和第二阶段的分离就是变量提升的原理  

## 8 生成器
   - 一个在状态中运动的状态机，通过调用生成器创建一个迭代器，再通过迭代器从生成器中请求值
      - 挂起开始：创建生成器之后，其中代码均未执行的状态
      - 执行：迭代器调用next方法后的状态（刚开始或挂起继续）
      - 挂起让渡：生成器执行遇到yield表达式，暂停执行并等待继续执行的状态
      - 完成：执行完成或遇到return表达式
   - 标准函数每次调用都会创建一个新的执行环境上下文，而生成器的执行上下文会被暂时挂起将来再恢复

## 9 面向对象与原型
   - JS中，对象是属性名与属性值/属性方法的集合
   - JS通过原型实现继承，对象的原型属性是内置属性[[prototype]]（无法直接访问）
   - 对象构造器与原型
      - JS使用new操作符，通过构造函数初始化新对象，但是没有真正的类定义
      - new操作符触发创建一个新对象分配，并将其设置为函数的上下文（可通过this隐含参数访问）
      - 每个函数都有一个原型对象，会被自动设置为以该函数作为构造函数创建出来的对象的原型
      - 将函数作为构造函数进行new调用时，新构造出来的对象的原型被设置为构造函数的原型对象的引用
      - 对象与函数原型之间的引用关系是在对象创建时建立，之后将函数原型覆盖成新的原型对象，不影响之前的引用关系
   - 继承是一种在新对象上复用现有对象的属性的形式
   - 使用class模拟基于类的继承语法，底层依然是基于原型继承
   - 原型模式：通过克隆方式创建某个类型的对象（一个对象可以是通过克隆另一个对象得来），以此模式构建JS的面向对象系统
      > 原型模式不单是一种设计模式（创建对象的一种模式），也是一种编程泛型  
      > 创建对象：先指定类型，然后通过类创建对象；通过克隆创建一个一模一样的对象  
      - ES5提供了Object.create()方法用以克隆对象（将参数对象作为返回值对象的原型对象）
         ```js
         function Foo(name, hobbies) {
            this.name = name;
            this.hobbies = hobbies;
         }

         let foo = new Foo(name = 'foo', hobbies = ['sing', 'jump', 'rap']);
         console.log(foo); // Foo { name: 'foo', hobbies: [ 'sing', 'jump', 'rap' ] }
         let der = Object.create(foo);
         console.log(der.__proto__); // Foo { name: 'foo', hobbies: [ 'sing', 'jump', 'rap' ] }
         ```
      - JS语言不存在类的概念，所有JS对象都是从某个对象上克隆得来，被克隆对象就称为克隆对象的原型，层层克隆最终就形成了原型链，尝试调用对象的某个属性时，如果被调用对象本身不存在该属性，则将调用请求委托给原型对象，基于原型链的委托机制就是原型继承的本质
      - 原型编程泛型特点：
         - 所有数据都是对象
         - 以另一个对象为原型克隆来创建一个对象
         - 对象有指向原型的指针
         - 调用委托
      - JS的对象系统
         - JS中几乎所有数据都是对象（除undefined之外，number、string、boolean有包装对象），JS的根对象是Object.prototype对象（null空对象）
         - JS中克隆由引擎内部负责
            > let a = new Object() 或 let a = {}，引擎内部即以Object.prototype为原型克隆出一个对象（new 运算符只是调用构造函数，本质还是克隆再加一些额外操作）
            ```js
            function Foo(name) {
               this.name = name;
               return this;
            }

            Foo.prototype.getName = function () {
               return this.name;
            }

            const fooFactory = function (...args) {
               let obj = new Object(), Constructor = args.shift();
               obj.__proto__ = Constructor.prototype; // 使用__proto__引用原型
               let res = Constructor.apply(obj, args); // 
               return res;
            }

            let foo = fooFactory(Foo, 'foo');
            console.log(foo); // Foo { name: 'foo' }
            console.log(foo.getName()); // foo

            let foo2 = new Foo('foo');
            console.log(foo2); // Foo { name: 'foo' }
            console.log(foo2.getName()); // foo
            ```
         - JS中对象的__proto__指向原型对象，也即其构造器的原型对象
         - JS中对象构造器的原型不仅限于Object.prototype，可以动态地指向其他对象，达到继承的目的，请求委托到达Object.prototype（null）将终止，返回undefined



## 10 事件循环
   - 宏任务和微任务
      - 宏任务：创建主文档对象、解析HTML、执行主进程js脚本、更改URL、页面加载、输入、网络事件和定时器事件等
      - 微任务：promise回调、DOM变化等
   - JS是单线程执行模型，一个任务开始后直到运行结束不会被其他任务中断
   - 任务队列中任务的检测和添加独立于事件循环（如：执行主代码时，点击按钮，按钮事件被添加到宏任务队列中，等待主代码执行完成再执行）
   - 事件循环：
      - 1）检查宏任务队列，如果宏任务等待，则立即执行一个宏任务；
      - 2）检查微任务队列，如果微任务等待，则立即按序执行所有微任务；
      - 3）检查是否需要更新UI渲染，如果更新，则渲染，完成本次事件循环。
   - 计时器
      - 浏览器不会创建两个相同的健哥计时器
   - 事件
      - 事件处理器中this指向事件处理器所注册的元素

## 11 正则表达式
   - 简单地理解正则表达式为使用模式匹配文本字符串的表达式，本质为描述为正则集合的自动机模型
   - 创建：字面量`const pattern = /test/`或正则对象`const pattern = new RegExp("test")`
   - 修饰符：
      - i：大小写不敏感