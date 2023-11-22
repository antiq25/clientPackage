"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const profile_route_1 = __importDefault(require("./routes/profile.route"));
const recovery_route_1 = __importDefault(require("./routes/recovery.route"));
const dashboard_route_1 = __importDefault(require("./routes/dashboard.route"));
const pixel_controller_1 = __importDefault(require("./controllers/pixel.controller"));
const cors_1 = __importDefault(require("cors"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const app = (0, express_1.default)();
const prefix = '/api/v1';
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.send({ message: 'SMS API' });
});
app.use(`${prefix}/auth`, auth_route_1.default);
app.use(`${prefix}/profile`, profile_route_1.default);
app.use(`${prefix}/pixel`, pixel_controller_1.default);
app.use(`${prefix}/recovery`, recovery_route_1.default);
app.use(`${prefix}/dashboard`, dashboard_route_1.default);
app.use(`${prefix}/pixel`, pixel_controller_1.default);
app.listen(Number(process.env.PORT), '0.0.0.0', () => {
    console.log(`Server listening on port ${process.env.PORT}`);
});
