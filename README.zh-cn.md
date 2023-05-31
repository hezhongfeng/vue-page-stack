# vue-page-stack

[![npm version](https://badge.fury.io/js/vue-page-stack.svg)](https://badge.fury.io/js/vue-page-stack)

[English](./README.md) | 简体中文

---

Vue 单页应用导航管理器，像原生 app 一样管理页面栈而不是销毁。

<div align="center">
  <img src="https://i.loli.net/2019/10/31/HKYfJBVWjXdZozm.gif">
</div>

## Example

[预览](https://hezhongfeng.github.io/vue-page-stack-example/)

[示例源码](https://github.com/hezhongfeng/vue-page-stack-example)

## 功能特性

- 🐉 在 vue-router 上扩展，原有导航逻辑不变
- ⚽`push`或者`forward`的时候重新渲染页面，Stack 中会添加新渲染的页面
- 🏆`back`或者`go(负数)`的时候先前的页面不会重新渲染，而是从 Stack 中读取，并且这些页面保留着先前的内容状态，例如表单内容，滚动条滑动的位置等
- 🏈`back`或者`go(负数)`的时候会把不用的页面从 Stack 中移除
- 🎓`replace`会更新 Stack 中当前页面
- 🎉 回退到之前页面的时候有 activated 钩子函数触发
- 🚀 支持浏览器的后退，前进事件
- 🐰 提供路由方向的变化，并且可以在前进和后退的时候添加不同的动画

## 和 KeepAlive 的区别

- 🎣 VuePageStack 不提供 `include` `exclude` 和 `max` 参数，因为 VuePageStack 想要实现的是一个完整的页面栈管理，只能按照顺序进出
- 🪁 KeepAlive 缓存过页面之后会一直缓存这个页面，VuePageStack 会根据页面栈的层级而自助销毁多余的页面
- 🏕️ KeepAlive 进入（不是返回）相同的路由页面，会继续复用以前缓存的页面，而 VuePageStack 会重新渲染页面

## 安装和用法

### 安装

```
npm install vue-page-stack
# OR
yarn add vue-page-stack
```

### 使用

```js
import Vue from 'vue';
import VuePageStack from 'vue-page-stack';

// vue-router is necessary
Vue.use(VuePageStack, { router });
```

```js
// App.vue
<template>
  <div id='app'>
    <vue-page-stack>
      <router-view></router-view>
    </vue-page-stack>
  </div>
</template>
```

### CDN

```js
<script src='https://unpkg.com/vue-page-stack/dist/vue-page-stack.umd.min.js'></script>
```

```js
Vue.use(VuePageStack, { router });
```

## API

### 注册插件

注册的时候可以指定 VuePageStack 的名字和 keyName

use `Vue.use` to install `vue-page-stack`
使用之前需要注册插件

```
Vue.use(VuePageStack, options);
// example
Vue.use(VuePageStack, { router });
```

Options 说明：

| Attribute | Description         | Type   | Accepted Values     | Default        |
| --------- | ------------------- | ------ | ------------------- | -------------- |
| router    | vue-router instance | Object | vue-router instance | -              |
| name      | VuePageStack name   | String | 'VuePageStack'      | 'VuePageStack' |
| keyName   | stack-key name      | String | 'stack-key'         | 'stack-key'    |

注册的时候可以指定 VuePageStack 的名字和 keyName

```js
Vue.use(VuePageStack, { router, name: 'VuePageStack', keyName: 'stack-key' });
```

### 前进和后退

如果想在页面前进或者后退的时候添加一些动画，可以通过`stack-key-dir`进行判断

```js
// App.vue
$route(to, from) {
  if (to.params['stack-key-dir'] === 'forward') {
    this.transitionName = 'forward';
  } else {
    this.transitionName = 'back';
  }
}
```

[example](https://github.com/hezhongfeng/vue-page-stack-example/blob/master/src/App.vue)

### 获取当前 UI 栈

```js
let UIStack = this.$pageStack.getStack();
```

[example code](https://github.com/hezhongfeng/vue-page-stack-example/blob/814f5ad8b8804e6fd81002f7254d266df3311770/src/views/main/MainList.vue#L30)

## 相关说明

### keyName

为什么会给路由添加`keyName`这个参数，是为了支持浏览器的后退，前进事件，这个特性在 webApp,微信公众号和小程序很重要

### 更新日志

主要的更新日志在 [release notes](https://github.com/hezhongfeng/vue-page-stack/releases)

### 原理

获取当前页面实例部分参考了`Vue`源码中`keep-alive`的部分

## 感谢

这个插件同时借鉴了[vue-navigation](https://github.com/zack24q/vue-navigation)和[vue-nav](https://github.com/nearspears/vue-nav)，很感谢他们给的灵感。

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<table>
  <tr>
    <td align="center"><a href="http://hezf.online"><img src="https://avatars2.githubusercontent.com/u/12163050?v=4" width="100px;" alt="hezf"/><br /><sub><b>hezf</b></sub></a><br /><a href="#design-hezhongfeng" title="Design">🎨</a></td>
    <td align="center"><a href="https://github.com/woshilina"><img src="https://avatars0.githubusercontent.com/u/28744945?v=4" width="100px;" alt="李娜"/><br /><sub><b>李娜</b></sub></a><br /><a href="https://github.com/hezhongfeng/vue-page-stack/commits?author=woshilina" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/yuxiaolei1989"><img src="https://avatars0.githubusercontent.com/u/7732447?v=4" width="100px;" alt="余小磊"/><br /><sub><b>余小磊</b></sub></a><br /><a href="https://github.com/hezhongfeng/vue-page-stack/commits?author=yuxiaolei1989" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/yellowbeee"><img src="https://avatars0.githubusercontent.com/u/16685984?v=4" width="100px;" alt="yellowbeee"/><br /><sub><b>yellowbeee</b></sub></a><br /><a href="https://github.com/hezhongfeng/vue-page-stack/commits?author=yellowbeee" title="Code">💻</a></td>
  </tr>
</table>
