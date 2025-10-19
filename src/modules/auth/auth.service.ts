/* eslint-disable prettier/prettier */
import bcrypt from 'bcrypt'
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { IUser } from '../user/user.interface'
import User from '../user/user.model'
import { ILoginUser } from './auth.interface'
import jwt from 'jsonwebtoken'
import config from '../../config'
import SendMail from '../../utils/sendMail'
const register = async (payload: IUser) => {
  const result = await User.create(payload)
  return result
}
const login = async (payload: ILoginUser) => {
  const user = await User.findOne({ email: payload.email })

  if (!user) {
    throw new Error('User not found')
  }
  const userStatus = user?.userStatus
  if (userStatus === 'inactive') {
    throw new Error('User is inactive. Please contact admin.')
  }
  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    user.password
  )
  if (!isPasswordMatched) {
    throw new Error('Password is incorrect')
  }
  if (!config.jwt_secret) {
    throw new Error('JWT secret is not defined in configuration')
  }
  const token = jwt.sign(
    {
      email: user.email,
      role: user.role,
    },
    config.jwt_secret,
    { expiresIn: '1d' }
  )

  const verifiedUser = {
    name: user.name,
    email: user.email,
    role: user.role,
  }

  return {
    verifiedUser,
    token,
  }
}

const forgetPassword = async (payload: { email: string }) => {
  const user = await User.findOne({ email: payload.email })
  if (!user) {
    throw new Error('User not found')
  }
  if (user?.userStatus === 'inactive') {
    throw new Error('User is Blacklisted')
  }

  const jwtPayload = {
    email: user?.email,
    role: user?.role,
  }

  const token = jwt.sign(jwtPayload, config.jwt_secret!, { expiresIn: '1h' })

  const resetLink = `http://localhost:5173/reset-password?id=${user?._id}&token=${token}`

  await SendMail(user.email, 'Reset your Password.', resetLink)
}

const resetPasword = async (payload: {
  id: string
  token: string
  password: string
}) => {
  const user = await User.findById(payload.id)
  if (!user) {
    throw new Error('User not found')
  }
  if (user?.userStatus === 'inactive') {
    throw new Error('User is Blacklisted')
  }
  jwt.verify(payload.token, config.jwt_secret!, (err, decoded) => {
    if (err) {
      throw new Error('Inavlid token or Expired token')
    }
  })

  // hash the password

  payload.password = await bcrypt.hash(
    payload.password,
    Number(config.bcrypt_salt_rounds)
  )
  user.password = payload.password
  const result = await User.findByIdAndUpdate(user?.id, user, { new: true })
  return result
}

export const AuthService = {
  register,
  login,
  forgetPassword,
  resetPasword,
}
