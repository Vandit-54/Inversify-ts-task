import { ICategory } from "./categoryInterface";

export interface IUserService {
    createCategory(categoryData:ICategory):Promise<ICategory>;
    getAllCategories(name:string,page:number,limit:number):Promise<any>;
    updateCategory(categoryId:string, updateData:ICategory):Promise<ICategory>;
    deleteCatefory(categoryId:string):Promise<any>;
}