import { injectable } from 'inversify';
import { Author } from '../models/author.Models';
import { IAuthor } from '../interfaces';
import { IAuthorService } from '../interfaces/authorService.Interface';


@injectable()
export class AuthorService implements IAuthorService {
    async createAuthor(authorData: IAuthor): Promise<IAuthor> {
        try {
            const author = await Author.create(authorData);
            return author;
        } catch (error) {
            throw new Error('Failed to create author');
        }
    }

    async login(email: string): Promise<IAuthor> {
        try {
            const author = await Author.findOne({email});
            return author;
        } catch (error) {
            console.log(error);
            throw new Error('Failed to get author by ID');
        }
    }

    async updateAuthor(authorId: string, updateData: IAuthor): Promise<IAuthor> {

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
