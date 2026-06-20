import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllShoes } from '../services/api.service'
import './ShopPage.css'

function ShopPage() {
  const [shoes, setShoes] = useState([])
  const [filtered, setFiltered] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState({ brand: '', sport: '', maxPrice: 2000, isSale: false })

  useEffect(() => {
    getPublicShoes()
      .then(data => { setShoes(Array.isArray(data) ? data : []); setFiltered(Array.isArray(data) ? data : []) })
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    let result = [...shoes]
    if (search) result = result.filter(s => s.name?.toLowerCase().includes(search.toLowerCase()) || s.brand?.toLowerCase().includes(search.toLowerCase()))
    if (filters.brand) result = result.filter(s => s.brand?.toLowerCase().includes(filters.brand.toLowerCase()))
    if (filters.sport) result = result.filter(s => s.sport?.toLowerCase().includes(filters.sport.toLowerCase()))
    if (filters.isSale) result = result.filter(s => s.isSale)
    result = result.filter(s => s.price <= filters.maxPrice)
    setFiltered(result)
  }, [search, filters, shoes])

  return (
    <div className="page">
      <div className="container">
        <div className="shop-header">
          <h1>החנות שלנו</h1>
          <p>{filtered.length} נעליים</p>
        </div>
        <div className="shop-layout">
          <aside className="shop-filters">
            <h3>סינון</h3>
            <div className="filter-group">
              <label>חיפוש</label>
              <input placeholder="שם או מותג..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <div className="filter-group">
              <label>מותג</label>
              <input placeholder="Nike, Adidas..." value={filters.brand} onChange={e => setFilters({...filters, brand: e.target.value})} />
            </div>
            <div className="filter-group">
              <label>סוג ספורט</label>
              <input placeholder="ריצה, כדורגל..." value={filters.sport} onChange={e => setFilters({...filters, sport: e.target.value})} />
            </div>
            <div className="filter-group">
              <label>מחיר מקסימלי: ₪{filters.maxPrice}</label>
              <input type="range" min="100" max="2000" step="50" value={filters.maxPrice} onChange={e => setFilters({...filters, maxPrice: Number(e.target.value)})} />
            </div>
            <div className="filter-check">
              <input type="checkbox" id="sale" checked={filters.isSale} onChange={e => setFilters({...filters, isSale: e.target.checked})} />
              <label htmlFor="sale">במבצע בלבד 🏷️</label>
            </div>
            <button className="btn btn-outline filter-reset" onClick={() => { setSearch(''); setFilters({ brand: '', sport: '', maxPrice: 2000, isSale: false }) }}>איפוס סינון</button>
          </aside>
          <div className="shop-grid">
            {loading ? <p>טוען...</p> : filtered.length === 0 ? <p className="no-results">לא נמצאו נעליים 😔</p> : (
              filtered.map(shoe => (
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
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShopPage
