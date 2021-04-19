<template>
  <div class="main-list">
    <stack-header></stack-header>
    <!-- <cube-scroll ref="scroll0" :data="list"> -->
    <main-item
      v-for="(item, index) in list"
      :key="index"
      :item="item"
      :index="index"
      @click="onClick(item)"
    ></main-item>
    <!-- </cube-scroll> -->
  </div>
</template>

<script lang="ts">
import data from '@/utils/data';
import MainItem from './MainItem.vue';
import StackHeader from '@/components/header/StackHeader.vue';
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'MainList',
  components: { StackHeader, MainItem },
  // created() {
  //   this.getList();
  // },
  // mounted() {
  //   console.log(this.$pageStack.getStack());
  // },
  // activated() {
  //   console.log('activated');
  // },
  setup: () => {
    const router = useRouter();
    const onClick = item => {
      router.push('/main-detail/' + item.id);
    };
    const list = ref([]);
    setTimeout(() => {
      list.value = data.mainList;
    }, 200);

    return {
      list,
      onClick,
    };
  },
});
</script>

<style lang="scss">
.main-list {
  height: calc(100% - 45px);
}
</style>
