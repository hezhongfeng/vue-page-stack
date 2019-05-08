## 整体功能描述

> A vue component instances stack manager

Vue组件堆栈管理，一个在移动端`Web App`使用的，模仿原生App的`UI Stack`的一个插件。主要功能是能够实现页面前进的时候刷新，后退的时候返回原页面。例如：
`A->B`，新渲染页面B,`back`一下就会返回到A，并且A的状态是进入B时候的状态，不需要重新渲染，同时有activited的钩子激活。

功能说明：
1. 在vue-router上扩展，原有导航逻辑不需改变
2. `push`和`forward`的时候重新渲染页面
3. `back`和`go(负数)`的时候不会重新渲染，会保留好先前的内容状态，例如表单内容，滚动条滑动的位置等
4. 从页面B `back`到页面A的时候需要有activited的钩子
5. 经历`A->B->C->D->E`后，可以从E go到 B，并且Stack中只有A和B（可以在登录的时候使用）
6. 支持浏览器的后退，前进事件(主要是微信公众号和部分原生的需求)

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

