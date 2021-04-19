<template>
  <div class="main-item" :style="styleObject" @click="onClick" @animationend="animationend">
    <div class="content">
      <div class="message-wrap"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';

export default defineComponent({
  name: 'MainItem',
  props: {
    index: {
      type: Number,
    },
    item: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  setup: (props, ctx) => {
    const isAnimationend = ref(false);
    const styleObject = computed(() => {
      return {
        'background-color': props.item.background || '',
        animation: isAnimationend ? 'none' : 'show ' + ((props.index + 1) * 0.2 + 0.1) + 's 1',
      };
    });
    const onClick = () => {
      ctx.emit('click');
    };
    const animationend = () => {
      isAnimationend = true;
    };
    return {
      onClick,
      animationend,
      styleObject,
    };
  },
});
</script>

<style lang="scss">
.main-item {
  height: 40vw;
  margin: 10px;
  border-radius: 5px;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.4);
  .content {
    height: 100%;
    .message-wrap {
      line-height: 1.5;
      font-size: 15px;
      color: #333;
    }
  }
}
</style>
