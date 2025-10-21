/* eslint-disable prettier/prettier */
import { tourService } from './tour.service'
import sendResponse from '../../utils/sendResponse'
import { StatusCodes } from 'http-status-codes'
import catchAsync from '../../utils/catchAsync'
import { sendImageCloudinary } from '../../helpers/fileUploadHelpers'

const createTour = catchAsync(async (req, res) => {
  const body = JSON.parse(req.body.data)
  try {
    if (req.file) {
      const imageName = 'randome image'
      const path = req.file.path
      const { secure_url } = await sendImageCloudinary(imageName, path)
      body.coverImage = secure_url
      console.log(secure_url)
    }

    const result = await tourService.createTour(body)

    sendResponse(res, {
      StatusCode: StatusCodes.CREATED,
      message: 'Tour Created Successfully',
      data: result,
    })
  } catch (error) {
    console.log(error)
  }
})

const getTours = catchAsync(async (req, res) => {
  const result = await tourService.getTours(req.query)
  sendResponse(res, {
    StatusCode: StatusCodes.OK,
    message: 'Tour get Successfully',
    data: result,
  })
})

const getSingleTour = catchAsync(async (req, res) => {
  const id = req.params.id
  const result = await tourService.getSingleTour(id)
  sendResponse(res, {
    StatusCode: StatusCodes.OK,
    message: 'Tour get Successfully',
    data: result,
  })
})

const updateTour = catchAsync(async (req, res) => {
  const id = req.params.id
  const body = req.body
  const result = await tourService.UpdateTour(id, body)
  sendResponse(res, {
    StatusCode: StatusCodes.OK,
    message: 'Tour Updated Successfully',
    data: result,
  })
})
const deleteTour = catchAsync(async (req, res) => {
  const id = req.params.id
  const result = await tourService.deleteTour(id)
  sendResponse(res, {
    StatusCode: StatusCodes.OK,
    message: 'Tour Deleted Successfully',
    data: result,
  })
})

const getNextSchedule = catchAsync(async (req, res) => {
  const id = req.params.id
  const result = await tourService.getNextScheduled(id)
  sendResponse(res, {
    StatusCode: StatusCodes.OK,
    message: 'Tour Next Schedule get Successfully',
    data: result,
  })
})

export const tourController = {
  createTour,
  getTours,
  getSingleTour,
  updateTour,
  deleteTour,
  getNextSchedule,
}
