import { IsString, IsUUID } from "class-validator";
import { IsUndefined } from "src/decorators/decorators";

export class CreateNoteDto {
    @IsString()
    content: string;

    @IsUndefined()
    @IsUUID()
    userId: string;

    @IsUndefined()
    @IsUUID()
    cardId: string;
}
