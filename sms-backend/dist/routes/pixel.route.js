"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pixel_controller_1 = __importDefault(require("../controllers/pixel.controller"));
const pixelRouter = (0, express_1.Router)();
const pixelController = new pixel_controller_1.default();
// Define the route for serving the pixel
pixelRouter.get('/pixel', (req, res) => {
    pixelController.servePixel(req, res);
});
exports.default = pixelRouter;
