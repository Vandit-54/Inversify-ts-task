import mongoose, { Schema } from 'mongoose';
import { IBook } from '../interfaces';

const bookSchema: Schema<IBook> = new Schema({
    title: { 
        type: String, 
        required: [true, 'Please provide a title'] 
    },
    author: { 
        type:  Schema.Types.ObjectId, 
        ref: 'Author',
        required: [true, 'Please provide a author'] 
    },
    category: { 
        type:  Schema.Types.ObjectId, 
        ref: 'Category',
        required: [true, 'Please provide a Category'] 
    },
    ISBN: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    price: { 
        type: Number, 
        required: true 
    }
});

export const Book = mongoose.model<IBook>('Book', bookSchema);