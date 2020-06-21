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