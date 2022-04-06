import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateNoteDto } from 'src/notes/dto/create-note.dto';
import { UpdateNoteDto } from 'src/notes/dto/update-note.dto';
import { NoteEntity } from 'src/notes/entities/note.entity';
import { IsOwnerNoteGuard } from 'src/notes/guards/owner-note.guard';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { CardEntity } from './entities/card.entity';
import { IsOwnerCardGuard } from './guards/owner-card.guard';

@ApiTags('Карточки')
@UseGuards(JwtAuthGuard)
@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) { }

  @ApiOperation({ summary: 'Создать карточку' })
  @ApiResponse({ status: 201, type: CardEntity })
  @Post()
  createOne(@Body() createCardDto: CreateCardDto) {
    return this.cardsService.createOne(createCardDto);
  }

  @ApiOperation({ summary: 'Список всех карточек' })
  @ApiResponse({ status: 200, type: [CardEntity] })
  @Get()
  findAll() {
    return this.cardsService.findAll();
  }

  @ApiOperation({ summary: 'Карточка' })
  @ApiResponse({ status: 200, type: CardEntity })
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.cardsService.findOne(id);
  }

  @ApiOperation({ summary: 'Обновить карточку' })
  @ApiResponse({ status: 200, type: CardEntity })
  @UseGuards(IsOwnerCardGuard)
  @Patch(':id')
  updateOne(@Param('id', ParseUUIDPipe) id: string, @Body() updateCardDto: UpdateCardDto) {
    return this.cardsService.updateOne(id, updateCardDto);
  }

  @ApiOperation({ summary: 'Удалить карточку' })
  @ApiResponse({ status: 200, type: Boolean })
  @UseGuards(IsOwnerCardGuard)
  @Delete(':id')
  deleteOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.cardsService.deleteOne(id);
  }

  @ApiOperation({ summary: 'Список всех комментариев карточки' })
  @ApiResponse({ status: 200, type: [NoteEntity] })
  @Get(':id/notes')
  findAllCardNotes(@Param('id', ParseUUIDPipe) id: string) {
    return this.cardsService.findAllCardNotes(id);
  }

  @ApiOperation({ summary: 'Комментарий карточки' })
  @ApiResponse({ status: 200, type: CardEntity })
  @Get(':cardId/notes/:noteId')
  findOneCardNote(
    @Param('cardId', ParseUUIDPipe) cardId: string,
    @Param('noteId', ParseUUIDPipe) noteId: string,
  ) {
    return this.cardsService.findOneCardNote(cardId, noteId);
  }

  @ApiOperation({ summary: 'Создание комментария карточки' })
  @ApiResponse({ status: 201, type: NoteEntity })
  @Post(':id/notes')
  createOneCardNote(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() createNoteDto: CreateNoteDto,
  ) {
    return this.cardsService.createOneCardNote(id, createNoteDto);
  }

  @ApiOperation({ summary: 'Обновить комментарий карточки' })
  @ApiResponse({ status: 200, type: NoteEntity })
  @UseGuards(IsOwnerNoteGuard)
  @Patch(':cardId/notes/:noteId')
  updateOneCardNote(
    @Param('cardId', ParseUUIDPipe) cardId: string,
    @Param('noteId', ParseUUIDPipe) noteId: string,
    @Body() updateNoteDto: UpdateNoteDto,
  ) {
    return this.cardsService.updateOneCardNote(cardId, noteId, updateNoteDto);
  }

  @ApiOperation({ summary: 'Удалить комментарий карточки' })
  @ApiResponse({ status: 200, type: Boolean })
  @UseGuards(IsOwnerNoteGuard)
  @Delete(':cardId/notes/:noteId')
  deleteOneCardNote(
    @Param('cardId', ParseUUIDPipe) cardId: string,
    @Param('noteId', ParseUUIDPipe) noteId: string,
  ) {
    return this.cardsService.deleteOneCardNote(cardId, noteId);
  }
}
