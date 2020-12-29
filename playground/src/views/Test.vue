<template>
  <div class="about">
    <h1>============== Test ==============</h1>
    <button @click="$router.back">返回</button>
  </div>
</template>

<script>
import { onMounted, onUnmounted } from 'vue'

export default {
  name: 'Test',
    setup() {
    onMounted(() => {
      console.log('Test onMounted')
    })

    onUnmounted(() => {
      console.log('Test onUnmounted')
    })

    return {}
  }
}
</script>