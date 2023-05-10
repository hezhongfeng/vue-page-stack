<template>
  <div class="main-item" :style="styleObject" @click="onClick" @animationend="animationend">
    <div class="content">
      <div class="message-wrap"></div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
  index: {
    type: Number
  },
  item: {
    type: Object,
    default() {
      return {};
    }
  }
});

const emit = defineEmits(['click']);

const isAnimationend = ref(false);

const styleObject = computed(() => {
  return {
    'background-color': props.item.background || '',
    animation: isAnimationend.value ? 'none' : 'show ' + ((props.index + 1) * 0.2 + 0.1) + 's 1'
  };
});

const onClick = () => {
  emit('click');
};
const animationend = () => {
  isAnimationend.value = true;
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
