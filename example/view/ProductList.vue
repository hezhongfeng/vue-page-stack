<template>
  <div class="product-list">
    <product-item @click.native="onClick(item)" v-for="item of productList" :key="item.id" :productName="item.productName"></product-item>
  </div>
</template>

<script>
import ProductItem from './PruductItem';

export default {
  name: 'ProductList',
  components: { ProductItem },
  props: {},
  data() {
    return {
      productList: []
      // productList: [
      //   {
      //     id: '0',
      //     productName: '电脑'
      //   },
      //   {
      //     id: '1',
      //     productName: '篮球'
      //   },
      //   {
      //     id: '2',
      //     productName: '衣服'
      //   },
      //   {
      //     id: '3',
      //     productName: '裤子'
      //   },
      //   {
      //     id: '4',
      //     productName: '鼠标'
      //   },
      //   {
      //     id: '5',
      //     productName: 'SSD'
      //   },
      //   {
      //     id: '6',
      //     productName: '手机'
      //   },
      //   {
      //     id: '7',
      //     productName: '玻璃杯'
      //   },
      //   {
      //     id: '8',
      //     productName: '文学'
      //   },
      //   {
      //     id: '9',
      //     productName: '手办'
      //   }
      // ]
    };
  },
  computed: {},
  watch: {},
  created() {
    console.log('ProductList created');
    this.getList();
  },
  methods: {
    onClick(item) {
      this.$router.push('/item/' + item.id);
    },
    getList() {
      setTimeout(() => {
        this.productList = [
          {
            id: '0',
            productName: '电脑'
          },
          {
            id: '1',
            productName: '篮球'
          },
          {
            id: '2',
            productName: '衣服'
          },
          {
            id: '3',
            productName: '裤子'
          },
          {
            id: '4',
            productName: '鼠标'
          },
          {
            id: '5',
            productName: 'SSD'
          },
          {
            id: '6',
            productName: '手机'
          },
          {
            id: '7',
            productName: '玻璃杯'
          },
          {
            id: '8',
            productName: '文学'
          },
          {
            id: '9',
            productName: '手办'
          }
        ];
      }, 200);
    }
  }
};
</script>

<style lang="scss">
.product-list {
}
</style>
