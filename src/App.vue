<template>
  <!-- 注意这里的样式是为了实现enter和leave同步进行 -->
  <router-view v-slot="{ Component }" style="position: absolute; width: 100%">
    <!-- <Transition :name="transitionName">
      <vue-page-stack>
        <component :is="Component" :key="route.fullPath"></component>
      </vue-page-stack>
    </Transition> -->

    <!-- <Transition :name="transitionName"> -->
    <vue-page-stack>
      <component :is="Component" :key="route.fullPath"></component>
    </vue-page-stack>
    <!-- </Transition> -->

    <!-- <vue-page-stack>
      <component :is="Component" :key="route.fullPath"></component>
    </vue-page-stack> -->
  </router-view>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
// import { VuePageStack } from './lib/components/VuePageStack.js';
// import VuePageStack from './lib/components/VueStack.vue';

const route = useRoute();

const transitionName = ref('forward');

watch(route, to => {
  transitionName.value = to.params['stack-key-dir'] === 'forward' ? 'forward' : 'back';
});
</script>

<style lang="scss">
:root {
  --van-primary-color: #41b883;
  --van-font-size-md: 16px;
}
#app {
  height: 100%;
  background-color: rgb(247, 247, 250);
  @keyframes show {
    0% {
      transform: translateY(100px);
    }

    60% {
      transform: translateY(-80upx);
    }

    100% {
      transform: translateY(0px);
    }
  }
  .forward-enter-from {
    opacity: 0.5;
    transform: translateX(100%);
  }
  .forward-enter-active {
    transition: opacity 0.5s, transform 0.5s;
  }
  .forward-enter-to {
    opacity: 1;
    transform: translateX(0);
  }

  .forward-leave-from {
    opacity: 1;
    transform: translateX(0);
  }
  .forward-leave-active {
    transition: opacity 0.5s, transform 0.5s;
  }
  .forward-leave-to {
    opacity: 0.5;
    transform: translateX(-100%);
  }
}
</style>
