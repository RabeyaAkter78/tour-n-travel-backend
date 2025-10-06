/* eslint-disable prettier/prettier */
import { StatusCodes } from 'http-status-codes'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { BookingService } from './booking.service'

const createBooking = catchAsync(async (req, res) => {
  const body = req.body
  const result = await BookingService.createBooking(body)
  sendResponse(res, {
    StatusCode: StatusCodes.OK,
    message: 'Booking Created Successfully',
    data: result,
  })
})

// const geAllBooking=catchAsync(async(req ,res)=>{
//     const result = await BookingService
// })

export const bookingController = {
  createBooking,
}
