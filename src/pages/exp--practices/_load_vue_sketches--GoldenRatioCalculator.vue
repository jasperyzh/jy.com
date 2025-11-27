<!--
This is the template section, which contains the HTML structure of the component.
We've made the following changes from the original HTML:
1.  The `h1`'s content is now bound to the `title` ref in the script.
2.  The hardcoded result divs are replaced with `v-for` loops that iterate over the `largerResults` and `smallerResults` computed properties. This makes the display dynamic and reactive.
3.  The input field now uses `v-model="inputValue"` for two-way data binding. This means any change in the input field updates the `inputValue` ref, and any change to the ref updates the input field.
-->
<template>
  <div class="calculator">
    <h1 class="title">{{ title }}</h1>
    <div class="results-container">
      <div id="results-larger">
        <!-- Loop through the computed `largerResults` array and display each formatted number. -->
        <div v-for="(result, index) in largerResults" :key="`larger-${index}`" class="result-item">
          {{ formatNumber(result) }}
        </div>
      </div>
      <!-- Bind the input field to the `inputValue` ref. The `.number` modifier ensures the value is treated as a number. -->
      <input type="number" v-model.number="inputValue" class="input-field" />
      <div id="results-smaller">
        <!-- Loop through the computed `smallerResults` array and display each formatted number. -->
        <div v-for="(result, index) in smallerResults" :key="`smaller-${index}`" class="result-item">
          {{ formatNumber(result) }}
        </div>
      </div>
    </div>
  </div>
</template>

<!-- The `scoped` attribute ensures that these styles only apply to this component. -->
<style scoped>
:root {
  --background-color: #f0f0f0;
  --text-color: #333;
  --input-bg-color: #fff;
  --input-border-color: #ccc;
  --result-text-color: #555;
}

main {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: var(--background-color);
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial,
    sans-serif;
  color: var(--text-color);
  text-align: center;
}

.calculator {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.title {
  font-size: 1.5rem;
  font-weight: 300;
  color: var(--result-text-color);
}

.results-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.input-field {
  font-size: 1.5rem;
  padding: 0.75rem 1rem;
  border: 1px solid var(--input-border-color);
  border-radius: 8px;
  width: 200px;
  text-align: center;
  background-color: var(--input-bg-color);
  color: var(--text-color);
  -moz-appearance: textfield; /* Firefox */
}

.input-field::-webkit-outer-spin-button,
.input-field::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

#results-larger,
#results-smaller {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

#results-larger {
  /* To show larger numbers on top */
  flex-direction: column-reverse;
}

.result-item {
  font-size: 1.25rem;
  color: var(--result-text-color);
  min-height: 1.5em; /* Reserve space to prevent layout shifts */
}
</style>

<!--
This script section uses Vue 3's Composition API with the `<script setup>` syntax.
This approach is more efficient and readable than the old vanilla JavaScript DOM manipulation.
-->
<script setup>
// STEP 1: Import necessary functions from Vue.
// `ref` is used to create reactive variables.
// `computed` is used to create properties that automatically update when their dependencies change.
import { ref, computed } from 'vue';

// STEP 2: Define constants and reactive state.
// The golden ratio constant.
const PHI = 1.61803398875;
// A reactive variable for the component's title.
const title = ref("Golden Ratio Calculator");
// A reactive variable to hold the value of the input field. We initialize it with 118.
// This replaces `document.getElementById('input')`.
const inputValue = ref(118);

// STEP 3: Create computed properties for the results.
// These properties will automatically recalculate whenever `inputValue` changes.
// This is the core of Vue's reactivity and replaces the need for event listeners and manual DOM updates.

// A computed property to calculate the larger numbers.
const largerResults = computed(() => {
  // If the input is not a valid positive number, return an empty array.
  if (isNaN(inputValue.value) || inputValue.value <= 0) {
    return Array(2).fill(''); // Return an array of empty strings to maintain layout spacing
  }
  
  const results = [];
  let currentValue = inputValue.value;
  // We calculate 2 larger values.
  for (let i = 0; i < 2; i++) {
    currentValue *= PHI;
    results.push(currentValue);
  }
  return results;
});

// A computed property to calculate the smaller numbers.
const smallerResults = computed(() => {
  // If the input is not a valid positive number, return an empty array.
  if (isNaN(inputValue.value) || inputValue.value <= 0) {
    return Array(5).fill(''); // Return an array of empty strings
  }

  const results = [];
  let currentValue = inputValue.value;
  // We calculate 5 smaller values.
  for (let i = 0; i < 5; i++) {
    currentValue /= PHI;
    results.push(currentValue);
  }
  return results;
});

// STEP 4: Define helper functions.
// This function formats the numbers for display, same as the original.
function formatNumber(num) {
  if (typeof num !== 'number') return ''; // Return empty string if not a number
  // Show more precision for smaller numbers, less for larger ones
  if (num < 1) return num.toFixed(4);
  if (num < 1000) return num.toFixed(3);
  return num.toFixed(2);
}

// No need for `onMounted` or event listeners like `inputEl.addEventListener("input", ...)`
// because Vue's reactivity system handles all the updates automatically.
</script>