import axiosClient from '../api/api';

export const productService = {
  getProducts: async (category = 'accessories') => {
    const response = await axiosClient.get('/products/', {
      params: { category }
    });
    return response.data;
  }
};

export const cartService = {
  addToCart: async (productId, quantity = 1) => {
    const response = await axiosClient.post('/cart/items', {
      product_id: productId,
      quantity: quantity
    });
    return response.data;
  }
};

export const favoriteService = {
  getFavorites: async () => {
    const response = await axiosClient.get('/favorites');
    return response.data; 
  },

  addFavorite: async (productId) => {
    const response = await axiosClient.post(`/favorites/${productId}`);
    return response.data;
  },

  removeFavorite: async (productId) => {
    const response = await axiosClient.delete(`/favorites/${productId}`);
    return response.data;
  }
};