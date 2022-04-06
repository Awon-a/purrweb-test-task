import { ApiProperty } from "@nestjs/swagger";
import { CardEntity } from "src/cards/entities/card.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, Entity } from "typeorm";

const tableName = 'columns';

@Entity({ name: tableName })
export class ColumnEntity {
    @ApiProperty({ example: '72713f5b-71a6-465a-b7cf-b8033b119d90', description: 'Уникальный идентификатор' })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({ example: 'Column #1', description: 'Название колонки' })
    @Column('varchar')
    name: string;

    @ApiProperty({ example: '2022-04-05T05:10:51.413Z', description: 'Дата создания' })
    @CreateDateColumn()
    createdAt: string;

    @ApiProperty({ example: '2022-04-05T05:10:51.413Z', description: 'Дата обновления' })
    @UpdateDateColumn()
    updatedAt: string;

    @ManyToOne(() => UserEntity, user => user.columns, {
        onDelete: 'CASCADE',
    })
    user: UserEntity;

    @ApiProperty({ example: '64be7d85-1481-4004-9d4c-48bd8ae130f8', description: 'Владелец колонки' })
    @Column('uuid', { nullable: true }) // ??
    userId?: string;

    @OneToMany(() => CardEntity, card => card.column)
    cards: CardEntity[];
}
