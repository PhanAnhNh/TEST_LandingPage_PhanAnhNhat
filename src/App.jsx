import { useState, useEffect, lazy, Suspense, useCallback } from 'react'
import './App.css'
import Header from './components/Headers/header'

// Lazy load components
const Banner = lazy(() => import('./page/banner'))
const Features = lazy(() => import('./page/feature'))
const ScrollytellingSection = lazy(() => import('./components/Scrollytelling/ScrollytellingSection'))
const SectionDivider = lazy(() => import('./components/Scrollytelling/SectionDivider'))
const TechSpecs = lazy(() => import('./page/technical'))
const Accessories = lazy(() => import('./page/accessories'))
const Footer = lazy(() => import('./components/Footers/footer'))
const AuthModal = lazy(() => import('./components/Auth/AuthModal'))

function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authTrigger, setAuthTrigger] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'access_token') {
        const token = localStorage.getItem('access_token');
        setIsLoggedIn(!!token);
        setAuthTrigger(prev => prev + 1);
      }
    };

    const handleAuthChange = () => {
      const token = localStorage.getItem('access_token');
      setIsLoggedIn(!!token);
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
    setAuthTrigger(prev => prev + 1);
  };

  const handleLoginClick = () => {
    setIsAuthOpen(true);
  };

  const handleCloseModal = () => {
    setIsAuthOpen(false);
  };

  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
    setAuthTrigger(prev => prev + 1);
  }, []);

  return (
    <div className="app-container">
      <Header 
        onLoginClick={handleLoginClick}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        onLogout={handleLogout}
        authTrigger={authTrigger}
      />

      <main>
        <Suspense fallback={<div style={{textAlign: 'center', padding: '50px'}}>Loading...</div>}>
          <Banner />
          
          {/* Section Divider - Có màu nền */}
          <SectionDivider 
            title="Trải nghiệm đỉnh cao"
            subtitle="Mọi chi tiết đều được tối ưu để mang lại trải nghiệm tốt nhất cho bạn"
            bgColor="#EAEAF2"  
            textColor="#1d1d1f" 
          />
          
          <ScrollytellingSection />
          
          <SectionDivider 
            title="Sức mạnh trong tầm tay"
            subtitle="iPad Air M2 - Thiết bị mỏng nhẹ nhất với hiệu năng mạnh mẽ nhất"
            bgColor="#EAEAF2"    
            textColor="#1d1d1f"
          />
          
          <Features />
          <TechSpecs />
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