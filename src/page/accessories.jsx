import React, { useState, useEffect } from 'react';
import '../css/accessories.css';
import '../css/Skeleton.css';
import { productService, cartService, favoriteService } from '../api/productApi';

const SkeletonCard = () => (
  <div className="acc-card skeleton-card">
    <div className="acc-card-top">
      <div className="skeleton" style={{ width: '50px', height: '20px' }}></div>
      <div className="skeleton" style={{ width: '30px', height: '30px', borderRadius: '50%' }}></div>
    </div>
    <div className="acc-image-placeholder">
      <div className="skeleton" style={{ width: '100%', height: '150px' }}></div>
    </div>
    <div className="acc-card-info">
      <div className="skeleton" style={{ width: '80%', height: '20px', marginBottom: '8px' }}></div>
      <div className="skeleton" style={{ width: '40%', height: '18px' }}></div>
    </div>
  </div>
);

const Accessories = ({ authTrigger }) => {
  const [accessories, setAccessories] = useState([]); 
  const [loading, setLoading] = useState(true);        
  const [selectedAccessory, setSelectedAccessory] = useState(null);
  const [favorites, setFavorites] = useState([]);      

  const fetchData = async () => {
    try {
      setLoading(true);
      
      const productData = await productService.getProducts('accessories');
      setAccessories(productData);

      const token = localStorage.getItem('access_token');
      if (token) {
        const favData = await favoriteService.getFavorites();
        const favIds = favData.favorites.map(item => item.id);
        setFavorites(favIds);
      } else {
        setFavorites([]);
      }
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu phụ kiện:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (authTrigger !== undefined) {
      fetchData();
    }
  }, [authTrigger]);
  
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'access_token') {
        fetchData();
      }
    };

    const handleAuthChange = () => {
      fetchData();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('authChange', handleAuthChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('authChange', handleAuthChange);
    };
  }, []);

  const toggleFavorite = async (id, e) => {
    e.stopPropagation(); 
    
    const token = localStorage.getItem('access_token');
    if (!token) {
      alert("Vui lòng đăng nhập để sử dụng tính năng yêu thích!");
      return;
    }

    try {
      if (favorites.includes(id)) {
        await favoriteService.removeFavorite(id);
        setFavorites(favorites.filter(favId => favId !== id));
      } else {
        await favoriteService.addFavorite(id);
        setFavorites([...favorites, id]);
      }
    } catch (error) {
      console.error("Lỗi thao tác yêu thích:", error);
      alert("Không thể cập nhật danh sách yêu thích. Hãy thử lại!");
    }
  };

  const handleAddToCart = async (productId, productName) => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!");
      return;
    }

    try {
      await cartService.addToCart(productId, 1);
      alert(`Đã thêm thành công ${productName} vào giỏ hàng của bạn!`);
    } catch (error) {
      console.error("Lỗi thêm giỏ hàng:", error);
      alert("Thêm vào giỏ hàng thất bại. Vui lòng kiểm tra lại.");
    }
  };

  if (loading) {
    return (
      <section id="accessories" className="acc-section">
        <div className="acc-container">
          <div className="acc-header">
            <div className="acc-header-left">
              <span className="section-tag">ACCESSORIES</span>
              <h2>Mix and match.<br />Made for <span>iPad Air</span>.</h2>
            </div>
            <div className="acc-header-right">
              <a href="#all-accessories" className="view-all">
                View All →
              </a>
            </div>
          </div>
          <div className="acc-grid">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <SkeletonCard key={item} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="accessories" className="acc-section">
      <div className="acc-container">
        <div className="acc-header">
          <div className="acc-header-left">
            <span className="section-tag">ACCESSORIES</span>
            <h2>Mix and match.<br />Made for <span>iPad Air</span>.</h2>
          </div>
          <div className="acc-header-right">
            <a href="#all-accessories" className="view-all">
              View All →
            </a>
          </div>
        </div>
        
        <div className="acc-grid">
          {accessories.map((item) => (
            <div 
              key={item.id} 
              className="acc-card" 
              onClick={() => setSelectedAccessory(item)}
            >
              <div className="acc-card-top">
                <span className={`acc-product-tag ${item.stock <= 0 ? 'out-of-stock' : ''}`}>
                  {item.stock > 0 ? "New" : "Out of stock"}
                </span>
                <button 
                  className={`acc-heart-btn ${favorites.includes(item.id) ? 'active' : ''}`}
                  onClick={(e) => toggleFavorite(item.id, e)}
                  aria-label={
                    favorites.includes(item.id)
                      ? `Remove ${item.name} from favorites`
                      : `Add ${item.name} to favorites`
                  }
                >
                  <svg viewBox="0 0 24 24" className="heart-icon">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                </button>
              </div>

              <div className="acc-image-placeholder">
                {item.images && item.images.length > 0 ? (
                  <img src={item.images[0]} alt={item.name} className="acc-product-img" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                ) : (
                  <span className="acc-emoji">📦</span>
                )}
              </div>

              <div className="acc-card-info">
                <h3>{item.name}</h3>
                <p className="acc-price">
                  <span className="currency">$</span>{item.price?.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {selectedAccessory && (
        <div className="acc-modal-overlay" onClick={() => setSelectedAccessory(null)}>
          <div className="acc-modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="acc-modal-close" onClick={() => setSelectedAccessory(null)}>×</button>
            
            <div className="acc-modal-content">
              <div className="acc-modal-left">
                {selectedAccessory.images && selectedAccessory.images.length > 0 ? (
                  <img src={selectedAccessory.images[0]} alt={selectedAccessory.name} style={{ maxWidth: '80%', maxHeight: '80%', objectFit: 'contain' }} />
                ) : (
                  <span className="acc-modal-emoji">📦</span>
                )}
              </div>
              
              <div className="acc-modal-right">
                <span className={`acc-modal-tag ${selectedAccessory.stock <= 0 ? 'out-of-stock' : ''}`}>
                  {selectedAccessory.stock > 0 ? "Available" : "Out of stock"}
                </span>
                <h2 className="acc-modal-title">{selectedAccessory.name}</h2>
                <p className="acc-modal-price">
                  <span className="currency">$</span>{selectedAccessory.price?.toFixed(2)}
                </p>
                <p className="acc-modal-desc">{selectedAccessory.description || "No description available."}</p>
                
                <div className="acc-modal-actions">
                  <button 
                    className="acc-btn-cart" 
                    disabled={selectedAccessory.stock <= 0}
                    onClick={() => handleAddToCart(selectedAccessory.id, selectedAccessory.name)}
                  >
                    {selectedAccessory.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                  
                  <button 
                    className={`acc-btn-favorite ${favorites.includes(selectedAccessory.id) ? 'active' : ''}`}
                    onClick={(e) => toggleFavorite(selectedAccessory.id, e)}
                  >
                    <svg viewBox="0 0 24 24" className="heart-icon">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                    {favorites.includes(selectedAccessory.id) ? 'Saved to Favorites' : 'Add to Favorites'}
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};

export default Accessories;