import express, { json, urlencoded } from 'express'
import shoeRouter from './routes/shoe.routes.js'
import userRouter from './routes/user.routes.js'
import orderRouter from './routes/order.routes.js'
import { errorHandling, notFound } from './middlewares/errors.middlewares.js'
import dotenv from "dotenv"
import cors from 'cors'
dotenv.config()
import morgan from 'morgan'
import { connectDB } from './config/db.js'

const app = express()
connectDB()

app.use(json())
app.use(urlencoded())
app.use(cors())
app.use(morgan('dev'))

app.use('/shoe', shoeRouter)
app.use('/user', userRouter)
app.use('/order', orderRouter)

app.use(express.static('public'))
app.use(notFound)
app.use(errorHandling)

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Sports Shoes Store server listening on http://localhost:${port}`)
})
