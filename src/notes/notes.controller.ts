import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { IsOwnerNoteGuard } from './guards/owner-note.guard';

@UseGuards(JwtAuthGuard)
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  createOne(@Body() createNoteDto: CreateNoteDto) {
    return this.notesService.createOne(createNoteDto);
  }

  @Get()
  findAll() {
    return this.notesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.notesService.findOne(id);
  }

  @UseGuards(IsOwnerNoteGuard)
  @Patch(':id')
  updateOne(@Param('id', ParseUUIDPipe) id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return this.notesService.updateOne(id, updateNoteDto);
  }

  @UseGuards(IsOwnerNoteGuard)
  @Delete(':id')
  deleteOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.notesService.deleteOne(id);
  }
}
