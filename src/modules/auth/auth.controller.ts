import { Controller, Get, Post, Body, Patch, Param, Delete, ForbiddenException, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRole } from './schemas/user.schema';
import { AuthGuard } from '@nestjs/passport'
import { UseGuards } from '@nestjs/common';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  // Register a new admin user (only if the requester is an admin)
  @UseGuards(AuthGuard('jwt'))
  @Post('registerAdmin')
  registerAdmin(@Body() body: { email: string; password: string }, @Request() req) {
    const user = req.user;
    if (user.role !== UserRole.ADMIN) {
      throw new ForbiddenException('Only admins can register new admin users');
    }
    return this.authService.createUserAsAdmin(body.email, body.password, UserRole.ADMIN);
  }

  @Post('registerUser')
  registerUser(@Body() body: { email: string; password: string }) {
    return this.authService.createUserAsRegular(body.email, body.password);
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

}

