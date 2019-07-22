# vue-page-stack

[![npm version](https://badge.fury.io/js/vue-page-stack.svg)](https://badge.fury.io/js/vue-page-stack)

Caching Vue component instances without destroying them like native App in Vue SPA.

<div align="center">
  <img src="https://i.loli.net/2019/06/04/5cf64c9ea1f1d71714.gif">
</div>

---

English | [简体中文](./README.zh-cn.md)

## Example

[preview](https://hezhongfeng.github.io/vue-page-stack-example/)

[demo](https://github.com/hezhongfeng/vue-page-stack-example)

## Features

- 🐉expanded on vue-router, the original navigation logic remains unchanged
- ⚽render the page when `push` or `forward`, the newly rendered page will be added to the Stack.
- 🏆`back` or `go (negative)` will not be re-rendered. Reading the previous page from the Stack,and will preserve the previous content state, such as the form content, the position of the scroll bar
- 🏈`back` or `go (negative)` will remove unused pages from the Stack
- 🎓`replace` will update the current page in the stack
- 🎉activited hook function triggers when rolling back to the previous page
- 🚀support browser back, forward events
- 🍕support for changes in response routing parameters, such as navigating from /user/foo to /user/bar, component instances are reused
- 🐰provide routing direction changes, add different animations when entering or leaving

## Installation and use

### Installation

```
npm install vue-page-stack
# OR
yarn add vue-page-stack
```

### use

```
import Vue from 'vue'
import VuePageStack from 'vue-page-stack';

// vue-router is necessary
Vue.use(VuePageStack, { router }); 
```

```
// App.vue
<template>
  <div id="app">
    <vue-page-stack>
      <router-view ></router-view>
    </vue-page-stack>
  </div>
</template>
```

### CDN
```
<script src="https://unpkg.com/vue-page-stack/dist/vue-page-stack.js"></script>
```

```
Vue.use(VuePageStack.default, { router });
```

## API

### install
use `Vue.use` to install `vue-page-stack`
```
Vue.use(VuePageStack, options);
// example
Vue.use(VuePageStack, { router });
```

Options description：

Attribute | Description | Type | Accepted Values | Default
---|---|---|---|---
router | vue-router instance | Object | vue-router instance | -
name | VuePageStack name | String | 'VuePageStack' | 'VuePageStack'
keyName | stack-key name | String | 'stack-key' | 'stack-key'

you can customize VuePageStack's name and keyName
```
Vue.use(VuePageStack, { router, name: 'VuePageStack', keyName: 'stack-key' });
```

### forward or backward
If you want to make some animate entering or leaving, `vue-page-stack` offers `stack-key-dir` to judge forward or backward.

```
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

## Notes

### keyName

Why is the parameter `keyName` added to the route? To support the browser's backward and forward events，this is important in webApp or wechat.

### Principle

Getting the current page instance refers to the `keep-alive` section of `Vue`.

## Thanks

The plug-in draws on both [vue-navigation](https://github.com/zack24q/vue-navigation) and [vue-nav](https://github.com/nearspears/vue-nav)，Thank you very much for their inspiration.
