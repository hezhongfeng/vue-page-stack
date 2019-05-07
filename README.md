## 整体功能描述

> A vue component instances stack manager

Vue组件堆栈管理，一个在移动端`Web App`使用的，模仿原生App的`UI Stack`的一个插件。主要功能是能够实现页面前进的时候刷新，后退的时候返回原页面。例如：
`A->B`，页面刷新,`back`一下就会返回到A，并且A的状态是进入B时候的状态，不需要重新渲染，同时有activited的钩子激活。

详细功能举例：
1. 从PageA `push` 到PageB,然后PageB `back`到从PageA的时候从PageA需要保存好先前的状态，例如表单内容，滚动条滑动的位置等
2. 从PageB `back`到PageA的时候需要有钩子函数使用
3. `A->B->C->D->E`后，可以从E go到 B，并且Stack中只有A和B
4. 在vue-router上面扩展，达到无缝升级
5. 支持浏览器的后退事件(主要是微信公众号和部分原生的需求)

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
就在js的runtime内存中，最大值仍需测试

## Demo

## 过程记录

### 路由切换

由页面A push到页面B,然后由B回退到页面A的时候
```
A(push)-->B(back)-->A
```
无论页面是否按需加载，回退的时候，A都是重新挂载的。如果A的数据是静态的，那么回退后虽然A是重新挂载的，但是滚动的数据会保留。
