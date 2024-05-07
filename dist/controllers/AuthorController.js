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
exports.AuthorController = void 0;
const inversify_1 = require("inversify");
const inversify_express_utils_1 = require("inversify-express-utils");
const AuthorService_1 = require("../services/AuthorService");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
let AuthorController = class AuthorController {
    constructor(authorService) {
        this.authorService = authorService;
    }
    createAuthor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const author = yield this.authorService.createAuthor(req.body);
                return res.status(201).json(author);
            }
            catch (error) {
                return res.status(500).json({ message: error.message });
            }
        });
    }
    getAuthorById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const author = yield this.authorService.login(email);
                if (!author) {
                    res.status(404).json({ message: "Author not found" });
                }
                const comparePassword = bcryptjs_1.default.compareSync(password, author.password);
                if (comparePassword) {
                    const token = author.accessToken();
                    if (token) {
                        return res.status(200).json({ data: author, token: token });
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
    updateAuthor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const authorId = req.body._id;
                const updatedAuthor = yield this.authorService.updateAuthor(authorId, req.body);
                return res.status(200).json(updatedAuthor);
            }
            catch (error) {
                return res.status(500).json({ message: error.message });
            }
        });
    }
    deleteAuthor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const authorId = req.body._id;
                const status = yield this.authorService.deleteAuthor(authorId);
                if (status != null) {
                    return res.status(200).json({ message: "Author deleted successfully" });
                }
                else {
                    return res.status(404).json({ message: "Author does not exist" });
                }
            }
            catch (error) {
                return res.status(500).json({ message: error.message });
            }
        });
    }
};
exports.AuthorController = AuthorController;
__decorate([
    (0, inversify_express_utils_1.httpPost)('/register'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthorController.prototype, "createAuthor", null);
__decorate([
    (0, inversify_express_utils_1.httpGet)('/login'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthorController.prototype, "getAuthorById", null);
__decorate([
    (0, inversify_express_utils_1.httpPut)('/update'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthorController.prototype, "updateAuthor", null);
__decorate([
    (0, inversify_express_utils_1.httpDelete)('/delete'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthorController.prototype, "deleteAuthor", null);
exports.AuthorController = AuthorController = __decorate([
    (0, inversify_express_utils_1.controller)('/author'),
    __param(0, (0, inversify_1.inject)(AuthorService_1.AuthorService)),
    __metadata("design:paramtypes", [AuthorService_1.AuthorService])
], AuthorController);
//# sourceMappingURL=AuthorController.js.map