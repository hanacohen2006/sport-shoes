// 1. התקנת MONGOOSE
// סיפריית גישה למונגו
// npm i mongoose

// 2. import ל MONGOOSE
import mongoose from "mongoose"

export const connectDB = async () =>{

    // מחרוזת חיבור לשרת ה DB 
    // בסוף המחרוזת כותבים את שם ה DB
    // אם לא קיים יצור חדש
    const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/sports_shoes_store"
    try{
        await mongoose.connect(MONGO_URI)
        console.log(`Connected successfully to Sports Shoes Store DB: ${MONGO_URI}`);
        
    }catch(error){
        console.error(error.message)

    }
}
