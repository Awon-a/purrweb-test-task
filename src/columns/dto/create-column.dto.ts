import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUUID, ValidateIf } from "class-validator";
import { IsUndefined } from "src/decorators/decorators";

export class CreateColumnDto {
    @ApiProperty({ example: 'Column #1', description: 'Название колонки' })
    @IsString()
    name: string;

    @ApiProperty({ example: '64be7d85-1481-4004-9d4c-48bd8ae130f8', description: 'Владелец колонки' })
    @IsUndefined()
    @IsUUID()
    userId?: string;
}
