import { PropType, RendererElement, RendererNode, VNode } from 'vue';
import { RouteLocationNormalizedLoaded } from 'vue-router';
export declare const StackRouterView: import("vue").DefineComponent<{
    component: {
        type: PropType<VNode<RendererNode, RendererElement, {
            [key: string]: any;
        }>>;
        default: undefined;
    };
    route: {
        type: PropType<RouteLocationNormalizedLoaded>;
        required: true;
    };
}, () => VNode<RendererNode, RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    component: VNode<RendererNode, RendererElement, {
        [key: string]: any;
    }>;
    route: RouteLocationNormalizedLoaded;
} & {}>, {
    component: VNode<RendererNode, RendererElement, {
        [key: string]: any;
    }>;
}>;
export declare const initComponent: () => void;
