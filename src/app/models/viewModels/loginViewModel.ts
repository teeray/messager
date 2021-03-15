import { IdentityUser } from "../auths/IdentityUser";

export class LoginViewModel{
    user:IdentityUser;
    token:string = '';
    constructor(obj:LoginViewModel = {} as LoginViewModel){
        const {
            user = null,
            token = ''
        } = obj;
        this.user = new IdentityUser(user);
        this.token = token;
    }
}