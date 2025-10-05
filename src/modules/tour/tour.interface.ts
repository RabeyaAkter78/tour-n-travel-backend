/* eslint-disable prettier/prettier */
export interface ITour {
  name: string
  durationHours: number
  averageRatings: number
  price: number
  coverImage: string
  images: string[]
  startDate: Date
  startLocation: string
  locations: string[]
  slug: string
}
