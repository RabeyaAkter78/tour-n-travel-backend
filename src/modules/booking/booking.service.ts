/* eslint-disable prettier/prettier */
import mongoose from 'mongoose'
import Tour from '../tour/tour.model'
import { IBooking } from './booking.interface'
import Booking from './booking.model'

const createBooking = async (payload: IBooking): Promise<IBooking> => {
  //   const { tour, bookedSloats } = payload

  //   const requiredTour = await Tour.findById(tour)

  //   if (!requiredTour) {
  //     throw new Error('Tour Not found')
  //   }

  //   const totalPrice = requiredTour.price * bookedSloats
  //   payload.totalPrice = totalPrice
  //   payload.bookingStatus = 'pending'

  //   if (requiredTour.availableSeat < bookedSloats) {
  //     throw new Error('Not enough Seats Available')
  //   }

  //   const booking = await Booking.create(payload)
  // //   throw new Error('Faild to create Booking')
  //   const updatedTour = await Tour.findByIdAndUpdate(
  //     tour,
  //     {
  //       $inc: {
  //         availableSeat: -bookedSloats,
  //       },
  //     },
  //     { new: true }
  //   )

  //   if (!updatedTour) {
  //     throw new Error('Faild to Update The Tour')
  //   }

  //   return booking

  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    const { tour, bookedSloats } = payload

    const requiredTour = await Tour.findById(tour)

    if (!requiredTour) {
      throw new Error('Tour Not found')
    }

    const totalPrice = requiredTour.price * bookedSloats
    payload.totalPrice = totalPrice
    payload.bookingStatus = 'pending'

    if (requiredTour.availableSeat < bookedSloats) {
      throw new Error('Not enough Seats Available')
    }

    const booking = await Booking.create([payload], { session })
    //   throw new Error('Faild to create Booking')
    const updatedTour = await Tour.findByIdAndUpdate(
      booking[0].tour,
      {
        $inc: {
          availableSeat: -bookedSloats,
        },
      },
      { new: true }
    )

    if (!updatedTour) {
      throw new Error('Faild to Update The Tour')
    }
    await session.commitTransaction()
    await session.endSession()
    return booking[0]
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }
}






export const BookingService = {
  createBooking,
}
