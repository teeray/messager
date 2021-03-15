import { LoginDTO } from "./LoginDTO";

export class PasswordResetDTO extends LoginDTO{
    code:string;
    constructor(obj:PasswordResetDTO = {} as PasswordResetDTO){
        super(obj);
        const {
            code = ''
        } = obj;
        this.code = code;
    }
}