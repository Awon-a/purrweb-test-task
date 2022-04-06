import { ApiProperty } from "@nestjs/swagger";
import { CardEntity } from "src/cards/entities/card.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

const tableName = 'notes';

@Entity({ name: tableName })
export class NoteEntity {
    @ApiProperty({ example: '72713f5b-71a6-465a-b7cf-b8033b119d90', description: 'Уникальный идентификатор' })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({ example: 'Пример текста комментария', description: 'Текст комментария' })
    @Column('varchar')
    content: string;

    @ApiProperty({ example: '2022-04-05T05:10:51.413Z', description: 'Дата создания' })
    @CreateDateColumn()
    createdAt: string;

    @ApiProperty({ example: '2022-04-05T05:10:51.413Z', description: 'Дата обновления' })
    @UpdateDateColumn()
    updatedAt: string;

    @ManyToOne(() => UserEntity, user => user.notes, {
        onDelete: 'CASCADE',
    })
    user: UserEntity;

    @ApiProperty({ example: '64be7d85-1481-4004-9d4c-48bd8ae130f8', description: 'Владелец комментария' })
    @Column('uuid', { nullable: true }) // ??
    userId?: string;

    @ManyToOne(() => CardEntity, card => card.notes, {
        onDelete: 'CASCADE',
    })
    card: CardEntity;

    @ApiProperty({ example: 'bbcbd1e3-bf7f-45ce-9b7c-8ddfe650ccba', description: 'Карточка комментария' })
    @Column('uuid', { nullable: true }) // ??
    cardId?: string;
}
