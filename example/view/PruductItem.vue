<template>
  <div class="product-item">{{productName}}</div>
</template>

<script>
export default {
  name: 'ProductItem',
  components: {},
  props: {
    productName: String
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
  height: 150px;
  margin: 10px;
  background-color: antiquewhite;
  text-align: center;
  line-height: 150px;
}
</style>
