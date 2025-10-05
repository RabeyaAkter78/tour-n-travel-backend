/* eslint-disable prettier/prettier */
import { Request, Response } from 'express'
import { tourService } from './tour.service'

const createTour = async (req: Request, res: Response) => {
  try {
    const body = req.body
    const result = await tourService.createTour(body)
    res.send({
      status: true,
      message: 'Tour Create Successfully',
      result,
    })
  } catch (error) {
    res.json({
      status: false,
      message: 'Something went wrong',
      error,
    })
  }
}

const getTours = async (req: Request, res: Response) => {
  try {
    const result = await tourService.getTours()
    res.send({
      status: true,
      message: 'Tour get Successfully',
      result,
    })
  } catch (error) {
    res.json({
      status: false,
      message: 'Something went wrong',
      error,
    })
  }
}
const getSingleTour = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const result = await tourService.getSingleTour(id)
    res.send({
      status: true,
      message: 'Tour Get Successfully',
      result,
    })
  } catch (error) {
    res.json({
      status: false,
      message: 'Something went wrong',
      error,
    })
  }
}
const updateTour = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const body = req.body
    const result = await tourService.UpdateTour(id, body)
    res.send({
      status: true,
      message: 'Tour Updated Successfully',
      result,
    })
  } catch (error) {
    res.json({
      status: false,
      message: 'Something went wrong',
      error,
    })
  }
}
const deleteTour = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const result = await tourService.deleteTour(id)
    res.send({
      status: true,
      message: 'Tour Deleted Successfully',
      result,
    })
  } catch (error) {
    res.json({
      status: false,
      message: 'Something went wrong',
      error,
    })
  }
}
const getNextSchedule = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const result = await tourService.getNextScheduled(id)
    res.send({
      status: true,
      message: 'Tour Next Schedule get Successfully',
      result,
    })
  } catch (error) {
    res.json({
      status: false,
      message: 'Something went wrong',
      error,
    })
  }
}

export const tourController = {
  createTour,
  getTours,
  getSingleTour,
  updateTour,
  deleteTour,
  getNextSchedule
}
