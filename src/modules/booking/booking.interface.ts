/* eslint-disable prettier/prettier */
import mongoose from 'mongoose'

export  interface IBooking {
  user: mongoose.Schema.Types.ObjectId
  tour: mongoose.Schema.Types.ObjectId
  bookedSloats: number
  bookingStatus: 'pending' | 'paid' | 'cancelled'
  totalPrice:number
}
