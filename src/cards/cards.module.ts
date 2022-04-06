import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardsRepository } from './cards.repository';
import { NotesModule } from 'src/notes/notes.module';
import { AuthModule } from 'src/auth/auth.module';
import { IsOwnerCardGuard } from './guards/owner-card.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([CardsRepository]),
    NotesModule,
    AuthModule,
  ],
  controllers: [CardsController],
  providers: [CardsService],
  exports: [TypeOrmModule, CardsService],
})
export class CardsModule { }
