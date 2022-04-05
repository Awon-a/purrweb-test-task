import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardsRepository } from './cards.repository';
import { NotesModule } from 'src/notes/notes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CardsRepository]),
    NotesModule,
  ],
  controllers: [CardsController],
  providers: [CardsService],
  exports: [TypeOrmModule],
})
export class CardsModule { }
