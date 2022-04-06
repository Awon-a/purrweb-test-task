import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ColumnsModule } from './columns/columns.module';
import { CardsModule } from './cards/cards.module';
import { NotesModule } from './notes/notes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './users/entities/user.entity';
import { CardEntity } from './cards/entities/card.entity';
import { NoteEntity } from './notes/entities/note.entity';
import { ColumnEntity } from './columns/entities/column.entity';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { DB_URL } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: DB_URL,
      entities: [UserEntity, ColumnEntity, CardEntity, NoteEntity],
      synchronize: true,
    }),
    UsersModule,
    ColumnsModule,
    CardsModule,
    NotesModule,
    AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
