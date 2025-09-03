import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument, UserRole } from './schemas/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

const SALT_ROUNDS = 10;

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  private hashPassword(plain: string) {
    return bcrypt.hash(plain, SALT_ROUNDS);
  }

  private sanitize(user: UserDocument) {
    const { password, __v, ...rest } = user.toObject();
    return rest;
  }

  async createUserAsAdmin(dto: CreateUserDto) {
    const hashed = await this.hashPassword(dto.password);
    try {  
    const newUser = new this.userModel({
      userName: dto.userName,
      email: dto.email.trim().toLowerCase(),
      password: hashed,
      role: UserRole.ADMIN,
    });
    const saved = await newUser.save();
    return this.sanitize(saved);
  } catch (e: any) {
    if (e?.code === 11000) throw new ConflictException('Email already registered');
    throw e;
  }
}

  async createUserAsRegular(dto: CreateUserDto) {
    const hashed = await this.hashPassword(dto.password);
    try {
    const newUser = new this.userModel({
      userName: dto.userName,
      email: dto.email.trim().toLowerCase(),
      password: hashed,
      role: UserRole.USER,
    });
    const saved = await newUser.save();
    return this.sanitize(saved);
    } catch (e: any) {
      if (e?.code === 11000) throw new ConflictException('Email already registered');
      throw e;
    }
  }

  async changeUserRole(userId: string, newRole: UserRole) {
    const updated = await this.userModel.findByIdAndUpdate(
      userId,
      { role: newRole },
      { new: true },
    );
    return updated ? this.sanitize(updated) : null;
  }

  // Si llega password, re-hashear antes de guardar
  async updateUser(userId: string, dto: UpdateUserDto) {
    const update: any = { ...dto };
    if (dto.password) {
      update.password = await this.hashPassword(dto.password);
    }
    const updated = await this.userModel.findByIdAndUpdate(userId, update, { new: true });
    return updated ? this.sanitize(updated) : null;
  }

  async getAllUsers() {
    const users = await this.userModel.find().exec();
    return users.map(u => this.sanitize(u));
  }

  async getUserById(userId: string) {
    const user = await this.userModel.findById(userId).exec();
    return user ? this.sanitize(user) : null;
  }

  async login(dto: LoginUserDto) {
    const user = await this.userModel.findOne({ email: dto.email.trim().toLowerCase() }).exec();
    if (!user) throw new UnauthorizedException('Invalid email or password');

    const ok = await bcrypt.compare(dto.password, user.password);
    if (!ok) throw new UnauthorizedException('Invalid email or password');

    const payload = { email: user.email.trim().toLowerCase(), sub: user._id, role: user.role };
    const access_token = this.jwtService.sign(payload);
    return { user: this.sanitize(user), access_token };
  }
}
