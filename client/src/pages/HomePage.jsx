import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllShoes } from '../services/api.service'
import './HomePage.css'

function HomePage() {
  const [shoes, setShoes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getAllShoes()
      .then(data => {
        if (data.error) setError(data.error)
        else setShoes(data)
      })
      .catch(() => setError('שגיאה בטעינת הנעליים'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="loading">טוען נעליים...</div>
  if (error) return <div className="page"><div className="container error-msg">{error}</div></div>

  return (
    <div className="page">
      <div className="container">
        <div className="home-header">
          <h1>כל הנעליים</h1>
          <p>{shoes.length} מוצרים</p>
        </div>
        <div className="shoes-grid">
          {shoes.map(shoe => (
            <Link to={`/shoe/${shoe._id}`} key={shoe._id} className="shoe-card">
              <div className="shoe-card-img">👟</div>
              <div className="shoe-card-info">
                <h3>{shoe.name}</h3>
                <p className="shoe-brand">{shoe.brand}</p>
                <div className="shoe-card-bottom">
                  <span className="shoe-price">₪{shoe.price}</span>
                  {shoe.isSale && <span className="sale-badge">SALE</span>}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomePage
