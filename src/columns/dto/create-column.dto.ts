import { IsString, IsUUID, ValidateIf } from "class-validator";
import { IsUndefined } from "src/decorators/decorators";

export class CreateColumnDto {
    @IsString()
    name: string;

    @IsUndefined()
    @IsUUID()
    userId?: string;
}
