import axiosClient from '../api/api';

export const cartService = {
  getCart: async () => {
    const response = await axiosClient.get('/cart');
    return response.data;
  },
  updateCartItem: async (productId, quantity) => {
    const response = await axiosClient.put(`/cart/items/${productId}?quantity=${quantity}`);
    return response.data;
  },
  removeFromCart: async (productId) => {
    const response = await axiosClient.delete(`/cart/items/${productId}`);
    return response.data;
  }
};

export const favoriteService = {
  getFavorites: async () => {
    const response = await axiosClient.get('/favorites');
    return response.data;
  },
  removeFavorite: async (productId) => {
    const response = await axiosClient.delete(`/favorites/${productId}`);
    return response.data;
  }
};