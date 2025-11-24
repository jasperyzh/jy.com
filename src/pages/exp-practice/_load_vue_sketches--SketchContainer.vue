
<template>
  <div class="card--">
    <div v-for="sketch in sketches" :key="sketch.id" class="sketch-wrapper">
      <GoldenRatioSketch v-if="sketch.type === 'sketch'" :sketchId="sketch.id" />
      <GoldenRatioCalculator v-else-if="sketch.type === 'calculator'" />
    </div>

    <button
      @click="loadMore"
      :disabled="loading || noMore"
      class="load-more-btn"
    >
      {{ loading ? 'Loading...' : noMore ? 'No More Sketches' : 'Load More Sketches' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, markRaw } from 'vue';
import GoldenRatioSketch from './_load_vue_sketches--GoldenRatioSketch.vue';
import GoldenRatioCalculator from './_load_vue_sketches--GoldenRatioCalculator.vue';

// Map of component types to actual components
const componentMap = {
  sketch: markRaw(GoldenRatioSketch),
  calculator: markRaw(GoldenRatioCalculator),
};

// Accept initial sketches as props
const props = defineProps<{
  initialSketches: Array<{ id: number; type: keyof typeof componentMap }>;
}>();

// State
const sketches = ref([...props.initialSketches]);
const loading = ref(false);
const noMore = ref(false);
let nextIndex = sketches.value.length;

const loadMore = async () => {
  loading.value = true;

  try {
    const response = await fetch(`./api--get_sketches.json?start=${nextIndex}&count=3`);
    const newSketches = await response.json();

    if (newSketches.length === 0) {
      noMore.value = true;
    } else {
      sketches.value.push(...newSketches);
      nextIndex += newSketches.length;
    }
  } catch (error) {
    console.error('Failed to load more sketches:', error);
  } finally {
    loading.value = false;
  }
};
</script>


<style scoped>
.load-more-btn:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
