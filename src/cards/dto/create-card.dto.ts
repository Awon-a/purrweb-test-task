import { IsString, IsUUID } from "class-validator";
import { IsUndefined } from "src/decorators/decorators";

export class CreateCardDto {
    @IsString()
    content: string;

    @IsUndefined()
    @IsUUID()
    columnId: string;
}

