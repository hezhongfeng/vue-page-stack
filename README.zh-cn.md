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

`vue-page-stack` 当前面向 Vue 3。Vue 2 版本请查看 [v1.5.0](https://github.com/hezhongfeng/vue-page-stack/tree/v1.5.0)。

[English](./README.md) | 简体中文

---

一个面向 Vue 3 的单页应用页面栈组件，让返回导航更接近原生 app，而不是每次都重新挂载页面。

<div align="center">
  <img src="https://raw.githubusercontent.com/hezhongfeng/images/master/vue-page-stack.gif">
</div>

## Example

[预览](https://vue-page-stack.hezf.online/#/)

[示例源码](https://github.com/hezhongfeng/vue-page-stack-example)

## 功能特性

- 基于 `vue-router` 扩展，不需要改动原有路由定义
- `push` 和 `forward` 会渲染新页面并压入页面栈
- `back` 和 `go(-n)` 会优先从页面栈恢复旧页面，保留表单、滚动位置等本地状态
- 回退后会清理不再可达的页面栈项
- `replace` 会覆盖当前栈顶页面
- 暴露 `back` / `forward` 事件，方便做方向感知动画
- 支持浏览器后退和前进按钮

## 和 KeepAlive 的区别

- `VuePageStack` 按导航顺序管理页面，不提供 `include`、`exclude`、`max`
- `KeepAlive` 会持续保留已缓存页面，而 `VuePageStack` 会清理不再可达的页面
- 再次进入同一路由时会重新渲染页面，只有返回上一级时才会恢复缓存实例

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

app.use(VuePageStackPlugin, { router });
```

```vue
<template>
  <router-view v-slot="{ Component }">
    <vue-page-stack @back="onBack" @forward="onForward">
      <component :is="Component" :key="$route.fullPath" />
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

建议为路由组件提供稳定的 key。大多数场景下，`$route.fullPath` 是最稳妥的默认值，因为它会把不同参数和查询串视为不同的栈项。

## API

### 注册插件

使用之前需要注册插件

```js
import { VuePageStackPlugin } from 'vue-page-stack';

//...
app.use(VuePageStackPlugin, { router });
```

Options 说明：

| Attribute | Description | Type | Accepted Values | Default |
| --------- | ----------- | ---- | --------------- | ------- |
| `router` | `vue-router` 实例 | `Router` | 通过 `createRouter` 创建的 router | 必填 |

### 前进和后退

如果想在页面前进或者后退的时候添加一些事件，可以通过组件的 `back` 和 `forward` 事件处理。

```vue
<template>
  <router-view v-slot="{ Component }">
    <vue-page-stack @back="onBack" @forward="onForward">
      <component :is="Component" :key="$route.fullPath" />
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

### 使用说明

- 默认插槽应只渲染一个路由组件 vnode，页面栈逻辑才会生效
- 如果默认插槽里有多个子节点，组件会直接透传，不做缓存处理
- 当前实现依赖 Vue renderer 内部行为，升级 Vue 后建议先跑完整测试

[示例工程](https://github.com/hezhongfeng/vue-page-stack-example/blob/master/src/App.vue)

## 开发

```bash
pnpm install
pnpm run build
pnpm run lint
pnpm run test:run
pnpm run test:coverage
```

`dist/` 作为发布产物处理，会在 `npm pack` / `npm publish` 前通过 `prepack` 脚本自动生成，因此日常开发中不需要继续跟踪到仓库。

## 文档

- 架构与维护说明：[docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)

## 相关说明

### 更新日志

主要的更新日志在 [release notes](https://github.com/hezhongfeng/vue-page-stack/releases)

### 原理

页面实例管理的实现参考了 Vue 源码里的 `KeepAlive`

## 感谢

这个插件同时借鉴了 [vue-navigation](https://github.com/zack24q/vue-navigation) 和 [vue-nav](https://github.com/nearspears/vue-nav)，感谢他们提供的灵感。

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
