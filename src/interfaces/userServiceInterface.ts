import { IUser } from "./userInterface";

export interface IUserService {
    createUser(user:IUser):Promise<IUser|null>;
    login(email:string):Promise<IUser|null>;
    updateUser(userId:string,updateData:any):Promise<IUser | null>;
    deleteUser(userId:string):Promise<any>;
}