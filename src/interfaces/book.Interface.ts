import mongoose from 'mongoose';

export interface IBook {
    title: string;
    author: mongoose.Types.ObjectId; 
    category: mongoose.Types.ObjectId; 
    ISBN: string;
    description: string;
    price: number;
}