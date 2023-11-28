"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../prisma"));
const safeError_1 = __importDefault(require("../safeError"));
const child_process_1 = require("child_process");
const util_1 = require("util");
const execAsync = (0, util_1.promisify)(child_process_1.exec);
class DashboardService {
    prisma = prisma_1.default;
    async _createListing(userId, name, reviews_url, description) {
        const listingExists = await this.prisma.listing.findFirst({
            where: {
                userId: userId,
                place_url: reviews_url
            }
        });
        if (listingExists) {
            throw new safeError_1.default('Listing already exists', true);
        }
        const newListing = await this.prisma.listing.create({
            data: {
                name: name,
                description: description,
                userId: userId,
                place_url: reviews_url
            }
        });
        this.runScraper(newListing.id, 100)
            .then(() => console.log('Background scraping completed for listing ID:', newListing.id))
            .catch((err) => console.error('Scraping error:', err));
        return true;
    }
    async _getListing(userId, listingName) {
        if (listingName) {
            const listing = await this.prisma.listing.findUnique({
                where: {
                    userId: userId,
                    name: listingName
                }
            });
            if (!listing) {
                throw new safeError_1.default('Listing not found', true);
            }
            return listing;
        }
        else {
            const listings = await this.prisma.listing.findMany({
                where: {
                    userId: userId
                }
            });
            return listings;
        }
    }
    async _fetchReviews(userId, listingId, max) {
        const listing = await this.prisma.listing.findUnique({
            where: {
                userId: userId,
                id: listingId
            }
        });
        if (!listing) {
            throw new safeError_1.default('Listing not found', true);
        }
        const reviews = await this.fetchFromDB(listingId, max);
        const dataExpiresIn = listing.dataExpiresIn;
        const isExpired = () => {
            if (!dataExpiresIn)
                return false;
            const now = new Date();
            const expiresAt = new Date(dataExpiresIn);
            return now >= expiresAt;
        };
        if (!isExpired() && reviews.length > 0 && max <= reviews.length) {
            return reviews;
        }
        else if (isExpired() || reviews.length === 0 || max > reviews.length) {
            console.log('scraping reviews');
            // Delete all associated reviews first
            const reviewsDeleted = await this._deleteReviews(listingId);
            if (!reviewsDeleted) {
                throw new safeError_1.default('Failed to delete associated reviews', true);
            }
            const reviews = await this.runScraper(listingId, max);
            return reviews;
        }
    }
    async fetchFromDB(listingId, max) {
        const reviews = await this.prisma.review.findMany({
            where: {
                listingId: listingId
            }
        });
        if (!reviews) {
            throw new safeError_1.default('No reviews found', true);
        }
        return reviews.slice(0);
    }
    async runScraper(listingId, max) {
        await this.prisma.review.deleteMany({
            where: {
                listingId: listingId
            }
        });
        try {
            const { stdout, stderr } = await execAsync(`bash ${process.cwd()}/psyops/run.sh ${listingId} ${max}`);
            if (stderr) {
                throw new safeError_1.default(stderr);
            }
            console.log('Stdout ', stdout);
            console.log('Stderr ', stderr);
        }
        catch (err) {
            throw new safeError_1.default(err);
        }
        return await this.fetchFromDB(listingId, max);
    }
    async _deleteReviews(listingId) {
        try {
            await this.prisma.review.deleteMany({
                where: {
                    listingId: listingId
                }
            });
            return true;
        }
        catch (error) {
            console.error('Error deleting reviews:', error);
            throw new safeError_1.default('Error deleting reviews', true);
        }
    }
    async _deleteListing(listingId) {
        try {
            // Delete all associated reviews first
            const reviewsDeleted = await this._deleteReviews(listingId);
            if (!reviewsDeleted) {
                throw new safeError_1.default('Failed to delete associated reviews', true);
            }
            // Now delete the listing
            await this.prisma.listing.delete({
                where: {
                    id: listingId
                }
            });
            return true;
        }
        catch (error) {
            console.error('Error deleting listing:', error);
            throw new safeError_1.default('Error deleting listing', true);
        }
    }
}
exports.default = DashboardService;
