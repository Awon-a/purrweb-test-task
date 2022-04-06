import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateColumnDto } from 'src/columns/dto/create-column.dto';
import { UpdateColumnDto } from 'src/columns/dto/update-column.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { IsOwnerColumnGuard } from 'src/columns/guards/owner-column.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { ColumnEntity } from 'src/columns/entities/column.entity';

@ApiTags('Пользователи')
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) { }

  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({ status: 201, type: UserEntity })
  @Post()
  createOne(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createOne(createUserDto);
  }

  @ApiOperation({ summary: 'Список всех пользователей' })
  @ApiResponse({ status: 200, type: [UserEntity] })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Пользователь по ID' })
  @ApiResponse({ status: 200, type: UserEntity })
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOne(id);
  }

  @ApiOperation({ summary: 'Обновить пользователя' })
  @ApiResponse({ status: 200, type: UserEntity })
  @Patch(':id')
  updateOne(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateOne(id, updateUserDto);
  }

  @ApiOperation({ summary: 'Удалить пользователя' })
  @ApiResponse({ status: 200, type: Boolean })
  @Delete(':id')
  deleteOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.deleteOne(id);
  }

  @ApiOperation({ summary: 'Список колонок пользователя' })
  @ApiResponse({ status: 200, type: [ColumnEntity] })
  @Get(':id/columns')
  findAllColumnsUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findColumnsUser(id);
  }

  @ApiOperation({ summary: 'Колонка пользователя' })
  @ApiResponse({ status: 200, type: ColumnEntity })
  @Get(':userId/columns/:id')
  findOneColumnUser(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('id', ParseUUIDPipe) columnId: string,
  ) {
    return this.usersService.findOneColumnUser(userId, columnId);
  }

  @ApiOperation({ summary: 'Список колонок пользователя' })
  @ApiResponse({ status: 201, type: ColumnEntity })
  @Post(':id/columns')
  createOneColumnByUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() createColumnDto: CreateColumnDto,
  ) {
    return this.usersService.createOneColumnByUser(id, createColumnDto);
  }

  @ApiOperation({ summary: 'Обновить колонку пользователя' })
  @ApiResponse({ status: 200, type: ColumnEntity })
  @UseGuards(IsOwnerColumnGuard)
  @Patch(':userId/columns/:id')
  updateOneColumnUser(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('id', ParseUUIDPipe) columnId: string,
    @Body() updateColumnDto: UpdateColumnDto,
  ) {
    return this.usersService.updateOneColumnUser(userId, columnId, updateColumnDto);
  }

  @ApiOperation({ summary: 'Удалить колонку пользователя' })
  @ApiResponse({ status: 200, type: Boolean })
  @UseGuards(IsOwnerColumnGuard)
  @Delete(':userId/columns/:id')
  deleteOneColumnUser(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('id', ParseUUIDPipe) columnId: string,
  ) {
    return this.usersService.deleteOneColumnUser(userId, columnId);
  }
}
