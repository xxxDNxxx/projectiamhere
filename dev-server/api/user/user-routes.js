import express from 'express'
const router = express.Router()
import * as auth from '../../services/auth-service'
import * as controller from './user-controller'

router.get('/getalluser', auth.requireLogin, controller.index)

router.delete('/user:id', auth.requireLogin, controller.remove)

export default router;