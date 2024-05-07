"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
const inversify_1 = require("inversify");
const AuthorService_1 = require("./services/AuthorService");
const CategoryService_1 = require("./services/CategoryService");
const BookService_1 = require("./services/BookService");
const UserService_1 = require("./services/UserService");
const AuthorController_1 = require("./controllers/AuthorController");
const CategoryController_1 = require("./controllers/CategoryController");
const BookController_1 = require("./controllers/BookController");
const UserController_1 = require("./controllers/UserController");
const container = new inversify_1.Container();
exports.container = container;
// Bind services
container.bind(AuthorService_1.AuthorService).toSelf();
container.bind(CategoryService_1.CategoryService).toSelf();
container.bind(BookService_1.BookService).toSelf();
container.bind(UserService_1.UserService).toSelf();
// Bind controllers
container.bind(AuthorController_1.AuthorController).toSelf();
container.bind(CategoryController_1.CategoryController).toSelf();
container.bind(BookController_1.BookController).toSelf();
container.bind(UserController_1.UserController).toSelf();
//# sourceMappingURL=inversify.config.js.map