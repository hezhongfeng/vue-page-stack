<template>
  <div class="about">
    <h1>This is an about page</h1>
    <router-link to="/hello">Hello</router-link>
  </div>
</template>

<script>
import { onMounted, onUnmounted } from 'vue'

export default {
  name: 'About',
  setup() {
    onMounted(() => {
      console.log('About onMounted')
    })

    onUnmounted(() => {
      console.log('About onUnmounted')
    })

    return {}
  }
}
</script>