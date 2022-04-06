import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CardsRepository } from 'src/cards/cards.repository';
import { CreateCardDto } from 'src/cards/dto/create-card.dto';
import { UpdateCardDto } from 'src/cards/dto/update-card.dto';
import { CardEntity } from 'src/cards/entities/card.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { ColumnsRepository } from './columns.repository';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { ColumnEntity } from './entities/column.entity';

@Injectable()
export class ColumnsService {
  constructor(
    private columnsRepository: ColumnsRepository,
    private cardsRepository: CardsRepository,
  ) { }

  async createOne(createColumnDto: CreateColumnDto): Promise<ColumnEntity> {
    try {
      return this.columnsRepository.save(createColumnDto);
    } catch (e) {
      throw e;
    }
  }

  async findAll(): Promise<ColumnEntity[]> {
    try {
      return this.columnsRepository.find();
    } catch (e) {
      throw e;
    }
  }

  async findOne(id: ColumnEntity['id']): Promise<ColumnEntity> {
    try {
      return this.columnsRepository.findOne(id);
    } catch (e) {
      throw e;
    }
  }

  async updateOne(id: ColumnEntity['id'], updateColumnDto: UpdateColumnDto): Promise<ColumnEntity> {
    try {
      return this.columnsRepository.save({ id, ...updateColumnDto });
    } catch (e) {
      throw e;
    }
  }

  async deleteOne(id: ColumnEntity['id']): Promise<boolean> {
    try {
      await this.columnsRepository.delete(id);

      return true;
    } catch {
      return false;
    }
  }

  async findAllCardsColumn(id: ColumnEntity['id']): Promise<CardEntity[]> {
    try {
      return this.cardsRepository.find({ where: { columnId: id }, relations: ['column'] });
    } catch (e) {
      throw e;
    }
  }

  async findOneCardColumn(columnId: ColumnEntity['id'], cardId: CardEntity['id']): Promise<CardEntity> {
    try {
      return this.cardsRepository.findOne({
        where: {
          id: cardId,
          columnId,
        },
        relations: ['column'],
      });
    } catch (e) {
      throw e;
    }
  }

  async createOneCardColumn(id: ColumnEntity['id'], createCardDto: CreateCardDto): Promise<CardEntity> {
    try {
      return this.cardsRepository.save({ columnId: id, ...createCardDto });
    } catch (e) {
      throw e;
    }
  }

  async updateOneColumnCard(
    columnId: ColumnEntity['id'],
    cardId: CardEntity['id'],
    updateCardDto: UpdateCardDto,
  ): Promise<CardEntity> {
    try {
      const card = await this.findOneCardColumn(columnId, cardId);

      if (!card) {
        throw new HttpException(
          `Карточки с ID ${cardId} нет в колонке с ID ${columnId}`,
          HttpStatus.BAD_REQUEST
        );
      }

      const updatedCard = {
        ...card,
        ...updateCardDto,
      };

      return this.cardsRepository.save(updatedCard);
    } catch (e) {
      throw e;
    }
  }

  async deleteOneColumnCard(columnId: ColumnEntity['id'], cardId: CardEntity['id']): Promise<boolean> {
    try {
      const card = await this.findOneCardColumn(columnId, cardId);

      if (!card) {
        throw new HttpException(
          `Карточки с ID ${cardId} нет в колонке с ID ${columnId}`,
          HttpStatus.BAD_REQUEST
        );
      }

      await this.cardsRepository.remove(card);

      return true;
    } catch (e) {
      return false;
    }
  }

  async findOneColumnByUserId(id: ColumnEntity['id'], userId: UserEntity['id']): Promise<ColumnEntity> {
    try {
      return this.columnsRepository.findOne({
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
