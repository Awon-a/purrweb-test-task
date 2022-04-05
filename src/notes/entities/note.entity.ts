import { CardEntity } from "src/cards/entities/card.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

const tableName = 'notes';

@Entity({ name: tableName })
export class NoteEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar')
    content: string;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;

    @ManyToOne(() => UserEntity, user => user.notes, {
        onDelete: 'CASCADE',
    })
    user: UserEntity;

    @Column('uuid', { nullable: true }) // ??
    userId?: string;

    @ManyToOne(() => CardEntity, card => card.notes, {
        onDelete: 'CASCADE',
    })
    card: CardEntity;

    @Column('uuid', { nullable: true }) // ??
    cardId?: string;
}
