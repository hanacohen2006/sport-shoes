import Order from '../models/order.model.js'

// קבלת כל ההזמנות — רק מנהל
export const getAllOrders = async (req, res, next) => {
    if (req.myUser.role !== 'admin')
        return next({ error: new Error('רק מנהל יכול לראות את כל ההזמנות'), status: 403 })
    try {
        const orders = await Order.find().sort({ createdAt: -1 })
        res.json(orders)
    } catch (error) {
        return next({ error })
    }
}

// קבלת הזמנות של המשתמש המחובר
export const getMyOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({ userId: req.myUser.userId }).sort({ createdAt: -1 })
        res.json(orders)
    } catch (error) {
        return next({ error })
    }
}

// יצירת הזמנה חדשה
export const createOrder = async (req, res, next) => {
    try {
        const { items, total } = req.body
        const newOrder = new Order({
            userId: req.myUser.userId,
            username: req.myUser.username,
            items,
            total
        })
        await newOrder.save()
        return res.status(201).json(newOrder)
    } catch (error) {
        return next({ error, status: 400 })
    }
}

// עדכון סטטוס הזמנה — רק מנהל
export const updateOrderStatus = async (req, res, next) => {
    if (req.myUser.role !== 'admin')
        return next({ error: new Error('רק מנהל יכול לעדכן סטטוס'), status: 403 })
    const { id } = req.params
    try {
        const order = await Order.findByIdAndUpdate(
            id,
            { $set: { status: req.body.status } },
            { new: true }
        )
        if (!order) return next({ error: new Error(`order ${id} not found`), status: 404 })
        return res.json(order)
    } catch (error) {
        return next({ error })
    }
}
