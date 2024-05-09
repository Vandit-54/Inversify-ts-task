// bookService.ts
import { injectable } from 'inversify';
import { Book } from '../models';
import { IBook } from '../interfaces';
import { IBookService } from '../interfaces';

@injectable()
export class BookService implements IBookService {
    async createBook(bookData: IBook): Promise<IBook | null> {
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
            const book = await Book.create(bookData);
            return book;
        } catch (error) {
            throw new Error('Failed to create book');
        }
    }

    async getAllBooks(page: number, limit: number, name?: string, price?: number, author?: string, category?: string): Promise<any> {
        try {
            const skip = (page - 1) * limit;
            let query = {};

            if (name) query['name'] = { $regex: name, $options: 'i' }; // Case-insensitive regex for partial match
            if (price) query['price'] = price;
            if (author) query['author'] = author;
            if (category) query['category'] = category;

            const books = await Book.find(query).skip(skip).limit(limit);
            return books;
        } catch (error) {
            throw new Error('Failed to get all books');
        }
    }


    async updateBook(bookId: string, updateData: IBook): Promise<IBook | null> {
        try {
            const updatedBook = await Book.findByIdAndUpdate(bookId, updateData, { new: true });
            if (!updatedBook) {
                throw new Error('Book not found');
            }
            return updatedBook;
        } catch (error) {
            throw new Error('Failed to update book: ' + error.message);
        }
    }

    async deleteBook(bookId: string): Promise<any> {
        try {
            const deletedBook = await Book.findByIdAndDelete(bookId);
            if (!deletedBook) {
                throw new Error('Book not found');
            }
            return { message: 'Book deleted successfully' };
        } catch (error) {
            throw new Error('Failed to delete book: ' + error.message);
        }
    }


}
