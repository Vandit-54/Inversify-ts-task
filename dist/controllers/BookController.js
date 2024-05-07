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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const inversify_1 = require("inversify");
const inversify_express_utils_1 = require("inversify-express-utils");
const BookService_1 = require("../services/BookService");
const auth_middelwear_1 = require("../middelwares/auth.middelwear");
let BookController = class BookController {
    constructor(bookService) {
        this.bookService = bookService;
    }
    createBook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const book = yield this.bookService.createBook(req.body);
                return res.status(201).json(book);
            }
            catch (error) {
                return res.status(500).json({ message: error.message });
            }
        });
    }
    getAllBooks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { page = 1, limit = 10 } = req.query;
                const books = yield this.bookService.getAllBooks(parseInt(page), parseInt(limit));
                return res.status(200).json(books);
            }
            catch (error) {
                return res.status(500).json({ message: error.message });
            }
        });
    }
    getBookById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bookId = req.params.name;
                const book = yield this.bookService.getBookById(bookId);
                return res.status(200).json(book);
            }
            catch (error) {
                return res.status(500).json({ message: error.message });
            }
        });
    }
    updateBook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bookId = req.params.name;
                const updatedBook = yield this.bookService.updateBook(bookId, req.body);
                return res.status(200).json(updatedBook);
            }
            catch (error) {
                return res.status(500).json({ message: error.message });
            }
        });
    }
    deleteBook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bookId = req.params.name;
                yield this.bookService.deleteBook(bookId);
                return res.status(200).json({ message: "Book deleted successfully" });
            }
            catch (error) {
                return res.status(500).json({ message: error.message });
            }
        });
    }
};
exports.BookController = BookController;
__decorate([
    (0, inversify_express_utils_1.httpPost)('/create', auth_middelwear_1.tokenVerificationMiddleware),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "createBook", null);
__decorate([
    (0, inversify_express_utils_1.httpGet)('/all', auth_middelwear_1.tokenVerificationMiddleware),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "getAllBooks", null);
__decorate([
    (0, inversify_express_utils_1.httpGet)('/:name', auth_middelwear_1.tokenVerificationMiddleware),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "getBookById", null);
__decorate([
    (0, inversify_express_utils_1.httpPut)('/update/:name', auth_middelwear_1.tokenVerificationMiddleware),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "updateBook", null);
__decorate([
    (0, inversify_express_utils_1.httpDelete)('/delete/:name', auth_middelwear_1.tokenVerificationMiddleware),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "deleteBook", null);
exports.BookController = BookController = __decorate([
    (0, inversify_express_utils_1.controller)('/books'),
    __param(0, (0, inversify_1.inject)(BookService_1.BookService)),
    __metadata("design:paramtypes", [BookService_1.BookService])
], BookController);
//# sourceMappingURL=BookController.js.map