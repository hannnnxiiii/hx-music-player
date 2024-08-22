// src/store/index.js
import { createPinia } from'pinia';
import { defineStore } from'pinia';

const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    user: null,
  }),
  actions: {
    setToken(token) {
      this.token = token;
      localStorage.setItem('token', token);
    },
    logout() {
      this.token = '';
      this.user = null;
      localStorage.removeItem('token');
    },
  },
});

const pinia = createPinia();

export { useAuthStore, pinia };
