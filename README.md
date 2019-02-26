# hy-page
Vue移动端项目页面基本结构

## 整体功能描述
一个在移动端`Web App`使用的，模仿原生App的`UI Stack`的一个插件。主要功能是能够实现页面前进的时候刷新，后退的时候返回原页面。例如：
`A->B`，页面刷新,`back`一下就会返回到A，并且A的状态是进入B时候的状态，不需要重新渲染，但是应该有个类似于activited的钩子激活。

### 详细功能举例：
1. 从PageA `push` 到PageB,然后PageB `back`到从PageA的时候从PageA需要保存好先前的状态，例如表单内容，滚动条滑动的位置等
2. 从PageB `back`到PageA的时候需要有钩子函数使用
3. `A->B->C->D->E`后，可以从E back到 B，并且Stack中只有A和B
4. 在原有router上面扩展，达到无缝升级

## API确定
1. push
2. replace
3. go
4. back
5. forward

## Demo
