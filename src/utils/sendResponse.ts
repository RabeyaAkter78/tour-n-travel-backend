/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Response } from 'express'
import { string } from 'zod'

type TSuccessResponse<T> = {
  status?: boolean
  StatusCode: number
  message: string
  token?: string
  data: T | T[] | null
}

/* eslint-disable prettier/prettier */
const sendResponse = <T>(res: Response, data: TSuccessResponse<T>) => {
  res.status(data.StatusCode).json({
    status: true,
    StatusCode: data.StatusCode,
    message: data.message,
    token: data.token,
    data: data.data,
  })
}

export default sendResponse
