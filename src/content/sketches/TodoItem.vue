<template>
  <li class="todo-item flex items-center p-3 border rounded transition hover:bg-gray-50" :class="{ 'bg-green-50': todo.completed }">
    <input 
      type="checkbox" 
      :checked="todo.completed" 
      @change="$emit('toggle')" 
      class="w-5 h-5 mr-3 rounded focus:ring-blue-500 text-blue-600 border-gray-300"
    />
    
    <span class="flex-1" :class="{ 'line-through text-gray-400': todo.completed }">
      {{ todo.text }}
    </span>
    
    <button 
      @click="$emit('delete')" 
      class="ml-2 text-red-500 hover:text-red-700 focus:outline-none"
      aria-label="Delete todo"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
      </svg>
    </button>
  </li>
</template>

<script setup>
// Define props and emits
defineProps({
  todo: {
    type: Object,
    required: true
  }
});

defineEmits(['toggle', 'delete']);
</script>

<style scoped>
.todo-item {
  transition: background-color 0.2s ease;
}
</style>
