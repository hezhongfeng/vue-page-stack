<template>
  <div class="product-item">
    <div class="wrapper">
      <div class="left">
        <img :src="product.img">
      </div>
      <div class="right">
        <div class="name">{{product.name}}</div>
        <div class="price">
          {{product.price}}
          <img :src="tag" v-for="(tag,index) of product.tags" :key="index">
        </div>
        <div class="comment">
          <div class="comment-tags">
            <img :src="tag" v-for="(tag,index) of product.commentTags" :key="index">
          </div>
          <div class="content">{{product.comment}}</div>
        </div>
        <div class="shop">{{product.shopName}}</div>
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
      padding: 0 8px 10px 8px;
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
        height: 20px;
        line-height: 20px;
        font-size: 18px;
        color: #e93b3d;
        img {
          height: 16px;
          margin-right: 5px;
        }
      }
      .comment {
        margin-top: 5px;
        font-size: 12px;
        color: #999;
        display: flex;
        .comment-tags {
          display: flex;
          img {
            height: 14px;
            margin-right: 3px;
          }
        }
      }
      .shop {
        position: relative;
        display: inline-block;
        padding-right: 14px;
        line-height: 14px;
        max-width: 100%;
        box-sizing: border-box;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #999;
        font-size: 12px;
      }
    }
  }
}
</style>
