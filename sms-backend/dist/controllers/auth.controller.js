"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_1 = __importDefault(require("../services/auth.service"));
const joi_1 = __importDefault(require("joi"));
const safeError_1 = __importDefault(require("../safeError"));
const safeReturn_1 = __importDefault(require("../safeReturn"));
class AuthController extends auth_service_1.default {
    constructor() {
        super();
    }
    signup = async (req, res) => {
        try {
            const { email, password, firstName, lastName } = req.body;
            const schema = joi_1.default.object({
                email: joi_1.default.string().email().required(),
                password: joi_1.default.string().min(8).required(),
                firstName: joi_1.default.string().required(),
                lastName: joi_1.default.string().required()
            });
            const { error } = schema.validate({
                email,
                password,
                firstName,
                lastName
            });
            if (error) {
                throw new safeError_1.default(error.message, true);
            }
            const user = await this._signup({ email, password, firstName, lastName });
            if (!user) {
                throw new safeError_1.default('Signup failed', true);
            }
            res.status(200).json({
                message: 'Signup successful',
                user
            });
        }
        catch (err) {
            return (0, safeReturn_1.default)(res, err);
        }
    };
    login = async (req, res) => {
        try {
            const { email, password } = req.body;
            const schema = joi_1.default.object({
                email: joi_1.default.string().email().required(),
                password: joi_1.default.string().min(8).required()
            });
            const { error } = schema.validate({ email, password });
            if (error) {
                throw new Error(error.message);
            }
            const token = await this._login({ email, password });
            if (!token) {
                throw new safeError_1.default('Login failed', true);
            }
            res.status(200).json({
                message: 'Login successful',
                token
            });
        }
        catch (err) {
            return (0, safeReturn_1.default)(res, err);
        }
    };
    verifyEmail = async (req, res) => {
        try {
            const { code } = req.query;
            const schema = joi_1.default.object({
                code: joi_1.default.string().required()
            });
            const { error } = schema.validate({ code });
            if (error) {
                throw new safeError_1.default(error.message);
            }
            const user = await this._verifyEmail(code);
            if (!user) {
                throw new safeError_1.default('Verification failed', true);
            }
            res.status(200).json({
                message: 'Verification successful'
            });
        }
        catch (err) {
            return (0, safeReturn_1.default)(res, err);
        }
    };
    resendEmailVerification = async (req, res) => {
        try {
            const { email } = req.body;
            const schema = joi_1.default.object({
                email: joi_1.default.string().email().required()
            });
            const { error } = schema.validate({ email });
            if (error) {
                throw new safeError_1.default(error.message);
            }
            const code = await this._resendVerificationEmail(email);
            if (!code) {
                throw new safeError_1.default('Resend failed', true);
            }
            res.status(200).json({
                message: 'Resend successful'
            });
        }
        catch (err) {
            return (0, safeReturn_1.default)(res, err);
        }
    };
}
exports.default = AuthController;
