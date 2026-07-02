import { useState, useEffect, lazy, Suspense, useCallback } from 'react'
import './App.css'
import Header from './components/Headers/header'

// Lazy load components
const Banner = lazy(() => import('./page/banner'))
const Features = lazy(() => import('./page/feature'))
const TechSpecs = lazy(() => import('./page/technical'))
const Accessories = lazy(() => import('./page/accessories'))
const Footer = lazy(() => import('./components/Footers/footer'))
const AuthModal = lazy(() => import('./components/Auth/AuthModal'))

function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // 👇 Thêm state để trigger refresh cho Accessories
  const [authTrigger, setAuthTrigger] = useState(0);

  // Kiểm tra token khi component mount
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // 👇 Lắng nghe sự kiện đăng nhập/đăng xuất từ các tab khác
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'access_token') {
        const token = localStorage.getItem('access_token');
        setIsLoggedIn(!!token);
        // Trigger refresh cho Accessories
        setAuthTrigger(prev => prev + 1);
      }
    };

    // Lắng nghe sự kiện custom authChange
    const handleAuthChange = () => {
      const token = localStorage.getItem('access_token');
      setIsLoggedIn(!!token);
      // Trigger refresh cho Accessories
      setAuthTrigger(prev => prev + 1);
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('authChange', handleAuthChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('authChange', handleAuthChange);
    };
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setIsAuthOpen(false);
    // Trigger refresh cho Accessories
    setAuthTrigger(prev => prev + 1);
  };

  const handleLoginClick = () => {
    setIsAuthOpen(true);
  };

  const handleCloseModal = () => {
    setIsAuthOpen(false);
  };

  // 👇 Hàm xử lý logout từ Header
  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
    // Trigger refresh cho Accessories
    setAuthTrigger(prev => prev + 1);
  }, []);

  return (
    <div className="app-container">
      <Header 
        onLoginClick={handleLoginClick}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        onLogout={handleLogout} // 👈 Truyền callback logout xuống Header
        authTrigger={authTrigger} // 👈 Truyền trigger để Header biết
      />

      <main>
        <Suspense fallback={<div style={{textAlign: 'center', padding: '50px'}}>Loading...</div>}>
          <Banner />
          <Features />
          <TechSpecs />
          {/* 👇 Truyền authTrigger vào Accessories để refresh */}
          <Accessories key={authTrigger} authTrigger={authTrigger} />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer />
        <AuthModal 
          isOpen={isAuthOpen} 
          onClose={handleCloseModal}
          onLoginSuccess={handleLoginSuccess}
        />
      </Suspense>
    </div>
  )
}

export default App