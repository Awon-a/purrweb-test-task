import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateNoteDto } from 'src/notes/dto/create-note.dto';
import { UpdateNoteDto } from 'src/notes/dto/update-note.dto';
import { NoteEntity } from 'src/notes/entities/note.entity';
import { NotesRepository } from 'src/notes/notes.repository';
import { CardsRepository } from './cards.repository';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { CardEntity } from './entities/card.entity';

@Injectable()
export class CardsService {
  constructor(
    private cardsRepository: CardsRepository,
    private notesRepository: NotesRepository,
  ) { }

  async createOne(createCardDto: CreateCardDto): Promise<CardEntity> {
    try {
      return this.cardsRepository.save(createCardDto);
    } catch (e) {
      throw e;
    }
  }

  async findAll(): Promise<CardEntity[]> {
    try {
      return this.cardsRepository.find();
    } catch (e) {
      throw e;
    }
  }

  async findOne(id: CardEntity['id']): Promise<CardEntity> {
    try {
      return this.cardsRepository.findOne(id);
    } catch (e) {
      throw e;
    }
  }

  async updateOne(id: CardEntity['id'], updateCardDto: UpdateCardDto): Promise<CardEntity> {
    try {
      return this.cardsRepository.save({ id, ...updateCardDto })
    } catch (e) {
      throw e;
    }
  }

  async deleteOne(id: CardEntity['id']): Promise<boolean> {
    try {
      await this.cardsRepository.delete(id);

      return true;
    } catch (e) {
      throw e;
    }
  }

  async findAllCardNotes(id: CardEntity['id']): Promise<NoteEntity[]> {
    try {
      return this.notesRepository.find({
        where: {
          cardId: id,
        },
        relations: ['card'],
      });
    } catch (e) {
      throw e;
    }
  }

  async findOneCardNote(cardId: CardEntity['id'], noteId: NoteEntity['id']): Promise<NoteEntity> {
    try {
      return this.notesRepository.findOne({
        where: {
          id: noteId,
          cardId,
        },
        relations: ['card'],
      })
    } catch (e) {
      throw e;
    }
  }

  async createOneCardNote(id: CardEntity['id'], createNoteDto: CreateNoteDto): Promise<NoteEntity> {
    try {
      return this.notesRepository.save({ cardId: id, ...createNoteDto });
    } catch (e) {
      throw e;
    }
  }

  async updateOneCardNote(
    cardId: CardEntity['id'],
    noteId: NoteEntity['id'],
    updateNoteDto: UpdateNoteDto
  ): Promise<NoteEntity> {
    try {
      const note = await this.findOneCardNote(cardId, noteId);

      if (!note) {
        throw new HttpException(
          `В карточке ${cardId} отсутствует комментарий ${noteId}`,
          HttpStatus.BAD_REQUEST
        );
      }

      const updatedNotes = {
        ...note,
        ...updateNoteDto,
      }

      return this.notesRepository.save(updatedNotes);
    } catch (e) {
      throw e;
    }
  }

  async deleteOneCardNote(cardId: CardEntity['id'], noteId: NoteEntity['id']): Promise<boolean> {
    try {
      const note = await this.findOneCardNote(cardId, noteId);

      if (!note) {
        throw new HttpException(
          `В карточке ${cardId} отсутствует комментарий ${noteId}`,
          HttpStatus.BAD_REQUEST
        );
      }

      await this.notesRepository.delete(noteId);

      return true;
    } catch (e) {
      return false;
    }
  }
}
