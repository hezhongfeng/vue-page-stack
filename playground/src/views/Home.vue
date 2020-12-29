<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <router-link to="/about">About</router-link>
  </div>
</template>

<script>
import { onMounted, onUnmounted } from 'vue'

export default {
  name: 'Home',
  setup() {
    onMounted(() => {
      console.log('Home onMounted')
    })

    onUnmounted(() => {
      console.log('Home onUnmounted')
    })

    return {}
  }
}
</script>
