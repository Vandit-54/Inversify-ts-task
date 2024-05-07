import mongoose, { Schema } from 'mongoose';
import { IUser } from '../interfaces/User.Interface';
import { generateAccessToken } from '../utils/accessToken';
import { passwordHelper } from '../utils/passwordHelper';

const userSchema: Schema<IUser> = new Schema({

  name: {
    type: String,
    required: [true, 'Please provide a name']
  },
  username: {
    type: String,
    required: [true, 'Please provide a username']
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  password: {
    type: String,
    minlength: [6, "Please provide a password with min length : 6 "],
    required: [true, "Please provide a password"]
  },
  phoneNumber: {
    type: Number,
    min: [10, "Please provide a phoneNumber with min length : 10 "],
    required: [true, "Please provide a phoneNumber"]
  }
}, { timestamps: true });

userSchema.pre("save", passwordHelper);

userSchema.methods.accessToken = generateAccessToken;

export const User = mongoose.model<IUser>('User', userSchema);