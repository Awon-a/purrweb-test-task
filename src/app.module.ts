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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgres://tsiibidi:M_1Zcq89EehWxwzWzxW-5ug10q5O_3Iz@ruby.db.elephantsql.com/tsiibidi',
      entities: [UserEntity, ColumnEntity, CardEntity, NoteEntity],
      synchronize: true,
      logging: true,
    }),
    UsersModule,
    ColumnsModule,
    CardsModule,
    NotesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
