"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dashboard_service_1 = __importDefault(require("../services/dashboard.service"));
const joi_1 = __importDefault(require("joi"));
const safeError_1 = __importDefault(require("../safeError"));
const safeReturn_1 = __importDefault(require("../safeReturn"));
class DashboardController extends dashboard_service_1.default {
    async createListing(req, res) {
        const { name, reviews_url, description } = req.body;
        const userId = req.user.id;
        try {
            const schema = joi_1.default.object({
                name: joi_1.default.string().max(20).required(),
                reviews_url: joi_1.default.string().uri().required(),
                description: joi_1.default.string().optional()
            });
            const { error } = schema.validate({
                name,
                reviews_url,
                description
            });
            if (error) {
                throw new safeError_1.default(error.message, true);
            }
            const listing = await this._createListing(userId, name, reviews_url, description);
            if (!listing) {
                throw new safeError_1.default('Listing not created', true);
            }
            res.status(200).json({
                message: 'Listing created'
            });
        }
        catch (err) {
            return (0, safeReturn_1.default)(res, err);
        }
    }
    async getListing(req, res) {
        const { name } = req.query;
        const userId = req.user.id;
        const schema = joi_1.default.object({
            name: joi_1.default.string().max(20).optional()
        });
        try {
            const { error } = schema.validate({
                name
            });
            if (error) {
                throw new safeError_1.default(error.message, true);
            }
            const listing = await this._getListing(userId, name);
            if (!listing) {
                throw new safeError_1.default('Listing not found', true);
            }
            res.status(200).json({
                message: 'Listing found',
                listing
            });
        }
        catch (err) {
            return (0, safeReturn_1.default)(res, err);
        }
    }
    async fetchReviews(req, res) {
        const { listingId, max } = req.query;
        const userId = req.user.id;
        const schema = joi_1.default.object({
            listingId: joi_1.default.number().required()
        });
        try {
            const { error } = schema.validate({
                listingId
            });
            if (error) {
                throw new safeError_1.default(error.message, true);
            }
            const reviews = await this._fetchReviews(Number(userId), Number(listingId), max ? Number(max) : 10);
            console.log(reviews);
            if (!reviews) {
                throw new safeError_1.default('Reviews not found', true);
            }
            res.status(200).json({
                message: 'Reviews found',
                reviews
            });
        }
        catch (err) {
            return (0, safeReturn_1.default)(res, err);
        }
    }
}
exports.default = DashboardController;
