/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import express, { NextFunction, Request, Response } from 'express'
import userRoutes from './modules/user/user.route'
import tourRouter from './modules/tour/tour.route'
import { StatusCodes } from 'http-status-codes'
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

// global error handler
app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: err.message,
    error: err,
  })
})

export default app
