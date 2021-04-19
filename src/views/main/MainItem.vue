<template>
  <div class="main-item" :style="styleObject" @click="onClick" @animationend="animationend">
    <div class="content">
      <div class="message-wrap"></div>
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
  height: 40vw;
  margin: 10px;
  border-radius: 5px;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.4);
  .content {
    height: 100%;
    .message-wrap {
      line-height: 1.5;
      font-size: 15px;
      color: #333;
    }
  }
}
</style>
