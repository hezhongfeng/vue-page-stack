/**
 * 创建一个随机的字符串 key
 *
 * @param len 字符串的长度
 */
export declare const createKey: (len?: number) => string;
/**
 * 判断值是否为 `null` | `undefined`
 *
 * @param value 值
 */
export declare const isNil: (value: any) => boolean;
/**
 * 判断值是否为 `isNil` |  `空字符串`
 * @param value 值
 */
export declare const isEmpty: (value: any) => boolean;
/**
 * 树形数组转为一维数组
 *
 * @param data 数据源
 */
export declare const flattenArrayTree: <T extends {
    children?: T[] | undefined;
}>(data: T[]) => T[];
/**
 * 从对象中获取指定集合的值，忽略 null & undefined 值，返回新的对象
 *
 * @param data 数据源
 * @param keys 键集合
 */
export declare const pick: <T, K extends keyof T>(data?: T | undefined, ...keys: K[]) => { [P in K]: T[P]; };
export declare const noop: () => undefined;
