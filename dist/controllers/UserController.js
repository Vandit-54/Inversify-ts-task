"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const inversify_1 = require("inversify");
const inversify_express_utils_1 = require("inversify-express-utils");
const UserService_1 = require("../services/UserService");
const auth_middelwear_1 = require("../middelwares/auth.middelwear");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userService.createUser(req.body);
                return res.status(201).json(user);
            }
            catch (error) {
                return res.status(500).json({ message: error.message });
            }
        });
    }
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const user = yield this.userService.login(email);
                if (!user) {
                    res.status(404).json({ message: "User not found" });
                }
                const comparePassword = bcryptjs_1.default.compareSync(password, user.password);
                if (comparePassword) {
                    const token = user.accessToken();
                    if (token) {
                        return res.status(200).json({ data: user, token: token });
                    }
                    else {
                        return res.status(400).json({ message: "Something went wrong" });
                    }
                }
                else {
                    return res.status(400).json({ message: "Invalid password" });
                }
            }
            catch (error) {
                return res.status(500).json({ message: error.message });
            }
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.body._id;
                const updatedUser = yield this.userService.updateUser(userId, req.body);
                return res.status(200).json(updatedUser);
            }
            catch (error) {
                return res.status(500).json({ message: error.message });
            }
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.body._id;
                const status = yield this.userService.deleteUser(userId);
                if (status != null) {
                    return res.status(200).json({ message: "User deleted successfully" });
                }
                else {
                    return res.status(404).json({ message: "User does not exist" });
                }
            }
            catch (error) {
                return res.status(500).json({ message: error.message });
            }
        });
    }
};
exports.UserController = UserController;
__decorate([
    (0, inversify_express_utils_1.httpPost)('/register'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    (0, inversify_express_utils_1.httpGet)('/login'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserById", null);
__decorate([
    (0, inversify_express_utils_1.httpPut)('/update', auth_middelwear_1.tokenVerificationMiddleware),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, inversify_express_utils_1.httpDelete)('/delete', auth_middelwear_1.tokenVerificationMiddleware),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
exports.UserController = UserController = __decorate([
    (0, inversify_express_utils_1.controller)('/user'),
    __param(0, (0, inversify_1.inject)(UserService_1.UserService)),
    __metadata("design:paramtypes", [UserService_1.UserService])
], UserController);
//# sourceMappingURL=UserController.js.map