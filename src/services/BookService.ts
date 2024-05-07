// bookService.ts
import { injectable } from 'inversify';
import { Book } from '../models/bookModels';
import { Author } from '../models/authorModels';
import { Category } from '../models/categoryModels';
import { log } from 'console';

@injectable()
export class BookService {
    async createBook(bookData: any): Promise<any> {
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

    async getAllBooks(page: number, limit: number): Promise<any> {
        try {
            const skip = (page - 1) * limit;
            const books = await Book.find().skip(skip).limit(limit);
            return books;
        } catch (error) {
            throw new Error('Failed to get all books');
        }
    }

    async getBookById(bookName: string): Promise<any> {
        try {
            const book = await Book.findOne({ title: bookName });
            return book;
        } catch (error) {
            throw new Error('Failed to get book by name');
        }
    }
    
    async updateBook(bookName: string, updateData: any): Promise<any> {
        try {
            const book = await Book.findOneAndUpdate({ title: bookName }, updateData, { new: true });
            return book;
        } catch (error) {
            throw new Error('Failed to update book');
        }
    }
    

    async deleteBook(bookName: string): Promise<any> {
        try {
            console.log(bookName);
            const deletedBook = await Book.findOneAndDelete({ title: bookName });
            console.log(deletedBook);
            if (!deletedBook) {
                throw new Error('Book not found');
            }
            return { message: 'Book deleted successfully' };
        } catch (error) {
            throw new Error('Failed to delete book: ' + error.message);
        }
    }
    
}
