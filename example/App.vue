<template>
  <div id="app">
    <transition name="page-forward">
      <vue-stack @stack-back="stackBack" @stack-forward="stackForward">
        <router-view></router-view>
      </vue-stack>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      direction: 'forward'
    };
  },
  computed: {
    transitionName() {
      return 'page-' + this.direction;
    }
  },
  components: {},
  created() {},
  methods: {
    beforeEnter(el) {
      console.log('beforeEnter');
    },
    enter(el, done) {
      console.log('enter');
      done();
    },
    afterEnter() {
      console.log('afterEnter');
    },
    beforeLeave(el) {
      console.log('beforeLeave');
    },
    leave(el, done) {
      console.log('leave');
      done();
    },
    stackBack() {
      // console.log('stackBack');
      this.direction = 'back';
    },
    stackForward() {
      // console.log('stackForward');
      this.direction = 'forward';
    }
  }
};
</script>
<style lang="scss">
#app {
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
// .page-forward-enter {
//   transform: translate(100%, 0);
// }

.page-forward-leave {
  transform: translate(0, 100);
}

.page-forward-leave-active {
  transition: transform 0.3s;
}

// .page-forward-enter-active {
//   transition: transform 0.3s;
// }

// .page-back-enter {
//   transform: translate(-100%, 0);
// }
// .page-back-leave-active {
//   transform: translate(100%, 0);
//   transition: transform 0.3s;
// }
// .page-back-enter-active {
//   transition: transform 0.3s;
// }
</style>
