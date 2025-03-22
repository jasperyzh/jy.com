<template>
  <div class="storage-switcher mb-4 p-4 bg-gray-100 rounded-lg">
    <h3 class="text-lg font-medium mb-2">Storage Mode</h3>
    <div class="flex space-x-4">
      <label class="inline-flex items-center">
        <input 
          type="radio" 
          name="storage" 
          :value="false" 
          v-model="useSqlite"
          class="h-4 w-4 text-blue-600"
        />
        <span class="ml-2">localStorage</span>
      </label>
      <label class="inline-flex items-center">
        <input 
          type="radio" 
          name="storage" 
          :value="true" 
          v-model="useSqlite"
          class="h-4 w-4 text-blue-600"
        />
        <span class="ml-2">API (SQLite)</span>
      </label>
    </div>
    <p class="mt-2 text-sm text-gray-600">
      {{ useSqlite ? 
        'Using server API with SQLite backend' : 
        'Using localStorage for browser-based storage' 
      }}
    </p>
    <p v-if="useSqlite && isPreview" class="mt-2 text-xs text-amber-600">
      Note: SQLite mode requires Astro's SSR enabled. If you're seeing errors, you may be in static mode.
    </p>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { useStorageStore } from '../../stores/storage';

const storageStore = useStorageStore();
const useSqlite = ref(storageStore.useSqlite);

// Check if we're in a static build (preview) where SQLite won't work
const isPreview = computed(() => {
  return import.meta.env.DEV && window.location.hostname === 'localhost';
});

// Watch for changes and update the store
watch(useSqlite, (newValue) => {
  try {
    storageStore.setStorageType(newValue);
  } catch (err) {
    console.error('Error switching storage type:', err);
    // Revert back if there was an error
    useSqlite.value = false;
    storageStore.setStorageType(false);
  }
});
</script>
