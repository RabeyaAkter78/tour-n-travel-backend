/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { ITour } from './tour.interface'
import Tour from './tour.model'

const createTour = async (payload: ITour) => {
  const result = await Tour.create(payload)
  return result
}

const getTours = async (query: Record<string, unknown>) => {
  const searchTerm = query?.searchTerm || ''

  const result = await Tour.find({
    $or: [
      { name: { $regex: searchTerm, $options: 'i' } },
      { startLocation: { $regex: searchTerm, $options: 'i' } },
      { locations: { $regex: searchTerm, $options: 'i' } },
    ],
  })
  return result
}

const getSingleTour = async (id: string) => {
  const result = await Tour.findById(id)
  return result
}
const UpdateTour = async (id: string, payload: Partial<ITour>) => {
  const result = await Tour.findByIdAndUpdate(id, payload, { new: true })
  return result
}
const deleteTour = async (id: string) => {
  const result = await Tour.findByIdAndDelete(id)
  return result
}

// const getNextScheduled = async (id: string) => {
//   const tour = await Tour.findById(id)
//   const nextSchedule = tour?.getNextNearestStartDateAndEndDate()
//   return {
//     tour,
//     nextSchedule,
//   }
// }

// using custom method
const getNextScheduled = async (id?: string) => {
  const tour = await Tour.getNextNearestStartDateAndEndDate()
  //   const nextSchedule = tour?.getNextNearestStartDateAndEndDate()
  return {
    tour,
    // nextSchedule,
  }
}

export const tourService = {
  createTour,
  getTours,
  getSingleTour,
  UpdateTour,
  deleteTour,
  getNextScheduled,
}
