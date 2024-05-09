import { ICategory } from "./categoryInterface";

export interface ICategoryService {
    createCategory(categoryData:ICategory):Promise<ICategory>;
    getAllCategories(name:string,page:number,limit:number):Promise<any>;
    updateCategory(categoryId:string, updateData:ICategory):Promise<ICategory>;
    deleteCategory(categoryId:string):Promise<any>;
}