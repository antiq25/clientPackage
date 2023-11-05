"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const recovery_service_1 = __importDefault(require("../services/recovery.service"));
const joi_1 = __importDefault(require("joi"));
const safeError_1 = __importDefault(require("../safeError"));
const safeReturn_1 = __importDefault(require("../safeReturn"));
class RecoveryController extends recovery_service_1.default {
    forgotPassword = async (req, res) => {
        try {
            const { email } = req.body;
            const schema = joi_1.default.object({
                email: joi_1.default.string().email().required()
            });
            const { error } = schema.validate({ email });
            if (error) {
                throw new safeError_1.default(error.message, true);
            }
            await this._forgotPassword(email);
            res.status(200).json({
                message: 'Password reset email sent'
            });
        }
        catch (err) {
            return (0, safeReturn_1.default)(res, err);
        }
    };
    resetPassword = async (req, res) => {
        try {
            const { code, password } = req.body;
            const schema = joi_1.default.object({
                code: joi_1.default.string().required(),
                password: joi_1.default.string().min(8).required()
            });
            const { error } = schema.validate({ code, password });
            if (error) {
                throw new safeError_1.default(error.message, true);
            }
            const user = await this._resetPassword(code, password);
            if (!user) {
                throw new safeError_1.default('Password reset failed', true);
            }
            res.status(200).json({
                message: 'Password reset successful'
            });
        }
        catch (err) {
            return (0, safeReturn_1.default)(res, err);
        }
    };
}
exports.default = RecoveryController;
