"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const profile_service_1 = __importDefault(require("../services/profile.service"));
const joi_1 = __importDefault(require("joi"));
const safeError_1 = __importDefault(require("../safeError"));
const safeReturn_1 = __importDefault(require("../safeReturn"));
class ProfileController extends profile_service_1.default {
    constructor() {
        super();
    }
    getProfile = async (req, res) => {
        try {
            const { id } = req.user;
            const profile = await this._getProfile(id);
            if (!profile) {
                throw new safeError_1.default('Profile not found', true);
            }
            res.status(200).json({
                message: 'Profile found',
                profile
            });
        }
        catch (err) {
            return (0, safeReturn_1.default)(res, err);
        }
    };
    updateProfile = async (req, res) => {
        try {
            const { id } = req.user;
            const { firstName, lastName } = req.body;
            const schema = joi_1.default.object({
                firstName: joi_1.default.string().alphanum().max(20),
                lastName: joi_1.default.string().alphanum().min(2)
            });
            const { error } = schema.validate({
                firstName,
                lastName
            });
            if (error) {
                throw new safeError_1.default(error.message, true);
            }
            const profile = await this._updateProfile(id, { firstName, lastName });
            if (!profile) {
                throw new safeError_1.default('Profile not found', true);
            }
            res.status(200).json({
                message: 'Profile updated',
                user: {
                    firstName: profile.firstName,
                    lastName: profile.lastName
                }
            });
        }
        catch (err) {
            return (0, safeReturn_1.default)(res, err);
        }
    };
}
exports.default = ProfileController;
