import prisma from '../prisma'
import SafeError from '../safeError'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

class DashboardService {
  private prisma = prisma

  public async _createListing(
    userId: number,
    name: string,
    reviews_url: string,
    description?: string
  ) {
    const listingExists = await this.prisma.listing.findUnique({
      where: {
        userId: userId,
        place_url: reviews_url
      }
    })

    if (listingExists) {
      throw new SafeError('Listing already exists', true)
    }

    await this.prisma.listing.create({
      data: {
        name: name,
        description: description,
        userId: userId,
        place_url: reviews_url
      }
    })

    return true
  }

  public async _getListing(userId: number, listingName?: string) {
    if (listingName) {
      const listing = await this.prisma.listing.findUnique({
        where: {
          userId: userId,
          name: listingName
        }
      })

      if (!listing) {
        throw new SafeError('Listing not found', true)
      }

      return listing
    } else {
      const listings = await this.prisma.listing.findMany({
        where: {
          userId: userId
        }
      })

      return listings
    }
  }

  public async _fetchReviews(userId: number, listingId: number) {
    const listing = await this.prisma.listing.findUnique({
      where: {
        userId: userId,
        id: listingId
      }
    })

    if (!listing) {
      throw new SafeError('Listing not found', true)
    }

    const dataExpiresIn = listing.dataExpiresIn

    if (!dataExpiresIn || new Date() > dataExpiresIn) {
      return await this.runScraper(listingId, listing.place_url)
    } else if (new Date()) {
      return await this.fetchFromDB(listingId)
    }
  }

  private async fetchFromDB(listingId: number) {
    const reviews = await this.prisma.review.findMany({
      where: {
        listingId: listingId
      }
    })

    if (!reviews) {
      throw new SafeError('No reviews found', true)
    }

    return reviews
  }

  private async runScraper(listingId: number, reviewsUrl: string, max = 20) {
    try {
      const { stdout, stderr } = await execAsync(
        `bash ${process.cwd()}/psyops/run.sh ${listingId} ${max} ${reviewsUrl}}`
      )
      if (stderr) {
        throw new SafeError(stderr)
      }
    } catch (err) {
      throw new SafeError(err)
    }

    return await this.fetchFromDB(listingId)
  }
}

export default DashboardService
