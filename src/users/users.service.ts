import { Injectable } from '@nestjs/common';
import { ColumnsRepository } from 'src/columns/columns.repository';
import { CreateColumnDto } from 'src/columns/dto/create-column.dto';
import { UpdateColumnDto } from 'src/columns/dto/update-column.dto';
import { ColumnEntity } from 'src/columns/entities/column.entity';
import { NoteEntity } from 'src/notes/entities/note.entity';
import { NotesRepository } from 'src/notes/notes.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UsersRepository,
    private columnsRepository: ColumnsRepository,
    private notesRepository: NotesRepository,
  ) { }

  createOne(createUserDto: CreateUserDto): Promise<UserEntity> {
    try {
      const newUser = {
        ...createUserDto
      } as UserEntity;
      return this.usersRepository.save(newUser);
    } catch (e) {
      throw e;
    }
  }

  async findAll(): Promise<UserEntity[]> {
    try {
      return this.usersRepository.find();
    } catch (e) {
      throw e;
    }
  }

  async findOne(id: UserEntity['id']): Promise<UserEntity> {
    try {
      return this.usersRepository.findOne(id);
    } catch (e) {
      throw e;
    }
  }

  async updateOne(id: UserEntity['id'], updateUserDto: UpdateUserDto): Promise<UserEntity> {
    try {
      return this.usersRepository.save({ id, ...updateUserDto });
    } catch (e) {
      throw e;
    }
  }

  async deleteOne(id: UserEntity['id']): Promise<boolean> {
    try {
      await this.usersRepository.delete(id);

      return true;
    } catch (e) {
      return false;
    }
  }

  async findColumnsUser(id: UserEntity['id']): Promise<ColumnEntity[]> {
    try {
      return this.columnsRepository.find({ where: { userId: id }, relations: ['user'] });
    } catch (e) {
      throw e;
    }
  }

  async findOneColumnUser(id: ColumnEntity['id']): Promise<ColumnEntity> {
    try {
      return this.columnsRepository.findOne(id);
    } catch (e) {
      throw e;
    }
  }

  async createOneColumnByUser(id: UserEntity['id'], createColumnDto: CreateColumnDto): Promise<ColumnEntity> {
    try {
      return this.columnsRepository.save({ userId: id, ...createColumnDto });
    } catch (e) {
      throw e;
    }
  }

  async updateOneColumnUser(id: ColumnEntity['id'], updateColumnDto: UpdateColumnDto): Promise<ColumnEntity> {
    try {
      return this.columnsRepository.save({ id, ...updateColumnDto })
    } catch (e) {
      throw e;
    }
  }

  async deleteOneColumnUser(columnId: ColumnEntity['id']): Promise<boolean> {
    try {
      await this.columnsRepository.delete(columnId);

      return true;
    } catch (e) {
      return false;
    }
  }
}
