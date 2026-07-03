import React, { useEffect, useState } from 'react';
import { cartService, favoriteService } from '../../api/cartApi';
import './userModals.css';
import '../../css/Skeleton.css';

const CartSkeleton = () => (
  <div className="modal-body-container">
    <div className="items-list">
      {[1, 2, 3].map((i) => (
        <div key={i} className="modal-item-card">
          <div className="item-info">
            <div className="skeleton" style={{ width: '60%', height: '20px', marginBottom: '8px' }}></div>
            <div className="skeleton" style={{ width: '30%', height: '18px', marginBottom: '8px' }}></div>
            <div className="skeleton" style={{ width: '80px', height: '30px' }}></div>
          </div>
          <div className="skeleton" style={{ width: '40px', height: '40px', borderRadius: '50%' }}></div>
        </div>
      ))}
    </div>
    <div className="side-modal-footer">
      <div className="skeleton" style={{ width: '100%', height: '50px' }}></div>
    </div>
  </div>
);

export const CartModal = ({ isOpen, onClose }) => {
  const [cartData, setCartData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const data = await cartService.getCart();
      setCartData(data);
    } catch (error) {
      console.error("Lỗi lấy giỏ hàng:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) fetchCart();
  }, [isOpen]);

  const handleUpdateQuantity = async (productId, currentQty, adjustment) => {
    const newQty = currentQty + adjustment;
    try {
      await cartService.updateCartItem(productId, newQty);
      fetchCart();
      window.dispatchEvent(new Event('cartUpdate'));
    } catch (error) {
      console.error("Lỗi cập nhật số lượng:", error);
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      await cartService.removeFromCart(productId);
      fetchCart();
      window.dispatchEvent(new Event('cartUpdate'));
    } catch (error) {
      console.error("Lỗi xóa sản phẩm khỏi giỏ hàng:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="side-modal-overlay" onClick={onClose}>
      <div className="side-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="side-modal-header">
          <h2>Giỏ hàng của bạn</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        {loading ? (
          <CartSkeleton /> 
        ) : cartData && cartData.items.length > 0 ? (
          <div className="modal-body-container">
            <div className="items-list">
              {cartData.items.map((item) => (
                <div key={item.product_id} className="modal-item-card">
                  <div className="item-info">
                    <h4>{item.product_name}</h4>
                    <p className="item-price">${item.product_price?.toFixed(2)}</p>
                    <div className="quantity-control">
                      <button onClick={() => handleUpdateQuantity(item.product_id, item.quantity, -1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => handleUpdateQuantity(item.product_id, item.quantity, 1)}>+</button>
                    </div>
                  </div>
                  <button className="remove-btn" onClick={() => handleRemoveItem(item.product_id)}>Xóa</button>
                </div>
              ))}
            </div>
            <div className="side-modal-footer">
              <div className="total-row">
                <span>Tổng tiền:</span>
                <span className="total-price">${cartData.total_price?.toFixed(2)}</span>
              </div>
              <button className="btn-checkout">Thanh toán ngay</button>
            </div>
          </div>
        ) : (
          <div className="empty-state">Giỏ hàng trống rỗng.</div>
        )}
      </div>
    </div>
  );
};

const FavoritesSkeleton = () => (
  <div className="modal-body-container">
    <div className="items-list">
      {[1, 2, 3].map((i) => (
        <div key={i} className="modal-item-card">
          <div className="item-info">
            <div className="skeleton" style={{ width: '60%', height: '20px', marginBottom: '8px' }}></div>
            <div className="skeleton" style={{ width: '30%', height: '18px', marginBottom: '8px' }}></div>
            <div className="skeleton" style={{ width: '40%', height: '16px' }}></div>
          </div>
          <div className="skeleton" style={{ width: '60px', height: '30px', borderRadius: '8px' }}></div>
        </div>
      ))}
    </div>
  </div>
);

export const FavoritesModal = ({ isOpen, onClose }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const data = await favoriteService.getFavorites();
      setFavorites(data.favorites || []);
    } catch (error) {
      console.error("Lỗi lấy danh sách yêu thích:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) fetchFavorites();
  }, [isOpen]);

  const handleRemoveFav = async (productId) => {
    try {
      await favoriteService.removeFavorite(productId);
      fetchFavorites();
    } catch (error) {
      console.error("Lỗi bỏ yêu thích:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="side-modal-overlay" onClick={onClose}>
      <div className="side-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="side-modal-header">
          <h2>Sản phẩm yêu thích</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        {loading ? (
          <FavoritesSkeleton />
        ) : favorites.length > 0 ? (
          <div className="modal-body-container">
            <div className="items-list">
              {favorites.map((item) => (
                <div key={item.id} className="modal-item-card">
                  <div className="item-info">
                    <h4>{item.name}</h4>
                    <p className="item-price">${item.price?.toFixed(2)}</p>
                    <span className="item-category">{item.category}</span>
                  </div>
                  <button className="remove-btn fav-remove" onClick={() => handleRemoveFav(item.id)}>Bỏ thích</button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="empty-state">Chưa có sản phẩm nào được thích.</div>
        )}
      </div>
    </div>
  );
};