import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserRole } from './schemas/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private jwtService: JwtService
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

    async login(email: string, password: string) {
        const user = await this.userModel.findOne({ email, password }).exec();
        if (!user) {
            throw new UnauthorizedException('Invalid email or password');
        }
        const payload = { email: user.email, sub: user._id, role: user.role };
        const token = this.jwtService.sign(payload);
        return { user, access_token: token };
    }
}
