import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Header from './components/Headers/header'
import Features from './page/feature'
import TechSpecs from './page/technical'
import Banner from './page/banner'
import Footer from './components/Footers/footer'

// BƯỚC 1: Bạn phải import AuthModal vào đây (hãy kiểm tra lại đường dẫn file cho đúng)
import AuthModal from './components/Auth/AuthModal' 
import Accessories from './page/accessories'

function App() {
  const [count, setCount] = useState(0)
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  
  return (
    <div className="app-container">
      
      <Header onLoginClick={() => setIsAuthOpen(true)}/>

      
      <main>
        
        <Banner />

        
        <Features />

        
        <TechSpecs />

        <Accessories />
      </main>

      
      <Footer />

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  )
}

export default App