/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import mongoose from 'mongoose'

// Generic error
// Duplicate Error 
// cast Error - mongo db error
// Validation Error -- mongoose theke ase - 
// zod error / joi Error

type TErrorResponse = {
  success: boolean
  message: string
  error: any
}

export const globalErrorHandlers = (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof mongoose.Error.CastError) {
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: err.message,
      error: err,
    })
  } else if (err instanceof mongoose.Error.ValidationError) {
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      name: err.name,
      message: err.message,
      error: err,
    })
  } else if (err.code && err.code == 11000) {
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: err.errorResponse.errmsg,
      error: err,
    })
  } else if (err instanceof Error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      name: err.name,
      message: `Any Error: ${err.message}`,
      error: err,
    })
  }
}
