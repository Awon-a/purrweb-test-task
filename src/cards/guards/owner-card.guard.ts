import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { CardsService } from "../cards.service";

@Injectable()
export class IsOwnerCardGuard implements CanActivate {
    constructor(private cardsService: CardsService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        const user = req.user;
        const cardId = req.params.id || req.params.cardId;

        const card = await this.cardsService.findOneCardByUserId(cardId, user.userId);

        if (!card) {
            return false;
        }

        return true;
    }

}