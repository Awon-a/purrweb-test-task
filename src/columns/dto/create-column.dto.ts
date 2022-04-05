import { IsString, IsUUID } from "class-validator";

export class CreateColumnDto {
    @IsString()
    name: string;

    @IsUUID()
    userId: string;
}
