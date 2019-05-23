<template>
  <div class="login">
    <stack-header :title="$route.meta.title"></stack-header>
    <cube-textarea v-model="textValue" placeholder="输入必要信息区分重新渲染"></cube-textarea>
    <cube-button @click="onLogin">登录</cube-button>
  </div>
</template>

<script>
import StackHeader from '@/components/header/StackHeader.vue';

export default {
  name: 'login',
  components: { StackHeader },
  props: {},
  data() {
    return { textValue: '' };
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    onLogin() {
      this.$router.back();
    }
  }
};
</script>

<style lang="scss">
.login {
}
</style>
