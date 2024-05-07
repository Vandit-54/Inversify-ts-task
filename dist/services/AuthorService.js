"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.AuthorService = void 0;
// authorService.ts
const inversify_1 = require("inversify");
const authorModels_1 = require("../models/authorModels");
let AuthorService = class AuthorService {
    createAuthor(authorData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const author = yield authorModels_1.Author.create(authorData);
                return author;
            }
            catch (error) {
                throw new Error('Failed to create author');
            }
        });
    }
    login(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const author = yield authorModels_1.Author.findOne({ email });
                return author;
            }
            catch (error) {
                console.log(error);
                throw new Error('Failed to get author by ID');
            }
        });
    }
    updateAuthor(authorId, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield authorModels_1.Author.findById(authorId);
                if (!user) {
                    throw new Error('Author not found');
                }
                delete updateData.password;
                const updatedUser = yield authorModels_1.Author.findByIdAndUpdate(authorId, updateData, { new: true }).select("-password");
                return updatedUser;
            }
            catch (error) {
                throw new Error('Failed to update user');
            }
        });
    }
    deleteAuthor(authorId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield authorModels_1.Author.findByIdAndDelete(authorId);
                return { message: 'Author deleted successfully' };
            }
            catch (error) {
                throw new Error('Failed to delete author');
            }
        });
    }
};
exports.AuthorService = AuthorService;
exports.AuthorService = AuthorService = __decorate([
    (0, inversify_1.injectable)()
], AuthorService);
//# sourceMappingURL=AuthorService.js.map