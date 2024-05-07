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
exports.CategoryController = void 0;
const inversify_1 = require("inversify");
const inversify_express_utils_1 = require("inversify-express-utils");
const CategoryService_1 = require("../services/CategoryService");
const auth_middelwear_1 = require("../middelwares/auth.middelwear");
let CategoryController = class CategoryController {
    constructor(categoryService) {
        this.categoryService = categoryService;
    }
    createCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield this.categoryService.createCategory(req.body);
                return res.status(201).json(category);
            }
            catch (error) {
                return res.status(500).json({ message: error.message });
            }
        });
    }
    getAllCategories(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { page = 1, limit = 10 } = req.query;
                const categories = yield this.categoryService.getAllCategories(parseInt(page), parseInt(limit));
                return res.status(200).json(categories);
            }
            catch (error) {
                return res.status(500).json({ message: error.message });
            }
        });
    }
    getCategoryByName(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categoryName = req.params.name;
                const category = yield this.categoryService.getCategoryByName(categoryName);
                if (category != null) {
                    return res.status(200).json(category);
                }
                return res.status(404).json({ message: "Category Not found" });
            }
            catch (error) {
                return res.status(500).json({ message: error.message });
            }
        });
    }
    updateCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categoryName = req.params.name;
                const updatedCategory = yield this.categoryService.updateCategory(categoryName, req.body);
                return res.status(200).json(updatedCategory);
            }
            catch (error) {
                return res.status(500).json({ message: error.message });
            }
        });
    }
    deleteCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const name = req.params.name;
                const category = yield this.categoryService.deleteCategory(name);
                if (category != null) {
                    return res.status(200).json({ message: "category deleted succesfully" });
                }
                return res.status(404).json({ message: "Category Not found" });
            }
            catch (error) {
                return res.status(500).json({ message: error.message });
            }
        });
    }
};
exports.CategoryController = CategoryController;
__decorate([
    (0, inversify_express_utils_1.httpPost)('/create', auth_middelwear_1.tokenVerificationMiddleware),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "createCategory", null);
__decorate([
    (0, inversify_express_utils_1.httpGet)('/all', auth_middelwear_1.tokenVerificationMiddleware),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getAllCategories", null);
__decorate([
    (0, inversify_express_utils_1.httpGet)('/:name', auth_middelwear_1.tokenVerificationMiddleware),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getCategoryByName", null);
__decorate([
    (0, inversify_express_utils_1.httpPut)('/update/:name', auth_middelwear_1.tokenVerificationMiddleware),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "updateCategory", null);
__decorate([
    (0, inversify_express_utils_1.httpDelete)('/delete/:name', auth_middelwear_1.tokenVerificationMiddleware),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "deleteCategory", null);
exports.CategoryController = CategoryController = __decorate([
    (0, inversify_express_utils_1.controller)('/category'),
    __param(0, (0, inversify_1.inject)(CategoryService_1.CategoryService)),
    __metadata("design:paramtypes", [CategoryService_1.CategoryService])
], CategoryController);
//# sourceMappingURL=CategoryController.js.map