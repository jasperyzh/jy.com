import { defineStore } from 'pinia';

export const useStorageStore = defineStore('storage', {
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
