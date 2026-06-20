// כאן מוגדרים כל הניתובים של המשאב הישות המתאימה
//  הפונקציה עצמה נמצאת בקובץ ה CONTROLLER המותאם לישות

// 1. חובה דבר ראשון בתחילת העמוד לייבא את הפונקציות מהCONTROLLER ואת ROUTER מ EXPRESS
import {Router} from 'express'
import { login, register } from '../controllers/user.controller.js'
import { printHello, sendStartDate } from '../middlewares/print.middlewares.js'
import { validateSchema } from '../middlewares/validateSchema.middleware.js'
import { userJoi } from '../models/users.model.js'

// 2. יצירת ראוטר למשאב בתוך הפרויקט
//  כאן אנחנו לא יוצרות ניתוב כללי אלא רק ניתוב חלקי אחרי שם המשאב מתחיל ה סלש

const router = Router()

router.post('/login', validateSchema(userJoi.login), login)
router.post('/register', validateSchema(userJoi.register), register)

export default router;
