import { ColumnsController } from "src/columns/columns.controller";
import { ColumnEntity } from "src/columns/entities/column.entity";
import { NoteEntity } from "src/notes/entities/note.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

const tableName = 'cards';

@Entity({ name: tableName })
export class CardEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar')
    content: string;

    @UpdateDateColumn()
    updatedAt: string;

    @CreateDateColumn()
    createdAt: string;

    @ManyToOne(() => ColumnEntity, column => column.cards, {
        onDelete: 'CASCADE',
    })
    column: ColumnEntity;

    @Column('uuid', { nullable: true }) // ??
    columnId?: string;

    @OneToMany(() => NoteEntity, note => note.card)
    notes: NoteEntity[];

    @ManyToOne(() => UserEntity, user => user.cards, {
        onDelete: 'CASCADE',
    })
    user: UserEntity;

    @Column('uuid', { nullable: true })
    userId: UserEntity['id'];
}
