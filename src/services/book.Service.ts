// bookService.ts
import { injectable } from 'inversify';
import { Book } from '../models';
import { IBook } from '../interfaces';
import { IBookService } from '../interfaces';
import { Types } from 'mongoose';

@injectable()
export class BookService implements IBookService {
    async createBook(bookData: IBook): Promise<IBook | null> {
            const book = await Book.create(bookData);
            return book;
    }

    async  getAllBooks(page: number, limit: number, name?: string, price?: number, author?: string, category?: string) {
        const match: any = {};
    
        if (name) match.name = { $regex: name, $options: 'i' };  
        if (price) match.price = price;
        if (author) match.author = new Types.ObjectId(author);
        if (category) match.category = new Types.ObjectId(category);
    
        const books = await Book.aggregate([
            { $match: match },
            {
                $lookup: {
                    from: 'authors',
                    localField: 'author',
                    foreignField: '_id',
                    as: 'author'
                }
            },
            {
                $lookup: {
                    from: 'categories',
                    localField: 'category',
                    foreignField: '_id',
                    as: 'category'
                }
            },
            {
                $addFields: {
                    authorName: { $arrayElemAt: ['$author.name', 0] },
                    categoryName: { $arrayElemAt: ['$category.name', 0] }
                }
            },
            {
                $project: {
                    author: 0,
                    category: 0
                }
            },
            { $skip: (page - 1) * limit },
            { $limit: limit }
        ]).exec();
    
        return books;
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
