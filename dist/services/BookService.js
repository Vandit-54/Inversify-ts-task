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
exports.BookService = void 0;
// bookService.ts
const inversify_1 = require("inversify");
const bookModels_1 = require("../models/bookModels");
let BookService = class BookService {
    createBook(bookData) {
        return __awaiter(this, void 0, void 0, function* () {
            // const authorID = bookData.author;
            // const categoryID = bookData.category
            // const author = await Author.findById(authorID);
            // if (!author) {
            //     throw new Error('Author not found');
            // }
            // bookData.author = author.name
            // const category = await Category.findById(categoryID);
            // if (!category) {
            //     throw new Error('Category not found');
            // }
            // bookData.category = category.name
            try {
                const book = yield bookModels_1.Book.create(bookData);
                return book;
            }
            catch (error) {
                throw new Error('Failed to create book');
            }
        });
    }
    getAllBooks(page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const skip = (page - 1) * limit;
                const books = yield bookModels_1.Book.find().skip(skip).limit(limit);
                return books;
            }
            catch (error) {
                throw new Error('Failed to get all books');
            }
        });
    }
    getBookById(bookName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const book = yield bookModels_1.Book.findOne({ title: bookName });
                return book;
            }
            catch (error) {
                throw new Error('Failed to get book by name');
            }
        });
    }
    updateBook(bookName, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const book = yield bookModels_1.Book.findOneAndUpdate({ title: bookName }, updateData, { new: true });
                return book;
            }
            catch (error) {
                throw new Error('Failed to update book');
            }
        });
    }
    deleteBook(bookName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(bookName);
                const deletedBook = yield bookModels_1.Book.findOneAndDelete({ title: bookName });
                console.log(deletedBook);
                if (!deletedBook) {
                    throw new Error('Book not found');
                }
                return { message: 'Book deleted successfully' };
            }
            catch (error) {
                throw new Error('Failed to delete book: ' + error.message);
            }
        });
    }
};
exports.BookService = BookService;
exports.BookService = BookService = __decorate([
    (0, inversify_1.injectable)()
], BookService);
//# sourceMappingURL=BookService.js.map