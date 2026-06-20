import './AboutPage.css'

function AboutPage() {
  return (
    <div className="page">
      <div className="container">
        <div className="about-hero">
          <h1>אודות SOLE SPORT</h1>
          <p>החנות שאוהבת נעליים כמוכם 👟</p>
        </div>
        <div className="about-grid">
          <div className="about-card">
            <div className="about-icon">🏃</div>
            <h3>הסיפור שלנו</h3>
            <p>SOLE SPORT נוסדה מתוך אהבה אמיתית לספורט ולסגנון. אנחנו מאמינים שנעל טובה יכולה לשנות את כל האימון.</p>
          </div>
          <div className="about-card">
            <div className="about-icon">🌟</div>
            <h3>הערכים שלנו</h3>
            <p>איכות, סגנון ונוחות — שלושת העמודים שעליהם בנינו את החנות. כל נעל עוברת בדיקה קפדנית לפני שמגיעה אליכם.</p>
          </div>
          <div className="about-card">
            <div className="about-icon">🚀</div>
            <h3>המשימה שלנו</h3>
            <p>להנגיש לכל אחד את הנעל המושלמת בין אם אתם רצים מרתון או עושים טיול קל בפארק.</p>
          </div>
        </div>
        <div className="about-stats">
          <div className="about-stat"><span>2020</span><p>שנת הקמה</p></div>
          <div className="about-stat"><span>500+</span><p>מוצרים</p></div>
          <div className="about-stat"><span>10K+</span><p>לקוחות</p></div>
          <div className="about-stat"><span>50+</span><p>מותגים</p></div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
