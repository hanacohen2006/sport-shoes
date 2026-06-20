import User,{generateToken}  from "../models/users.model.js"
import bcrypt from "bcryptjs"

// - משתמש לא קיים הרשמת משתמש
export const register = async (req, res, next) => {
    try {
        const user = new User(req.body)
        //Generate HASHיוצר הצפנת סיסמא 
        await user.save()
        res.status(201).json(user)
    } catch (error) {
        return next({ error, status: 400 })
    }
}

// התחברות- משתמש קיים

export const login = async(req,res,next)=>{
    try{
      const {email, password} = req.body
      const user = await User.findOne({email})
      if(user){
        const isValidPassword = await bcrypt.compare(password, user.password)

        if(isValidPassword){
            const token = generateToken(user) // יצירת טוקן
            return res.json({token:token, userName:user.username}).status(200)
        }
      }

      return next({error:{message:"login failed"}, status:400})
    }catch(error){
     return next({error})
    }
}
