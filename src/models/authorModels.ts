import mongoose, { Schema } from "mongoose";
import { IAuthor } from "../interfaces/Author.Interface";
import { passwordHelper } from "../utils/passwordHelper";

const authorSchema: Schema<IAuthor> = new Schema ({

    name: {
        type: String,
        required: [true,'Please provide author Name']
    },
    email: {
        type: String,
        required: [true,'Please provide author Email'],
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        minlength: [6, "Please provide a password with min length : 6 "],
        required: [true, "Please provide a password"]
    },
    biography:{
        type: String,
        required: [true, "Please provide a biography"]
    },
    nationality:{
        type: String,
        required: [true, "Please provide a nationality"]
    }
})

authorSchema.pre("save",passwordHelper);

export const Author = mongoose.model<IAuthor>('Author',authorSchema);