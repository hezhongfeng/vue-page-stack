# vue-page-stack

[![Financial Contributors on Open Collective](https://opencollective.com/vue-page-stack/all/badge.svg?label=financial+contributors)](https://opencollective.com/vue-page-stack) [![npm version](https://badge.fury.io/js/vue-page-stack.svg)](https://badge.fury.io/js/vue-page-stack)

English | [简体中文](./README.zh-cn.md)

---

A Vue SPA navigation manager,cache the UI in the SPA like a native application, rather than destroy it.

<div align="center">
  <img src="https://i.loli.net/2019/10/31/HKYfJBVWjXdZozm.gif">
</div>

## Example

[preview](https://hezhongfeng.github.io/vue-page-stack-example/)

[demo code](https://github.com/hezhongfeng/vue-page-stack-example)

## Features

- 🐉expanded on vue-router, the original navigation logic remains unchanged
- ⚽When a page is re-rendered as a `push` or `forward`, the newly rendered page will be added to the Stack.
- 🏆When `back` or `go(negative number)`, the previous pages are not re-rendered, but instead are read from the Stack, and these pages retain the previous content state, such as the form content, the position of the scroll bar
- 🏈`back` or `go (negative)` will remove unused pages from the Stack
- 🎓`replace` will update the current page in the stack
- 🎉activated hook function triggers when rolling back to the previous page
- 🚀Browser back and forward events are supporded
- 🍕Responding to changes in routes with Parameters is supporded, such as navigating from `/user/foo` to `/user/bar`, component instances are reused
- 🐰provides routing direction changes, and you can add different animations when forward or backward

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
<script src="https://unpkg.com/vue-page-stack/dist/vue-page-stack.umd.min.js"></script>
```

```
Vue.use(VuePageStack, { router });
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

### get current UI stack
```
let UIStack = this.$pageStack.getStack();

```
[example code](https://github.com/hezhongfeng/vue-page-stack-example/blob/814f5ad8b8804e6fd81002f7254d266df3311770/src/views/main/MainList.vue#L30)
## Notes

### keyName

Why is the parameter `keyName` added to the route? To support the browser's backward and forward events，this is important in webApp or wechat.

### Changelog
Details changes for each release are documented in the [release notes](https://github.com/hezhongfeng/vue-page-stack/releases).

### Principle

Getting the current page instance refers to the `keep-alive` section of `Vue`.

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

## Contributors

### Code Contributors

This project exists thanks to all the people who contribute. [[Contribute](CONTRIBUTING.md)].
<a href="https://github.com/hezhongfeng/vue-page-stack/graphs/contributors"><img src="https://opencollective.com/vue-page-stack/contributors.svg?width=890&button=false" /></a>

### Financial Contributors

Become a financial contributor and help us sustain our community. [[Contribute](https://opencollective.com/vue-page-stack/contribute)]

#### Individuals

<a href="https://opencollective.com/vue-page-stack"><img src="https://opencollective.com/vue-page-stack/individuals.svg?width=890"></a>

#### Organizations

Support this project with your organization. Your logo will show up here with a link to your website. [[Contribute](https://opencollective.com/vue-page-stack/contribute)]

<a href="https://opencollective.com/vue-page-stack/organization/0/website"><img src="https://opencollective.com/vue-page-stack/organization/0/avatar.svg"></a>
<a href="https://opencollective.com/vue-page-stack/organization/1/website"><img src="https://opencollective.com/vue-page-stack/organization/1/avatar.svg"></a>
<a href="https://opencollective.com/vue-page-stack/organization/2/website"><img src="https://opencollective.com/vue-page-stack/organization/2/avatar.svg"></a>
<a href="https://opencollective.com/vue-page-stack/organization/3/website"><img src="https://opencollective.com/vue-page-stack/organization/3/avatar.svg"></a>
<a href="https://opencollective.com/vue-page-stack/organization/4/website"><img src="https://opencollective.com/vue-page-stack/organization/4/avatar.svg"></a>
<a href="https://opencollective.com/vue-page-stack/organization/5/website"><img src="https://opencollective.com/vue-page-stack/organization/5/avatar.svg"></a>
<a href="https://opencollective.com/vue-page-stack/organization/6/website"><img src="https://opencollective.com/vue-page-stack/organization/6/avatar.svg"></a>
<a href="https://opencollective.com/vue-page-stack/organization/7/website"><img src="https://opencollective.com/vue-page-stack/organization/7/avatar.svg"></a>
<a href="https://opencollective.com/vue-page-stack/organization/8/website"><img src="https://opencollective.com/vue-page-stack/organization/8/avatar.svg"></a>
<a href="https://opencollective.com/vue-page-stack/organization/9/website"><img src="https://opencollective.com/vue-page-stack/organization/9/avatar.svg"></a>
