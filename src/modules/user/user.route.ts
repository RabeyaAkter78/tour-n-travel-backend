import { Router } from 'express'
import { userController } from './user.controller'

const userRoutes = Router()

userRoutes.post('/create-user', userController.createUser)
userRoutes.get('/:userId', userController.getSingleUser)
userRoutes.put('/:userId', userController.updateUser)
userRoutes.delete('/:userId', userController.deleteUser)
userRoutes.get('/', userController.getUser)

export default userRoutes
