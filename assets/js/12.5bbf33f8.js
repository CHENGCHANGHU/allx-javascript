(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{359:function(s,t,a){"use strict";a.r(t);var n=a(42),e=Object(n.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"使用vuepress制作github-pages静态页面"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#使用vuepress制作github-pages静态页面"}},[s._v("#")]),s._v(" 使用vuepress制作github pages静态页面")]),s._v(" "),a("h2",{attrs:{id:"_1-项目初始化"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-项目初始化"}},[s._v("#")]),s._v(" 1 项目初始化")]),s._v(" "),a("ol",[a("li",[s._v("在github上新建项目仓库，并开启项目的"),a("code",[s._v("github page")])]),s._v(" "),a("li",[s._v("在本地新建文件夹，使用"),a("code",[s._v("git clone 仓库地址")]),s._v("复制项目到本地文件夹内")]),s._v(" "),a("li",[s._v("使用"),a("code",[s._v("npm init -y")]),s._v("使用默认配置初始化nodejs项目，添加"),a("code",[s._v("script")]),s._v("脚本命令"),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"scripts"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n   "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"dev"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"npx vuepress dev docs"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n   "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"build"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"npx vuepress build docs"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br")])])]),s._v(" "),a("li",[s._v("安装局部vuepress："),a("code",[s._v("npm install -D vuepress")])])]),s._v(" "),a("h2",{attrs:{id:"_2-本地构建静态项目"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-本地构建静态项目"}},[s._v("#")]),s._v(" 2 本地构建静态项目")]),s._v(" "),a("ol",[a("li",[s._v("创建"),a("code",[s._v("docs")]),s._v("文件夹，在其中创建"),a("code",[s._v(".vuepress/config.js")]),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// docs/.vuepress/config.js 文件内容")]),s._v("\nmodule"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("exports "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n   title"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'Allx-JavaScript基础语法'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 设置网站标题")]),s._v("\n   description"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'JavaScript基础语法'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n   "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// dest:'.vuepress/dist', // 默认值")]),s._v("\n   dest"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'dist'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n   base"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'/allx-javascript/'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n   markdown"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n      lineNumbers"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("true")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 代码块显示行号")]),s._v("\n   "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n   themeConfig"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n      sidebar"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 可以省略 .md 拓展名")]),s._v("\n         "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'/'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 以 / 结尾的路径将会被视为 */README.md，这个链接的文字将会被自动获取到")]),s._v("\n         "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'/ALLX-JavaScript'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'JS基础语法'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n      sidebarDepth"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("3")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n      activeHeaderLinks"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("true")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" \n   "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br")])])]),s._v(" "),a("li",[s._v("在"),a("code",[s._v("docs")]),s._v("文件夹中添加"),a("code",[s._v("md")]),s._v("文件，在"),a("code",[s._v("docs/.vuepress/config.js")]),s._v("中"),a("code",[s._v("module.exports.themeConfig")]),s._v("中添加文件（可以省略"),a("code",[s._v("md")]),s._v("后缀），在"),a("code",[s._v("docs/.vuepress/public")]),s._v("中添加静态文件（图片等），在"),a("code",[s._v("docs/.vuepress/config.js")]),s._v("及"),a("code",[s._v("md")]),s._v("文件中即是"),a("code",[s._v("/")]),s._v("目录")]),s._v(" "),a("li",[s._v("在项目根目录下使用"),a("code",[s._v("npm run dev")]),s._v("命令启动开发模式，使用"),a("code",[s._v("npm run build")]),s._v("构建项目（编译静态文件）")])]),s._v(" "),a("h2",{attrs:{id:"_3-部署到github-pages"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-部署到github-pages"}},[s._v("#")]),s._v(" 3 部署到github pages")]),s._v(" "),a("ol",[a("li",[s._v("使用"),a("code",[s._v("rm -r ./assets/,./essay/,./img/,./tech/,*.html")]),s._v("命令清除上一次的构建文件")]),s._v(" "),a("li",[s._v("使用"),a("code",[s._v("npm run build")]),s._v("命令构建项目")]),s._v(" "),a("li",[s._v("使用"),a("code",[s._v("cp -r .\\dist\\* .\\")]),s._v("命令复制"),a("code",[s._v("dist")]),s._v("文件夹下的构建后的文件到项目根目录中")]),s._v(" "),a("li",[s._v("使用"),a("code",[s._v("git add .")]),s._v("和"),a("code",[s._v("git commit -m 'comment'")]),s._v("命令将修改添加到本地"),a("code",[s._v("git")]),s._v("中")]),s._v(" "),a("li",[s._v("使用"),a("code",[s._v("git push origin master")]),s._v("命令将本地仓库传输到远程仓库")]),s._v(" "),a("li",[s._v("打开浏览器查看")])])])}),[],!1,null,null,null);t.default=e.exports}}]);