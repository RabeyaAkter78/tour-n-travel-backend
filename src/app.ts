/* eslint-disable prettier/prettier */
import express, { Request, Response } from 'express'
import userRoutes from './modules/user/user.route'
const app = express()

app.use(express.json())

app.use('/api/user', userRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send({
    status: true,
    message: 'Server Live',
  })
})

export default app
