import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserRole } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {

    constructor(
        @InjectModel(User.name) private userModel: Model<User>
    ) {}

    createUserAsAdmin(email: string, password: string, role: UserRole) {
        const newUser = new this.userModel({ email, password, role });
        return newUser.save();
    }

    createUserAsRegular(email: string, password: string) {
        const newUser = new this.userModel({ email, password, role: UserRole.USER });
        return newUser.save();
    }

    changeUserRole(userId: string, newRole: UserRole) {
        return this.userModel.findByIdAndUpdate(userId, { role: newRole }, { new: true });
    }

    getAllUsers() {
        return this.userModel.find().exec();
    }

    getUserById(userId: string) {
        return this.userModel.findById(userId).exec();
    }
}
