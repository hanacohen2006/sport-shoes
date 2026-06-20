import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getShoeById } from '../services/api.service'
import './ShoePage.css'

function ShoePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [shoe, setShoe] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getShoeById(id)
      .then(data => {
        if (data.error) setError(data.error)
        else setShoe(data)
      })
      .catch(() => setError('הנעל לא נמצאה'))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <div className="loading">טוען...</div>
  if (error) return <div className="page"><div className="container error-msg">{error}</div></div>

  return (
    <div className="page">
      <div className="container shoe-page">
        <button className="btn btn-outline back-btn" onClick={() => navigate(-1)}>← חזרה</button>
        <div className="shoe-detail">
          <div className="shoe-detail-img">👟</div>
          <div className="shoe-detail-info">
            <div className="shoe-detail-brand">{shoe.brand}</div>
            <h1>{shoe.name}</h1>
            <div className="shoe-detail-price">
              ₪{shoe.price}
              {shoe.isSale && <span className="sale-badge">SALE</span>}
            </div>
            <div className="shoe-detail-meta">
              <div className="meta-item">
                <span className="meta-label">ספורט</span>
                <span>{shoe.sport || 'כללי'}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">צבע</span>
                <span>{shoe.color || 'לא צוין'}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">מידה</span>
                <span>{shoe.size}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">במלאי</span>
                <span>{shoe.amount} יחידות</span>
              </div>
            </div>
            <button className="btn btn-primary add-to-cart">הוסף לסל 🛒</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShoePage
