/* eslint-disable prettier/prettier */
import { model, Schema } from 'mongoose'

const tourSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  durationHours: {
    type: Number,
    required: true,
  },
  averageRatings: {
    type: Number,
    default: 5,
  },
  price: {
    type: Number,
    required: true,
  },
  coverImage: {
    type: String,
    required: true,
  },
  images: [String],
  startDate: { type: Date },
  startLocation: { type: String },
  locations: [String],
  slug: String,
})

const Tour = model('Tour', tourSchema)
export default Tour
