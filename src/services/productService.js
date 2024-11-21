import api from './api';

export const productService = {
  async getAllProducts() {
    try {
      const response = await api.get('/products'); 
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error desconocido' };
    }
  },

  async getProductById(id) {
    try {
      const response = await api.get(`/products/get/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error desconocido' };
    }
  },

  async createProduct(productData) {
    try {
      const response = await api.post('/products/create', productData); // Coincide con router.post('/create')
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error desconocido' };
    }
  },

  async updateProduct(id, productData) {
    try {
      const response = await api.put(`/products/update/${id}`, productData); // Coincide con router.put('/update/:id')
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error desconocido' };
    }
  },

  async deleteProduct(id) {
    try {
      const response = await api.delete(`/products/delete/${id}`); // Coincide con router.delete('/delete/:id')
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error desconocido' };
    }
  },
};
