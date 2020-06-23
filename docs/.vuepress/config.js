module.exports = {
  title: '黄橙笔记', // 设置网站标题
  description: '黄橙笔记',
  // dest:'.vuepress/dist', // 默认值
  dest: 'dist',
  base: '/allx-javascript/',
  head: [
    ['link',
      {
        rel: 'icon',
        href: '/img/sparrow.png'
      }
      //浏览器的标签栏的网页图标，第一个'/'会遍历public文件夹的文件
    ],
  ],
  markdown: {
    lineNumbers: true // 代码块显示行号
  },
  themeConfig: {
    sidebar: [ // 可以省略 .md 拓展名
      ['/', '首页'], // 以 / 结尾的路径将会被视为 */README.md，这个链接的文字将会被自动获取到
      ['/tech/use.md', 'vuepress + github pages搭建静态网页'],
      ['/tech/ALLX-JavaScript.md', 'JS基础语法']
    ],
    sidebarDepth: 3,
    activeHeaderLinks: true,
    lastUpdated: '最近更新', // string | boolean
    logo: './img/hc-logo.png',
    nav: [{
        text: '首页',
        link: '/'
      }, {
        text: '笔记',
        ariaLabel: '笔记', //用于识别的label
        items: [{
            text: '技术',
            link: '/tech/tech-test.md'
          },
          //点击标签会跳转至link的markdown文件生成的页面
          {
            text: '小文',
            link: '/essay/essay-test.md'
          },
        ]
      },
      {
        text: "自制版笔记",
        link: 'https://chengchanghu.github.io/studynote/'
      },
      {
        text: "Github",
        link: 'https://github.com/CHENGCHANGHU/allx-javascript'
      }
    ],
  }
}