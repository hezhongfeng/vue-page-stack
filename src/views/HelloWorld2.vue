<template>
  <button @click="count++">count is: {{ count }}</button>
  2222222
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
export default defineComponent({
  name: 'HelloWorld',
  props: {},
  setup: () => {
    const count = ref(0);
    return { count };
  },
});
</script>

<style lang="postcss">
.ppp {
  color: aquamarine;
}
</style>
