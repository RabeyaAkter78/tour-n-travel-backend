/* eslint-disable prettier/prettier */
import { model, Schema } from 'mongoose'
import TTourModel, { ITour } from './tour.interface'

const tourSchema = new Schema<ITour, TTourModel>({
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
  startDates: [Date], //multiple date er jonno
  //   startDate: { type: Date },
  startLocation: { type: String },
  locations: [String],
  slug: String,
})

// find ajker diner kachakachi date search:static instance

// tourSchema.methods.getNextNearestStartDateAndEndDate = function () {
//   const today = new Date()
//   const futureDates = this.startDates.filter((startDate: Date) => {
//     return startDate > today
//   })

//   futureDates.sort((a: Date, b: Date) => a.getTime() - b.getTime())

//   const neareststartDate = futureDates[0]
//   const estimatedEndDate = new Date(
//     neareststartDate.getTime() + this.durationHours * 60 * 60 * 1000
//   )
//   return {
//     neareststartDate,
//     estimatedEndDate,
//   }
// }

// static methods:

tourSchema.static(
  'getNextNearestStartDateAndEndDate',
  function getNextNearestStartDateAndEndDate() {
    const today = new Date()
    const futureDates = this.startDates.filter((startDate: Date) => {
      return startDate > today
    })

    futureDates.sort((a: Date, b: Date) => a.getTime() - b.getTime())

    const neareststartDate = futureDates[0]
    const estimatedEndDate = new Date(
      neareststartDate.getTime() + this.durationHours * 60 * 60 * 1000
    )
    return {
      neareststartDate,
      estimatedEndDate,
    }
  }
)

const Tour = model<ITour, TTourModel>('Tour', tourSchema)
export default Tour
