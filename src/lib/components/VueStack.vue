<template>
  <VuePageStack>
    <transition name="forward"> {{ $slots.default() }} </transition>
  </VuePageStack>
</template>

<script setup>
import { useSlots } from 'vue';
import { VuePageStack } from './KeepPageStack3.3.2.js';

const slots = useSlots();

console.log(slots.default().data[0]);
</script>

<style lang="scss">
.vue-stack {
}
</style>
