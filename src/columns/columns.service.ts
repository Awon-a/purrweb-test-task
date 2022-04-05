import { Injectable } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { ColumnsRepository } from './columns.repository';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { ColumnEntity } from './entities/column.entity';

@Injectable()
export class ColumnsService {
  constructor(
    private columnsRepository: ColumnsRepository,
  ) { }

  async createOne(createColumnDto: CreateColumnDto): Promise<ColumnEntity> {
    try {
      return this.columnsRepository.save(createColumnDto);
    } catch (e) {
      throw e;
    }
  }

  async findAll(): Promise<ColumnEntity[]> {
    try {
      return this.columnsRepository.find();
    } catch (e) {
      throw e;
    }
  }

  async findOne(id: ColumnEntity['id']): Promise<ColumnEntity> {
    try {
      return this.columnsRepository.findOne(id);
    } catch (e) {
      throw e;
    }
  }

  async updateOne(id: ColumnEntity['id'], updateColumnDto: UpdateColumnDto): Promise<ColumnEntity> {
    try {
      return this.columnsRepository.save({ id, ...updateColumnDto });
    } catch (e) {
      throw e;
    }
  }

  async deleteOne(id: ColumnEntity['id']): Promise<boolean> {
    try {
      await this.columnsRepository.delete(id);

      return true;
    } catch {
      return false;
    }
  }
}
