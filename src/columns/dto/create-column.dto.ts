import { IsEmpty, IsString, IsUUID, ValidateIf } from "class-validator";

export class CreateColumnDto {
    @IsString()
    name: string;

    @ValidateIf((o, value) => value !== undefined)
    @IsUUID()
    userId?: string;
}
