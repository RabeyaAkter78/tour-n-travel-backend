/* eslint-disable prettier/prettier */
import { Router } from 'express'
import { AuthController } from './auth.controller'
import validateRequest from '../../middlewares/validateRequest'
import { userValidation } from '../user/userValidation'

const authRoute = Router()

authRoute.post(
  '/register',
  validateRequest(userValidation.userValidationSchema),
  AuthController.register
)
authRoute.post('/login', AuthController.register)

export default authRoute
