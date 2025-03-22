import { defineStore } from 'pinia';

export const useTodoSqliteStore = defineStore('todo-sqlite', {
  state: () => ({
    todos: [],
    loading: false,
    error: null
  }),
  
  getters: {
    activeTodos: (state) => state.todos.filter(todo => !todo.completed),
    completedTodos: (state) => state.todos.filter(todo => todo.completed)
  },
  
  actions: {
    // Load todos from SQLite database via API
    async loadTodos() {
      try {
        this.loading = true;
        this.error = null;
        
        // Load todos from API endpoint
        const response = await fetch('/api/todos.json');
        const data = await response.json();
        
        if (data.success) {
          this.todos = data.todos;
        } else {
          throw new Error(data.error || 'Failed to load todos');
        }
      } catch (err) {
        console.error('Failed to load todos:', err);
        this.error = 'Failed to load todos';
      } finally {
        this.loading = false;
      }
    },
    
    // Add a new todo via API
    async addTodo(text) {
      try {
        this.error = null;
        
        const newTodo = {
          id: Date.now().toString(),
          text,
          completed: false,
          createdAt: new Date()
        };
        
        // Add via API
        const response = await fetch('/api/todos.json', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            action: 'add',
            todo: newTodo
          })
        });
        
        const data = await response.json();
        
        if (data.success) {
          // Reload todos to get the updated list
          await this.loadTodos();
          return true;
        } else {
          throw new Error(data.error || 'Failed to add todo');
        }
      } catch (err) {
        console.error('Failed to add todo:', err);
        this.error = 'Failed to add todo';
        return false;
      }
    },
    
    // Toggle todo completion status via API
    async toggleTodo(id) {
      try {
        this.error = null;
        
        // Update via API
        const response = await fetch('/api/todos.json', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            action: 'toggle',
            id
          })
        });
        
        const data = await response.json();
        
        if (data.success) {
          // Reload todos to get the updated list
          await this.loadTodos();
          return true;
        } else {
          throw new Error(data.error || 'Failed to toggle todo');
        }
      } catch (err) {
        console.error('Failed to toggle todo:', err);
        this.error = 'Failed to toggle todo';
        return false;
      }
    },
    
    // Delete a todo via API
    async deleteTodo(id) {
      try {
        this.error = null;
        
        // Delete via API
        const response = await fetch('/api/todos.json', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            action: 'delete',
            id
          })
        });
        
        const data = await response.json();
        
        if (data.success) {
          // Reload todos to get the updated list
          await this.loadTodos();
          return true;
        } else {
          throw new Error(data.error || 'Failed to delete todo');
        }
      } catch (err) {
        console.error('Failed to delete todo:', err);
        this.error = 'Failed to delete todo';
        return false;
      }
    },
    
    // Clear all completed todos via API
    async clearCompleted() {
      try {
        this.error = null;
        
        // Clear completed via API
        const response = await fetch('/api/todos.json', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            action: 'clearCompleted'
          })
        });
        
        const data = await response.json();
        
        if (data.success) {
          // Reload todos to get the updated list
          await this.loadTodos();
          return true;
        } else {
          throw new Error(data.error || 'Failed to clear completed todos');
        }
      } catch (err) {
        console.error('Failed to clear completed todos:', err);
        this.error = 'Failed to clear completed todos';
        return false;
      }
    }
  }
});
