import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UsersService } from './users/users.service';
import * as bcrypt from 'bcrypt';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const usersService = app.get(UsersService);

  const admin = await usersService.findByEmail('admin@admin.com');
  if (!admin) {
    const hashedPassword = await bcrypt.hash('admin', 10);
    await usersService.create({
      email: 'admin@admin.com',
      password: hashedPassword,
    });
    console.log('Usuario admin creado');
  }

  await app.listen(3000);
}
bootstrap();
