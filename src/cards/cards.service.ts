import { Injectable } from '@nestjs/common';
import { CardsRepository } from './cards.repository';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { CardEntity } from './entities/card.entity';

@Injectable()
export class CardsService {
  constructor(
    private cardsRepository: CardsRepository,
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
}
