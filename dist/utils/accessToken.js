"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function generateAccessToken() {
    const { ACCESS_TOKEN, ACCESS_TOKEN_EXPIRE } = process.env;
    if (!ACCESS_TOKEN || !ACCESS_TOKEN_EXPIRE) {
        throw new Error('ACCESS_TOKEN and ACCESS_TOKEN_EXPIRE must be defined in environment variables.');
    }
    const payload = {
        id: this._id,
        name: this.name,
        email: this.email,
    };
    try {
        const token = jsonwebtoken_1.default.sign(payload, ACCESS_TOKEN, { expiresIn: ACCESS_TOKEN_EXPIRE });
        return token;
    }
    catch (error) {
        throw new Error('Error signing token: ' + error.message);
    }
}
exports.generateAccessToken = generateAccessToken;
//# sourceMappingURL=accessToken.js.map