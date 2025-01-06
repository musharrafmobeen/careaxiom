import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { Users } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CachingModule } from 'src/caching/cache.module';
import { CacheService } from 'src/caching/cache.service';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, CacheService],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
