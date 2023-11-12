"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class PixelController {
    async servePixel(req, res) {
        try {
            console.log(`Received request for pixel: ${req.url}`);
            const logEntry = `Time: ${new Date().toISOString()}, IP: ${req.ip}, User-Agent: ${req.headers['user-agent']}\n`;
            fs_1.default.appendFile('pixel.log', logEntry, (err) => {
                if (err) {
                    console.error('Error writing to log:', err);
                }
            });
            const pixelPath = path_1.default.join(__dirname, '../img/pxl.png'); // Ensure this path is correct
            console.log(`Serving pixel from: ${pixelPath}`);
            res.sendFile(pixelPath);
        }
        catch (error) {
            console.error('Error in servePixel:', error);
            res.status(500).send('Error serving pixel');
        }
    }
}
exports.default = PixelController;
