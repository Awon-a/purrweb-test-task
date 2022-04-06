import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ColumnsService } from '../columns.service';

@Injectable()
export class IsOwnerColumnGuard implements CanActivate {
    constructor(private columnsService: ColumnsService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        const user = req.user;
        const columnId = req.params.id || req.params.columnId;

        const column = await this.columnsService.findOneColumnByUserId(columnId, user.userId);

        if (!column) {
            return false;
        }

        return true;
    }

}