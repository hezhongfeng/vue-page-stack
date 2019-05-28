<template>
  <div id="app">
    <transition :name="transitionName">
      <vue-stack>
        <router-view class="router-view-c"></router-view>
      </vue-stack>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      transitionName: 'forward'
    };
  },
  components: {},
  created() {},
  watch: {
    $route(to, from) {
      if (to.params['stack-key-dir'] === 'forward') {
        this.transitionName = 'forward';
      } else {
        this.transitionName = 'back';
      }
    }
  },
  methods: {}
};
</script>
<style lang="scss">
#app {
  position: relative;
  height: 100%;
  // 覆盖掉UI原始style
  .cube-btn {
    border-radius: 5px;
    background: $color-primary;
  }
  .cube-input_active::after {
    border-color: $color-primary;
  }
}

.router-view-c {
  position: absolute;
  transition: opacity 0.5s ease, transform 0.5s ease;
  width: 100%;
}

.forward-enter,
.back-leave-active {
  opacity: 0.2;
  transform: translateX(100%);
}

.forward-leave-active,
.back-enter {
  opacity: 0.2;
  transform: translateX(-100%);
}
</style>
