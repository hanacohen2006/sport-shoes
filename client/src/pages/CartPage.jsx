import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createOrder } from '../services/api.service'
import './CartPage.css'

function CartPage() {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart')
    return saved ? JSON.parse(saved) : []
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  const updateCart = (updated) => {
    setCart(updated)
    localStorage.setItem('cart', JSON.stringify(updated))
  }

  const removeItem = (id) => updateCart(cart.filter(i => i._id !== id))

  const changeQty = (id, delta) => {
    const updated = cart.map(i => i._id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)
    updateCart(updated)
  }

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0)

  const handleCheckout = async () => {
    const token = localStorage.getItem('token')
    if (!token) { navigate('/login'); return }
    setLoading(true)
    try {
      const data = await createOrder({ items: cart, total })
      if (!data.error) {
        localStorage.removeItem('cart')
        setCart([])
        setSuccess(true)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  if (success) return (
    <div className="page">
      <div className="container">
        <div className="cart-success">
          <span>🎉</span>
          <h2>ההזמנה בוצעה בהצלחה!</h2>
          <p>תודה שקנית ב SOLE SPORT</p>
          <div className="success-btns">
            <Link to="/orders" className="btn btn-primary">ההזמנות שלי</Link>
            <Link to="/shop" className="btn btn-outline">המשך קניות</Link>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="page">
      <div className="container">
        <h1 className="cart-title">עגלת הקניות 🛒</h1>
        {cart.length === 0 ? (
          <div className="cart-empty">
            <span>🛒</span>
            <h3>העגלה ריקה</h3>
            <p>הוסיפו נעליים מהחנות</p>
            <Link to="/shop" className="btn btn-primary">לחנות</Link>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-items">
              {cart.map(item => (
                <div key={item._id} className="cart-item">
                  <div className="cart-item-img">👟</div>
                  <div className="cart-item-info">
                    <h3>{item.name}</h3>
                    <p>{item.brand}</p>
                  </div>
                  <div className="cart-item-qty">
                    <button onClick={() => changeQty(item._id, -1)}>-</button>
                    <span>{item.qty}</span>
                    <button onClick={() => changeQty(item._id, 1)}>+</button>
                  </div>
                  <div className="cart-item-price">₪{item.price * item.qty}</div>
                  <button className="cart-remove" onClick={() => removeItem(item._id)}>🗑️</button>
                </div>
              ))}
            </div>
            <div className="cart-summary">
              <h3>סיכום הזמנה</h3>
              <div className="summary-row"><span>מוצרים ({cart.length})</span><span>₪{total}</span></div>
              <div className="summary-row"><span>משלוח</span><span className="free">חינם! 🎁</span></div>
              <div className="summary-total"><span>סה״כ</span><span>₪{total}</span></div>
              <button className="btn btn-primary checkout-btn" onClick={handleCheckout} disabled={loading}>
                {loading ? 'שולח...' : 'לתשלום 💳'}
              </button>
              <Link to="/shop" className="btn btn-outline continue-btn">המשך קניות</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CartPage
