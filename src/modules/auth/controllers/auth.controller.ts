import { Controller, Get, Post, Body, Patch, Param, Delete, ForbiddenException, Request, HttpCode, HttpStatus } from '@nestjs/common';
import { UserRole } from '../schemas/user.schema';
import { AuthGuard } from '@nestjs/passport'
import { UseGuards } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { AuthService } from '../services/auth.service';

@Controller('jwt')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
 
  // Register a new admin user (only if the requester is an admin)
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard('jwt'))
  @Post('registerAdmin')
  registerAdmin(@Body() body: CreateUserDto, @Request() req) {
    const user = req.user;
    if (user.role !== UserRole.ADMIN) {
      throw new ForbiddenException('Only admins can register new admin users');
    }
    return this.authService.createUserAsAdmin(body);
  }

 /*
  @Post('registerAdmin')
  registerAdmin(@Body() body: CreateUserDto) {
    return this.authService.createUserAsAdmin(body);
  }
  */

  @HttpCode(HttpStatus.CREATED)
  @Post('registerUser')
  registerUser(@Body() body: CreateUserDto) {
    return this.authService.createUserAsRegular(body);
  }

  // Change user role but only if the user is an admin
  @UseGuards(AuthGuard('jwt'))
  @Patch('changeRole/:id')
  changeRole(@Param('id') userId: string, @Body() body: { role: UserRole }) {
    return this.authService.changeUserRole(userId, body.role);
  }


  @Get('users')
  findAllUsers() {
    return this.authService.getAllUsers();
  }

  @Get('user/:id')
  findUserById(@Param('id') userId: string) {
    return this.authService.getUserById(userId);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() body: LoginUserDto) {
    return this.authService.login(body);
  }

}

