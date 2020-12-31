import { VNode } from 'vue';
export declare type StackItem = {
    key: string;
    vnode: VNode;
};
export declare type StackProps = {
    value?: StackItem[];
};
export declare class Stack {
    private value;
    constructor(props?: StackProps);
    push(item: StackItem): number;
    pop(): StackItem | undefined;
    removeAfter(key: string): StackItem[] | undefined;
    clear(): StackItem[];
    get(key: string): VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }> | undefined;
}
export declare const useStack: () => Stack;
