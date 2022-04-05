import { Module } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { ColumnsController } from './columns.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColumnsRepository } from './columns.repository';
import { CardsModule } from 'src/cards/cards.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ColumnsRepository]),
    CardsModule,
  ],
  controllers: [ColumnsController],
  providers: [ColumnsService],
  exports: [TypeOrmModule],
})
export class ColumnsModule { }
