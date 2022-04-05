import { notStrictEqual } from "assert";
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

    @ManyToOne(() => ColumnEntity, column => column.cards)
    column: string;

    @OneToMany(() => NoteEntity, note => note.card)
    notes: NoteEntity[];
}
