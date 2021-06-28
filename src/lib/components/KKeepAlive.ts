import { SetupContext, ComponentOptions, VNodeProps } from 'vue';

const KKeepAliveImpl: ComponentOptions = {
  name: `KKeepAlive`,
  __isKeepAlive: true,

  setup(props, { slots }: SetupContext) {
    return () => {};
  },
};

const KKeepAlive = KKeepAliveImpl as any as {
  __isKeepAlive: true;
  new (): {
    $props: VNodeProps;
  };
};

export { KKeepAlive };
