<template>
  <div class="step">
    Step
    <input type="text" v-model="text" />
    <router-link to="/">Go to Home</router-link>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const text = ref('');
</script>

<style lang="scss">
.step {
}
</style>
