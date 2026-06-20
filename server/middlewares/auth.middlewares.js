import jwt from 'jsonwebtoken'

// כאן נכתוב את כל המידלוור של הרשאות משתמש

export const auth=(req,res,next)=>{
    try{
        // req.headers ראש הבקשה
     const {authorization} =req.headers
     console.log("auth"+authorization)

    const[, token]=authorization.split(' ')
     console.log("token"+ token);
    const secretKey=process.env.JWT_SECRET ?? 'SecretKEY'
    console.log(secretKey);
    
    const currentUser= jwt.verify(token, secretKey)
    console.log(currentUser)
       req.myUser=currentUser
       next() 
    
    }catch(error){
     return next({error:new Error('authorization failed'), status:403})
    }
}
