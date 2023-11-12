import DashboardController from '../controllers/dashboard.controller'
import { Router } from 'express'
import onlyAuth from '../middlewares/onlyAuth.middleware'

const dashboardRouter = Router()
const dashboardController = new DashboardController()

dashboardRouter.post('/create-listing', onlyAuth, async (req, res) => {
  await dashboardController.createListing(req, res)
})

dashboardRouter.get('/get-listing', onlyAuth, async (req, res) => {
  await dashboardController.getListing(req, res)
})

dashboardRouter.get('/fetch-reviews', onlyAuth, async (req, res) => {
  await dashboardController.fetchReviews(req, res)
})

export default dashboardRouter
