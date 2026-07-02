import React, { useState } from 'react';
import '../css/accessories.css';

const Accessories = () => {
  // Danh sách sản phẩm phụ kiện mẫu
  const accessoriesData = [
    {
      id: 1,
      name: "Apple Pencil Pro",
      tag: "New",
      price: "$129.00",
      desc: "Pixel-perfect precision, low latency, and tilt sensitivity. Supports squeeze, barrel roll, and haptic feedback.",
      icon: "✏️" // Bạn có thể thay bằng import img nếu có asset hình ảnh riêng
    },
    {
      id: 2,
      name: "Magic Keyboard for iPad Air",
      tag: "Best Seller",
      price: "$299.00",
      desc: "Incredible typing experience, a trackpad that opens up new ways to work with iPadOS, and front and back protection.",
      icon: "⌨️"
    },
    {
      id: 3,
      name: "Smart Folio for iPad Air",
      tag: "Multi-colors",
      price: "$79.00",
      desc: "Thin and light, protection for the front and back. It automatically wakes your iPad when opened and sleeps when closed.",
      icon: "📔"
    },
    {
      id: 4,
      name: "35W Dual USB-C Power Adapter",
      tag: "Essential",
      price: "$59.00",
      desc: "Allows you to charge two devices at the same time, whether you’re at home, in the office, or on the go.",
      icon: "🔌"
    }
  ];

  // Quản lý trạng thái đóng/mở xem chi tiết phụ kiện
  const [selectedAccessory, setSelectedAccessory] = useState(null);
  
  // Quản lý trạng thái danh sách yêu thích (Lưu danh sách ID đã thả tim)
  const [favorites, setFavorites] = useState([]);

  // Hàm xử lý khi bấm thả tim yêu thích
  const toggleFavorite = (id, e) => {
    e.stopPropagation(); // Ngăn việc bấm tim bị kích hoạt mở Modal chi tiết
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const handleAddToCart = (productName) => {
    alert(`Added ${productName} to your cart successfully!`);
  };

  return (
    <section id="accessories" className="acc-section">
      <div className="acc-container">
        {/* Header Tiêu đề */}
        <div className="acc-header">
          <span className="section-tag">ACCESSORIES</span>
          <h2>Mix and match.<br />Made for iPad Air.</h2>
        </div>

        {/* Lưới hiển thị Phụ kiện */}
        <div className="acc-grid">
          {accessoriesData.map((item) => (
            <div 
              key={item.id} 
              className="acc-card" 
              onClick={() => setSelectedAccessory(item)}
            >
              <div className="acc-card-top">
                {item.tag && <span className="acc-product-tag">{item.tag}</span>}
                {/* Nút Trái tim yêu thích */}
                <button 
                  className={`acc-heart-btn ${favorites.includes(item.id) ? 'active' : ''}`}
                  onClick={(e) => toggleFavorite(item.id, e)}
                >
                  <svg viewBox="0 0 24 24" className="heart-icon">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                </button>
              </div>

              <div className="acc-image-placeholder">
                <span className="acc-emoji">{item.icon}</span>
              </div>

              <div className="acc-card-info">
                <h3>{item.name}</h3>
                <p className="acc-price">{item.price}</p>
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
              {/* Bên trái: Ảnh đại diện */}
              <div className="acc-modal-left">
                <span className="acc-modal-emoji">{selectedAccessory.icon}</span>
              </div>
              
              {/* Bên phải: Thông tin & Hành động */}
              <div className="acc-modal-right">
                <span className="acc-modal-tag">{selectedAccessory.tag}</span>
                <h2 className="acc-modal-title">{selectedAccessory.name}</h2>
                <p className="acc-modal-price">{selectedAccessory.price}</p>
                <p className="acc-modal-desc">{selectedAccessory.desc}</p>
                
                <div className="acc-modal-actions">
                  <button 
                    className="acc-btn-cart" 
                    onClick={() => handleAddToCart(selectedAccessory.name)}
                  >
                    Add to Cart
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