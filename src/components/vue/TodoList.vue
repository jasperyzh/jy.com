<template>
  <div class="todo-list">
    
    <div class="storage-switcher mb-4 p-4 bg-gray-100 rounded-lg">
    <h3 class="text-lg font-medium mb-2">Storage Mode</h3>
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
  
    
    <div v-if="apiError" class="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
      <p>{{ apiErrorMessage }}</p>
      <p class="text-sm mt-1">Defaulting to localStorage mode.</p>
    </div>
    <div class="mb-6">
      <form @submit.prevent="addTodo" class="flex gap-2">
        <input 
          v-model="newTodo" 
          placeholder="Add a new task..." 
          class="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button 
          type="submit" 
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Add
        </button>
      </form>
    </div>

    <div v-if="!todos.length" class="text-center py-6 text-gray-500">
      No tasks yet. Add your first task above!
    </div>

    <div v-else>
      <ul class="space-y-2">
        <TodoItem
          v-for="todo in todos"
          :key="todo.id"
          :todo="todo"
          @toggle="toggleTodo(todo.id)"
          @delete="deleteTodo(todo.id)"
        />
      </ul>

      <div class="mt-4 flex justify-between text-sm text-gray-600">
        <span>{{ activeTodosCount }} items left</span>
        <button 
          @click="clearCompleted" 
          class="text-blue-500 hover:underline focus:outline-none"
          :disabled="!completedTodosCount"
          :class="{ 'opacity-50 cursor-not-allowed': !completedTodosCount }"
        >
          Clear completed
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
// import { useTodoStore } from '../../stores/todo';
// import { useStorageStore } from '../../stores/storage';
import TodoItem from './TodoItem.vue';

import { createPinia, defineStore } from 'pinia';

//storage.js

const useStorageStore = defineStore('storage', {
  state: () => ({
    useSqlite: false
  }),
  
  actions: {
    setStorageType(useSqlite) {
      this.useSqlite = useSqlite;
      // Save preference to localStorage
      localStorage.setItem('todo-storage-preference', useSqlite ? 'sqlite' : 'local');
    },
    
    loadPreference() {
      const preference = localStorage.getItem('todo-storage-preference');
      if (preference) {
        this.useSqlite = preference === 'sqlite';
      }
    }
  }
});

// todo.js
const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: []
  }),
  
  getters: {
    activeTodos: (state) => state.todos.filter(todo => !todo.completed),
    completedTodos: (state) => state.todos.filter(todo => todo.completed)
  },
  
  actions: {
    // Add a new todo
    addTodo(text) {
      const newTodo = {
        id: Date.now().toString(),
        text,
        completed: false,
        createdAt: new Date()
      };
      
      this.todos.push(newTodo);
      this.saveTodos();
    },
    
    // Toggle todo completion status
    toggleTodo(id) {
      const todo = this.todos.find(todo => todo.id === id);
      if (todo) {
        todo.completed = !todo.completed;
        this.saveTodos();
      }
    },
    
    // Delete a todo
    deleteTodo(id) {
      this.todos = this.todos.filter(todo => todo.id !== id);
      this.saveTodos();
    },
    
    // Clear all completed todos
    clearCompleted() {
      this.todos = this.todos.filter(todo => !todo.completed);
      this.saveTodos();
    },
    
    // Save todos to localStorage
    saveTodos() {
      localStorage.setItem('todos', JSON.stringify(this.todos));
    },
    
    // Load todos from localStorage
    loadTodos() {
      const savedTodos = localStorage.getItem('todos');
      if (savedTodos) {
        try {
          this.todos = JSON.parse(savedTodos);
        } catch (e) {
          console.error('Error parsing saved todos:', e);
          this.todos = [];
        }
      }
    }
  }
});


// Create and export Pinia instance
const pinia = createPinia();

// Initialize Pinia stores using our pinia instance
const localTodoStore = useTodoStore(pinia);
// const sqliteTodoStore = useTodoSqliteStore(pinia);
const storageStore = useStorageStore(pinia);

// Use computed to get the active store based on preference
const todoStore = computed(() => {
  return storageStore.useSqlite ? sqliteTodoStore : localTodoStore;
});

// Local state for form
const newTodo = ref('');

// Computed properties from store
const todos = computed(() => todoStore.value.todos);
const activeTodosCount = computed(() => todoStore.value.activeTodos.length);
const completedTodosCount = computed(() => todos.value.length - activeTodosCount.value);

// Actions
const addTodo = async () => {
  if (newTodo.value.trim()) {
    await todoStore.value.addTodo(newTodo.value.trim());
    newTodo.value = '';
  }
};

const toggleTodo = async (id) => {
  await todoStore.value.toggleTodo(id);
};

const deleteTodo = async (id) => {
  await todoStore.value.deleteTodo(id);
};

const clearCompleted = async () => {
  await todoStore.value.clearCompleted();
};

// Error state for API mode
const apiError = ref(false);
const apiErrorMessage = ref('');

// Watch for storage type changes and load appropriate todos
watch(
  () => storageStore.useSqlite,
  async (newValue) => {
    apiError.value = false;
    apiErrorMessage.value = '';
    
    try {
      await todoStore.value.loadTodos();
    } catch (err) {
      console.error('Error loading todos after storage change:', err);
      if (newValue === true) { // Only show error and revert if switching to SQLite mode
        apiError.value = true;
        apiErrorMessage.value = 'Failed to load todos from API. Server-side rendering may not be enabled.';
        // Revert to localStorage if API fails
        storageStore.setStorageType(false);
      }
    }
  }
);

// Load todos and storage preference on component mount
onMounted(async () => {
  // Always start with localStorage for reliability
  storageStore.setStorageType(false);
  
  try {
    await todoStore.value.loadTodos();
  } catch (err) {
    console.error('Error loading initial todos:', err);
  }
});
</script>

<style scoped>
.todo-list {
  min-height: 300px;
}
</style>
