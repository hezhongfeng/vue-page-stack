<template>
  <div class="product-detail">
    <div class="p-image">
      <img src="https://m.360buyimg.com/mobilecms/s750x750_jfs/t1/21878/9/2966/167543/5c231e4fE1817c631/0fb5eb90a6cb7066.jpg!q80.dpg.webp">
    </div>
    <cube-button :primary="true">购买</cube-button>
    <cube-button :primary="true" @click="back">返回</cube-button>
  </div>
</template>

<script>
export default {
  name: 'ProductDetail',
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {
    console.log('ProductDetail created');
  },
  mounted() {
    console.log('ProductDetail mounted');
  },
  methods: {
    back() {
      this.$router.back();
    }
  }
};
</script>

<style lang="scss">
.product-detail {
  width: 100%;
  .p-image {
    width: 100%;
    img {
      width: 100%;
    }
  }
}
</style>
