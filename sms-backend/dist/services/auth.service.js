"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../prisma"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const utils_service_1 = __importDefault(require("./utils.service"));
const safeError_1 = __importDefault(require("../safeError"));
const redis_1 = __importDefault(require("../redis"));
class AuthService {
    prisma = prisma_1.default;
    redis = redis_1.default;
    _signup = async (data) => {
        const exists = await this.prisma.user.findUnique({
            where: {
                email: data.email
            }
        });
        if (exists) {
            throw new safeError_1.default('User already exists', true);
        }
        const { salt, hash } = await utils_service_1.default.hashPassword(data.password);
        const code = await utils_service_1.default.sendEmail(data.email, 'Email Verification', false, true);
        const user = await this.prisma.user.create({
            data: {
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                passwordHash: hash,
                passwordSalt: salt
            },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true
            }
        });
        // 10 minutes
        await this.redis.setex(`emailVerification:${code}`, 600, user.id);
        return user;
    };
    _login = async (data) => {
        const user = await this.prisma.user.findUnique({
            where: {
                email: data.email
            },
            select: {
                id: true,
                email: true,
                passwordHash: true,
                passwordSalt: true,
                emailVerified: true
            }
        });
        if (!user) {
            throw new safeError_1.default('Invalid email or password', true);
        }
        const isValid = await utils_service_1.default.comparePassword(data.password, user.passwordSalt, user.passwordHash);
        if (!isValid) {
            throw new safeError_1.default('Invalid email or password', true);
        }
        const token = jsonwebtoken_1.default.sign({
            id: user.id,
            email: user.email,
            emailVerified: user.emailVerified
        }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });
        return { token };
    };
    _verifyEmail = async (code) => {
        const id = await this.redis.get(`emailVerification:${code}`);
        if (!id) {
            throw new safeError_1.default('Invalid code', true);
        }
        await this.prisma.user.update({
            where: {
                id: Number(id)
            },
            data: {
                emailVerified: true
            }
        });
        await this.redis.del(`emailVerification:${code}`);
        return true;
    };
    _resendVerificationEmail = async (email) => {
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
        const code = await utils_service_1.default.sendEmail(user.email, 'Email Verification', false, true);
        await this.redis.setex(`emailVerification:${code}`, 600, user.id);
        return true;
    };
}
exports.default = AuthService;
