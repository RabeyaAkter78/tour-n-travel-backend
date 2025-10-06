/* eslint-disable prettier/prettier */
import express from 'express'
import { bookingController } from './booking.controller'
const bookingRouter = express.Router()
bookingRouter.post('/create-booking', bookingController.createBooking)
bookingRouter.get('/', bookingController.createBooking)

export default bookingRouter
