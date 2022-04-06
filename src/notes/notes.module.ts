import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotesRepository } from './notes.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([NotesRepository]),
    AuthModule,
  ],
  controllers: [NotesController],
  providers: [NotesService],
  exports: [TypeOrmModule],
})
export class NotesModule { }
