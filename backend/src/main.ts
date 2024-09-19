import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UsersService } from './users/users.service';
async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:4200',
    allowedHeaders: 'Content-Type, Authorization',
  });
  const usersService = app.get(UsersService);

  const admin = await usersService.findByEmail('admin@admin.com');
  if (!admin) {
    await usersService.create({
      email: 'admin@admin.com',
      password: 'admin',  
    });

    console.log('Usuario admin creado');
  }

  await app.listen(3000);
}
bootstrap();
