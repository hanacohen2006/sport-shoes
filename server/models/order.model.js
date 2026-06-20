import { model, Schema } from "mongoose"

const orderSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    username: String,
    items: [
        {
            shoeId: { type: Schema.Types.ObjectId, ref: 'shoes' },
            name: String,
            brand: String,
            price: Number,
            qty: Number
        }
    ],
    total: Number,
    status: { type: String, default: 'pending', enum: ['pending', 'shipped', 'delivered', 'cancelled'] },
    createdAt: { type: Date, default: Date.now }
})

export default model('orders', orderSchema)
