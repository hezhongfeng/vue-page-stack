<template>
  <div class="product-detail" @click="back">{{$route.params.id}}</div>
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
  height: 300px;
  margin: 10px;
  background-color: antiquewhite;
  text-align: center;
  line-height: 150px;
}
</style>
