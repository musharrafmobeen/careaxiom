import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Users } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return await this.usersRepository.save(createUserDto);
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async getUserByEmail(email: string) {
    return await this.usersRepository.findOne({ where: { email } });
  }

  async getUsersAboveEighteenYearsOfAge() {
    return await this.usersRepository.query(`SELECT *
        FROM users
        WHERE age > 18
        ORDER BY name ASC;
    `);
  }
}
