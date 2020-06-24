# v-template-cli

简体中文 | [English](./README.md)

自动拉取 vue 项目模板的 cli 工具。

包括：

- [vue-admin-template](https://github.com/lyhmyd1211/v-templates/tree/admin)：基于[vue-admin-template](https://github.com/PanJiaChen/vue-admin-template)的中后台管理系统模板，并添加了常用的工具函数以及一些对 element-ui 组件的封装和兼容性修改。

* [vue-app-template](https://github.com/lyhmyd1211/v-templates/tree/app)：轻量级 WebApp 模板。使用[vant](https://youzan.github.io/vant/#/)作为基础的 ui 组件库，并使用[lib-flexible](https://github.com/amfe/lib-flexible/)和[postcss-pxtorem](https://github.com/cuth/postcss-pxtorem)进行 Rem 适配。

- [vue-visual-template](https://github.com/lyhmyd1211/v-templates/tree/visual)：可视化大屏项目模板。对 Echarts 进行简单的 vue 组件封装；预置了[jiaminghi 的 DataV（一个 vue 大屏数据展示组件库）](http://datav.jiaminghi.com/)（不是阿里云的数据可视化方案，可见取名的重要性），并对其在 ie 上的兼容性做了处理；添加了全屏组件以及自适应 wrapper 组件。

## 环境依赖

```
"node": ">= 10.0.0",
"npm": ">= 5.6.0"

"其他版本暂未测试"
```

## 安装

```
npm i v-template-cli -g
```

or

```
yarn global add v-template-cli
```

## 使用

### 创建一个项目

#### vt create

通过运行以下命令创建一个项目:

```
vt create hello-world
```

选择你想要拉取的模板：

![选择你想要拉取的模板](https://github.com/lyhmyd1211/pictures/blob/master/cli1.png?raw=true)

选择是否立即安装依赖：

![选择是否立即安装依赖](https://github.com/lyhmyd1211/pictures/blob/master/cli2.png?raw=true)

安装完成进入目录并启动项目：

![安装完成进入目录并启动项目](https://github.com/lyhmyd1211/pictures/blob/master/cli3.png?raw=true)

当文件名重复想再次创建模板时，可以选择是否覆盖原来的文件夹：
![选择是否覆盖原来的文件夹](https://github.com/lyhmyd1211/pictures/blob/master/cli4.png?raw=true)

## 浏览器支持

现代浏览器以及 10+.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| IE10, IE11, Edge                                                                                                                                                                                                | last 2 versions                                                                                                                                                                                                   | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                               |

## License

[MIT](https://github.com/PanJiaChen/vue-admin-template/blob/master/LICENSE) license.

Copyright (c) 2020-present LuYingHeng
