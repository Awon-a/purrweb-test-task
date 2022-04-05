import { CardEntity } from "src/cards/entities/card.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, Entity } from "typeorm";

const tableName = 'columns';

@Entity({ name: tableName })
export class ColumnEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar')
    name: string;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;

    @ManyToOne(() => UserEntity, user => user.columns)
    user: UserEntity;

    @Column('varchar', { nullable: true })
    userId?: string;

    @OneToMany(() => CardEntity, card => card.column)
    cards: CardEntity[];
}
