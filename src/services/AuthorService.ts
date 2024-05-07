import { injectable } from 'inversify';
import { Author } from '../models/authorModels';

@injectable()
export class AuthorService {
    async createAuthor(authorData: any): Promise<any> {
        try {
            const author = await Author.create(authorData);
            return author;
        } catch (error) {
            throw new Error('Failed to create author');
        }
    }

    async getAuthorById(authorId: string): Promise<any> {
        try {
            const author = await Author.findById(authorId);
            return author;
        } catch (error) {
            throw new Error('Failed to get author by ID');
        }
    }

    async updateAuthor(authorId: string, updateData: any): Promise<any> {
        try {
            const author = await Author.findByIdAndUpdate(authorId, updateData, { new: true });
            return author;
        } catch (error) {
            throw new Error('Failed to update author');
        }
    }

    async deleteAuthor(authorId: string): Promise<any> {
        try {
            await Author.findByIdAndDelete(authorId);
            return { message: 'Author deleted successfully' };
        } catch (error) {
            throw new Error('Failed to delete author');
        }
    }
}
