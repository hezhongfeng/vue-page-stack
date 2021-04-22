<template>
  <div class="main-list">
    <stack-header></stack-header>
    <div ref="bsView" class="bs-wrapper">
      <!-- 这里必须有一个content包着 -->
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
    const bsView = ref<HTMLDivElement | null>(null);
    onMounted(() => {
      setTimeout(() => {
        new BScroll(bsView.value, {
          scrollY: true,
          click: true,
        });
      }, 100);
    });

    return {
      bsView,
      list,
      onClick,
    };
  },
});
</script>

<style lang="scss">
.main-list {
  height: calc(100vh - 50px);
  .bs-wrapper {
    height: calc(100% - 45px);
    overflow: hidden;
  }
}
</style>
