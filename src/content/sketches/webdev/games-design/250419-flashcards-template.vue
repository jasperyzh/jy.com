<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  flashcards: {
    type: Array,
    required: true
  }
});

const currentIndex = ref(0);
const isFlipped = ref(false);
const showFilters = ref(false);
const selectedTags = ref([]);
const searchQuery = ref('');

// Get all unique tags from all flashcards
const allTags = computed(() => {
  const tags = new Set();
  props.flashcards.forEach(card => {
    if (card.tags) {
      card.tags.forEach(tag => tags.add(tag));
    }
  });
  return Array.from(tags).sort();
});

// Filter flashcards based on tags and search
const filteredFlashcards = computed(() => {
  return props.flashcards.filter(card => {
    // Tag filter
    if (selectedTags.value.length > 0) {
      const hasSelectedTag = card.tags?.some(tag => 
        selectedTags.value.includes(tag));
      if (!hasSelectedTag) return false;
    }
    
    // Search filter
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase();
      return card.term.toLowerCase().includes(query) || 
             card.definition.toLowerCase().includes(query);
    }
    
    return true;
  });
});

// Current card with safety check
const currentCard = computed(() => {
  if (filteredFlashcards.value.length === 0) return null;
  
  // Reset index if it's out of bounds after filtering
  if (currentIndex.value >= filteredFlashcards.value.length) {
    currentIndex.value = 0;
  }
  
  return filteredFlashcards.value[currentIndex.value];
});

// Navigation methods
function nextCard() {
  if (filteredFlashcards.value.length === 0) return;
  isFlipped.value = false;
  currentIndex.value = (currentIndex.value + 1) % filteredFlashcards.value.length;
}

function prevCard() {
  if (filteredFlashcards.value.length === 0) return;
  isFlipped.value = false;
  currentIndex.value = (currentIndex.value - 1 + filteredFlashcards.value.length) % filteredFlashcards.value.length;
}

function flipCard() {
  isFlipped.value = !isFlipped.value;
}

function toggleTag(tag) {
  if (selectedTags.value.includes(tag)) {
    selectedTags.value = selectedTags.value.filter(t => t !== tag);
  } else {
    selectedTags.value.push(tag);
  }
}

function resetFilters() {
  selectedTags.value = [];
  searchQuery.value = '';
}
</script>

<template>
  <div class="flashcards-container">
    <!-- Search and filter controls -->
    <div class="controls bg-slate-100 p-4 rounded-lg mb-6">
      <div class="search-box mb-4">
        <input 
          v-model="searchQuery"
          type="text" 
          placeholder="Search flashcards..." 
          class="w-full p-2 border rounded"
        />
      </div>
      
      <div class="filter-section">
        <button 
          @click="showFilters = !showFilters" 
          class="text-sm bg-slate-200 px-3 py-1 rounded mb-2"
        >
          {{ showFilters ? 'Hide Filters' : 'Show Filters' }}
        </button>
        
        <div v-if="showFilters" class="tags-container">
          <div class="mb-2 font-medium">Filter by tag:</div>
          <div class="flex flex-wrap gap-2">
            <button 
              v-for="tag in allTags" 
              :key="tag"
              @click="toggleTag(tag)"
              class="text-xs px-2 py-1 rounded-full"
              :class="selectedTags.includes(tag) 
                ? 'bg-blue-500 text-white' 
                : 'bg-slate-200 text-slate-700'"
            >
              {{ tag }}
            </button>
          </div>
          <button 
            @click="resetFilters" 
            class="text-xs text-blue-600 mt-2"
            v-if="selectedTags.length > 0 || searchQuery"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
    
    <!-- Flashcard display -->
    <div v-if="currentCard" class="flashcard-wrapper">
      <!-- Card counter -->
      <div class="text-sm text-center mb-2 text-slate-500">
        Card {{ currentIndex + 1 }} of {{ filteredFlashcards.length }}
      </div>
      
      <!-- Actual flashcard -->
      <div 
        @click="flipCard" 
        class="flashcard cursor-pointer"
        :class="{'flipped': isFlipped}"
      >
        <div class="flashcard-inner">
          <!-- Front side (Term) -->
          <div class="flashcard-front p-6 bg-white rounded-lg shadow-md">
            <h2 class="text-xl font-bold mb-4">{{ currentCard.term }}</h2>
            <p class="text-sm text-slate-500 mt-4">Click to reveal definition</p>
            
            <!-- Tags -->
            <div class="mt-4 flex flex-wrap gap-1" v-if="currentCard.tags">
              <span 
                v-for="tag in currentCard.tags" 
                :key="tag" 
                class="text-xs bg-slate-100 px-2 py-0.5 rounded-full text-slate-600"
              >
                {{ tag }}
              </span>
            </div>
          </div>
          
          <!-- Back side (Definition) -->
          <div class="flashcard-back p-6 bg-white rounded-lg shadow-md">
            <h3 class="text-lg font-medium mb-4">Definition:</h3>
            <p class="text-base mb-4">{{ currentCard.definition }}</p>
            
            <!-- Example section -->
            <div v-if="currentCard.example" class="mt-4">
              <h4 class="text-sm font-medium text-slate-700">Example:</h4>
              <p class="text-sm italic">{{ currentCard.example }}</p>
            </div>
            
            <!-- Notes section -->
            <div v-if="currentCard.notes" class="mt-4">
              <h4 class="text-sm font-medium text-slate-700">Notes:</h4>
              <p class="text-sm">{{ currentCard.notes }}</p>
            </div>
            
            <!-- Related concepts -->
            <div v-if="currentCard.related_concepts && currentCard.related_concepts.length > 0" class="mt-4">
              <h4 class="text-sm font-medium text-slate-700">Related concepts:</h4>
              <div class="flex flex-wrap gap-1 mt-1">
                <span 
                  v-for="concept in currentCard.related_concepts" 
                  :key="concept" 
                  class="text-xs bg-blue-50 px-2 py-0.5 rounded-full text-blue-700"
                >
                  {{ concept }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Navigation buttons -->
      <div class="navigation-buttons flex justify-between mt-6">
        <button 
          @click="prevCard" 
          class="bg-slate-200 px-4 py-2 rounded hover:bg-slate-300"
        >
          Previous
        </button>
        <button 
          @click="nextCard" 
          class="bg-slate-200 px-4 py-2 rounded hover:bg-slate-300"
        >
          Next
        </button>
      </div>
    </div>
    
    <!-- Empty state -->
    <div v-else class="empty-state p-6 bg-slate-100 rounded-lg text-center">
      <p class="text-slate-600">No flashcards match your filters.</p>
      <button 
        @click="resetFilters" 
        class="mt-2 text-blue-600 underline"
      >
        Reset Filters
      </button>
    </div>
  </div>
</template>

<style scoped>
.flashcards-container {
  max-width: 800px;
  margin: 0 auto;
}

.flashcard {
  perspective: 1000px;
  height: 400px;
  width: 100%;
}

.flashcard-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.flashcard.flipped .flashcard-inner {
  transform: rotateY(180deg);
}

.flashcard-front, .flashcard-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  overflow-y: auto;
}

.flashcard-back {
  transform: rotateY(180deg);
}
</style>
