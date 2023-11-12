import { Router } from 'express'
import ProfileController from '../controllers/profile.controller'
import onlyAuth from '../middlewares/onlyAuth.middleware'

const profileRouter = Router()

const profileController = new ProfileController()

profileRouter.get('/fetch', onlyAuth, async (req, res) => {
  await profileController.getProfile(req, res)
})

profileRouter.put('/update', onlyAuth, async (req, res) => {
  await profileController.updateProfile(req, res)
})

export default profileRouter
