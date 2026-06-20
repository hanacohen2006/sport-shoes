// CONTROLLER
// יש כאן את כל הפונקציות הלוגיות
//  למשל חיבור ל DB
// כל הוספה מחיקה עדכון ...

// /shoe
// /shoe?sort=name
//  /shoe?sort=price
// /shoe?sort=id

import Shoe from '../models/shoe.model.js'

export const getAllShoes = async (req, res, next) => {
    const role = req.myUser.role;
    console.log("userRole: " + role)
    if (role !== 'admin')
        return next({ error: new Error('רק מנהל יכול לגשת לכלל הנתונים'), status: 403 })
    try {
        const shoes = await Shoe.find() //נותן את כל נתוני האוסף
        res.json(shoes)
    } catch (error) {
        return next({ error })
    }
}

export const getShoeById = async (req, res, next) => {
    const id = req.params.id
    try {
        const shoe = await Shoe.findById(id)
        if (!shoe) {
            return next({
                error: new Error(`shoe ${id} not found`),
                status: 404
            })
        }
        return res.json(shoe)

    } catch (error) {
        return next({ error })
    }
}

export const getFullShoe = async (req, res, next) => {
    try {
        // populate is like join in sql
        // owner - מצרף את הטבלה שהמפתח הזר שלה הוא OWNER
        const shoes = await Shoe.find().populate('owner._id', 'username email phone -_id')
        res.json(shoes)
    } catch (error) {
        return next(error)
    }
}

export const addShoe = async (req, res, next) => {
    try {
        const newShoe = new Shoe(req.body) //יצרנו מסמך חדש באוויר שמתאים לסכמה שיצרנו
        // שמירת המסמך החדש באוסף הנעליים
        await newShoe.save()
        //בשורה זו האובייקט מכיל את הקוד אוטומטי ושומר באוסף הנכון
        return res.status(201).json(newShoe)

    } catch (error) {
        return next({ error, status: 400 })
    }
}

export const updateShoe = async (req, res, next) => {
    const id = req.params.id
    try {
        const shoe = await Shoe.findByIdAndUpdate(
            id,
            {
                $set: req.body // הוספה - עדכון שדות מסויימים במסמך
                // $unset:req.body - {isSale:true} - מחיקת שדות מסויימים במסמך
            },
            {
                new: true,       // החזרת המסמך המעודכן
                runValidator: true // הפעלת בדיקות תקינות
            }
        )
        if (!shoe) {
            return next({
                error: new Error(`shoe ${id} not found`),
                status: 404
            })
        }
        return res.status(201).json(shoe)
    } catch (error) {
        return next({ error })
    }
}

export const deleteShoe = async (req, res, next) => {
    const id = req.params.id
    try {
        const shoe = await Shoe.findOne({ _id: id })
        if (!shoe) {
            return next({
                error: new Error(`shoe ${id} not found`),
                status: 404
            })
        } else {
            await Shoe.findByIdAndDelete(id)
            return res.status(200).json()
        }

    } catch (error) {
        return next({ error })
    }
}
export const getAllPublicShoes = async (req, res, next) => {
    try {
        const shoes = await Shoe.find()
        res.json(shoes)
    } catch (error) {
        return next({ error })
    }
}