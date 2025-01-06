import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Throttle, minutes } from '@nestjs/throttler';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return {
      message: 'New User Created',
      data: await this.usersService.create(createUserDto),
    };
  }

  //Rate limiter
  @Throttle({ default: { ttl: minutes(1), limit: 500 } })
  @Get()
  async findAll() {
    return { data: await this.usersService.findAll() };
  }

  //Rate limiter
  @Throttle({ default: { ttl: minutes(1), limit: 500 } })
  @Get('above-eighteen')
  async getUsersAboveEighteenYearsOfAge() {
    return { data: await this.usersService.getUsersAboveEighteenYearsOfAge() };
  }
}
