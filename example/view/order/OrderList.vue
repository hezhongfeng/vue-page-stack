<template>
  <div class="order-list">
    <cube-scroll ref="scroll" :data="list">
      <div class="order-item" v-for="(item, index) in list" :key="index">
        <img :src="item.src">
      </div>
    </cube-scroll>
  </div>
</template>

<script>
import data from '@/utils/data';

export default {
  name: 'OrderList',
  components: {},
  props: {},
  data() {
    return {
      list: []
    };
  },
  computed: {},
  watch: {},
  created() {
    this.list = data.orderList;
  },
  methods: {}
};
</script>

<style lang="scss">
.order-list {
  height: 100%;
  padding: 5px;
  .order-item {
    height: 80vw;
    img {
      width: 100%;
    }
    &:not(:first-child) {
      padding-top: 5px;
    }
  }
}
</style>
