import { useEffect, useState } from 'react'
import { getAllShoes, addShoe, deleteShoe } from '../services/api.service'
import './AdminPage.css'

const emptyForm = { name: '', brand: '', price: '', size: '', color: '', sport: '', amount: '', isSale: false, image: '' }

function AdminPage() {
  const [shoes, setShoes] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchShoes = () => {
    getAllShoes()
      .then(data => setShoes(Array.isArray(data) ? data : []))
      .catch(() => setError('שגיאה בטעינה'))
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchShoes() }, [])

  const handleChange = (e) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm({ ...form, [e.target.name]: val })
  }

  const handleAdd = async () => {
    setError(null)
    try {
      const data = await addShoe(form)
      if (data.error) setError(data.error)
      else { setForm(emptyForm); fetchShoes() }
    } catch { setError('שגיאה בהוספה') }
  }

  const handleDelete = async (id) => {
    if (!confirm('למחוק את הנעל?')) return
    await deleteShoe(id)
    fetchShoes()
  }

  return (
    <div className="page">
      <div className="container">
        <h1 className="admin-page-title">ניהול נעליים</h1>
        <div className="admin-grid">
          <div className="admin-form-card">
            <h2>הוסף נעל חדשה</h2>
            <div className="admin-form">
              {[
                { name: 'name', label: 'שם', placeholder: 'Air Max 90' },
                { name: 'brand', label: 'מותג', placeholder: 'Nike' },
                { name: 'price', label: 'מחיר', placeholder: '450', type: 'number' },
                { name: 'size', label: 'מידה', placeholder: '42', type: 'number' },
                { name: 'color', label: 'צבע', placeholder: 'שחור' },
                { name: 'sport', label: 'ספורט', placeholder: 'ריצה' },
                { name: 'amount', label: 'כמות', placeholder: '10', type: 'number' },
                { name: 'image', label: 'קישור לתמונה', placeholder: '/images/nike.jpg' },
              ].map(field => (
                <div key={field.name} className="form-group">
                  <label>{field.label}</label>
                  <input type={field.type || 'text'} name={field.name} value={form[field.name]} onChange={handleChange} placeholder={field.placeholder} />
                </div>
              ))}
              <div className="form-group-check">
                <input type="checkbox" name="isSale" checked={form.isSale} onChange={handleChange} id="isSale" />
                <label htmlFor="isSale">במבצע?</label>
              </div>
              {error && <p className="error-msg">{error}</p>}
              <button className="btn btn-primary" onClick={handleAdd}>הוסף נעל</button>
            </div>
          </div>
          <div className="admin-table-card">
            <h2>כל הנעליים ({shoes.length})</h2>
            {loading ? <p>טוען...</p> : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>תמונה</th><th>שם</th><th>מותג</th><th>מחיר</th><th>מידה</th><th>כמות</th><th>פעולות</th>
                  </tr>
                </thead>
                <tbody>
                  {shoes.map(shoe => (
                    <tr key={shoe._id}>
                      <td>{shoe.image ? <img src={shoe.image} alt={shoe.name} style={{width:'40px',height:'40px',objectFit:'cover',borderRadius:'8px'}} /> : '👟'}</td>
                      <td>{shoe.name}</td>
                      <td>{shoe.brand}</td>
                      <td>₪{shoe.price}</td>
                      <td>{shoe.size}</td>
                      <td>{shoe.amount}</td>
                      <td><button className="btn btn-danger btn-sm" onClick={() => handleDelete(shoe._id)}>מחק</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminPage
