import { IAuthor } from "./author.Interface";
import { Types } from "mongoose";
export interface IAuthorService {
    createAuthor(auhorData:IAuthor):Promise<IAuthor>;
    login(email:string):Promise<IAuthor>;
    updateAuthor(authorId:Types.ObjectId, UpdateData:IAuthor):Promise<IAuthor>;
    deleteAuthor(authorId:Types.ObjectId):Promise<any>
}