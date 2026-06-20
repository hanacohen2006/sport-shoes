export const notFound=(req,res,next)=>{ 
    return next({
        error: new Error(`url ${req.url} ${req.method} not found`),
        status:404
    })
}




/**
 * 
 * @param {{error:Error, status?:number}} err 
 * @param {Requesr} req 
 * @param {Response} res 
 * @param {()=>null} next 
 * @returns 
 */
export const errorHandling=(err,req,res,next)=>{        
    console.log("error handling", err)

    // new Error- מחלקה של גיאוסקריפט שמכילה נתונים של שגיאה
    // err טופס את כל הנתונים של השגיאה
    //  ואנחנו נחזיר את נתוני השגיאה בפומט שנרצה
    // היתרון: כל השגיאות יהיו מאותה תבנית וגם לא תהיה חזרה על קוד

    const message= err.error?.message || "server error"
    const status= err.status ?? 500
    return  res.status(status).json({error:message, fixLink:'http://localhost:5000/fix.html'})
}
