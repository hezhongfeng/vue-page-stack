<template>
  <div class="product-item">
    <div class="wrapper">
      <div class="left">
        <img :src="product.img">
      </div>
      <div class="right">
        <div class="name">{{product.name}}</div>
        <div class="price">{{product.price}}</div>
        <div class="shop"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductItem',
  components: {},
  props: {
    product: Object
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  methods: {}
};
</script>

<style lang="scss">
.product-item {
  padding: 3px 0 2px;
  .wrapper {
    height: 120px;
    display: flex;
    .left {
      width: 120px;
      height: 120px;
      img {
        width: 100%;
      }
    }
    .right {
      padding: 0 8px 10px 10px;
      width: calc(100% - 120px);
      border-bottom: 1px #e5e5e5 solid;
      .name {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        height: 38px;
        word-break: break-all;
        margin-top: 8px;
        color: #333;
        line-height: 1.36;
        font-size: 14px;
      }
      .price {
        margin-top: 9px;
        height: 18px;
        color: #e93b3d;
      }
    }
  }
}
</style>
