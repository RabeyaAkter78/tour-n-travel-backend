/* eslint-disable prettier/prettier */
import { HydratedDocument, Model } from 'mongoose'

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
  availableSeat:number
}

export interface ITourMathods {
  getNextNearestStartDateAndEndDate(): {
    nearestStartDate: Date | null
    estimatedEndDate: Date | null
  }
}

// type TTourModel = Model<ITour, Record<string, unknown>, ITourMathods>

interface TTourModel
  extends Model<ITour, Record<string, unknown>, ITourMathods> {
  startDates: Date[]
  durationHours: number
  getNextNearestStartDateAndEndDate(): Promise<
    HydratedDocument<ITour, ITourMathods>
  >
}

export default TTourModel
