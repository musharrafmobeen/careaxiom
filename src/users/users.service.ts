import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import { UserNotificationPublisher } from 'src/queue/publishers/user.notification.publisher';
import { CacheService } from 'src/caching/cache.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly userNotificationPublisher: UserNotificationPublisher,
    private readonly cacheService: CacheService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    if (await this.usersRepository.getUserByEmail(createUserDto.email)) {
      throw new BadRequestException('Email already exists');
    }
    try {
      const user = await this.usersRepository.create(createUserDto);
      if (user.age > 18) {
        //Clearing data from cache
        await this.cacheService.delete('careaxiom-users');
      }

      //Sending Welcome message by adding to queue
      this.userNotificationPublisher.addNotifications({
        email: createUserDto.email,
      });

      return user;
    } catch (error) {
      throw new HttpException(
        'Error while creating new user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    return await this.usersRepository.findAll();
  }

  async getUsersAboveEighteenYearsOfAge() {
    //checking if cache has data available
    if (await this.cacheService.has('careaxiom-users')) {
      return await this.cacheService.hmget('careaxiom-users');
    }
    const users = await this.usersRepository.getUsersAboveEighteenYearsOfAge();
    this.cacheService.hmset('careaxiom-users', users);
    return users;
  }
}
