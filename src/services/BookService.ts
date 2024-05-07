import { injectable } from 'inversify';
import { Book } from '../models/bookModels';

@injectable()
export class BookService {
    async createBook(bookData: any): Promise<any> {
        try {
            const book = await Book.create(bookData);
            return book;
        } catch (error) {
            throw new Error('Failed to create book');
        }
    }

    async getBookById(bookId: string): Promise<any> {
        try {
            const book = await Book.findById(bookId);
            return book;
        } catch (error) {
            throw new Error('Failed to get book by ID');
        }
    }

    async updateBook(bookId: string, updateData: any): Promise<any> {
        try {
            const book = await Book.findByIdAndUpdate(bookId, updateData, { new: true });
            return book;
        } catch (error) {
            throw new Error('Failed to update book');
        }
    }

    async deleteBook(bookId: string): Promise<any> {
        try {
            await Book.findByIdAndDelete(bookId);
            return { message: 'Book deleted successfully' };
        } catch (error) {
            throw new Error('Failed to delete book');
        }
    }
}
