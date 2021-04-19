<template>
  <header class="stack-header">
    <div class="h-left">
      <slot name="h-left">
        <i @click="onBack" class="iconfont iconfanhui"></i>
      </slot>
    </div>
    <div class="h-title">{{ title }}</div>
    <div class="h-right">
      <slot name="h-right">
        <i @click="onForward" class="iconfont iconqianjin2"></i>
      </slot>
    </div>
  </header>
</template>

<script>
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'StackHeader',
  props: {
    title: {
      type: String,
      default: 'vue-page-stack',
      required: false,
    },
  },
  // watch: {
  //   title: {
  //     handler: function (title) {
  //       window.document.title = title;
  //     },
  //     immediate: true,
  //   },
  // },
  setup: () => {
    const router = useRouter();
    const onBack = () => {
      router.back();
    };
    const onForward = () => {
      router.forward();
    };
    return {
      onBack,
      onForward,
    };
  },
});
</script>

<style lang="scss">
.stack-header {
  height: 45px;
  line-height: 44px;
  width: 100%;
  text-align: center;
  background-color: #fff;
  border-bottom: #e5e5e5 1px solid;
  > .h-title {
    font-size: 18px;
    color: #5b5a67;
  }
  > .h-left {
    position: absolute;
    top: 0;
    left: 0;
    height: 44px;
    font-size: 16px;
    .iconfont {
      padding: 0 15px;
      color: #5b5a67;
    }
  }
  > .h-right {
    position: absolute;
    top: 0;
    right: 0;
    height: 44px;
    i {
      font-size: 16px;
      color: #a3a3a3;
    }
    font-size: 16px;
    color: #ccc;
    padding-right: 10px;
    display: flex;
  }
}
</style>
