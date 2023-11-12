import { Router } from 'express'
import AuthController from '../controllers/auth.controller'
import onlyAuth from '../middlewares/onlyAuth.middleware'

const authRouter = Router()
const authController = new AuthController()

authRouter.post('/signup', async (req, res) => {
  await authController.signup(req, res)
})

authRouter.post('/login', async (req, res) => {
  await authController.login(req, res)
})

authRouter.get('/verify', onlyAuth, async (req, res) => {
  await authController.verifyEmail(req, res)
})

authRouter.post('/request-email-verif', onlyAuth, async (req, res) => {
  await authController.resendEmailVerification(req, res)
})

export default authRouter
