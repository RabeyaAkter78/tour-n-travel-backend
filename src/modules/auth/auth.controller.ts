/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express'
import { AuthService } from './auth.service'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { StatusCodes } from 'http-status-codes'

const register = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.register(req.body)
  sendResponse(res, {
    status: true,
    StatusCode: StatusCodes.CREATED,
    message: 'User created successfully',
    data: result,
  })
})
const login = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.login(req.body)
  sendResponse(res, {
    status: true,
    StatusCode: StatusCodes.CREATED,
    message: 'User created successfully',
    token: result.token,
    data: result.verifiedUser,
  })
})

const forgetpassword = catchAsync(async (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const result = await AuthService.forgetPassword(req.body);
  console.log(result)
  sendResponse(res, {
    StatusCode: StatusCodes.ACCEPTED,
    status: true,
    message: 'Reset Password Link sendt to your email',
    data: null,
  })
})

export const AuthController = {
  register,
  login,
  forgetpassword,
}
