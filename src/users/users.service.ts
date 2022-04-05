import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UsersRepository,
  ) { }

  createOne(createUserDto: CreateUserDto) {
    try {
      return this.usersRepository.save(createUserDto);
    } catch (e) {
      throw e;
    }
  }

  findAll() {
    try {
      return this.usersRepository.find();
    } catch (e) {
      throw e;
    }
  }

  findOne(id: UserEntity['id']) {
    try {
      return this.usersRepository.findOne(id);
    } catch (e) {
      throw e;
    }
  }

  updateOne(id: UserEntity['id'], updateUserDto: UpdateUserDto) {
    try {
      return this.usersRepository.save({ id, ...updateUserDto });
    } catch (e) {
      throw e;
    }
  }

  async deleteOne(id: UserEntity['id']) {
    try {
      await this.usersRepository.delete(id);

      return true;
    } catch (e) {
      return false;
    }
  }
}
