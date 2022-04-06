import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateCardDto } from 'src/cards/dto/create-card.dto';
import { UpdateCardDto } from 'src/cards/dto/update-card.dto';
import { CardEntity } from 'src/cards/entities/card.entity';
import { IsOwnerCardGuard } from 'src/cards/guards/owner-card.guard';
import { ColumnsService } from './columns.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { ColumnEntity } from './entities/column.entity';
import { IsOwnerColumnGuard } from './guards/owner-column.guard';


@ApiTags('Колонки')
@UseGuards(JwtAuthGuard)
@Controller('columns')
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) { }
  @ApiOperation({ summary: 'Создание колонки' })
  @ApiResponse({ status: 201, type: ColumnEntity })
  @Post()
  createOne(@Body() createColumnDto: CreateColumnDto) {
    return this.columnsService.createOne(createColumnDto);
  }

  @ApiOperation({ summary: 'Список всех колонок' })
  @ApiResponse({ status: 200, type: [ColumnEntity] })
  @Get()
  findAll() {
    return this.columnsService.findAll();
  }

  @ApiOperation({ summary: 'Колонка' })
  @ApiResponse({ status: 200, type: ColumnEntity })
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.columnsService.findOne(id);
  }

  @ApiOperation({ summary: 'Обновить данные колонки' })
  @ApiResponse({ status: 200, type: ColumnEntity })
  @UseGuards(IsOwnerColumnGuard)
  @Patch(':id')
  updateOne(@Param('id', ParseUUIDPipe) id: string, @Body() updateColumnDto: UpdateColumnDto) {
    return this.columnsService.updateOne(id, updateColumnDto);
  }

  @ApiOperation({ summary: 'Удаление колонки' })
  @ApiResponse({ status: 200, type: Boolean })
  @UseGuards(IsOwnerColumnGuard)
  @Delete(':id')
  deleteOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.columnsService.deleteOne(id);
  }

  @ApiOperation({ summary: 'Список всех карточек колонки' })
  @ApiResponse({ status: 200, type: CardEntity })
  @Get(':id/cards')
  findAllCardsColumn(@Param('id', ParseUUIDPipe) id: string) {
    return this.columnsService.findAllCardsColumn(id);
  }

  @ApiOperation({ summary: 'Карточка колонки' })
  @ApiResponse({ status: 200, type: CardEntity })
  @Get(':columnId/cards/:cardId')
  findOneColumnCard(
    @Param('columnId', ParseUUIDPipe) columnId: string,
    @Param('cardId', ParseUUIDPipe) cardId: string,
  ) {
    return this.columnsService.findOneCardColumn(columnId, cardId);
  }

  @ApiOperation({ summary: 'Создать каточку в колонке' })
  @ApiResponse({ status: 201, type: CardEntity })
  @Post(':id/cards/')
  createOneColumnCard(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() createCardDto: CreateCardDto,
  ) {
    return this.columnsService.createOneCardColumn(id, createCardDto);
  }

  @ApiOperation({ summary: 'Обновить карточку колонки' })
  @ApiResponse({ status: 200, type: CardEntity })
  @UseGuards(IsOwnerCardGuard)
  @Patch(':columnId/cards/:cardId')
  updateOneColumnCard(
    @Param('columnId', ParseUUIDPipe) columnId: string,
    @Param('cardId', ParseUUIDPipe) cardId: string,
    @Body() updateCardDto: UpdateCardDto,
  ) {
    return this.columnsService.updateOneColumnCard(columnId, cardId, updateCardDto);
  }

  @ApiOperation({ summary: 'Удалить карточку из колонки' })
  @ApiResponse({ status: 200, type: Boolean })
  @UseGuards(IsOwnerCardGuard)
  @Delete(':columnId/cards/:cardId')
  deleteOneColumnCard(
    @Param('columnId', ParseUUIDPipe) columnId: string,
    @Param('cardId', ParseUUIDPipe) cardId: string,
  ) {
    return this.columnsService.deleteOneColumnCard(columnId, cardId);
  }
}
