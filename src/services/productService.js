import api from './api';

export const productService = {
  async getAllProducts() {
    try {
      // Usa la ruta completa que funciona en Postman
      const response = await api.get('/products/all');
      
      console.log('Respuesta del servidor:', response.data);
      
      return response.data;
    } catch (error) {
      console.error("Error al obtener productos:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers
      });
      throw error;
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
      const response = await api.post('/products/create', productData); 
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error desconocido' };
    }
  },

  async updateProduct(id, productData) {
    try {
      const response = await api.put(`/products/update/${id}`, productData); 
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
