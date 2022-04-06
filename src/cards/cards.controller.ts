import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateNoteDto } from 'src/notes/dto/create-note.dto';
import { UpdateNoteDto } from 'src/notes/dto/update-note.dto';
import { IsOwnerNoteGuard } from 'src/notes/guards/owner-note.guard';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { IsOwnerCardGuard } from './guards/owner-card.guard';

@UseGuards(JwtAuthGuard)
@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) { }

  @Post()
  createOne(@Body() createCardDto: CreateCardDto) {
    return this.cardsService.createOne(createCardDto);
  }

  @Get()
  findAll() {
    return this.cardsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.cardsService.findOne(id);
  }

  @UseGuards(IsOwnerCardGuard)
  @Patch(':id')
  updateOne(@Param('id', ParseUUIDPipe) id: string, @Body() updateCardDto: UpdateCardDto) {
    return this.cardsService.updateOne(id, updateCardDto);
  }

  @UseGuards(IsOwnerCardGuard)
  @Delete(':id')
  deleteOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.cardsService.deleteOne(id);
  }

  @Get(':id/notes')
  findAllCardNotes(@Param('id', ParseUUIDPipe) id: string) {
    return this.cardsService.findAllCardNotes(id);
  }

  @Get(':cardId/notes/:noteId')
  findOneCardNote(
    @Param('cardId', ParseUUIDPipe) cardId: string,
    @Param('noteId', ParseUUIDPipe) noteId: string,
  ) {
    return this.cardsService.findOneCardNote(cardId, noteId);
  }

  @Post(':id/notes')
  createOneCardNote(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() createNoteDto: CreateNoteDto,
  ) {
    return this.cardsService.createOneCardNote(id, createNoteDto);
  }

  @UseGuards(IsOwnerNoteGuard)
  @Patch(':cardId/notes/:noteId')
  updateOneCardNote(
    @Param('cardId', ParseUUIDPipe) cardId: string,
    @Param('noteId', ParseUUIDPipe) noteId: string,
    @Body() updateNoteDto: UpdateNoteDto,
  ) {
    return this.cardsService.updateOneCardNote(cardId, noteId, updateNoteDto);
  }

  @UseGuards(IsOwnerNoteGuard)
  @Delete(':cardId/notes/:noteId')
  deleteOneCardNote(
    @Param('cardId', ParseUUIDPipe) cardId: string,
    @Param('noteId', ParseUUIDPipe) noteId: string,
  ) {
    return this.cardsService.deleteOneCardNote(cardId, noteId);
  }
}
