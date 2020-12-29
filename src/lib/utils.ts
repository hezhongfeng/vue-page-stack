/**
 * 创建一个随机的字符串 key
 *
 * @param len 字符串的长度
 */
export const createKey = (len = 6) => {
  return Math.random()
    .toString(16)
    .substring(2, len + 2)
}

/**
 * 判断值是否为 `null` | `undefined`
 *
 * @param value 值
 */
export const isNil = (value: any) => {
  return value === null || value === undefined
}

/**
 * 判断值是否为 `isNil` |  `空字符串`
 * @param value 值
 */
export const isEmpty = (value: any) => {
  return isNil(value) || value === ''
}

/**
 * 树形数组转为一维数组
 *
 * @param data 数据源
 */
export const flattenArrayTree = <T extends { children?: T[] }>(data: T[]) => {
  return data.reduce((a, b) => {
    a.push(b)
    if (b.children) {
      a.push(...flattenArrayTree(b.children))
    }
    return a
  }, [] as T[])
}

/**
 * 从对象中获取指定集合的值，忽略 null & undefined 值，返回新的对象
 *
 * @param data 数据源
 * @param keys 键集合
 */
export const pick = <T, K extends keyof T>(data?: T, ...keys: K[]) => {
  type PickResult = {
    [P in K]: T[P]
  }

  const result: PickResult = {} as any

  if (!(data && keys)) {
    return result
  }

  for (const key of keys) {
    if (!isNil(data[key])) {
      result[key] = data[key]
    }
  }
  return result
}

export const noop = () => undefined
