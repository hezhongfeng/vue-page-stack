<template>
  <div class="sign-up">
    <cube-button @click="onSignup">注册</cube-button>
  </div>
</template>

<script>
export default {
  name: 'sign-up',
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    onSignup() {
      this.$router.go(-2);
    }
  }
};
</script>

<style lang="scss">
.sign-up {
}
</style>
