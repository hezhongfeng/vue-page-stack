<template>
  <div class="c-home">
    <div class="h-body">
      <main-list v-show="selectedIndex === '0'"></main-list>
      <about v-show="selectedIndex === '1'"></about>
    </div>
    <div class="h-tabbars">
      <van-tabbar v-model="selectedIndex">
        <van-tabbar-item v-for="item in tabs" :name="item.value" :key="item.value" :icon="item.icon">{{
          item.label
        }}</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script setup>
import { ref, onActivated, computed } from 'vue';
import { useRoute, onBeforeRouteUpdate } from 'vue-router';
import { useI18n } from 'vue-i18n';
import MainList from '../main/MainList.vue';
import About from '../about/About.vue';

const route = useRoute();

const selectedIndex = ref('0');

const { t } = useI18n();

onActivated(() => {
  console.log('Home activated');
});

onBeforeRouteUpdate(to => {
  console.log('beforeRouteUpdate');
  selectedIndex.value = to.params.tab;
});

const tabs = computed(() => {
  return [
    {
      value: '0',
      label: t('home'),
      icon: selectedIndex.value === '0' ? 'wap-home' : 'wap-home-o'
    },
    {
      value: '1',
      label: t('about'),
      icon: selectedIndex.value === '1' ? 'manager' : 'manager-o'
    }
  ];
});

console.log('Home created');
selectedIndex.value = route.params.tab || '0';
</script>

<style lang="scss">
.c-home {
  height: 100%;
  .h-body {
    height: calc(100% - 50px);
  }
}
</style>
