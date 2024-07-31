# vue-page-stack

<p align="center">
  <img src="https://raw.githubusercontent.com/hezhongfeng/images/master/stack.svg" width="200">
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/vue-page-stack">
    <img src="https://img.shields.io/npm/dt/vue-page-stack.svg" alt="Downloads">
  </a>
  <a href="https://www.npmjs.com/package/vue-page-stack">
    <img src="https://img.shields.io/npm/dm/vue-page-stack.svg" alt="Downloads">
  </a>
  <br>
  <a href="https://github.com/hezhongfeng/vue-page-stack/blob/master/LICENSE.md">
    <img src="https://img.shields.io/npm/l/vue-page-stack.svg" alt="License">
  </a>
  <a href="https://www.npmjs.com/package/vue-page-stack">
    <img src="https://img.shields.io/npm/v/vue-page-stack.svg" alt="Version">
  </a>
</p>

## v3.2.0

1. 修复 router.go 缓存失效的 bug

## 3.1.4

1. 修复刷新浏览器然后后退的 bug

## v3.1.3

1. 修复 replace 时，页面缓存问题

## v3.1.2

1. 移除了 url 上的参数 `stack-key`
2. 因为 Vue3.x 对内置组件有特殊处理，所以目前不能和 `Transition` 一起使用

**这个是 Vue3.x 的版本 ，Vue2.0 请点击[这个链接](https://github.com/hezhongfeng/vue-page-stack/tree/v1.5.0)**

[English](./README.md) | 简体中文

---

Vue3 单页应用导航管理器，像原生 app 一样管理页面栈而不是销毁。

<div align="center">
  <img src="https://raw.githubusercontent.com/hezhongfeng/images/master/vue-page-stack.gif">
</div>

## Example

[预览](http://vue-page-stack-example.vercel.app/)

[示例源码](https://github.com/hezhongfeng/vue-page-stack-example)

## 功能特性

- 🐉 在 vue-router 上扩展，原有导航逻辑不变
- ⚽`push`或者`forward`的时候重新渲染页面，Stack 中会存储新渲染的页面
- 🏆`back`或者`go(负数)`的时候先前的页面不会重新渲染，而是从 Stack 中读取，并且这些页面保留着先前的内容状态，例如表单内容，滚动条滚动的位置等
- 🏈`back`或者`go(负数)`的时候会把不用的页面从 Stack 中移除
- 🎓`replace`会更新 Stack 中当前页面
- 🎉 回退到之前页面的时候有 activated 钩子函数触发
- 🚀 支持浏览器的后退，前进事件
- 🐰 提供路由方向的变化，并且可以在前进和后退的时候添加不同的动画

## 和 KeepAlive 的区别

- 🌱 VuePageStack 不提供 `include` `exclude` 和 `max` 参数，因为 VuePageStack 想要实现的是一个完整的页面栈管理，只能按照顺序进出
- 🪁 KeepAlive 缓存过页面之后会一直缓存这个页面，VuePageStack 会根据页面栈的层级而自助销毁多余的页面
- 🧬 KeepAlive 进入（不是返回）相同的路由页面，会继续复用以前缓存的页面，而 VuePageStack 会重新渲染页面

## 安装和用法

### 安装

```js
pnpm install vue-page-stack
```

### 使用

```js
import { createApp } from 'vue';
import { VuePageStackPlugin } from 'vue-page-stack';

const app = createApp(App);

// router is necessary
app.use(VuePageStackPlugin, { router });
```

```vue
// App.vue
<template>
  <router-view v-slot="{ Component }">
    <vue-page-stack @back="onBack" @forward="onForward">
      <component :is="Component" :key="$route.fullPath"></component>
    </vue-page-stack>
  </router-view>
</template>

<script setup>
const onBack = () => {
  console.log('back');
};

const onForward = () => {
  console.log('forward');
};
</script>
```

## API

### 注册插件

使用之前需要注册插件

```js
import { VuePageStackPlugin } from 'vue-page-stack';

//...
app.use(VuePageStackPlugin, { router });
```

Options 说明：

| Attribute | Description         | Type   | Accepted Values     | Default        |
| --------- | ------------------- | ------ | ------------------- | -------------- |
| router    | vue-router instance | Object | vue-router instance | -              |

### 前进和后退

如果想在页面前进或者后退的时候添加一些事件，可以通过组件的 `back` 事件和 `forward` 事件进行处理

```vue
// App.vue
<template>
  <router-view v-slot="{ Component }">
    <vue-page-stack @back="onBack" @forward="onForward">
      <component :is="Component" :key="$route.fullPath"></component>
    </vue-page-stack>
  </router-view>
</template>

<script setup>
const onBack = () => {
  console.log('back');
};

const onForward = () => {
  console.log('forward');
};
</script>
```

[example](https://github.com/hezhongfeng/vue-page-stack-example/blob/master/src/App.vue)

## 相关说明

### 更新日志

主要的更新日志在 [release notes](https://github.com/hezhongfeng/vue-page-stack/releases)

### 原理

获取当前页面实例部分参考了`Vue`源码中`KeepAlive`的部分

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
