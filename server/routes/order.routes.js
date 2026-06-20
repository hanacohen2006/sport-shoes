import { Router } from 'express'
import { getAllOrders, getMyOrders, createOrder, updateOrderStatus } from '../controllers/order.controller.js'
import { auth } from '../middlewares/auth.middlewares.js'

const router = Router()

router.get('/', auth, getAllOrders)           // כל ההזמנות — מנהל בלבד
router.get('/my', auth, getMyOrders)          // הזמנות של המשתמש המחובר
router.post('/', auth, createOrder)           // יצירת הזמנה
router.put('/:id', auth, updateOrderStatus)  // עדכון סטטוס — מנהל בלבד

export default router
