"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dashboard_controller_1 = __importDefault(require("../controllers/dashboard.controller"));
const express_1 = require("express");
const onlyAuth_middleware_1 = __importDefault(require("../middlewares/onlyAuth.middleware"));
const dashboardRouter = (0, express_1.Router)();
const dashboardController = new dashboard_controller_1.default();
dashboardRouter.post('/create-listing', onlyAuth_middleware_1.default, async (req, res) => {
    await dashboardController.createListing(req, res);
});
dashboardRouter.get('/get-listing', onlyAuth_middleware_1.default, async (req, res) => {
    await dashboardController.getListing(req, res);
});
dashboardRouter.get('/fetch-reviews', onlyAuth_middleware_1.default, async (req, res) => {
    await dashboardController.fetchReviews(req, res);
});
exports.default = dashboardRouter;
