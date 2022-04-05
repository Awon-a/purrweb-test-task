import { EntityRepository, Repository } from "typeorm";
import { CardEntity } from "./entities/card.entity";

@EntityRepository(CardEntity)
export class CardsRepository extends Repository<CardEntity> { }