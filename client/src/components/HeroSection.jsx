import { Link } from 'react-router-dom'
import './HeroSection.css'

function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-badge">🔥 קולקציה חדשה 2026</div>
        <h1 className="hero-title">
          הנעליים שלך<br />
          <span className="hero-gradient">מחכות לך</span>
        </h1>
        <p className="hero-sub">
          נעלי ספורט מהמותגים המובילים בעולם — Nike, Adidas, New Balance ועוד
        </p>
        <div className="hero-btns">
          <Link to="/shop" className="btn btn-primary">קנה עכשיו 👟</Link>
          <Link to="/about" className="btn btn-outline">קרא עלינו</Link>
        </div>
        <div className="hero-stats">
          <div className="stat"><span>500+</span><p>מוצרים</p></div>
          <div className="stat"><span>50+</span><p>מותגים</p></div>
          <div className="stat"><span>10K+</span><p>לקוחות מרוצים</p></div>
        </div>
      </div>
      <div className="hero-visual">
        <div className="hero-shoe-circle">
          <span className="hero-shoe-emoji">👟</span>
        </div>
        <div className="hero-blob blob1"></div>
        <div className="hero-blob blob2"></div>
        <div className="hero-blob blob3"></div>
      </div>
    </section>
  )
}

export default HeroSection
