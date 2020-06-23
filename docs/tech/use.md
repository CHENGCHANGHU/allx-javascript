# 使用vuepress制作github pages静态页面

## 1 项目初始化
   1. 在github上新建项目仓库，并开启项目的`github page`
   2. 在本地新建文件夹，使用`git clone 仓库地址`复制项目到本地文件夹内
   3. 使用`npm init -y`使用默认配置初始化nodejs项目，添加`script`脚本命令
      ```js
      "scripts": {
         "dev":"npx vuepress dev docs",
         "build":"npx vuepress build docs",
      },
      ```
   4. 安装局部vuepress：`npm install -D vuepress`
   
## 2 本地构建静态项目
   1. 创建`docs`文件夹，在其中创建`.vuepress/config.js`
      ```js
      // docs/.vuepress/config.js 文件内容
      module.exports = {
         title: 'Allx-JavaScript基础语法', // 设置网站标题
         description: 'JavaScript基础语法',
         // dest:'.vuepress/dist', // 默认值
         dest:'dist',
         base:'/allx-javascript/',
         markdown: {
            lineNumbers: true // 代码块显示行号
         },
         themeConfig: {
            sidebar: [ // 可以省略 .md 拓展名
               '/', // 以 / 结尾的路径将会被视为 */README.md，这个链接的文字将会被自动获取到
               ['/ALLX-JavaScript', 'JS基础语法']
            ],
            sidebarDepth: 3,
            activeHeaderLinks: true, 
         }
      }
      ``` 
   2. 在`docs`文件夹中添加`md`文件，在`docs/.vuepress/config.js`中`module.exports.themeConfig`中添加文件（可以省略`md`后缀），在`docs/.vuepress/public`中添加静态文件（图片等），在`docs/.vuepress/config.js`及`md`文件中即是`/`目录
   3. 在项目根目录下使用`npm run dev`命令启动开发模式，使用`npm run build`构建项目（编译静态文件）

## 3 部署到github pages
   1. 使用`rm -r ./assets/,./essay/,./img/,./tech/,*.html`命令清除上一次的构建文件
   2. 使用`cp -r .\dist\* .\`命令复制`dist`文件夹下的构建后的文件到项目根目录中
   3. 使用`git add .`和`git commit -m 'comment'`命令将修改添加到本地`git`中
   4. 使用`git push origin master`命令将本地仓库传输到远程仓库
   5. 打开浏览器查看