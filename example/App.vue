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
  font-family: -apple-system, 'Noto Sans', 'Helvetica Neue', Helvetica, 'Nimbus Sans L', Arial, 'Liberation Sans', 'PingFang SC',
    'Hiragino Sans GB', 'Noto Sans CJK SC', 'Source Han Sans SC', 'Source Han Sans CN', 'Microsoft YaHei', 'Wenquanyi Micro Hei',
    'WenQuanYi Zen Hei', 'ST Heiti', SimHei, 'WenQuanYi Zen Hei Sharp', sans-serif;
  position: relative;
  height: 100%;
  // 覆盖掉UI原始style
  .cube-btn {
    border-radius: 5px;
    padding: 15px;
    background: $color-primary;
    margin: 5px 0;
  }
  .cube-input {
    margin: 5px 0;
    input {
      padding: 8px;
    }
  }
  .cube-input_active::after {
    border-color: $color-primary;
    border-radius: 5px;
  }
  @keyframes show {
    0% {
      transform: translateY(70px);
    }

    60% {
      transform: translateY(-60upx);
    }

    100% {
      transform: translateY(0px);
    }
  }
}

.router-view-c {
  position: absolute;
  transition: opacity 0.5s, transform 0.5s;
  width: 100%;
  // background-color: #f1f1f1;
}

.forward-enter,
.back-leave-active {
  opacity: 0.5;
  transform: translateX(100%);
}

.forward-leave-active,
.back-enter {
  opacity: 0.5;
  transform: translateX(-100%);
}
</style>
