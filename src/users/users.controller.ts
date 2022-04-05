import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateColumnDto } from 'src/columns/dto/create-column.dto';
import { UpdateColumnDto } from 'src/columns/dto/update-column.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) { }

  @Post()
  createOne(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createOne(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  updateOne(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateOne(id, updateUserDto);
  }

  @Delete(':id')
  deleteOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.deleteOne(id);
  }

  @Get(':id/columns')
  findAllColumnsUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findColumnsUser(id);
  }

  @Get(':userId/columns/:id')
  findOneColumnUser(@Param('id', ParseUUIDPipe) columnId: string) {
    return this.usersService.findOneColumnUser(columnId);
  }

  @Post(':id/columns')
  createOneColumnByUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() createColumnDto: CreateColumnDto,
  ) {
    return this.usersService.createOneColumnByUser(id, createColumnDto);
  }

  @Patch(':userId/columns/:id')
  updateOneColumnUser(
    @Param('id', ParseUUIDPipe) columnId: string,
    @Body() updateColumnDto: UpdateColumnDto,
  ) {
    return this.usersService.updateOneColumnUser(columnId, updateColumnDto);
  }

  @Delete(':userId/columns/:id')
  deleteOneColumnUser(@Param('id', ParseUUIDPipe) columnId: string) {
    return this.usersService.deleteOneColumnUser(columnId);
  }
}
