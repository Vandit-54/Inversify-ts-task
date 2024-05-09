import mongoose, { Document } from 'mongoose';

export interface IBook extends Document {
    title: string;
    author: mongoose.Types.ObjectId; 
    category: mongoose.Types.ObjectId; 
    ISBN: string;
    description: string;
    price: number;
}