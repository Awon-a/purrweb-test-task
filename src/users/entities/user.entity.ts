import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { ColumnEntity as ColumnEntity } from 'src/columns/entities/column.entity';
import { NoteEntity } from 'src/notes/entities/note.entity';
import { CardEntity } from 'src/cards/entities/card.entity';
import { ApiProperty } from '@nestjs/swagger';

const tableName = 'users';

@Entity({ name: tableName })
export class UserEntity {
    @ApiProperty({ example: '72713f5b-71a6-465a-b7cf-b8033b119d90', description: 'Уникальный идентификатор' })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({ example: 'example@gmail.com', description: 'Электронная почта' })
    @Column({ type: 'varchar', unique: true })
    email: string;

    @ApiProperty({ example: '12345678', description: 'Пароль' })
    @Column('varchar')
    password: string;

    @ApiProperty({ example: '20', description: 'Возраст' })
    @Column({ type: 'int', nullable: true })
    age?: number;

    @ApiProperty({ example: '2022-04-05T05:10:51.413Z', description: 'Дата создания' })
    @CreateDateColumn()
    createdAt: string;

    @ApiProperty({ example: '2022-04-05T05:10:51.413Z', description: 'Дата обновления' })
    @UpdateDateColumn()
    updatedAt: string;

    @OneToMany(() => ColumnEntity, column => column.user)
    columns: ColumnEntity[];

    @OneToMany(() => NoteEntity, note => note.user)
    notes: NoteEntity[];

    @OneToMany(() => CardEntity, card => card.user)
    cards: CardEntity[];
}
