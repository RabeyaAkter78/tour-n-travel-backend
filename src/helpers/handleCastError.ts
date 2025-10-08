/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
import { Response } from 'express'

export const handleCastError = (err: any, res: Response) => {
  res.status(400).json({
    success: false,
    name: err.name,
    message: err.message,
    error: err,
  })
}
