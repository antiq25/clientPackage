"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../prisma"));
const utils_service_1 = __importDefault(require("./utils.service"));
const safeError_1 = __importDefault(require("../safeError"));
const redis_1 = __importDefault(require("../redis"));
class RecoveryService {
    prisma = prisma_1.default;
    redis = redis_1.default;
    _forgotPassword = async (email) => {
        const user = await this.prisma.user.findUnique({
            where: {
                email
            },
            select: {
                id: true,
                email: true
            }
        });
        if (!user) {
            throw new safeError_1.default('User not found', true);
        }
        const code = await utils_service_1.default.sendEmail(user.email, 'Password Reset', true, false);
        await this.redis.setex(`passwordRecovery:${code}`, 600, user.id);
        return true;
    };
    _resetPassword = async (code, newPassword) => {
        const id = await this.redis.get(`passwordRecovery:${code}`);
        if (!id) {
            throw new safeError_1.default('Invalid code', true);
        }
        const { salt, hash } = await utils_service_1.default.hashPassword(newPassword);
        await this.prisma.user.update({
            where: {
                id: Number(id)
            },
            data: {
                passwordHash: hash,
                passwordSalt: salt
            }
        });
        await this.redis.del(`passwordRecovery:${code}`);
        return true;
    };
}
exports.default = RecoveryService;
