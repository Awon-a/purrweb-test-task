import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { NotesService } from "../notes.service";

@Injectable()
export class IsOwnerNoteGuard implements CanActivate {
    constructor(private notesService: NotesService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        const user = req.user;
        const noteId = req.params.id || req.params.noteId;

        const note = this.notesService.findOneNoteByUserId(noteId, user.userId);

        if (!note) {
            return false;
        }

        return true;
    }

}