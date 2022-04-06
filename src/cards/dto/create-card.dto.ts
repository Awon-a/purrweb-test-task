import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUUID } from "class-validator";
import { IsUndefined } from "src/decorators/decorators";

export class CreateCardDto {
    @ApiProperty({ example: 'Создать RESTful API', description: 'Содержимое колонки' })
    @IsString()
    content: string;

    @ApiProperty({ example: 'bbcbd1e3-bf7f-45ce-9b7c-8ddfe650ccba', description: 'Колонка карточки' })
    @IsUndefined()
    @IsUUID()
    columnId: string;

    @ApiProperty({ example: '64be7d85-1481-4004-9d4c-48bd8ae130f8', description: 'Владелец карточки' })
    @IsUUID()
    userId: string;
}

