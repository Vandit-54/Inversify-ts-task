import { Document } from 'mongoose';

export interface IAuthor extends Document {
    name: string;
    email:string;
    password:string;
    biography: string;
    nationality: string;
    accessToken():string;
}