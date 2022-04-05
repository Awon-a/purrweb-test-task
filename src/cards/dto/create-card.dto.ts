import { IsString, IsUUID } from "class-validator";

export class CreateCardDto {
    @IsString()
    content: string;

    @IsUUID()
    columnId: string;
}

