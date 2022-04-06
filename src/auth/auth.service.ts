import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
    ) { }

    async validateUser(email: string, password: string): Promise<any> {
        try {
            const user = await this.userService.findOneByEmail(email);
            await this.verifyPassword(password, user.password);
            const { password: pass, ...result } = user;

            return result;
        } catch (e) {
            throw e;
        }
    }

    async register(createUserDto: CreateUserDto) {
        try {
            const hashedPassword = await bcrypt.hash(createUserDto.password, 5);

            const newUser = {
                ...createUserDto,
                password: hashedPassword,
            };

            const { password, ...result } = await this.userService.createOne(newUser);

            return result;
        } catch (e) {
            throw new HttpException('Что-то пошло не так :(', HttpStatus.BAD_REQUEST);
        }
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    private async verifyPassword(password: string, hashedPassword: string) {
        const verifyPass = await bcrypt.compare(password, hashedPassword);
        if (!verifyPass) {
            throw new HttpException('Что-то пошло не так :(', HttpStatus.BAD_REQUEST);
        }
    }
}
