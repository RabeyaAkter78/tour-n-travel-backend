/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import express, { NextFunction, Request, Response } from 'express'
import userRoutes from './modules/user/user.route'
import tourRouter from './modules/tour/tour.route'
import { StatusCodes } from 'http-status-codes'
import bookingRouter from './modules/booking/booking.route'
import { globalErrorHandlers } from './middlewares/globalErrorHandlers'
const app = express()

app.use(express.json())

app.use('/api/user', userRoutes)
app.use('/api/tour', tourRouter)
app.use('/api/booking', bookingRouter)

app.get('/', (req: Request, res: Response) => {
  res.send({
    status: true,
    message: 'Server Live',
  })
})

// global error handler
app.use(globalErrorHandlers)
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    status: false,
    message: 'Route Not Found',
  })
})

export default app
