import express from 'express'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDb from './config/db.js';
dotenv.config();
const port = process.env.PORT || 4000;
connectDb()
const app = express()

app.use('/api/users', userRoutes)

app.use(notFound);
app.use(errorHandler)
app.post("/", (req, res) => res.send("Sever is ready"))
app.listen(port, () => console.log(`Server started on port ${port}`))
