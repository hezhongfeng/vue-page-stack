interface Option {
    router: any;
    name: string;
    keyName: string;
}
declare const VuePageStackPlugin: {
    install(Vue: any, { router, name, keyName }: Option): void;
};
export default VuePageStackPlugin;
