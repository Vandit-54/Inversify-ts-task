import { Types } from "mongoose";
import { ICategory } from "./category.Interface";

export interface ICategoryService {
    createCategory(categoryData:ICategory):Promise<ICategory>;
    getAllCategories(name:string,page:number,limit:number):Promise<any>;
    updateCategory(categoryId:Types.ObjectId, updateData:ICategory):Promise<ICategory>;
    deleteCategory(categoryId:Types.ObjectId):Promise<any>;
}