import * as userController from './user.controller'
import express from "express"

const router = express.Router()

router.post('/',userController.createUser)

export default router