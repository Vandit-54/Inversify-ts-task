import { Container } from 'inversify';
import { AuthorService, CategoryService, BookService, UserService } from './services';
import { AuthorController, BookController, CategoryController, UserController } from './controllers';
import { AuthMiddelwear } from './middelwares/authMiddelwear';

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

//Bind Middelwear
container.bind<AuthMiddelwear>(AuthMiddelwear).toSelf();

export { container };
