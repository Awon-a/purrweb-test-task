import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { ColumnEntity as ColumnEntity } from 'src/columns/entities/column.entity';
import { NoteEntity } from 'src/notes/entities/note.entity';

const tableName = 'users';

@Entity({ name: tableName })
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', unique: true })
    email: string;

    @Column('varchar')
    password: string;

    @Column({ type: 'int', nullable: true })
    age?: number;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;

    @OneToMany(() => ColumnEntity, column => column.user)
    columns: ColumnEntity[];

    @OneToMany(() => NoteEntity, note => note.user)
    notes: NoteEntity[];
}
