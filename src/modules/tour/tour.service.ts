/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { file } from 'zod'
import { ITour } from './tour.interface'
import Tour from './tour.model'

const createTour = async (payload: ITour) => {
  const result = await Tour.create(payload)
  return result
}

const getTours = async (query: Record<string, unknown>) => {
  console.log('main', query)

  const queryObj = { ...query }
  const excludingImportatnt = [
    'searchTerm',
    'page',
    'limit',
    'sortOrder',
    'sortBy',
  ]
  excludingImportatnt.forEach((key) => delete queryObj[key])
  console.log(queryObj)

  const searchTerm = query?.searchTerm || ''
  const searchableFields = ['name', 'startLocation', 'locations']
  // const result = await Tour.find({
  //   $or: [
  //     searchableFields.map((field) => ({
  //       [field]: { $regx: searchTerm, $options: 'i' },
  //     })),
  //   ],
  // })

  const searchQuery = Tour.find({
    $or: searchableFields.map((filed) => ({
      [filed]: { $regex: searchTerm, $options: 'i' },
    })),
  })

  // const result = await searchQuery.find(queryObj)
  const filterQuery = searchQuery.find(queryObj)
  const page = Number(query?.page) || 1
  const limit = Number(query?.limit) || 10
  const skip = (page - 1) * limit
  // const result = await filterQuery?.skip(skip).limit(limit)
  const paginatedQuery = filterQuery?.skip(skip).limit(limit)

  let sortStr
  if (query?.sortBy && query.sortOrder) {
    const sortBy = query?.sortBy
    const sortOrder = query?.sortOrder
    sortStr = `${sortOrder === 'desc' ? '-' : ''}${sortBy}`
  }

  const result = await paginatedQuery.sort(sortStr)
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
