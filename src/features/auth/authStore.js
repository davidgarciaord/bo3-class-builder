import { create } from 'zustand';

const storedUser = JSON.parse(localStorage.getItem('user')) || null;
const storedToken = localStorage.getItem('token') || null;

export const useAuthStore = create((set) => ({
  user: storedUser,
  token: storedToken,
  isAuthenticated: !!storedToken,

  login: ({ user, token }) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);

    set({
      user,
      token,
      isAuthenticated: true
    });
  },

  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    set({
      user: null,
      token: null,
      isAuthenticated: false
    });
  }
}));