"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const recovery_controller_1 = __importDefault(require("../controllers/recovery.controller"));
const recoveryRouter = (0, express_1.Router)();
const recoveryController = new recovery_controller_1.default();
recoveryRouter.post('/forgot-password', async (req, res) => {
    await recoveryController.forgotPassword(req, res);
});
recoveryRouter.post('/reset-password', async (req, res) => {
    await recoveryController.resetPassword(req, res);
});
exports.default = recoveryRouter;
