"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const safeError_1 = __importDefault(require("./safeError"));
const safeReturn = (res, error) => {
    if (error instanceof safeError_1.default && error.forClient) {
        return res.status(400).json({
            message: error.message
        });
    }
    else {
        console.log(error);
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
};
exports.default = safeReturn;
