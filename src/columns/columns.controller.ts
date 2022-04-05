import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { CreateCardDto } from 'src/cards/dto/create-card.dto';
import { UpdateCardDto } from 'src/cards/dto/update-card.dto';
import { ColumnsService } from './columns.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';

@Controller('columns')
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) { }

  @Post()
  createOne(@Body() createColumnDto: CreateColumnDto) {
    return this.columnsService.createOne(createColumnDto);
  }

  @Get()
  findAll() {
    return this.columnsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.columnsService.findOne(id);
  }

  @Patch(':id')
  updateOne(@Param('id', ParseUUIDPipe) id: string, @Body() updateColumnDto: UpdateColumnDto) {
    return this.columnsService.updateOne(id, updateColumnDto);
  }

  @Delete(':id')
  deleteOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.columnsService.deleteOne(id);
  }

  @Get(':id/cards')
  findAllCardsColumn(@Param('id', ParseUUIDPipe) id: string) {
    return this.columnsService.findAllCardsColumn(id);
  }

  @Get(':columnId/cards/:cardId')
  findOneColumnCard(
    @Param('columnId', ParseUUIDPipe) columnId: string,
    @Param('cardId', ParseUUIDPipe) cardId: string,
  ) {
    return this.columnsService.findOneCardColumn(columnId, cardId);
  }

  @Post(':id/cards/')
  createOneColumnCard(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() createCardDto: CreateCardDto,
  ) {
    return this.columnsService.createOneCardColumn(id, createCardDto);
  }

  @Patch(':columnId/cards/:cardId')
  updateOneColumnCard(
    @Param('columnId', ParseUUIDPipe) columnId: string,
    @Param('cardId', ParseUUIDPipe) cardId: string,
    @Body() updateCardDto: UpdateCardDto,
  ) {
    return this.columnsService.updateOneColumnCard(columnId, cardId, updateCardDto);
  }

  @Delete(':columnId/cards/:cardId')
  deleteOneColumnCard(
    @Param('columnId', ParseUUIDPipe) columnId: string,
    @Param('cardId', ParseUUIDPipe) cardId: string,
  ) {
    return this.columnsService.deleteOneColumnCard(columnId, cardId);
  }
}
