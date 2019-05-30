<template>
  <div class="main-item" :style="styleObject" @click="onClick" @animationend="animationend">
    <div class="icon-wrapper">
      <svg class="icon" aria-hidden="true">
        <use :href="icon"></use>
      </svg>
    </div>
    <div class="content">
      <div class="title"></div>
      <div class="message-wrap">{{item.message}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainItem',
  components: {},
  props: {
    index: {
      type: Number
    },
    item: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      isAnimationend: false
    };
  },
  computed: {
    icon() {
      return '#' + this.item.icon;
    },
    styleObject() {
      return {
        'background-color': this.item.background || '',
        animation: this.isAnimationend ? 'none' : 'show ' + ((this.index + 1) * 0.2 + 0.1) + 's 1'
      };
    }
  },
  watch: {},
  created() {},
  methods: {
    onClick() {
      this.$emit('click');
    },
    animationend() {
      this.isAnimationend = true;
    }
  }
};
</script>

<style lang="scss">
.main-item {
  height: 130px;
  margin: 10px;
  border-radius: 5px;
  position: relative;
  .content {
    height: 100%;
    padding: 5px;
    .title {
      height: 50%;
    }
    .message-wrap {
      line-height: 1.3;
      font-size: 14px;
      color: #333;
    }
  }
  .icon-wrapper {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 50px;
    height: 50px;
    .icon {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
