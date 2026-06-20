// MIDDELWARE CREATOR
// מידלוור שיוצר פונקצית מידלוור לפי הפרמטרים שקיבל לפי הסכמה שקיבל . ה
// הוא יכול לקבל כל סכמה שהיא ולהחזיר מידלוור מותאם

// בדרך כלל מידלוואר מקבל : req res next
// כאן הוא יקבל פרמטר: userJoi.login, shoe, userSchema
// הוא יחזיר מידלוור

export const validateSchema = function(joiSchema){
return (req,res,next)=>{
    const{ value ,error} = joiSchema.validate(req.body)
 if(error){
    return next({error:{message:error}, status:400})
 }
 return next()
}
}
