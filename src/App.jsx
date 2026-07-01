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

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app-container">
      {/* 1. Thanh Menu Điều Hướng cố định */}
      <Header />

      {/* 2. Phần Thân Landing Page */}
      <main>
        {/* Banner chính đầu trang */}
        <Banner />

        {/* Khối các tính năng lưới */}
        <Features />

        {/* Khối bảng thông số kỹ thuật chi tiết */}
        <TechSpecs />
      </main>

      {/* 3. Phần chân trang */}
      <Footer />
    </div>
  )
}

export default App
