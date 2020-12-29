import { VNode } from 'vue'

export type StackItem = {
  key: string
  vnode: VNode
}

export type StackProps = {
  value?: StackItem[]
}

export class Stack {
  private value: StackItem[]
  constructor(props?: StackProps) {
    this.value = props?.value ?? []
  }
  push(item: StackItem) {
    return this.value.push(item)
  }
  pop() {
    return this.value.pop()
  }
  removeAfter(key: string) {
    const index = this.value.findIndex(item => item.key === key)
    if (index === -1) {
      return undefined
    }
    const start = index + 1
    if (start >= this.value.length) {
      return undefined
    }
    return this.value.splice(start, this.value.length - index - 1)
  }
  clear() {
    const value = this.value
    this.value = []
    return value
  }
  get(key: string) {
    return this.value.find(item => item.key === key)?.vnode
  }
}

export const useStack = (() => {
  const stack = new Stack()
  return () => stack
})()
