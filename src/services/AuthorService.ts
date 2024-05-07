// authorService.ts
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

    async login(email: any): Promise<any> {
        try {
            const author = await Author.findOne({email});
            return author;
        } catch (error) {
            console.log(error);
            throw new Error('Failed to get author by ID');
        }
    }

    async updateAuthor(authorId: string, updateData: any): Promise<any> {

        try {
            const user = await Author.findById(authorId);
            if (!user) {
                throw new Error('Author not found');
            }
            delete updateData.password;
            const updatedUser = await Author.findByIdAndUpdate(authorId, updateData, { new: true }).select("-password");
            return updatedUser;
        } catch (error) {
            throw new Error('Failed to update user');
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
