"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const safeError_1 = __importDefault(require("../safeError"));
const onlyAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            throw new Error('No token provided');
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        if (!req.user) {
            throw new safeError_1.default('Invalid token');
        }
        next();
    }
    catch (err) {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }
};
exports.default = onlyAuth;
