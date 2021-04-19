<template>
  <!-- <router-view>
    <keep-alive> </keep-alive>
  </router-view> -->

  <!-- <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view> -->

  <router-view v-slot="{ Component }">
    <vue-page-stack>
      <component :is="Component" />
    </vue-page-stack>
  </router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  components: {},
});
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  position: relative;
  height: 100%;
}
</style>
