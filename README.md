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

`vue-page-stack` currently targets Vue 3. For the Vue 2 version, see [v1.5.0](https://github.com/hezhongfeng/vue-page-stack/tree/v1.5.0).

English | [简体中文](./README.zh-cn.md)

---

A Vue 3 SPA navigation stack that preserves route state in stack order, so back navigation feels closer to a native app than a full page remount.

<div align="center">
  <img src="https://raw.githubusercontent.com/hezhongfeng/images/master/vue-page-stack.gif">
</div>

## Example

[preview](https://vue-page-stack.hezf.online/)

[demo code](https://github.com/hezhongfeng/vue-page-stack-example)

## Features

- Works on top of `vue-router` without changing your route definitions
- Stores newly rendered pages on `push` and `forward`
- Restores previous pages from the stack on `back` and `go(-n)` so local UI state can survive
- Removes unreachable pages from the stack after back navigation
- Replaces the current stack entry on `replace`
- Emits `back` and `forward` events for direction-aware transitions
- Supports browser back and forward buttons

## Compared with KeepAlive

- `VuePageStack` manages pages in navigation order instead of providing `include`, `exclude`, or `max`
- `KeepAlive` keeps previously cached pages around until they are evicted; `VuePageStack` trims pages that are no longer reachable in the stack
- Navigating to the same route again creates a fresh page, while returning to an earlier page restores its cached instance

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

Use a stable route key on the rendered route component. In most apps, `$route.fullPath` is the safest default because it treats different params and query strings as distinct stack entries.

## API

### Install

Use `app.use` to install `vue-page-stack`.

```js
import { VuePageStackPlugin } from 'vue-page-stack';

//...
app.use(VuePageStackPlugin, { router });
```

Options:

| Attribute | Description | Type | Accepted Values | Default |
| --------- | ----------- | ---- | --------------- | ------- |
| `router` | `vue-router` instance | `Router` | router created by `createRouter` | required |

### Events

Use the `back` and `forward` events to react to navigation direction changes.

```vue
<vue-page-stack @back="onBack" @forward="onForward">
  <component :is="Component" :key="$route.fullPath" />
</vue-page-stack>
```

### Notes

- The default slot should render a single route component vnode for stack behavior to apply
- Multiple slot children are passed through unchanged
- The implementation depends on Vue renderer internals, so upgrades should be validated with the test suite

[Example app](https://github.com/hezhongfeng/vue-page-stack-example/blob/master/src/App.vue)

## Development

```bash
pnpm install
pnpm run build
pnpm run lint
pnpm run test:run
pnpm run test:coverage
```

`dist/` is treated as a release artifact and is generated automatically by `npm pack` / `npm publish` through the `prepack` script, so it does not need to stay checked in during normal development.

## Documentation

- Architecture and maintenance notes: [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)

## Notes

### Changelog

Release-by-release changes are documented in the [release notes](https://github.com/hezhongfeng/vue-page-stack/releases).

### Principle

The page instance management model is inspired by Vue's `KeepAlive` implementation.

## Thanks

This plugin draws on both [vue-navigation](https://github.com/zack24q/vue-navigation) and [vue-nav](https://github.com/nearspears/vue-nav). Thanks for the inspiration.

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
