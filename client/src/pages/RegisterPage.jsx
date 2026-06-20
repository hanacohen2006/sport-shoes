import { useState } from 'react'
import { Link } from 'react-router-dom'
import { register } from '../services/api.service'
import './AuthPage.css'

function RegisterPage({ onLogin }) {
  const [form, setForm] = useState({
    username: '', email: '', password: '', repeat_password: '', phone: ''
  })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.password !== form.repeat_password) {
      setError('הסיסמאות אינן תואמות')
      return
    }
    setLoading(true)
    setError(null)
    try {
      const data = await register(form)
      if (data.error) {
        setError('שגיאה בהרשמה, בדקי את הפרטים')
      } else {
        onLogin(data)
      }
    } catch {
      setError('שגיאה בהרשמה')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page">
      <div className="auth-container">
        <h1>הרשמה</h1>
        <p className="auth-sub">ברוכה הבאה לחנות נעלי הספורט 👟</p>
        <div className="auth-form">
          <div className="form-group">
            <label>שם משתמש</label>
            <input name="username" value={form.username} onChange={handleChange} placeholder="השם שלך" />
          </div>
          <div className="form-group">
            <label>אימייל</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="your@email.com" />
          </div>
          <div className="form-group">
            <label>טלפון</label>
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="05X-XXXXXXX" />
          </div>
          <div className="form-group">
            <label>סיסמא</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="לפחות 8 תווים" />
          </div>
          <div className="form-group">
            <label>אימות סיסמא</label>
            <input type="password" name="repeat_password" value={form.repeat_password} onChange={handleChange} placeholder="••••••••" />
          </div>
          {error && <p className="error-msg">{error}</p>}
          <button className="btn btn-primary auth-btn" onClick={handleSubmit} disabled={loading}>
            {loading ? 'נרשם...' : 'הרשמה'}
          </button>
        </div>
        <p className="auth-switch">
          כבר יש לך חשבון? <Link to="/login">התחברות</Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage
