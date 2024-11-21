import api from './api';

export const cartService = {
  // Obtener el carrito de un usuario
  async getCart(userId) {
    try {
      console.log('Fetching cart for userId:', userId);
      const response = await api.get(`/cart/${userId}`);
      console.log('Cart API Response:', response.data);
      if (response.data.CartItems && response.data.CartItems.length === 0) {
        return { ...response.data, message: 'Your cart is empty' };
      }

      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error desconocido al obtener el carrito' };
    }
  },

  // Actualizar el carrito (modificar la cantidad de un producto)
  async updateCart(userId, productId, quantity) {
    try {
      const response = await api.post(`/cart/${userId}`, { productId, quantity: Number(quantity) });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error desconocido al actualizar el carrito' };
    }
  },

  // Eliminar un producto del carrito
  async removeFromCart(userId, productId) {
    try {
      const response = await api.delete(`/cart/${userId}/${productId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error desconocido al eliminar producto del carrito' };
    }
  },

  async clearCart(userId) {
    try {
      console.log('Attempting to clear cart for userId:', userId);
      const response = await api.delete(`/cart/${userId}`);
      console.log('Cart cleared successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error clearing cart:', error.response?.data || error);
      throw error.response?.data || { 
        message: 'Error desconocido al vaciar el carrito',
        details: error.toString()
      };
    }
  }
};
