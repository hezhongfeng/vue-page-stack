<template>
  <div class="product-detail">
    <stack-header :title="$route.meta.title"></stack-header>
    <div class="p-scroll-wrap">
      <cube-scroll ref="scroll">
        <div class></div>
        <cube-textarea v-model="textValue" placeholder="输入必要信息"></cube-textarea>
        <cube-button @click="onPush">Push</cube-button>
        <cube-button @click="onReplace">Replace</cube-button>
        <cube-button @click="onLogin">登录</cube-button>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
import StackHeader from '@/components/header/StackHeader.vue';

export default {
  name: 'ProductDetail',
  components: { StackHeader },
  props: {},
  data() {
    return {
      textValue: ''
    };
  },
  computed: {},
  watch: {},
  created() {
    console.log(this.$route);
    console.log('ProductDetail created');
  },
  mounted() {
    console.log('ProductDetail mounted');
  },
  methods: {
    back() {
      this.$router.back();
    },
    onLogin() {
      this.$router.push('/login');
    },
    onReplace() {
      this.$router.replace(this.$route.path);
    },
    onPush() {
      this.$router.push(this.$route.path);
    }
  }
};
</script>

<style lang="scss">
.product-detail {
  height: 100%;
  background: #e8e8ed;
  .p-scroll-wrap {
    height: calc(100% - 45px);
    .cube-btn {
      border-radius: 0;
    }
  }
}
</style>
