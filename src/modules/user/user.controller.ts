// req and response manage kore:

import { Request, Response } from 'express'
import { userService } from './user.service'
import sendResponse from '../../utils/sendResponse'
import { StatusCodes } from 'http-status-codes'
const createUser = async (req: Request, res: Response) => {
  try {
    const payload = req.body
    const result = await userService.createUser(payload)

    sendResponse(res, {
      StatusCode: StatusCodes.CREATED,
      message: 'User Created Successfully',
      data: result,
    })
  } catch (error) {
    res.json({
      status: false,
      message: 'Something went wrong',
      error,
    })
  }
}

const getUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.getUsers()
    sendResponse(res, {
      StatusCode: StatusCodes.OK,
      message: 'User Get Successfully',
      data: result,
    })
  } catch (error) {
    res.json({
      status: false,
      message: 'Something went wrong',
      error,
    })
  }
}

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId
    const result = await userService.getSingleUser(userId)
    sendResponse(res, {
      StatusCode: StatusCodes.OK,
      message: 'User Get Successfully',
      data: result,
    })
  } catch (error) {
    res.json({
      status: false,
      message: 'Something went wrong',
      error,
    })
  }
}

const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId
    const body = req.body

    const result = await userService.updateUser(userId, body)
    sendResponse(res, {
      StatusCode: StatusCodes.OK,
      message: 'User Updated Successfully',
      data: result,
    })
  } catch (error) {
    res.json({
      status: false,
      message: 'Something went wrong',
      error,
    })
  }
}

const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId

    await userService.deleteUser(userId)
    res.send({
      status: true,
      message: 'User Deleted Successfully',
      result: {},
    })
  } catch (error) {
    res.json({
      status: false,
      message: 'Something Went wrong',
      error,
    })
  }
}

export const userController = {
  createUser,
  getUser,
  getSingleUser,
  updateUser,
  deleteUser,
}
