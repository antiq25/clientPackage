"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const profile_controller_1 = __importDefault(require("../controllers/profile.controller"));
const onlyAuth_middleware_1 = __importDefault(require("../middlewares/onlyAuth.middleware"));
const profileRouter = (0, express_1.Router)();
const profileController = new profile_controller_1.default();
profileRouter.get('/fetch', onlyAuth_middleware_1.default, async (req, res) => {
    await profileController.getProfile(req, res);
});
profileRouter.put('/update', onlyAuth_middleware_1.default, async (req, res) => {
    await profileController.updateProfile(req, res);
});
exports.default = profileRouter;
