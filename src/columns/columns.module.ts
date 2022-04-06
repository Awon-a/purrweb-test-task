import { Module } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { ColumnsController } from './columns.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColumnsRepository } from './columns.repository';
import { CardsModule } from 'src/cards/cards.module';
import { AuthModule } from 'src/auth/auth.module';
import { IsOwnerColumn } from './guards/owner-column.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([ColumnsRepository]),
    CardsModule,
    AuthModule,
  ],
  controllers: [ColumnsController],
  providers: [ColumnsService, IsOwnerColumn],
  exports: [TypeOrmModule],
})
export class ColumnsModule { }
