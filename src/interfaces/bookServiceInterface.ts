import { IBook } from "./bookInterface";

export interface IBookService {
    createBook(bookData: IBook): Promise<IBook | null>;
    getAllBooks(page: number, limit: number, name: string, price: number,
        author: string, category: string): Promise<any>;
    updateBook(bookId: string, updateData: IBook): Promise<IBook | null>;
    deleteBook(bookId: string): Promise<any>;
}