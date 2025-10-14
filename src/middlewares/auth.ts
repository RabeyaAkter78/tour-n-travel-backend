/* eslint-disable prettier/prettier */
import { NextFunction, Request } from 'express'
import catchAsync from '../utils/catchAsync'
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../config'
import User from '../modules/user/user.model'

const auth = (RequiredRole: string) => {
  catchAsync(async (req: Request, next: NextFunction) => {
    const token = req.headers.authorization

    if (!token) {
      throw new Error('You are not Authorized')
    }
    const decoded = jwt.verify(token, config.jwt_secret) as JwtPayload
    const { email, role } = decoded

    const user = await User.findOne({ email })

    if (!user) {
      throw new Error('User not found')
    }
    if (RequiredRole !== role) {
      throw new Error('You are not Authorized')
    }
    req.user = decoded as JwtPayload
  })
}
