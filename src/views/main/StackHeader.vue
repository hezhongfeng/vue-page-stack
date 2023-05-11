<template>
  <header class="stack-header">
    <div class="h-left">
      <van-icon @click="onBack" size="20" name="arrow-left" />
    </div>
    <h1>{{ title }}</h1>
    <div class="h-right">
      <van-icon @click="onForward" size="20" name="arrow" />
    </div>
  </header>
</template>

<script setup>
import { watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const props = defineProps({
  title: {
    type: String,
    default: '',
    required: false
  }
});

const emit = defineEmits(['back', 'forward']);

watch(
  () => {
    return props.title;
  },
  title => {
    window.document.title = title;
  },
  { immediate: true }
);

const onBack = () => {
  router.back();
  emit('back');
};
const onForward = () => {
  router.forward();
  emit('forward');
};
</script>

<style lang="scss">
.stack-header {
  height: 45px;
  line-height: 44px;
  width: 100%;
  text-align: center;
  background-color: #fff;
  border-bottom: #e5e5e5 1px solid;
  position: relative;
  > h1 {
    font-size: 20px;
    color: #5b5a67;
    margin: 0;
  }

  > .h-left {
    position: absolute;
    top: 0;
    left: 0;
    height: 44px;
    font-size: 16px;
    padding-left: 10px;
    color: #5b5a67;
  }

  > .h-right {
    position: absolute;
    top: 0;
    right: 0;
    height: 44px;
    font-size: 16px;
    padding-right: 10px;
    color: #5b5a67;
  }
}
</style>
