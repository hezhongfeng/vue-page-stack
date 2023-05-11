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
}
</style>
