import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
  
    if (user) {
      console.log('Usuario encontrado:', user);
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (isPasswordValid) {
        console.log('Contraseña correcta');
        const { password, ...result } = user;
        return result;
      } else {
        console.log('Contraseña incorrecta');
      }
    } else {
      console.log('Usuario no encontrado');
    }
    return null;
  }
  
  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    try {
      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      console.error('Error al generar el JWT:', error);
      throw new UnauthorizedException('Error de autenticación');
    }
  }

  
}
