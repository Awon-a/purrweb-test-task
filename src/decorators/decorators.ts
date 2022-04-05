import { ValidateIf } from "class-validator"

export const IsUndefined = () => {
    return ValidateIf((object, value) => value !== undefined);
}