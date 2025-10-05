/* eslint-disable prettier/prettier */
import express, { Request, Response } from 'express'
import userRoutes from './modules/user/user.route'
import tourRouter from './modules/tour/tour.route'
const app = express()

app.use(express.json())

app.use('/api/user', userRoutes)
app.use('/api/tour', tourRouter)

app.get('/', (req: Request, res: Response) => {
  res.send({
    status: true,
    message: 'Server Live',
  })
})

export default app
