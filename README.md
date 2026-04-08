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

**This is the version of Vue3.0, Vue2.0 please click [this link](https://github.com/hezhongfeng/vue-page-stack/tree/v1.5.0)**

English | [简体中文](./README.zh-cn.md)

---

A Vue3 SPA navigation manager,cache the UI in the SPA like a native application, rather than destroy it.

<div align="center">
  <img src="https://raw.githubusercontent.com/hezhongfeng/images/master/vue-page-stack.gif">
</div>

## Example

[preview](https://vue-page-stack.hezf.online/)

[demo code](https://github.com/hezhongfeng/vue-page-stack-example)

## Features

- 🐉 Extend on vue-router, original navigation logic remains the same
- ⚽ `push` or `forward` renders the page and the newly rendered page is stored in Stack
- 🏆 `back` or `go(negative)` when the previous pages are not re-rendered, but read from the Stack, and these pages retain the previous content state, such as form content, scrollbar scroll position, etc.
- 🏈 `back` or `go(negative)` removes the unused pages from the Stack
- 🎓`replace` will update the current page in the Stack
- 🎉 The activated hook function is triggered when going back to the previous page
- 🚀 Support for browser backward and forward events
- 🐰 Provides routing direction changes and can add different animations when going forward and backward

## The difference between VuePageStack and KeepAlive

- 🌱 VuePageStack does not provide `include`, `exclude` and `max` parameters, because VuePageStack wants to achieve a complete page stack management, only in order in and out
- 🪁 KeepAlive will keep caching the page after it has been cached, and VuePageStack will help destroy the extra pages based on the page stack hierarchy
- 🧬 KeepAlive enters (not returns) the same route page and continues to reuse the previously cached page, while VuePageStack re-renders the page

## Installation and use

### Installation

```js
pnpm install vue-page-stack
```

### Use

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

### Install

Use `app.use` to install `vue-page-stack`.

```js
import { VuePageStackPlugin } from 'vue-page-stack';

//...
app.use(VuePageStackPlugin, { router });
```

Options:

| Attribute | Description         | Type   | Accepted Values     | Default |
| --------- | ------------------- | ------ | ------------------- | ------- |
| router    | vue-router instance | Object | vue-router instance | -       |

### Events

Use the `back` and `forward` events to react to navigation direction changes.

```vue
// App.vue
<vue-page-stack @back="onBack" @forward="onForward">
  <component :is="Component" :key="$route.fullPath"></component>
</vue-page-stack>
```

[example](https://github.com/hezhongfeng/vue-page-stack-example/blob/master/src/App.vue)

## Development

```bash
pnpm install
pnpm run build
pnpm run lint
pnpm run test:run
pnpm run test:coverage
```

## Notes

### Changelog

Release-by-release changes are documented in the [release notes](https://github.com/hezhongfeng/vue-page-stack/releases).

### Principle

The current page instance management is inspired by Vue's `keep-alive` implementation.

## Thanks

The plug-in draws on both [vue-navigation](https://github.com/zack24q/vue-navigation) and [vue-nav](https://github.com/nearspears/vue-nav)，Thank you very much for their inspiration.

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
