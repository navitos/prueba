import api from './api';

export const authService = {
  async register(name, email, password) {
    try {
      const response = await api.post('/users/register', { name, email, password });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  async login(email, password) {
    try {
      const response = await api.post('/users/login', { email, password });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  },

  async getUserProfile() {
    try {
      const response = await api.get('/users/profile', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.data) {
        console.log('User Profile:', response.data);
        return response.data;
      } else {
        console.error('Failed to fetch profile');
      }
    } catch (error) {
      console.error('Error fetching profile:', error.response?.data || error.message);
      throw error;
    }
  },
  async updateProfile(name, email) {
    try {
      const response = await api.put('/users/update-profile', { name, email }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const user = response.data;
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (error) {
      throw error.response.data;
    }
  },

  async updatePassword(currentPassword, newPassword) {
    try {
      const response = await api.put('/users/update-password', { currentPassword, newPassword }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
};
