<template>
  <div class="main-item" :style="styleObject" @click="onClick">
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
    item: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {};
  },
  computed: {
    icon() {
      return '#' + this.item.icon;
    },
    styleObject() {
      return {
        'background-image': this.item.background || ''
      };
    }
  },
  watch: {},
  created() {},
  methods: {
    onClick() {
      this.$emit('click');
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
