import axiosClient from '../api/api';

export const cartService = {
  // Lấy chi tiết giỏ hàng hiện tại
  getCart: async () => {
    const response = await axiosClient.get('/cart');
    return response.data;
  },
  // Thêm/Cập nhật số lượng sản phẩm (quantity)
  updateCartItem: async (productId, quantity) => {
    const response = await axiosClient.put(`/cart/items/${productId}?quantity=${quantity}`);
    return response.data;
  },
  // Xóa sản phẩm khỏi giỏ hàng
  removeFromCart: async (productId) => {
    const response = await axiosClient.delete(`/cart/items/${productId}`);
    return response.data;
  }
};

export const favoriteService = {
  // Lấy danh sách yêu thích
  getFavorites: async () => {
    const response = await axiosClient.get('/favorites');
    return response.data;
  },
  // Xóa khỏi danh sách yêu thích
  removeFavorite: async (productId) => {
    const response = await axiosClient.delete(`/favorites/${productId}`);
    return response.data;
  }
};