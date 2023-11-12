"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SafeError extends Error {
    forClient;
    constructor(message, forClient = false) {
        super(message);
        this.name = 'SafeError';
        this.forClient = forClient;
    }
}
exports.default = SafeError;
