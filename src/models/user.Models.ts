import mongoose, { Schema } from 'mongoose';
import { IUser } from '../interfaces';
import { generateAccessToken, passwordHelper } from '../utils';

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
  phonenumber: {
    type: Number,
    min: [10, "Please provide a phoneNumber with min length : 10 "],
    required: [true, "Please provide a phoneNumber"]
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
}, { timestamps: true });

userSchema.pre("save", passwordHelper);

userSchema.methods.accessToken = generateAccessToken;

export const User = mongoose.model<IUser>('User', userSchema);