import { useState } from 'react'
import { Link } from 'react-router-dom'
import { login } from '../services/api.service'
import './AuthPage.css'

function LoginPage({ onLogin }) {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const data = await login(form)
      if (data.error) {
        setError('אימייל או סיסמא שגויים')
      } else {
        onLogin(data)
      }
    } catch {
      setError('שגיאה בהתחברות')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page">
      <div className="auth-container">
        <h1>התחברות</h1>
        <p className="auth-sub">שמחים לראות אותך שוב 👟</p>
        <div className="auth-form">
          <div className="form-group">
            <label>אימייל</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="your@email.com"
            />
          </div>
          <div className="form-group">
            <label>סיסמא</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
            />
          </div>
          {error && <p className="error-msg">{error}</p>}
          <button className="btn btn-primary auth-btn" onClick={handleSubmit} disabled={loading}>
            {loading ? 'מתחבר...' : 'התחברות'}
          </button>
        </div>
        <p className="auth-switch">
          אין לך חשבון? <Link to="/register">הרשמה</Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
