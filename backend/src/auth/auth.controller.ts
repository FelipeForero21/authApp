import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body) {
    const { email, password } = body;
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      console.log('Usuario no encontrado o contraseña incorrecta');
      throw new UnauthorizedException('Credenciales incorrectas');
    }
    console.log('Usuario validado:', user);
    return this.authService.login(user);
  }
  
}
