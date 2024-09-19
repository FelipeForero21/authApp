import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  async findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOneBy({ email });
  }

  async create(user: Partial<User>): Promise<User> {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = this.usersRepository.create({
      ...user,
      password: hashedPassword,
    });
    return this.usersRepository.save(newUser);
  }

  async update(id: number, user: Partial<User>): Promise<User> {
    await this.usersRepository.update(id, user);
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
