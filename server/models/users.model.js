
import { model, Schema} from "mongoose"
// התקנת סיפריית bcryptjs
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import Joi from "joi"

const userSchema = new Schema ({
    username: String,
    password: String,
    email: String,
    phone: String,
    role: String
})

userSchema.pre('save', async function(){
    // פונקציה שמתבצעת לפני שמירת המשתמש ב DB
    // לא יכולה להיות פונקצית חץ אלא רק בצורה הזו
    // מתייחסים כאן ל THIS- האובייקט שכרגע רוצים לשמור ב DB
    const salt = await bcrypt.genSalt(12) // מייצר סוג של מחרוזת בעלת 12 תווים
    const hash = await bcrypt.hash(this.password, salt) // מצפין את הסיסמא של המשתמש בתוך המחרוזת
    this.password = hash // שומרים בסיסמא של המשתמש לא את הסיסמא שהוא הקליד אלא את הצופן
})

// פונקציה ליצירת טוקן
export const generateToken = (fullUser) => {
    // רק נתונים שקשורים להרשאות
    const payload = { userId: fullUser._id, role: fullUser.role }

    // צורת שליפת מחרוזת סודית מקובץ הצפנה
    const secretKey = process.env.JWT_SECRET ?? 'SecretKEY'
    console.log("JWT SECRET: " + secretKey)

    // יצירת טוקן-צמיד
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' })
    return token;
}

export const userJoi = {
    login: Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
    }),
    register: Joi.object({
        username: Joi.string().required().min(2),
        password: Joi.string().required().pattern(/^[a-zA-Z0-9]{8,30}$/),
        repeat_password: Joi.ref('password'),
        email: Joi.string().email(),
        phone: Joi.string().pattern(/^\+?(972|0)(\-)?0?(([23489]{1}\d{7})|[5]{1}\d{8})$/),
        role: Joi.string().valid('admin', 'user').default('user')
    })
}

export default model('users', userSchema)
