## 整体功能描述

> A vue component instances stack manager

Vue组件堆栈管理，一个在移动端`Web App`使用的，模仿原生App的`UI Stack`的一个插件。主要功能是能够实现页面前进的时候刷新，后退的时候返回原页面。例如：
`A->B`，新渲染页面B,`back`一下就会返回到A，并且A的状态是进入B时候的状态，不需要重新渲染，同时有activited的钩子激活。

功能说明：
1. 在vue-router上扩展，原有导航逻辑不需改变
2. `push`或者`forward`的时候重新渲染页面，Stack中会添加新渲染的页面
3. `back`或者`go(负数)`的时候不会重新渲染，从Stack中读取先前的页面，会保留好先前的内容状态，例如表单内容，滚动条滑动的位置等
4. `back`或者`go(负数)`的时候会把不用的页面从Stack中移除
5. 重新渲染的时候有activited钩子函数触发
6. 支持浏览器的后退，前进事件
7. 支持响应路由参数的变化，例如从 /user/foo 导航到 /user/bar，组件实例会被复用，可以通过watch (监测变化) `$route` 对象或者使用`beforeRouteUpdate `钩子

## API确定
支持以下的编程式导航

1. push
2. replace
3. go
4. back
5. forward

## 核心原理

### 怎么捕获router的各种事件
通过侵入router的编程式导航，获取到当前的action

### 怎么兼容browser的后退，前进
在url上面添加key区分，并且需要存储这组key

### 怎么存储vnode
在js的runtime内存中，最大值仍需测试

## 过程记录

### 应用场景举例

