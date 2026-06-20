import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import ShopPage from './pages/ShopPage'
import ShoePage from './pages/ShoePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import AdminPage from './pages/AdminPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import FavoritesPage from './pages/FavoritesPage'
import CartPage from './pages/CartPage'
import ProfilePage from './pages/ProfilePage'
import OrdersPage from './pages/OrdersPage'
import './App.css'

function HomePage() {
  return (
    <div className="container">
      <HeroSection />
    </div>
  )
}

function App() {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token')
    const userName = localStorage.getItem('userName')
    const role = localStorage.getItem('role')
    return token ? { token, userName, role } : null
  })

  const handleLogin = (data) => {
    localStorage.setItem('token', data.token)
    localStorage.setItem('userName', data.userName)
    localStorage.setItem('role', data.role || 'user')
    setUser(data)
  }

  const handleLogout = () => {
    localStorage.clear()
    setUser(null)
  }

  return (
    <BrowserRouter>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/shoe/:id" element={<ShoePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/profile" element={<ProfilePage user={user} />} />
        <Route path="/orders" element={user ? <OrdersPage /> : <Navigate to="/login" />} />
        <Route path="/login" element={!user ? <LoginPage onLogin={handleLogin} /> : <Navigate to="/" />} />
        <Route path="/register" element={!user ? <RegisterPage onLogin={handleLogin} /> : <Navigate to="/" />} />
        <Route path="/admin" element={user?.role === 'admin' ? <AdminPage /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
