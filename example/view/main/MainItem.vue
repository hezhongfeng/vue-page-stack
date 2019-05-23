<template>
  <div class="main-item" :style="styleObject">
    <div class="icon-wrapper">
      <!-- <i class="iconfont" :class="item.icon"></i> -->
      <svg class="icon" aria-hidden="true">
        <use :href="icon"></use>
      </svg>
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
  methods: {}
};
</script>

<style lang="scss">
.main-item {
  height: 120px;
  margin: 10px;
  border-radius: 5px;
  position: relative;
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
