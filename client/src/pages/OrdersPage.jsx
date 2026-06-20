import { useEffect, useState } from 'react'
import { getMyOrders } from '../services/api.service'
import './OrdersPage.css'

const statusLabel = {
    pending: { text: 'ממתין', color: '#ffb347' },
    shipped: { text: 'נשלח', color: '#89c4f4' },
    delivered: { text: 'נמסר', color: '#96e6a1' },
    cancelled: { text: 'בוטל', color: '#ff9a9e' }
}

function OrdersPage() {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        getMyOrders()
            .then(data => {
                if (data.error) setError(data.error)
                else setOrders(data)
            })
            .catch(() => setError('שגיאה בטעינת ההזמנות'))
            .finally(() => setLoading(false))
    }, [])

    if (loading) return <div className="loading">טוען הזמנות...</div>

    return (
        <div className="page">
            <div className="container">
                <h1 className="orders-title">ההזמנות שלי 📦</h1>
                {error ? (
                    <p className="error-msg">{error}</p>
                ) : orders.length === 0 ? (
                    <div className="orders-empty">
                        <span>📦</span>
                        <h3>אין הזמנות עדיין</h3>
                        <p>הזמנות שתבצעו יופיעו כאן</p>
                    </div>
                ) : (
                    <div className="orders-list">
                        {orders.map(order => (
                            <div key={order._id} className="order-card">
                                <div className="order-header">
                                    <div>
                                        <p className="order-id">הזמנה #{order._id.slice(-6).toUpperCase()}</p>
                                        <p className="order-date">{new Date(order.createdAt).toLocaleDateString('he-IL')}</p>
                                    </div>
                                    <span className="order-status" style={{ background: statusLabel[order.status]?.color + '30', color: statusLabel[order.status]?.color }}>
                                        {statusLabel[order.status]?.text}
                                    </span>
                                </div>
                                <div className="order-items">
                                    {order.items.map((item, i) => (
                                        <div key={i} className="order-item">
                                            <span>👟</span>
                                            <span>{item.name}</span>
                                            <span>{item.brand}</span>
                                            <span>x{item.qty}</span>
                                            <span>₪{item.price * item.qty}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="order-total">
                                    <span>סה״כ</span>
                                    <span>₪{order.total}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default OrdersPage
