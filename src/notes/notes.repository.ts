import { EntityRepository, Repository } from "typeorm"
import { NoteEntity } from "./entities/note.entity"

@EntityRepository(NoteEntity)
export class NotesRepository extends Repository<NoteEntity> { }