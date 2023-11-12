"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../prisma"));
const safeError_1 = __importDefault(require("../safeError"));
class ProfileService {
    prisma = prisma_1.default;
    constructor() { }
    _getProfile = async (id) => {
        const profile = await this.prisma.user.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true
            }
        });
        if (!profile) {
            throw new safeError_1.default('Profile not found', true);
        }
        return profile;
    };
    _updateProfile = async (id, data) => {
        const profile = await this.prisma.user.update({
            where: {
                id
            },
            data: {
                firstName: data.firstName,
                lastName: data.lastName
            },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true
            }
        });
        if (!profile) {
            throw new safeError_1.default('Profile not found', true);
        }
        return profile;
    };
}
exports.default = ProfileService;
