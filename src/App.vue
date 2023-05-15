<template>
  <router-view v-slot="{ Component }">
    <!-- <keep-alive>
      <component :is="Component" :key="$route.fullPath"></component>
    </keep-alive> -->

    <vue-page-stack>
      <component :is="Component" :key="$route.fullPath"></component>
    </vue-page-stack>
  </router-view>
</template>

<script setup></script>

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
}
</style>
