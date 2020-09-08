# 算法与数据结构基础知识

## 1 递归

### 1.1 分级组合

#### 例
题目：给出一个二维字符数组，外层和内层长度均不定，输出第i个字符取自第i个子数组所有的组合。  
解析：  
1）由表及里，将这个二维数组看做一棵树（第1层节点为第1个子数组中的所有字符，每一个第1层节点的子节点均相同，为第2层节点，第2层节点为第2个子数组中的所有字符，...，第i层节点为第i个子数组的所有字符），对这棵树进行带状态的递归遍历，每一个叶子节点的状态就是要求的输出。
```js
let data = [
  ['a', 'b', 'c'],
  ['d', 'e'],
  ['f'],
  ['g', 'h', 'j'],
  ['k', 'l', 'm']
];

let len = data.length;
let res = [];

function getStr(i, str) { // *** i表示树的层数，str也即是本题中的状态
  if (i === len - 1) { // *** 如果是最后一个子数组，也就是到达了叶子结点，这时对携带状态进行处理
    for (let s of data[i]) {
      // console.log(str + s);
      res.push(str + s);
    }
  } else { // *** 如果不是最后一个子数组，则往下递归，并增加本节点值到状态中
    // console.log(data[i]);
    for (let s of data[i]) {
      getStr(i + 1, str + s);
    }
  }
}

getStr(0, '');
console.log(res);

/**
[
  'adfgk', 'adfgl', 'adfgm', 'adfhk', 'adfhl',
  'adfhm', 'adfjk', 'adfjl', 'adfjm', 'aefgk',
  'aefgl', 'aefgm', 'aefhk', 'aefhl', 'aefhm',
  'aefjk', 'aefjl', 'aefjm', 'bdfgk', 'bdfgl',
  'bdfgm', 'bdfhk', 'bdfhl', 'bdfhm', 'bdfjk',
  'bdfjl', 'bdfjm', 'befgk', 'befgl', 'befgm',
  'befhk', 'befhl', 'befhm', 'befjk', 'befjl',
  'befjm', 'cdfgk', 'cdfgl', 'cdfgm', 'cdfhk',
  'cdfhl', 'cdfhm', 'cdfjk', 'cdfjl', 'cdfjm',
  'cefgk', 'cefgl', 'cefgm', 'cefhk', 'cefhl',
  'cefhm', 'cefjk', 'cefjl', 'cefjm'
]
*/
```
2）统筹大局，观察输出结果，输出结果中第1位的变化可以看成是
