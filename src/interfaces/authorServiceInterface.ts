import { IAuthor } from "./authorInterface";

export interface IAuthorService {
    createAuthor(auhorData:IAuthor):Promise<IAuthor>;
    login(email:string):Promise<IAuthor>;
    updateAuthor(authorId:string, UpdateData:IAuthor):Promise<IAuthor>;
    deleteAuthor(authorId:String):Promise<any>
}