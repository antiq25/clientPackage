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
    const listingExists = await this.prisma.listing.findFirst({
      where: {
        userId: userId,
        place_url: reviews_url
      }
    })
    
    if (listingExists) {
      throw new SafeError('Listing already exists', true)
    }

    const newListing = await this.prisma.listing.create({
      data: {
        name: name,
        description: description,
        userId: userId,
        place_url: reviews_url
      }
    })

    this.runScraper(newListing.id, 100)
      .then(() =>
        console.log(
          'Background scraping completed for listing ID:',
          newListing.id
        )
      )
      .catch((err) => console.error('Scraping error:', err))

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

  public async _fetchReviews(userId: number, listingId: number, max: number) {
    const listing = await this.prisma.listing.findUnique({
      where: {
        userId: userId,
        id: listingId
      }
    })

    if (!listing) {
      throw new SafeError('Listing not found', true)
    }

    const reviews = await this.fetchFromDB(listingId, max)

    const dataExpiresIn = listing.dataExpiresIn

    const isExpired = () => {
      if (!dataExpiresIn) return false

      const now = new Date()
      const expiresAt = new Date(dataExpiresIn)
      return now >= expiresAt
    }

    if (!isExpired() && reviews.length > 0 && max <= reviews.length) {
      return reviews
    } else if (isExpired() || reviews.length === 0 || max > reviews.length) {
      console.log('scraping reviews')
      // Delete all associated reviews first
      const reviewsDeleted = await this._deleteReviews(listingId);
      if (!reviewsDeleted) {
        throw new SafeError('Failed to delete associated reviews', true);
      }

      const reviews = await this.runScraper(listingId, max)

      return reviews
    }
  }

  private async fetchFromDB(listingId: number, max: number) {
    const reviews = await this.prisma.review.findMany({
      where: {
        listingId: listingId
      }
    })

    if (!reviews) {
      throw new SafeError('No reviews found', true)
    }

    return reviews.slice(0)
  }

  private async runScraper(listingId: number, max: number) {
    await this.prisma.review.deleteMany({
      where: {
        listingId: listingId
      }
    })
    try {
      const { stdout, stderr } = await execAsync(
        `bash ${process.cwd()}/psyops/run.sh ${listingId} ${max}`
      )
      if (stderr) {
        throw new SafeError(stderr)
      }

      console.log('Stdout ', stdout)
      console.log('Stderr ', stderr)
    } catch (err) {
      throw new SafeError(err)
    }

    return await this.fetchFromDB(listingId, max)
  }

  public async _deleteReviews(listingId: number) {
    try {
      await this.prisma.review.deleteMany({
        where: {
          listingId: listingId
        }
      })
      return true
    } catch (error) {
      console.error('Error deleting reviews:', error)
      throw new SafeError('Error deleting reviews', true)
    }
  }

  public async _deleteListing(listingId: number) {
    try {
      // Delete all associated reviews first
      const reviewsDeleted = await this._deleteReviews(listingId);
      if (!reviewsDeleted) {
        throw new SafeError('Failed to delete associated reviews', true);
      }
  
      // Now delete the listing
      await this.prisma.listing.delete({
        where: {
          id: listingId
        }
      });
      return true;
    } catch (error) {
      console.error('Error deleting listing:', error);
      throw new SafeError('Error deleting listing', true);
    }
  }
}

export default DashboardService
