<template>
  <van-button type="primary" to="about">路由跳转</van-button>
  <van-field v-model="value" label="文本" placeholder="请输入用户名" />
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
export default defineComponent({
  name: 'HelloWorld',
  props: {},
  setup: () => {
    const value = ref('');

    return { value };
  },
});
</script>

<style lang="scss">
.ppp {
  color: aquamarine;
}
</style>
