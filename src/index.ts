const VuePageStackPlugin = {
  install(Vue: any): void {
    Vue.prototype.$pageStack = (str: string): string => {
      return str;
    };
  },
};

export default VuePageStackPlugin;
