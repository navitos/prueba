import api from './api';

export const orderService = {
  async createOrder(orderData) {
    try {
      const response = await api.post('/orders/create-order', orderData); // Coincide con router.post('/create-order/')
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error desconocido' };
    }
  },

  async getUserOrders(userId) {
    try {
      const response = await api.get(`/orders/user/${userId}`); 
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error desconocido' };
    }
  },

  async getOrderById(orderId) {
    try {
      const response = await api.get(`/orders/${orderId}`); 
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error desconocido' };
    }
  },

  async updateOrderStatus(orderId, status) {
    try {
      const response = await api.patch(`/orders/${orderId}/status`, { status }); // Coincide con router.patch('/:orderId/status')
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error desconocido' };
    }
  },
};
