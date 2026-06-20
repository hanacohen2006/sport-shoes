import Joi from 'joi';

const schema = Joi.object({
  username: Joi.string() //מחרוזת
  .alphanum() // מספרים או אותיות
  .min(2) // מינימום תווים
  .max(30) // מקסימום תווים
  .required(), // שדה חובה

  password: Joi.string()
  .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')), // ביטוי רגולרי במקום לכתוב פונקציה מורכבת זה כמו תבנית התאמה

  repeat_password: Joi.ref('password'), // קישור לשדה סיסמא בולידציה

  access_token: [Joi.string(), Joi.number()], // או מחרוזת או מספר

  birth_year: Joi.number()
  .integer()
  .min(1900) //ערך מינימלי
  .max(2013), // ערך מקסימלי

  email: Joi.string()
  .email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] },
  }),
})

// אם רוצים לבדוק שאובייקט עומד בבדיקות תקינות: VALIDATE
const {value, error, warnning} = schema.validate({ username: 'abc', birth_year: 1994 });
// { value: { username: 'abc', birth_year: 1994 } }
// value, // ערך של האוביקט אם תקין
//  error, // שגיאות אם לא תקין
//  warnning // במידה והגדרתי באוביקט דברים לא קריטים אבל בתור הזהרה כאן זה חוזר
schema.validate({});
// -> { value: {}, error: '"username" is required' }

try {
  const value = await schema.validateAsync({
    username: 'abc',
    birth_year: 1994,
  });
} catch (err) {}
