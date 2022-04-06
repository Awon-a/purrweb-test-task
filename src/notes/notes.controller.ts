import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { IsOwnerNoteGuard } from './guards/owner-note.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NoteEntity } from './entities/note.entity';

@ApiTags('Комментарии')
@UseGuards(JwtAuthGuard)
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) { }

  @ApiOperation({ summary: 'Создание комментария' })
  @ApiResponse({ status: 201, type: NoteEntity })
  @Post()
  createOne(@Body() createNoteDto: CreateNoteDto) {
    return this.notesService.createOne(createNoteDto);
  }

  @ApiOperation({ summary: 'Список всех комментариев' })
  @ApiResponse({ status: 200, type: [NoteEntity] })
  @Get()
  findAll() {
    return this.notesService.findAll();
  }

  @ApiOperation({ summary: 'Комментарий' })
  @ApiResponse({ status: 200, type: NoteEntity })
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.notesService.findOne(id);
  }

  @ApiOperation({ summary: 'Обновление комментария' })
  @ApiResponse({ status: 200, type: NoteEntity })
  @UseGuards(IsOwnerNoteGuard)
  @Patch(':id')
  updateOne(@Param('id', ParseUUIDPipe) id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return this.notesService.updateOne(id, updateNoteDto);
  }

  @ApiOperation({ summary: 'Удаление комментария' })
  @ApiResponse({ status: 200, type: Boolean })
  @UseGuards(IsOwnerNoteGuard)
  @Delete(':id')
  deleteOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.notesService.deleteOne(id);
  }
}
