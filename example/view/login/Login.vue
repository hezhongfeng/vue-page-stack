<template>
  <div class="login">
    <cube-button @click="onLogin">登录</cube-button>
  </div>
</template>

<script>
export default {
  name: 'login',
  components: {},
  props: {},
  data() {
    return {};
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
