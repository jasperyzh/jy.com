import { defineStore } from 'pinia';

export const useTodoStore = defineStore('todo', {
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
