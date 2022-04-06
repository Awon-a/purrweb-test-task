import { ApiProperty } from "@nestjs/swagger";
import { ColumnEntity } from "src/columns/entities/column.entity";
import { NoteEntity } from "src/notes/entities/note.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

const tableName = 'cards';

@Entity({ name: tableName })
export class CardEntity {
    @ApiProperty({ example: '72713f5b-71a6-465a-b7cf-b8033b119d90', description: 'Уникальный идентификатор' })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({ example: 'Создать RESTful API', description: 'Содержимое колонки' })
    @Column('varchar')
    content: string;

    @ApiProperty({ example: '2022-04-05T05:10:51.413Z', description: 'Дата обновления' })
    @UpdateDateColumn()
    updatedAt: string;

    @ApiProperty({ example: '2022-04-05T05:10:51.413Z', description: 'Дата создания' })
    @CreateDateColumn()
    createdAt: string;

    @ManyToOne(() => ColumnEntity, column => column.cards, {
        onDelete: 'CASCADE',
    })
    column: ColumnEntity;

    @ApiProperty({ example: 'bbcbd1e3-bf7f-45ce-9b7c-8ddfe650ccba', description: 'Колонка карточки' })
    @Column('uuid', { nullable: true }) // ??
    columnId?: string;

    @OneToMany(() => NoteEntity, note => note.card)
    notes: NoteEntity[];

    @ManyToOne(() => UserEntity, user => user.cards, {
        onDelete: 'CASCADE',
    })
    user: UserEntity;

    @ApiProperty({ example: '64be7d85-1481-4004-9d4c-48bd8ae130f8', description: 'Владелец карточки' })
    @Column('uuid', { nullable: true })
    userId: UserEntity['id'];
}
