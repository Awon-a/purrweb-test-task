import { IsString, IsUUID } from "class-validator";

export class CreateNoteDto {
    @IsString()
    content: string;

    @IsUUID()
    userId: string;

    @IsUUID()
    cardId: string;
}
