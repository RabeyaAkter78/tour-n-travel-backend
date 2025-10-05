/* eslint-disable prettier/prettier */
import { Model } from 'mongoose'

/* eslint-disable prettier/prettier */
export interface ITour {
  name: string
  durationHours: number
  averageRatings: number
  price: number
  coverImage: string
  images: string[]
  startDates: Date
  startLocation: string
  locations: string[]
  slug: string
}

export interface ITourMathods {
  getNextNearestStartDateAndEndDate(): {
    nearestStartDate: Date | null
    estimatedEndDate: Date | null
  }
}

type TTourModel = Model<ITour, Record<string, unknown>, ITourMathods>

export default TTourModel
