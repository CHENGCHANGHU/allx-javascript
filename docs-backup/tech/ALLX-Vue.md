# Vue

[[toc]]

---

## 1 使用Vue

### 1.1 Vue的简单使用
   对于制作原型或学习，可以这样导入使用最新版本：`<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>`。
   ```js
   <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
   <div id="app1">
      {{ message }}
   </div>
   <script type="text/javascript">
      let app1 = new Vue({
         el: '#app1',
         data: {
            message: 'Hello Vue!'
         }
      });
   </script>
   ```

## 2 Vue的生命周期函数
   > 生命周期函数不能使用箭头函数
   1. `beforeCreate` 在实例初始化之后。数据观测（data observer）和 event/watcher 时间配置之前被调用  
   2. `created` 在实例创建完成后被立即调用。在这一步，实例已完成以下配置：数据观测（data observer），属性和方法的运算，watch/event 事件回调；然而，挂载阶段还未开始，$el 属性目前不可见。
   3. `beforeMount` 在挂载开始之前被调用：相关的渲染函数首次被调用
   4. `mounted` 被新创建的 vm.$el 替换，挂载成功
   5. `beforeUpdate` 数据更新时调用
   6. `updated` 组件 DOM 已经更新完成，组件更新完成

- v-once 只渲染一次，不可更改
- v-html 将字符串渲染成子级html元素或者替换掉子级html元素
   ```js
   <p>using v-html:
      <span v-html="app4_p2"></span>
   </p>
   <p v-html="app4_p2">using v-html:</p>

   let app4vm = new Vue({
      el: '#app4',
      data: {
         app4_p2: '<span style="color:brown">伟大、无私、正经的黄橙先生</span>',
      },
   });
   // ==>
   <p>using v-html:
      <span v-html="app4_p2">
         <span style="color:brown">伟大、无私、正经的黄橙先生</span>
      </span>
   </p>
   <p v-html="app4_p2">
      <span style="color:brown">伟大、无私、正经的黄橙先生</span>
   </p>
   ```