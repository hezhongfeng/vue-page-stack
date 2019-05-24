<template>
  <div id="app">
    <!-- <transition @before-enter="beforeEnter" @enter="enter" @before-leave="beforeLeave" @leave="leave">
      <vue-stack @stack-back="stackBack" @stack-forward="stackForward">
        <router-view></router-view>
      </vue-stack>
    </transition>-->
    <transition name="no-mode-translate-fade" mode="out-in">
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
      console.log(el);
    },
    enter(el, done) {
      console.log('enter');
      done();
    },
    beforeLeave(el) {
      console.log('beforeLeave');
      console.log(el);
    },
    leave(el, done) {
      console.log('leave');
      done();
    },
    stackBack() {
      // console.log('stackBack');
      // this.direction = 'back';
    },
    stackForward() {
      // console.log('stackForward');
      // this.direction = 'forward';
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

// .fade-enter-active {
//   transition: opacity 2s;
// }
// .fade-enter {
//   opacity: 0;
// }

// .fade-enter {
//   transform: translate(100%, 0);
// }

// .fade-enter-active{
//   transition: transform 0.5s;
// }

// .fade-leave-active {
//   transition: transform 0.5s;
// }

// .fade-leave-to {
//   transform: translate(-100%, 0);
// }

.no-mode-translate-fade-enter-active,
.no-mode-translate-fade-leave-active {
  transition: all 0.3s;
}
.no-mode-translate-fade-enter,
.no-mode-translate-fade-leave-active {
  opacity: 0;
}
.no-mode-translate-fade-enter {
  transform: translateX(31px);
}
.no-mode-translate-fade-leave-active {
  transform: translateX(-31px);
}

// .page-forward-enter {
//   transform: translate(100%, 0);
// }

// .page-forward-enter-active {
//   transition: transform 0.5s;
// }

// .page-forward-leave {
//   transform: translate(0, 0);
//   transition: transform 0.5s;
// }

// .page-forward-leave-to {
//   transform: translate(-100px, 0);
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
