import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/users/entities/user.entity';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { NoteEntity } from './entities/note.entity';
import { NotesRepository } from './notes.repository';

@Injectable()
export class NotesService {
  constructor(
    private notesRepository: NotesRepository,
  ) { }

  async createOne(createNoteDto: CreateNoteDto): Promise<NoteEntity> {
    try {
      return this.notesRepository.save(createNoteDto);
    } catch (e) {
      throw e;
    }
  }

  async findAll(): Promise<NoteEntity[]> {
    try {
      return this.notesRepository.find();
    } catch (e) {
      throw e;
    }
  }

  async findOne(id: NoteEntity['id']): Promise<NoteEntity> {
    try {
      return this.notesRepository.findOne(id);
    } catch (e) {
      throw e;
    }
  }

  async updateOne(id: NoteEntity['id'], updateNoteDto: UpdateNoteDto): Promise<NoteEntity> {
    try {
      return this.notesRepository.save({ id, ...updateNoteDto });
    } catch (e) {
      throw e;
    }
  }

  async deleteOne(id: NoteEntity['id']): Promise<boolean> {
    try {
      await this.notesRepository.delete(id);

      return true;
    } catch (e) {
      throw e;
    }
  }

  async findOneNoteByUserId(id: NoteEntity['id'], userId: UserEntity['id']): Promise<NoteEntity> {
    try {
      return this.notesRepository.findOne({
        where: {
          id,
          userId,
        },
      });
    } catch (e) {
      throw e;
    }
  }
}
