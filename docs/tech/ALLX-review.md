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




