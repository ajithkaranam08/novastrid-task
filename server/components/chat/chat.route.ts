import * as chatController from './chat.controller'
import express from "express"

const router = express.Router()

router.post('/',chatController.createChat)
router.get('/',chatController.getChat)
router.get('/export', chatController.downloadChatsExcel);

export default router