"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const onlyAuth_middleware_1 = __importDefault(require("../middlewares/onlyAuth.middleware"));
const authRouter = (0, express_1.Router)();
const authController = new auth_controller_1.default();
authRouter.post('/signup', async (req, res) => {
    await authController.signup(req, res);
});
authRouter.post('/login', async (req, res) => {
    await authController.login(req, res);
});
authRouter.get('/verify', onlyAuth_middleware_1.default, async (req, res) => {
    await authController.verifyEmail(req, res);
});
authRouter.post('/request-email-verif', onlyAuth_middleware_1.default, async (req, res) => {
    await authController.resendEmailVerification(req, res);
});
exports.default = authRouter;
