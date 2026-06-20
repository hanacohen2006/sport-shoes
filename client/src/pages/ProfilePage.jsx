import './ProfilePage.css'

function ProfilePage({ user }) {
  if (!user) return (
    <div className="page">
      <div className="container">
        <div className="profile-empty">
          <span>👤</span>
          <h3>יש להתחבר כדי לראות את הפרופיל</h3>
        </div>
      </div>
    </div>
  )

  return (
    <div className="page">
      <div className="container">
        <div className="profile-layout">
          <div className="profile-card">
            <div className="profile-avatar">{user.userName?.[0]?.toUpperCase() || '?'}</div>
            <h2>{user.userName}</h2>
            <p className="profile-role">{user.role === 'admin' ? '👑 מנהל' : '👤 משתמש'}</p>
            <div className="profile-stats">
              <div><span>0</span><p>הזמנות</p></div>
              <div><span>0</span><p>מועדפים</p></div>
            </div>
          </div>
          <div className="profile-details">
            <div className="profile-section">
              <h3>פרטים אישיים</h3>
              <div className="detail-row"><span>שם משתמש</span><span>{user.userName}</span></div>
              <div className="detail-row"><span>תפקיד</span><span>{user.role}</span></div>
            </div>
            <div className="profile-section">
              <h3>הזמנות אחרונות</h3>
              <p className="no-orders">אין הזמנות עדיין 📦</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
