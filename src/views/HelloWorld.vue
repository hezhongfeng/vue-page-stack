<template>
  <van-button @click="onBack" color="#7232dd">回去</van-button>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import { useRouter, useRoute } from 'vue-router';
export default defineComponent({
  name: 'HelloWorld',
  props: {},
  setup: () => {
    const router = useRouter();
    const onBack = () => {
      router.back();
    };
    return { onBack };
  },
});
</script>

<style lang="scss">
.ppp {
  color: aquamarine;
}
</style>
