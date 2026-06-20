// יוצרים תבנית של שדות שיכולות להיות באוסף שנקרא schema

//יש לנו שליטה על ערכים וטיפוסים רק דרך הקוד

import { model, Schema } from "mongoose"
import Joi from "joi"

const shoeSchema = new Schema({
    // _id: SchemaType.ObjectId
    name: String,
    brand: String,
    price: Number,
    size: Number,
    color: String,
    sport: String,
    amount: Number,
    isSale: Boolean,
    // 1.שמירת המפתח הזר בלבד - עובד רק אם יש REF
    // ownerId:{type: Schema.Types.ObjectId, ref:'users'}
    // 2. לשמור אובייקט ובתוך האוביקט לשמור מפתח זר עם REF
    owner: {
        _id: { type: Schema.Types.ObjectId, ref: 'users' },
        username: String
    }
})

export const shoeJoi = Joi.object({
    name: Joi.string().required().min(3),
    brand: Joi.string().required().min(2),
    price: Joi.number().required().positive(),
    size: Joi.number().required().min(20).max(60),
    color: Joi.string().default('black'),
    sport: Joi.string().default('general'),
    amount: Joi.number().default(0),
    isSale: Joi.boolean().default(false)
})

// model - יוצר אוסף ב דטה ביס בצורת התבנית שהגדרנו ב shoeSchema
// shoes - שם האוסף
export default model('shoes', shoeSchema)
