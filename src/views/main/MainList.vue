<template>
  <div class="main-list">
    <stack-header></stack-header>
    <div ref="scrollViewInstance" class="bs-wrapper">
      <div class="scroll-content">
        <main-item
          v-for="(item, index) in list"
          :key="index"
          :item="item"
          :index="index"
          @click="onClick(item)"
        ></main-item>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import data from '@/utils/data.ts';
import MainItem from './MainItem.vue';
import StackHeader from '@/components/header/StackHeader.vue';
import { defineComponent, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import BScroll from 'better-scroll';

export default defineComponent({
  name: 'MainList',
  components: { StackHeader, MainItem },
  setup: () => {
    const router = useRouter();
    const onClick = item => {
      router.push('/main-detail/' + item.id);
    };
    const list = ref([]);
    setTimeout(() => {
      list.value = data.mainList;
    }, 20);
    const scrollViewInstance = ref<HTMLDivElement | null>(null);
    const scrollInstance = ref<BScroll | null>(null);
    onMounted(() => {
      setTimeout(() => {
        scrollInstance.value = new BScroll(scrollViewInstance.value, {
          click: true,
          scrollY: true,
        });
      }, 100);
    });

    return {
      scrollInstance,
      scrollViewInstance,
      list,
      onClick,
    };
  },
});
</script>

<style lang="scss">
.main-list {
  height: calc(100% - 45px);
  .bs-wrapper {
    height: 500px;
    overflow: hidden;
    position: relative;
  }
}
</style>
