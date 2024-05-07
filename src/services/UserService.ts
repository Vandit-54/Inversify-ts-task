import { injectable } from 'inversify';
import { User } from '../models/userModels';

@injectable()
export class UserService {
    async createUser(userData: any): Promise<any> {
        try {
            const user = await User.create(userData);
            return user;
        } catch (error) {
            throw new Error('Failed to create user');
        }
    }

    async login(email: any): Promise<any> {
        try {
            const user = await User.findOne({email});
            return user;
        } catch (error) {
            throw new Error('Failed to get user by email');
        }
    }

    async updateUser(userId: string, updateData: any): Promise<any> {
        try {
            const user = await User.findById(userId);

            if (!user) {
                throw new Error('User not found');
            }
 
            delete updateData.password;
    
            const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true }).select("-password");
            return updatedUser;
        } catch (error) {
            throw new Error('Failed to update user');
        }
    }
    

    async deleteUser(userId: string): Promise<any> {
        try {
            
            const user = await User.findByIdAndDelete(userId);
            return user; 
        } catch (error) {
            throw new Error('Failed to delete user');
        }
    }
}
