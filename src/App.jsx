import { useState, useEffect, lazy, Suspense } from 'react' // 👈 Thêm lazy, Suspense
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Header from './components/Headers/header'

const Banner = lazy(() => import('./page/banner'))
const Features = lazy(() => import('./page/feature'))
const TechSpecs = lazy(() => import('./page/technical'))
const Accessories = lazy(() => import('./page/accessories'))
const Footer = lazy(() => import('./components/Footers/footer'))
const AuthModal = lazy(() => import('./components/Auth/AuthModal'))

function App() {
  const [count, setCount] = useState(0)
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setIsAuthOpen(false);
  };

  const handleLoginClick = () => {
    setIsAuthOpen(true);
  };

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
        <Suspense fallback={<div style={{textAlign: 'center', padding: '50px'}}>Loading...</div>}>
          <Banner />
          <Features />
          <TechSpecs />
          <Accessories />
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