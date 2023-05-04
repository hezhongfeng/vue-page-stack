import { defineComponent } from 'vue';
export const ComponentCache = defineComponent({
  __isKeepAlive: true,
  setup() {
    console.log('VuePageStack setup');
    // const instance = getCurrentInstance();
  }
});
