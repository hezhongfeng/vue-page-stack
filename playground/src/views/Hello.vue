<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <router-link to="/test">Test</router-link>
  </div>
</template>

<script>
import { onMounted, onUnmounted } from 'vue'

export default {
  name: 'Hello',
  setup() {
    onMounted(() => {
      console.log('Hello onMounted')
    })

    onUnmounted(() => {
      console.log('Hello onUnmounted')
    })

    return {}
  }
}
</script>
