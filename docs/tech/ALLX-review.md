## CSS

### 选择器
基本选择器：标签选择器、类选择器、ID选择器

结构选择器：后代选择器、子元素选择器、紧邻兄弟选择器、后面兄弟选择器

属性选择器

伪类选择器：超链接（LVHA）、结构伪类、表单伪类、字符伪类

### 元素权重

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

## JS

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

## 前端安全

### XSS跨站脚本攻击
Cross Site Scripting：页面渲染的数据中包含可运行的脚本




