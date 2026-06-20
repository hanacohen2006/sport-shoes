import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar({ user, onLogout }) {
  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="navbar-logo">SOLE SPORT</Link>
        <div className="navbar-links">
          <Link to="/shop">חנות</Link>
          <Link to="/about">אודות</Link>
          <Link to="/contact">צור קשר</Link>
          {user && <Link to="/orders">הזמנות 📦</Link>}
          {user && <Link to="/profile">פרופיל 👤</Link>}
          <Link to="/favorites">❤️</Link>
          <Link to="/cart">🛒</Link>
          {user?.role === 'admin' && <Link to="/admin">ניהול</Link>}
          {user ? (
            <button className="btn btn-outline" onClick={onLogout}>התנתקות</button>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline">התחברות</Link>
              <Link to="/register" className="btn btn-primary">הרשמה</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
