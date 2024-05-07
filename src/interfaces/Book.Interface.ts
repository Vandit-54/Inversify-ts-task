import mongoose, { Document } from 'mongoose';

export interface IBook extends Document {
    title: string;
    author: string; 
    category: string; 
    ISBN: string;
    description: string;
    price: number;
}