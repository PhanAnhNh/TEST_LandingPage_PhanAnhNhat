import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Header from './components/Headers/header'
import Features from './page/feature'
import TechSpecs from './page/technical'
import Banner from './page/banner'
import Footer from './components/Footers/footer'
import AuthModal from './components/Auth/AuthModal' 
import Accessories from './page/accessories'

function App() {
  const [count, setCount] = useState(0)
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Kiểm tra token khi component mount
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // Hàm xử lý đăng nhập thành công
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setIsAuthOpen(false); // Đóng modal sau khi đăng nhập thành công
  };

  // Hàm xử lý mở modal đăng nhập
  const handleLoginClick = () => {
    setIsAuthOpen(true);
  };

  // Hàm xử lý đóng modal
  const handleCloseModal = () => {
    setIsAuthOpen(false);
  };

  return (
    <div className="app-container">
      
      <Header 
        onLoginClick={handleLoginClick}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />

      <main>
        <Banner />
        <Features />
        <TechSpecs />
        <Accessories />
      </main>

      <Footer />

      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={handleCloseModal}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  )
}

export default App