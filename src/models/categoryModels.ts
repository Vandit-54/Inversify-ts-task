import mongoose , {Schema} from 'mongoose';
import { ICategory } from '../interfaces';

const categorySchema: Schema<ICategory> = new Schema ({
    name: {
        type: String, 
        required: [true , 'Please Provide category name']
    }
});

export const Category = mongoose.model<ICategory>('Category',categorySchema)