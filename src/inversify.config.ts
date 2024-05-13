import { Container } from 'inversify';
import { AuthorService, CategoryService, BookService, UserService } from './services';
import { AuthorController, BookController, CategoryController, UserController } from './controllers';
import { AuthMiddleware, RoleMiddleware } from './middlewares';
import { IUserService, IAuthorService, ICategoryService, IBookService } from './interfaces';
import { TYPES } from './constants';


const container = new Container();

// Bind services
container.bind<IAuthorService>(TYPES.AuthorService).to(AuthorService);
container.bind<ICategoryService>(TYPES.CategoryService).to(CategoryService);
container.bind<IBookService>(TYPES.BookService).to(BookService);
container.bind<IUserService>(TYPES.UserService).to(UserService);

// Bind controllers
container.bind<AuthorController>(AuthorController).toSelf();
container.bind<CategoryController>(CategoryController).toSelf();
container.bind<BookController>(BookController).toSelf();
container.bind<UserController>(UserController).toSelf();

//Bind Middelwear
container.bind<AuthMiddleware>(AuthMiddleware).toSelf();
container.bind<RoleMiddleware>(RoleMiddleware).toSelf();

export { container };
