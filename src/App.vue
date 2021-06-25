<template>
  <!-- <router-view v-slot="{ Component }" :key="$route.fullPath">
    <vue-page-stack>
      <transition name="forward">
        <component :is="Component" />
      </transition>
    </vue-page-stack>
  </router-view> -->

  <!-- <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <keep-alive>
        <component :is="Component" :key="$route.fullPath"></component>
      </keep-alive>
    </transition>
  </router-view> -->

  <!-- <router-view v-slot="{ Component }">
    <transition>
      <keep-alive>
        <component :is="Component"></component>
      </keep-alive>
    </transition>
  </router-view> -->

  <!-- <router-view v-slot="{ Component }">
    <transition>
      <vue-page-stack>
        <component :is="Component"></component>
      </vue-page-stack>
    </transition>
  </router-view> -->

  <!-- <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component"></component>
      </keep-alive>
  </router-view> -->

  <!-- <router-view v-slot="{ Component }">
    <vue-page-stack>
      <component :is="Component"></component>
    </vue-page-stack>
  </router-view> -->

  <!-- <router-view v-slot="{ Component }">
    <vue-page-stack>
      <component :is="Component" :key="$route.fullPath"></component>
    </vue-page-stack>
  </router-view> -->

  <!-- <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <vue-page-stack>
        <component :is="Component" :key="$route.fullPath"></component>
      </vue-page-stack>
    </transition>
  </router-view> -->

  <transition name="fade" mode="out-in">
    <router-view v-slot="{ Component }">
      <vue-page-stack>
        <component :is="Component" :key="$route.fullPath" />
      </vue-page-stack>
    </router-view>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  components: {},
});
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  position: relative;
  height: 100%;
  // .router-view-c {
  //   position: absolute;
  //   transition: opacity 0.5s, transform 0.5s;
  //   width: 100%;
  // }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.35s ease;
  }

  .fade-enter-from,
  .fade-leave-active {
    opacity: 0;
  }
}
</style>
