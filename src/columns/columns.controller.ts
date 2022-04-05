import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';

@Controller('columns')
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}

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
}
