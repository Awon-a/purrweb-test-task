import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({ example: 'example@gmail.com', description: 'Электронная почта' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: '12345678', description: 'Пароль (8-32 символа)' })
    @IsNotEmpty()
    @Length(8, 32)
    password: string;
}
