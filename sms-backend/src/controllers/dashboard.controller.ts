import DashboardService from '../services/dashboard.service'
import Joi from 'joi'
import SafeError from '../safeError'
import safeReturn from '../safeReturn'

class DashboardController extends DashboardService {
  public async createListing(req: any, res: any) {
    const { name, reviews_url, description } = req.body
    const userId = req.user.id

    try {
      const schema = Joi.object({
        name: Joi.string().max(20).required(),
        reviews_url: Joi.string().uri().required(),
        description: Joi.string().optional()
      })

      const { error } = schema.validate({
        name,
        reviews_url,
        description
      })

      if (error) {
        throw new SafeError(error.message, true)
      }

      const listing = await this._createListing(
        userId,
        name,
        reviews_url,
        description
      )

      if (!listing) {
        throw new SafeError('Listing not created', true)
      }

      res.status(200).json({
        message: 'Listing created'
      })
    } catch (err: any) {
      return safeReturn(res, err)
    }
  }

  public async getListing(req: any, res: any) {
    const { name } = req.query
    const userId = req.user.id

    const schema = Joi.object({
      name: Joi.string().max(20).optional()
    })

    try {
      const { error } = schema.validate({
        name
      })

      if (error) {
        throw new SafeError(error.message, true)
      }

      const listing = await this._getListing(userId, name)

      if (!listing) {
        throw new SafeError('Listing not found', true)
      }

      res.status(200).json({
        message: 'Listing found',
        listing
      })
    } catch (err: any) {
      return safeReturn(res, err)
    }
  }

  public async fetchReviews(req: any, res: any) {
    const { listingId, max } = req.query
    const userId = req.user.id

    const schema = Joi.object({
      listingId: Joi.number().required()
    })

    try {
      const { error } = schema.validate({
        listingId
      })

      if (error) {
        throw new SafeError(error.message, true)
      }

      const reviews = await this._fetchReviews(
        Number(userId),
        Number(listingId),
        max ? Number(max) : 10
      )

      if (!reviews) {
        throw new SafeError('Reviews not found', true)
      }

      res.status(200).json({
        message: 'Reviews found',
        reviews
      })
    } catch (err: any) {
      return safeReturn(res, err)
    }
  }
}

export default DashboardController
