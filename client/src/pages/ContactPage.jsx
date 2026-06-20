import { useState } from 'react'
import './ContactPage.css'

function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) return
    setSent(true)
  }

  return (
    <div className="page">
      <div className="container">
        <div className="contact-hero">
          <h1>צור קשר</h1>
          <p>נשמח לשמוע מכם! נחזור אליכם תוך 24 שעות 💌</p>
        </div>
        <div className="contact-layout">
          <div className="contact-info">
            <div className="contact-item"><span>📍</span><div><h4>כתובת</h4><p>רחוב הספורט 1, תל אביב</p></div></div>
            <div className="contact-item"><span>📞</span><div><h4>טלפון</h4><p>03-1234567</p></div></div>
            <div className="contact-item"><span>✉️</span><div><h4>אימייל</h4><p>info@solesport.co.il</p></div></div>
            <div className="contact-item"><span>🕐</span><div><h4>שעות פתיחה</h4><p>א׳-ה׳: 09:00-20:00<br />ו׳: 09:00-14:00</p></div></div>
          </div>
          <div className="contact-form-card">
            {sent ? (
              <div className="contact-success">
                <span>🎉</span>
                <h3>ההודעה נשלחה!</h3>
                <p>נחזור אליך בהקדם</p>
                <button className="btn btn-primary" onClick={() => setSent(false)}>שלח הודעה נוספת</button>
              </div>
            ) : (
              <div className="contact-form">
                <div className="form-row">
                  <div className="form-group"><label>שם מלא</label><input name="name" value={form.name} onChange={handleChange} placeholder="ישראל ישראלי" /></div>
                  <div className="form-group"><label>אימייל</label><input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@email.com" /></div>
                </div>
                <div className="form-group"><label>נושא</label><input name="subject" value={form.subject} onChange={handleChange} placeholder="במה נוכל לעזור?" /></div>
                <div className="form-group"><label>הודעה</label><textarea name="message" value={form.message} onChange={handleChange} placeholder="כתבו לנו..." rows={5}></textarea></div>
                <button className="btn btn-primary contact-btn" onClick={handleSubmit}>שלח הודעה 💌</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage
