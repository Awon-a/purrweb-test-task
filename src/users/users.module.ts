import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { ColumnsModule } from 'src/columns/columns.module';
import { NotesModule } from 'src/notes/notes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersRepository]),
    ColumnsModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule { }
