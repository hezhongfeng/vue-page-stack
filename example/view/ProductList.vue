<template>
  <div class="product-list">
    <product-item @click.native="onClick(item)" v-for="item of productList" :key="item.id" :product="item"></product-item>
  </div>
</template>

<script>
import ProductItem from './PruductItem';
import data from '../utils/data';

export default {
  name: 'ProductList',
  components: { ProductItem },
  props: {},
  data() {
    return {
      productList: []
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
      this.$router.push('/item/' + item.id);
    },
    getList() {
      setTimeout(() => {
        this.productList = data.productList;
      }, 200);
    }
  }
};
</script>

<style lang="scss">
.product-list {
  height: 100%;
  overflow-y: auto;
}
</style>
