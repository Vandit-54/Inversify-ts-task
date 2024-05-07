import { Container } from 'inversify';
import { AuthorService } from './services/AuthorService';
import { CategoryService } from './services/CategoryService';
import { BookService } from './services/BookService';
import { UserService } from './services/UserService';
import { AuthorController } from './controllers/AuthorController';
import { CategoryController } from './controllers/CategoryController';
import { BookController } from './controllers/BookController';
import { UserController } from './controllers/UserController';

const container = new Container();

// Bind services
container.bind<AuthorService>(AuthorService).toSelf();
container.bind<CategoryService>(CategoryService).toSelf();
container.bind<BookService>(BookService).toSelf();
container.bind<UserService>(UserService).toSelf();

// Bind controllers
container.bind<AuthorController>(AuthorController).toSelf();
container.bind<CategoryController>(CategoryController).toSelf();
container.bind<BookController>(BookController).toSelf();
container.bind<UserController>(UserController).toSelf();

export { container };
