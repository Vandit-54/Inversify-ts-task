import { injectable } from 'inversify';
import { User } from '../models/user.Models';
import { ApiError } from '../utils';
import { HttpStatusCode } from '../enum';
import { IUser,IUserService } from '../interfaces';

@injectable()
export class UserService implements IUserService {

    async createUser(userData: IUser): Promise<IUser | null> {
            const user = await User.create(userData);
            return user;
    }

    async login(email: string): Promise<IUser | null> {
            const user = await User.findOne({email});
            return user;
    }

    async updateUser(userId: string, updateData: any): Promise<IUser | null> {
            delete updateData.password;
            const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true }).select("-password");
            return updatedUser;
    }
    
    async deleteUser(userId: string): Promise<any> {
            const user = await User.findByIdAndDelete(userId);
            return user; 
    }
}
