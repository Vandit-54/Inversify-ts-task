import { injectable } from 'inversify';
import { Author } from '../models/author.Models';
import { IAuthor } from '../interfaces';
import { IAuthorService } from '../interfaces/authorService.Interface';
import { Types } from 'mongoose';

@injectable()
export class AuthorService implements IAuthorService {
    async createAuthor(authorData: IAuthor): Promise<IAuthor> {
        const author = await Author.create(authorData);
        return author;
    }

    async login(email: string): Promise<IAuthor> {
        const author = await Author.findOne({ email });
        return author;
    }

    async updateAuthor(authorId: Types.ObjectId, updateData: IAuthor): Promise<IAuthor> {

        delete updateData.password;

        const filter = {
            _id: authorId
        }
        const update = {
            $set: {
                name: updateData.name,
                email: updateData.email,
                biography: updateData.biography,
                nationality: updateData.nationality
            }
        }
        const options = {
            new: true
        }

        const updatedUser = await Author.findByIdAndUpdate(filter, update, options).select("-password");
        return updatedUser;
    }

    async deleteAuthor(authorId: Types.ObjectId): Promise<any> {
        const author = await Author.findByIdAndDelete(authorId);
        return author;
    }
}
