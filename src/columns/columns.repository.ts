import { EntityRepository, Repository } from "typeorm";
import { ColumnEntity } from "./entities/column.entity";

@EntityRepository(ColumnEntity)
export class ColumnsRepository extends Repository<ColumnEntity> { }