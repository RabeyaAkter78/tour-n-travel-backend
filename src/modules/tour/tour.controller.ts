/* eslint-disable prettier/prettier */
import { Request, Response } from 'express'
import { tourService } from './tour.service'

const createTour = async (req: Request, res: Response) => {
  try {
    const body = req.body
    const result = tourService.createTour(body)
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

export const tourController = {
  createTour,
}
