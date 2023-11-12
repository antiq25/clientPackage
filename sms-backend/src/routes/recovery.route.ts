import { Router } from 'express'
import RecoveryController from '../controllers/recovery.controller'

const recoveryRouter = Router()
const recoveryController = new RecoveryController()

recoveryRouter.post('/forgot-password', async (req, res) => {
  await recoveryController.forgotPassword(req, res)
})

recoveryRouter.post('/reset-password', async (req, res) => {
  await recoveryController.resetPassword(req, res)
})

export default recoveryRouter
