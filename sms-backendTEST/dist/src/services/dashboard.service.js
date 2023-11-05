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
        const listingExists = await this.prisma.listing.findUnique({
            where: {
                userId: userId,
                place_url: reviews_url
            }
        });
        if (listingExists) {
            throw new safeError_1.default('Listing already exists', true);
        }
        await this.prisma.listing.create({
            data: {
                name: name,
                description: description,
                userId: userId,
                place_url: reviews_url
            }
        });
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
    async _fetchReviews(userId, listingId) {
        const listing = await this.prisma.listing.findUnique({
            where: {
                userId: userId,
                id: listingId
            }
        });
        if (!listing) {
            throw new safeError_1.default('Listing not found', true);
        }
        const dataExpiresIn = listing.dataExpiresIn;
        if (!dataExpiresIn || new Date() > dataExpiresIn) {
            return await this.runScraper(listingId, listing.place_url);
        }
        else if (new Date()) {
            return await this.fetchFromDB(listingId);
        }
    }
    async fetchFromDB(listingId) {
        const reviews = await this.prisma.review.findMany({
            where: {
                listingId: listingId
            }
        });
        if (!reviews) {
            throw new safeError_1.default('No reviews found', true);
        }
        return reviews;
    }
    async runScraper(listingId, reviewsUrl, max = 20) {
        try {
            const { stdout, stderr } = await execAsync(`bash ${process.cwd()}/psyops/run.sh ${listingId} ${max} ${reviewsUrl}}`);
            if (stderr) {
                throw new safeError_1.default(stderr);
            }
        }
        catch (err) {
            throw new safeError_1.default(err);
        }
        return await this.fetchFromDB(listingId);
    }
}
exports.default = DashboardService;
