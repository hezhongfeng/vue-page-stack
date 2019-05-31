<template>
  <div class="main-list">
    <stack-header></stack-header>
    <cube-scroll ref="scroll" :data="list">
      <main-item v-for="(item, index) in list" :key="index" :item="item" :index="index" @click="onClick(item)"></main-item>
    </cube-scroll>
  </div>
</template>

<script>
import data from '@/utils/data';
import MainItem from './MainItem';
import StackHeader from '@/components/header/StackHeader.vue';

export default {
  name: 'ProductList',
  components: { MainItem, StackHeader },
  props: {},
  data() {
    return {
      list: []
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getList();
  },
  activated() {
    console.log('activated');
  },
  methods: {
    onClick(item) {
      this.$router.push('/main-detail/' + item.id);
    },
    getList() {
      setTimeout(() => {
        this.list = data.mainList;
      }, 200);
    }
  }
};
</script>

<style lang="scss">
.main-list {
  height: 100%;
}
</style>
