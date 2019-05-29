<template>
  <div class="my">
    <div class="logo">
      <img src="~@/assets/design/logo.png">
      <div class="package">
        <div class="version">v1.0</div>
        <div class="auther">作者：hezf</div>
      </div>
    </div>
    <div class="desc">Vue组件堆栈管理，一个在移动端Web App使用的，模仿原生App的UI Stack的一个插件。</div>
  </div>
</template>

<script>
export default {
  name: 'My',
  components: {},
  props: {},
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
.my {
  height: 100%;
  // background-image: linear-gradient(-20deg, #b721ff 0%, #21d4fd 100%);
  .logo {
    position: relative;
    img {
      width: 100%;
    }
    .package {
      width: 100%;
      position: absolute;
      display: flex;
      flex-direction: column;
      align-items: center;
      line-height: 1.5;
      top: 55vw;
      font-size: 16px;
      color: rgb(202, 202, 202);
    }
  }
}
</style>
