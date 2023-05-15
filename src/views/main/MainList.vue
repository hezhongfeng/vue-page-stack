<template>
  <div class="main-list">
    <div style="height: 45px"></div>
    <div class="scroll" ref="wrapper">
      <div class="scroll-content">
        <main-item
          v-for="(item, index) of list"
          :key="index"
          :item="item"
          :index="index"
          @click="onClick(item)"
        ></main-item>
      </div>
    </div>
    <stack-header title="home"></stack-header>
  </div>
</template>

<script setup>
import BScroll from '@better-scroll/core';
import { ref, onMounted, onActivated } from 'vue';
import { useRouter } from 'vue-router';
import data from '../../utils/data';
import MainItem from './MainItem.vue';
import StackHeader from './StackHeader.vue';

const router = useRouter();

const list = ref([]);

const wrapper = ref(null);

const bs = ref(null);

const onClick = item => {
  router.push('/main-detail/' + item.id);
};
const getList = () => {
  list.value = data.mainList;
};

onMounted(() => {
  bs.value = new BScroll(wrapper.value, {
    click: true,
    wheel: true
  });
});

onActivated(() => {
  console.log('activated');
});

setTimeout(() => {
  getList();

  // 滚动区域动态填满后，需要刷新bs的滚动区域
  setTimeout(() => {
    bs.value.refresh();
  }, 100);
}, 200);
</script>

<style lang="scss">
.main-list {
  height: 100%;
  position: relative;
  .scroll {
    height: calc(100% - 70px);
  }
}
</style>
