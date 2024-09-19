import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'ep-misty-wave-a4minjsx-pooler.us-east-1.aws.neon.tech',
      port: 5432,
      username: 'default',
      password: 'ivgaJX95bAyY',
      database: 'verceldb',
      ssl: { rejectUnauthorized: false },
      autoLoadEntities: true,
      synchronize: true, 
    }),
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
