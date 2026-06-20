import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './FavoritesPage.css'

function FavoritesPage() {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites')
    return saved ? JSON.parse(saved) : []
  })

  const removeFavorite = (id) => {
    const updated = favorites.filter(s => s._id !== id)
    setFavorites(updated)
    localStorage.setItem('favorites', JSON.stringify(updated))
  }

  return (
    <div className="page">
      <div className="container">
        <div className="fav-header">
          <h1>המועדפים שלי ❤️</h1>
          <p>{favorites.length} נעליים שמורות</p>
        </div>
        {favorites.length === 0 ? (
          <div className="fav-empty">
            <span>💔</span>
            <h3>אין מועדפים עדיין</h3>
            <p>לחצו על ❤️ בדף הנעל כדי לשמור אותה</p>
            <Link to="/shop" className="btn btn-primary">לחנות</Link>
          </div>
        ) : (
          <div className="fav-grid">
            {favorites.map(shoe => (
              <div key={shoe._id} className="fav-card">
                <button className="fav-remove" onClick={() => removeFavorite(shoe._id)}>✕</button>
                <Link to={`/shoe/${shoe._id}`}>
                  <div className="shoe-card-img">👟</div>
                  <div className="shoe-card-info">
                    <h3>{shoe.name}</h3>
                    <p className="shoe-brand">{shoe.brand}</p>
                    <span className="shoe-price">₪{shoe.price}</span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default FavoritesPage
