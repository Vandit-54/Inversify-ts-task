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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Author = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const passwordHelper_1 = require("../utils/passwordHelper");
const accessToken_1 = require("../utils/accessToken");
const authorSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Please provide author Name']
    },
    email: {
        type: String,
        required: [true, 'Please provide author Email'],
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        minlength: [6, "Please provide a password with min length : 6 "],
        required: [true, "Please provide a password"]
    },
    biography: {
        type: String,
        required: [true, "Please provide a biography"]
    },
    nationality: {
        type: String,
        required: [true, "Please provide a nationality"]
    }
});
authorSchema.pre("save", passwordHelper_1.passwordHelper);
authorSchema.methods.accessToken = accessToken_1.generateAccessToken;
exports.Author = mongoose_1.default.model('Author', authorSchema);
//# sourceMappingURL=authorModels.js.map