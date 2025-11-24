<template>
  <div class="sketch-container">
    <p>Vue Sketch #{{ sketchId }} - Loaded at: {{ loadTime }}</p>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const props = defineProps({
  sketchId: {
    type: Number,
    required: true,
  },
});

const loadTime = ref('');

onMounted(() => {
  loadTime.value = new Date().toLocaleTimeString() + ' ' + Math.random().toString(36).substring(7);
  console.log(`Sketch #${props.sketchId} mounted and hydrated!`);
});
</script>

<style scoped>
.sketch-container {
  border: 1px solid #ccc;
  padding: 20px;
  margin: 10px 0;
  background-color: #f0f0f0;
  border-radius: 8px;
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>