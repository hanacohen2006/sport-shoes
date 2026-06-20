// כאן מוגדרים כל הניתובים של המשאב הישות המתאימה
//  הפונקציה עצמה נמצאת בקובץ ה CONTROLLER המותאם לישות

// 1. חובה דבר ראשון בתחילת העמוד לייבא את הפונקציות מהCONTROLLER ואת ROUTER מ EXPRESS
import {Router} from 'express'
import { getAllShoes, getFullShoe, getShoeById, updateShoe, deleteShoe, addShoe } from '../controllers/shoe.controller.js'
import { printHello, sendStartDate } from '../middlewares/print.middlewares.js'
import {auth} from '../middlewares/auth.middlewares.js'
import { shoeJoi } from '../models/shoe.model.js'
import { validateSchema } from '../middlewares/validateSchema.middleware.js'

// 2. יצירת ראוטר למשאב בתוך הפרויקט
//  כאן אנחנו לא יוצרות ניתוב כללי אלא רק ניתוב חלקי אחרי שם המשאב מתחיל ה סלש

const router = Router()

router.get('/', printHello, auth, sendStartDate, getAllShoes)  // admin בלבד
router.get('/public', getAllPublicShoes)  // לכולם

router.get('/full', getFullShoe)
router.get('/public', getAllPublicShoes)

router.get('/getById/:id', getShoeById)

router.post('/', validateSchema(shoeJoi), addShoe)

router.put('/:id', validateSchema(shoeJoi), updateShoe)

router.delete('/:id', deleteShoe)

export default router;
