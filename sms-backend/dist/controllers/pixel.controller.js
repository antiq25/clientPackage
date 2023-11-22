"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCount = exports.logActivity = void 0;
const express_1 = require("express");
const fs_1 = __importDefault(require("fs"));
/******************************************* P I X E L  S E R V I C E ******************************************************* */
const logActivity = (req, activityType, logFilePath) => {
    const timestamp = new Date().toISOString();
    const ipAddress = req.ip;
    const userAgent = req.headers['user-agent'] || 'Unknown';
    const logEntry = `Time: ${timestamp}, Activity: ${activityType}, IP: ${ipAddress}, User-Agent: ${userAgent}\n`;
    fs_1.default.appendFileSync(logFilePath, logEntry, 'utf8');
};
exports.logActivity = logActivity;
const getCount = (logFilePath, activityType) => {
    const data = fs_1.default.readFileSync(logFilePath, 'utf8');
    const lines = data.split('\n');
    const count = lines.filter((line) => line.includes(activityType)).length;
    return count;
};
exports.getCount = getCount;
/**************************************************************************************************** */
const pixelRouter = (0, express_1.Router)();
pixelRouter.post('/log-view', (req, res) => {
    (0, exports.logActivity)(req, 'VIEW', 'widget-activity.log');
    res.status(200).send('View logged');
});
pixelRouter.post('/log-click', (req, res) => {
    (0, exports.logActivity)(req, 'CLICK', 'widget-activity.log');
    res.status(200).send('Click logged');
});
pixelRouter.get('/view-count', (req, res) => {
    const count = (0, exports.getCount)('widget-activity.log', 'VIEW');
    res.json({ viewCount: count });
});
pixelRouter.get('/click-count', (req, res) => {
    const count = (0, exports.getCount)('widget-activity.log', 'CLICK');
    res.json({ clickCount: count });
});
exports.default = pixelRouter;
